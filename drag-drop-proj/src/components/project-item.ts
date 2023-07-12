import { Draggable } from '../models/drag-drop.js';
import { Project } from '../models/project.js';
import Component from './base-component.js'; //can use this widout curly braces only if u had a default export
import { autobind } from '../decorators/autobind.js';


    // ProjectItem Class
 export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project;

    get persons(){ //this is a getter to customize the statement of no of persons assigned to the proj 
      if(this.project.people === 1){
        return "1 person";
      } else {
        return `${this.project.people} persons`;
      } 
    }

    constructor(hostId: string, project: Project) {
      super('single-project', hostId, false, project.id);
      this.project = project;

      this.configure();
      this.renderContent();
    }

    @autobind
    dragStartHandler(event: DragEvent){
      event.dataTransfer!.setData('text/plain', this.project.id);
      event.dataTransfer!.effectAllowed = 'move';
    }
    dragEndHandler(_: DragEvent) {
      console.log('DragEnd');
    }

    configure() {
      this.element.addEventListener('dragstart', this.dragStartHandler);
      this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent() {
      this.element.querySelector('h2')!.textContent = this.project.title;
      this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
      this.element.querySelector('p')!.textContent = this.project.description;
    }
}