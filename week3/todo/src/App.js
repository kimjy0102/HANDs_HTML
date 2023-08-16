import {useState} from "react";
import './App.css';

function App() {
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState([]);
  const onInputChange = (event) => setText(event.target.value);
  const onFormSubmig = (event) => {
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
    if (ok){
    setToDos(toDos.filter((todo,idx) => idx !== Number(element.id)));
  };
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
    if (editText.trim() !==""){
      setToDos(NewtoDos);
    };
  };

  return (
    <div className="App">
      <div><h1 className="Reminders">ReMinders</h1></div>
    <form onSubmit= {onFormSubmig}>
      <input onChange={onInputChange} type = "text" value = {text}/>
      <input type = "submit" value ="ADD"/>
    </form>
    <div className="container">
    <ul>
    {toDos.map((todo,idx) => (
    <li key={idx} id ={idx} className="todo">
     {todo}
      <span className ="edit" onClick={onEditTodo}>✏️</span>
      <span className ="trash" onClick={onTrashClick}>🗑️</span>
     </li>))}
     </ul>
     </div>
    </div>
  );
}

export default App;
