import {getImage} from "./modules/pixelate";
import {perlinish} from "./modules/perlinish";
import {specialsText} from "/modules/specials";
import {createCharacter, getRandomIntInclusive, professions, generateStringHtml} from "./modules/character";
import {last} from "./modules/names";


const farmAnimalNoises = ["Chicken says “Cluck", "Pig says “Oink", "Cow says “Mooo", "Sheep says “Baaa", "Dog barks", "Goat gives a funny look and screams", "Horse whinnies"];
const wildAnimalNoises = ["Deer says “EEuurrruu”","Owl says “Hooo”","Rat says “Squeak”","Bat says “Chirp”","Rabbit runs off and hides in the underbrush", "Wild dog yaps and barks"];
const types = ["Homestead", "Farm", "Village", "Town", "City"];

const setAtt = (node, key, value) => node.setAttribute(key, value);
const getNode = (target) => document.querySelector(target);
const getAllNodes = (targets) => document.querySelectorAll(targets);
const getRand = () => Math.random();
const randFromArr = (arr) => arr[Math.floor(getRand()*arr.length)];

const storyNode = getNode("#story");
const svg = getNode("#game");
const mapSvg = getNode("#map");
const qaudrant = [2, 2] // x, y
const player = [100, 100]; // x, y
let city; // x, y
const settlementFiefdoms = []
const emojiIcons = ['🧕','🌲','🌳', '🛖','🏚️','⛪', '🏛️', '🏯', '🏰', '👶', '🧒', '🧓', '🧑‍🦱', '🧑‍🦰', '🧑‍🦳', '🧑', '👵', '👩‍🦱', '👩‍🦰', '👩‍🦳', '👱‍♀️', '👴', '👨‍🦱', '👨‍🦰', '👨‍🦳', '🧔', '🐓', '🐖', '🐂', '🐏','🐕','🐐','🐎','🦌', '🦉','🐀', '🦇','🐇','🐕','🪨', '🪵','⛲','🌳','📜','✨','🗝️','🕯️','🌈','🌺','🍄','🐚','💀','💎','🔔','🔮','🗿','🍋','🧜‍♂️','🛸','🏆']
const images = [];
let apprenticeIndex = 0;
const apprenticesArr = professions.flat();

let alienCoords;
let merfolkCount = 0;
let lordCount = 0;

for (let appIndex = 0; appIndex < apprenticesArr.length; appIndex++) {
  const liNode = document.createElement("li");
  liNode.textContent = apprenticesArr[appIndex] + ' - not apprenticed';
  getNode("ol").appendChild(liNode);
}

const qauds = createQaudrants();

const canvasNode = getNode('#perlin');
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

getNode("#ui").addEventListener('click', (e)=>{if (keys[e.target.dataset.d]) keys[e.target.dataset.d]()}, true)

const getData = () => qauds[qaudrant[1]]?.[qaudrant[0]]?.data;
function getQaudName (x, y) {
  if (x && y) return last[y*5 + x];
  return last[qaudrant[1]*5 + qaudrant[0]];
};

