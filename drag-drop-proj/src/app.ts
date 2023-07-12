import { ProjectInput } from './components/project-input.js';
import { ProjectList } from './components/project-list.js';

   new ProjectInput();
   new ProjectList('active');
   new ProjectList('finished');

  
//here, we use ES Modules, we create diff ts files and in tsconfig, we remove the change that we made in outfile while workin with namsepaces, we use imports on the top 
// are basically only for typescript, in order to enable them or transmit the connection, we do this following change in outfile
/*We divided them into many components, sub folders and made the necessary imports for each ts files */