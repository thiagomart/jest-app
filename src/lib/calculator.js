var BASE_CONVERSION = 10;
module.exports.sum = (num1, num2) => {
    // return +num1 + +num2; will convert everything to number or using a parseInt
    // specify the base, 10 for decimal https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/parseInt
    const int1 = parseInt(num1, BASE_CONVERSION)
    const int2 = parseInt(num2, BASE_CONVERSION)
    
    if (Number.isNaN(int1) || Number.isNaN(int2)){
        throw new Error('Please check your input');
    }

    return int1 + int2;
}