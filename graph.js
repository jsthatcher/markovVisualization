
// create an array with nodes
var nodes = new vis.DataSet([
	{id:1,label:"fuck"},
	{id:2,label:"fuck"},
	{id:3,label:"fuck"},
	{id:4,label:"fuck"},]
	);

// create an array with edges
var edges = new vis.DataSet([]);

// create a network
var container = document.getElementById('mynetwork');

// provide the data in the vis format
var data = {
    nodes: nodes,
    edges: edges
};
var options = {};

// initialize your network!
var network = new vis.Network(container, data, options);