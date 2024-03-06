
import '../toDo.css';
import { useState } from 'react';

interface IProps {
    content: string;
    done: boolean;
    onTap: () => void;
    deleteTask: () => void;
}


export default function ToDoList({content, done = false, onTap, deleteTask}: IProps) {

    return (
        <li className={done ? "thing done" : "thing"} >
            <button className='removeThing' onClick={deleteTask}>X</button>
            <p onClick={onTap}>{content}</p>
        </li>
    );
  }