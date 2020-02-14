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

// function renderTextBox() {
//     var boxId = 'txt1'
//     var htmlBox = ` <div class="${boxId}-box"></div>`;
//     document.querySelector('.canvas-container').innerHTML = htmlBox;
// }

// function onSearchClicked() {
//     var searchInput = document.querySelector('#search').value;
//     getFilter(searchInput);

// }



/////////////////////////////buttons clicked/////////////////////////////
function increaseFont(idEl) {
    updateFont(idEl);
}

function decreaseFont(idEl) {
    updateFont(idEl);
}

function onImageClicked(imageId) {
    document.querySelector('#gallery').classList.add('hide');
    document.querySelector('#canvas-panel').classList.remove('hide');
    document.querySelector('#on-gallery').classList.remove('active');
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
    // document.querySelector('#canvas-panel').classList.remove('hide');
    document.querySelector('#gallery').classList.add('hide');
    /////make about page
}

function onGoGallery(elBtn) {
    if (elBtn.classList.contains('active')) return;
    elBtn.classList.add('active');
    document.querySelector('#on-about').classList.remove('active');
    document.querySelector('#gallery').classList.remove('hide');
    document.querySelector('#canvas-panel').classList.add('hide');
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

function onAddText(ev) {

    // renderTextBox();
    var addText = document.querySelector('#txt').value;
    var lines = getLines(addText);
    var linesToDraw = lines;

    // var txtToDraw = lines[0].txt;
    // var txtSize=lines[0].size;
    // var txtAlign=lines[0].align;
    // var txtColore=lines[0].color;

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
    // console.log(lines)
    var posX;
    var posY;
    lines.forEach(line => {

        if (line.idLine === 0) {
            posX = 100;
            posY = 100;
        } else if (line.idLine === 1) {
            posX = 100;
            posY = 400;
        } else {
            posX = 100;
            posY = 250;
        }
        gCtx.strokeStyle = `${line.color}`;
        gCtx.fillStyle = `white`;
        gCtx.font = `${line.size}px IMPACT`
        gCtx.textAlign = `${line.align}`
        gCtx.fillText(line.txt, posX, posY)
        gCtx.strokeText(line.txt, posX, posY)


    });
    // gCtx.lineWidth = '2'

}

function getFillColor() {
    var color = document.querySelector('#fill-color').value;
    // console.log(color.value)
    return color;
}

function getLineColor() {
    var color = document.querySelector('#line-color').value;
    // console.log(color.value)
    return color;
}