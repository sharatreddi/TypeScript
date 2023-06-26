// Code goes here!

//validation interface
interface Validatable {
    value : string;
    required? : boolean;
    minLength? : number;
    maxLength?: number;
    min? : number;
    max? : number;
}

//validate function
function validate(validatableInput: Validatable){
    let isValid = true;
    if(validatableInput.required){ //check for required
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    //check for minlength
    if(validatableInput.minLength !=null && typeof validatableInput.value === 'string'){
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength; 
    }
    //check for maxlength
    if(validatableInput.maxLength !=null && typeof validatableInput.value === 'string'){
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    //check for min
    if(validatableInput.min != null && typeof validatableInput.value === 'number'){
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    //check for max
    if(validatableInput.max != null && typeof validatableInput.value === 'number'){
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}

//autobind decorator
function autobind(_: any, _2: string, Descriptor: PropertyDescriptor){ //This '_' actually is, a hint for typescript and javascript that you are aware that you are not going to use these values,
    // but you need to accept them because you need the argument they're after
    const originalMethod = Descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get(){
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}

//project class
class ProjectInput {
    templateElement : HTMLTemplateElement;
    hostElement : HTMLDivElement;
    element : HTMLFormElement
    titleInputElement : HTMLInputElement;
    descriptionInputElement : HTMLInputElement;
    peopleInputElement : HTMLInputElement; 
   
    constructor(){
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true) // importNode is a method provided on the global document object and to importNode you pass a pointer at your template element. 
        //So this template element in the end, or to be precise not the element but dot content there. Meaning, it reads the content in between the tag u provide 
        //Content is a property that exists on HTML template elements and it simply gives a reference to the content of a template. So to the HTML code between the template text.

        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';

        this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement; 
        this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement; 
        this.configure();
        this.attach();
    }

    private gatherInput():[string, string, number] | void{
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        const titleValidatable : Validatable = {
            value: enteredTitle,
            required : true
        }

        const descriptionValidatable : Validatable = {
            value: enteredDescription,
            required : true,
            minLength: 5
        }

        const peopleValidatable : Validatable = {
            value: enteredPeople,
            required : true,
            min: 1,
            max: 5
        };

        if(
            !validate(titleValidatable)|| !validate(descriptionValidatable)|| !validate(peopleValidatable)
        ){
            alert('Invalid input, please try again' );  
        }else{
            return [enteredTitle ,enteredDescription, +enteredPeople]
        }
    }

    private clearInputs(){
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    private attach(){ //this method means that we insert "this.element" which is actlly the imported node adjacent to the hostelement (div)
        this.hostElement.insertAdjacentElement('afterbegin', this.element)
    }
    
    @autobind
    private submitHandler(event: Event){
        event.preventDefault();
        const userInput = this.gatherInput(); //as there is no concept of tuples in javascript, we use array method
        if(Array.isArray(userInput)){
            const [title, desc, people] = userInput;
            console.log(title, desc, people);
            this.clearInputs();
        }
    }

    private configure(){
        this.element.addEventListener('submit', this.submitHandler) //"submit" works here coz this.element is a HTMLFormElement
        //here the first argument we can pass to bind then is actually what the 'this' keyword will refer to inside of the to be executed function i.e.; submitHandler
    }
}

const prjInput = new ProjectInput();

//So, what's happening in here is, to sum up all the process, 
/*1) First, We created a form and got access of the form elements in the constructor by using queryselectors and all
    then we use attach and configure methods, attach, tales the code between the app part and considers it as one code part
    initially, nothin appears on the screen, but from the html code that's written, we extract this as hostELement in constructor and call
    it in the div(with id as app), we use attach method for it, using configure method to attach an eventlistener, We also added an autobind decorator*/
/*2) then, we created a method submit handler to handle the submit button, it takes input from gatherinput method
     in gatherinput, we get access to the values of title, description, people inputs and kept some validation methods using function Validate which follows interface Validatable
     in gatherinput, we follow those validations and if all of them are true, then we print it in console
     it is printed by submithandler method which takes them as an array instead of tuple as we dont have them in javascript*/    