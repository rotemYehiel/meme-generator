var gCanvas;
var gCtx;


function onInit() {
    // drawImg();
    renderImages();
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')

}


function renderImages(imgs = getImagesForDisplay()) {
    var strHTMLs = imgs.map(function (image) {
        return `
        <img onclick="onImageClicked(${image.id})" class="img-${image.id} images" src=${image.url} />`
    });
    var elImagesGrid = document.querySelector('.gallery-grid');
    elImagesGrid.innerHTML = strHTMLs.join('');

}

function renderCanvas() {
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
}

function renderTextBox() {
    var boxId = getBoxId();
    var htmlDiv = `<div class="txt-box${boxId} txt-box" id="txt-box${boxId}"></div>`;
    document.querySelector('.txt-box-container').innerHTML = htmlDiv;
    updateTxtBox(`txt-box${boxId}`);
    return document.querySelector(`#txt-box${boxId}`)
}

/////////////////////////////events/////////////////////////////

const onSearchImage = () => {
    const searchInput = document.querySelector('#search').value;
    const imgs = getFilter(searchInput);
    renderImages(imgs);
}
const searchInputEl = document.querySelector('#search');
searchInputEl.addEventListener('input', onSearchImage);


function onGoUp() {
    upateLinePlace('up');
    onAddText();
}

function onGoDown() {
    upateLinePlace('down');
    onAddText();

}

function onChageFont(value) {
    updateFont(value);
    onAddText();
}

function increaseFont(idEl) {
    updateFontSize(idEl);
    onAddText();

}

function decreaseFont(idEl) {
    updateFontSize(idEl);
    onAddText();
}
function onAlignCenterClicked(elId) {
    updateAlign(elId);
    onAddText();
}
function onAlignRightClicked(elId) {
    updateAlign(elId);
    onAddText();
}
function onAlignLeftClicked(elId) {
    updateAlign(elId);
    onAddText();
}
function onPalleteClicked() {
    openOrCloseModal();
}
function onFillColor() {
    var color = document.querySelector('#fill-color').value;
    updateFillColor(color);
    onAddText();
}

function onLineColor() {
    var color = document.querySelector('#line-color').value;
    updateLineColor(color);
    onAddText();
}
function onImageClicked(imageId) {
    document.querySelector('#gallery').classList.add('hide');
    document.querySelector('#canvas-panel').classList.remove('hide');
    document.querySelector('#on-gallery').classList.remove('active');
    document.querySelector('.about').classList.add('hide');
    drawImg(imageId);
}
function onDeliteClicked() {
    var id = getImageIdForDisplay();
    clearInputVal();
    drawImg(id);
}

const clearInputVal = () => {
    document.body.querySelector('.txt-input').value = null;
}
// function toggleMenu() {
//     var mainMenu = document.getElementById('mainMenu');
//     mainMenu.classList.toggle('open');
// }

function onAddNewLine() {
    clearInputVal();
    const id = addNewLine();
    // upateCurrLineOnAdd();
    // onAddText(id);

}

// function onGoNextLine() {
//     switchLine();
// }









// function onGoAbout(elBtn) {
//     if (elBtn.classList.contains('active')) return;
//     elBtn.classList.add('active');
//     document.querySelector('#on-gallery').classList.remove('active');
//     document.querySelector('#gallery').classList.add('hide');
//     document.querySelector('#canvas-panel').classList.add('hide');
//     document.querySelector('.about').classList.remove('hide');
//     document.querySelector('main').style.background = 'white';
// }

// function onGoGallery(elBtn) {
//     if (elBtn.classList.contains('active')) return;
//     elBtn.classList.add('active');
//     document.querySelector('#on-about').classList.remove('active');
//     document.querySelector('#gallery').classList.remove('hide');
//     document.querySelector('#canvas-panel').classList.add('hide');
// }





function onCloseModalClicked() {
    openOrCloseModal();
}

function openOrCloseModal() {
    var elModal = document.querySelector('.colors-modal');
    if (elModal.classList.contains('hide')) {
        elModal.classList.remove('hide')
    } else {
        elModal.classList.add('hide')
    }
}

/////////////////////////////canvas place//////////////////////////////////

function drawImg(id) {
    updateImage(id);
    var imgIdToDraw = getImageIdForDisplay();
    var img = new Image()
    img.src = `meme-imgs/${imgIdToDraw}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}

//not a clear name
function onAddText() {

    renderCanvas();
    var canvasW = document.getElementById('my-canvas').offsetWidth;
    var canvasH = document.getElementById('my-canvas').offsetHeight;

    var textToAdd = document.querySelector('#txt').value;
    createNewLine(textToAdd, canvasH)
    const lines = getLines();
    // console.log(lines)

    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')

    var imgIdToDraw = getImageIdForDisplay();
    var img = new Image()
    img.src = `meme-imgs/${imgIdToDraw}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        drawText(lines, gCanvas.width, gCanvas.height);
    }
}

