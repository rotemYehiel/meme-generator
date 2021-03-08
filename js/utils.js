function saveToStorage(key, value) {
    var item = JSON.stringify(value);
    localStorage.setItem(key, item);
}

function loadFromStorage(key) {
    var item = localStorage.getItem(key)
    var value = JSON.parse(item);
    // console.log('value and key: ', value, '   ', key)
    return value;
}
function removeFromStorage(key) {
    localStorage.removeItem(key)
    // console.log('removed: ', key)
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}