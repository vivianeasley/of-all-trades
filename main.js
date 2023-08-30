import {getImage} from "./modules/pixelate";
import {perlinish} from "./modules/perlinish";
import {specialsText} from "/modules/specials";
import {createCharacter, getRandomIntInclusive, professions, generateStringHtml} from "./modules/character";
import {last} from "./modules/names";


const farmAnimalNoises = ["Chicken says cluck", "Pig says oink", "Cow says mooo", "Sheep says baaa", "Dog barks", "Goat gives a funny look and screams", "Horse whinnys"];
const wildAnimalNoises = ["Deer says EEuurrruu","Owl says hooo","Rat says squeak","Bat says chirp","Rabbit runs off and hides in the underbrush", "Wild dog yaps and barks"];

const storyNode = document.querySelector("#story");
const svg = document.querySelector("#game");
const qaudrant = [2, 2] // x, y
const player = [100, 100]; // x, y
let city; // x, y
const emojiIcons = ['🧕','🌲','🌳', '🛖','🏚️','⛪', '🏛️', '🏯', '🏰', '👶', '🧒', '🧓', '🧑‍🦱', '🧑‍🦰', '🧑‍🦳', '🧑', '👵', '👩‍🦱', '👩‍🦰', '👩‍🦳', '👱‍♀️', '👴', '👨‍🦱', '👨‍🦰', '👨‍🦳', '🧔', '🐓', '🐖', '🐂', '🐏','🐕','🐐','🐎','🦌', '🦉','🐀', '🦇','🐇','🐕','🪨', '🪵','⛲','🌳','📜','✨','🗝️','🕯️','🌈','🌺','🍄','🐚','💀','💎','🔔','🔮','🗿','🍋','🧜‍♂️','🛸','🏆']
const images = [];
let apprenticeIndex = 0;
const apprenticesArr = professions.flat();
let alienCoords;
let merfolkCount = 0;

for (let appIndex = 0; appIndex < apprenticesArr.length; appIndex++) {
  const liNode = document.createElement("li");
  liNode.textContent = apprenticesArr[appIndex] + ' - not apprenticed';
  document.querySelector("ol").appendChild(liNode);
}

const qauds = createQaudrants();

const canvasNode = document.querySelector('#perlin');
const noise = perlinish(canvasNode);
let structuresArr;
let dataTrees;

const biomeColors = {
  'water': '#00445a',
  'plains': '#359135',
  'forest': '#005a00',
  'mountain': 'grey',
  'snow': '#f1f1f1',
}

const keys = {
  'n': ()=>movePlayer(-1, -1), // N-
  'e': ()=>movePlayer(-1, 1), // E-
  'w': ()=>movePlayer(1, -1), // w-
  's': ()=>movePlayer(1, 1), // s-
  'nw': ()=>movePlayer(0, -1), // NW
  'sw': ()=>movePlayer(1, 0), // SW
  'se': ()=>movePlayer(0, 1), // SE
  'ne': ()=>movePlayer(-1, 0), // NE
}

document.querySelector("#ui").addEventListener('click', (e)=>{if (keys[e.target.dataset.d]) keys[e.target.dataset.d]()}, true)

const getData = () => qauds[qaudrant[1]]?.[qaudrant[0]]?.data;

