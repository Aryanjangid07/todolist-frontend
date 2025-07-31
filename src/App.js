import React, { useEffect, useState } from 'react';
import api from './api'; // <-- import custom axios instance

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    api.get('/todos')
      .then(res => setTodos(res.data))
      .catch(err => console.error('Error fetching todos:', err));
  }, []);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    api.post('/todos', { task: newTodo })
      .then(res => {
        setTodos([...todos, res.data]);
        setNewTodo('');
      })
      .catch(err => console.error('Error adding todo:', err));
  };

  const deleteTodo = (id) => {
    api.delete(`/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(err => console.error('Error deleting todo:', err));
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.task}
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
