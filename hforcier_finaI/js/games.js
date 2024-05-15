// variables 
const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');
const titleTextElement = document.querySelector('.title-container .title-text');
const titleImage = document.getElementById('title-image');

// creates a start button + adds event listener to start game
const startButton = document.createElement('button');
startButton.innerText = 'Press Space to Start';
startButton.classList.add('btn');
startButton.addEventListener('click', startGame);

document.addEventListener('DOMContentLoaded', function() {
  let gameStarted = false;

  // add event listener for space key press
  document.addEventListener('keydown', function(event) {
    if ((event.key === ' ' || event.key === 'Spacebar') && !gameStarted) {
      startGame(); // start the game when space is pressed
      gameStarted = true; // update the game state to indicate it has started
      document.getElementById('option-buttons').style.display = 'block'; // show the option buttons
    }
  });

  // add event listener for click on the document
  document.addEventListener('click', function() {
    if (!gameStarted) {
      startGame(); // start the game when clicked anywhere on the document
      gameStarted = true; // update the game state to indicate it has started
      document.getElementById('option-buttons').style.display = 'block'; // show the option buttons AFTER the start screen
    }
  });
});

// function initializes game when start button is clicked
function startGame() {
  state = {};
  showTextNode(1);
  document.querySelector('.title-text').style.display = 'none'; // hide the title text
  textElement.style.display = 'block'; // show the text element when the game starts
  titleImage.style.display = 'none'; // hide the title image when the game starts
}


// displays text node content
function showTextNode(textNodeIndex) {
  textElement.style.display = 'block';
  console.log("Showing text node:", textNodeIndex);
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
  const text = textNode.text;
  const speed = 10; // to adjust visual typing speed
  let i = 0;

  // clear existing text
  textElement.innerText = '';

  // typewriter effect
  const interval = setInterval(() => {
    if (i < text.length) {
      textElement.innerText += text.charAt(i);
      if (text.charAt(i) === ' ') {
        textElement.innerText += '\xa0'; // add a non-breaking space
      }
      i++;
    } else {
      clearInterval(interval);

      // check if the current text node requires a name input prompt
      if (textNode.requiresNameInput) {
        // display the name input prompt
        showNamePrompt();
        return; // stop further execution until name is confirmed
      }

      // loop through options + create buttons
      textNode.options.forEach(option => {
        if (showOption(option)) {
          const button = document.createElement('button');
          button.innerText = option.text;
          button.classList.add('btn');
          button.addEventListener('click', () => selectOption(option));
          optionButtonsElement.appendChild(button);
        }
      });
    }
  }, speed);

  // clear existing option buttons
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }
}

// decides it should display an option based on the game state
function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

// called when user selects an option and will update the game state
function selectOption(option) {
  const nextTextNodeId = option.nextText;
  console.log("Next Text Node ID:", nextTextNodeId); // log the next text node ID
  if (nextTextNodeId <= 0) {
      return startGame();
  }
  state = Object.assign(state, option.setState);
  state.currentTextNodeId = nextTextNodeId; // set the current text node ID
  showTextNode(nextTextNodeId);
}

let playerName = "";

// displays prompt for name
function showNamePrompt() {
    document.getElementById("name-prompt").style.display = "block";
}


