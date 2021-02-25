const IMAGES = 'images'
const LINES = 'lines'
var gID = 0;
var gIdxNow = 0;

var gImages = _createImages();
var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    selectedFillColor: 'wite',
    selectedLineColor: 'black',
    lines: [{
        txt: 'I never eat Falafel',
        size: 50,
        font: 'IMPACT',
        align: 'left',
        lineColor: 'black',
        fillColor: 'wite',
        idLine: 0,
        x: 0,
        y: 0
    }]
}



/////////////////update model functions/////////
function switchLine() {
    if (gMeme.selectedLineIdx + 1 === gMeme.lines.length) {
        gMeme.selectedLineIdx = 0;
    } else {
        gMeme.selectedLineIdx += 1;
    }
}

function updateFont(font) {
    var currLine = gMeme.selectedLineIdx;
    gMeme.lines[currLine].font = font;

}



function upateLineOnAdd() {
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    gMeme.selectedLineIdx++;
}

function updateLineColor(color) {
    gMeme.selectedLineColor = color;
    // console.log(gMeme.selectedLineColor)
    gMeme.lines[gMeme.selectedLineIdx].lineColor = color;
    // console.log(gMeme)
}

function updateFillColor(color) {
    gMeme.selectedFillColor = color;
    gMeme.lines[gMeme.selectedLineIdx].fillColor = color;
}

function updateFontSize(idEl) {
    // debugger

    // console.log('befor: ', gMeme)
    var lines = gMeme.lines;
    switch (idEl) {
        case 'increase-font':
            var idLine = gMeme.selectedLineIdx;
            var size = lines[idLine].size;
            size += 10;
            gMeme.lines[idLine].size = size

            break;
        case 'decrease-font':
            var idLine = gMeme.selectedLineIdx;
            var size = lines[idLine].size;
            size -= 10;
            gMeme.lines[idLine].size = size
            break;
    }
    // console.log('after: ', gMeme)
}

function updateImage(id) {
    gMeme.selectedImgId = id;
}

function updateAlign(selectedAlign) {
    var lineId = gMeme.selectedLineIdx;
    var align = gMeme.lines[lineId].align;
    switch (selectedAlign) {
        case 'align-left':
            align = 'left';
            break;
        case 'align-center':
            align = 'center';
            break;
        case 'align-right':
            align = 'right';
            break;
    }
    gMeme.lines[lineId].align = align;
}

function addLinePlace(id, xPos, yPos) {
    gMeme.lines[id].x = xPos;
    gMeme.lines[id].y = yPos;
}

function upateLinePlace(dirc) {
    // debugger
    var id = gMeme.selectedLineIdx;
    var LineHeigth = gMeme.lines[id].y;

    if (dirc === 'up') {
        LineHeigth -= 1
    } else {
        LineHeigth += 1
    }
    gMeme.lines[id].y = LineHeigth;

}


/////////////////get functions/////////////////

function getImageIdForDisplay() {
    return gMeme.selectedImgId;
}

function getImagesForDisplay() {
    return gImages;
}

function getLines(newTxt, canvasWidth, canvasHeigth) {

    var line;
    var lines = gMeme.lines;
    var currLine = gMeme.selectedLineIdx;

    if (lines[0].txt === 'I never eat Falafel') {
        line = creatLine(newTxt, currLine);
        lines[0] = line;

    } else if (lines[currLine]) {
        line = creatLine(newTxt, currLine, lines[currLine].size, lines[currLine].font, lines[currLine].align, lines[currLine].lineColor, lines[currLine].fillColor, lines[currLine].x, lines[currLine].y);
        lines[line.idLine] = line;
    } else {
        line = creatLine(newTxt, currLine);
        lines.push(line);
    }
    createTxtPos(canvasWidth, canvasHeigth);
    return lines;
}

function createTxtPos(canvasWidth, canvasHeigth) {
    var id = gMeme.selectedLineIdx;
    var xPos;
    var yPos;
    if (id === 0) {
        xPos = (canvasWidth) / 2; ////the middle
        yPos = 100;

    } else if (id === 1) {
        xPos = (canvasWidth) / 2;
        yPos = canvasHeigth - 100 + 50;
    } else {
        xPos = (canvasWidth) / 2;
        yPos = 25 + (canvasHeigth) / 2;
    }
    gMeme.lines[id].x = xPos;
    gMeme.lines[id].y = yPos;

}

function getBoxId() {
    return gMeme.selectedLineIdx;
}

function getFilter(searchKey) {
    var searchImgs = gImages.filter(function (image) {
        var keys = image.keywords;
        var isIn = keys.filter(function (word) {
            return word === searchKey
        })
        return isIn[0] === searchKey;
    });
    return searchImgs;
}

function getLinesToDraw() {
    return gMeme.lines;
}

/////////////////create functins///////////////////


function creatLine(newTxt, currLine, size = 50, font = 'IMPACT', align = 'left', lineColor = 'black', fillColor = 'white') {

    var lines = gMeme.lines;
    var line = {
        txt: newTxt,
        size: size,
        font: font,
        align: align,
        lineColor: lineColor,
        fillColor: fillColor,
        idLine: currLine
    }


    return line;
}



function _createImages() {
    var images = loadFromStorage(IMAGES);
    if (images) return images;
    var images = ['finger trump', 'kissing dogs', 'sleeping together', 'sleepy cat', 'baby win', 'explain', 'baby shoked', 'tell me more', 'evil baby', 'obama laughing', 'players kissing', 'what would you do', 'dicaprio cheers', 'mad man', 'explain angry man', 'embarrassed', 'putin v', 'baz lightyear']
        .map(imagName => _createImage(imagName))
    saveToStorage(IMAGES, images);
    console.log("images:", images)
    return images;
}

function _createImage(imagName) {
    gID++;
    return {
        id: gID,
        keywords: [imagName],
        url: `../meme-imgs/${gID}.jpg`
    }
}