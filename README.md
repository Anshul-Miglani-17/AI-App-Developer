# 🚀 AI App Developer

Build complete applications using AI — from idea → architecture → code → live preview.

---

## ✨ What is this?

**AI App Developer** is a multi-agent system powered by LLMs that can:

* Understand your app idea
* Plan the application
* Design file structure & architecture
* Generate production-ready code
* Create files automatically
* Run and open the app in your browser

---

## ⚡ Demo

```bash
uv run main.py
```

```
Hello from ai-app-developer!
tell us about which APP you want to build : calculator

✅ Created: generated_app_1777195491/index.html
✅ Created: generated_app_1777195491/style.css
✅ Created: generated_app_1777195491/script.js
✅ Created: generated_app_1777195491/README.md

Serving HTTP on :: port 8000 (http://[::]:8000/) ...
--> App running at http://localhost:8000

{'status': 'done'}
```

👉 Your app is generated and automatically opened in the browser.

---

## 🧠 How it works

This project uses a **multi-agent architecture**:

### 1. Planner Agent

* Understands user prompt
* Creates high-level app plan

### 2. Architect Agent

* Breaks plan into files
* Defines detailed engineering tasks

### 3. Coder Agent

* Generates actual code
* Writes files to disk
* Runs the app locally

---

## 🏗️ Project Structure

```
AI-App-Developer/
│
├── agent_pkg/
│   ├── graph.py          # LangGraph workflow
│   ├── prompts.py        # All prompts
│   ├── states.py         # Pydantic schemas
│
├── generated_app_*       # AI generated apps
├── main.py               # Entry point
└── README.md
```

---

## 🛠️ Tech Stack

* Python 3.11+
* LangGraph
* LangChain
* Pydantic v2
* LLMs (Gemini / Groq / others)
* Simple HTTP Server

---

## 🚀 Getting Started

### 1. Clone repo

```bash
git clone https://github.com/Anshul-Miglani-17/AI-App-Developer.git
cd AI-App-Developer
```

### 2. Install dependencies

```bash
uv sync
```

### 3. Set environment variables

Create `.env` file:

```
GOOGLE_API_KEY=your_key
GROQ_API_KEY=your_key
```

### 4. Run

```bash
uv run main.py
```

---

## 🎯 Example Prompts

Try:

* "calculator app"
* "todo app with local storage"
* "notes app with search"

---


## ⚠️ Limitations

* LLM output may vary
* Frontend apps only (html + css + js)


---

## 🤝 Contributing

Contributions are welcome!
Feel free to open issues or PRs.

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---

## 👨‍💻 Author

**Anshul Miglani**

---
