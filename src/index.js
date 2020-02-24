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
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ],
        term: '',
        filter: 'active'
    };

    createTodoItem(label) {
        return {
            label,
            important: false, 
            done: false,
            id: this.maxId++
        }
    }

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
        const newItem = this.createTodoItem(text);
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
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => 
                el.id === id
            )
            const oldItem = arr[idx];
            const newItem = {...oldItem, 
                                [propName]: !oldItem[propName]};

            return [
                ...arr.slice(0,idx),
                newItem,
                ...arr.slice(idx+1)
            ];
    }

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
    };

    onToggleImportant= (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        })
    };

    search(items, term) {
        if(term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label
                .toLowerCase()
                .indexOf(term.toLowerCase()) > -1;
        });
    }

    filter(items, filter) {
        switch(filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
        }
    }

    onSearchChange = (term) => {
        this.setState({term});
    };

    onFilterChange = (filter) => {
        this.setState({
            filter
        })
    }


    render() {
        const { todoData, term , filter } = this.state;
        const visibleItems = this.filter(
            this.search(todoData, term), filter)
        const doneCount = todoData
                            .filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;                    

        return (
            <div className="todo-app">
                <AppHeader 
                    toDo={todoCount} 
                    done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel
                        onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter filter={filter}
                                      onFilterChange={this.onFilterChange}/>
                </div>
                
                <ToDoList 
                    todos={visibleItems}
                    onDeleted={ this.deleteItem }
                    onToggleDone = {this.onToggleDone}
                    onToggleImportant = {this.onToggleImportant}
                />
                <ItemAddForm 
                    onItemAdded = {this.addItem}
                    />
            </div>
        )
    }
}

export default App;

ReactDOM.render(<App/>, document.getElementById("root"));