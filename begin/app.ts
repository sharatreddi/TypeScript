//We talk abt classes in here 

class Department {
  //private readonly id : string;  private, readonly makes it that 
  //private name : string;
  protected employees : string[] = []; //it is basically a medio thing between public and private, private means u had access only in the particular class, PROTECTED means it can be accesible by only those classes which extend this class
  constructor(private readonly id : string, public name : string){ //here, in the CONSTRUCTOR, it's a shortcut, it's actlly defined in the way we wrote in lines 4,5,8 and 9
   // the READONLY keyword, just like private and public,is introduced by TypeScript,it does not exist in JavaScript.It makes sure that if you try to write to its property thereafter, you fail. So you can only use it once during initialization. Look in addemployee
    //this.id = id;
    //this.name = n;
  }

  //we can also add METHODS in classes like this
  describe(this: Department){//in this case here,"this" should always refer to an instance that's based on the department class.So an object which in the end would be of type department.
    console.log(`Department (${this.id}): ${this.name}`);//Now, abt this, it is a special case
    
  }

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
}

class AccountingDepartment extends Department{
  private lastReport : string;

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

  constructor(id: string, private reports : string[]){
  super(id, 'Accounting');
  this.lastReport = reports[0];
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

const it = new ITDepartment('d1', ["Sherry"]);

it.addEmployee('Acch');
it.addEmployee('Sujj');
//it.employees[2] = 'idiyut'; now this does not work coz we kept employee as protected

it.describe() //to call a method

it.name = 'NEW NAME';
it.printEmployeeInfo();

console.log(it);

const accounting = new AccountingDepartment('d2', []);
