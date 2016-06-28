var bot = new Bot()

$(function(){

$( document ).keypress(function(event) {
    // event.preventDefault();
    if(event.which == 13){
        var statement = $( "input" ).val();
        bot.addStatement(statement);
        var reply = bot.reply();
        $( "input" ).val('');
        $( "#top" ).append("<tr><td class='statement'>" + statement + " </td></tr>")
        $( "#top" ).append("<tr><td class='reply'>" + reply + " </td></tr>")
        event.preventDefault();
    }

  });
});

function Bot(){
    this.dictionary = []
};

function Node(){
    this.first = ""
    this.last = ""
    this.isStarter = false
}

Bot.prototype.addStatement = function(text){
    var cleanText = text.replaceAll(",","").replaceAll('"',"");
    var array = cleanText.split(" ");

    while (array.length > 1){
        var newNode = new Node()
        newNode.first = array[0]
        newNode.last = array[1]

        this.dictionary.push(newNode);
        array.shift();
    }
    // console.log(this.dictionary)
}

Bot.prototype.reply = function(){
    var reply = [this.dictionary[0]];
    replyLength = 5;

    var nodes = this.gatherNodes(reply,replyLength - 1);

    // console.log(nodes)
    
    var reply = this.nodeToString(nodes)
    
    console.log(reply);

    return reply;
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
        var selectedNode = possibleNodes[Math.floor(Math.random() * possibleNodes.length)]
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
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};