var textStrip = ['1','2','3','4','5','6','7','8','9','0','a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

var stripCount = 150;
var xLine = new Array()
var yLine = new Array()
var dY = new Array()
var stripFontSize = new Array();

for (var i = 0; i < stripCount; i++) {
    xLine[i] = Math.floor(Math.random()*1000);
    yLine[i] = -128;
    dY[i] = Math.floor(Math.random()*10^5)*10;
    stripFontSize[i] = Math.floor(Math.random()*24);
}

var theColors = ['#90EE90', '#98FB98', '#98FB98', '#98FB98', '#808000', '#556B2F'];

var matrix, context, timer;

function drawLine(x, y) {
    for (var k = 0; k <= 20; k++) {
        var randChar = textStrip[Math.floor(Math.random()*textStrip.length)];
        if (context.fillText) {
            switch (k) {
            case 1:
                context.fillStyle = theColors[0]; break;
            case 4:
                context.fillStyle = theColors[1]; break;
            case 8:
                context.fillStyle = theColors[2]; break;
            case 12:
                context.fillStyle = theColors[3]; break;
            case 16:
                context.fillStyle = theColors[4]; break;
            case 19:
                context.fillStyle = theColors[5]; break;
            }
            context.fillText(randChar, x, y);
        }
        y -= stripFontSize[k];
    }
}

function draw() {

    //clear the page and set the properties 
    context.clearRect(0, 0, matrix.width, matrix.height);
    context.shadowBlur = 4;
    context.shadowColor = '#FFF';

    //draw the maxtrix lines
    for (var j = 0; j < stripCount; j++) {
        context.font = stripFontSize[j]+'arial';

        //draw if the yLine is correct
        if (yLine[j] > 1400) {
            xLine[j] = Math.floor(Math.random()*matrix.width);
            yLine[j] = -1;
            dY[j] = Math.floor(Math.random()*7);
            stripFontSize[j] = Math.floor(Math.random()*24);
            drawLine(xLine[j], yLine[j]);
        } else drawLine(xLine[j], yLine[j]);
        
        yLine[j] += dY[j];
    }

}

function init() {
    // get canvas
    matrix = document.getElementById('theMatrix');
    if (!matrix || !matrix.getContext) return;
    
    //get context
    context = matrix.getContext('2d');
    if (!context) return;
    
    //set the interval 8fps
    timer = setInterval('draw()', 1/8);
}