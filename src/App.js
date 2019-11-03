import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Todos from './components/Todos';
import Header from './components/layout/Header';
import About from './components/pages/About';
import AddTodo from './components/AddTodo';
import uuid from 'uuid';
import Axios from 'axios';

class App extends Component {

state = {
  todos: []
}

componentDidMount() {
  Axios.get('http://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.setState( { todos: res.data }))
}

// toggle complete
markComplete = (id) => {
  this.setState({
    todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })
  })
}

//delete todo
//filter method
//loops through the array, and based on the condition, return another array
//return todos that don't match the id we passed in

//pass in state object
//spread the array of todos in the state object, then filter thhrough them , 
//to filter out the ones that  have the same id as the one you're passing in
//thus deleting it from the array
delTodo = (id) =>{
  this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)]});
}

//addtodo
addTodo = (title) => {
  const newTodo = {
    id: uuid.v4(), 
    title: title, 
    completed: false,
  }
  this.setState({ todos: [...this.state.todos, newTodo]})
}

render() {
return (
  <Router>
  <div className="App">
    <div className = "container">
      <Header />
      
      <Route exact path="/" render={props => (
        <React.Fragment>
          <AddTodo addTodo={this.addTodo}/>
          <Todos 
          todos={this.state.todos}
          markComplete={this.markComplete}
          delTodo={this.delTodo}/>
        </React.Fragment>
      )} />
    
      <Route exact path="/about" component={About} />    
    
    </div>
  </div>
  </Router>
);
}

}

export default App;
