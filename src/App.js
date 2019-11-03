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


delTodo = (id) =>{
Axios.delete(`http://jsonplaceholder.typicode.com/todos/${id} `)
  .then (res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)]})
)}

// delTodo = (id) => {
//   axios
//     .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
//     .then((res) =>
//       this.setState({
//         todos: [...this.state.todos.filter((todo) => todo.id !== id)]
//       })
//     );
// };




addTodo = (title) => {
  Axios.post('http://jsonplaceholder.typicode.com/todos', { title: title, completed: false })
    .then((res) => {
      res.data.id = uuid.v4();
      this.setState({ todos: [...this.state.todos, res.data] });
    });
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
