import React, {Component} from 'react';
import "./item-add-form.css";

class ItemAddForm extends Component {
    render() {
        return (
            <div className="item-add-form">
                <button 
                    className="btn btn-outline-secondary"
                    onClick = {() => this.props.onItemAdded('Hello world')}>
                    Add Form
                </button>
            </div>
        )
    }
}

export default ItemAddForm;