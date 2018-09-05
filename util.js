function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function generatePageAndPosition(numberOfResults, pageSize) {
    const numberToGet = getRandomInt(0, numberOfResults || pageSize);
    return getPageAndPosition(numberToGet, pageSize);
}

function getPageAndPosition(numberToGet, pageSize) {
    const pageNumber = Math.ceil(numberToGet / pageSize);
    const indexOnPage = (numberToGet - ((pageNumber - 1) * pageSize)) - 1;
    return [numberToGet, pageNumber, indexOnPage];
}

module.exports = {
    getRandomInt,
    generatePageAndPosition,
    getPageAndPosition,
};