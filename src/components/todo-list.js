import React from 'react';
import TodoListItem from './todo-list-item';

const ToDoList = ({todos}) => {

    const elements = todos.map((item) => {
        return (
            <li><TodoListItem {...item}/>
            </li>
        )
    })

    return (
        <ul>
            {elements}
        </ul>
    );
};

export default ToDoList;