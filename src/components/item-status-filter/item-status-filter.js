import React, {Component} from 'react';
import "./item-status-filter.css"

class ItemStatusFilter extends Component {

    

    render() {
        
        const { onAllItems, onActiveItems, onDoneItems } = this.props;

        return (
            <div className="btn-group">
                <button type="button"
                        className="btn btn-info"
                        onClick={onAllItems}>
                            All
                </button>
                <button type="button"
                        className="btn btn-outline-secondary"
                        onClick={onActiveItems}>
                            Active
                </button>
                <button type="button"
                        className="btn btn-outline-secondary"
                        onClick={onDoneItems    }>
                            Done
                </button>
            </div>
        );
    }
}

export default ItemStatusFilter;