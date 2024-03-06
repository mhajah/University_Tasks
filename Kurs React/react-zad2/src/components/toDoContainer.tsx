
import '../toDo.css';
import ToDoList from './toDoList';

// interface IProps {
//     name: string;
//     image: string;
//     title: string;
// }

export default function ToDoContainer() {
    return (

        <div className='toDoMainContainer'>
            <h2>THINGS TO DO</h2>
            <ToDoList />
        </div>

    );
  }