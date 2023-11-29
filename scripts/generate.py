import os

# generate a new React component

name_arg = None
for arg in os.sys.argv:
    if arg.endswith(".py"):
        continue
    name_arg = arg

COMPONENT_PATH = "./src/components"

TEMPLATES = [
    
{
    
"$$name$$.tsx":
    
"""
import './$$name$$.scss';

function $$name$$() {
    return (
        <div className="$$name$$">
            Hello from $$name$$
        </div>
    )
};
export default $$name$$;
"""

},
{
    
"$$name$$.scss": 
    
"""
.$$name$$ {
}
""",
},
{
"$$name$$.test.tsx":
    
"""
test('$$name$$Test', () => {
	expect(true).toBe(true);
});
""",
}
]

def main():
    print("***Generate React components**")
    # read input
    if name_arg:
        component_name = name_arg
    else:
        component_name = input("Enter component name: ")
    component_name = format_name(component_name)
    # check if name is in camel case
    # create folder
    new_path = COMPONENT_PATH+ "/" + component_name
    # check if folder exists
    if os.path.exists(new_path):
        print("Component already exists!")
        quit()
    try:
        os.mkdir(new_path)
    except OSError:
        print("Creation of the directory %s failed" % new_path)
        quit()
    for template in TEMPLATES:
        for key, value in template.items():
            file_name = key.replace("$$name$$", component_name)
            file_path = new_path + "/" + file_name
            with open(file_path, "w") as f:
                f.write(value.replace("$$name$$", component_name))
            print("Created file: ", file_path)
    print("Component created successfully")
    
def format_name(name):
    name = name[0].upper() + name[1:]
    # replace all - and make next letter uppercase
    while name.find("-") != -1:
        index = name.find("-")
        name = name[:index] + name[index+1].upper() + name[index+2:]
    return name
    
if __name__ == "__main__":
    main()