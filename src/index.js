import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import AppHeader from './components/app-header/app-header';
import SearchPanel from  './components/search-panel/search-panel';
import ToDoList from './components/todo-list/todo-list';
import ItemStatusFilter from './components/item-status-filter/item-status-filter';
import "./index.css"
import ItemAddForm from './components/item-add-form/item-add-form';

class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            {label: 'Drink Coffee', important: false, id: 1},
            {label: 'Make Awesome App', important: true,id: 2},
            {label: 'Have a lunch', important: false, id: 3},
        ]
    };

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => 
                el.id === id
            )
            const before = todoData.slice(0, idx);
            const after = todoData.slice(idx + 1);
            const newArray = [
                ...before, ...after
            ];

            return {
                todoData: newArray
            }
        }) 
    };

    addItem = (text) => {
        const newItem = {
            label: text,
            important: false, 
            id: this.maxId++
        };

        this.setState(({todoData}) => {
            const old = todoData;

            const array = [
                ...old,
                newItem
            ];

            return {
                todoData: array
            }
        })
    }

    render() {
        return (
            <div className="todo-app">
                <AppHeader toDo={1} done={3}/>
                <div className="top-panel d-flex">
                    <SearchPanel/>
                    <ItemStatusFilter/>
                </div>
                
                <ToDoList 
                    todos={this.state.todoData}
                    onDeleted={ this.deleteItem }
                />
                <ItemAddForm onItemAdded = {this.addItem}/>
            </div>
        )
    }
}

export default App;

ReactDOM.render(<App/>, document.getElementById("root"));