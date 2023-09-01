import { traits } from "./traits";
import { fears } from "./fears";
import {female, male, last} from "./names"

const hairArr = ['red', 'white', 'curly', 'blonde'];
export const professions = [
    // homestead
    ["Peddler",
    "Hunter",
    "Trapper"],
    // farm
    ["Woodcutter",
    "Shepherd",
    "Farmer"],
    // Village
    ['Healer', 'Explorer', 'Brewer', 'Ropemaker', 'Tanner', 'miner'],
    // Town
    ['Cartographer', 'Carpenter', 'Blacksmith', 'Sailor', 'Merchant', 'Shipwright', 'Cook', 'Fisherman'],
    // City
    ['Weaver', 'Banker', 'Leatherworker', 'Confectioner', 'Tailor', 'Lord'],
];

    // // City
    // "Lord",
    // "Tailor", // -- cold
    // "Confectioner",
    // "Leatherworker", // -- cold
    // "Banker",
    // "Weaver", // -- cold

    // // Town
    // "Fisherman", // -- find something
    // "Cook",
    // "Shipwright", // -- sailing
    // "Merchant",
    // "Sailor", // -- sailing
    // "Blacksmith",
    // "Carpenter", // --sailing
    // "Cartographer", // can fast travel to wherever you met that person to apprentice

    // "explorer", // you can see coordinates on mountains
    // // Village
    // "miner", // tells you ocean
    // "Tanner",
    // "Ropemaker", //  -- mountains
    // "Brewer",
    // "Explorer", // -- moutains
    // "Healer",

    // // Farm
    // "Woodcutter", // place wood
    // "Shepherd", // -- place animals
    // "Farmer", // -- place plants?

    // // homestead or anywhere
    // "Peddler",
    // "Hunter",
    // "Trapper"

const weighted = {
    // alignment:["Lawful Good","Neutral Good","Chaotic Good","Lawful Neutral","True Neutral"],
    visualFeature:["Heterochromia","Goiter","Rickets","Missing fingers","Birthmark","Beautiful","Burn mark","Freckles","Short","Tall","Frail","Stout","Dimples","Scars","Unkempt","Callouses"]
    };
    

    // age
    // gender
    // hair color
    // image based off

    // Normal
    const normal = {
    motivation:["Survival","Love","Honor","Control","Save","Serve","Rule","Destroy","Grief","Betrayal","Fear","Escape","Revenge","Recover","Justice","Desire","Discover","Achieve","Hate","Ambition"],
    // archetype:["The Hero","The Alchemist","The Lover","The Jester","The Everyperson","The Innocent","The Sage","The Explorer","The Caregiver","The Creator","The Ruler","The Rebel", "The Fool"],
    // statsBestToWorst:["Strength","Dexterity","Constitution","Wisdom","Intelligence","Charisma"],
    // sign:["Aquarius","Pisces","Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Saggittarius","Capricorn"],
    traitMain: traits,
    trait: traits,
    traitLesser: traits,
    fear: fears,
    
    // additionalDetails: details,
    // meyersBriggs:["ISTJ","ISFJ","INFJ","INTJ", "ISTP","ISFP","INFP","INTP","ESTP","ESFP","ENFP","ENTP ESTJ","ESFJ","ENFJ","ENTJ"],
    // firstTrait:traits,
    // secondTrait:traits,
    // thirdTrait:traits,
    // fourthTrait:traits,
    // phobia: fears
    }
    
    let results = {};
    
    export async function createCharacter () {
      results = {};
      const gender = Math.random();
      const age = getRandomIntInclusive(1, 10) + getRandomIntInclusive(1, 10) + getRandomIntInclusive(1, 10) + getRandomIntInclusive(1, 10);
      const hair = await getWeightValued(hairArr);
      results.name = await getName(gender);
      results.age = age;
    //   results.genderExpression = getGenderType(gender);
      results.hair = hair;
      getWeighted();
      getNormal();
      results.imageId = getImageId(age, gender, hair)
    //   const characterText = generateStringHtml();
      return results;
    }

    function getImageId (age, gender, hair) {
        if (age <= 5) return 9;
        if (age <= 11) return 10;
        if (age > 60 && gender < 0.3) return 16;
        if (age > 60 && gender > 0.7) return 21;
        if (age > 60) return 11;
        if (gender < 0.3) return getHairId(17, hair);
        if (gender > 0.7) return getHairId(22, hair);
        return getHairId(12, hair);

        function getHairId (start, hairColor) {
            if (hairColor === "curly") return start;
            if (hairColor === "red") return start + 1;
            if (hairColor === "white") return start + 2;
            if (hairColor === "blonde") return start + 3;
        }

    }

    // move to index.js
    export function generateStringHtml (charData, profession, images) {
        let string = '';
        for (const key in charData) {
          if (key === 'name') {
            string += `<details closed><summary>${charData[key]} - ${profession}</summary>`;
          } else if (key === 'imageId') {
            string += `<div><img src="${images[charData.imageId]}"></div>`
          } else {
            string += `<div>${camelToFlat(key)}: <span class="bold">${charData[key]}</span></div>`
          }
        }
        string += '</details>';
        const node = document.createElement('span');
        node.innerHTML = string;
        return node;
    }

    // function getGenderType (value) {
    //     if (value <=.05) return "Very femenine";
    //     if (value > .05 && value <=.40) return "Femenine";
    //     if (value > .40 && value <=.60) return "Nuetral";
    //     if (value > .60 && value <=.95) return "Masculine";
    //     return 'Very masculine';
    // }
    
    function getName (gender) {
      return new Promise((resolve)=>{
        const lastName = last[Math.floor(Math.random()*last.length)]
        if (gender <= 0.5) {
          resolve(`${female[Math.floor(Math.random()*female.length)]} ${lastName}`);
      
        } else {
          resolve(`${male[Math.floor(Math.random()*male.length)]} ${lastName}`);
          
        }
      })

    }
    
    
    function getNormal () {
      for (const key in normal) {
        results[key] = normal[key][Math.floor(Math.random()*normal[key].length)]
      }
      return results;
    }
    
    async function getWeighted () {
      for (const key in weighted) {
        results[key] = await getWeightValued(weighted[key])
      }
      return results;
    }
    
    function getWeightValued (arr) {
      return new Promise((resolve)=>{
        const bellArr = [...arr, ...arr.reverse()];
        const diceNum = Math.ceil(bellArr.length/2);
        const roll = getRandomIntInclusive(0, diceNum) + getRandomIntInclusive(0, diceNum);
        resolve(bellArr[roll] ? bellArr[roll] : bellArr[bellArr.length - 1])
      })

    }
      
    export function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
    }
    
    function camelToFlat (camel) {
        const camelCase =camel.replace(/([a-z])([A-Z])/g, '$1 $2').split(" ")
        let flat =""
        camelCase.forEach(word=>{    
            flat = flat + word.charAt(0).toUpperCase() + word.slice(1) + " "
        })  
        return flat
    }