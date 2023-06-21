//We talk abt classes, READONLY, CONSTRUCTOR, INHERITANCE,PRIVATE AND PROTECTED, SUPER KEYWORD, GETTERS AND SETTERS in here 

 abstract class Department {
      //private readonly id : string;  private, readonly makes it that 
      //private name : string;
      protected employees : string[] = []; //it is basically a medio thing between public and private, private means u had access only in the particular class, PROTECTED means it can be accesible by only those classes which extend this class
      constructor(protected readonly id : string, public name : string){ //here, in the CONSTRUCTOR, it's a shortcut, it's actlly defined in the way we wrote in lines 4,5,8 and 9
      // the READONLY keyword, just like private and public,is introduced by TypeScript,it does not exist in JavaScript.It makes sure that if you try to write to its property thereafter, you fail. So you can only use it once during initialization. Look in addemployee
        //this.id = id;
        //this.name = n;
        //console.log(Department.fiscalYear) - this wont work coz static prop is tried to access in non static part
      }
      static fiscalYear = 2020;

      static createEmployee(name : string){//STATIC - Static properties and methods allow you to add properties and methods to classes which are not accessed on an instance of the class, so where you don't need to call new class name first, but which you access directly on the class.
        //check line 114
        //One important word about them, When you add them on a class, you can't access them from inside your non static parts.check line 11, if we want to use it we should use the classname, check 115 for ex
        return {name : name};
      }

      //we can also add METHODS in classes like this
      //describe(this: Department){//in this case here,"this" should always refer to an instance that's based on the department class.So an object which in the end would be of type department.
      //  console.log(`Department (${this.id}): ${this.name}`);//Now, abt this, it is a special case
      //}

      abstract describe(this : Department): void; //ABSTRACT
      //we use abstract when wanna ensure that a certain method is available in all classes based on some base classBut when also know at the same time that the exact implementation 
      //will depend on the specific version, so when you can provide a general method, but you want to enforce that this method exists, but the inheriting classes will need to provide 
      //their own implementation because you can't provide a default implementation in the base class.
      //so, as we have set describe to abstract, we shld also set the class containing it to abstract, or else we get an issue saying "Abstract methods can only appear within an abstract class."
      //now, we shld also include this process in those which inherited this class too i.e; IT dept and acc dept
      //another key point is abstract classes cannot be instantiated, go to the end(last) for an example

      addEmployee(employee: string) {
        // validation etc, if I try to change id to d2, you see, we get an error here, that I can't assign to id because it's readonly.
        // this.id = 'd2';
        this.employees.push(employee);
      }

      printEmployeeInfo(){
        console.log(this.employees.length);
        console.log(this.employees);
      }
}


  class ITDepartment extends Department{ //INHERITANCE
    constructor(id: string, private admins: string[]){
      super(id, 'IT') //this SUPER keyword is necessary for inherited classes, if u dont keep it, it throws an error, try commenting it out
      this.admins = admins;
    }

    describe(){
        console.log('IT Department - ID: ' + this.id);
    }
  }

  class AccountingDepartment extends Department{
      private lastReport : string;
      private static instance: AccountingDepartment;//here, we have a static property which is accessible on the class itself, but only from inside the class and the value we store in 
      //I have a static property which is accessible on the class itself, but only from inside the class and the value we store in there will be of type AccountingDepartment, so of the class itself.

      get mostRecentReport(){ //A GETTER is basically a property, where you execute a function or method, when you retrieve a value and that allows you as a developer to add more complex logic.
        if (this.lastReport){
          return this.lastReport
        }
        throw new Error('no report found.');
      }

      set mostRecentReport(value : string){ //A SETTER is almost the same way, but here, we pass an argument, in this case we pass a string, this setter could be simply an alternative for addreport
        if(!value){
          throw new Error('Pls pass in a valid value!');
        }
        this.addReport(value);
      }

      private constructor(id: string, private reports : string[]){ //SINGLETON & PRIVATE CONSTRUCTOR
        //we use them when we need only one instance of that particular class, so we set the constructor to private
        //check static getinstance method
      super(id, 'Accounting');
      this.lastReport = reports[0];
      }

      static getInstance() { //this checks whether there is already an instance of this class or not
        if (AccountingDepartment.instance) {
          return this.instance;
        }
        this.instance = new AccountingDepartment('d2', []);
        return this.instance;
      }

      describe() {
        console.log('Accounting Department - ID: ' + this.id);
      }

      addEmployee(name: string){
        if(name === 'Max'){
          return ;
        }
        this.employees.push(name)
      }

      addReport(text : string){
        this.reports.push(text);
        this.lastReport = text;
      }

      printReports() {
        console.log(this.reports);
      }

  }  

const employee1 = Department.createEmployee('MAX');
console.log(employee1, Department.fiscalYear)//we use Department here coz fiscalYear is a static thing

const it = new ITDepartment('d1', ["Sherry"]);

it.addEmployee('Acch');
it.addEmployee('Sujj');
//it.employees[2] = 'idiyut'; now this does not work coz we kept employee as protected

it.describe() //to call a method

it.name = 'NEW NAME';
it.printEmployeeInfo();

console.log(it);

// const accounting = new AccountingDepartment('d2', []);
const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();

console.log(accounting, accounting2);//both are the same here

accounting.mostRecentReport = 'Year End Report';
accounting.addReport("Something went wrong...");
console.log(accounting.mostRecentReport);

accounting.addEmployee('Suchee');
accounting.addEmployee('Jio');

accounting.describe();

//example of abstract class cannot be instantiated

/*  
  abstract class Shape {
  abstract calculateArea(): number; // Abstract method

  getColor(): string {
    return "red"; // Concrete method
  }
}

class Circle extends Shape {
  radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

// Cannot instantiate Shape directly
// const shape = new Shape(); // Error: Cannot create an instance of an abstract class

// Instantiate Circle (subclass of Shape)
const circle = new Circle(5);

console.log(circle.calculateArea()); // Output: 78.53981633974483
console.log(circle.getColor()); // Output: "red"

*/