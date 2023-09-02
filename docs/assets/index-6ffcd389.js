(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function t(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=t(a);fetch(a.href,r)}})();const U=["#242424","#005555","#008888","#55bbbb","#cccccc","#cc9999","#bb5555","#aa0000","#770077","#aa00aa","#cc22cc","#cc88aa","#cccc88","#55cc55","#00aa00","#008800"];function ve(){const e=[];for(let t=0;t<U.length;t++){const o=n(U[t]);e.push(o)}return e;function n(t){var o=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;t=t.replace(o,function(r,u,s,f){return u+u+s+s+f+f});var a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return a?[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16)]:null}}function Ae(e,n){return Math.sqrt(Math.pow(e[0]-n[0],2)+Math.pow(e[1]-n[1],2)+Math.pow(e[2]-n[2],2))}function ke(e,n){return new Promise(t=>{var o=Number.POSITIVE_INFINITY,a;let r=0;e.forEach((u,s)=>{a=Ae(n,u),a<o&&(o=a,r=s)}),t(U[r])})}async function Me(e,n){const t=ve(),o=document.querySelector("#start"),a=document.querySelector("#final"),r=o.getContext("2d",{willReadFrequently:!0}),u=a.getContext("2d"),s=[],f=n?100:36,d=n?100:44;if(o.width=f,o.height=d,a.width=f,a.height=d,n)r.font="800px Arial",r.fillText(e[0],-150,20);else{r.fillStyle="#000",r.fillRect(0,0,f,d),r.font="30px Arial";for(let l=0;l<e.length;l++)r.fillText(e[l],2,40)}let i=0,c=0;for(;i<=f&&c<d;){const l=r.getImageData(i,c,1,1).data;s[c]||(s[c]=[]),s[c].push([l[0],l[1],l[2]]),i++,i>f&&(i=0,c++)}for(let l=0;l<s.length;l++)for(let y=0;y<s[l].length;y++){const C=await ke(t,s[l][y]);u.fillStyle=s[l][y].join(", ")==="0, 0, 0"?"#00000000":C,u.fillRect(y,l,1,1)}return a.toDataURL("image/png")}const K=["affectionate","afraid","aggressive","altruistic","amiable","angry","animated","annoyed","anxious","appreciative","argumentative","arrogant","attentive","awkward","bashful","bewildered","bold","bored","bossy","brave","brilliant","calm","capable","carefree","careful","caring","cautious","charismatic","charming","cheerful","childish","clever","clumsy","coarse","cold-hearted","compassionate","concerned","confident","confused","conscientious","considerate","cooperative","courageous","cowardly","creative","curious","dainty","daring","decisive","demanding","dependable","determined","devoted","dignified","diligent","discouraged","dishonest","domineering","doubtful","dreamer","eager","easygoing","efficient","encouraging","energetic","enthusiastic","exuberant","fair","fanciful","fearless","finicky","flexible","focused","forgiving","frank","friendly","frugal","frustrated","fun-loving","funny","generous","gentle","giving","gloomy","grateful","greedy","gregarious","gullible","happy","hard-working","hardy","harried","helpful","hesitant","honest","hospitable","humble","impatient","impulsive","independent","industrious","innocent","innovative","inquisitive","insistent","intelligent","intrepid","inventive","jovial","kind","lazy","light-hearted","logical","lonely","lovable","loving","malicious","meek","messy","meticulous","mischievous","moody","mysterious","naive","negligent","nervous","obliging","observant","obstinate","optimistic","organized","patient","pensive","persevering","persuasive","pessimistic","picky","pleasant","pompous","popular","positive","precise","puzzled","quarrelsome","quiet","quixotic","resourceful","sarcastic","scheming","scornful","secretive","self-reliant","sense of humor","sensitive","serious","shrewd","simple","sincere","skillful","slovenly","smart","sneaky","sociable","strange","strict","stubborn","sullen","superstitious","supportive","surly","suspicious","sweet","taciturn","talented","talkative","tenacious","tense","thankful","thorough","thoughtful","thrifty","timid","tireless","tolerant","touchy","trusting","trustworthy","truthful","unscrupulous","unselfish","upset","valiant","versatile","visionary","warm","warm-hearted","whimsical","wise","witty","unkempt","deliberative","reckless","disciplined","inefficient","envisions the unseen","fatigued","unfocused","addled","poor health","imaginative","unimaginative","innovative","knowledgeable","ignorant","observant","erratic","responsible","irresponsible","risk-taker","averse to risk","stressed","disorganized","disorderly","trustworthy","untrustworthy","careless","clumsy","lack of verbal skills","Gruff","Insecure","Conceited","Speaks in rhymes","Competitive"],Ce=["Accidents","Wild animals","Bathing","Bats","Bogeyman","Crossing bridges","Bulls","Beggars","Burglars","Being buried alive","Cemeteries","Childbirth","Choking","Clouds","Confined spaces","Corpses","Crowded public places","Mobs","Crystals","death","Decaying matter","Defeat","Demons","Disease","Dogs","Dreams","Dying","Fever","Fire","Flogging","Floods","Forests","Fur (skin of animals)","Ghosts","Heat","Heights","Hell","Heredity","Holy things","Horses","Ice","Insanity","Insects","Injury","Jumping from high places","Knowledge","Lice","Lightening and thunder","Loud noises","Meteors","Mice","Mirrors","Moths","Moon","Myths","Night","Open spaces","Operations","Pain","Parasites","Pointed objects","Poison","Poverty","Priests","Puppets","Rabies","Rats","Religion","Returning home","Responsibility","Ridicule","Riding in a wagon or cart","Rivers","Road travel","Robbers","Shadows","Skin lesions","Sleep","Steep slopes","Smothering","Snakes","Snow","Spiders","Spirits","Stars","Stings","Strangers","Tapeworms","Time","Toads","Tyrants","Virgins","Washing","Wind","Witches and witchcraft","Work","Worms"],ne=["Ursula","Vera","Abigail","Antonia","Amelia","Ada","Adelaide","Adela","Adeline","Adriana","Agatha","Ailith","Alana","Alberta","Albina","Alexandra","Alexis","Allegra","Angelica","Altabella","Ama","Antonia","Annora","Ava","Beatrice","Cecilia","Eira","Ella","Eleanor","Elisaria","Euphemia","Genevieve","Gunnora","Heloise","Honora","Helen","Joan","Matilda","Mirabel","Nezetta","Nadalinde","Olive","Osanna","Petra","Philomena","Phoebe","Portia","Regina","Sabina","Serena","Sibyl","Sophia","Stella","Thora","Ursula","Vera","Winifred","Zelda"],ae=["Abraham","Absalom","Abelard","Acfrid","Achard","Adam","Adelo","Aderich","Ailbern","Adrewic","Adrian","Alaric","Albin","Alexander","Alfwin","Aldebrand","Ambrose","Alamand","Alard","Alaric","Alf","Alwin","Anthony","Archibald","Arthur","Aldo","Alphonse","Abelard","Benedict","Bartholomew","Bertram","Crispin","Daegal","Drustan","Edmund","Elric","Emil","Florian","Gandalf","Godfrey","Gregory","Grimwald","Hamlin","Hawk","Hildebald","Kenric","Leif","Lothar","Morcant","Oliver","Orvyn","Richard","Randolf","Roland","Torsten","Wilkin","Balthasar"],H=["Gervaise","Wainwright","Heathcliff","Albrecht","Hildebrand","Devereaux","Heinrich","Tudor","Templeton","Braxton","Jacobo","Mannix","Benedict","Beckett","Wesley","Maynard","Kimball","Otto","Bassett","Wallace","Oakes","Lister","Tobias","Conrad","Jasper","Bayard","Burne","Hyde","Walden","Gilbert","Fleming","Mann","Rowe","Hammond","Ballard","Kirby","Aiken","Beasley","Frost","Giles","Felix","Harding","Dudley","Barlow","Lange","Pierson","Denton","Courtney","Brandon","Weston","Daley","Elias","Larkin","Godwin","Boswell","Jarrett","Lovell","Roland","Moreland","Lorenzo","Aldrich","Ambrose","Bartley","Thayer","Fenton","Dietrich","Borden","Bartholomew","Garvin","Cecil","Lyman","Brant","Charlton","Seward","Easton","Nilson","Andre","Dayton","Archibald","Ralph","Leo","Aston","Berkeley","Carleton","Kipling","Sherwin","Alton","Bradburn","Osmond","Chilton","Mendel","Birney","Rawlins","Edison","Lyndon","Marden","Atherton","Amaury","Aramis","Brawley","Geoffrey","Haynes","Hill","Hughes","Kimball","Klein","Koch","Kruger","Maddock","Norman","Nuemann","Payne","Schafer","Schneider","Taylor","Turner","Wood","Beckett","Brewer","Browne","Carey","Ead","Aaberg","Adalbert","Albrecht","Alwyn","Annora","Arvel","Ashdown","Audovera","Badden","Bartholomew","Burchard","Cosimo","Enegram","Frithswith","Grimald","Hankin","Hilith","Isolda","Kaiser","Louthy","MacQuoid","Mannering","Merek","Nesta","Olbrecht","Pernelle","Pythias","Rainilda","Rolfe","Sallow","Squire","Terrowin","Theano","Tonis"],Ie=["red","white","curly","blonde"],ue=[["Peddler","Hunter","Trapper"],["Woodcutter","Shepherd","Farmer"],["Healer","Explorer","Brewer","Ropemaker","Tanner","miner"],["Cartographer","Carpenter","Blacksmith","Sailor","Merchant","Shipwright","Cook","Fisherman"],["Weaver","Banker","Leatherworker","Confectioner","Tailor","Lord"]],oe={visualFeature:["Extra finger","Heterochromia","Goiter","Rickets","Missing fingers","Birthmark","Beautiful","Burn mark","Freckles","Short","Tall","Frail","Stout","Dimples","Scars","Unkempt","Callouses"]},z={traitMain:K,trait:K,traitLesser:K,fear:Ce};let M={};async function X(){M={};const e=Math.random(),n=g(1,10)+g(1,10)+g(1,10)+g(1,10),t=await he(Ie);return M.name=await Se(e),M.age=n,M.hair=t,xe(),$e(),M.imageId=Te(n,e,t),M}function Te(e,n,t){if(e<=5)return 9;if(e<=11)return 10;if(e>60&&n<.3)return 16;if(e>60&&n>.7)return 21;if(e>60)return 11;if(n<.3)return o(17,t);if(n>.7)return o(22,t);return o(12,t);function o(a,r){if(r==="curly")return a;if(r==="red")return a+1;if(r==="white")return a+2;if(r==="blonde")return a+3}}function fe(e,n,t){let o="";for(const r in e)r==="name"?o+=`<details closed><summary>${e[r]} - ${n}</summary>`:r==="imageId"?o+=`<div><img src="${t[e.imageId]}"></div>`:o+=`<div>${Be(r)}: <span class="bold">${e[r]}</span></div>`;o+="</details>";const a=document.createElement("span");return a.innerHTML=o,a}function Se(e){return new Promise(n=>{const t=H[Math.floor(Math.random()*H.length)];e<=.5?n(`${ne[Math.floor(Math.random()*ne.length)]} ${t}`):n(`${ae[Math.floor(Math.random()*ae.length)]} ${t}`)})}function $e(){for(const e in z)M[e]=z[e][Math.floor(Math.random()*z[e].length)];return M}async function xe(){for(const e in oe)M[e]=await he(oe[e]);return M}function he(e){return new Promise(n=>{const t=[...e,...e.reverse()],o=Math.ceil(t.length/2),a=g(0,o)+g(0,o);n(t[a]?t[a]:t[t.length-1])})}function g(e,n){return e=Math.ceil(e),n=Math.floor(n),Math.floor(Math.random()*(n-e+1)+e)}function Be(e){const n=e.replace(/([a-z])([A-Z])/g,"$1 $2").split(" ");let t="";return n.forEach(o=>{t=t+o.charAt(0).toUpperCase()+o.slice(1)+" "}),t}const Le=e=>{const n={},t=e.getContext("2d",{willReadFrequently:!0}),o=document.querySelector("#perlin-svg");n.generate=async()=>{let s=0;for(;s<100;){let d=document.createElementNS("http://www.w3.org/2000/svg","path");const i=g(-100,1020),c=g(-100,1020);d.setAttribute("d",`M${a(i)} ${a(c)} L${a(i)} ${a(c)} L${a(i)} ${a(c)} L${a(i)} ${a(c)} L${a(i)} ${a(c)} Z`),d.setAttribute("fill","#000"),d.setAttribute("filter","url(#blur)"),d.setAttribute("class","feature"),d.setAttribute("opacity","0.4"),o.appendChild(d),s++}await r();const f=document.querySelectorAll(".feature");for(let d=0;d<f.length;d++)f[d].remove()},n.getQaud=async(s,f)=>{let d=0,i=0,c=[];const h=200,l=200;for(;d<=h&&i<l;){const y=await u(s+d,f+i);c[i]||(c[i]=[]),c[i].push(y[3]),d++,d>h&&(d=0,i++)}return c};function a(s){return g(1,200)+s}function r(){return new Promise(s=>{var f=new XMLSerializer().serializeToString(o),d=window.btoa(f),i=new Image;i.onload=function(){t.drawImage(i,0,0),s()},i.src="data:image/svg+xml;base64,"+d})}function u(s,f){return new Promise(d=>{d(t.getImageData(s,f,1,1).data)})}return n},Ye=["You approach a circle of standing stones. Remenants of druidic rituals can be seen. You leave immeditaly.","You come across a pile of chopped wood. The wood has sat out for a season. You wonder why a woodcuter would have left this here to rot.","You find a lone fountain. Why would someone build this here you think to yourself. You take a sip of the clear inviting water. You feel changed.","You pass an acient oak. Something strikes you about this tree. You feel like if you close your eyes you can almost hear it signing a song.","You find a dusty scroll hidden under a rock outcropping. The language is foriegn to you. You keep the scroll for kidnling.","Floating across the ground you see an orb of pulsating light. A willow-of-the-whisp you excalim! You run terrified.","A key sits half buried in the dirt. Someone somewhere is missing this key. You take it for the iron.","You find a candle stuck to a rock. This looks to have been part of some ritual. The area gives you an unsettled feeling. You leave quietly.","You see a rainbow. So beautiful.","You see a while flower. It's beauty captures you and you stop to smell it. It smells sweet and satisfying.","As you come upon a large toadstool for a brief moment you were sure you saw a small human figure sitting upon it. Whatever was there is gone now.","You find a shell. You lift it to your ear and hear the ocean. What witchcraft is this!!!!","You see a skull peaking out of th earth. The skull is ancient. You say a prayer and continue on your way.","A glint catches your eye. Upon further inspection you find that it is a clear rock. You huck it at a tree and continue your travels.","The sound of a bell starts gently ringing. It grows closer. You hide. The sound passes close and then fades off into the distance. You saw nothing.","You come a upon an old woman who offers to tell you your future. She says you will never satisfy your insatiable hunger for knowledge unless you can find the ship made of iron.","A giant stone head sits out in the open. Scratched in the back is a map that seems to show a city out in the ocean and creatures half human and half fish.","You come across a lemon tree. Not today scurvy you excliam!"],Pe=["Chicken says cluck","Pig says oink","Cow says mooo","Sheep says baaa","Dog barks","Goat gives a funny look and screams","Horse whinnys"],Ee=["Deer says EEuurrruu","Owl says hooo","Rat says squeak","Bat says chirp","Rabbit runs off and hides in the underbrush","Wild dog yaps and barks"],w=(e,n,t)=>e.setAttribute(n,t),I=e=>document.querySelector(e),me=e=>document.querySelectorAll(e),S=I("#story"),J=I("#game"),Ne=I("#map"),m=[2,2],p=[10,10],F=[],ie=["🧕","🌲","🌳","🛖","🏚️","⛪","🏛️","🏯","🏰","👶","🧒","🧓","🧑‍🦱","🧑‍🦰","🧑‍🦳","🧑","👵","👩‍🦱","👩‍🦰","👩‍🦳","👱‍♀️","👴","👨‍🦱","👨‍🦰","👨‍🦳","🧔","🐓","🐖","🐂","🐏","🐕","🐐","🐎","🦌","🦉","🐀","🦇","🐇","🐕","🪨","🪵","⛲","🌳","📜","✨","🗝️","🕯️","🌈","🌺","🍄","🐚","💀","💎","🔔","🔮","🗿","🍋","🧜‍♂️","🛸","🏆"],v=[];let b=0;const $=ue.flat();let D,re=0,Z=!1;for(let e=0;e<$.length;e++){const n=document.createElement("li");n.textContent=$[e]+" - not apprenticed",I("ol").appendChild(n)}const Y=De(),He=I("#perlin"),L=Le(He);let Q,ge;const Re={water:"#00445a",plains:"#359135",forest:"#005a00",mountain:"grey",snow:"#f1f1f1"},se={n:()=>T(-1,-1),e:()=>T(-1,1),w:()=>T(1,-1),s:()=>T(1,1),nw:()=>T(0,-1),sw:()=>T(1,0),se:()=>T(0,1),ne:()=>T(-1,0)};I("#ui").addEventListener("click",e=>{se[e.target.dataset.d]&&se[e.target.dataset.d]()},!0);const P=()=>{var e,n;return(n=(e=Y[m[1]])==null?void 0:e[m[0]])==null?void 0:n.data};function R(e,n){return e&&n?H[n*5+e]:H[m[1]*5+m[0]]}async function T(e,n){var f,d,i,c;const t=P(),o=["forest","plains"];b>16&&o.push("water"),b>8&&o.push("mountain"),b>24&&o.push("snow");const a=[...p];if(a[1]+=n,a[0]+=e,a[1]>=199||a[1]<=0||a[0]>=199||a[0]<=0){await s();return}const r=ye((d=(f=t[a[1]])==null?void 0:f[a[0]])==null?void 0:d.elevation);if(r==="mountain"&&b<8){S.textContent="You need to have apprenticed with a ropemaker to ascend mountains.";return}if(r==="water"&&b<17){S.textContent="You need to have apprenticed with a shipwright to sail across the ocean.";return}if(r==="snow"&&b<24){S.textContent="You need to have apprenticed with a tailor to travel in snowy peaks.";return}p[0]=a[0],p[1]=a[1];const u=(c=(i=t[p[1]])==null?void 0:i[p[0]])==null?void 0:c.person;if($[b]&&(u==null?void 0:u.profession)===$[b]){const h=me("ol > li"),l=fe(u.data,u.profession,v);h[b].textContent="",h[b].appendChild(l),Ke(3+b),b++}V();async function s(){var y;if(!((y=Y[m[1]+n])!=null&&y[m[0]+e])){S.textContent="You've reached the edge of this land. You can travel no further in this direction.";return}I(`#m${m.join("-")}`).removeAttribute("style"),n!==0&&(a[1]>=198?(m[1]=m[1]+1,p[1]=2):(m[1]=m[1]-1,p[1]=198)),e!==0&&(a[0]>=198?(m[0]=m[0]-1,p[0]=2):(m[0]=m[0]+1,p[0]=198));const l=I(`#m${m.join("-")}`);if(w(l,"style","fill: red"),!m.name)pe();else{const C=await _(p[0],p[1],o);p[0]=C[0],p[1]=C[1],V()}}}setTimeout(async()=>{await L.generate(),await L.generate(),await L.generate(),await L.generate(),await ze(),je(),pe()},1e3);async function pe(){Q=[...Y],ge=await L.getQaud(200*m[0],200*m[1]);const e=await L.getQaud(200*m[0],200*m[1]);Y[m[1]][m[0]]={name:R(),locs:[],data:e},await Fe();const n=["forest","plains"];b>16&&n.push("water"),b>8&&n.push("mountain"),b>24&&n.push("snow");const t=await _(p[0],p[1],n);p[0]=t[0],p[1]=t[1],await qe(),V()}async function _(e,n,t){const o=P();let a=1,r=0,u;const s=[[-1,1],[1,-1],[1,1],[-1,-1],[0,1],[-1,0],[0,-1],[1,0]];for(;!u;){if(s[r]||(r=0),u=await We(s,r,a,e,n,o,t),u)return u;a++,r++}}function We(e,n,t,o,a,r,u){return new Promise(s=>{const f=a+e[n][0]*t,d=o+e[n][1]*t,i=r[f]?r[f][d]:void 0;typeof i!==void 0&&(u!=null&&u.includes(i==null?void 0:i.biome))?s([d,f]):s(!1)})}function De(){let e=0,n=0;const t=[];for(let o=0;o<5;o++){t.push([]);for(let a=0;a<5;a++){t[o].push([]);const r=Math.random();e<1&&o>1&&r>.4&&(F.push(`They tell you there is a city in the ${R(a,o)} fiefdom. `),t[o][a].push(5),e++),n<11&&r>.7&&(F.push(`They tell you there is a town in the ${R(a,o)} fiefdom. `),t[o][a].push(4),n++),Math.random()>.6&&t[o][a].push(3);for(let u=0;u<10;u++)Math.random()>.6&&t[o][a].push(2),Math.random()>.5&&t[o][a].push(1)}}return e===0&&(t[0][0].push(5),e++),t}function ye(e){if(e<20)return"water";if(e>=20&&e<88)return"plains";if(e>=88&&e<170)return"forest";if(e>=170&&e<200)return"mountain";if(e>=200)return"snow"}async function Fe(){const e=P();for(let n=0;n<e.length;n++)for(let t=0;t<e[n].length;t++){const o=await Ge(e[n][t],n,t);e[n][t]=o}}async function qe(){var u,s,f;const e=["Homestead","Farm","Village","Town","City"],n=P();for(let d=0;d<Q.length;d++){const i=Q[d];let c=g(0,199),h=g(0,199);const l=await x(i,h,c);for(let y=0;y<i;y++){let C=l[0],W=l[1];C=C+y*g(-3,3),W=W+y*g(-3,3);const A=await x(i,W,C);Y[m[1]][m[0]].locs.push([A[0],A[1]]),(u=n[A[1]])!=null&&u[A[0]]&&(n[A[1]][A[0]].structure={type:e[i-1],imageId:y+3}),console.log(e[i-1],C,W,m);const ee=ue[i-1];for(let q=0;q<ee.length;q++){let G=A[0]+g(-4,4),O=A[1]+g(-4,4);G===A[0]&&(G+=1),O===A[1]&&(O+=1);const B=await x(i,O,G),E=await X();let k=ee[q];if(E.age<20&&(k=k),E.age<10&&k!=="Lord"&&(k="Child"),E.age<4&&k!=="Lord"&&(k="Infant"),i===5&&Z===!1&&k==="Lord"?Z=!0:k==="Lord"&&Z===!0&&(k="Jester"),(s=n[B[1]])!=null&&s[B[0]]&&(n[B[1]][B[0]].person={data:E,imageId:E.imageId,profession:k}),i===1||i===2&&Math.random()>.3){const j=g(0,6),we=g(-1,1),be=g(-1,1),te=(f=n[B[1]+we])==null?void 0:f[B[0]+be];te&&(te.animal={id:j,imageId:26+j,story:Pe[j]})}}}}for(let d=0;d<80;d++){let i=g(0,199),c=g(0,199);if(Math.random()>.3){const h=await x(6,c,i),l=g(0,5);n[h[1]][h[0]].animal={id:l,imageId:33+l,story:Ee[l]}}else{const h=await x(7,c,i),l=await X(),y=$[Math.floor(Math.random()*$.length)];n[h[1]][h[0]].person={data:l,imageId:l.imageId,profession:y==="Lord"?"Jester":y,isWander:!0}}}for(let d=0;d<g(2,4);d++){let i=g(0,199),c=g(0,199);const h=await x(7,c,i),l=g(0,17);n[h[1]][h[0]].special={id:l,imageId:39+l,story:Ye[l]}}let t=g(101,102),o=g(101,102);const a=await x(1,o,t),r=await X();n[a[1]][a[0]].person={data:r,imageId:r.imageId,profession:"Peddler",isWander:!0}}async function x(e,n,t){let o=e===4||e===5?["plains"]:["forest","plains"];return e===6&&(o=["forest","plains","mountain","water"]),e===7&&(o=["forest","plains","mountain","snow"]),await _(t,n,o)}function Ge(e,n,t){return new Promise(o=>{let a;e>=210&&!D&&t>3&&n>3&&(D=[m,[t,n]],a={id:58,imageId:58,story:"Hello human. I admire your desire to understand all things. I have an offer for you. Travel with me and I will teach you all you could ever desire to know."},console.log("Alien",n,t,"qaud",m)),e<=16&&D&&re<1&&(re++,a={id:57,imageId:57,story:`Hello human. The kingdom of the merfolk have watched your journeys. We know what you seek lies at ${D[1].join("-")} in the ${R()} fiefdom. Good luck.`},console.log("merfolk",n,t,"qaud",m));const r=ye(e),u=Oe(r,e,ge[n][t]);o({elevation:e,color:Re[r],biome:r,tree:u,person:void 0,structure:void 0,animal:void 0,special:a})})}function Oe(e,n,t){let o;if(t>18){let a=!1;return(n===19&&Math.random()>.98||e==="forest"&&Math.random()>.4||e==="plains"&&Math.random()>.85||e==="mountain"&&Math.random()>.85||e==="snow"&&Math.random()>.98)&&(a=!0),a&&(o={imageId:n>100?1:2}),o}}function le(){J.classList.add("stars"),setTimeout(()=>{I("#svg-wrap").innerHTML=`<img style="width:100%" src="${v[59]}">`},3e3)}let ce=!1;function V(){var s,f,d;const e=me(".tile"),t=P()[p[1]][p[0]];let o="";S.innerHTML="",ce||(o+="You set out on your journey to apprentice your way to the top! Start by finding a Peddler to apprentice under then a hunter, and so on. Click on areas of the image to move in different directions. The map in the top left is of the 25 fiefdoms and you are in the red fiefdom.",ce=!0),t.structure&&(o+=`You approach a ${t.structure.type}. `),t.animal&&(o+=`${t.animal.story}. `),t.special&&(o+=`${t.special.story} `,t.special.id===58&&le());let a;if(t.person){let i;if(t.person.isWander?i="Walking out along a small path":i="As you approach a settlment",o+=`${i}, you meet a ${t.person.profession} named ${t.person.data.name}. `,$[b-1]&&((s=t.person)==null?void 0:s.profession)===$[b-1]&&(o+=`You apprentice under ${t.person.data.name}. `),t.person.isWander){Math.random()>.7&&(o+=F[Math.floor(Math.random()*F.length)]),o+=`The ${t.person.profession} shares the location of a settlment in this fiefdom at: `;const c=(f=Y[m[1]])==null?void 0:f[m[0]].locs;c&&(o+=`${c[Math.floor(Math.random()*c.length)].join("-")}`)}a=fe(t.person.data,t.person.profession,v)}if(o===""&&(o+=`Location ${R()} fiefdom ${p.join("-")}. `),S.textContent=o,((d=t==null?void 0:t.person)==null?void 0:d.profession)==="Lord"&&b>=24&&(S.textContent="The lord offer's you your final apprentiship. You have learned all that this great land has to offer. After years in service to the lord as their most trusted advisor you retire feeling oddly empty inside. Truly there must be more to know...",le()),a&&S.append(a),e.length>0)for(let i=0;i<e.length;i++)e[i].remove();const r=p[0]-3,u=p[1]-3;for(let i=0;i<14;i++){let c=0;if(i<=6)for(;i-c>-1;){const h=[350-50*i+c*100,25*i-c],l=[i-c+r,c+u];de([`M ${h[0]} ${h[1]} l 50 25 l -50 25 l -50 -25 Z`,`M ${h[0]-50} ${h[1]+25} l 50 25 l 0 45 l -50 -25 Z`,`M ${h[0]} ${h[1]+50} l 50 -25 l 0 45 l -50 25 Z`],l[0]+"-"+l[1],"stone",h,l),c++}else for(;c+(i-6)<7;){const h=[50+50*(c+(i-6))+c*50,25*i-c],l=[6-c+r,c+(i-6)+u];de([`M ${h[0]} ${h[1]} l 50 25 l -50 25 l -50 -25 Z`,`M ${h[0]-50} ${h[1]+25} l 50 25 l 0 45 l -50 -25 Z`,`M ${h[0]} ${h[1]+50} l 50 -25 l 0 45 l -50 25 Z`],l[0]+"-"+l[1],"stone",h,l),c++}}}function de(e,n,t,o,a){var i;const r=P();let u=N("g");if(!((i=r[a[1]])!=null&&i[a[0]]))return;const s=r[a[1]][a[0]];for(let c=0;c<e.length;c++){let h=N("path",e[c]);w(h,"fill",s.color),c>0&&w(h,"opacity",.7),u.appendChild(h)}u.classList.add("tile"),u.dataset.xyid=n;let f=r[p[1]][p[0]].elevation-s.elevation;s.biome==="water"&&(f=f*.5),s.biome==="plains"&&(f=f*2.5),s.biome==="forest"&&(f=f*3.5),s.biome==="mountain"&&(f=f*6),s.biome==="snow"&&(f=f*8),w(u,"transform",`translate(0, ${f})`),w(u,"opacity",1-f*.015),J.appendChild(u),s.tree&&d(v[s.tree.imageId]),s.structure&&d(v[s.structure.imageId]),s.animal&&d(v[s.animal.imageId]),s.person&&d(v[s.person.imageId]),s.special&&d(v[s.special.imageId]),n===p.join("-")&&d(v[0],"player");function d(c,h){const l=N("image");w(l,"href",c),w(l,"width",100),w(l,"height",100),l.classList.add("tile"),h&&l.classList.add(h),w(l,"x",o[0]-50),w(l,"y",o[1]-70),w(l,"transform",`translate(0, ${f})`),w(l,"opacity",1-f*.01),J.appendChild(l)}}function N(e,n){let t=document.createElementNS("http://www.w3.org/2000/svg",e);return n&&e==="path"&&w(t,"d",n),t}function je(){for(let e=0;e<5;e++)for(let n=0;n<5;n++){const t=N("rect");w(t,"width",10),w(t,"height",10),w(t,"x",n*10),w(t,"y",e*10),w(t,"id","m"+n+"-"+e),n===2&&e===2&&w(t,"style","fill: red");const o=N("title");o.textContent=H[e*5+n],t.appendChild(o),Ne.appendChild(t)}}function Ke(e){const n=[];for(let t=0;t<e;t++){const o=document.createElement("img");o.src=v[44],o.style.top=g(10,20)+"%",o.style.left=g(10,90)+"%",o.classList.add("stars"),n.push(o),document.body.appendChild(o)}setTimeout(()=>{for(let t=0;t<n.length;t++)n[t].remove()},3e3)}async function ze(){for(let e=0;e<ie.length;e++){const n=await Me([ie[e]]);v.push(n)}}
