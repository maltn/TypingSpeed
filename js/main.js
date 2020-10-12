var currentWord = 1

var keystrokes = 0
var hasTimeStarted = false;
var timeStart;
var timeCurrent;
var calc;

var spanofWords = []

//Lowest 39 highest 43

function requestWordList(){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://gist.githubusercontent.com/deekayen/4148741/raw/98d35708fa344717d8eee15d11987de6c8e26d7d/1-1000.txt', true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            generateWords(request.responseText)
        }
    }
}

function generateWords(words) {
    words = words.split("\n")
    var tempI = words.length
    while(tempI--){
        if(words[tempI].length < 3){
            words.splice(tempI, 1)
        }else if(words[tempI].length > 10){
            words.splice(tempI, 1)
        }
    }

    var tempo = []
    var tempString = ""
    var textarea = document.getElementById("textShow")
    for (let i = 0; i < 100; i++) {
        var span = document.createElement("span")
        var x = Math.floor(Math.random() * words.length)
        tempString += words[x]
        tempo.push(words[x])
        span.innerText = tempString;
        tempString = ""
        span.setAttribute("id","word"+i)

        span.style = "margin-right: 10px;"
        if(i == 0){
            span.setAttribute("class","currentWord");
        }
        spanofWords.push(span)
        textarea.appendChild(span)
    }

    setInterval(() => {
        var penis = ""
        for (let j = 0; j < 9; j++) {
            if(penis.length + tempo[j].length <= 37){
                penis += tempo[j]
            }
            else if(penis.length + tempo[j].length >= 43){
                break
            }else{
                penis += tempo[j]
            }
        }
        console.log(penis);
        console.log(penis.length);
        console.log(window.innerWidth);
    }, 100);
}
function enter(){
    document.getElementById("inputA").onkeypress = function(e){
        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == 32){
            wordCheck()
            inputHandler()
            return false;

        }
    }
}


//after space pressed word check
function wordCheck(){
    var inp = document.getElementById("inputA")

    if(inp.value == document.getElementById("word" + (currentWord - 1)).innerText){
        document.getElementById("word"+ (currentWord - 1)).setAttribute("class","correct")
    }else if(inp.value != document.getElementById("word" + (currentWord - 1)).innerText) {
        document.getElementById("word"+ (currentWord - 1)).setAttribute("class","wrong")
    }
}


var keys = ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "KeyÅ", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "KeyÖ", "KeyÄ", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "ShiftLeft", "ShiftRight"]
function keystroke(e)
{
    var inputField = document.getElementById("inputA")

    if(document.activeElement == inputField){
        for (let i = 0; i < keys.length; i++) {
            if(e.code == keys[i]){
                if(hasTimeStarted == false){
                    timer()
                    hasTimeStarted = true;
                    updateWPM()
                }
      
                if(inputField.value != document.getElementById("word"+(currentWord-1)).innerText.substring(0,inputField.value.length)){
                }else{
                    keystrokes += 1
                }
            }
        }
    }
}

function valueUpdate(){
    document.getElementById("inputA").oninput = function(e){
        var inp = document.getElementById("inputA")        
        if(inp.value != document.getElementById("word"+(currentWord-1)).innerText.substring(0,inp.value.length)){
            document.getElementById("word"+(currentWord-1)).setAttribute("class","wrong")
        }else{

            document.getElementById("word"+(currentWord-1)).setAttribute("class","currentWord")
        }
    }    
}

function inputHandler(){
    document.getElementById("inputA").value = ""
    document.getElementById("word"+currentWord).setAttribute("class","currentWord")
    currentWord += 1;
}


document.onkeyup = keystroke;

function timer(){
    var x = 60
    timeStart = new Date().getTime()
    setInterval(() => {
        timeCurrent = new Date().getTime() - timeStart;


        var timeCounter = document.getElementById("timeCounter")
        if(x - Math.floor(timeCurrent / 1000) > 59){
            timeCounter.innerText = "1:00";
        }else {
            timeCounter.innerText = "0:" + (x - Math.floor(timeCurrent / 1000).toString());
        }

        //time is over show result screen here
        if((x - Math.floor(timeCurrent / 1000)) == 0){
        }

        
        try {
            var bodyRect = document.body.getBoundingClientRect(),
            elemRect = document.getElementsByClassName("currentWord")[0].getBoundingClientRect(),
            offset   = elemRect.top - bodyRect.top;

            var lc = Math.floor((offset / window.innerHeight) * 10) / 10
            if(lc >= 0.5){
                for (let i = 0; i < spanofWords[currentWord]; i++) {
                    print(spanofWords[i])
                }
            }else{
                //??? dont remember
                //console.log(lc)
            }
        } catch (error) {
            
        }
    }, 0);
}

function updateWPM(){
    setInterval(() => {
        var wpmCounter = document.getElementById("wpmCounter")
        
        calc = Math.floor((keystrokes/5) / (Math.ceil((timeCurrent / 1000 / 60) * 100) / 100))
        wpmCounter.innerText = calc + " WPM"
    }, 100);
}