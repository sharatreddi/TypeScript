// This is all abt functions, function types, callbacks etc
function add(n1: number, n2: number){
    return n1 + n2;
}

function printtheResult(num : number) : void{ //here, void is the function return type, it means, this function will not return any thing
    console.log('Result:' + num);
}

/********************************about callback functions***9*********************** */

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) { //this adds a call back 
    const result = n1 + n2;
    cb(result);
  }

  //TypeScript knows the result will be a number because we made it really clear that the callback will get one argument which is a number
  //Hence, if we would expect a second argument here in the callback, we'd get an error because we know
  //well, the callback we expect in our addAndHandle function only should have one argument.

  addAndHandle(10, 20, (result) => { //here we use a call back function
    console.log(result);
  });

/********************************about callback functions***9*********************** */

printtheResult(add(2, 17));

let combineValues: (a:number, b: number) => number; //we store a function here in combine values, generally it is of any type
//so, we are defining a function in this way here 
combineValues = add; //this works because add function relates with the conditions specified here for combinevalues
//combineValues = printResult; ---> does not work
//combineValues = 5; ---> does not work

console.log(combineValues(8,8));

