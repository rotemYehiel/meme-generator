const IMAGES = 'images'
const LINES = 'lines'
var gID = 0;
var gIdxNow = 0;

var gImages = _createImages();
var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [{ txt: 'I never eat Falafel', size: 50, align: 'center', color: 'black', idLine: 0 }]
}






/////////////////update model functions/////////
function switchLine() {
    if (gMeme.selectedLineIdx + 1 === gMeme.lines.length) {
        gMeme.selectedLineIdx = 0;
    } else {
        gMeme.selectedLineIdx += 1;
    }
}

function upateLineOnAdd() {
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    gMeme.selectedLineIdx++;
}



function updateFont(idEl) {
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




/////////////////get functions/////////////////
function getImageIdForDisplay() {
    return gMeme.selectedImgId;
}

function getImagesForDisplay() {
    return gImages;
}

function getLines(newTxt) {

    var line;
    var lines = gMeme.lines;
    var currLine = gMeme.selectedLineIdx;

    if (lines[0].txt === 'I never eat Falafel') {
        line = creatLine(newTxt, currLine);
        lines[0] = line;
    } else if (lines[currLine]) {
        line = creatLine(newTxt, currLine, lines[currLine].size, lines[currLine].align, lines[currLine].color);
        lines[line.idLine] = line;
    } else {
        line = creatLine(newTxt, currLine);
        lines.push(line);
    }
    return lines;
}




/////////////////create functins///////////////////
function creatLine(newTxt, currLine, size = 50, align = 'center', color = 'black') {
    console.log('curr: ', gMeme.lines)
    var lines = gMeme.lines;
    var line = {
        txt: newTxt,
        size: size,
        align: align,
        color: color,
        idLine: currLine
    }


    return line;
}



function _createImages() {
    var images = loadFromStorage(IMAGES);
    if (images) return images;

    var images = ['finger trump', 'kissing doges', 'sleeping together', 'sleepy cat', 'baby win', 'explain', 'baby shoked', 'tell me more', 'evil baby', 'obama laughing', 'players kissing', 'what would you do', 'dicaprio cheers', 'mad man', 'explain angry man', 'embarrassed', 'putin v', 'baz lightyear']
        .map(imagName => _createImage(imagName))
    saveToStorage(IMAGES, images);

    return images;
}

function _createImage(imagName) {
    gID++;
    return {
        id: gID,
        keywords: [imagName],
        url: `meme-imgs/${gID}.jpg`
    }
}