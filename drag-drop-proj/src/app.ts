import { ProjectInput } from './components/project-input';
import { ProjectList } from './components/project-list';

   new ProjectInput();
   new ProjectList('active');
   new ProjectList('finished');

  
//here, we used webpack, it basically combines all our .ts/.js files and make it into a single file (bundle.js in this case)
//we created two files, namely webpack.config.js and webpack.config.prod.js, and we write the code and customize it
//we wrote it in such a way that it clears dist folder everytym we run it and compiles again freshly with updated codes 