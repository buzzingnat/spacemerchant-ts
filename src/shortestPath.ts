export const shortestDistanceNode = (distances, visited) => {
  let shortest = null;

  for (let node in distances) {
    let currentIsShortest =
      shortest === null || distances[node] < distances[shortest];
    if (currentIsShortest && !visited.includes(node)) {
      shortest = node;
    }
  }
  return shortest;
};

export const findShortestPathWithLogs = (graph, startNode, endNode) => {
  // establish object for recording distances from the start node
  let distances = {};
  distances[endNode] = "Infinity";
  distances = Object.assign(distances, graph[startNode]);

  // track paths
  let parents = { endNode: null };
  for (let child in graph[startNode]) {
    parents[child] = startNode;
  }

  // track nodes that have already been visited
  let visited = [];

  // find the nearest node
  let node = shortestDistanceNode(distances, visited);

  // for that node
  while (node) {
    // find its distance from the start node & its child nodes
    let distance = distances[node];
    let children = graph[node];
    // for each of those child nodes
    for (let child in children) {
      // make sure each child node is not the start node
      if (String(child) === String(startNode)) {
        console.log("don't return to the start node! 🙅");
        continue;
      } else {
        console.log("startNode: " + startNode);
        console.log("distance from node " + parents[node] + " to node " + node + ")");
        console.log("previous distance: " + distances[node]);
        // save the distance from the start node to the child node
        let newdistance = distance + children[child];
        console.log("new distance: " + newdistance);
        // if there's no recorded distance from the start node to the child node in the distances object
        // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
        // save the distance to the object
        // record the path
        if (!distances[child] || distances[child] > newdistance) {
          distances[child] = newdistance;
          parents[child] = node;
          console.log("distance + parents updated");
        } else {
          console.log("not updating, because a shorter path already exists!");
        }
      }
    }
    // move the node to the visited set
    visited.push(node);
    // move to the nearest neighbor node
    node = shortestDistanceNode(distances, visited);
  }

  // using the stored paths from start node to end node
  // record the shortest path
  let shortestPath = [endNode];
  let parent = parents[endNode];
  while (parent) {
    shortestPath.push(parent);
    parent = parents[parent];
  }
  shortestPath.reverse();

  // return the shortest path from start node to end node & its distance
  let results = {
    distance: distances[endNode],
    path: shortestPath,
  };

  return results;
};

function vertexWithMinDistance(distances: {[key: number]: number | null}[], visited: Set<number | null>) {
    let minDistance = Infinity,
        minVertex: number | null = null;
    for (let obj of distances) {
        let vertex = Number(Object.keys(obj)[0]);
        let distance = Object.values(obj)[0];
        if (distance < minDistance && !visited.has(vertex)) {
            minDistance = distance;
            minVertex = vertex;
        }
    }
    return {[minVertex]: minDistance};
}

export function shortestPath(graph: MapLocation[], startId: string, endId: string) {
    let distances: {[key: number]: number | null}[] = [];
    let parents: {[key: number]: number | null}[] = [];
    // just the indexes of graph nodes
    let visited: Set<number | null> = new Set();

    for (let i = 0; i < graph.length; i++) {
        if (graph[i].id === startId) {
            distances[i] = {[i]:0};
            console.log('to begin, distances are', JSON.stringify(distances));
        } else {
            distances[i] = {[i]:Infinity};
        }
        parents[i] = {[i]:null};
    }

    let currVertex: {[key: number]: number} = vertexWithMinDistance(distances, visited);
    let currVertexIndex: number | null = Object.keys(currVertex)[0] !== null
      ? Number(Object.keys(currVertex)[0])
      : null;

    while (currVertexIndex !== null) {
        let distance = Object.values(distances[currVertexIndex])[0],
            neighbors = graph[currVertexIndex].edges;
        console.log('next distances are', JSON.stringify(distances));
        for (let obj of neighbors) {
            const neighborIndex = graph.findIndex(loc => loc.id === Object.keys(obj)[0]);
            const neighborDistance = Object.values(obj)[0];
            let newDistance = distance + neighborDistance;
            if (distances[neighborIndex][neighborIndex] > newDistance) {
                distances[neighborIndex] = {[neighborIndex]: newDistance};
                parents[currVertexIndex] = {[currVertexIndex]: neighborIndex};
            }
        }
        visited.add(currVertexIndex);
        currVertex = vertexWithMinDistance(distances, visited);
    }

    console.log('parents', parents);
    console.log('distances', distances);
    const stationParents = parents.map(obj => {
      return {[graph[Object.keys(obj)[0]].id]: Object.values(obj)[0]}
    })
    console.log('stationParents', stationParents);
    const stationDistances = distances.map(obj => {
      return {[graph[Object.keys(obj)[0]].id]: Object.values(obj)[0]}
    })
    console.log('stationDistances', stationDistances);

    return distances;
}
