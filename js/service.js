const KEY = 'images'
const LINES = 'lines'
    // const BOOKS_IN_PAGE = 2;
var gID = 0;
var gIdxNow = 0;
// var gCurrBookID;
// var gCurrPage = 1;
var glines = [];
var gImages = _createImages();


function getLines(newTxt) {
    console.log('vvv', newTxt)
        // debugger

    if (!loadFromStorage(LINES)) {
        gIdxNow++;
        // var lines = loadFromStorage(LINES);
        var line = creatLine(newTxt, gIdxNow);
        glines.push(line);
        saveToStorage(LINES, glines);
        // console.log('what r u save??', glines)
    } else {
        var line = creatLine(newTxt, gIdxNow);
        glines[0] = line;
        saveToStorage(LINES, glines);
    }
    return glines;
}

function creatLine(newTxt, idxN) {
    var line = {
        txt: newTxt,
        size: 20,
        align: 'left',
        color: 'red',
        idx: idxN
    }


    return line;
}

function getImagesForDisplay() {

    // var from = (gCurrPage - 1) * BOOKS_IN_PAGE;
    // var to = from + BOOKS_IN_PAGE;
    // return gBooks.slice(from, to);
    return gImages;
}


function _createImages() {
    var images = loadFromStorage(KEY);
    if (images) return images;

    var images = ['finger trump', 'kissing doges', 'sleeping together', 'sleepy cat', 'baby win', 'explain', 'baby shoked', 'tell me more', 'evil baby', 'obama laughing', 'players kissing', 'what would you do', 'dicaprio cheers', 'mad man', 'explain angry man', 'embarrassed', 'putin v', 'baz lightyear']
        .map(imagName => _createImage(imagName))
    saveToStorage(KEY, images);
    // console.log('images:', images)

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