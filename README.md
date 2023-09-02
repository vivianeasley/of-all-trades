![Of All Trades gameplay screenshot.](https://vivianeasley.github.io/of-all-trades/screenshot.png)

# Play the game
[Of All Trades](https://vivianeasley.github.io/of-all-trades/)

# Of All Trades
Of all trades is a game made for the JSK13 competition and is about information sharing in the 13th century. Today we don't think about how easy and ubiquitous skill sharing is due books, internet, etc. The game's goal was to focus on how difficult it would have been to find an apprentice under trade masters at the time.

# Instructions
Click on the isometric image to move around. When your character is over the next tradesperson in your apprenticeship list you automatically learn that skill. Some skills let you traverse different terrains. When you complete the entire list and meet the lord of the lands you win the game. There are 25 fiefdoms in a grid and each fiefdom is 200 x 200 blocks. Trades people will be out wandering the countryside but generally you will find them in settlements (homesteads, farms, villages, towns, and the main city).

# Technical
This was a rushed job and could use more TLC but I’m happy with what I accomplished. The most interesting technical parts include:

Creating a large map that is 1000 X 1000 blocks (used to be 3 times that but was too big to be fun) without using perlin noise. To make the map I generate a hidden SVG with 100s of various shaped path elements. Then I blur them and add them to a canvas element. When I need a 200 x 200 grid of blocks for one of the fiefdoms I just get the pixels in that chunk of the canvas and use the color value (0-255) to determine elevation. This was less code than having a perlin noise library. Ideally I would have skipped using the SVG and instead just blurred canvas elements but canvas blurring wasn’t supported on iOS safari. This doubled the size of my mapmaking code.

For images I take UTF8 emoji and print them to a canvas I then go through pixel by pixel and replace the colors with the nearest color in a chosen color palette. The goal is to make them look more like old pixel art than current day emoji. The images are then stored as base64 in an array and used when needed.

Another interesting thing about the game is that the isometric game area is just an SVG because, why not.

