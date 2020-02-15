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
    lines: [{ txt: 'I never eat Falafel', size: 50, font: 'IMPACT', align: 'left', lineColor: 'black', fillColor: 'wite', idLine: 0, box: 'txt-box1' }]
}
var gtxtBoxs = [];





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

function updateTxtBox(currBox) {
    var currLine = gMeme.selectedLineIdx;
    gMeme.lines[currLine].box = currBox;
    // console.log(gMeme)

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




/////////////////get functions/////////////////
function getBox(id) {
    var nowBox = gtxtBoxs.filter(function(box) {
        return box.boxId === id;
    })
    return nowBox[0];

}

function getBoxs(elTxtBox) {
    var boxId = elTxtBox.id;
    var isExistBox = gtxtBoxs.filter(function(box) {
        return box.boxId === boxId;
    })
    if (isExistBox[0]) return gtxtBoxs;
    var newBox = createBox(elTxtBox);
    gtxtBoxs.push(newBox);
    return gtxtBoxs;

}

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
        line = creatLine(newTxt, currLine, lines[currLine].size, lines[currLine].font, lines[currLine].align, lines[currLine].lineColor, lines[currLine].fillColor, lines[currLine].box);
        lines[line.idLine] = line;
    } else {
        line = creatLine(newTxt, currLine);
        lines.push(line);
    }
    return lines;
}

function getBoxId() {
    return gMeme.selectedLineIdx;
}

function getFilter(searchKey) {
    var searchImgs = gImages.filter(function(image) {
        return image.keywords === searchKey;
    });
    return searchImgs;

}

/////////////////create functins///////////////////
function createBox(elTxtBox) {

    var box = {
        boxId: elTxtBox.id,
        xStart: elTxtBox.offsetLeft,
        yStart: elTxtBox.offsetTop,
        xEnd: elTxtBox.offsetLeft + elTxtBox.offsetWidth,
        yEnd: elTxtBox.offsetTop + elTxtBox.offsetHeight
    }
    return box;

}

function creatLine(newTxt, currLine, size = 50, font = 'IMPACT', align = 'left', lineColor = 'black', fillColor = 'white', box = 'txt-box1') {
    // console.log('curr: ', gMeme.lines)
    var lines = gMeme.lines;
    var line = {
        txt: newTxt,
        size: size,
        font: font,
        align: align,
        lineColor: lineColor,
        fillColor: fillColor,
        box: box,
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