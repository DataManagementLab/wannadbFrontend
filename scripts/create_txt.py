import os

FILES = [
    {
        'name': 'story.txt',
        'content': """
In a small coastal village in Italy, where the warm Mediterranean breeze danced with the scent of olive trees, there lived a peculiar penguin named Paolo. Unlike his Antarctic relatives, Paolo had a knack for languages, and he spoke fluent Italian with a charming accent.
Paolo was not your ordinary penguin. One day, while swimming in the clear blue waters near the Amalfi Coast, he stumbled upon an ancient artifact—a magical seashell. To his surprise, the seashell granted him the ability to communicate with humans. From that day forward, Paolo became a beloved member of the village.
The locals were enchanted by Paolo's ability to chat about the weather, share tales of the sea, and even discuss the latest gossip in the village. His favorite pastime, however, was savoring gelato under the shade of a lemon tree and engaging in lively conversations with the villagers.
Word of Paolo's extraordinary talents spread far and wide, attracting curious visitors from neighboring towns and even from distant cities. Tourists flocked to the village to meet the talking penguin, taking selfies and sharing stories about their encounters with the charming bird.
Paolo's newfound fame brought joy and prosperity to the village. The local gelato shop created a special flavor in his honor—Penguin Pistachio Delight, a blend of Italian pistachios and Antarctic charm. The village's artisans crafted miniature sculptures of Paolo, which became popular souvenirs for those who wanted to take a piece of the talking penguin home with them.
Despite his fame, Paolo remained humble and down-to-earth. He continued to enjoy the simple pleasures of life in Italy—long walks along the cobblestone streets, sipping espresso at the local café, and attending festive gatherings in the town square. His infectious laughter and witty remarks made him the life of every party.
One summer evening, as the sun dipped below the horizon, casting a warm glow over the village, Paolo gathered the locals for a special performance. With his newfound talent, he sang a heartwarming serenade that echoed through the narrow streets. The villagers, touched by the magical melody, joined in, creating an unforgettable moment of unity and joy.
As the years passed, Paolo's legend lived on in the hearts of the villagers and the memories of the countless visitors who had been enchanted by the talking penguin from Italy. The magical seashell, however, eventually lost its power, and Paolo could no longer speak. But by then, he had already left an indelible mark on the village, reminding everyone that sometimes, magic can be found in the most unexpected places—even in the company of a talking penguin on the shores of Italy.
        """
    },
    {
        'name': 'happy_birthday.txt',
        'content': """
Happy Birthday to You
Happy Birthday to You
Happy Birthday Dear [Name]
Happy Birthday to You.
From good friends and true,
From old friends and new,
May good luck go with you,
And happiness too.
"""
    },{
    'name': 'orange_food.txt',
    'content': """
Name,Type,Origin
"Orange","Fruit","China"
"Carrot","Vegetable","Middle East"
"Pumpkin","Vegetable","North America"
"Mango","Fruit","South Asia"
"Apricot","Fruit","China"
"Papaya","Fruit","Central America"
"""
},{
    'name': 'weird_shopping_list.txt',
    'content': """
Item,Quantity
"Unicorn Slippers",1
"Invisible Ink Pen",3
"Edible Glitter",2
"Rubber Duckies",50
"Glow in the Dark Toilet Paper",4
"Zombie Survival Guide",1
"Banana Slicer",1
"Yodeling Pickle",1
"Cat Keyboard",1
"""
},{
    'name': 'apology_letter.txt',
    'content': """
Dear [Boss's Name],

I am writing to apologize for the mess I made on your desk while eating a taco. I understand that this was a disruption and an inconvenience for you.

I assure you that this was an unintentional mistake and I deeply regret my carelessness. I have taken steps to clean up the mess and will ensure that such an incident does not occur in the future.

I appreciate your understanding and patience in this matter.

Sincerely,
[Your Name]
"""
},{
    'name': 'coolest_animals.txt',
    'content': """
1. Snow Leopard
2. Giant Panda
3. Bald Eagle
4. African Elephant
5. Axolotl
6. Narwhal
7. Komodo Dragon
8. Capybara
9. Red Panda
10. Platypus
11. Quokka
12. Sloth
13. Fennec Fox
14. Arctic Fox
15. Dumbo Octopus
16. Tardigrade
17. Mantis Shrimp
18. Thorny Devil
19. Pangolin
20. Tasmanian Devil
21. Peacock Spider
22. Star-Nosed Mole
23. Aye-Aye
24. Leafy Sea Dragon
25. Okapi
26. Blobfish
27. Proboscis Monkey
28. Shoebill
29. Kakapo
30. Saiga Antelope
31. Japanese Spider Crab
32. Glaucus Atlanticus
33. Satanic Leaf-Tailed Gecko
34. Tufted Deer
35. Maned Wolf
36. Irrawaddy Dolphin
37. Tarsier
38. Jerboa
39. Tapir
40. Sun Bear
41. Sugar Glider
42. Emperor Tamarin
43. Dik-Dik
44. Serval
45. Ocelot
46. Margay
47. Caracal
48. Lynx
49. Bobcat
50. Cheetah
51. Jaguar
52. Leopard
53. Lion
54. Tiger
55. Puma
56. Snowy Owl
57. Harpy Eagle
58. Kingfisher
59. Hummingbird
60. Peacock
61. Flamingo
62. Toucan
63. Macaw
64. Penguin
65. Albatross
66. Puffin
67. Kiwi
68. Cassowary
69. Emu
70. Ostrich
71. Kangaroo
72. Koala
73. Wombat
74. Tasmanian Tiger
75. Dingo
76. Wallaby
77. Platypus
78. Echidna
79. Numbat
80. Quokka
81. Bandicoot
82. Bilby
83. Possum
84. Sugar Glider
85. Tree Kangaroo
86. Thorny Devil
87. Frilled-Neck Lizard
88. Saltwater Crocodile
89. Komodo Dragon
90. Galapagos Tortoise
91. Marine Iguana
92. Chameleon
93. Gila Monster
94. Anaconda
95. Boa Constrictor
96. Python
97. Cobra
98. Viper
99. Sea Turtle
100. Leatherback Sea Turtle
"""
},{
    'name': 'love_letter.txt',
    'content': """
Dear [Guinea Pig's Name],

I just wanted to take a moment to express how much joy you bring into my life. Your tiny squeaks and the softness of your fur always manage to brighten my day.

I love how you popcorn when you're happy and how you munch on your favorite veggies. Your little quirks and habits are endearing and they make you, you.

Thank you for being my companion and my friend. You may be a small guinea pig, but you have a big place in my heart.

With all my love,
[Your Name]
"""
},{
    'name': 'what_is_json.txt',
    'content': """
{
    "JSON": {
        "Full Form": "JavaScript Object Notation",
        "Description": "JSON is a lightweight data-interchange format that is easy for humans to read and write and easy for machines to parse and generate.",
        "Uses": "It is primarily used to transmit data between a server and a web application, serving as an alternative to XML.",
        "Structure": {
            "Objects": "Objects in JSON are surrounded by curly braces {} and are written as name/value pairs separated by a colon.",
            "Arrays": "Arrays in JSON are ordered lists and are surrounded by square brackets [].",
            "Values": "Values in JSON can be a string, number, object, array, boolean or null."
        }
    }
}
"""
},{
    'name': 'jokes.txt',
    'content': """
1. Why don't scientists trust atoms? Because they make up everything!
2. Why did the scarecrow win an award? Because he was outstanding in his field!
3. Why don't some fish play piano? Because you can't tuna fish!
4. What do you call fake spaghetti? An impasta!
5. Why did the golfer bring two pairs of pants? In case he got a hole in one!
"""
},
{
    'name': 'dream_vacation.txt',
    'content': """
Destination: The Moon
Accommodation: Lunar Module
Activities: Moonwalking, Crater Hopping, Alien Spotting
Food: Astronaut Ice Cream, Moon Pies
Transport: Rocket Ship
Souvenirs: Moon Rocks
"""
},
{
    'name': 'workout_plan.txt',
    'content': """
Day 1: Chase the Ice Cream Truck
Day 2: Lift the Remote Control
Day 3: Run... out of Snacks
Day 4: Jump... to Conclusions
Day 5: Push... the Limits of Laziness
Day 6: Pull... a Prank
Day 7: Rest (you've earned it!)
"""
},
{
    'name': 'bucket_list.txt',
    'content': """
1. Become a Professional Napper
2. Invent a New Pizza Topping
3. Win a Game of Monopoly
4. Learn to Speak Fluent Gibberish
5. Master the Art of Telekinesis
"""
}
]


def create_text_files(folder_path):
    # Ensure the folder exists
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

    for file in FILES:
        file_path = os.path.join(folder_path, file['name'])

        with open(file_path, 'w') as f:
            f.write(file['content'])
        print(f"File {file_path} created.")

if __name__ == "__main__":
    print("Welcome to the demo text file creator!")
    
    # Get folder path from user input
    current_dir = os.path.dirname(os.path.realpath(__file__))
    # get one folder up
    current_dir = os.path.dirname(current_dir)
    current_dir = os.path.join(current_dir, 'txt')
    
    folder_path = input("Enter the folder path where you want to create the text files (" + current_dir +"): ")
    if folder_path == "":
        folder_path = current_dir
    # Call the function to create text files
    create_text_files(folder_path)
