from dotenv import load_dotenv
load_dotenv()
from langchain_groq import ChatGroq
from langchain_core.globals import set_debug,set_verbose
from pydantic import BaseModel,Field
from langchain.chat_models import init_chat_model
from langgraph.constants import END
from langgraph.graph import StateGraph
from agent_pkg.prompts import *
from agent_pkg.states import *
import os
import time
import subprocess
import webbrowser

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(BASE_DIR)
OUTPUT_DIR = os.path.join(ROOT_DIR, f"generated_app_{int(time.time())}")

llm = init_chat_model("google_genai:gemini-2.5-flash")

# set_debug(True)
# set_verbose(True)
def serve_app(output_dir):
    # start simple HTTP server
    process = subprocess.Popen(
        ["python", "-m", "http.server", "8000"],
        cwd=output_dir
    )
    time.sleep(2)
    webbrowser.open("http://localhost:8000")
    print("--> App running at http://localhost:8000")
    return process

#PLANNER
def planner_agent(state: dict) -> dict:
    user_prompt_for_planner = state["user_prompt"]
    res = llm.with_structured_output(Plan).invoke(planner_prompt(user_prompt_for_planner))
    return {"plan" : res}

#ARCHITECT
def architect_agent(state: dict) -> dict:
    user_prompt_for_architect = state["plan"]
    res = llm.with_structured_output(Architecture).invoke(architecture_prompt(user_prompt_for_architect))
    res.plan = state["plan"]
    return {"task_plan" : res}


#coder
def coder_agent(state: dict) -> dict:
    architecture = state["task_plan"]

    # create base directory
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    for file in architecture.file_architects:
        filepath = os.path.join(OUTPUT_DIR, file.filepath)
        res = llm.invoke(content_prompt(file.filepath,file.task_description))
        code = res.content
        # ensure subfolders exist
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        # write file
        with open(filepath, "w") as f:
            f.write(code)

        print(f"✅ Created: {filepath}")
    serve_app(OUTPUT_DIR)
    return {"status":"done"}

def ai_agent(input_prompt):
    #GRAPH BUILD
    graph = StateGraph(dict)
    graph.add_node("planner",planner_agent)
    graph.add_node("architect",architect_agent)
    graph.add_node("coder", coder_agent)
    graph.set_entry_point("planner")
    graph.add_edge("planner","architect")
    graph.add_edge("architect","coder")
    graph.add_edge("coder",END)
    agent = graph.compile()
    result = agent.invoke({"user_prompt":input_prompt})
    print(result)



