(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=o(n);fetch(n.href,r)}})();const P=["#242424","#005555","#008888","#55bbbb","#cccccc","#cc9999","#bb5555","#aa0000","#770077","#aa00aa","#cc22cc","#cc88aa","#cccc88","#55cc55","#00aa00","#008800"];function Y(){const e=[];for(let o=0;o<P.length;o++){const a=t(P[o]);e.push(a)}return e;function t(o){var a=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;o=o.replace(a,function(r,i,l,s){return i+i+l+l+s+s});var n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(o);return n?[parseInt(n[1],16),parseInt(n[2],16),parseInt(n[3],16)]:null}}function j(e,t){return Math.sqrt(Math.pow(e[0]-t[0],2)+Math.pow(e[1]-t[1],2)+Math.pow(e[2]-t[2],2))}function X(e,t){return new Promise(o=>{var a=Number.POSITIVE_INFINITY,n;let r=0;e.forEach((i,l)=>{n=j(t,i),n<a&&(a=n,r=l)}),o(P[r])})}async function _(e,t){const o=Y(),a=document.querySelector("#start"),n=document.querySelector("#final"),r=a.getContext("2d",{willReadFrequently:!0}),i=n.getContext("2d"),l=[],s=t?100:36,f=t?100:44;if(a.width=s,a.height=f,n.width=s,n.height=f,t)r.font="800px Arial",r.fillText(e[0],-150,20);else{r.fillStyle="#000",r.fillRect(0,0,s,f),r.font="30px Arial";for(let u=0;u<e.length;u++)r.fillText(e[u],2,40)}let p=0,m=0;for(;p<=s&&m<f;){const u=r.getImageData(p,m,1,1).data;l[m]||(l[m]=[]),l[m].push([u[0],u[1],u[2]]),p++,p>s&&(p=0,m++)}for(let u=0;u<l.length;u++)for(let d=0;d<l[u].length;d++){const w=await X(o,l[u][d]);i.fillStyle=l[u][d].join(", ")==="0, 0, 0"?"#00000000":w,i.fillRect(d,u,1,1)}return n.toDataURL("image/png")}const ee=e=>{const t={},o=["▮","▬","▰","▲","▴","▶","▸","►","▼","▾","◀","◂","◄","◆","◖","◗","◢","◣","◤","◥","◼"],a=e.getContext("2d",{willReadFrequently:!0});return t.generate=()=>{const n=[];e.width=200,e.height=200,a.filter="blur(5px)",a.font="16px Arial";let l=0;for(;l<200;){const p=o[Math.floor(Math.random()*o.length)];a.fillText(p,Math.random()*200,Math.random()*200),l++}let s=0,f=0;for(;s<=200&&f<200;){const p=a.getImageData(s,f,1,1).data;n[f]||(n[f]=[]),n[f].push(p[3]),s++,s>200&&(s=0,f++)}return n},t},te=e=>{const t=[];function o(){t.length!==0&&(t.length===1&&e[t[0]](),t.length===2&&e[t[0]+"-"+t[1]]&&e[t[0]+"-"+t[1]](),t.length===2&&e[t[1]+"-"+t[0]]&&e[t[1]+"-"+t[0]]())}function a(i){i.preventDefault(),e[i.key]&&!t.includes(i.key)&&(t.push(i.key),o())}function n(i){i.preventDefault(),e[i.key]&&t.includes(i.key)&&(t.splice(t.indexOf(i.key),1),o())}function r(){document.addEventListener("keydown",a),document.addEventListener("keyup",n)}r()},T=["Kind","Rude","Humble","Arrogant","Gentle","Cruel","Polite","Blunt","Outgoing","Reserved","Cheerful","Brooding","Sensitive","Callous","Easygoing","Aggressive","Energetic","Quiet","Patient","Rash","Open-Minded","Prejudice","Creative","Cunning","Decisive","Indecisive","Wise","Naive","Sincere","Sarcastic","Orderly","Messy","Hardworking","Lazy","Mature","Immature","Modest","Vain","Persistent","Meek","Intelligent","Ignorant","Assertive","Hesitant","Spoiled","Cautious","Reasonable","Stubborn","Emotional","Apathetic","Funny","Serious","Charming","Moody","Independent","Dependent","Determined","Petty","Pious","Paranoid","Loyal","Two-Faced","Brave","Cowardly","Honest","Liar","Generous","Selfish","Diligent","Careless","Responsible","Unreliable","Shy","Impulsive","Attentive","Reckless","Frugal","Extravagant","Mischievous","Obedient","able","accountable","active","adaptable","adventurous","affable"],ne=["Contreltophobia","Dystychiphobia","Methyphobia","Monophobia","Isolophobia","Amnesiphobia","Angrophobia","Anginophobia","Zoophobia","Doraphobia","Agrizoophobia","Myrmecophobia","Neophobia","Asymmetriphobia","Peladophobia","Phalacrophobia","Ablutophobia","Chiroptophobia","Pogonophobia","Rhabdophobia","Caligynephobia","Clinophobia","Apiphobia","Omphalophobia","Ornithophobia","Hemophobia","Bogyphobia","Bibliophobia","Merinthophobia","Gephyrophobia","Batophobia","Scelerophobia","Taphephobia","Felinophobia","Coimetrophobia","Teleophobia","Tropophobia","Alektorophobia","Tocophobia","Pedophobia","Pnigophobia","Cholerophobia"],N=["Ursula","Vera","Abigail","Antonia","Amelia","Ada","Adelaide","Adela","Adeline","Adriana","Agatha","Ailith","Alana","Alberta","Albina","Alexandra","Alexis","Allegra","Angelica","Altabella","Ama","Antonia","Annora","Ava","Beatrice","Cecilia","Eira","Ella","Eleanor","Elisaria","Euphemia","Genevieve","Gunnora","Heloise","Honora","Helen","Joan","Matilda","Mirabel","Nezetta","Nadalinde","Olive","Osanna","Petra","Philomena","Phoebe","Portia","Regina","Sabina","Serena","Sibyl","Sophia","Stella","Thora","Ursula","Vera","Winifred","Zelda"],$=["Abraham","Absalom","Abelard","Acfrid","Achard","Adam","Adelo","Aderich","Ailbern","Adrewic","Adrian","Alaric","Albin","Alexander","Alfwin","Aldebrand","Ambrose","Alamand","Alard","Alaric","Alf","Alwin","Anthony","Archibald","Arthur","Aldo","Alphonse","Abelard","Benedict","Bartholomew","Bertram","Crispin","Daegal","Drustan","Edmund","Elric","Emil","Florian","Gandalf","Godfrey","Gregory","Grimwald","Hamlin","Hawk","Hildebald","Kenric","Leif","Lothar","Morcant","Oliver","Orvyn","Richard","Randolf","Roland","Torsten","Wilkin","Balthasar"],F=["Gervaise","Wainwright","Heathcliff","Albrecht","Hildebrand","Devereaux","Heinrich","Tudor","Templeton","Braxton","Jacobo","Mannix","Benedict","Beckett","Wesley","Maynard","Kimball","Otto","Bassett","Wallace","Oakes","Lister","Tobias","Conrad","Jasper","Bayard","Burne","Hyde","Walden","Gilbert","Fleming","Mann","Rowe","Hammond","Ballard","Kirby","Aiken","Beasley","Frost","Giles","Felix","Harding","Dudley","Barlow","Lange","Pierson","Denton","Courtney","Brandon","Weston","Daley","Elias","Larkin","Godwin","Boswell","Jarrett","Lovell","Roland","Moreland","Lorenzo","Aldrich","Ambrose","Bartley","Thayer","Fenton","Dietrich","Borden","Bartholomew","Garvin","Cecil","Lyman","Brant","Charlton","Seward","Easton","Nilson","Andre","Dayton","Archibald","Ralph","Leo","Aston","Berkeley","Carleton","Kipling","Sherwin","Alton","Bradburn","Osmond","Chilton","Mendel","Birney","Rawlins","Edison","Lyndon","Marden","Atherton","Amaury","Aramis","Brawley","Geoffrey","Haynes","Hill","Hughes","Kimball","Klein","Koch","Kruger","Maddock","Norman","Nuemann","Payne","Schafer","Schneider","Taylor","Turner","Wood","Beckett","Brewer","Browne","Carey","Ead","Aaberg","Adalbert","Albrecht","Alwyn","Annora","Arvel","Ashdown","Audovera","Badden","Bartholomew","Burchard","Cosimo","Enegram","Frithswith","Grimald","Hankin","Hilith","Isolda","Kaiser","Louthy","MacQuoid","Mannering","Merek","Nesta","Olbrecht","Pernelle","Pythias","Rainilda","Rolfe","Sallow","Squire","Terrowin","Theano","Tonis"],re=["red","white","curly","blonde"],W=[["Peddler","Hunter","Trapper"],["Woodcutter","Shepherd","Farmer"],["miner","Tanner","Ropemaker","Brewer","Explorer","Healer"],["Fisherman","Cook","Shipwright","Merchant","Sailor","Blacksmith","Carpenter","Cartographer"],["Lord","Tailor","Confectioner","Leatherworker","Banker","Weaver"]],G={alignment:["Lawful Good","Neutral Good","Chaotic Good","Lawful Neutral","True Neutral"],visualFeature:["Heterochromia","Goiter","Rickets","Missing fingers","Birthmark","Beautiful","Burn mark","Freckles","Short","Tall","Frail","Stout","Dimples","Scars","Unkempt","Callouses"]},H={motivation:["Survival","Love","Honor","Control","Save","Serve","Rule","Destroy","Grief","Betrayal","Fear","Escape","Revenge","Recover","Justice","Desire","Discover","Achieve","Hate","Ambition"],traitMain:T,trait:T,traitLesser:T,fear:ne};let A={};function oe(){A={};const e=Math.random(),t=y(1,10)+y(1,10)+y(1,10)+y(1,10),o=Z(re);return A.name=le(e),A.age=t,A.genderExpression=ie(e),A.hair=o,ce(),se(),A.imageId=ae(t,e,o),A}function ae(e,t,o){if(e<=5)return 9;if(e<=11)return 10;if(e>60&&t<.3)return 16;if(e>60&&t>.7)return 21;if(e>60)return 11;if(t<.3)return a(17,o);if(t>.7)return a(22,o);return a(12,o);function a(n,r){if(r==="curly")return n;if(r==="red")return n+1;if(r==="white")return n+2;if(r==="blonde")return n+3}}function U(e,t,o){let a="";for(const r in e)r==="name"?a+=`<details closed><summary>${e[r]} - ${t}</summary>`:r==="imageId"?a+=`<div><img src="${o[e.imageId]}"></div>`:a+=`<div>${de(r)}: <span class="bold">${e[r]}</span></div>`;a+="</details>";const n=document.createElement("div");return n.innerHTML=a,n}function ie(e){return e<=.05?"Very femenine":e>.05&&e<=.4?"Femenine":e>.4&&e<=.6?"Nuetral":e>.6&&e<=.95?"Masculine":"Very masculine"}function le(e){const t=F[Math.floor(Math.random()*F.length)];return e<=.5?`${N[Math.floor(Math.random()*N.length)]} ${t}`:`${$[Math.floor(Math.random()*$.length)]} ${t}`}function se(){for(const e in H)A[e]=H[e][Math.floor(Math.random()*H[e].length)];return A}function ce(){for(const e in G)A[e]=Z(G[e]);return A}function Z(e){const t=[...e,...e.reverse()],o=Math.ceil(t.length/2),a=y(0,o)+y(0,o);return t[a]?t[a]:t[t.length-1]}function y(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1)+e)}function de(e){const t=e.replace(/([a-z])([A-Z])/g,"$1 $2").split(" ");let o="";return t.forEach(a=>{o=o+a.charAt(0).toUpperCase()+a.slice(1)+" "}),o}const O=document.querySelector("svg"),c=[10,10],h=[50,50],q=["🧕","🌲","🌳","🛖","🏚️","⛪","🏛️","🏯","🏰","👶","🧒","🧓","🧑‍🦱","🧑‍🦰","🧑‍🦳","🧑","👵","👩‍🦱","👩‍🦰","👩‍🦳","👱‍♀️","👴","👨‍🦱","👨‍🦰","👨‍🦳","🧔","🐓","🐖","🐂","🐏","🦌","🦉","🐀","🦇","🪨","🛸","🪵","⛲","🦑","🧜‍♂️","✨"],C=[],Q=document.querySelectorAll(".tab"),E=document.querySelectorAll(".pane");Q[0].addEventListener("click",()=>{E[0].classList.remove("hidden"),E[1].classList.add("hidden")});Q[1].addEventListener("click",()=>{E[1].classList.remove("hidden"),E[0].classList.add("hidden")});let M=0;const L=W.flat();for(let e=0;e<L.length;e++){const t=document.createElement("li");t.textContent=L[e]+" - not apprenticed",document.querySelector("ol").appendChild(t)}const b=me(),ue=document.querySelector("#perlin"),z=ee(ue);let R;const he=z.generate(),fe={water:"#00445a",plains:"#359135",forest:"#005a00",mountain:"grey",snow:"#f1f1f1"},pe={w:()=>v(-1,-1),d:()=>v(-1,1),a:()=>v(1,-1),s:()=>v(1,1),q:()=>v(0,-1),z:()=>v(1,0),x:()=>v(0,1),e:()=>v(-1,0)};function v(e,t){var r,i,l,s,f,p,m,g,u;const o=b[c[1]][c[0]];if(!((r=o[h[1]+t])!=null&&r[h[0]+e])){if(h[1]>=199){if(!((i=b[c[1]+1])!=null&&i[c[0]]))return;c[1]=c[1]+1;let d=(l=b[c[1]])==null?void 0:l[c[0]];h[1]=0,typeof d[0]=="number"?B():x();return}if(h[1]<=0){if(!((s=b[c[1]-1])!=null&&s[c[0]]))return;let d=(f=b[c[1]])==null?void 0:f[c[0]];h[1]=199,typeof d[0]=="number"?B():x();return}if(h[0]>=199){if(!((p=b[c[1]])!=null&&p[c[0]+1]))return;c[0]=c[0]+1;let d=(m=b[c[1]])==null?void 0:m[c[0]];h[0]=0,typeof d[0]=="number"?B():x();return}if(h[0]<=0){if(!((g=b[c[1]])!=null&&g[c[0]-1]))return;c[0]=c[0]-1;let d=(u=b[c[1]])==null?void 0:u[c[0]];h[0]=199,typeof d[0]=="number"?B():x();return}}const a=V(o[h[1]+t][h[0]+e].elevation);if(a==="mountain"&&M<8||a==="water"&&M<17||a==="snow"&&M<24)return;h[0]=h[0]+e,h[1]=h[1]+t;const n=o[h[1]][h[0]].person;if(L[M]&&(n==null?void 0:n.profession)===L[M]){const d=document.querySelectorAll("ol > li"),w=U(n.data,n.profession,C);d[M].textContent="",d[M].appendChild(w),M++}x()}te(pe);setTimeout(async()=>{await we(),B()},1e3);async function B(){R=[...b[c[1]][c[0]]],b[c[1]][c[0]]=z.generate(),await ge();const e=J(h[0],h[1],["forest","plains"]);h[0]=e[0],h[1]=e[1],be(),x()}function J(e,t,o){const a=b[c[1]][c[0]];let n=1,r=0;const i=[[-1,1],[1,-1],[1,1],[-1,-1],[0,1],[-1,0],[0,-1],[1,0]];for(;n<49;){i[r]||(r=0);const l=t+n*i[r][0],s=e+n*i[r][1],f=a[l]?a[l][s]:void 0;if(f&&o.includes(f.biome))return[s,l];n++,r++}}function me(){let e=0,t=0;const o=[];for(let a=0;a<21;a++){o.push([]);for(let n=0;n<21;n++){o[a].push([]);const r=Math.random();e<2&&a>1&&r>.99&&(o[a][n].push(5),e++),t<5&&r>.99&&(o[a][n].push(4),t++),Math.random()>.8&&o[a][n].push(3);for(let i=0;i<10;i++)Math.random()>.9&&o[a][n].push(2),Math.random()>.8&&o[a][n].push(1)}}return o}function V(e){if(e<20)return"water";if(e>=20&&e<88)return"plains";if(e>=88&&e<158)return"forest";if(e>=158&&e<200)return"mountain";if(e>=200)return"snow"}async function ge(){const e=b[c[1]][c[0]];for(let t=0;t<e.length;t++)for(let o=0;o<e[t].length;o++){const a=await ye(e[t][o],t,o);e[t][o]=a}}async function be(){var a;const e=["Homestead","Farm","Village","Town","City"],t=b[c[1]][c[0]];for(let n=0;n<R.length;n++){const r=R[n];let i=y(0,(t==null?void 0:t.length)??20),l=y(0,((a=t[i])==null?void 0:a.length)??20);const s=o(r,l,i);for(let f=0;f<6-r;f++){let p=s[0],m=s[1];p=p+f*y(-2,2),m=m+f*y(-2,2);const g=o(r,m,p);t[g[1]][g[0]].structure={type:e[r],imageId:y(0,r+1)+2};for(let u=0;u<y(1,4);u++){let d=p+y(-2,2),w=m+y(-2,2);d===p&&(d+=1),w===m&&(w+=1),d=d,w=w;const k=o(r,w,d),I=oe(),D=W[r-1];let S=D[Math.floor(Math.random()*D.length)];I.age<20&&(S=S),I.age<10&&(S="Child"),I.age<4&&(S="Infant"),t[k[1]][k[0]].person={data:I,imageId:I.imageId,profession:S}}}}function o(n,r,i){return J(i,r,n===4||n===5?["plains"]:["forest","plains"])}}function ye(e,t,o){return new Promise(a=>{const n=V(e),r=Ae(n,e,he[t][o]);a({elevation:e,color:fe[n],biome:n,tree:r,person:void 0,structure:void 0})})}function Ae(e,t,o){let a;if(o>18){let n=!1;return(t===19&&Math.random()>.98||e==="forest"&&Math.random()>.4||e==="plains"&&Math.random()>.85||e==="mountain"&&Math.random()>.85||e==="snow"&&Math.random()>.98)&&(n=!0),n&&(a={imageId:t>100?1:2}),a}}function x(){const e=document.querySelectorAll(".tile"),t=document.querySelectorAll(".loc"),o=b[c[1]][c[0]][h[1]][h[0]];if(t[0].textContent=o.biome,t[1].innerHTML="",o.person){const r=U(o.person.data,o.person.profession,C);t[1].append(r)}if(t[2].textContent=o.structure?o.structure.type:"",t[3].textContent="",e.length>0)for(let r=0;r<e.length;r++)e[r].remove();const a=h[0]-3,n=h[1]-3;for(let r=0;r<14;r++){let i=0;if(r<=6)for(;r-i>-1;){const l=[350-50*r+i*100,25*r-i],s=[r-i+a,i+n];K([`M ${l[0]} ${l[1]} l 50 25 l -50 25 l -50 -25 Z`,`M ${l[0]-50} ${l[1]+25} l 50 25 l 0 45 l -50 -25 Z`,`M ${l[0]} ${l[1]+50} l 50 -25 l 0 45 l -50 25 Z`],s[0]+"-"+s[1],"stone",l,s),i++}else for(;i+(r-6)<7;){const l=[50+50*(i+(r-6))+i*50,25*r-i],s=[6-i+a,i+(r-6)+n];K([`M ${l[0]} ${l[1]} l 50 25 l -50 25 l -50 -25 Z`,`M ${l[0]-50} ${l[1]+25} l 50 25 l 0 45 l -50 -25 Z`,`M ${l[0]} ${l[1]+50} l 50 -25 l 0 45 l -50 25 Z`],s[0]+"-"+s[1],"stone",l,s),i++}}}function K(e,t,o,a,n){var m;const r=b[c[1]][c[0]];let i=f("g");if(!((m=r[n[1]])!=null&&m[n[0]]))return;const l=r[n[1]][n[0]];for(let g=0;g<e.length;g++){let u=f("path",e[g]);u.setAttribute("fill",l.color),g>0&&u.setAttribute("opacity",.7),i.appendChild(u)}i.classList.add("tile"),i.dataset.xyid=t;let s=r[h[1]][h[0]].elevation-l.elevation;l.biome==="water"&&(s=s*.5),l.biome==="mountain"&&(s=s*2),l.biome==="snow"&&(s=s*2.5),i.setAttribute("transform",`translate(0, ${s})`),i.setAttribute("opacity",1-s*.015),O.appendChild(i),l.tree&&p(C[l.tree.imageId]),l.structure&&p(C[l.structure.imageId]),l.person&&p(C[l.person.imageId]),t===h.join("-")&&p(C[0],"player");function f(g,u){let d=document.createElementNS("http://www.w3.org/2000/svg",g);return u&&g==="path"&&d.setAttribute("d",u),d}function p(g,u){const d=f("image");d.setAttribute("href",g),d.setAttribute("width",100),d.setAttribute("height",100),d.classList.add("tile"),u&&d.classList.add(u),d.setAttribute("x",a[0]-50),d.setAttribute("y",a[1]-70),d.setAttribute("transform",`translate(0, ${s})`),d.setAttribute("opacity",1-s*.01),O.appendChild(d)}}async function we(){for(let e=0;e<q.length;e++){const t=await _([q[e]]);C.push(t)}}
