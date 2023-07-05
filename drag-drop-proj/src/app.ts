// Project Type
enum ProjectStatus {
    Active,
    Finished
  }
  
  class Project {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public people: number,
      public status: ProjectStatus
    ) {}
  }
  
  // Project State Management
  type Listener<T> = (items: T[]) => void;

  class State<T> {
    protected listeners: Listener<T>[] = [];//It's an array of function references. The idea is that whenever something changes, like here when we add a new project, we call all listener functions. 
    //So we loop through all listeners, of this listener, so through all listener functions, and then since these are function references, we can execute this as a function. And to that function, we pass the thing that's relevant for it, based on the state we're managing,
    //which is in this case, in this class of course, is our projects list. This is the state this class is responsible for.

    addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }
  
  //class ProjectState
  class ProjectState extends State<Project>{
    
    private projects: Project[] = [];
    private static instance: ProjectState;//this & priv constructor & getinstance below ensures that there'll be only one instance created of this class 
    // i.e.; singleton class
  
    private constructor() {
      super();
    }
  
    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
      this.instance = new ProjectState();
      return this.instance;
    }
  
    addProject(title: string, description: string, numOfPeople: number) {
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        numOfPeople,
        ProjectStatus.Active
      );
      this.projects.push(newProject);//push the latest project into the projects array
      for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice());//we use slice here so that we dont send the original array, if we send the original one, it becomes vulnerable i.e.; can be edited openly
      }
    }
  }
  
  const projectState = ProjectState.getInstance();//creating an instance of projectstate so that we can call the method addProject, if we dont create an instance, we cant use the method as it is private
  
  // Validation interface
  interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }
  
  //validate function
  function validate(validatableInput: Validatable) {
    let isValid = true;
    if (validatableInput.required) { //check for required
      isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    //check for minlength
    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
      isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    //check for maxlength
    if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
      isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    //check for min
    if (validatableInput.min != null && typeof validatableInput.value === 'number') {
      isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    //check for max
    if (validatableInput.max != null && typeof validatableInput.value === 'number') {
      isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
  }
  
  // autobind decorator
  function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {//This '_' actually is, a hint for typescript and javascript that you are aware that you are not going to use these values,
    // but you need to accept them because you need the argument they're after
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
      configurable: true,
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      }
    };
    return adjDescriptor;
  }

  //component class which is used for inheritance
  abstract class Component <T extends HTMLElement,U extends HTMLElement>{ //we're making this class as abstract becoz, we want nobody to instantiate this class directly but it shld always be used for inheritance
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;
    
    constructor (templateId : string, hostElementId: string, insertAtStart: boolean ,newElementId?: string){
      this.templateElement = document.getElementById(
              templateId
            )! as HTMLTemplateElement;
            this.hostElement = document.getElementById(hostElementId)! as T;
        

    const importedNode = document.importNode(      //So this template element in the end, or to be precise not the element but dot content there. Meaning, it reads the content in between the tag u provide 
    //Content is a property that exists on HTML template elements and it simply gives a reference to the content of a template. So to the HTML code between the template text.

        this.templateElement.content,
        true
      );
      this.element = importedNode.firstElementChild as U;
      if(newElementId){
      this.element.id = newElementId;
      }
      this.attach(insertAtStart);
  }
   
  private attach(insertAtBeginning: Boolean) {//this method means that we insert "this.element" which is actlly the imported node adjacent to the hostelement (div)
        this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
      }
  abstract configure(): void;
  abstract renderContent(): void; //we include these 2 methods coz they're kinda necessary for every class we inherit from this


}
  // ProjectList Class
  class ProjectList extends Component<HTMLDivElement, HTMLElement>{
    assignedProjects: Project[];
  
    constructor(private type: 'active' | 'finished') {
      super('project-list', 'app', false, `${type}-projects`)
      
      this.assignedProjects = [];
  
      this.configure()
      this.renderContent();
    }
  
    configure(){
      projectState.addListener((projects: Project[]) => {
        const relevantProjects = projects.filter(prj => { //here, we filter the projects on the basis of their type i.e.; active or finished by this function
        if(this.type === 'active')
            {
                return prj.status === ProjectStatus.Active;
            }
                return prj.status === ProjectStatus.Finished;
        });
        this.assignedProjects = relevantProjects;
        this.renderProjects();
      });
    }

    renderContent() {
      const listId = `${this.type}-projects-list`;
      this.element.querySelector('ul')!.id = listId;
      this.element.querySelector('h2')!.textContent =
        this.type.toUpperCase() + ' PROJECTS';
    }

    private renderProjects() {
      const listEl = document.getElementById(
        `${this.type}-projects-list`
      )! as HTMLUListElement;
      listEl.innerHTML = ''; //here, we simply take our list element and clear all its content by setting inner HTML to an empty string, 
      //which means we get rid of all list items and then re render. That means that whenever we add a new project, we re render all projects
      for (const prjItem of this.assignedProjects) {
        const listItem = document.createElement('li');
        listItem.textContent = prjItem.title;
        listEl.appendChild(listItem);
      }
    }  
  }
  
  // ProjectInput Class
  class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
    
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;
  
    constructor() {
      super('project-input', 'app', true, 'user-input')
      this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
      this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
      this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
      this.configure();
    }
  
    configure() {
      this.element.addEventListener('submit', this.submitHandler);//"submit" works here coz this.element is a HTMLFormElement
      //here the first argument we can pass to bind then is actually what the 'this' keyword will refer to inside of the to be executed function i.e.; submitHandler
    }

    renderContent(){}

    private gatherUserInput(): [string, string, number] | void {
      const enteredTitle = this.titleInputElement.value;
      const enteredDescription = this.descriptionInputElement.value;
      const enteredPeople = this.peopleInputElement.value;
  
      const titleValidatable: Validatable = {
        value: enteredTitle,
        required: true
      };
      const descriptionValidatable: Validatable = {
        value: enteredDescription,
        required: true,
        minLength: 5
      };
      const peopleValidatable: Validatable = {
        value: +enteredPeople,
        required: true,
        min: 1,
        max: 5
      };
  
      if (
        !validate(titleValidatable) ||
        !validate(descriptionValidatable) ||
        !validate(peopleValidatable)
      ) {
        alert('Invalid input, please try again!');
        return;
      } else {
        return [enteredTitle, enteredDescription, +enteredPeople];
      }
    }
  
    private clearInputs() {
      this.titleInputElement.value = '';
      this.descriptionInputElement.value = '';
      this.peopleInputElement.value = '';
    }
  
    @autobind
    private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherUserInput();//as there is no concept of tuples in javascript, we use array method
      if (Array.isArray(userInput)) {
        const [title, desc, people] = userInput;
        projectState.addProject(title, desc, people);//calling this adds the inputs as the new project
        this.clearInputs();
      }
    } 
  }
  
  const prjInput = new ProjectInput();
  const activePrjList = new ProjectList('active');
  const finishedPrjList = new ProjectList('finished');
  
  //So, what's happening in here is, to sum up all the process, 
