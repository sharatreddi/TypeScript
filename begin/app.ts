//here, we run tsc --init, so that without triggerin each file by typing tsc app.ts
//now, it treats the complete folder as a project, it creates a tsconfig.json. in which there are some compilation targets and ither compilation stuff
//go check the file, comments are written generally beside them to understand wot they're

let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Max';

if (typeof userInput === 'string') {
  userName = userInput;
}

function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
}

generateError('An error occurred!', 500);