var gCanvas;
var gCtx;


function onInit() {
    // drawImg();
    renderImages();
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')

}


function renderImages(imgs = getImagesForDisplay()) {
    var strHTMLs = imgs.map(function(image) {
        return `
        <img onclick="onImageClicked(${image.id})" class="img-${image.id} images" src="${image.url}" />`
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




/////////////////////////////buttons clicked/////////////////////////////
function onSearchClicked() {
    var searchInput = document.querySelector('#search').value;
    // console.log(searchInput)
    var imgs = getFilter(searchInput);
    // console.log(imgs)
    renderImages(imgs);
}

function onGoUp() {
    upateLinePlace('up');
    onAddText();
}

function onGoDown() {
    // debugger
    renderCanvas();
    upateLinePlace('down');
    var id = getImageIdForDisplay();
    // drawImg(id);
    var lines = getLinesToDraw();
    // onAddText();
    drawText(lines)
        // console.log('im here!')
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

function onImageClicked(imageId) {
    document.querySelector('#gallery').classList.add('hide');
    document.querySelector('#canvas-panel').classList.remove('hide');
    document.querySelector('#on-gallery').classList.remove('active');
    document.querySelector('.about').classList.add('hide');
    drawImg(imageId);
}

function toggleMenu() {
    var mainMenu = document.getElementById('mainMenu');
    console.log(mainMenu);
    mainMenu.classList.toggle('open');
}

function onCreateNewTxt() {
    upateLineOnAdd();
    onAddText();

}

function onGoNextLine() {
    switchLine();
}

function onDeliteClicked() {
    var id = getImageIdForDisplay();
    onAddText();
    drawImg(id);

}

function onAlignLeftClicked(elId) {
    updateAlign(elId);
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

function onGoAbout(elBtn) {
    if (elBtn.classList.contains('active')) return;
    elBtn.classList.add('active');
    document.querySelector('#on-gallery').classList.remove('active');
    document.querySelector('#gallery').classList.add('hide');
    document.querySelector('#canvas-panel').classList.add('hide');
    document.querySelector('.about').classList.remove('hide');
    document.querySelector('main').style.background = 'white';
}

function onGoGallery(elBtn) {
    if (elBtn.classList.contains('active')) return;
    elBtn.classList.add('active');
    document.querySelector('#on-about').classList.remove('active');
    document.querySelector('#gallery').classList.remove('hide');
    document.querySelector('#canvas-panel').classList.add('hide');
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

function onPalleteClicked() {
    openOrCloseModal();
}

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

    var addText = document.querySelector('#txt').value;
    var lines = getLines(addText, canvasW, canvasH);
    var linesToDraw = lines;

    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')

    var imgIdToDraw = getImageIdForDisplay();
    var img = new Image()
    img.src = `meme-imgs/${imgIdToDraw}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        drawText(linesToDraw);
    }
}

function drawImage(img, x, y) {
    gCtx.drawImage(img, x, y);
}

function drawText(lines) {

    // debugger
    lines.forEach(line => {
        var xPos = line.x;
        var yPos = line.y;
        // var elCanvas = document.getElementById('my-canvas')
        // if (line.idLine === 0) {
        //     xPos = (elCanvas.offsetWidth) / 2; ////the middle
        //     yPos = 100;

        // } else if (line.idLine === 1) {
        //     xPos = (elCanvas.offsetWidth) / 2;
        //     yPos = elCanvas.offsetHeight - 100 + 50;
        // } else {
        //     xPos = (elCanvas.offsetWidth) / 2;
        //     yPos = 25 + (elCanvas.offsetHeight) / 2;

        // }
        drawRect(xPos, yPos, line.txt, line.size, line.align);
        addLinePlace(line.idLine, xPos, yPos);

        gCtx.strokeStyle = `${line.lineColor}`;
        gCtx.fillStyle = `${line.fillColor}`;
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.textAlign = `${line.align}`
        gCtx.fillText(line.txt, xPos, yPos)
        gCtx.strokeText(line.txt, xPos, yPos)


    });
    // gCtx.lineWidth = '2'

}

function drawRect(x, y, txt, fSize, tAlign) {
    var boxWidth = gCtx.measureText(txt).width
    gCtx.beginPath();
    // console.log('ARE U HERE?', tAlign)
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