function drawImage(img, x, y) {
    gCtx.drawImage(img, x, y);
}

function drawText(lines, canvasWidth, canvasHeight) {
    lines.forEach(line => {
        var xPos = line.x;
        var yPos = line.y;
        // const rectWidth = document.getElementById('my-canvas').width - 30
        // drawRect(xPos, yPos, line.txt, line.size, line.align);

        // hello im rotem fullstack developer

        // console.log("xPos:", xPos, " yPos:", yPos, "line.idLine:", line.idLine)
        // addLinePlace(line.idLine, xPos, yPos);

        gCtx.strokeStyle = `${line.lineColor}`;
        gCtx.fillStyle = `${line.fillColor}`;
        gCtx.font = `${line.size}px ${line.font}`;
        const textWidth = gCtx.measureText(line.txt).width;
        // console.log("textWidth:", textWidth);
        if (!loadFromStorage('idx1')) saveToStorage('idx1', 0)
        if (!loadFromStorage('idx2')) saveToStorage('idx2', 0)
        if (textWidth >= canvasWidth - 30) {
            if (loadFromStorage('idx1') === 0) saveToStorage('idx1', line.txt.length - 1)
            if (textWidth >= (canvasWidth - 30) * 2) {
                if (loadFromStorage('idx2') === 0) saveToStorage('idx2', line.txt.length - 1)
                line.txt = line.txt.substring(0, loadFromStorage('idx2'))
                alert("text is too long...")
            } else {
                removeFromStorage('idx2')
            }
            const idx = loadFromStorage('idx1');
            const a = line.txt.slice(0, idx)
            const b = line.txt.slice(idx, line.txt.length)
            wirtText(gCtx, a, xPos, yPos, line.align, canvasWidth, canvasHeight)
            wirtText(gCtx, b, xPos, yPos + 50, line.align, canvasWidth, canvasHeight)
        } else {
            removeFromStorage('idx1')
            removeFromStorage('idx2')
            wirtText(gCtx, line.txt, xPos, yPos, line.align, canvasWidth, canvasHeight)
        }
        // console.log("gCtx:", gCtx)




        //     wirtText(gCtx, b, xPos, yPos + 50, line.align)
        // if (!loadFromStorage('idx')) saveToStorage('idx', 0)
        // if (!loadFromStorage('idx2')) saveToStorage('idx2', 0)
        // if (textWidth >= canvasWidth - 30) {
        //     if (loadFromStorage('idx') === 0) {
        //         saveToStorage('idx', line.txt.length - 1)
        //     }
        //     if (textWidth >= (canvasWidth - 30) * 2) {
        //         if (loadFromStorage('idx2') === 0) saveToStorage('idx2', line.txt.length - 1)
        //         line.txt = line.txt.substring(0, loadFromStorage('idx2'))
        //     }
        //     const idx = loadFromStorage('idx');
        //     const a = line.txt.slice(0, idx)
        //     const b = line.txt.slice(idx, line.txt.length)
        //     wirtText(gCtx, a, xPos, yPos, line.align)
        //     wirtText(gCtx, b, xPos, yPos + 50, line.align)
        // } else {
        //     wirtText(gCtx, line.txt, xPos, yPos, line.align)
        // }

    });
    // gCtx.lineWidth = '2'

}

function drawRect(x, y, txt, fSize, tAlign) {
    var boxWidth = gCtx.measureText(txt).width
    if (!boxWidth) return
    // console.log("boxWidth:", boxWidth)
    gCtx.beginPath();
    // console.log('ARE U HERE?', tAlign)
    const space = 20;
    switch (tAlign) {
        case 'left':
            gCtx.rect(x - 20, y + 10, boxWidth + 40, -fSize - 10);
            break;
        case 'right':
            gCtx.rect(x + 20, y + 10, -boxWidth - 40, -fSize - 10);
            break;
        case 'center':
            gCtx.rect(10, y + 10, boxWidth + 20, -fSize - 10);
            break;
    }
    gCtx.strokeStyle = `black`;
    gCtx.stroke()
    // gCtx.fillStyle = `${getFillColor()}`;
    // gCtx.fillRect(x, y, getRandomInt(250), getRandomInt(250))
}

///in align-left: 
// gCtx.rect(x - 20, y + 10, boxWidth + 40, -fSize - 10);

///in align-right:
// gCtx.rect(x + 20, y + 10, -boxWidth - 40, -fSize - 10);