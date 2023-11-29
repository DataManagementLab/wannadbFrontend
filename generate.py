import os

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
    component_name = input("Enter component name: ")
    # create folder
    new_path = COMPONENT_PATH+ "/" + component_name
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
    
    
if __name__ == "__main__":
    main()