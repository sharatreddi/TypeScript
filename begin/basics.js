"use strict";
//this is abt type assignment and type inference
//this : number for n1 is the type assignment 
function add(n1, n2, showResult, phrase) {
    const result = n1 + n2;
    if (showResult) {
        console.log(phrase + result);
    }
    else {
        return result;
    }
}
let number1;
number1 = 5;
const number2 = 2.8;
//type inference is something like, here, for example, it understands that number2 will
// always be of type number in the end, because you initialize it with a number.
const printResult = true;
let resultPhrase = 'Result is : ';
// resultPhrase = 0 <-- this one shows an error coz type zero is not assignable of type string.
add(number1, number2, printResult, resultPhrase);
