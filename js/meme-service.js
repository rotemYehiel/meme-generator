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
    lines: []
}
/////////////////update model functions/////////

// new func************************

const wirtText = (gCtx, text, xPos, yPos, align, canvasWidth, canvasHeight) => {
    // console.log("xPos:", xPos, "yPos:", yPos, "align:", align)
    if (align === 'center') xPos = canvasWidth / 2;
    if (align === 'right') xPos = canvasWidth - 20;
    gCtx.textAlign = `${align}`
    gCtx.fillText(text, xPos, yPos)
    gCtx.strokeText(text, xPos, yPos)
}

const createNewLine = (textToAdd, canvasH) => {
    // console.log("textToAdd:", textToAdd)
    var lines = gMeme.lines;
    if (!lines.length) {
        const currIdx = 0;
        gMeme.selectedLineIdx = currIdx;
        var newLine = creatLine(textToAdd, currIdx)
        newLine = createTxtPos(newLine)
        lines.push(newLine);
    } else {
        const currIdx = gMeme.selectedLineIdx;
        const currLine = gMeme.lines.filter((line) => line.idLine === currIdx);
        if (currLine.length > 0) {
            console.log("update text in line:", currLine)
            gMeme.lines[currIdx].txt = textToAdd;
        } else {
            console.log("create new line")
            const currIdx = gMeme.selectedLineIdx;
            var newLine = creatLine(textToAdd, currIdx);
            newLine = createTxtPos(newLine, 0, 0, canvasH);
            lines.push(newLine);
        }
    }
    console.log("lines:", gMeme.lines)

}
function updateFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font;
}

const addNewLine = () => {
    const newLineIdx = (gMeme.lines.length - 1) + 1;
    gMeme.selectedLineIdx = newLineIdx;
    console.log("gmeme:", gMeme)
}
// ******************************


function switchLine() {
    if (gMeme.selectedLineIdx + 1 === gMeme.lines.length) {
        gMeme.selectedLineIdx = 0;
    } else {
        gMeme.selectedLineIdx += 1;
    }
}





// function upateCurrLineOnAdd() {
//     gMeme.selectedLineIdx = gMeme.lines.length - 1;
//     gMeme.selectedLineIdx++;
// }

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

    var lines = gMeme.lines;
    switch (idEl) {
        case 'increase-font':
            var idLine = gMeme.selectedLineIdx;
            var newSize = lines[idLine].size + 10;
            gMeme.lines[idLine].size = newSize
            break;
        case 'decrease-font':
            var idLine = gMeme.selectedLineIdx;
            var newSize = lines[idLine].size - 10;
            gMeme.lines[idLine].size = newSize
            break;
    }
    // console.log('after: ', gMeme)
}

function updateImage(id) {
    gMeme.selectedImgId = id;
}

function updateAlign(selectedAlign) {
    var lineId = gMeme.selectedLineIdx;
    var newAlign;
    switch (selectedAlign) {
        case 'align-left':
            newAlign = 'left'
            break;
        case 'align-center':
            newAlign = 'center';
            break;
        case 'align-right':
            newAlign = 'right';
            break;
    }
    gMeme.lines[lineId].align = newAlign;
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

const getLines = () => {
    return gMeme.lines;
}

function createTxtPos(line, x = 0, y = 0, canvasH) {
    const space = 20; ///dont forget to add this to the right when you add the text/box
    const fontSize = line.size;
    line.x = space + x;
    if (line.idLine === 1) {
        line.y = canvasH - fontSize;
    } else if (line.idLine > 1) {
        line.y = canvasH / 2;
    } else {
        line.y = space + fontSize;//50px is the font size+space
    }
    return line;

}

function getBoxId() {
    return gMeme.selectedLineIdx;
}

function getFilter(searchKey) {
    var searchImgs = gImages.filter((image) => {
        const arrOfKeyWords = image.keywords;
        const isExist = arrOfKeyWords.filter(keyword => keyword.includes(searchKey))
        return (isExist.length) ? image : '';
    })
    return searchImgs;
}

function getLinesToDraw() {
    return gMeme.lines;
}

/////////////////create functins///////////////////


function creatLine(newTxt, currLine, size = 50, font = 'IMPACT', align = 'left', lineColor = 'black', fillColor = 'white') {
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