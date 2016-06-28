var bot = new Bot()

$(function(){

    $( document ).keypress(function(event) {
        // event.preventDefault();
        if(event.which == 13){
            var statement = $( "#statement" ).val();
            var replyLength = $( "#replyLength" ).val();
            bot.addStatement(statement);
            var reply = bot.reply(replyLength);
            $( "#statement" ).val('');
            $( "#top" ).append("<tr><td class='statement'>" + statement + " </td></tr>")
            $( "#top" ).append("<tr><td class='reply'>" + reply + " </td></tr>")
            event.preventDefault();
        }

      });
});

function Bot(){
    this.dictionary = []
    this.nodes = [{"name":"I","group":2},
    {"name":"am","group":2}]
};

function Node(){
    this.first = ""
    this.last = ""
    this.isStarter = false
}

Bot.prototype.textToArray = function(text){
    var cleanText = text.replaceAll(",","").replaceAll('"',"").replaceAll('  ', " ");
    var array = cleanText.split(" ");
    return array;
}

Bot.prototype.addGraphInfo = function(node){
    var nodeText = node.first + " | " + node.last
    if (node.isStarter === true) {
        var group = 2
    }else{
        var group = 1
    }

    this.nodes.push({"name":nodeText,"group":group});

}



Bot.prototype.addStatement = function(text){
    var array = bot.textToArray(text);
    var isStarter = true

    while (array.length > 1){
        var newNode = new Node()


        newNode.first = array[0]
        newNode.last = array[1]
        newNode.isStarter = isStarter
        isStarter = false
        if (array[0].includes(".") || array[0].includes("?")){
            isStarter = true
        }
        this.addGraphInfo(newNode);
        this.dictionary.push(newNode);
        array.shift();
    }
    // console.log(this.dictionary)
}

Bot.prototype.reply = function(replyLength){
    var starter = [this.findStarter()]
    var nodes = this.gatherNodes(starter,replyLength - 1);    
    var reply = this.nodeToString(nodes)

    return reply;
}

Bot.prototype.findStarter = function(){
    var starterArray = [];

    for (var i = 0; i < this.dictionary.length; i++){
        if (this.dictionary[i].isStarter === true){
            starterArray.push(this.dictionary[i])
        }
    }
    return starterArray.randomValue();
}

Bot.prototype.nodeToString = function(nodes){
    var replyString = nodes[0].first + " " + nodes[0].last;
    nodes.shift();

    for (var i = 0; i < nodes.length; i++){
        var word = nodes[i].last;
        replyString = replyString + " " + word;
    }
    return replyString;
}

Bot.prototype.gatherNodes = function(starter,replyLength){
    var possibleNodes = [];
    var replyNodes = starter;

    while (replyNodes.length < replyLength){
        possibleNodes = this.findPossbileNodes(replyNodes[(replyNodes.length - 1)])
        var selectedNode = possibleNodes.randomValue();
        replyNodes.push(selectedNode)
    }
    return replyNodes
}

Bot.prototype.findPossbileNodes = function(previousNode){
    var first = previousNode.last;
    var resultArray = []

    for (var i = 0; i < this.dictionary.length; i++){
        if (this.dictionary[i].first === first){
            resultArray.push(this.dictionary[i])
        }
    }
    return resultArray;
};

Array.prototype.randomValue = function(){
    return this[Math.floor(Math.random() * this.length)]
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;

    return target.split(search).join(replacement);
};