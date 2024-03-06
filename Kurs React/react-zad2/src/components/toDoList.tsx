
import '../toDo.css';
import Thing from './toDoThing';
import { useState } from 'react';

// interface IProps {
//     name: string;
//     image: string;
//     title: string;
// }

const initialList = [
    { content: "kupić kukurydzę", done: false}
]

export default function ToDoList() {

    let [todo, setTodo] = useState(initialList);

    const handleToggleDone = (index:number) => {
        const newTodo = [...todo];
        newTodo[index].done = !newTodo[index].done;
        setTodo(newTodo);
    };

    const handleDeleteTask = (index:number) => {
        const newTodo = todo.filter((_, i) => i !== index);
        setTodo(newTodo);
    };

    return (

        <div className='toDoList'>
            <ul className='thingsList'>
                {todo
                    .map((thing, index) => (
                        <Thing
                            key = {thing.content}
                            content = {thing.content}
                            done = {thing.done}
                            onTap={() => handleToggleDone(index)}
                            deleteTask={() => handleDeleteTask(index)}

                        />
                ))}
            </ul>
            
        </div>

    );
  }