/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils.ts\");\n/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map */ \"./src/map.ts\");\n/* harmony import */ var _shortestPath__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shortestPath */ \"./src/shortestPath.ts\");\n\n\n\n// const COL_BLUE = 'cornflowerblue';\n// const COL_RED = 'lightcoral';\n// const COL_ORANGE = 'sandybrown';\n// const COL_LTGRAY = 'silver';\n// const COL_DKGRAY = 'gray';\n/**\n *PLAYER STATE\n **/\nconst playerState = {\n    coins: 100000,\n    cargo: [],\n    shipStats: { holdMax: 0, health: 0, speed: 0 },\n    miniEvent: {},\n    ship: '',\n    passengers: [],\n    crew: [],\n    costChoice: 0,\n    updateUI: false,\n    currentLocationId: 'excelsior',\n    targetLocationId: '',\n};\n/* end PLAYER STATE */\n/**\n *GLOBAL OBJECTS\n **/\n// @ts-ignore\nwindow.playerState = playerState;\n/* end GLOBAL OBJECTS */\n/**\n *GLOBAL DOM ELEMENTS\n **/\nconst jsDom = {};\n// @ts-ignore\nwindow.jsDom = jsDom;\n// @ts-ignore\nwindow.mapList = _map__WEBPACK_IMPORTED_MODULE_1__.map;\nfunction getMainGameElem() {\n    if (!document) {\n        return;\n    }\n    const mainGameElem = document.querySelector('.mainGame');\n    if (!mainGameElem) {\n        throw new Error('Could not find mainGameElem');\n    }\n    jsDom.mainGameElem = mainGameElem;\n    return mainGameElem;\n}\nfunction drawMapCanvas(canvas, playerState) {\n    const context = canvas.getContext(\"2d\");\n    context.fillStyle = \"black\";\n    context.fillRect(0, 0, canvas.width, canvas.height);\n    for (const station of _map__WEBPACK_IMPORTED_MODULE_1__.map) {\n        context.fillStyle = \"aliceblue\";\n        context.beginPath();\n        context.arc(station.x, station.y, station.radius, 0, 180);\n        context.fill();\n        // add green dot to current location\n        if (station.id === playerState.currentLocationId) {\n            context.fillStyle = \"green\";\n            context.beginPath();\n            context.arc(station.x, station.y, 7, 0, 180);\n            context.fill();\n        }\n        for (const id of station.connects) {\n            // station is source, destination is target.\n            const destination = _map__WEBPACK_IMPORTED_MODULE_1__.map.find(dest => dest.id === id);\n            const dx = destination.x - station.x, dy = destination.y - station.y;\n            const theta = Math.atan2(dy, dx);\n            const nx = Math.cos(theta), ny = Math.sin(theta);\n            const perpx = Math.cos(theta - Math.PI / 2), perpy = Math.sin(theta - Math.PI / 2);\n            // const mag = Math.sqrt(dx*dx + dy*dy)\n            // const nx = dx / mag, ny = dy / mag;\n            // line\n            context.beginPath();\n            context.strokeStyle = \"silver\";\n            context.lineWidth = 3;\n            const padding = 10;\n            const d = 15 + padding;\n            context.moveTo(station.x + (d + 2) * nx, station.y + (d + 2) * ny);\n            context.lineTo(destination.x - (d + 2) * nx, destination.y - (d + 2) * ny);\n            context.stroke();\n            // arrow\n            const arrowLength = 10;\n            const arrowWidth = 12;\n            context.beginPath();\n            context.fillStyle = \"silver\";\n            context.moveTo(destination.x - d * nx, destination.y - d * ny);\n            context.lineTo(destination.x - (d + arrowLength) * nx - arrowWidth * perpx, destination.y - (d + arrowLength) * ny - arrowWidth * perpy);\n            context.lineTo(destination.x - (d + arrowLength) * nx + arrowWidth * perpx, destination.y - (d + arrowLength) * ny + arrowWidth * perpy);\n            context.lineTo(destination.x - d * nx, destination.y - d * ny);\n            context.fill();\n        }\n        context.beginPath();\n        const fontSize = 16;\n        context.font = `${fontSize}px sans-serif`;\n        context.textAlign = \"center\";\n        context.fillStyle = \"aqua\";\n        context.strokeStyle = \"black\";\n        context.lineWidth = .75;\n        context.fillText(station.id, station.x, station.y - fontSize * 1.15);\n        context.strokeText(station.id, station.x, station.y - fontSize * 1.15);\n    }\n    canvas.addEventListener('click', (e) => {\n        const mousePoint = {\n            x: e.offsetX,\n            y: e.offsetY\n        };\n        _map__WEBPACK_IMPORTED_MODULE_1__.map.forEach(circle => {\n            if (isIntersect(mousePoint, circle)) {\n                // console.log('click on station: ' + circle.id);\n                playerState.targetLocationId = circle.id;\n                moveShip(playerState, canvas);\n            }\n        });\n    });\n}\nfunction moveShip(playerState, mapCanvas) {\n    //const currentLocationIndex = mapList.findIndex(station => station.id === playerState.currentLocationId);\n    //const targetLocationIndex = mapList.findIndex(station => station.id === playerState.targetLocationId);\n    const travelList = (0,_shortestPath__WEBPACK_IMPORTED_MODULE_2__.shortestPath)(_map__WEBPACK_IMPORTED_MODULE_1__.map, playerState.currentLocationId, playerState.targetLocationId);\n    console.log('travelList', travelList);\n    drawMapCanvas(mapCanvas, playerState);\n}\nif (typeof window !== \"object\") {\n    console.log('this is not a browser, the DOM is not available');\n}\nelse {\n    const mainGameElem = getMainGameElem();\n    const mapCanvasElem = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.tag)('canvas', 'mapCanvas');\n    const gameW = mainGameElem.clientWidth;\n    const gameH = mainGameElem.clientHeight || window.innerHeight - 100;\n    mapCanvasElem.setAttribute('width', gameW + '');\n    mapCanvasElem.setAttribute('height', gameH + '');\n    drawMapCanvas(mapCanvasElem, playerState);\n    mainGameElem.appendChild(mapCanvasElem);\n    jsDom.mapCanvasElem = mapCanvasElem;\n    //CALL THE FUNCTION displayEvent AND USE IT TO CREATE THE FIRST EVENT ON THE SCREEN\n    window.onload = () => {\n        initGame(playerState);\n    };\n}\nfunction initGame(playerState) {\n    console.log('initialized game');\n}\n/* end DOM ELEMENTS */\nfunction isIntersect(point, circle) {\n    return Math.sqrt((point.x - circle.x) ** 2 + (point.y - circle.y) ** 2) < circle.radius;\n}\n\n\n//# sourceURL=webpack://spacemerchant-ts/./src/index.ts?");

