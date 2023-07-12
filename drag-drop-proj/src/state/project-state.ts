import { Project, ProjectStatus } from '../models/project.js';
  // Project State Management
  type Listener<T> = (items: T[]) => void;

  class State<T> {
    protected listeners: Listener<T>[] = []; //It's an array of function references. The idea is that whenever something changes, like here when we add a new project, we call all listener functions.
    //So we loop through all listeners, of this listener, so through all listener functions, and then since these are function references, we can execute this as a function. And to that function, we pass the thing that's relevant for it, based on the state we're managing,
    //which is in this case, in this class of course, is our projects list. This is the state this class is responsible for.

    addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }

  //class ProjectState
  export class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState; //this & priv constructor & getinstance below ensures that there'll be only one instance created of this class
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
      this.projects.push(newProject); //push the latest project into the projects array
      this.updateListeners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
      //this is to basically shift the status of the project, to move a project from current status to another i.e.; dragging
      const project = this.projects.find((prj) => prj.id === projectId);
      if (project && project.status !== newStatus) {
        project.status = newStatus;
        this.updateListeners();
      }
    }

    private updateListeners() {
      for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice()); //we use slice here so that we dont send the original array, if we send the original one, it becomes vulnerable i.e.; can be edited openly
      }
    }
  }

  export const projectState = ProjectState.getInstance(); //creating an instance of projectstate so that we can call the method addProject, if we dont create an instance, we cant use the method as it is private
