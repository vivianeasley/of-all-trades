import {getImage} from "./modules/pixelate";
import {perlinish} from "./modules/perlinish";
import {setUpKeys} from "./modules/key";
import {createCharacter, getRandomIntInclusive, professions, generateStringHtml} from "./modules/character";


/////////////// Wed

// build 2d array of qaudrants with number of home steads, villages, etc
// place when generating a qaudrant along with buildings and characters 
// make sure you place on plains or forest
// make when you go to next qaudrant generate

// setup tabbed screen
//// you can apprentice with various people


//// make homesteads, farms, villages, towns, cities
//// choose area 4x4, 8x8, 12x12, 18x18, 30x30 place buildings accordingly
// homestead 1 hut
// farm 1-2 hut or house
// 3-5 hut or house
// 6-10 hut or house and one manor ⛪
// 11-20 hut or house or manor and one castle fountain, etc ⛪ 🏛️

////////////////Wed

// extra credit:
// make cubes
// add story
// (fast travel to characters)
// show coordinates
// add animals
// add standing stones
// add special


const svg = document.querySelector("svg");
const qaudrant = [10, 10] // x, y
const player = [50, 50]; // x, y
const emojiIcons = ['🧕','🌲','🌳', '🛖','🏚️','⛪', '🏛️', '🏯', '🏰', '👶', '🧒', '🧓', '🧑‍🦱', '🧑‍🦰', '🧑‍🦳', '🧑', '👵', '👩‍🦱', '👩‍🦰', '👩‍🦳', '👱‍♀️', '👴', '👨‍🦱', '👨‍🦰', '👨‍🦳', '🧔', '🐓', '🐖', '🐂', '🐏', '🦌', '🦉', '🐀', '🦇', '🪨', '🛸', '🪵','⛲','🦑','🧜‍♂️','✨']
const images = [];

const tabs = document.querySelectorAll(".tab");
const panes = document.querySelectorAll(".pane");
tabs[0].addEventListener("click", ()=>{
  panes[0].classList.remove("hidden");
  panes[1].classList.add("hidden");
})
tabs[1].addEventListener("click", ()=>{
  panes[1].classList.remove("hidden");
  panes[0].classList.add("hidden");
})
let apprenticeIndex = 0;
const apprenticesArr = professions.flat();

for (let appIndex = 0; appIndex < apprenticesArr.length; appIndex++) {
  const liNode = document.createElement("li");
  liNode.textContent = apprenticesArr[appIndex] + ' - not apprenticed';
  document.querySelector("ol").appendChild(liNode);
}

const qauds = createQaudrants();

const canvasNode = document.querySelector('#perlin');
const noise = perlinish(canvasNode);
let structuresArr;
const dataTrees = noise.generate();

const biomeColors = {
  'water': '#00445a',
  'plains': '#359135',
  'forest': '#005a00',
  'mountain': 'grey',
  'snow': '#f1f1f1',
}

const keys = {
  'w': ()=>movePlayer(-1, -1), // N-
  'd': ()=>movePlayer(-1, 1), // E-
  'a': ()=>movePlayer(1, -1), // S-
  's': ()=>movePlayer(1, 1), // W-
  'q': ()=>movePlayer(0, -1), // NE
  'z': ()=>movePlayer(1, 0), // SE
  'x': ()=>movePlayer(0, 1), // SW
  'e': ()=>movePlayer(-1, 0), // NW
}

const actions = {

}

// TODO: make this work
// const getData = () => qauds[qaudrant[1]][qaudrant[0]];

