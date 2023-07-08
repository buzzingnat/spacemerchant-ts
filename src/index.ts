import { tag } from './utils';
import { map as mapList } from './map';
import { shortestPath } from './shortestPath';

// const COL_BLUE = 'cornflowerblue';
// const COL_RED = 'lightcoral';
// const COL_ORANGE = 'sandybrown';
// const COL_LTGRAY = 'silver';
// const COL_DKGRAY = 'gray';

/**
 *PLAYER STATE
 **/
const playerState: PlayerState = {
  coins: 100000,
  cargo: [],
  shipStats: {holdMax: 0, health: 0, speed: 0},
  miniEvent: {},
  ship: '',
  passengers: [],
  crew: [],
  costChoice: 0,
  updateUI: false,
  currentLocationId: 'excelsior',
  targetLocationId: '',
};
/* end PLAYER STATE */

/**
 *GLOBAL OBJECTS
 **/
// @ts-ignore
window.playerState = playerState;
/* end GLOBAL OBJECTS */

/**
 *GLOBAL DOM ELEMENTS
 **/
const jsDom: {[key: string]: HTMLElement} | undefined = {};
// @ts-ignore
window.jsDom = jsDom;
// @ts-ignore
window.mapList = mapList;

function getMainGameElem() {
    if (!document) {
        return;
    }
    const mainGameElem: HTMLDivElement = document.querySelector('.mainGame')!;
    if (!mainGameElem) {
        throw new Error('Could not find mainGameElem');
    }
    jsDom.mainGameElem = mainGameElem;
    return mainGameElem;
}

function drawMapCanvas(canvas: HTMLCanvasElement, playerState: PlayerState) {
    const context = canvas.getContext("2d");

    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (const station of mapList) {
        context.fillStyle = "aliceblue";
        context.beginPath();
        context.arc(station.x, station.y, station.radius, 0, 180);
        context.fill();

        // add green dot to current location
        if (station.id === playerState.currentLocationId) {
            context.fillStyle = "green";
            context.beginPath();
            context.arc(station.x, station.y, 7, 0, 180);
            context.fill();
        }

        for (const id of station.connects) {
            // station is source, destination is target.
            const destination = mapList.find(dest => dest.id === id);
            const dx = destination.x - station.x, dy = destination.y - station.y;
            const theta = Math.atan2(dy, dx);
            const nx = Math.cos(theta), ny = Math.sin(theta);
            const perpx = Math.cos(theta-Math.PI/2), perpy = Math.sin(theta-Math.PI/2);
            // const mag = Math.sqrt(dx*dx + dy*dy)
            // const nx = dx / mag, ny = dy / mag;

            // line
            context.beginPath();
            context.strokeStyle = "silver";
            context.lineWidth = 3;
            const padding = 10;
            const d = 15 + padding;
            context.moveTo(station.x + (d+2) * nx, station.y + (d+2) * ny);
            context.lineTo(destination.x - (d+2) * nx, destination.y - (d+2) * ny);
            context.stroke();

            // arrow
            const arrowLength = 10;
            const arrowWidth = 12;
            context.beginPath();
            context.fillStyle = "silver";
            context.moveTo(destination.x - d * nx, destination.y - d * ny);
            context.lineTo(destination.x - (d + arrowLength) * nx - arrowWidth * perpx, destination.y - (d + arrowLength) * ny - arrowWidth * perpy);
            context.lineTo(destination.x - (d + arrowLength) * nx + arrowWidth * perpx, destination.y - (d + arrowLength) * ny + arrowWidth * perpy);
            context.lineTo(destination.x - d * nx, destination.y - d * ny);
            context.fill();
        }
        context.beginPath();
        const fontSize = 16;
        context.font = `${fontSize}px sans-serif`;
        context.textAlign = "center";
        context.fillStyle = "aqua";
        context.strokeStyle = "black";
        context.lineWidth = .75;
        context.fillText(station.id, station.x, station.y-fontSize*1.15);
        context.strokeText(station.id, station.x, station.y-fontSize*1.15);
    }
    canvas.addEventListener('click', (e) => {
        const mousePoint = {
            x: e.offsetX,
            y: e.offsetY
        };
        mapList.forEach(circle => {
            if (isIntersect(mousePoint, circle)) {
                // console.log('click on station: ' + circle.id);
                playerState.targetLocationId = circle.id;
                moveShip(playerState, canvas);
            }
        });
    });
}

function moveShip(playerState, mapCanvas) {
    //const currentLocationIndex = mapList.findIndex(station => station.id === playerState.currentLocationId);
    //const targetLocationIndex = mapList.findIndex(station => station.id === playerState.targetLocationId);
    const travelList = shortestPath(mapList, playerState.currentLocationId, playerState.targetLocationId);
    console.log('travelList', travelList);
    drawMapCanvas(mapCanvas, playerState);
}

if (typeof window !== "object") {
    console.log('this is not a browser, the DOM is not available');
} else {
    const mainGameElem = getMainGameElem()!;
    const mapCanvasElem = tag('canvas', 'mapCanvas') as HTMLCanvasElement;
    const gameW = mainGameElem.clientWidth;
    const gameH = mainGameElem.clientHeight || window.innerHeight - 100;
    mapCanvasElem.setAttribute('width', gameW+'');
    mapCanvasElem.setAttribute('height', gameH+'');

    drawMapCanvas(mapCanvasElem, playerState);

    mainGameElem.appendChild( mapCanvasElem );

    jsDom.mapCanvasElem = mapCanvasElem;

    //CALL THE FUNCTION displayEvent AND USE IT TO CREATE THE FIRST EVENT ON THE SCREEN
    window.onload = () => {
        initGame(playerState);
    };
}

function initGame(playerState: PlayerState) {
    console.log('initialized game');
}
/* end DOM ELEMENTS */

function isIntersect(point, circle) {
  return Math.sqrt((point.x-circle.x) ** 2 + (point.y - circle.y) ** 2) < circle.radius;
}
