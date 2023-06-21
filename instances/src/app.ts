//Here we talk abt I    INTERFACES
//an interface describes the structure of an object. We can use it to describe how an object should look like.
// type AddFn = (a: number, b: number) => number;
interface AddFn {
    (a: number, b: number): number;
  }
  
  let add: AddFn;
  
  add = (n1: number, n2: number) => {
    return n1 + n2;
  };
  
  interface Named {
    readonly name?: string;
    outputName?: string;
  }
  
  interface Greetable extends Named { //we can also extend the interfaces like this
    greet(phrase: string): void;
  }
  
  class Person implements Greetable { //a class follows an interface when we use implements 
    name?: string; //these ? are optional parameters, that is, when u r not sure that u want them in ur skeleton or not
    age = 30;
  
    constructor(n?: string) {
      if (n) {
        this.name = n;
      }
    }
  
    greet(phrase: string) {
      if (this.name) {
        console.log(phrase + ' ' + this.name);
      } else {
        console.log('Hi!');
      }
    }
  }
  
  let user1: Greetable;
  
  user1 = new Person();
  // user1.name = 'Manu';
  
  user1.greet('Hi there - I am');
  console.log(user1);
  