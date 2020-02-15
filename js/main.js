// var gKeepDrawing = false;
// var gCurrTxt = '';
var gCanvas;
var gCtx;
// var gCurrShape = 'triangle'

function onInit() {
    // drawImg();
    renderImages();
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
}


function renderImages() {
    var images = getImagesForDisplay();
    var strHTMLs = images.map(function(image) {
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

// function onSearchClicked() {
//     var searchInput = document.querySelector('#search').value;
//     getFilter(searchInput);

// }



/////////////////////////////buttons clicked/////////////////////////////
function onChageFont(value) {
    updateFont(value);
}

function increaseFont(idEl) {
    updateFontSize(idEl);
}

function decreaseFont(idEl) {
    updateFontSize(idEl);
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

}

function onGoNextLine() {
    switchLine();
}

function onDeliteClicked() {
    var id = getImageIdForDisplay();
    drawImg(id);

}

function onAlignLeftClicked(elId) {
    updateAlign(elId);
}

function onAlignCenterClicked(elId) {
    updateAlign(elId);
}

function onAlignRightClicked(elId) {
    updateAlign(elId);
}

function onGoAbout(elBtn) {
    if (elBtn.classList.contains('active')) return;
    elBtn.classList.add('active');
    document.querySelector('#on-gallery').classList.remove('active');
    document.querySelector('#gallery').classList.add('hide');
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
}

function onLineColor() {
    var color = document.querySelector('#line-color').value;
    updateLineColor(color);
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

function onAddText() {

    renderCanvas();

    var addText = document.querySelector('#txt').value;
    var lines = getLines(addText);
    var linesToDraw = lines;
    var elTxtBox = renderTextBox();

    getBoxs(elTxtBox);


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

    // console.log(boxes)

    // var posX;
    // var posY;

    lines.forEach(line => {
        var xPos;
        var yPos;
        if (line.box === 'txt-box0') {
            var box = getBox('txt-box0');
            xPos = box.xStart + 20;
            yPos = box.yStart + (box.yEnd - box.yStart) / 2;
        } else if (line.box === 'txt-box1') {
            var box = getBox('txt-box1');
            xPos = box.xStart + 20;
            yPos = box.yStart + (box.yEnd - box.yStart) / 2

        } else {
            var box = getBox('txt-box2');
            xPos = box.xStart + 20;
            yPos = box.yStart + (box.yEnd - box.yStart) / 2
        }

        gCtx.strokeStyle = `${line.lineColor}`;
        gCtx.fillStyle = `${line.fillColor}`;
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.textAlign = `${line.align}`
        gCtx.fillText(line.txt, xPos, yPos)
        gCtx.strokeText(line.txt, xPos, yPos)


    });
    // gCtx.lineWidth = '2'

}