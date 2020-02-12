var gKeepDrawing = false;
var gCurrTxt = '';
var gCanvas;
var gCtx;
var gCurrShape = 'triangle'

function onInit() {
    drawImg();
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

function onSearchClicked() {
    var searchInput = document.querySelector('#search').value;
    getFilter(searchInput);

}

function onImageClicked(imageId) {


}

function toggleMenu() {
    var mainMenu = document.getElementById('mainMenu');
    console.log(mainMenu);
    mainMenu.classList.toggle('open');
}


//canvas place

function drawImg() {
    var img = new Image()
    img.src = 'meme-imgs/2.jpg';
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}

function onAddText(ev) {
    // drawImg();
    var addText = document.querySelector('#txt1').value;
    // console.log(addText)
    var lines = getLines(addText);
    var txtToDraw = lines[0].txt;
    // console.log('lines is: ', lines[0].txt)


    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')


    // drawImg();
    var img = new Image()
    img.src = 'meme-imgs/2.jpg';
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        drawText(txtToDraw);
    }

}


function drawImage(img, x, y) {
    gCtx.drawImage(img, x, y);
}



function drawText(txt) {

    // gCtx.lineWidth = '2'
    gCtx.strokeStyle = `black`;
    gCtx.fillStyle = `white`;
    // gCtx.strokeStyle = `${getLineColor()}`;
    // gCtx.fillStyle = `${getFillColor()}`;
    var fontSize = 60;
    // var fontSize = getRandomInt(30);
    gCtx.font = `${fontSize}px Ariel`
    gCtx.textAlign = 'center'
    gCtx.fillText(txt, 100, 100)
    gCtx.strokeText(txt, 100, 100)

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