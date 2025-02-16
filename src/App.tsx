import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setInputValue(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 新しいtodo作成
    const newTodo: Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false,
    }

    setTodos([newTodo, ...todos]);
    setInputValue("");
  }

  const handleEdit = (id: number, inoutValue: string) => {
    const newTodos = todos.map((todo) =>{
      if(todo.id === id){
        todo.inputValue = inputValue;
      }
      return todo;
    });

    setTodos(newTodos);
  }


  return (
    <div className="App">
      <div>
        <h2>todoリスト with TypeScript</h2>
        <form onSubmit={(e) => handleSubmit(e) }>
        <input type="text" onChange={(e) => handleChange(e) } className='inputText'/>
        <input type="submit" value="作成" className='submitButton'/>
        </form>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input type="text" 
              onChange={(e) => handleEdit(todo.id, e.target.value) } 
              className='inputText'
              value = {todo.inputValue}
              />
            </li>
          ))}
        </ul>
      </div>    
    </div>
  );
}

export default App;
