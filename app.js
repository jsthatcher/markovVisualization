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
    this.firstString = ""
    this.lastString = ""
    this.isStarter = false
    this.probability = 1.0
    this.count = 1
}

Bot.prototype.textToArray = function(text){
    var cleanText = text.replaceAll(",","").replaceAll('"',"").replaceAll('  ', " ");
    var array = cleanText.split(" ");
    return array;
}


Bot.prototype.addStatement = function(text){
    var array = bot.textToArray(text);
    var isStarter = true

    while (array.length > 1){

        var newNode = new Node()


        newNode.firstString = array[0]
        newNode.lastString = array[1]
        newNode.isStarter = isStarter
        newNode.probability = this.findProbability(newNode)

        isStarter = (array[0].includes(".") || array[0].includes("?"))


        if (this.isPresent(array[0],array[1])){
            this.addCount(array[0],array[1])
        }else{
            this.dictionary.push(newNode);
        }

        
        array.shift();
    }
    // console.log(this.dictionary)
}

Bot.prototype.isPresent = function(firstString,lastString){
    for (var i in this.dictionary){
        if (this.dictionary[i].firstString === firstString && this.dictionary[i].lastString === lastString){
            return true;
        }
    }
    return false;
}

Bot.prototype.addCount = function(firstString,lastString){
    for (var i in this.dictionary){
        if (this.dictionary[i].firstString === firstString && this.dictionary[i].lastString === lastString){
            this.dictionary[i].count += 1
        }
    }
}



Bot.prototype.findProbability = function(node){
    var totalCount = 0
    var probability = 1

    var nodeArray = this.findPossbileNodes(node);
    if (nodeArray.length === 0){
        return 1.0;
    }else{
        for (var i = 0; i < nodeArray.length; i++) {
            totalCount += nodeArray[i].count;
        }
        probability = node.count/totalCount;
    }

    return probability
}

Bot.prototype.reply = function(replyLength){
    var starter = this.findStarter()
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
    var replyString = nodes[0].firstString + " " + nodes[0].lastString;
    nodes.shift();

    for (var i = 0; i < nodes.length; i++){
        var word = nodes[i].lastString;
        replyString = replyString + " " + word;
    }
    return replyString;
}

Bot.prototype.gatherNodes = function(starter,replyLength){
    var possibleNodes = [];
    var replyNodes = [starter];

    while (replyNodes.length < replyLength){
        console.log(replyNodes[(replyNodes.length - 1)])
        possibleNodes = this.findPossbileNodes(replyNodes[(replyNodes.length - 1)])
        var selectedNode = possibleNodes.randomValue();
        var fuck = this.selectNode(possibleNodes);
        replyNodes.push(selectedNode)
    }
    return replyNodes
}

Bot.prototype.selectNode = function(nodeArray){
    var totalCount = 0
    var counter = 0

    for (var i = 0; i < nodeArray.length; i++){
        totalCount += nodeArray[i].count;
    }
    var randomValue = Math.random() * totalCount

    for (var i = 0; i < nodeArray.length; i++){
        counter += nodeArray[i].count;
        if (counter > randomValue){
            return nodeArray[i];
        }
    }

    console.log("you should not be here (selectNode")
}

Bot.prototype.findPossbileNodes = function(previousNode){
    var firstString = previousNode.lastString;
    var resultArray = []

    for (var i = 0; i < this.dictionary.length; i++){
        if (this.dictionary[i].firstString === firstString){
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


// Bot.prototype.addGraphInfo = function(node){
//     var nodeText = node.firstString + " | " + node.lastString
//     if (node.isStarter === true) {
//         var group = 2
//     }else{
//         var group = 1
//     }

//     this.nodes.push({"name":nodeText,"group":group});
// }