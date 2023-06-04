//here, its abt object types

const person: { //this is the object type inferred by typescript
    name : string; //we dont have key va;ue pairs, we have key-type pairs
    age : number;
} = {
    //const person = { generally, this is the good practice i.e.; we wrtie objects in ts like the same as we write in js
    name : 'Madmax',
    age : 16
};

console.log(person.name);