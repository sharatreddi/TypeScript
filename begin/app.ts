//here, its abt object types

const person: { //this is the object type inferred by typescript
    name : string; //we dont have key va;ue pairs, we have key-type pairs
    age : number;
    hobbies : string[]; // <---------- Array
    role : [number, string] //  <---------- Tuple
} = {
    name : 'Madmax',
    age : 16,
    //                                  Array 
    hobbies: ['Football', 'Training', 'Tech'], 
    //                                  Tuple
    role : [7, 'left wing']
};

// --------------------------------------about arrays----------------------------
// let favoriteActivities: any[];
// favoriteActivities = ['football', 7] we can actlly insert any kind of values
console.log(person.name);
for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
    // console.log(hobby.map()); // !!! ERROR !!!
  }

// --------------------------------------about tuples----------------------------
 //in tuples, we can define anything in them 
 // person.role.push('admin'); <---- this works, unfortunately, typescript cant identify these push errors
// person.role[1] = 10; <------ this does not work as the 1st element in the tuples is string

// person.role = [0, 'admin', 'user']; <----- this wont work either, as we defined only for length 2 

console.log(person.name);