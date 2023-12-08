import os
import json

# generate a new React component

name_arg = None
for arg in os.sys.argv:
    if arg.endswith(".py"):
        continue
    name_arg = arg

TEMPLATE_PATH = "./templates"


def main():
    print("***Generate React components**")
    
    # get name
    if name_arg:
        component_name = name_arg
    else:
        component_name = input("Enter component name: ")
    component_name = format_name(component_name)
    
    types = get_template_types()
    for i in range(len(types)):
        print(f"{i+1}. {types[i]['name']} - {types[i]['description']}")
    response = int(input("Enter component type: "))
    if response > len(types) or response < 1:
        print("Invalid input: ", response)
        quit()
    try:
        generate_files(types[response-1], component_name)
    except Exception as error:
        print("Creation of the component failed:", error)
        quit()
    print("Component created successfully")

def get_template_types():
    types_name = os.listdir(TEMPLATE_PATH)
    result = []
    for type in types_name:
        meta_file = TEMPLATE_PATH + "/" + type + "/meta.json"
        with open(meta_file, "r") as f:
            meta = f.read()
        meta = json.loads(meta)
        description = meta["description"]
        # if description is not provided, use the name
        if not description:
            description = ""
        
        path = meta["path"]
        if not path:
            path = "."
        
        obj = {
            "name": type,
            "description": description,
            "path": path
        }
        result.append(obj)
    return result
        

def generate_files(template, component_name):
    template_base_path = TEMPLATE_PATH + "/" + template["name"]
    
    path = template["path"].replace("$$name$$", component_name)
    
    if not os.path.exists(path):
        try:
            os.mkdir(path)
        except OSError as error:
            print("Creation of the directory "+path+" failed:", error)
            quit()
    
    files = os.listdir(template_base_path)
    for file in files:
        if file == "meta.json":
            continue
        file_name = file.replace("$$name$$", component_name)
        with open(template_base_path + "/" + file, "r") as f:
            content = f.read()
        content = content.replace("$$name$$", component_name)
        new_path = path + "/" + file_name
        if os.path.exists(new_path):
            raise Exception("File already exists: ", new_path)
        with open(new_path, "w") as f:
            f.write(content)
        print("Created file: ", new_path)
        

def format_name(name):
    name = name[0].upper() + name[1:]
    # replace all - and make next letter uppercase
    while name.find("-") != -1:
        index = name.find("-")
        name = name[:index] + name[index+1].upper() + name[index+2:]
    return name
    
if __name__ == "__main__":
    main()