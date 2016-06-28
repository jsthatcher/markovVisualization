

var width = 960,
    height = 500;

var color = d3.scale.category20();



var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);






var graph = {
    "nodes": [],
    "links": []
};


var nodes = bot.nodes,
    links = graph.links;


var force = d3.layout.force()
    .size([width, height])
    .nodes(nodes)
    .links(links)
    .charge(-120)
    .linkDistance(300);





svg.append("svg:defs").selectAll("marker")
    .data(["end"])      // Different link/path types can be defined here
  .enter().append("svg:marker")    // This section adds in the arrows
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", -1.5)
    .attr("markerWidth", 15)
    .attr("markerHeight", 15)
    .attr("orient", "auto")
  .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");



var link = svg.selectAll('.link')
    .data(links)
    .enter().append('line')
    .style("stroke", "black")
    .attr("marker-end", "url(#end)");



  var node = svg.selectAll(".node")
      .data(nodes)
    .enter().append("g")
      .attr("class", "node")
      .call(force.drag);

      node.append('circle')
    .attr('class', 'node')
    .attr("r", function(d) { return d.group*10 })
    .style("fill", function(d) { return color(d.group); }).append("text")
     .text(function(d) {
       return d.name;
      });

     node.append("text")
     .text(function(d) {
       return d.name;
      })
     .attr("dx", function(d){return -20});

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });


force.on('end', function() {



});



force.start();

d3.select("body")
    .on("keydown", function() {
    	if (d3.event.keyCode === 13){
    		force.start();
    	}
    });
