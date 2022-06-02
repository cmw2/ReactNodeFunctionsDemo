import React from 'react';
import Todo from '../features/todo/todo.component';
import {getAllTodos} from '../features/todo/todo.service';

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      isLoaded: false,
    }
  }

  componentDidMount() {
    getAllTodos().then(res => {
      console.log(res);
      this.setState ({
        isLoaded: true,
        todos: res,
      })
    })
  }

  render() {
    var {isLoaded, todos} = this.state;
    if(!isLoaded) {
      return <div>Loading....</div>
    } else {
      return (          
        <div>
          <ol>
            {todos.map(todo => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ol>
        </div>         
      )
    }
  }
}

export default TodoList;