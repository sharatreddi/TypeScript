let userInput: unknown;
//interesting thing about the unknown type is we can store any value in there without getting errors
let userName: string;

userInput = 5;
userInput = 'Max';

/*------------------------------------------- abt unknown type-------------------------------------------*/
if (typeof userInput === 'string') { //Unknown is a bit more restrictive than any. With unknown, we have to first of all check
// the type that's currently stored in userInput before we can assign it to
//I need such a extra type check here with unknown to be able to assign a unknown value to a value with a fixed type
//and therefore unknown is the better choice over any if you know I can't tell exactly what type of store in there,
//it might be a number, it might be a string, but I know what I want to do with it eventually
  userName = userInput;
}


/**************surf more for never type, itz newly introduced*************/
function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
  // while (true) {}
}

generateError('An error occurred!', 500);