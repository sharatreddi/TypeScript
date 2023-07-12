namespace App{
      //component class which is used for inheritance
 export abstract class Component <T extends HTMLElement,U extends HTMLElement>{ //we're making this class as abstract becoz, we want nobody to instantiate this class directly but it shld always be used for inheritance
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

}