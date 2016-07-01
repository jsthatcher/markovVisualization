
// create an array with nodes
var nodes = new vis.DataSet([]);

// create an array with edges
var edges = new vis.DataSet([]);

// create a network
var container = document.getElementById('mynetwork');

// provide the data in the vis format
var data = {
    nodes: nodes,
    edges: edges
};
var options = {
	autoResize: true,
	hierarchical: {
      enabled:false,
      levelSeparation: 150,
      nodeSpacing: 300,
      treeSpacing: 200,
      blockShifting: true,
      edgeMinimization: true,
      parentCentralization: true
    }
};

// initialize your network!
var network = new vis.Network(container, data, options);