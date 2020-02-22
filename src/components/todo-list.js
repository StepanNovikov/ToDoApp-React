import React from 'react';
import TodoListItem from './todo-list-item';

const ToDoList = () => {
    return (
        <ul>
            <li><TodoListItem label="Drink Coffee"/></li>
            <li><TodoListItem 
                label="Build React App" 
                important={true}/></li>
        </ul>
    );
};

export default ToDoList;