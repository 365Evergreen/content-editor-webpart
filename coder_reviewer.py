import re

def review_code_file(file_path: str):
    """Scans a python file for typical formatting flaws or security mistakes."""
    print(f"🔍 Audit Log for: {file_path}")
    with open(file_path, 'r', encoding='utf-8') as f:
        for line_num, line in enumerate(f, 1):
            # Check for hardcoded credentials
            if re.search(r'(password|secret|api_key)\s*=\s*["\'].+["\']', line, re.IGNORECASE):
                print(f"🚨 Line {line_num}: WARNING - Potential hardcoded credential exposure found!")
            # Check for missing docstrings on function definitions
            if line.strip().startswith("def ") and not line.endswith("#"):
                print(f"💡 Line {line_num}: Reminder - Ensure this function includes docstrings.")

if __name__ == "__main__":
    review_code_file("src/main.py")