//TODO DRY UP!
function movePlayer (x, y) {
  const data = qauds[qaudrant[1]][qaudrant[0]]

  // Off bottom
  if (!data[player[1]+y]?.[player[0]+x]) {
    if (player[1] >= 199) {
      if (!qauds[qaudrant[1]+1]?.[qaudrant[0]]) return; // TODO: you found the edge of the world
      qaudrant[1] = qaudrant[1]+1;
      let nextQuad = qauds[qaudrant[1]]?.[qaudrant[0]];
      player[1] = 0;
      if (typeof nextQuad[0] === 'number') {
        renderInitial(); // TODO: will maybe need await
      } else {
        // TODO: player must end up in plains or forest
        render();
      }
      return;
    }
    // off top
    if (player[1] <= 0) {
      if (!qauds[qaudrant[1]-1]?.[qaudrant[0]]) return; // TODO: you found the edge of the world
      let nextQuad = qauds[qaudrant[1]]?.[qaudrant[0]];
      player[1] = 199;
      if (typeof nextQuad[0] === 'number') {
        renderInitial(); // TODO: will maybe need await
      } else {
        // TODO: player must end up in plains or forest
        render();
      }
      return;
    };
    // off right
    if (player[0] >= 199) {
      if (!qauds[qaudrant[1]]?.[qaudrant[0]+1]) return; // TODO: you found the edge of the world
      qaudrant[0] = qaudrant[0]+1;
      let nextQuad = qauds[qaudrant[1]]?.[qaudrant[0]];
      player[0] = 0;
      if (typeof nextQuad[0] === 'number') {
        renderInitial(); // TODO: will maybe need await
      } else {
        // TODO: player must end up in plains or forest
        render();
      }
      return;
    };
    if (player[0] <= 0) {
      if (!qauds[qaudrant[1]]?.[qaudrant[0]-1]) return; // TODO: you found the edge of the world
      qaudrant[0] = qaudrant[0]-1;
      let nextQuad = qauds[qaudrant[1]]?.[qaudrant[0]];
      player[0] = 199;
      if (typeof nextQuad[0] === 'number') {
        renderInitial(); // TODO: will maybe need await
      } else {
        // TODO: player must end up in plains or forest
        render();
      }
      return;
    };
  }


  const biome = getBiome(data[player[1]+y][player[0]+x].elevation);

  if (biome === "mountain" && apprenticeIndex < 8) {
    // alert("You need to have apprenticed with a ropemaker to ascend mountains."); // TODO text
    return;
  }

  if (biome === "water" && apprenticeIndex < 17) {
    // alert("You need to have apprenticed with a shipwright to sail across the ocean.");
    return;
  }

  if (biome === "snow" && apprenticeIndex < 24) {
    // alert("You need to have apprenticed with a tailor to travel in snowy peaks.");
    return;
  }

  player[0] = player[0] + x;
  player[1] = player[1] + y;

  const person = data[player[1]][player[0]].person
  if (apprenticesArr[apprenticeIndex] && person?.profession === apprenticesArr[apprenticeIndex]) {
    const apprNodes = document.querySelectorAll("ol > li");
    const node = generateStringHtml(person.data, person.profession, images);
    apprNodes[apprenticeIndex].textContent = '';
    apprNodes[apprenticeIndex].appendChild(node);
    apprenticeIndex++
  }

  render();
}

setUpKeys(keys);

setTimeout(async () => {
  await generateImages();
  renderInitial();
}, 1000);

async function renderInitial () {
  structuresArr = [...qauds[qaudrant[1]][qaudrant[0]]];
  qauds[qaudrant[1]][qaudrant[0]] = noise.generate();// TODO: put in promise, make awaitable
  await defineTile();
  const updatedCoords = findNearest(player[0], player[1], ["forest", "plains"]);
  player[0] = updatedCoords[0];
  player[1] = updatedCoords[1];
  populateEntities();
  render();
}

function findNearest (x, y, biomes) {
  const data = qauds[qaudrant[1]][qaudrant[0]];
  let count = 1;
  let index = 0;
  const arr = [[-1, 1], [1, -1], [1, 1], [-1, -1], [0, 1], [-1, 0], [0, -1], [1, 0],];
  while (count < 49) {
    if (!arr[index]) index = 0;
    const updatedY = y+(count*arr[index][0]);
    const updatedX = x+(count*arr[index][1]);
    const tileData = data[updatedY] ? data[updatedY][updatedX] : undefined;

    if (tileData && biomes.includes(tileData.biome)) return [updatedX, updatedY];
    count++;
    index++;
  }
}

function createQaudrants () {
  let cityCount = 0; // max 2
  let townCount = 0; // max 5

  const qaudrants = [];
  for (let y = 0; y < 21; y++) {
    qaudrants.push([]);
    for (let x = 0; x < 21; x++) {
      qaudrants[y].push([]);
      const rand = Math.random();
      if (cityCount < 2 && y > 1 && rand > .99) {
        // place city
        qaudrants[y][x].push(5);
        cityCount++;
      }
      if (townCount < 5 && rand > .99) {
        // place town
        qaudrants[y][x].push(4);
        townCount++;
      }
      // place Village
      if (Math.random() > 0.8) qaudrants[y][x].push(3);
      for (let structures = 0; structures < 10; structures++) {
        // place Farm
        if (Math.random() > 0.9) qaudrants[y][x].push(2);
        // place homestead
        if (Math.random() > 0.8) qaudrants[y][x].push(1);
      }
    }
  }
  return qaudrants;
}

function getBiome (elevation) {
  if (elevation < 20) return 'water';
  if (elevation >= 20 && elevation < 88) return 'plains';
  if (elevation >= 88 && elevation < 158) return 'forest';
  if (elevation >= 158 && elevation < 200) return 'mountain';
  if (elevation >= 200) return 'snow';
}

