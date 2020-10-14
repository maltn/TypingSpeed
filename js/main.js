var currentWord = 1

var keystrokes = 0
var hasTimeStarted = false;
var timeStart;
var timeCurrent;
var calc;

var spanofWords = []

//If current height is different from previous then change row :)

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

    var tempo = ""
    var tempString = ""
    var textarea = document.getElementById("textShow")
    for (let i = 0; i < 1000; i++) {
        var span = document.createElement("span")
        var x = Math.floor(Math.random() * words.length)
        tempString += words[x]
        if(i < 100){
            tempo += words[x] + " "
        }
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
}

function enter(){
    var input = document.getElementById("inputA")
    input.onkeypress = function(e){
        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == 32){
            if(input.length > 2){
                keystrokes += 1
            }

            wordDelete()
            wordCheck()
            inputHandler()
            return false;

        }
    }
}

function wordDelete(){
    if(currentWord > 1){
        if((document.getElementById("word"+ (currentWord - 1)).offsetTop - document.getElementById("word"+ (currentWord)).offsetTop) != 0){
            for (let i = 0; i < currentWord; i++) {
                document.getElementById("word"+ (i)).style.display = "none"
            }
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
                
                //för långsamt den hinner göra backspacen innan
                if(inputField.value[inputField.value.length - 1] === document.getElementById("word"+(currentWord-1)).innerHTML[inputField.value.length - 1]){
                    console.log(inputField.value[0]);
                    keystrokes += 1
                }
                break
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


var cookieInputOnce = false
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
            if(cookieInputOnce == false){
                cookieInputOnce = true
                
                const wpmCalc = Math.ceil((keystrokes/5) / ((timeCurrent / 1000) / 60))
                if(getCookie("wpmList") == ""){
                    console.log("cookie created");
                    document.cookie = "wpmList = " + '["' + wpmCalc + '"]' + "; max-age=" + 5*365*24*60*60
                }
                else{
                    var a = []
                    for(let i = 0; i < JSON.parse(getCookie("wpmList")).length; i++){
                        a.push(String(JSON.parse(getCookie("wpmList"))[i]))
                    }
                    console.log(a);
                    a.push(String(wpmCalc))
                    console.log(a);
                    document.cookie = "wpmList = " + JSON.stringify(a) + "; max-age=" + 5*365*24*60*60
                }
                graph()
            }
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
        
        calc = Math.ceil((keystrokes/5) / ((timeCurrent / 1000) / 60))
        wpmCounter.innerText = calc + " WPM"
    }, 100);
}


//Graphing chartjs library

function drawGraph(d){
    try {
        document.getElementById("historyChart").remove()
    }catch{}
    var div = document.createElement("DIV")
    div.setAttribute("id","historyChart")
    document.body.appendChild(div)

    var div2 = document.createElement("DIV")
    div2.setAttribute("class","ct-chart ct-perfect-fourth")
    div.appendChild(div2)

    var clearBttn = document.createElement("button")
    clearBttn.setAttribute("id","clearGraph")
    clearBttn.style.position = "absolute"
    clearBttn.style.right = "-1px"
    clearBttn.style.bottom = "-1px"
    clearBttn.style.width = "3vw"
    clearBttn.style.height = "2vh"
    clearBttn.style.border = "1px solid black"
    clearBttn.style.backgroundColor = "rgb(17,17,17)"
    clearBttn.style.fontSize = "10px";
    clearBttn.style.letterSpacing = "1px"
    clearBttn.style.color = "rgb(70,70,70)"
    clearBttn.style.outline = "none"
    clearBttn.innerHTML = "CLEAR"
    clearBttn.setAttribute("onclick", "drawGraph(1)")
    div.appendChild(clearBttn)

    var exportBttn = document.createElement("button")
    exportBttn.setAttribute("id","exportGraph")
    exportBttn.style.position = "absolute"
    exportBttn.style.right = "56px"
    exportBttn.style.bottom = "-1px"
    exportBttn.style.width = "3vw"
    exportBttn.style.height = "2vh"
    exportBttn.style.border = "1px solid black"
    exportBttn.style.backgroundColor = "rgb(17,17,17)"
    exportBttn.style.fontSize = "10px";
    exportBttn.style.letterSpacing = "1px"
    exportBttn.style.color = "rgb(70,70,70)"
    exportBttn.style.outline = "none"
    exportBttn.innerHTML = "EXPORT"

    div.appendChild(exportBttn)

    if(d == 1){
        if(confirm("You are about to clear all your past WPM data. Are you sure?")){
            document.cookie = "wpmList = []"
        }else{

        }
    }

    var lastSpeed = JSON.parse(getCookie("wpmList"))
    var data = {
        // A labels array that can contain any sort of values
        labels: "",
        // Our series array that contains series objects or in this case series data arrays
        series: [lastSpeed]
    };
      
    // As options we currently only set a static size of 300x200 px. We can also omit this and use aspect ratio containers
    // as you saw in the previous example
    var options = {
        width: "40vw",
        height: "39vh",
        low: 0,
        high: Math.max(lastSpeed)
    };
      
    // Create a new line chart object where as first parameter we pass in a selector
    // that is resolving to our chart container element. The Second parameter
    // is the actual data object. As a third parameter we pass in our custom options.
    new Chartist.Line('.ct-chart', data, options);
}

function drawStats(){
    var div = document.createElement("DIV")
    div.setAttribute("id","statsContainer")
    document.body.appendChild(div)

    var p = document.createElement("p")
    p.innerHTML = "Stats coming soon =)"
    div.appendChild(p)
}

function drawSettings(x){
    if(x == 0){
        var div = document.createElement("DIV")
        div.setAttribute("id","settingsContainer")
        document.body.appendChild(div)
    
        var div1 = document.createElement("DIV")
        div1.setAttribute("id","settingsItemWrapper")
        div.appendChild(div1)
    
        for(var i = 0; i < 3; i++){
            var div2 = document.createElement("DIV")
            div2.setAttribute("class","settingsMenuItem")
            div2.setAttribute("onclick","drawSettings(this)")
    
            if(i == 0){
                div2.style.backgroundColor = "rgb(30,30,30)"
                div2.innerHTML = "Language"
            }else if(i == 1){
                div2.innerHTML = "Text"
            }else{
                div2.innerHTML = "Themes"
            }
            div1.appendChild(div2)
        }
    }else{
        for (let i = 0; i < document.getElementsByClassName("settingsMenuItem").length; i++) {
            document.getElementsByClassName("settingsMenuItem")[i].style.backgroundColor = "rgb(17,17,17)"
        }

        console.log(x);
        x.style.backgroundColor = "rgb(30,30,30)"
        console.log(x);
    }
}

//tab management

function tabManager(elem){
    for (var i = 0; i < document.getElementsByClassName("TabItem").length; i++) {
        document.getElementsByClassName("TabItem")[i].style.backgroundColor = "rgb(17,17,17)"
    }

    try {
        document.getElementById("historyChart").remove()
    }catch{}
    try {
        document.getElementById("statsContainer").remove()   
    }catch{}
    try {
        document.getElementById("settingsContainer").remove()   
    }catch{}

    elem.style.backgroundColor = "rgb(30,30,30)"

    if(elem.innerHTML == "Main"){
    }else if(elem.innerHTML == "Graph"){
        drawGraph(0)
        $("#historyChart").show()
    }else if(elem.innerHTML == "Stats"){
        drawStats()
    }else if(elem.innerHTML == "Settings"){
        drawSettings(0)
    }
}