// text nodes for dialogue, narrative, and choices, etc
const textNodes = [
  {
    id: 1, 
    text: `Amidst a chaotic world consumed by the relentless tide of the undead,\n` +
          `humanity is on the brink of extinction. Cities have fallen, governments\n` +
          `have crumbled, and society as we knew it has vanished into the abyss.`,
    options: [
      {
        text: `NEXT`, 
        nextText: 2
      },
    ]
  },
  {
    id: 2, 
    text: `You emerge as one of the survivors, navigating a desolate landscape plagued \n` + 
          `by death and decay in this post-apocalyptic world.`, 
    options: [
      {
        text: `NEXT`,
        nextText: 3
      },
    ]
  },
  {
    id: 3,
    text: `Before we begin, what would you like to be called?`,
    requiresNameInput: true, // indicates that it requires name prompt
    options: [
      {
        text: `Enter Name:`,
        nextText: 4,
        action: showNamePrompt
      },
    ]

  },
  {
    id: 4,
    text: `You want to be called [input name], is that correct?`,
    options: [
      {
        text: `YES`,
        nextText: 5,
      },
      {
        text: `NO`,
        nextText: 3,
      }
    ]
  },
  {
    id: 5,
    text: `*I have heard rumors about a sanctuary beyond the wall,\n` +
          `whispers in the shadows. People say it is a place where civilization thrives,\n` +
          `where the dead do not walk, and the living can breathe easily. But can I trust\n` +
          `such tales? In a world where hope is as scarce as clean water, it is tempting\n` +
          `to cling to any glimmer of salvation.*`,
    options: [
      {
        text: `NEXT`,
        nextText: 6,
      },
    ]
  },
  {
    id: 6,
    text: `As you traverse through Silent Grove, you stumble upon a survivor.\n` + 
          `He looks up at you.`,
    options: [
      {
        text: `NEXT`,
        nextText: 7,
      },
    ]
  },
  {
    id: 7,
    text: `Survivor: "You must be [input name]. You're lookin' for the Sanctuary, ain't ya?"`,
    options: [
      {
        text: `"Uh, yeah... How did you...?"`,
        nextText: 8,
      },
      {
        text: `"What if I am? Do you know anything about it?"`,
        nextText: 8,
      },
      {
        text: `"What's it to you? Why are you asking?"`,
        nextText: 8,
      },
    ]
  },
  {
    id: 8,
    text: `Survivor: "I've seen that look before. The desperation, the hope in\n` +
          `your eyes. You ain't the first wanderer to come searchin' for it."`,
    options: [
      {
        text: `"I see... So, do you know anything about it?\n` +
              `About where it might be?"`,
        nextText: 9,
      },
    ]
  },
  {
    id: 9,
    text: `Survivor: "Maybe I do, maybe I don't. But what's it worth to you?"`,
    options: [
      {
        text: `"I don't have much to offer. Can't you just tell me?"`,
        nextText: 10,
      },
      {
        text: `"I'm not paying for information. I'll find my own way."`,
        nextText: 10,
      },
      {
        text: `"What do you mean?"`,
        nextText: 11,
      },
      {
        text: `"I'm willing to make a deal. What do you want in exchange?"`,
        nextText: 11,
      },
    ]
  },
  {
    id: 10,
    text: `Survivor: "Then I guess you'll just have to keep searchin' on your own.\n` + 
    `Good luck, kid."`,
    options: [
      {
        text: `"Wait, come back! Please, I need your help!"`,
        nextText: 11,
      },
      {
        text: `"Fine, be that way. I'll find it myself, no thanks to you."`,
        nextText: 13,
      },
      {
        text: `"I don't need luck. I'll find it, with or without your help."`,
        nextText: 13,
      },
    ]
  },
  {
    id: 11,
    text: `Survivor: "I'm lookin' for a keepsake from before the Fall.\n` +
          `Bring me my dad's gold coin and I'll give you the information you seek.\n` +
          `It should be around here somewhere."`,
    options: [
      {
        text: `"I'll get it for you in no time."`,
        nextText: 12,
      },
    ]
  },
  {
    id: 12,
    text: `You begin to search the area, not quite sure where to look.`,
    options: [
      {
        text: `NEXT`,
        nextText: 24,
      },
    ]
  },
  {
    id: 13,
    text: `*Fine by me. I'll find it on my own.*`,
    options: [
      {
        text: `NEXT`,
        nextText: 14,
      },
    ]
  },
  {
    id: 14,
    text: `*Maybe I should think again about the offer from the survivor.\n` + 
          `He could help me on my journey. But he might be leading me on\n` + 
          `a wild goose chase. Or I could go west, where there's only miles of forest.*`,
    options: [
      {
        text: `NEXT`,
        nextText: 15,
      },
    ]
  },
  {
    id: 15,
    text: `*What could possibly go wrong?*`,
    options: [
      {
        text: `"Hey, about earlier... I'm sorry. I shouldn't have been\n` +
              `so quick to brush off your offer."`,
        nextText: 11,
      },
      {
        text: `Go west.`,
        nextText: 16,
      },
    ]
  },
  {
    id: 16,
    text: `You begin your journey west.`,
    options: [
      {
        text: `NEXT`,
        nextText: 17,
      },
    ]
  },
  {
    id: 17,
    text: `About an hour into the journey,\n` +
          `a rustling noise emanates from the nearby bushes.`,
    options: [
      {
        text: `NEXT`,
        nextText: 18,
      },
    ]
  },
  {
    id: 18,
    text: `*Huh? What's that noise? It sounds like... someone or something is\n` + 
          `out there. Should I investigate? I could ignore it and keep heading west,\n` + 
          `or I could check it out.*`,
    options: [
      {
        text: `Investigate.`,
        nextText: 19,
      },
      {
        text: `Ignore it and keep moving.`,
        nextText: 20,
      },
    ]
  },
  {
    id: 19,
    text: `You walk slowly towards the bush.`,
    options: [
      {
        text: `NEXT`,
        nextText: 21,
      },
    ]
  },
  {
    id: 20,
    text: `You continue walking west.`,
    options: [
      {
        text: 'NEXT',
        nextText: 53,
      },
    ]
  },
  {
    id: 21,
    text: `*It's a horde of zombies! I need to get out of here, fast!*`,
    options: [
      {
        text: `NEXT`,
        nextText: 22,
      },
    ]
  },
  {
    id: 22,
    text: `Despite your best efforts,\n` + 
          `you are unable to escape the relentless pursuit of the zombies.`,
    options: [
      {
        text: `NEXT`,
        nextText: 23,
      },
    ]
  },
  {
    id: 23,
    text: `Your journey ends here, consumed by the zombie horde.`,
    options: [
      {
        text: `NEXT`,
        nextText: 400,
      },
    ]
  },
  {
    id: 24,
    text: `*All I see in the area are an abandoned hut,\n` +
          `a small cave, and a large boulder.\n` + 
          `Which one should I investigate first?*`,
    options: [
      {
        text: `Abandoned hut.`,
        nextText: 25,
      },
      {
        text: `Small cave.`,
        nextText: 26,
      },
      {
        text: `Large boulder.`,
        nextText: 27,
      },
    ]
  },
  {
    id: 25,
    text: `*The hut might hold some secrets. It's worth a closer look.*`,
    options: [
      {
        text: `NEXT`,
        nextText: 28,
      },
    ]
  },
  {
    id: 26,
    text: `*The cave seems like it could be hiding something valuable. I'll check it out.*`,
    options: [
      {
        text: `NEXT`,
        nextText: 49,
      },
    ]
  },
  {
    id: 27,
    text: `*The boulder looks odd. Maybe there's something hidden underneath it.*`,
    options: [
      {
        text: `NEXT`,
        nextText: 51,
      },
    ]
  },
  {
    id: 28,
    text: `*Where do I want to look?*`,
    options: [
      {
        text: `Rug.`,
        nextText: 29,
      },
      {
        text: `Closet.`,
        nextText: 30,
      },
      {
        text: `Kitchen cabinets.`,
        nextText: 31,
      },
    ]
  },
  {
    id: 29,
    text: `You spot a glimmer of gold hidden beneath the dusty old rug.`,
    options: [
      {
        text: `NEXT`,
        nextText: 32,
      },
    ]
  },
  {
    id: 30,
    text: `No luck.`,
    options: [
      {
        text: `TRY AGAIN`,
        nextText: 28,
      },
    ]
  },
  {
    id: 31,
    text: `No luck.`,
    options: [
      {
        text: `TRY AGAIN`,
        nextText: 28,
      },
    ]
  },
  {
    id: 32,
    text: `*Found it! The gold coin was hiding right under my nose.\n` +
          `Good thing I decided to explore this hut.*`,
    options: [
      {
        text: `NEXT`,
        nextText: 33,
      },
    ]
  },
  {
    id: 33,
    text: `You carefully pocket the coin,\n` +
          `ensuring it's safe before heading back to the survivor.`,
    options: [
      {
        text: `NEXT`,
        nextText: 34,
      },
    ]
  },
  {
    id: 34,
    text: `"Hey, here's the coin you asked for."`,
    options: [
      {
        text: `NEXT`,
        nextText: 35,
      },
    ]
  },
  {
    id: 35,
    text: `His eyes light up as he takes the coin.`,
    options: [
      {
        text: `NEXT`,
        nextText: 36,
      },
    ]
  },
  {
    id: 36,
    text: `Survivor: "Got somethin' that might catch yer eye. Follow me."`,
    options: [
      {
        text: `NEXT`,
        nextText: 37,
      },
    ]
  },
  {
    id: 37,
    text: `You follow him to a shack that you are positive wasn't there earlier,\n` +
          `but you brush it off.`,
    options: [
      {
        text: `NEXT`,
        nextText: 38,
      },
    ]
  },
  {
    id: 38,
    text: `Survivor: "Found this while rummagin' through some old ruins.\n` +
          `Looks like a piece of a map, but it's all torn up, see?"`,
    options: [
      {
        text: `NEXT`,
        nextText: 39,
      },
    ]
  },
  {
    id: 39,
    text: `You examine the map. It doesn't appear to be very conventional.\n` +
          `"Do you know where this leads?"`,
    options: [
      {
        text: `NEXT`,
        nextText: 40,
      },
    ]
  },
  {
    id: 40,
    text: `Survivor: "Not a clue, mate. But I reckon it's got somethin' worth findin'.\n` +
          `And you, my friend, look like the sort who can piece it together."`,
    options: [
      {
        text: `NEXT`,
        nextText: 41,
      },
    ]
  },
  {
    id: 41,
    text: `"You want me to find the missing pieces of the map?"`,
    options: [
      {
        text: `NEXT`,
        nextText: 42,
      },
    ]
  },
  {
    id: 42,
    text: `Survivor: "That's right. I wish you luck."`,
    options: [
      {
        text: `NEXT`,
        nextText: 43,
      },
    ]
  },
  {
    id: 43,
    text: `There's a crash outside the shack, and you quickly turn around to investigate.\n` +
          `It was just a squirrel.`,
    options: [
      {
        text: `NEXT`,
        nextText: 44,
      },
    ]
  },
  {
    id: 44,
    text: `"Will you accomp..."\n` +
          `*The survivor disappeared. He was just there a minute ago.*`,
    options: [
      {
        text: `NEXT`,
        nextText: 45,
      },
    ]
  },
  {
    id: 45,
    text: `After the fact settles in, you brush it off and head back outside.\n` +
          `You shudder and can't help but feel an odd presence nearby.\n` +
          `A crow is sitting atop the shack.`,
    options: [
      {
        text: `NEXT`,
        nextText: 46,
      },
    ]
  },
  {
    id: 46,
    text: `*You wonder if that may be... but stop yourself and chuckle. That's impossible.*`,
    options: [
      {
        text: `NEXT`,
        nextText: 47,
      },
    ]
  },
  {
    id: 47,
    text: `After securing the torn piece of the map in your pack,\n` +
          `you take one last look around at your surroundings.\n` +
          `*It's time to set off on the quest, in search of the next piece of the map.*`,
    options: [
      {
        text: `NEXT`,
        nextText: 48,
      },
    ]
  },
  {
    id: 48,
    text: `A cool breeze rustles through the trees,\n` +
          `carrying the promise of discovery and adventure,\n` +
          `and your heart beats with anticipation.`,
    options: [
      {
        text: `NEXT`,
        nextText: 401,
      },
    ]
  },
  {
    id: 49,
    text: `You enter the cave. It's smaller than you thought.`,
    options: [
      {
        text: `NEXT`,
        nextText: 50,
      },
    ]
  },
  {
    id: 50,
    text: `*I can't see in here and it appears there are no crevices for a coin to hide.*`,
    options: [
      {
        text: `TRY AGAIN`,
        nextText: 24,
      },
    ]
  },
  {
    id: 51,
    text: `You approach the large boulder,\n` +
          `its imposing presence casting a shadow over the surrounding area.`,
    options: [
      {
        text: `NEXT`,
        nextText: 52,
      },
    ]
  },
  {
    id: 52,
    text: `*This boulder weighs tons. What was I thinking?*`,
    options: [
      {
        text: `TRY AGAIN`,
        nextText: 24,
      },
    ]
  },
  {
    id: 53,
    text: `You hear the sound of footsteps behind you\n` +
          `growing louder with each passing moment`,
    options: [
      {
        text: `TURN AROUND`,
        nextText: 21,
      },
    ]
  },
  {
    id: 400,
    text: `Restart?`,
    options: [
      {
        text: `YES`,
        nextText: -1 // will bring back to start
      }
    ]
  },
  {
    id: 401,
    text: `The End. (For now.)`,
    options: [
      {
        text: `RESTART`,
        nextText: -1 // will bring back to start
      }
    ]
  },
];

// prompt for name
function promptForName() {
  let name = prompt("Before we begin, what would you like to be called?");
  return name;
}

function enterName() {
  document.getElementById('text').innerText = "Before we begin, what would you like to be called?";
  document.getElementById('option-buttons').style.display = 'none';
  document.getElementById('name-prompt').style.display = 'block';
}

// function to confirm that what the user entered is correct
function confirmName() {
  const playerName = document.getElementById("name-input").value;
  console.log("Player's name:", playerName); // log the player's name to the console for debugging

  state.playerName = playerName; // set the player's name in game state

  // hide the name input prompt after name is stored
  document.getElementById("name-prompt").style.display = "none";

  // replace the placeholder with the player's name in future text
  textNodes.forEach(node => {
    if (node.text.includes("[input name]")) {
      node.text = node.text.replace("[input name]", playerName);
    }
  });

  // show the next text node
  showTextNode(state.currentTextNodeId + 1);
}