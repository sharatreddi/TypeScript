//here, its abt enum types

// const person: { 
//     name : string; 
//     age : number;
//     hobbies : string[]; 
//     role : [number, string] 
// } =

// const ADMIN = 0;
// const READ_ONLY = 1; //we do it like this in javascript
// const AUTHOR = 2;

//in typescript, we use enums, We create a enum with the enum keyword, we can name it Role,
//convention is to start with the uppercase character because the enum also is a custom type.
enum Role {Striker = 'Haaland', LeftWing = 'Ronaldo', RightWing = 'Messi'}
// enum Role { ADMIN = 'ADMIN', READ_ONLY = 100, AUTHOR = 'AUTHOR' };
//And behind the scenes striker receives the number zero, leftwing number one, rightwing number two.

const person = {
    name : 'Madmax',
    age : 16,
    hobbies: ['Football', 'Training', 'Tech'], 
    role : Role.LeftWing
};

console.log(person.name);
for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
  }
 
console.log(person.name);

if (person.role === Role.LeftWing) {
    console.log('Ronaldo starts');
  }