//TODO DRY UP!
function movePlayer (x, y) {
  const data = getData();
  const biomePlacementArr = ["forest", "plains"];
  if (apprenticeIndex < 17) biomePlacementArr.push('water');

  // Off bottom
  if (player[1] >= 199) {
    manageDirection (0, 1);
    return;
  }
  // off top
  if (player[1] <= 0) {
    manageDirection (0, -1);
    return;
  };
  // off right
  if (player[0] >= 199) {
    manageDirection (1, 0);
    return;
  };
  if (player[0] <= 0) {
    manageDirection (-1, 0);
    return;
  };

  const biome = getBiome(data[player[1]+y]?.[player[0]+x]?.elevation);
  if (biome === "mountain" && apprenticeIndex < 8) {
    storyNode.textContent = "You need to have apprenticed with a ropemaker to ascend mountains.";
    return;
  }

  if (biome === "water" && apprenticeIndex < 17) {
    storyNode.textContent = "You need to have apprenticed with a shipwright to sail across the ocean.";
    return;
  }

  if (biome === "snow" && apprenticeIndex < 24) {
    storyNode.textContent = "You need to have apprenticed with a tailor to travel in snowy peaks.";
    return;
  }

  player[0] = player[0] + x;
  player[1] = player[1] + y;

  const person = data[player[1]]?.[player[0]]?.person
  if (apprenticesArr[apprenticeIndex] && person?.profession === apprenticesArr[apprenticeIndex]) {
    const apprNodes = document.querySelectorAll("ol > li");
    const node = generateStringHtml(person.data, person.profession, images);
    apprNodes[apprenticeIndex].textContent = '';
    apprNodes[apprenticeIndex].appendChild(node);
    createStars(3+apprenticeIndex);
    apprenticeIndex++
  }

  render();

  async function manageDirection (x, y) {
    if (!qauds[qaudrant[1]+y]?.[qaudrant[0]+x]) {
      storyNode.textContent = "You've reached the edge of this land. You can travel no further in this direction.";
      return;
    };
    if (y !== 0) {
      qaudrant[1] = qaudrant[1]+y;
      if (player[1] >= 199) {
        player[1] = 3;
      } else {
        player[1] = 196;
      }
    }
    if (x !== 0) {
      qaudrant[0] = qaudrant[0]+x;
      if (player[0] >= 199) {
        player[0] = 3;
      } else {
        player[0] = 196;
      }
    }
    const nextQuad = qauds[qaudrant[1]]?.[qaudrant[0]];
    if (typeof nextQuad[0] === 'number') {
      renderInitial();
    } else {
      const updatedCoords = await findNearest(player[0], player[1], biomePlacementArr);
      player[0] = updatedCoords[0];
      player[1] = updatedCoords[1];
      render();
    }
  }
}

setTimeout(async () => {
  await noise.generate();
  await noise.generate();
  await noise.generate();
  await noise.generate();
  await generateImages();
  renderInitial();
}, 1000);

async function renderInitial () {
  structuresArr = [...qauds[qaudrant[1]][qaudrant[0]]];
  dataTrees = await noise.getQaud(200*qaudrant[0], 200*qaudrant[1]);
  const tileData = await noise.getQaud(200*qaudrant[0], 200*qaudrant[1]);
  qauds[qaudrant[1]][qaudrant[0]] = {
    name: last[qaudrant[1] + qaudrant[0]],
    locs: [],
    data: tileData,
  }
  await defineTile();
  const updatedCoords = await findNearest(player[0], player[1], ["forest", "plains"]);
  player[0] = updatedCoords[0];
  player[1] = updatedCoords[1];
  await populateEntities();
  render();
}

async function findNearest (x, y, biomes) {
    const data = getData();
    let count = 1;
    let index = 0;
    let coordinates;
    const arr = [[-1, 1], [1, -1], [1, 1], [-1, -1], [0, 1], [-1, 0], [0, -1], [1, 0],];
    while (!coordinates) {
      if (!arr[index]) index = 0;
      coordinates = await check(arr, index, count, x, y, data, biomes);
      if (coordinates) {
        return coordinates;
      }
      count++;
      index++;
    }
}

function check (arr, index, count, x, y, data, biomes) {
  return new Promise(
    (resolve)=> {
        const updatedY = y+(arr[index][0])*count;
        const updatedX = x+(arr[index][1])*count;
        const tileData = data[updatedY] ? data[updatedY][updatedX] : undefined;
    
        if (typeof tileData !== undefined && biomes?.includes(tileData?.biome)){ 
          resolve([updatedX, updatedY]);
        } else {
          resolve(undefined);
        }
    }
  )
}