async function defineTile () {
  const data = qauds[qaudrant[1]][qaudrant[0]];
  for (let yIndex = 0; yIndex < data.length; yIndex++) {
    for (let xIndex = 0; xIndex < data[yIndex].length; xIndex++) {
      const ent = await createEntity(data[yIndex][xIndex], yIndex, xIndex);
      data[yIndex][xIndex] = ent;
    }
  }
}

async function populateEntities () {
  // loop through arr place structures then people around structures
  // place 1-3 wanderers
  const types = ["Homestead", "Farm", "Village", "Town", "City"];
  const data = qauds[qaudrant[1]][qaudrant[0]];
  for (let typeIndex = 0; typeIndex < structuresArr.length; typeIndex++) {
    const id = structuresArr[typeIndex];
    let y = getRandomIntInclusive(0, data?.length ?? 20);
    let x = getRandomIntInclusive(0, data[y]?.length ?? 20);
    const center = getPlacement(id, x, y);
    // Place structures
    for (let structIndex = 0; structIndex < 6 - id; structIndex++) {
      let targetX = center[0];
      let targetY = center[1];
      targetX = targetX + (structIndex * getRandomIntInclusive(-2, 2));
      targetY = targetY + (structIndex * getRandomIntInclusive(-2, 2));
      const target = getPlacement(id, targetY, targetX);
      data[target[1]][target[0]].structure = {
        type: types[id],
        imageId: getRandomIntInclusive(0, id+1) + 2
      }
      // place characters around structures
      for (let charIndex = 0; charIndex < getRandomIntInclusive(1,4); charIndex++) {
        let charTargetX = targetX + getRandomIntInclusive(-2, 2);
        let charTargetY = targetY + getRandomIntInclusive(-2, 2);
        if (charTargetX === targetX) charTargetX += 1;
        if (charTargetY === targetY) charTargetY += 1;
        charTargetX = charTargetX;
        charTargetY = charTargetY;
        const charTarget = getPlacement(id, charTargetY, charTargetX);
        const charData = createCharacter();
        const profs = professions[id-1];
        let profession = profs[Math.floor(Math.random() * profs.length)]
        if (charData.age < 20) profession = profession;
        if (charData.age < 10) profession = "Child";
        if (charData.age < 4) profession = "Infant";
        data[charTarget[1]][charTarget[0]].person = {
          data: charData,
          imageId: charData.imageId,
          profession
        }
        // if id === 1 or 2 add an animal nearby
      }
    }
  }

  // add some randos
  // add some wild animals

  function getPlacement (num, y, x) {
    const type = num === 4 || num === 5 ? ["plains"] :  ["forest", "plains"];
    return findNearest(x, y, type);
  }
}

function createEntity (elValue, yIndex, xIndex) {
  return new Promise((resolve)=>{
      const biome = getBiome(elValue);
      const tree = getTree(biome, elValue, dataTrees[yIndex][xIndex]);
      resolve({
        elevation: elValue,
        color: biomeColors[biome],
        biome,
        tree, // and not water or
        person: undefined,
        structure: undefined,
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

function render () {
  const tileNodes = document.querySelectorAll('.tile');
  const locations = document.querySelectorAll('.loc');
  const locData = qauds[qaudrant[1]][qaudrant[0]][player[1]][player[0]];

  locations[0].textContent = locData.biome;
  locations[1].innerHTML = '';
  if (locData.person) {
    const node = generateStringHtml(locData.person.data, locData.person.profession, images);
    locations[1].append(node)
  }
  locations[2].textContent = locData.structure ? locData.structure.type : '';
  locations[3].textContent = '';

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

// elevation function lower higher or the same

// Adds svg tiles
function addElement (points, id, biome, coordinates, pos) {
  const data = qauds[qaudrant[1]][qaudrant[0]]
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
  if (tileData.biome === 'mountain') diff = diff*2;
  if (tileData.biome === 'snow') diff = diff*2.5;
  gElm.setAttribute("transform", `translate(0, ${diff})`) // TODO: if water none, if mountain *2
  gElm.setAttribute("opacity", 1 - (diff*0.015))

  svg.appendChild(gElm);

  if (tileData.tree) {
    addImage(images[tileData.tree.imageId]);
  }

  if (tileData.structure) {
    addImage(images[tileData.structure.imageId]);
  }

  if (tileData.person) {
    addImage(images[tileData.person.imageId]);
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
    img.setAttribute('width', 100); // TODO: sizes tree large, buildings medium, people small
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

async function generateImages () {
  for (let imgIndex = 0; imgIndex < emojiIcons.length; imgIndex++) {
    const image = await getImage([emojiIcons[imgIndex]]);
    images.push(image);
  }
}
