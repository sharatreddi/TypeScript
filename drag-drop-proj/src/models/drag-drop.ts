
    //Drag nd drop interfaces
       export interface Draggable {
            dragStartHandler(event: DragEvent): void;
            dragEndHandler(event: DragEvent): void;
        }
        
       export interface DragTarget {
            dragOverHandler(event: DragEvent): void; //basically signal the browser in java script that the thing you're dragging something over is a valid drag target.
            dropHandler(event: DragEvent): void;//will handle the drop and then here we can update our data and UI for example
            dragLeaveHandler(event: DragEvent): void;//if we're, for example, giving some visual feedback to the user when he or she drags something over the box for example, we change the background color well if no drop happens and instead it's canceled
            //or the user moves the element away we can use the drag leave handler to revert our visual update.
        }
