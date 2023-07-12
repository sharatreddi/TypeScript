/// <reference path="models/drag-drop.ts" />
/// <reference path="models/project.ts" />
/// <reference path="state/project-state.ts" />
/// <reference path="util/validation.ts" />
/// <reference path="decorators/autobind.ts" />
/// <reference path="components/project-input.ts" />
/// <reference path="components/project-item.ts" />
/// <reference path="components/project-list.ts" />


namespace App{
   new ProjectInput();
   new ProjectList('active');
   new ProjectList('finished');
}
  
//here, we use namespaces, we create diff ts files and use namespaces in them (use the same names), and in tsconfig, we make a change at outfile, the references in the top 
// are basically only for typescript, in order to enable them or transmit the connection, we do this following change in outfile
/*the idea behind the out file is that you tell TypeScript that it should concatenate namespaces. So the references in the top, which it has during compilation
into one single JavaScript file instead of compiling multiple JavaScript files. So here for out file we can say we want to have a file in the disc folder,
which we named maybe bundle.js */
/*We divided them into many components, sub folders and made the necessary imports for each ts files */