/***/ }),

/***/ "./src/map.ts":
/*!********************!*\
  !*** ./src/map.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"map\": () => (/* binding */ map)\n/* harmony export */ });\nconst map = [\n    { id: 'excelsior',\n        x: 60, y: 60, radius: 15,\n        title: 'Beta Thymine, Excelsior Station',\n        connects: ['haliax'],\n        edges: [{ haliax: 1 }],\n        description: 'A tiny backwater, avoid here if possible. Hard to reach, exciting to leave.',\n        items: {\n            food: { quantity: 15, cost: 10 },\n            medicine: { quantity: 24, cost: 5 },\n            luxury: { quantity: 6, cost: 25 }\n        }\n    },\n    { id: 'haliax',\n        x: 160, y: 50, radius: 15,\n        title: 'Ganymede Prime, Haliax Station',\n        connects: ['excelsior', 'europa', 'drone'],\n        edges: [{ excelsior: 1 }, { europa: 1 }, { drone: 1 }],\n        description: 'A place, things happen here.',\n        items: {\n            food: { quantity: 5, cost: 25 },\n            medicine: { quantity: 14, cost: 10 },\n            luxury: { quantity: 22, cost: 5 }\n        }\n    },\n    { id: 'europa',\n        x: 40, y: 130, radius: 15,\n        title: 'Echidna 4317, Europa Station',\n        connects: ['haliax', 'drone'],\n        edges: [{ haliax: 1 }, { drone: 1 }],\n        description: 'Beautiful, elegant, expensive.',\n        items: {\n            food: { quantity: 23, cost: 8 },\n            medicine: { quantity: 9, cost: 25 },\n            luxury: { quantity: 21, cost: 5 }\n        }\n    },\n    { id: 'drone',\n        x: 180, y: 180, radius: 15,\n        title: 'Eldrazi Minor, Drone Station',\n        connects: ['europa', 'haliax', 'tripoint'],\n        edges: [{ europa: 1 }, { haliax: 1 }, { tripoint: 1 }],\n        description: 'Scary monsters dwell on this station\\'s neighboring planet.',\n        items: {\n            food: { quantity: 11, cost: 15 },\n            medicine: { quantity: 7, cost: 18 },\n            luxury: { quantity: 10, cost: 15 }\n        }\n    },\n    { id: 'cyteen',\n        x: 30, y: 210, radius: 15,\n        title: 'Cyteen, Cyteen Station',\n        connects: ['drone', 'downbelow'],\n        edges: [{ drone: 1 }, { downbelow: 1 }],\n        description: 'A barely habitable planet with a wealth of biotech and a gorgeous station.',\n        items: {\n            food: { quantity: 5, cost: 25 },\n            medicine: { quantity: 30, cost: 5 },\n            luxury: { quantity: 15, cost: 10 }\n        }\n    },\n    { id: 'downbelow',\n        x: 60, y: 310, radius: 15,\n        title: 'Betelgeuse, Downbelow Station',\n        connects: ['cyteen', 'tripoint'],\n        edges: [{ cyteen: 1 }, { tripoint: 1 }],\n        description: 'Aliens live on the nearby planet. The station is mostly human though.',\n        items: {\n            food: { quantity: 35, cost: 5 },\n            medicine: { quantity: 5, cost: 35 },\n            luxury: { quantity: 10, cost: 20 }\n        }\n    },\n    { id: 'tripoint',\n        x: 120, y: 250, radius: 15,\n        title: 'Deep Space, Tripoint Station',\n        connects: ['downbelow', 'mazian', 'drone'],\n        edges: [{ downbelow: 1 }, { mazian: 1 }, { drone: 1 }],\n        description: 'A dying white dwarf provides enough energy for a basic station, but not much else.',\n        items: {\n            food: { quantity: 5, cost: 25 },\n            medicine: { quantity: 5, cost: 25 },\n            luxury: { quantity: 5, cost: 25 }\n        }\n    },\n    { id: 'mazian',\n        x: 170, y: 330, radius: 15,\n        title: 'Alpha Centauri, Mazian Station',\n        connects: ['tripoint', 'earth'],\n        edges: [{ tripoint: 1 }, { earth: 1 }],\n        description: 'Beware: Pirates.',\n        items: {\n            food: { quantity: 5, cost: 35 },\n            medicine: { quantity: 5, cost: 35 },\n            luxury: { quantity: 5, cost: 35 }\n        }\n    },\n    { id: 'earth',\n        x: 60, y: 380, radius: 15,\n        title: 'Sol System, Earth Station',\n        connects: ['mazian'],\n        edges: [{ mazian: 1 }],\n        description: 'Cradle of humanity. Very rich.',\n        items: {\n            food: { quantity: 35, cost: 5 },\n            medicine: { quantity: 35, cost: 5 },\n            luxury: { quantity: 35, cost: 5 }\n        }\n    }\n];\n\n\n//# sourceURL=webpack://spacemerchant-ts/./src/map.ts?");

/***/ }),

