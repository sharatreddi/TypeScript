function add(n1, n2, showResult, phrase) {
    // return n1+n2;
    var result = n1 + n2;
    if (showResult) {
        console.log(phrase + result);
    }
    else {
        return result;
    }
}
let number1 = 5;
var number2 = 2.8;
var printResult = true;
var resultPhrase = 'Result is : ';
add(number1, number2, printResult, resultPhrase);