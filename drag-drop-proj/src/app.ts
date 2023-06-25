// Code goes here!
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

    private attach(){ //this methodmeans that we insert "this.element" which is actlly the imported node adjacent to the hostelement (div)
        this.hostElement.insertAdjacentElement('afterbegin', this.element)
    }
    
    @autobind
    private submitHandler(event: Event){
        event.preventDefault();
        console.log(this.titleInputElement.value);
    }

    private configure(){
        this.element.addEventListener('submit', this.submitHandler) //"submit" works here coz this.element is a HTMLFormElement
        //here the first argument we can pass to bind then is actually what the 'this' keyword will refer to inside of the to be executed function i.e.; submitHandler
    }
}


const prjInput = new ProjectInput();


//in the next commit, we'll turn this bind thing in the configure method, to decorators.