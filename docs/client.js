(()=>{"use strict";function e(e,t,i){const o=document.createElement(e);return o.setAttribute("class",t),i?("string"==typeof i&&(o.innerText=i),"string"!=typeof i&&o.appendChild(i),o):o}function t(e){const t=document.createElement("div");t.setAttribute("title",e),t.setAttribute("class","iconWrapper");const i=document.createElement("svg");i.setAttribute("viewbox","0 0 100 100"),i.setAttribute("class","icon");const o=document.createElement("use");return o.setAttribute("class",e+"1 iconInner"),o.setAttribute("xlink:href","#"+e),o.setAttribute("x","0"),o.setAttribute("y","0"),i.appendChild(o),t.appendChild(i),t}function i(e){let t=0;t+=e.shipStats.holdMax;for(const i of e.crew)t+=i.bonus.holdMax;return t}function o(e,t){return e.coins>=t}const n=e=>"food"===e?"High Density Foodstuffs":"medicine"===e?"Medicine":"luxury"===e?"Luxury Items":"Food and Repair Supplies";function r(e,t,i,o,n,r){const a=r(o);return{next:e,cost:t,getText:function(e){return`Sell ${a} at ${t} coins per unit. (Currently own `+e.cargo.filter((e=>e===o)).length+" units.)"},isActionValid:function(e){return e.cargo.indexOf(o)>-1},performAction:function(e){const i=e.cargo.indexOf(o);i>-1&&(e.cargo.splice(i,1),e.coins+=t)}}}function a(e,t,o,n,r){const a=r(n);return{next:e,cost:t,getText:function(e){return`Buy ${a} at ${t} coins per unit. (Currently own `+e.cargo.filter((e=>e===n)).length+" units.)"},isActionValid:function(e){return(()=>e.coins>=this.cost)()&&e.cargo.length<i(e)},performAction:function(e){e.coins-=t,e.cargo.push(n)}}}function s(e,t={food:10,medicine:10,luxury:10,shipSupplies:10},i={food:10,medicine:10,luxury:10,shipSupplies:10},o,n,r,a,s){const c=[],l=["food","medicine","luxury","shipSupplies"];for(const d of l)c.push(n(e,i[d],r,d,s)),c.push(o(e,t[d],r,d,a,s));return c}const c=[{id:"firstEvent",title:"Windfall Gains",text:"<p>You have just completed a run with the merchant ship you've worked on for five years.This run was phenomenally succesful, and your captain has decided to retire while she's ahead.</p><p>You are now without a job and in a space station far from your home. To ease the sting of her crew's unexpected unemployment, every crewmember has been given a large sum of money, the \"extra's\" from the windfall earned on the last run. You know exactly what to do with your earnings: become captain of your own vessel and seek your own fortune in the depths of space.</p><p>In this small port, your options are limited. Which ship will you choose?</p>",choices:[{next:"worstShip",cost:4e4,getText:function(e){return"The grimy, cheap looking one. You'll spend the rest of your money on your crew and supplies. Costs "+this.cost+" coins."},isActionValid:function(e){return e.coins>=this.cost},performAction:function(e){e.coins-=this.cost,e.ship="worst"}},{next:"bestShip",cost:9e4,getText:function(e){return"The shiny, expensive one. With an AI like that, who needs a crew?! Costs "+this.cost+" coins."},isActionValid:function(e){return e.coins>=this.cost},performAction:function(e){e.coins-=this.cost,e.ship="best",e.crew.push({id:"shipai",name:"Ship AI",salary:2e3,savings:0,jobTitle:"ai",bonus:{holdMax:2,speed:2,health:2}}),e.updateUI=!0}}]},{id:"worstShip",title:"The Worst Ship",getText:function(e){return"<p>You picked the rough and tumble ship and managed to pay very little for it. The seller had a relieved look in their eyes as they passed all of the access and ownership documents to you. Now you need to find someone to help you run the thing.</p><p>Having worked on a ship for five years full time, and lived around them for your formative years before that, you are a fair jack-of-all-trades on board. But a good navigator and an experienced mechanic can make the difference between life and death in the vastness between stars.</p><p>First, a navigator. Two likely candidates come to mind. You saw the names of their current ships in port as you docked. They are both junior members of their current crews, and might be interested in becoming the senior navigator on your ship. Who do you ask?</p>"},choices:[{next:"crewHired",getText:function(e){return"Time to think about hiring a crew."}}]},{id:"bestShip",title:"The Best Ship",text:"<p>You manage to bargain the sale price down from impossibly high to uncomfortably high. You will be eating light until you earn some money. After one more exhaustive once-over of the ship, -- your ship, now! -- you plot a course through the next several way points toward your home planet and examine the markets to find cargo to haul.</p>",choices:[{next:"marketExcelsiorBeginning",text:"Check the markets and buy goods and supplies."}]},{id:"crewHired",title:"Your crew so far",getText:function(e){var t,i,o,n;let r="<p>Several ships are in port whose junior officers you have seen or heard of over your years in this business. What sort of skillset are you most interested in acquiring now?</p><p>So far, you have hired: </p><ul>";return e.crew.find((e=>"doctor"===e.jobTitle))||e.crew.find((e=>"cargoMaster"===e.jobTitle))||e.crew.find((e=>"navigator"===e.jobTitle))||e.crew.find((e=>"ai"===e.jobTitle))||(r+="<li>No one! Careful, you're not terribly effective all by yourself right now.</li>"),e.crew.find((e=>"navigator"===e.jobTitle))&&(r+="<li>A navigator named "+(null===(t=e.crew.find((e=>"navigator"===e.jobTitle)))||void 0===t?void 0:t.name)+", helpful in speeding your ship on its way.</li>"),e.crew.find((e=>"cargoMaster"===e.jobTitle))&&(r+="<li>A cargo master named "+(null===(i=e.crew.find((e=>"cargoMaster"===e.jobTitle)))||void 0===i?void 0:i.name)+", helpful at cramming more goods in less space.</li>"),e.crew.find((e=>"doctor"===e.jobTitle))&&(r+="<li>A doctor named "+(null===(o=e.crew.find((e=>"doctor"===e.jobTitle)))||void 0===o?void 0:o.name)+", helpful at keeping you and your crew healthy through the dangers of space travel.</li>"),e.crew.find((e=>"ai"===e.jobTitle))&&(r+="<li>An AI named "+(null===(n=e.crew.find((e=>"ai"===e.jobTitle)))||void 0===n?void 0:n.name)+" who is a jack of all trades.</li>"),r+="</ul>",r},choices:[{next:"hireCargoMaster",getText:function(e){return"You have heard of two promising cargo master's currently docked in Excelsior Station. Ask around to see if anyone would be interested in joining your crew."},isActionValid:function(e){return!e.crew.find((e=>"cargoMaster"===e.jobTitle))}},{next:"hireDoctor",getText:function(e){return"There is one doctor in the station who might be willing to join you. He has a reputation for botched operations and poisonings, but some people swear by his dietary advice. You send him a note asking him to join you, full of unspoken reservations."},isActionValid:function(e){return!e.crew.find((e=>"doctor"===e.jobTitle))}},{next:"hireNavigator",getText:function(e){return"Two likely candidates for navigator come to mind. You saw the names of their current ships in port as you docked. They are both junior members of their current crews, and might be interested in becoming the senior navigator on your ship."},isActionValid:function(e){return!e.crew.find((e=>"navigator"===e.jobTitle))}},{next:"marketExcelsiorBeginning",text:"Your crew looks good. Time to buy trade goods!"}]},{id:"hireNavigator",title:"Hiring a Navigator",cost:1e4,getText:function(e){return"<p>You have two choices for navigator. The first is Dorothy.</p><p>Dorothy is an older, grizzled veteran of many journeys. She has always worked in the shadow of her superiors and has a sour attitude about it. But her captain swears that she can pilot a brick through an emergency planet landing, and looking at your new ship, that might be a useful skill to have.</p><p>Your other option is Eugene. Eugene is a young upstart, only in space for two years and already the subject of drunken praise in a dozen stations. He is impatient for glory, but charming, affable, and very clever.</p>"},choices:[{next:"grouchyNavigator",text:"Ask Dorothy to join you."},{next:"ambitiousNavigator",text:"Offer a position to Eugene."},{next:"crewHired",text:"Decide to spend your money on a different crewmember."}]},{id:"grouchyNavigator",title:"An Experienced Navigator",cost:1e4,getText:function(e){return"<p>Dorothy calls you shortly after recieving your note offering her a job.</p><p>\"Sure, I'll join your crew. It'll cost you though kid. To start, pay me \""+this.cost+" coins. Every port, I'll need another "+this.cost/10+" coins.</p>"},choices:[{cost:1e4,next:"crewHired",getText:function(e){return"Hire them!"},isActionValid:function(e){return e.coins>=this.cost+this.cost/10},performAction:function(e){e.coins-=this.cost;const t={id:"dorothy",name:"Dorothy",jobTitle:"navigator",salary:this.cost/10,savings:2*this.cost,bonus:{holdMax:0,speed:7,health:0}};e.crew.push(t)}},{next:"ambitiousNavigator",text:"Turn her down, try asking the ambitious, young Eugene instead."},{next:"crewHired",text:"Decide to spend your money on a different crew position, or none at all."}]},{id:"ambitiousNavigator",title:"An Ambitious Young Navigator",cost:5e3,getText:function(e){return'<p>You send a note offering a position to Eugene.</p><p>He sends a message back. It reads in part, "Finally, someone is willing to get me off my boat! I\'ll make you a good deal. Just "'+this.cost+" coins to start, and at every port, I'll need another "+this.cost/10+" coins. You won't regret this, I promise!\"</p>"},choices:[{cost:5e3,next:"crewHired",getText:function(e){return"Hire them!"},isActionValid:function(e){return e.coins>=this.cost+this.cost/10},performAction:function(e){e.coins-=this.cost;const t={id:"eugene",name:"Eugene",jobTitle:"navigator",salary:this.cost/10,savings:2*this.cost,bonus:{holdMax:0,speed:5,health:0}};e.crew.push(t)}},{next:"grouchyNavigator",text:"Turn him down, try asking the experienced, older Dorothy instead."},{next:"crewHired",text:"Decide to spend your money on a different crew position, or none at all."}]},{id:"hireCargoMaster",title:"Hiring a Navigator",getText:function(e){return"<p>You have two choices for cargo master. The first is Alice.</p><p>Alice has long blond hair and falls into holes more often than anyone expects. She has a history of awkward relationships with much older men. She is a terrible cargo master.</p><p>Your other option is Addams. Addams loves dark, cavernous spaces and styling them with creepy elegance. He is a decent cargo master.</p>"},choices:[{next:"badCargoMaster",text:"Ask Alice to join you."},{next:"goodCargoMaster",text:"Offer a position to Adamm."},{next:"crewHired",text:"Decide to spend your money on a different crewmember."}]},{id:"badCargoMaster",title:"A Falling Cargo Master",cost:3e3,getText:function(e){return"<p>Alice answers your video call, her left temple bruised. Probably from a recent fall.</p><p>She smiles cheerfully and says, \"Your ship must have fewer holes than this one! I'd be happy to join you! It'll cost me \""+this.cost+" coins to move into my new berth on your boat. Every port, I'll need another "+this.cost/10+" coins.</p>"},choices:[{cost:3e3,next:"crewHired",getText:function(e){return"Hire them!"},isActionValid:function(e){return e.coins>=this.cost+this.cost/10},performAction:function(e){e.coins-=this.cost;const t={id:"alice",name:"Alice",jobTitle:"cargoMaster",salary:this.cost/10,savings:2*this.cost,bonus:{holdMax:3,speed:0,health:0}};e.crew.push(t)}},{next:"goodCargoMaster",text:"Turn her down, try asking the brooding, capable Addams instead."},{next:"crewHired",text:"Decide to spend your money on a different crew position, or none at all."}]},{id:"goodCargoMaster",title:"A Creepy Cargo Master",cost:12e3,getText:function(e){return'<p>You send a note offering a position to Addams.</p><p>He sends a message back. It reads in part, "Your ship is small, and therefore ugly. But it has character. For "'+this.cost+" coins to start I'll join you, and at every port, I'll need another "+this.cost/10+' coins."</p>'},choices:[{cost:12e3,next:"crewHired",getText:function(e){return"Hire them!"},isActionValid:function(e){return e.coins>=this.cost+this.cost/10},performAction:function(e){e.coins-=this.cost;const t={id:"addams",name:"Addams",jobTitle:"cargoMaster",salary:this.cost/10,savings:2*this.cost,bonus:{holdMax:10,speed:0,health:0}};e.crew.push(t)}},{next:"badCargoMaster",text:"Turn him down, try asking the clumsy Alice instead."},{next:"crewHired",text:"Decide to spend your money on a different crew position, or none at all."}]},{id:"hireDoctor",title:"A Venomous Doctor",cost:700,getText:function(e){return"<p>The doctor, an older man named Daniel, sends a note in response to your invitation. \"Of course I'll join your crew, dear! My pharmaceutical skills are unappreciated here. It'll only cost you \""+this.cost+" coins to hire me away from my current ship. Every port, I'll need another "+10*this.cost+' coins."</p>'},choices:[{cost:700,next:"crewHired",getText:function(e){return"Hire them!"},isActionValid:function(e){return e.coins>=this.cost+10*this.cost},performAction:function(e){e.coins-=this.cost;const t={id:"daniel",name:"Daniel",jobTitle:"doctor",salary:this.cost/10,savings:2*this.cost,bonus:{holdMax:0,speed:0,health:7}};e.crew.push(t)}},{next:"crewHired",text:"Decide to spend your money on a different crew position, or none at all."}]},{id:"arriveExcelsior",title:"Arriving in Excelsior Station",getText:function(e){return"<p>You are back in the remote Excelsior Station. You already look forward to leaving.</p>"},choices:[{next:"marketEuropa",getText:function(e){return"<p>You might as well check what you can buy and sell before you get underway.</p>"}}]},{id:"marketExcelsior",title:"To market, to market...",getText:function(e){return'<p>You scroll through the market listings, looking at what is best to buy and sell here. You have a little money left to buy some goods to ship and some supplies to keep yourself and your ship functioning on your journey.</p><p>The listings are kept in the "Map" section of your display.</p>'},createChoices:function(e){this.choices.findIndex((t=>t.getText(e).includes("coins per unit.")))<=-1&&(this.choices=[...s("marketHaliax",{food:5,medicine:5,luxury:10,shipSupplies:5},{food:3,medicine:4,luxury:8,shipSupplies:5},r,a,e,o,n),...this.choices])},choices:[{next:"arriveHaliax",text:"Leave for <b>Haliax Station</b>."}]},{id:"marketExcelsiorBeginning",title:"To market, to market...",getText:function(e){return'<p>You scroll through the market listings, looking at what is best to buy and sell here. You have a little money left to buy some goods to ship and some supplies to keep yourself and your ship functioning on your journey.</p><p>The listings are kept in the "Map" section of your display.</p>'},createChoices:function(e){this.choices.findIndex((t=>t.getText?t.getText(e).includes("coins per unit."):0))<=-1&&(this.choices=[...s("marketHaliax",{food:5,medicine:5,luxury:10,shipSupplies:5},{food:3,medicine:4,luxury:8,shipSupplies:5},r,a,e,o,n),...this.choices])},choices:[{next:"maidenVoyage",text:"You finish stocking up and settle in for a long ride to Haliax Station in the Ganymede Prime system, your next port. You're headed home to your family. It's been almost a year since you last saw them."}]},{id:"maidenVoyage",title:"Your Maiden Voyage",getText:function(e){return"<p>You head out from port, a captain on your maiden trip.</p><p>Bon voyage!</p>"},choices:[{next:"arriveHaliax",getText:function(e){return"<p>You arrive safely at Haliax Station.</p>"},performAction:function(e){e.currentLocationId="haliax"}}]},{id:"arriveExcelsior",title:"Arriving in Excelsior Station",getText:function(e){return"<p>This station is a distant backwater.</p>"},choices:[{next:"marketExcelsior",getText:function(e){return"<p>Go to market.</p>"}}]},{id:"arriveHaliax",title:"Arriving in Haliax Station",getText:function(e){return"<p>This station orbits a largely agrarian planet. Food is cheap, but art and entertainment are hard to find on this lightly populated world and it's bare-bones station.</p>"},choices:[{next:"marketHaliax",getText:function(e){return"<p>Go make a killing by selling luxury goods! Or at least check the markets with an eye toward the future.</p>"}}]},{id:"marketHaliax",title:"To market, to market...",getText:function(e){return'<p>You scroll through the market listings, looking at what is best to buy and sell here.</p><p>The listings are kept in the "Map" section of your display.</p>'},createChoices:function(e){this.choices.findIndex((t=>t.getText(e).includes("coins per unit.")))<=-1&&(this.choices=[...s("marketHaliax",{food:5,medicine:5,luxury:10,shipSupplies:5},{food:3,medicine:4,luxury:8,shipSupplies:5},r,a,e,o,n),...this.choices])},choices:[{next:"arriveExcelsior",getText:function(e){return"<p>You leave Haliax Station, heading to <b>Excelsior Station</b> in the Ganymede Prime system.</p>"},performAction:function(e){e.currentLocationId="excelsior"}},{next:"arriveEuropa",getText:function(e){return"<p>You leave Haliax Station, heading to <b>Europa Station</b> in the Echidna Prime system.</p>"},performAction:function(e){e.currentLocationId="europa"}},{next:"arriveDrone",getText:function(e){return"<p>You leave Haliax Station, heading to <b>Drone Station</b> in the Eldrazi Minor system.</p>"},performAction:function(e){e.currentLocationId="drone"}}]},{id:"arriveEuropa",title:"Arriving in Europa Station",getText:function(e){return"<p>This station has no planet nearby, but it has made the most of it's human resources. After a windfall investment in medical technology from a bank tycoon who fell in love with a stationer, the station became one of the best pharmaceutical producers on this trade route.</p>"},choices:[{next:"marketEuropa",getText:function(e){return"<p>Go make a killing by selling medical goods! Or at least check the markets with an eye towards the future.</p>"}}]},{id:"marketEuropa",title:"To market, to market...",getText:function(e){return'<p>You scroll through the market listings, looking at what is best to buy and sell here.</p><p>The listings are kept in the "Map" section of your display.</p>'},createChoices:function(e){this.choices.findIndex((t=>t.getText(e).includes("coins per unit.")))<=-1&&(this.choices=[...s("marketHaliax",{food:5,medicine:5,luxury:10,shipSupplies:5},{food:3,medicine:4,luxury:8,shipSupplies:5},r,a,e,o,n),...this.choices])},choices:[{next:"arriveHaliax",getText:function(e){return"<p>You leave Haliax Station, heading to Haliax Station in the Echidna Prime system.</p>"},performAction:function(e){e.currentLocationId="haliax"}},{next:"arriveDrone",getText:function(e){return"<p>You leave Haliax Station, heading to Drone Station in the Eldrazi Minor system.</p>"},performAction:function(e){e.currentLocationId="drone"}}]},{id:"arriveDrone",title:"Arriving in Drone Station",getText:function(e){return"<p>The neighboring planet looms over the station, casting a gloom across every resident's face. Not literally, the planet is far enough away from the station that it is easy to ignore out the windows. But just knowing that the monsters of Eldrazi are in the same star system brings everyone's spirits down.</p>"},choices:[{next:"marketDrone",getText:function(e){return"<p>Go buy and sell goods.</p>"}}]},{id:"marketDrone",title:"To market, to market...",getText:function(e){return'<p>You scroll through the market listings, looking at what is best to buy and sell here.</p><p>The listings are kept in the "Map" section of your display.</p>'},createChoices:function(e){this.choices.findIndex((t=>t.getText(e).includes("coins per unit.")))<=-1&&(this.choices=[...s("marketHaliax",{food:5,medicine:5,luxury:10,shipSupplies:5},{food:3,medicine:4,luxury:8,shipSupplies:5},r,a,e,o,n),...this.choices])},choices:[{next:"arriveHaliax",getText:function(e){return"<p>You leave Drone Station, heading to Haliax Station in the Echidna Prime system.</p>"},performAction:function(e){e.currentLocationId="haliax"}},{next:"arriveEuropa",getText:function(e){return"<p>You leave Drone Station, heading to Europa Station in the Eldrazi Minor system.</p>"},performAction:function(e){e.currentLocationId="europa"}}]}],l=[{id:"excelsior",x:60,y:60,title:"Beta Thymine, Excelsior Station",connects:["haliax"],description:"A tiny backwater, avoid here if possible. Hard to reach, exciting to leave.",items:{food:{quantity:15,cost:10},medicine:{quantity:24,cost:5},luxury:{quantity:6,cost:25}}},{id:"haliax",x:160,y:50,title:"Ganymede Prime, Haliax Station",connects:["excelsior","europa","drone"],description:"A place, things happen here.",items:{food:{quantity:5,cost:25},medicine:{quantity:14,cost:10},luxury:{quantity:22,cost:5}}},{id:"europa",x:40,y:130,title:"Echidna 4317, Europa Station",connects:["haliax","drone"],description:"Beautiful, elegant, expensive.",items:{food:{quantity:23,cost:8},medicine:{quantity:9,cost:25},luxury:{quantity:21,cost:5}}},{id:"drone",x:180,y:180,title:"Eldrazi Minor, Drone Station",connects:["europa","haliax","tripoint"],description:"Scary monsters dwell on this station's neighboring planet.",items:{food:{quantity:11,cost:15},medicine:{quantity:7,cost:18},luxury:{quantity:10,cost:15}}},{id:"cyteen",x:30,y:210,title:"Cyteen, Cyteen Station",connects:["drone","downbelow"],description:"A barely habitable planet with a wealth of biotech and a gorgeous station.",items:{food:{quantity:5,cost:25},medicine:{quantity:30,cost:5},luxury:{quantity:15,cost:10}}},{id:"downbelow",x:60,y:310,title:"Betelgeuse, Downbelow Station",connects:["cyteen","tripoint"],description:"Aliens live on the nearby planet. The station is mostly human though.",items:{food:{quantity:35,cost:5},medicine:{quantity:5,cost:35},luxury:{quantity:10,cost:20}}},{id:"tripoint",x:120,y:250,title:"Deep Space, Tripoint Station",connects:["downbelow","mazian","drone"],description:"A dying white dwarf provides enough energy for a basic station, but not much else.",items:{food:{quantity:5,cost:25},medicine:{quantity:5,cost:25},luxury:{quantity:5,cost:25}}},{id:"mazian",x:170,y:330,title:"Alpha Centauri, Mazian Station",connects:["tripoint","earth"],description:"Beware: Pirates.",items:{food:{quantity:5,cost:35},medicine:{quantity:5,cost:35},luxury:{quantity:5,cost:35}}},{id:"earth",x:60,y:380,title:"Sol System, Earth Station",connects:["mazian"],description:"Cradle of humanity. Very rich.",items:{food:{quantity:35,cost:5},medicine:{quantity:35,cost:5},luxury:{quantity:35,cost:5}}}],d=[{id:"crewDebtA",title:"A debt comes due!",getText:function(e){const t=[...e.crew,...e.passengers],i=t.splice((0,o=t.length-1,Math.floor(Math.random()*(o-0+1)+0)))[0];var o;const n=[e.currentLocationId];for(let e=0;e<2;e++){const e=l.find((e=>e.connects.includes(n[n.length-1])&&!n.includes(e.id)));n.push(e.id)}return e.miniEvent={mainCharacter:i,locationList:n,cost:1e4},`<p>Debt collectors are on the trail of ${e.miniEvent.mainCharacter.name}, your ship's ${function(e){let t="";switch(e){case"navigator":t="navigator";break;case"cargoMaster":t="cargo master";break;case"doctor":t="doctor";break;case"ai":t="AI";break;default:t="passenger"}return t}(e.miniEvent.mainCharacter.hasOwnProperty("jobTitle")?e.miniEvent.mainCharacter.jobTitle:"")}. They owe them $${e.miniEvent.cost}.</p>`},choices:[{next:"crewDebtB",getText:function(e){const t=e.miniEvent.mainCharacter,i=e.miniEvent.locationList,o=i[i.length-1],n=l.find((e=>e.id===o)),r=i[i.findIndex((t=>t===e.currentLocationId))+1],a=l.find((e=>e.id===r));return console.log({locationList:i,currentLocationId:e.currentLocationId,nextLocationId:r,lastLocationId:o}),`Hurry towards ${n.title} via ${a.title} to meet with a friend who can help ${t.name} out of their sticky situation.`},isActionValid:function(e){const t=e.miniEvent.locationList;return t[t.length-1]!==e.currentLocationId},performAction:function(e){const t=e.miniEvent.locationList[e.miniEvent.locationList.findIndex((t=>t===e.currentLocationId))+1];e.currentLocationId=t}},{next:"crewDebtC",getText:function(e){return"Pay the thugs off."},isActionValid:function(e){return e.coins>=e.miniEvent.cost},performAction:function(e){e.coins-=e.miniEvent.cost}}]},{id:"crewDebtB",title:"Racing to a friend!",getText:function(e){return"There is no time to waste! Keep going!"},choices:[{next:"crewDebtB",getText:function(e){const t=e.miniEvent.mainCharacter,i=e.miniEvent.locationList,o=i[i.length-1],n=l.find((e=>e.id===o)),r=i[i.findIndex((t=>t===e.currentLocationId))+1],a=l.find((e=>e.id===r)),s=`Hurry towards ${n.title} via ${a.title} to meet with a friend who can help ${t.name} out of their sticky situation.`,c=`Hurry to ${n.title} to meet with a friend who can help ${t.name} out of their sticky situation.`;return r===o?(this.next="crewDebtD",c):s},isActionValid:function(e){const t=e.miniEvent.locationList,i=t[t.findIndex((t=>t===e.currentLocationId))+1];return t.includes(i)},performAction:function(e){const t=e.miniEvent.locationList[e.miniEvent.locationList.findIndex((t=>t===e.currentLocationId))+1];e.currentLocationId=t}},{next:"crewDebtC",getText:function(e){return"Pay the thugs off."},isActionValid:function(e){return e.coins>=e.miniEvent.cost},performAction:function(e){e.coins-=e.miniEvent.cost}}]},{id:"crewDebtC",title:"Pay the thugs off.",getText:function(e){return"You had the money to make this problem go away. Thank goodness! Now back to your safer everyday life."},createChoices:function(e){const t=e.currentLocationId,i=t.charAt(0).toUpperCase(),o=t.slice(1),n=l.find((e=>e.id===t)).title;this.choices=[{next:`market${i}${o}`,text:`Go to market at ${n}.`},...this.choices]},choices:[]},{id:"crewDebtD",title:"A friend helps you out of a bind.",getText:function(e){return`You made it! You find ${e.miniEvent.mainCharacter.name}'s friend. They are disappionted to have to bail them out, but willing to give them one more chance.`},createChoices:function(e){const t=e.currentLocationId,i=t.charAt(0).toUpperCase(),o=t.slice(1),n=l.find((e=>e.id===t)).title;this.choices=[{next:`market${i}${o}`,text:`Go to market at ${n}.`},...this.choices]},choices:[]}],u="gray",h={coins:1e5,cargo:[],shipStats:{holdMax:0,health:0,speed:0},miniEvent:{},ship:"",passengers:[],crew:[],costChoice:0,updateUI:!1,currentLocationId:"excelsior"},p=[...c,...d];window.storyEvents=p,window.playerState=h;const m={};function f(){if(!document)return;const e=document.querySelector(".iframeWrapper");if(!e)throw new Error("Could not find iframeWrapperElem");return m.iframeWrapperElem=e,e}function g(e,t){const i=e.getContext("2d");i.fillStyle="black",i.fillRect(0,0,e.width,e.height);for(const e of l){i.fillStyle="aliceblue",i.beginPath(),i.arc(e.x,e.y,15,0,180),i.fill(),e.id===t.currentLocationId&&(i.fillStyle="green",i.beginPath(),i.arc(e.x,e.y,7,0,180),i.fill());for(const t of e.connects){const o=l.find((e=>e.id===t)),n=o.x-e.x,r=o.y-e.y,a=Math.atan2(r,n),s=Math.cos(a),c=Math.sin(a),d=Math.cos(a-Math.PI/2),u=Math.sin(a-Math.PI/2);i.beginPath(),i.strokeStyle="silver",i.lineWidth=3;const h=25;i.moveTo(e.x+(h+2)*s,e.y+(h+2)*c),i.lineTo(o.x-(h+2)*s,o.y-(h+2)*c),i.stroke();const p=10,m=12;i.beginPath(),i.fillStyle="silver",i.moveTo(o.x-h*s,o.y-h*c),i.lineTo(o.x-(h+p)*s-m*d,o.y-(h+p)*c-m*u),i.lineTo(o.x-(h+p)*s+m*d,o.y-(h+p)*c+m*u),i.lineTo(o.x-h*s,o.y-h*c),i.fill()}i.beginPath();const o=16;i.font=`${o}px sans-serif`,i.textAlign="center",i.fillStyle="aqua",i.strokeStyle="black",i.lineWidth=.75,i.fillText(e.id,e.x,e.y-1.15*o),i.strokeText(e.id,e.x,e.y-1.15*o)}}function y(e,t){e.innerText=`Coins: ${t.coins}`}function x(t,i){t.innerHTML="";const o=[];if(i.crew.length<1)t.appendChild(e("li","crew","No crew hired on this ship!"));else for(let n=0;n<i.crew.length;n++){const r=i.crew[n],a=e("li","crew",`${r.jobTitle}: ${r.name}, $${r.salary}/port\n${JSON.stringify(r.bonus)}.`);o.push(r),t.appendChild(a)}}if(window.jsDom=m,"object"!=typeof window)console.log("this is not a browser, the DOM is not available");else{const o=function(){if(!document)return;const e=document.querySelector(".mainGame");if(!e)throw new Error("Could not find mainGameElem");return m.mainGameElem=e,e}();f(),function(){if(!document)return;const e=document.querySelector("#showGraph");if(!e)throw new Error("Could not find showGraphButtonElem");return m.showGraphButtonElem=e,e}().addEventListener("click",(function(){document&&(m.mainGameElem.style.display="none",m.mainGameElem.style.visibility="hidden",m.iframeWrapperElem.style.visibility="visible",m.iframeWrapperElem.style.display="block",m.iframeWrapperElem.style.height="81vh",m.iframeElem?m.iframeElem.style.height="100%":m.iframeWrapperElem.firstElementChild.style.height="100%")})),function(){if(!document)return;const e=document.querySelector("#hideGraph");if(!e)throw new Error("Could not find getHideGraphButtonElem");return m.hideGraphButtonElem=e,e}().addEventListener("click",(function(){document&&(m.mainGameElem.style.display="flex",m.mainGameElem.style.visibility="visible",m.iframeWrapperElem.style.visibility="hidden",m.iframeWrapperElem.style.display="none",m.iframeWrapperElem.style.height="0",m.iframeElem?m.iframeElem.style.height="0":m.iframeWrapperElem.firstElementChild.style.height="0")}));const n=e("div","js-statsBox js-tabbedArea center");n.setAttribute("id","open-modal");const r=e("div","statsBoxInner");n.appendChild(r);const a=e("div","modal-open statsBox-open");a.innerHTML='<a href="#open-modal">&#9776;</a>';const s=e("div","modal-close statsBox-close");s.innerHTML='<a href="#close-modal">&#x2715;</a>';const c=e("div","js-controlBox left"),d=e("div","js-storyBox right"),y=e("div","js-scrollbox");o.appendChild(d),o.appendChild(n),o.appendChild(a),o.appendChild(c),d.appendChild(y),c.appendChild(t("play")),c.appendChild(t("save")),c.appendChild(t("settings")),c.appendChild(t("person"));const T=e("ul","js-tabs");m.tabsElem=T,T.appendChild(e("li","js-tab tab tab1","Stats")),T.appendChild(e("li","js-tab tab tab2","Map")),T.appendChild(e("li","js-tab tab tab3","Items")),function(t,i){const o=b("strength","strength","lightcoral",u),n=e("div","js-tabContent tabContent tabContent1 ");n.appendChild(e("p","Base stats like strength, speed, and intellect. Maybe some sort of points or game progress, as well.")),n.appendChild(o.barWrapper),i.strengthBarElem=o.bar,i.strengthBarLabelElem=o.barLabel,i.strengthBarWrapperElem=o.barWrapper,i.strengthBarNumElem=o.barNum,i.statsTabContentElem=n}(0,m),function(t,i){const o=e("canvas","mapCanvas");o.setAttribute("width","220"),o.setAttribute("height","400"),g(o,h);const n=e("div","accordionWrapper"),r=e("div","js-tabContent tabContent tabContent2 ");for(let e=0;e<l.length;e++)v(l[e],n);r.appendChild(o),r.appendChild(n),i.mapCanvas=o,i.mapTabContentElem=r}(0,m),function(t,i){const o=e("div","coins","Coins: "+h.coins),n=b("cargo","cargo","cornflowerblue",u),r=n.barWrapper,a=n.bar,s=n.barLabel,c=n.barNum,l=e("div","js-tabContent tabContent tabContent3 selected");l.appendChild(e("p","","Your items!")),l.appendChild(o),l.appendChild(n.barWrapper);const d=e("div","crewWrapper"),p=e("h3","crewTitle","Crew");d.appendChild(p);const m=e("ul","crewInnerWrapper");x(m,h),d.appendChild(m),l.appendChild(d),i.coinsElem=o,i.cargoBarElem=a,i.cargoBarWrapperElem=r,i.cargoBarLabelElem=s,i.cargoBarNumElem=c,i.itemTabContentElem=l,i.crewWrapperElem=d,i.crewInnerWrapperElem=m,i.crewTitleElem=p}(0,m),T.appendChild(m.statsTabContentElem),T.appendChild(m.mapTabContentElem),T.appendChild(m.itemTabContentElem),r.appendChild(T),r.appendChild(s);const k=Array.from(T.getElementsByClassName("js-tab")),C=Array.from(T.getElementsByClassName("js-tabContent"));k.forEach((e=>{e.addEventListener("click",(e=>{var t,i,o;const n=e.target;k.forEach((e=>e.classList.remove("selected"))),C.forEach((e=>e.classList.remove("selected"))),n.classList.add("selected"),n.classList.contains("tab1")&&(null===(t=T.getElementsByClassName("tabContent1")[0])||void 0===t||t.classList.add("selected")),n.classList.contains("tab2")&&(null===(i=T.getElementsByClassName("tabContent2")[0])||void 0===i||i.classList.add("selected")),n.classList.contains("tab3")&&(null===(o=T.getElementsByClassName("tabContent3")[0])||void 0===o||o.classList.add("selected"))}))})),m.statsBoxWrapperElem=n,m.statsBoxElem=r,m.statsBoxOpenElem=a,m.controlBoxElem=c,m.storyBoxElem=d,m.scrollBoxElem=y,window.onload=()=>{let e=100;const t=()=>setTimeout((()=>{const o=m.coinsElem;!o&&e>0?(e--,t()):o?(console.log("COIN ELEM FOUND!"),function(e,t,o){if(window.location.href.indexOf("spacemerchant-ts")>-1){let e;m.iframeWrapperElem?e=m.iframeWrapperElem.firstElementChild:m.iframeElem=f().firstElementChild,m.iframeElem=e,m.iframeElem.setAttribute("src","/spacemerchant-ts/draculajs/examples/sciFiStoryGraph.html")}E(o,e,m),w(m.cargoBarElem,m.cargoBarNumElem,e.cargo.length,i(e))}(h,0,p.find((e=>"firstEvent"===e.id)))):console.log("NO COINS ELEMENT ON PAGE, GAVE UP LOOKING")}),50);t()}}function b(t,i,o,n){const r=e("div",`barWrapper ${t}-bar`),a=e("span","barLabel",i),s=e("span","barNum"),c=e("div","bar");return c.setAttribute("style",`box-sizing:content-box;width:auto;border-left: 0px solid ${o};background-color:${n}`),r.appendChild(a),c.appendChild(s),r.appendChild(c),{barWrapper:r,bar:c,barLabel:a,barNum:s}}function w(e,t,i,o){if(!e)return console.log("bar element not found");const n=e.offsetWidth,r=Math.round(i/o*n);e.style.background=u,e.style.borderLeftWidth=r+"px",t.innerText=i+"/"+o}function v(t,i){const o=e("div","accordionItemWrapper"),n=e("button","accordion",t.title);n.addEventListener("click",(e=>{var t;e.preventDefault();const i=e.target;i.classList.toggle("active"),null===(t=i.nextElementSibling)||void 0===t||t.classList.toggle("show")}));const r=e("ul","itemList"),a=e("div","panel");a.appendChild(e("p","",t.description)),a.append(r);for(const i in t.items){const o=e("li","item",i+": $"+t.items[i].cost);r.append(o)}o.appendChild(n),o.appendChild(a),i.append(o)}function E(t,o,n){const r=n.scrollBoxElem;r.innerHTML="";const a=e("div","storyContentWrapper");g(n.mapCanvas,o),r.appendChild(a);const s=t.getText?t.getText(o):t.text?t.text:"";if("string"!=typeof s)throw new Error(`eventText of ${t.id} is not a string`);a.appendChild(e("h3","eventTitle",t.title));const c=e("div","eventTextWrapper");c.innerHTML=s,a.appendChild(c);const l=e("div","choicesWrapper");a.appendChild(l),void 0!==t.createChoices&&t.createChoices(o);const d=[...t.choices];Math.floor(10*Math.random())>5&&(o.crew.length>0||o.passengers.length>0)&&d.push({next:"crewDebtA",getText:e=>"Oh no! Someone runs up to you panicking!"});for(let t=0;t<d.length;t++){const r=d[t],a=e("div","choice"),s=r.getText?r.getText(o):r.text?r.text:"";"string"==typeof s&&(a.innerHTML=s),a.dataset.nextEvent=r.next,a.dataset.choice=JSON.stringify(r),r.isActionValid&&!1===r.isActionValid(o)&&a.classList.add("class","notValid"),r.next&&!p.find((e=>e.id===r.next))&&a.classList.add("class","notValid"),a.addEventListener("click",(e=>{r.next&&!p.find((e=>e.id===r.next))||r.isActionValid&&!r.isActionValid(o)||(r.hasOwnProperty("performAction")&&void 0!==r.performAction&&(r.performAction(o),w(n.cargoBarElem,n.cargoBarNumElem,o.cargo.length,i(o)),y(n.coinsElem,o),x(n.crewInnerWrapperElem,o)),E(p.find((e=>e.id===r.next)),o,n))})),l.appendChild(a)}}})();