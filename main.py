def greet_user(name: str) -> str:
    """
    Generates a personalized greeting message.
    
    :param name: The name of the person to greet.
    :return: A formatted greeting string.
    """
    if not name.strip():
        return "Hello, Mystery Developer!"
    return f"Hello, {name}! Welcome to Python scripting."


if __name__ == "__main__":
    # This block only runs if you execute this file directly.
    # It won't run if you import this file elsewhere.
    print("--- Running Starter Script ---")
    user_name = input("Enter your name: ")
    greeting = greet_user(user_name)
    print(greeting)