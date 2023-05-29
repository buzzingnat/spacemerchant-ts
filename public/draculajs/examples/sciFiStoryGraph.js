function makeEdgeList(){
    //pull data from events.js into an array/object of info about connectivity
    //format like: [{parent1: [child1, child2, child3]}, {parent2: [child1, child2, child3]}]
    //real life example: [
    //{'firstEvent': ['worstShip', 'bestShip']},
    //{'worstShip': ['grouchyNavigator', 'ambitiousNavigator']},
    //{'bestShip': ['marketExcelsior']},
    //{'grouchyNavigator': ['crewHired', 'ambitiousNavigator', 'hireCargoMaster']},
    //{'ambitiousNavigator': ['crewHired', 'grouchyNavigator', 'hireCargoMaster']},
    //{'crewHired': ['hireCargoMaster', 'hireDoctor', 'marketExcelsior']}
    //]
}

var redraw, g, renderer;

function displayGraph() {

    var width = $(document).width() - 20;
    var height = $(document).height() - 60;
    var events = window.parent.storyEvents;

    var g = new Graph();

    /* First: Write a custom node render function. */
    var renderFirst = function(r, n) {//beginning choice: light green
	/* the Raphael set is obligatory, containing all you want to display */
	var set = r.set().push(
	    /* custom objects go here */
	    r.rect(n.point[0]-30, n.point[1]-13, 100, 25).attr({"fill": "#0f5", r : "12px", "stroke-width" : "1px" })).push(
	    r.text(n.point[0]+15, n.point[1], (n.label || n.id)));
	return set;
    };
    var renderGeneric = function(r, n) {//generic choice: light blue
	/* the Raphael set is obligatory, containing all you want to display */
	var set = r.set().push(
	    /* custom objects go here */
	    r.rect(n.point[0]-30, n.point[1]-13, 100, 25).attr({"fill": "#1af", r : "12px", "stroke-width" : "1px" })).push(
	    r.text(n.point[0]+15, n.point[1], (n.label || n.id)));
	return set;
    };
    var renderNoChoice = function(r, n) {//no choices in event: yellow
    	/* the Raphael set is obligatory, containing all you want to display */
    	var set = r.set().push(
    	    /* custom objects go here */
    	    r.rect(n.point[0]-30, n.point[1]-13, 100, 25).attr({"fill": "#fd0", r : "12px", "stroke-width" : "1px" })).push(
    	    r.text(n.point[0]+15, n.point[1], (n.label || n.id)));
    	return set;
    };
    var renderNoExist = function(r, n) {//event doesn't exist at all: red
	/* the Raphael set is obligatory, containing all you want to display */
	var set = r.set().push(
	    /* custom objects go here */
	    r.rect(n.point[0]-30, n.point[1]-13, 100, 25).attr({"fill": "#f00", r : "12px", "stroke-width" : "1px" })).push(
	    r.text(n.point[0]+15, n.point[1], (n.label || n.id)));
	return set;
    };
    $.each(events, function(eventKey, event){
    	console.log('runs while using events', {eventKey, event});
    	for (var i = 0; i < event.choices.length; i++){
    	    var next = event.choices[i].next;
            var eventId = event.id;
    	    if (next) {
        		g.addNode(eventId, {render:renderFirst});
        		g.addNode(next, {render:renderGeneric});
        		g.addEdge(eventId, next, {directed:true});
    	    }
    	}
    });
    for (var eventId in g.nodes) {
    	var hasNext = false;
    	// Style events that do not exist at all.
    	if (!events[eventId]) {
    	    g.nodes[eventId].render = renderNoExist;
    	    continue;
    	}
    	// Find and style events that have no next event among its choices.
    	var event = events[eventId];
    	for (var i = 0; i < event.choices.length; i++){
    	    if (event.choices[i].next) {
        		hasNext = true;
        		break;
    	    }
    	}
    	if (!hasNext) {
    	    g.nodes[eventId].render = renderNoChoice;
    	}
    }

    var layouter = new Graph.Layout.Spring(g);
    layouter.layout();

    var renderer = new Graph.Renderer.Raphael('canvas', g, width, height);
    renderer.draw();

    redraw = function() {
    layouter.layout();
    renderer.draw();
    };
    hide = function(id) {
    g.nodes[id].hide();
    };
    show = function(id) {
    g.nodes[id].show();
    };
}

/* only do all this when document has finished loading (needed for RaphaelJS)
 * also wait a half second to ensure the wrapping iframe or any other browser
 * business is REALLY FINISHED
*/

window.onload = function(){
    setTimeout(displayGraph, 500)
}