function createQaudrants () {
  let cityCount = 0; // max 2
  let townCount = 0; // max 5

  const qaudrants = [];
  for (let y = 0; y < 5; y++) {
    qaudrants.push([]);
    for (let x = 0; x < 5; x++) {
      qaudrants[y].push([]);
      const rand = Math.random();
      if (cityCount < 1 && y > 1 && rand > 0.95) {
        // place city
        city = [x, y];
        qaudrants[y][x].push(5);
        cityCount++;
      }
      if (townCount < 5 && rand > 0.7) {
        // place town
        qaudrants[y][x].push(4);
        townCount++;
      }
      // place Village
      if (Math.random() > 0.5) qaudrants[y][x].push(3);
      for (let structures = 0; structures < 10; structures++) {
        // place Farm
        if (Math.random() > 0.7) qaudrants[y][x].push(2);
        // place homestead
        if (Math.random() > 0.6) qaudrants[y][x].push(1);
      }
    }
  }
  if (cityCount === 0) {
    city = [0, 0];
    qaudrants[0][0].push(5);
    cityCount++;
  }

  return qaudrants;
}

function getBiome (elevation) {
  if (elevation < 20) return 'water';
  if (elevation >= 20 && elevation < 88) return 'plains';
  if (elevation >= 88 && elevation < 170) return 'forest';
  if (elevation >= 170 && elevation < 200) return 'mountain';
  if (elevation >= 200) return 'snow';
}

async function defineTile () {
  const data = getData();
  for (let yIndex = 0; yIndex < data.length; yIndex++) {
    for (let xIndex = 0; xIndex < data[yIndex].length; xIndex++) {
      const ent = await createEntity(data[yIndex][xIndex], yIndex, xIndex);
      data[yIndex][xIndex] = ent;
    }
  }
}

