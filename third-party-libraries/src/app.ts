import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { Product } from './product.model';

const products = [
  { title: 'A Carpet', price: 29.99 },
  { title: 'A Book', price: 10.99 }
];

const newProd = new Product('', -5.99);
validate(newProd).then(errors => {
  if (errors.length > 0) {
    console.log('VALIDATION ERRORS!');
    console.log(errors);
  } else {
    console.log(newProd.getInformation());
  }
});

// const p1 = new Product('A Book', 12.99);

// const loadedProducts = products.map(prod => {
//   return new Product(prod.title, prod.price);
// });

const loadedProducts = plainToInstance(Product, products);//now what this package will do is it will go over this array transform every plain Vanilla JavaScript object here to an instance of this class.

for (const prod of loadedProducts) {
  console.log(prod.getInformation());
}

//Here we use third party libraries to do some minimal tasks for us
//like, class validator in here had some properties, go thru its documentation, plaintoinstance method for example 
