import { useEffect, useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from "uuid";   // to generate unique id
import { Trash2 } from 'lucide-react'; // Import delete icon

function App() {

  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (todo.trim() == '') {
      alert("Please enter something...")
      return;
    }

    // const newTodo = {
    //   id: uuidv4(),
    //   text: todo
    // }
    // setTodos([...todos, newTodo])

    setTodos([
      ...todos, // Keep existing todos
      {
        id: uuidv4(), // Generate a unique ID
        text: todo    // Store the actual todo text
      }
    ])
    setTodo('')
  }

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => (todo.id !== id)))
  }

  // retriving data from loalstorage 
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'))

    if (savedTodos) {
      setTodos(savedTodos)
    }
  }, []);

  // local storage for storing user todo list 
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos])


  return (
    <>
      <div className='parent'>

        <div className='child-1'>
          <h2>Todo App</h2>
        </div>

        <div className='child-2'>
          <input
            type="text"
            placeholder='Enter your todo...'
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>

        <div className='child-3'>
          <ul>
            {
              todos.map((todo) => {
                return (
                  <li key={todo.id}>
                    <h3>{todo.text}</h3>
                    <button onClick={() => handleDelete(todo.id)} className='delete-btn'>
                      <Trash2 className="delete-icon" />
                    </button>
                  </li>
                )
              })
            }
          </ul>
        </div>

      </div>
    </>
  )
}

export default App
