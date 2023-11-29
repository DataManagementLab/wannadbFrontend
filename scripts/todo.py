import os
import datetime

# generate a new entry in the todo list

todo = ""
for arg in os.sys.argv:
    if arg.endswith(".py"):
        continue
    todo = todo + arg + " "


FILE_NAME = "./todos.md"

def main():
    print("***Add a TODO**")
    # read input
    global todo
    if todo == "":
        todo = input("Enter todo: ")
    name = get_name()
    date = datetime.datetime.now().strftime("%Y-%m-%d")
    
    with open(FILE_NAME, "a") as f:
        f.write(f"- [ ] {todo} _({date} {name})_\n")
        
    print("Added todo to " + FILE_NAME)

def get_name():
    try:
        git_user = os.popen("git config user.name").read().strip()
    except:
        git_user = ""
    
    if git_user == "":
        git_user = input("Enter your name: ")
    
    return git_user

if __name__ == "__main__":
    main()