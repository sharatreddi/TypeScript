type Combinable = number | string; //this "|" is union type, and we can create a type alias like  combinable here
type ConversionDescriptor = 'as-number'|'as-text'; //this 'as-number' and 'as-text' are literal-types

function combine(
    input1 : Combinable,
    input2 : Combinable,
    resultConversion : ConversionDescriptor
    ){
     let result;
     if(typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number'){
        result = +input1 + +input2;
     }else{
        result = input1.toString() + input2.toString();
     }
     return result;
}

const combinedAges = combine(30, 26, 'as-number');
console.log(combinedAges);

const combinedStringAges = combine('30', '26', 'as-number');
console.log(combinedStringAges);

const combinedNames = combine('Max', 'Anna', 'as-text');
console.log(combinedNames);