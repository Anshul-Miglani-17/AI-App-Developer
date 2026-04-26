
def planner_prompt(user_prompt):
    var = f"""
        you are a planner agent, given the user prompt plan out the engineering project.
        User Prompt - {user_prompt}
    """
    return var

def architecture_prompt(plan):
    var = f"""
        you are a cs architecture agent, given the plan write out the engineering tasks.
        rules are
        1) for each file create the implementation tasks
        2) in each task specify what to implement, name of variables functions classes etc, imports etc
        3) which tasks needs to be implemented in which order
        4) all the relevant information
        User Prompt - {plan}
    """
    return var

def content_prompt(file,description):
    var = f"""
        You are a senior software engineer.

        Based on this task:
        {description}

        Generate COMPLETE production-ready code for file: {file}

        Rules:
        - Return ONLY code
        - No explanation
        - No markdown
    """
    return var