/*1) First, We created a form and got access of the form elements in the constructor by using queryselectors and all
  then we use attach and configure methods, attach, tales the code between the app part and considers it as one code part
  initially, nothin appears on the screen, but from the html code that's written, we extract this as hostELement in constructor and call
  it in the div(with id as app), we use attach method for it, using configure method to attach an eventlistener, We also added an autobind decorator*/
/*2) then, we created a method submit handler to handle the submit button, it takes input from gatherinput method
   in gatherinput, we get access to the values of title, description, people inputs and kept some validation methods using function Validate which follows interface Validatable
   in gatherinput, we follow those validations and if all of them are true, then we print it in console
   it is printed by submithandler method which takes them as an array instead of tuple as we dont have them in javascript*/    
/*3) Now, to deal with form class, we created(replicated ProjectInput class) a new class namely ProjectList, similar to before, we take the template which has id project-list
   and use it, keeping the same host element, then we use rendercontent method inwhich we set the id values of lists depending on they are active list/ finished list
   we also set the heading of it*/ 
/*4) here, we build a class which manages the state of our application, a class that manages our projects, or whichever state we might need to manage in the application, 
   which also allows us to then set up listeners in the different parts of the app that are interested. we created a new class named projectState, then we create listeners, and addlistener method in it
   we also have an addProject method which adds inputs here, then in projectlist class, we created renderprojects and rendercontent method */
/*5) here, we created a dedicated class for the project and then we added an extra feature namely project status and an enum for that and then replaced any[] types of projects array to their respective types*/
/*6) Here, we first filter the projects that we add on the basis of their type i.e.; active/finished, for that, we use an inbuilt function called .filter(), 
   we use this in the constructor of projectList class in the addlistener method, and then to resolve the issue of a single project title rendering again when we run it,we clear the content of it in renderprojects method
   by making its innerhtml as null*/
/*7) Here, we created two classes, namely Component and State, we used them as base classes and other classes inherits from them, we adjusted projectList, projectInput and projectState classes according to the inheritance rules 
   Adding inheritance and generic types r the main motto*/   