//TODO DRY UP!
async function movePlayer (x, y) {
  const data = getData();
  const biomePlacementArr = ["forest", "plains"];
  if (apprenticeIndex > 16) biomePlacementArr.push('water');
  if (apprenticeIndex > 8) biomePlacementArr.push('mountain');
  if (apprenticeIndex > 24) biomePlacementArr.push('snow');
  // console.log("Allowed Biomes", biomePlacementArr); // TODO remove
  const newPlayer = [... player];
  newPlayer[1]+=y;
  newPlayer[0]+=x;

  if (newPlayer[1] >= 199 ||
    newPlayer[1] <= 0 ||
    newPlayer[0] >= 199 ||
    newPlayer[0] <= 0) {
    await manageDirection ();
    return;
  }

  const biome = getBiome(data[newPlayer[1]]?.[newPlayer[0]]?.elevation);
  if (biome === "mountain" && apprenticeIndex < 8) {
    storyNode.textContent = "You need to apprentice with a ropemaker to ascend mountains.";
    return;
  }

  if (biome === "water" && apprenticeIndex < 17) {
    storyNode.textContent = "You need to apprentice with a shipwright to sail across the ocean.";
    return;
  }

  if (biome === "snow" && apprenticeIndex < 24) {
    storyNode.textContent = "You need to apprentice with a tailor to ascend snowy peaks.";
    return;
  }

  player[0] = newPlayer[0];
  player[1] = newPlayer[1];

  const person = data[player[1]]?.[player[0]]?.person
  if (apprenticesArr[apprenticeIndex] && person?.profession === apprenticesArr[apprenticeIndex]) {
    const apprNodes = getAllNodes("ol > li");
    const node = generateStringHtml(person.data, person.profession, images);
    apprNodes[apprenticeIndex].textContent = '';
    apprNodes[apprenticeIndex].appendChild(node);
    createStars(3+apprenticeIndex);
    apprenticeIndex++
  }

  render();

  async function manageDirection () {
    if (!qauds[qaudrant[1]+y]?.[qaudrant[0]+x]) {
      storyNode.textContent = "You've reached the edge of this land. You can travel no further in this direction.";
      return;
    };
    const lastMapTile = getNode(`#m${qaudrant[1]}-${qaudrant[0]}`);
    lastMapTile.removeAttribute('style')
    if (y !== 0 && x !== 0) {
      if (newPlayer[1] >= 198) {
        qaudrant[1] = qaudrant[1]+1;
        player[1] = 2;
      } else if (newPlayer[0] >= 198) {
        qaudrant[0] = qaudrant[0]+1;
        player[0] = 2;
      } else if (newPlayer[1] <= 2) {
        qaudrant[1] = qaudrant[1]-1;
        player[1] = 198;
      } else {
        qaudrant[0] = qaudrant[0]-1;
        player[0] = 198;
      }
    } else if (y !== 0) {
      if (newPlayer[1] >= 198) {
        qaudrant[1] = qaudrant[1]+1;
        player[1] = 2;
      } else {
        qaudrant[1] = qaudrant[1]-1;
        player[1] = 198;
      }
    } else if (x !== 0) {
      if (newPlayer[0] >= 198) {
        qaudrant[0] = qaudrant[0]+1;
        player[0] = 2;
      } else {
        qaudrant[0] = qaudrant[0]-1;
        player[0] = 198;
      }
    }

    const newMapTile = getNode(`#m${qaudrant[1]}-${qaudrant[0]}`);
    setAtt(newMapTile, 'style', "fill: red");

    if (!qauds[qaudrant[1]]?.[qaudrant[0]].name) {
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
  buildMap();
  renderInitial();
}, 1000);

async function renderInitial () {
  structuresArr = [...qauds[qaudrant[1]]?.[qaudrant[0]]];
  dataTrees = await noise.getQaud(200*qaudrant[0], 200*qaudrant[1]);
  const tileData = await noise.getQaud(200*qaudrant[0], 200*qaudrant[1]);
  qauds[qaudrant[1]][qaudrant[0]] = {
    name: getQaudName(),
    locs: [],
    locIds: [],
    data: tileData,
  }
  await defineTile();
  const availableBiomes = ["forest", "plains"];
  if (apprenticeIndex > 16) availableBiomes.push('water');
  if (apprenticeIndex > 8) availableBiomes.push('mountain');
  if (apprenticeIndex > 24) availableBiomes.push('snow');
  // console.log("Allowed Biomes", availableBiomes); // TODO remove
  const updatedCoords = await findNearest(player[0], player[1], availableBiomes);
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
    while (!coordinates && count < 200) {
      if (!arr[index]) index = 0;
      coordinates = await check(arr, index, count, x, y, data, biomes);
      if (coordinates) {
        return coordinates;
      }
      count++;
      index++;
    }
    return [100, 100]; // TODO: should actually maybe call again with diff coords
}

function check (arr, index, count, x, y, data, biomes) {
  return new Promise(
    (resolve)=> {
        const updatedY = y+(arr[index][0])*count;
        const updatedX = x+(arr[index][1])*count;
        const tileData = data[updatedY] ? data[updatedY][updatedX] : undefined;
        if (typeof tileData !== undefined && biomes?.includes(tileData?.biome) && updatedY < 195 && updatedY > 5 && updatedX < 195 && updatedX > 5){ 
          resolve([updatedX, updatedY]);
        } else {
          resolve(false);
        }
    }
  )
}

function createQaudrants () {
  let cityCount = 0; // max 2
  let townCount = 0; // max 10

  const qaudrants = [];
  for (let y = 0; y < 5; y++) {
    qaudrants.push([]);
    for (let x = 0; x < 5; x++) {
      qaudrants[y].push([]);
      const rand = Math.random();
      if (cityCount < 1 && y > 1 && rand > 0.4) {
        // place city
        city = [x, y];
        settlementFiefdoms.push(`They tell you there is a city in the ${getQaudName(x, y)} fiefdom. `);
        qaudrants[y][x].push(5);
        cityCount++;
      }
      if (townCount < 11 && rand > 0.7) {
        // place town
        settlementFiefdoms.push(`They tell you there is a town in the ${getQaudName(x, y)} fiefdom. `);
        qaudrants[y][x].push(4);
        townCount++;
      }
      // place Village
      if (Math.random() > 0.6) qaudrants[y][x].push(3);
      for (let structures = 0; structures < 10; structures++) {
        // place Farm
        if (Math.random() > 0.6) qaudrants[y][x].push(2);
        // place homestead
        if (Math.random() > 0.5) qaudrants[y][x].push(1);
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
  const data = getData();
  // Race condition here
  for (let typeIndex = 0; typeIndex < structuresArr.length; typeIndex++) {
    const id = structuresArr[typeIndex];
    let y = getRandomIntInclusive(10, 189);
    let x = getRandomIntInclusive(10, 189);
    console.log(id)
    const center = await getPlacement(id, x, y);
    // Place structures
    for (let structIndex = 0; structIndex < id; structIndex++) {
      let targetX = center[0];
      let targetY = center[1];
      targetX = targetX + (structIndex * getRandomIntInclusive(-3, 3));
      targetY = targetY + (structIndex * getRandomIntInclusive(-3, 3));
      const target = await getPlacement(id, targetY, targetX);
      const currentFief = qauds[qaudrant[1]][qaudrant[0]];
      currentFief.locs.push([target[0], target[1]]);
      currentFief.locIds.push(id - 1);
      if (data[target[1]]?.[target[0]]) data[target[1]][target[0]].structure = {
        type: types[id - 1],
        imageId: structIndex+3
      }
      console.log(types[id - 1], targetX, targetY, qaudrant)

      // place characters around structures
      const profs = professions[id-1];
      for (let charIndex = 0; charIndex < profs.length; charIndex++) {
        let charTargetX = target[0] + getRandomIntInclusive(-4, 4);
        let charTargetY = target[1] + getRandomIntInclusive(-4, 4);
        if (charTargetX === target[0]) charTargetX += 1;
        if (charTargetY === target[1]) charTargetY += 1;
        const charTarget = await getPlacement(id, charTargetY, charTargetX);
        const charData = await createCharacter();

        let profession = profs[charIndex];
        if (charData.age < 20) profession = profession;
        if (charData.age < 10 && profession !== "Lord") profession = "Child";
        if (charData.age < 4 && profession !== "Lord") profession = "Infant";
        if (id === 5 && lordCount < 2 && profession === "Lord") {
          lordCount++;
        } else if (profession === "Lord" && lordCount >= 2) {profession = "Jester"}
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
    let y = getRandomIntInclusive(10, 189);
    let x = getRandomIntInclusive(10, 189);

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
      const randoProf = randFromArr(apprenticesArr);
      data[randoTarget[1]][randoTarget[0]].person = {
        data: randoData,
        imageId: randoData.imageId,
        profession: randoProf === "Lord" ? "Jester" : randoProf,
        isWander: true,
      }

    }
  }
  for (let specialIndex = 0; specialIndex < 8; specialIndex++) {
    let specialY = getRandomIntInclusive(10, 189);
    let specialX = getRandomIntInclusive(10, 189);
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
  let type = ["forest", "plains"];
  if (num > 3) type.push("mountain");
  if (num === 6) type.push("water");
  if (num === 7) type.push("snow");
  return await findNearest(x, y, type);
}

function createEntity (elValue, yIndex, xIndex) {
  return new Promise((resolve)=>{
      let special;
      if (elValue >= 210 && !alienCoords && xIndex > 3 && yIndex > 3 && xIndex < 198 && yIndex < 198) {
          alienCoords = [qaudrant, [xIndex, yIndex]]
          special = {
          id: 58,
          imageId: 58,
          story: `Hello human. I admire your desire to understand all things. I have an offer for you. Travel with me and I will teach you all you could ever desire to know.`
        }
        console.log("Alien", yIndex, xIndex, "qaud", qaudrant)
      }
      if (elValue <= 16 && alienCoords && merfolkCount < 1 && xIndex > 3 && yIndex > 3 && xIndex < 198 && yIndex < 198) {
          merfolkCount++;
          special = {
          id: 57,
          imageId: 57,
          story: `Hello human. The kingdom of the merfolk has watched your journey. We know what you seek lies at ${alienCoords[1].join("-")} in the ${getQaudName()} fiefdom. Good luck.`
        }
        console.log("merfolk", yIndex, xIndex, "qaud", qaudrant)
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
    getNode("#svg-wrap").innerHTML = `<img style="width:100%" src="${images[59]}">`
  }, 3000);

}

let start = false;
function render () {
  const tileNodes = getAllNodes('.tile');
  const data = getData();
  const locData = data[player[1]][player[0]];
  let string = '';
  storyNode.innerHTML = '';

  if (!start) {
    string += "HOW TO PLAY: Start by finding a peddler to apprentice under, then a hunter, and so on. Click on areas of the image to move in different directions. The map in the top left shows the 25 fiefdoms you can explore, and the red square marks your current location. Specific trades people will be around different types of settlements. Homesteads include the first 3 trades, farms the next 3, villages the next 6, towns the next 8, and the city will have the rest.";
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
      meetString = 'As you approach a settlement';
    }

    string += `${meetString}, you meet a ${locData.person.profession} named ${locData.person.data.name}. `;

    if (apprenticesArr[apprenticeIndex-1] && locData.person?.profession === apprenticesArr[apprenticeIndex-1]) {
      string += `You apprentice under ${locData.person.data.name}. `
    }

    if (locData.person) {
      let levelTotals = 0;
      const levels = professions.map((prof)=>(levelTotals += prof.length));
      const settlements = qauds[qaudrant[1]]?.[qaudrant[0]].locs;
      const settlementIds = qauds[qaudrant[1]]?.[qaudrant[0]].locIds;
      const settlementIndices = settlementIds.map((num, i)=>{
        const bottom = levels[num - 1] ?? 0;
        return apprenticeIndex < levels[num] && apprenticeIndex >= bottom ? i : -1;
      })
      const randIndex = randFromArr(settlementIndices.filter((int)=> int >= 0));
      const typeId = settlementIds[randIndex];
      if (typeId !== undefined && settlements.length > 0 ) {
        string += `The ${locData.person.profession} shares the location of a *${types[typeId]}* in this fiefdom around ${settlements[randIndex].join("-")}. They say that the trades there are: ${professions[typeId].join(", ")}.`;
      } else {
        string += `They tell you to look to another fiefdom for your next apprentiships. ${typeId === 4 ? 'Check the ' + getQaudName(city[0], city[1]) + 'fiefdom. ' : ''}`
      }
    }
    personNode = generateStringHtml(locData.person.data, locData.person.profession, images);
  }
  if (string === '') string += `Location ${getQaudName()} fiefdom (${qaudrant.join("-")}) ${player.join("-")}. `;

  storyNode.textContent = string;
  if (locData?.person?.profession === "Lord" && apprenticeIndex >= 25) {
    storyNode.textContent = "The lord offers you your final apprenticeship. You have learned all that this great land has to offer. After years in service to the lord as their most trusted advisor, you retire feeling oddly empty inside. Truly, there must be more to know...";
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
        addElement([`M ${coords[0]} ${coords[1]} l 50 25 l -50 25 l -50 -25 Z`, `M ${coords[0]-50} ${coords[1]+25} l 50 25 l 0 45 l -50 -25 Z`, `M ${coords[0]} ${coords[1]+50} l 50 -25 l 0 45 l -50 25 Z`], (pos[0]) + '-' + (pos[1]), coords, pos);
        count++;
      }    
    } else {
      while (count+(y-6) < 7) {
        const coords = [50+(50*(count+(y-6)))+count*50, 25*y-count];
        const pos = [(6-count)+xCoorStart, (count+(y-6))+yCoorStart];
        addElement([`M ${coords[0]} ${coords[1]} l 50 25 l -50 25 l -50 -25 Z`, `M ${coords[0]-50} ${coords[1]+25} l 50 25 l 0 45 l -50 -25 Z`, `M ${coords[0]} ${coords[1]+50} l 50 -25 l 0 45 l -50 25 Z`], (pos[0]) + '-' + (pos[1]), coords, pos);
        count++;
      }
    }
  }

}

function addElement (points, id, coordinates, pos) {
  const data = getData();
  let gElm = createElement('g');
  if (!data[pos[1]]?.[pos[0]]) return;
  const tileData = data[pos[1]][pos[0]];
  for (let pointsIndex = 0; pointsIndex < points.length; pointsIndex++) {
    let elm = createElement('path', points[pointsIndex]);
    setAtt(elm,"fill",tileData.color)
    if (pointsIndex > 0) setAtt(elm, "opacity", 0.7)
    gElm.appendChild(elm);
  }

  gElm.classList.add("tile");
  gElm.dataset.xyid = id;

  let diff = data[player[1]][player[0]].elevation - tileData.elevation;
  if (tileData.biome === 'water') diff = diff*0.5;
  if (tileData.biome === 'plains') diff = diff*2.5;
  if (tileData.biome === 'forest') diff = diff*3.5;
  if (tileData.biome === 'mountain') diff = diff*6;
  if (tileData.biome === 'snow') diff = diff*8;
  setAtt(gElm, "transform", `translate(0, ${diff})`);
  setAtt(gElm, "opacity", 1 - (diff*0.015))

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

  function addImage (image, className) {
    const img = createElement('image');
    setAtt(img,'href', image);
    setAtt(img,'width', 100);
    setAtt(img,'height', 100);
    img.classList.add("tile");
    if (className) img.classList.add(className);
    setAtt(img,'x', coordinates[0] - 50);
    setAtt(img,'y', coordinates[1] - 70);
    setAtt(img,"transform", `translate(0, ${diff})`)
    setAtt(img,"opacity", 1 - (diff*0.01))
    svg.appendChild(img);
  }
}

function createElement (type, pathPoints) {
  let newElement = document.createElementNS("http://www.w3.org/2000/svg", type);
  if (pathPoints && type === "path") {
    setAtt(newElement,"d",pathPoints);
  }
  return newElement;
}

function buildMap () {
  for (let mapYIndex = 0; mapYIndex < 5; mapYIndex++) {
    for (let mapXIndex = 0; mapXIndex < 5; mapXIndex++) {
      const fief = createElement('rect');
      setAtt(fief, 'width', 10);
      setAtt(fief, 'height', 10);
      setAtt(fief, 'x', mapXIndex*10);
      setAtt(fief, 'y', mapYIndex*10);
      setAtt(fief, 'id', 'm'+mapXIndex+"-"+ mapYIndex);
      if (mapXIndex === 2 && mapYIndex === 2) setAtt(fief, 'style', "fill: red");
      const title = createElement('title');
      title.textContent = last[mapXIndex*5 +mapYIndex];
      fief.appendChild(title);
      mapSvg.appendChild(fief);
    }
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