async function populateEntities () {
  const types = ["Homestead", "Farm", "Village", "Town", "City"];
  const data = getData();
  // Race condition here
  for (let typeIndex = 0; typeIndex < structuresArr.length; typeIndex++) {
    const id = structuresArr[typeIndex];
    let y = getRandomIntInclusive(0, 199);
    let x = getRandomIntInclusive(0, 199);
    const center = await getPlacement(id, x, y);
    // Place structures
    for (let structIndex = 0; structIndex < 6 - id; structIndex++) {
      let targetX = center[0];
      let targetY = center[1];
      targetX = targetX + (structIndex * getRandomIntInclusive(-2, 2));
      targetY = targetY + (structIndex * getRandomIntInclusive(-2, 2));
      const target = await getPlacement(id, targetY, targetX);
      qauds[qaudrant[1]][qaudrant[0]].locs.push([target[0], target[1]]);
      if (data[target[1]]?.[target[0]]) data[target[1]][target[0]].structure = {
        type: types[id - 1],
        imageId: getRandomIntInclusive(0, id-1) + 2
      }

      // place characters around structures
      for (let charIndex = 0; charIndex < getRandomIntInclusive(1,1+id); charIndex++) {
        let charTargetX = targetX + getRandomIntInclusive(-2, 2);
        let charTargetY = targetY + getRandomIntInclusive(-2, 2);
        if (charTargetX === targetX) charTargetX += 1;
        if (charTargetY === targetY) charTargetY += 1;
        charTargetX = charTargetX;
        charTargetY = charTargetY;
        const charTarget = await getPlacement(id, charTargetY, charTargetX);
        const charData = await createCharacter();
        const profs = professions[id-1];
        let profession = profs[Math.floor(Math.random() * profs.length)]
        if (charData.age < 20) profession = profession;
        if (charData.age < 10) profession = "Child";
        if (charData.age < 4) profession = "Infant";
        if (data[charTarget[1]]?.[charTarget[0]]) data[charTarget[1]][charTarget[0]].person = {
          data: charData,
          imageId: charData.imageId,
          profession
        }
        if (id === 1 || id === 2 && Math.random() > 0.3) {
          const num = getRandomIntInclusive(0, 6);
          const randNumY = getRandomIntInclusive(-1, 1);
          const randNumX = getRandomIntInclusive(-1, 1);
          const position = data[charTarget[1]+randNumY]?.[charTarget[0]+randNumX];
          if (position) position.animal = {
            id: num,
            imageId: 26 + num,
            story: farmAnimalNoises[num]
          }
        }
      }
    }
  }

  // TODO: This causes a race condition if set too high. I think it wa sthe create character function
  for (let randoIndex = 0; randoIndex < 80; randoIndex++) {
    let y = getRandomIntInclusive(0, 199);
    let x = getRandomIntInclusive(0, 199);

    if (Math.random() > 0.3) {
      const randoTarget = await getPlacement(6, x, y);
      const randoNum = getRandomIntInclusive(0, 5);
      data[randoTarget[1]][randoTarget[0]].animal = {
        id: randoNum,
        imageId: 33 + randoNum,
        story: wildAnimalNoises[randoNum]
      }
    } else {
      const randoTarget = await getPlacement(7, x, y);
      const randoData = await createCharacter();
      const randoProf = apprenticesArr[Math.floor(Math.random() * apprenticesArr.length)];
      data[randoTarget[1]][randoTarget[0]].person = {
        data: randoData,
        imageId: randoData.imageId,
        profession: randoProf,
        isWander: true,
      }

    }
  }
  for (let specialIndex = 0; specialIndex < getRandomIntInclusive(2, 4); specialIndex++) {
    let specialY = getRandomIntInclusive(0, 199);
    let specialX = getRandomIntInclusive(0, 199);
    const specialTarget = await getPlacement(7, specialX, specialY);
    const specialNum = getRandomIntInclusive(0, 17);
    data[specialTarget[1]][specialTarget[0]].special = {
      id: specialNum,
      imageId: 39 + specialNum,
      story: specialsText[specialNum]
    }
  }

  let helperY = getRandomIntInclusive(101, 102);
  let helperX = getRandomIntInclusive(101, 102);
  const helperTarget = await getPlacement(1, helperX, helperY);
  const helperData = await createCharacter();
  data[helperTarget[1]][helperTarget[0]].person = {
    data: helperData,
    imageId: helperData.imageId,
    profession: "Peddler",
    isWander: true,
  }

  // Place specials including UFO and mermaids
}

async function getPlacement (num, y, x) {
  let type = num === 4 || num === 5 ? ["plains"] :  ["forest", "plains"];
  if (num === 6) type = ["forest", "plains", "mountain", "water"];
  if (num === 7) type = ["forest", "plains", "mountain", "snow"];
  return await findNearest(x, y, type);
}

function createEntity (elValue, yIndex, xIndex) {
  return new Promise((resolve)=>{
      let special;
      if (elValue >= 214 && !alienCoords) {
          alienCoords = [qaudrant, [xIndex, yIndex]]
          special = {
          id: 58,
          imageId: 58,
          story: `Hello human. I admire your desire to understand all things. I have an offer for you. Travel with me and I will teach you all you could ever desire to know.`
        }
      }
      if (elValue <= 7 && alienCoords && merfolkCount < 5) {
          merfolkCount++;
          special = {
          id: 57,
          imageId: 57,
          story: `Hello human. The kingdom of the merfolk have watched your journeys. We know what you seek lies at ${alienCoords[1].join("-")} in the ${last[qaudrant[1] + qaudrant[0]]} fiefdom. Good luck.`
        }
      }
      const biome = getBiome(elValue);
      const tree = getTree(biome, elValue, dataTrees[yIndex][xIndex]);
      resolve({
        elevation: elValue,
        color: biomeColors[biome],
        biome,
        tree, // and not water or
        person: undefined,
        structure: undefined,
        animal: undefined,
        special,
      });
  })
}

