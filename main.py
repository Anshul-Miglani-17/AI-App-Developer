from agent_pkg.graph import ai_agent
def main():
    print("Hello from ai-app-developer!")
    input_app = input("tell us about which APP you want to build : ")
    input_prompt = f"""
        asked from user
        Question - tell us about which APP you want to build :
        User Ans - {input_app}
        
        user is asking to build '{input_app}'.
        We need HTML, CSS and JS app.
        Add readme file also.
    """
    ai_agent(input_prompt)


if __name__ == "__main__":
    main()
