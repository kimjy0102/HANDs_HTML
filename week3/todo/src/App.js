import { useEffect, useState} from "react";
import './App.css';

function App() {
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState([]);
  useEffect(() => {
    const TODOS = localStorage.getItem("todos");
    if(TODOS) setToDos(TODOS.split(","));
  }, []);
  useEffect(() => {
    if(toDos.length !== 0){
      localStorage.setItem("todos", toDos);
    }
  }, [toDos]);
  const onInputChange = (event) => setText(event.target.value);
  const onFormSubmit = (event) => {
    event.preventDefault();
    //빈칸 입력 막기
    if(text.trim() !==""){
      setToDos([text,...toDos]);
    setText("");
    };
  };
  
  const onTrashClick = (event) =>{
    const element =(event.target.parentNode)
    const ok = window.confirm("["+toDos.filter((todo,idx) => idx === Number(element.id))+"]을/를 삭제하시겠습니까?");
    const newTodos = toDos.filter((todo,idx) => idx !== Number(element.id));
    if (ok){
    setToDos(newTodos);
    };
    if(newTodos.length === 0) localStorage.removeItem("todos");
  };
  const onEditTodo = (event) =>{
    const id = Number(event.target.parentNode.id);
    const editText = window.prompt("Edit your todo!");
    const NewtoDos = toDos.map((todo,idx) => {
      if (idx === id){
        todo = editText;
      }
      return todo;
    });
    //수정 시 빈칸 입력 막기
    if(editText !== null){
     if (editText.trim() !=="")
      {
      setToDos(NewtoDos);
      }
    }
  };

  return (
    <div className="App">
      <div><h1 className="Reminders">ReMinders ({toDos.length})</h1></div>
    <form onSubmit= {onFormSubmit}>
      <input onChange={onInputChange} type = "text" value = {text}/>
      <input type = "submit" value ="ADD"/>
    </form>
    <div className="container">
    <ul className="list">
    {toDos.map((todo,idx) => (
    <li key={idx} id ={idx} className="todo">
      <span className="todo-text">{todo}</span>
      <span className ="edit" onClick={onEditTodo}>✏️</span>
      <span className ="trash" onClick={onTrashClick}>🗑️</span>
     </li>))}
     </ul>
     </div>
    </div>
  );
}

export default App;