function getTree (biome, elValue, treeValue) {
  let tree;
  if (treeValue > 18) {
    let hasTree = false;
    if (elValue === 19 && Math.random() > 0.98) {hasTree = true;} 
    else if (biome === 'forest' && Math.random() > 0.40) {hasTree = true;} 
    else if (biome === 'plains' && Math.random() > 0.85) {hasTree = true;} 
    else if (biome === 'mountain' && Math.random() > 0.85) {hasTree = true;} 
    else if (biome === 'snow' && Math.random() > 0.98) {hasTree = true;}

    if (hasTree) tree = {
      imageId: elValue > 100 ? 1 : 2,
    };
    return tree;
  }
}

function setVictory () {
  svg.classList.add("stars");
  setTimeout(() => {
    document.querySelector("#svg-wrap").innerHTML = `<img style="width:100%" src="${images[59]}">`
  }, 3000);

}

let start = false;
function render () {
  const tileNodes = document.querySelectorAll('.tile');
  const data = getData();
  const locData = data[player[1]][player[0]];
  let string = '';
  storyNode.innerHTML = '';

  if (!start) {
    string += "You set out on your journey to apprentice your way to the top! Start by finding a Peddler to apprentice under then a hunter, and so on.";
    start = true;
  }

  if (locData.structure) {
    string += `You approach a ${locData.structure.type}. `;
  }

  if (locData.animal) {
    string += `${locData.animal.story}. `;
  }

  if (locData.special) {
    string += `${locData.special.story} `;
    if (locData.special.id === 58) {
      setVictory();
    }
  }

  let personNode;
  if (locData.person) {
    let meetString;
    if (locData.person.isWander) {
      meetString = 'Walking out along a small path'
    } else {
      meetString = 'As you approach a settlment';
    }

    string += `${meetString}, you meet a ${locData.person.profession} named ${locData.person.data.name}. `;

    if (apprenticesArr[apprenticeIndex-1] && locData.person?.profession === apprenticesArr[apprenticeIndex-1]) {
      string += `You apprentice under ${locData.person.data.name}. `
    }

    if (locData.person.isWander) {
      if (Math.random() > 0.7) string += `They tell you of the largest city in the area. They say it's located in the fiefdom of ${last[city[1] + city[0]]}. `;
      string += `The ${locData.person.profession} shares the location of a settlment in this fiefdom: `;
      const settlements = qauds[qaudrant[1]]?.[qaudrant[0]].locs;
      string += `${settlements[Math.floor(Math.random()*settlements.length)].join("-")}`
    }
    personNode = generateStringHtml(locData.person.data, locData.person.profession, images);
  }
  if (string === '') string += `Location ${last[qaudrant[1] + qaudrant[0]]}(${qaudrant.join("-")}) fiefdom ${player.join("-")}. `; //

  storyNode.textContent = string;
  if (locData?.person?.profession === "lord" && apprenticeIndex >= 24) {
    storyNode.textContent = "The lord offer's you your final apprentiship. You have learned all that this great land has to offer. After years in service to the lord as their most trusted advisor you retire feeling oddly empty inside. Truly there must be more to know...";
    setVictory();
  }

  if (personNode) storyNode.append(personNode);

  if (tileNodes.length > 0) {
    for (let nodeIndex = 0; nodeIndex < tileNodes.length; nodeIndex++) {
      tileNodes[nodeIndex].remove();
    }
  }

  const xCoorStart = player[0]-3;
  const yCoorStart = player[1]-3;
  for (let y = 0; y < 14; y++) {
    let count = 0;
    if (y <= 6) {
      while (y-count > -1) {
        const coords = [(350-50*y)+count*100, 25*y-count];
        const pos = [ (y-count)+xCoorStart, (count)+yCoorStart];
        addElement([`M ${coords[0]} ${coords[1]} l 50 25 l -50 25 l -50 -25 Z`, `M ${coords[0]-50} ${coords[1]+25} l 50 25 l 0 45 l -50 -25 Z`, `M ${coords[0]} ${coords[1]+50} l 50 -25 l 0 45 l -50 25 Z`], (pos[0]) + '-' + (pos[1]), 'stone', coords, pos);
        count++;
      }    
    } else {
      while (count+(y-6) < 7) {
        const coords = [50+(50*(count+(y-6)))+count*50, 25*y-count];
        const pos = [(6-count)+xCoorStart, (count+(y-6))+yCoorStart];
        addElement([`M ${coords[0]} ${coords[1]} l 50 25 l -50 25 l -50 -25 Z`, `M ${coords[0]-50} ${coords[1]+25} l 50 25 l 0 45 l -50 -25 Z`, `M ${coords[0]} ${coords[1]+50} l 50 -25 l 0 45 l -50 25 Z`], (pos[0]) + '-' + (pos[1]), 'stone', coords, pos);
        count++;
      }
    }
  }

}

