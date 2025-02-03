import { useEffect, useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from "uuid";   // to generate unique id
import { Trash2, CheckCircle, Circle } from 'lucide-react';// Import delete icon

function App() {

  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()

    // alert message 
    if (todo.trim() == '') {
      alert("Please enter something...")
      return;
    }

    setTodos([
      ...todos, // Keep existing todos
      {
        id: uuidv4(), // Generate a unique ID
        completed: false,
        text: todo    // Store the actual todo text
      }
    ])
    setTodo('')
  }

  // delete todo functionality 
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => (todo.id !== id)))
  }

  const toggleComplete = (id) => {
    setTodos((prevTodos) => (
      prevTodos.map((todo) =>
        todo.id === id ?
          { ...todo, completed: !todo.completed }
          : todo)
    ))
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
                  <li key={todo.id} className={todo.completed ? "completed" : ""}>

                    <span>
                      <h3>{todo.text}</h3>
                    </span>

                    <span className='all-icons'>

                      <button onClick={() => toggleComplete(todo.id)} className='toggle-btn'>
                        {todo.completed ? (
                          <CheckCircle />
                        ) : (
                          <Circle />
                        )}
                      </button>

                      <button onClick={() => handleDelete(todo.id)} className='delete-btn'>
                        <Trash2 className="delete-icon" />
                      </button>

                    </span>
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