/***/ "./src/shortestPath.ts":
/*!*****************************!*\
  !*** ./src/shortestPath.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"findShortestPathWithLogs\": () => (/* binding */ findShortestPathWithLogs),\n/* harmony export */   \"shortestDistanceNode\": () => (/* binding */ shortestDistanceNode),\n/* harmony export */   \"shortestPath\": () => (/* binding */ shortestPath)\n/* harmony export */ });\nconst shortestDistanceNode = (distances, visited) => {\n    let shortest = null;\n    for (let node in distances) {\n        let currentIsShortest = shortest === null || distances[node] < distances[shortest];\n        if (currentIsShortest && !visited.includes(node)) {\n            shortest = node;\n        }\n    }\n    return shortest;\n};\nconst findShortestPathWithLogs = (graph, startNode, endNode) => {\n    // establish object for recording distances from the start node\n    let distances = {};\n    distances[endNode] = \"Infinity\";\n    distances = Object.assign(distances, graph[startNode]);\n    // track paths\n    let parents = { endNode: null };\n    for (let child in graph[startNode]) {\n        parents[child] = startNode;\n    }\n    // track nodes that have already been visited\n    let visited = [];\n    // find the nearest node\n    let node = shortestDistanceNode(distances, visited);\n    // for that node\n    while (node) {\n        // find its distance from the start node & its child nodes\n        let distance = distances[node];\n        let children = graph[node];\n        // for each of those child nodes\n        for (let child in children) {\n            // make sure each child node is not the start node\n            if (String(child) === String(startNode)) {\n                console.log(\"don't return to the start node! 🙅\");\n                continue;\n            }\n            else {\n                console.log(\"startNode: \" + startNode);\n                console.log(\"distance from node \" + parents[node] + \" to node \" + node + \")\");\n                console.log(\"previous distance: \" + distances[node]);\n                // save the distance from the start node to the child node\n                let newdistance = distance + children[child];\n                console.log(\"new distance: \" + newdistance);\n                // if there's no recorded distance from the start node to the child node in the distances object\n                // or if the recorded distance is shorter than the previously stored distance from the start node to the child node\n                // save the distance to the object\n                // record the path\n                if (!distances[child] || distances[child] > newdistance) {\n                    distances[child] = newdistance;\n                    parents[child] = node;\n                    console.log(\"distance + parents updated\");\n                }\n                else {\n                    console.log(\"not updating, because a shorter path already exists!\");\n                }\n            }\n        }\n        // move the node to the visited set\n        visited.push(node);\n        // move to the nearest neighbor node\n        node = shortestDistanceNode(distances, visited);\n    }\n    // using the stored paths from start node to end node\n    // record the shortest path\n    let shortestPath = [endNode];\n    let parent = parents[endNode];\n    while (parent) {\n        shortestPath.push(parent);\n        parent = parents[parent];\n    }\n    shortestPath.reverse();\n    // return the shortest path from start node to end node & its distance\n    let results = {\n        distance: distances[endNode],\n        path: shortestPath,\n    };\n    return results;\n};\nfunction vertexWithMinDistance(distances, visited) {\n    let minDistance = Infinity, minVertex = null;\n    for (let obj of distances) {\n        let vertex = Number(Object.keys(obj)[0]);\n        let distance = Object.values(obj)[0];\n        if (distance < minDistance && !visited.has(vertex)) {\n            minDistance = distance;\n            minVertex = vertex;\n        }\n    }\n    return { [minVertex]: minDistance };\n}\nfunction shortestPath(graph, startId, endId) {\n    let distances = [];\n    let parents = [];\n    // just the indexes of graph nodes\n    let visited = new Set();\n    for (let i = 0; i < graph.length; i++) {\n        if (graph[i].id === startId) {\n            distances[i] = { [i]: 0 };\n            console.log('to begin, distances are', JSON.stringify(distances));\n        }\n        else {\n            distances[i] = { [i]: Infinity };\n        }\n        parents[i] = { [i]: null };\n    }\n    let currVertex = vertexWithMinDistance(distances, visited);\n    let currVertexIndex = Object.keys(currVertex)[0] !== null\n        ? Number(Object.keys(currVertex)[0])\n        : null;\n    while (currVertexIndex !== null) {\n        let distance = Object.values(distances[currVertexIndex])[0], neighbors = graph[currVertexIndex].edges;\n        console.log('next distances are', JSON.stringify(distances));\n        for (let obj of neighbors) {\n            const neighborIndex = graph.findIndex(loc => loc.id === Object.keys(obj)[0]);\n            const neighborDistance = Object.values(obj)[0];\n            let newDistance = distance + neighborDistance;\n            if (distances[neighborIndex][neighborIndex] > newDistance) {\n                distances[neighborIndex] = { [neighborIndex]: newDistance };\n                parents[currVertexIndex] = { [currVertexIndex]: neighborIndex };\n            }\n        }\n        visited.add(currVertexIndex);\n        currVertex = vertexWithMinDistance(distances, visited);\n    }\n    console.log('parents', parents);\n    console.log('distances', distances);\n    const stationParents = parents.map(obj => {\n        return { [graph[Object.keys(obj)[0]].id]: Object.values(obj)[0] };\n    });\n    console.log('stationParents', stationParents);\n    const stationDistances = distances.map(obj => {\n        return { [graph[Object.keys(obj)[0]].id]: Object.values(obj)[0] };\n    });\n    console.log('stationDistances', stationDistances);\n    return distances;\n}\n\n\n//# sourceURL=webpack://spacemerchant-ts/./src/shortestPath.ts?");

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"randomInt\": () => (/* binding */ randomInt),\n/* harmony export */   \"tag\": () => (/* binding */ tag)\n/* harmony export */ });\n//const COL_BLUE = 'cornflowerblue';\n//const COL_RED = 'lightcoral';\n// const COL_ORANGE = 'sandybrown';\n// const COL_LTGRAY = 'silver';\n// const COL_DKGRAY = 'gray';\nfunction randomInt(min, max) {\n    return Math.floor(Math.random() * (max - min + 1) + min);\n}\n// function to help nest html built in my js\nfunction tag(tagType, classes, content) {\n    const elem = document.createElement(tagType);\n    elem.setAttribute('class', classes);\n    if (!content) {\n        return elem;\n    }\n    if (typeof content === 'string') {\n        elem.innerText = content;\n    }\n    if (typeof content !== 'string') {\n        elem.appendChild(content);\n    }\n    return elem;\n}\n\n\n//# sourceURL=webpack://spacemerchant-ts/./src/utils.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;