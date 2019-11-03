import React, { Component } from 'react'
import PropTypes from 'prop-types';


export class TodoItem extends Component {
    render() {
        return (
            <div style={itemStyle}>
                <p>{ this.props.todo.title }</p>
            </div>
        )
    }
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired
}

const itemStyle = {
    backgroundColor: '#ff3f3f'
}

export default TodoItem
