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
var Role;
(function (Role) {
    Role["Striker"] = "Haaland";
    Role["LeftWing"] = "Ronaldo";
    Role["RightWing"] = "Messi";
})(Role || (Role = {}));
// enum Role { ADMIN = 'ADMIN', READ_ONLY = 100, AUTHOR = 'AUTHOR' };
//And behind the scenes striker receives the number zero, leftwing number one, rightwing number two.
var person = {
    name: 'Madmax',
    age: 16,
    hobbies: ['Football', 'Training', 'Tech'],
    role: Role.LeftWing
};
console.log(person.name);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
}
console.log(person.name);
if (person.role === Role.LeftWing) {
    console.log('Ronaldo starts');
}