function addElement (points, id, biome, coordinates, pos) {
  const data = getData();
  let gElm = createElement('g');
  if (!data[pos[1]]?.[pos[0]]) return;
  const tileData = data[pos[1]][pos[0]];
  for (let pointsIndex = 0; pointsIndex < points.length; pointsIndex++) {
    let elm = createElement('path', points[pointsIndex]);
    elm.setAttribute("fill",tileData.color);
    if (pointsIndex > 0) elm.setAttribute("opacity", 0.7)
    gElm.appendChild(elm);
  }

  gElm.classList.add("tile");
  gElm.dataset.xyid = id;

  let diff = data[player[1]][player[0]].elevation - tileData.elevation;
  if (tileData.biome === 'water') diff = diff*0.5;
  if (tileData.biome === 'plains') diff = diff*2;
  if (tileData.biome === 'forest') diff = diff*3;
  if (tileData.biome === 'mountain') diff = diff*6;
  if (tileData.biome === 'snow') diff = diff*8;
  gElm.setAttribute("transform", `translate(0, ${diff})`);
  gElm.setAttribute("opacity", 1 - (diff*0.015))

  svg.appendChild(gElm);

  if (tileData.tree) {
    addImage(images[tileData.tree.imageId]);
  }

  if (tileData.structure) {
    addImage(images[tileData.structure.imageId]);
  }

  if (tileData.animal) {
    addImage(images[tileData.animal.imageId]);
  }

  if (tileData.person) {
    addImage(images[tileData.person.imageId]);
  }

  if (tileData.special) {
    addImage(images[tileData.special.imageId]);
  }

  if (id === player.join("-")) {
    addImage(images[0], 'player');
  }

  function createElement (type, pathPoints) {
    let newElement = document.createElementNS("http://www.w3.org/2000/svg", type);
    if (pathPoints && type === "path") {
      newElement.setAttribute("d",pathPoints);
    }
    return newElement;
  }

  function addImage (image, className) {
    const img = createElement('image');
    img.setAttribute('href', image);
    img.setAttribute('width', 100);
    img.setAttribute('height', 100);
    img.classList.add("tile");
    if (className) img.classList.add(className);
    img.setAttribute('x', coordinates[0] - 50);
    img.setAttribute('y', coordinates[1] - 70);
    img.setAttribute("transform", `translate(0, ${diff})`)
    img.setAttribute("opacity", 1 - (diff*0.01))
    svg.appendChild(img);
  }
}

function createStars (num) {
  const starsArr = [];
  for (let starIndex = 0; starIndex < num; starIndex++) {
    const star = document.createElement('img');
    star.src = images[44];
    star.style.top = getRandomIntInclusive(10, 20)+ '%';
    star.style.left = getRandomIntInclusive(10, 90)+ '%';
    star.classList.add("stars");
    starsArr.push(star);
    document.body.appendChild(star)
  }

  setTimeout(() => {
    for (let oldStarsIndex = 0; oldStarsIndex < starsArr.length; oldStarsIndex++) {
      starsArr[oldStarsIndex].remove();
    }
  }, 3000);
}

async function generateImages () {
  for (let imgIndex = 0; imgIndex < emojiIcons.length; imgIndex++) {
    const image = await getImage([emojiIcons[imgIndex]]);
    images.push(image);
  }
}