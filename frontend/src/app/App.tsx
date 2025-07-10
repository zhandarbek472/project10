import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const fetchTodos = async () => {
    const res = await axios.get(API_URL);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

useEffect(() => {
  axios.get('http://localhost:3001/api/todos')
    .then(res => console.log('Todo data:', res.data))
    .catch(err => console.error('Axios error:', err));
}, []);


  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    const res = await axios.post(API_URL, { text: newTodo });
    setTodos([...todos, res.data]);
    setNewTodo('');
  };

  // ✅ Барлығын өшіру функциясы
  const deleteAllTodos = async () => {
    try {
      await axios.delete(API_URL);   // backend-ке сұраныс
      setTodos([]);                  // frontend-тен өшіру
    } catch (err) {
      console.error('Өшіру қатесі:', err);
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>

      {/* ✅ Батырма */}
      <button onClick={deleteAllTodos}>Барлығын өшіру</button>

      <form onSubmit={addTodo}>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Жаңа тапсырма"
        />
        <button type="submit">Қосу</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
