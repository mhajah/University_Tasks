
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
        <li className={done ? "thing done" : "thing"} onClick={onTap}>
            <button className='removeThing' onClick={(e) => {
                e.stopPropagation()
                deleteTask()}}>X</button>
            <p>{content}</p>
        </li>
    );
  }