
import '../toDo.css';
import Thing from './toDoThing';
import { useState } from 'react';

// interface IProps {
//     name: string;
//     image: string;
//     title: string;
// }

const initialList = [
    { id: "0", content: "kupić kukurydzę", done: false},
]

export default function ToDoList() {
    let [todo, setTodo] = useState(initialList);
    const [input, setInput] = useState("Zadanie");
    const [search, setSearch] = useState("");
    const [inputSearch, setInputSearch] = useState("");
    const [showDown, setShowDown] = useState(true);

    const handleToggleDone = (id: string) => {
        setTodo(prevTodo => {
            return prevTodo.map((todoItem) => {
                if (todoItem.id === id) {
                    return {...todoItem, done: !todoItem.done};
                }
                return todoItem;
            });
        });
    };

    const handleDeleteTask = (id: string) => {
        const newTodo = todo.filter((task) => task.id !== id);
        setTodo(newTodo);
    };

    const handleAddTask = (input:string) => {
        const newTask = [...todo, {id: (new Date()).toString(), content: input, done:false}];
        setTodo(newTask);   
    }

    const handleFilterDone = () => {
        setShowDown(showDown => !showDown);
    }

    const filteredTodo = () => {
        if (showDown) {
            return todo;
        } else {
            return todo.filter((task) => task.done == true);
        }
    }

    return (

        <div className='toDoList'>

            <form className='addForm' action="" onSubmit={(e) => {e.preventDefault(); handleAddTask(input);}}>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                <button type="submit">Dodaj</button>
            </form>
            

            <form className='searchForm'
                onSubmit={(e) => {
                e.preventDefault();
                setSearch(inputSearch);
                }}>
                <input value={inputSearch} onChange={(e) => setInputSearch(e.target.value)} />
                <button type="submit">Search</button>
            </form>

            <button className='filterButton' onClick={handleFilterDone}>Pokaż tylko zrobione</button>

            <span className='separator'></span>

            <ul className='thingsList'>
                {
                    
                    filteredTodo()
                    .filter((task) => task.content.toLowerCase().includes(search.toLowerCase()))
                    .map((thing) => (
                        <Thing
                            key = {thing.content}
                            content = {thing.content}
                            done = {thing.done}
                            onTap={() => handleToggleDone(thing.id)}
                            deleteTask={() => handleDeleteTask(thing.id)}
                        />
                ))
                }
            </ul>
            
        </div>

    );
  }