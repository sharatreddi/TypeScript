//here, its abt enum

// const person: { 
//     name : string; 
//     age : number;
//     hobbies : string[]; 
//     role : [number, string] 
// } =

enum Role {Striker = 'Haaland', LeftWing = 'Ronaldo', RightWing = 'Messi'}

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