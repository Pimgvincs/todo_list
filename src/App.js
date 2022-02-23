import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]); /// Arrayt of tasks
  const [task, setTask] = useState(''); /// For every individual task
  const [taskEdit, setTaskEdit] = useState(null) /// will get id of task what needs to be edited
  const [textEdit, setTextEdit] = useState("") /// for text, what needs to be edited

  function handleSubmit(e) {
    e.preventDefault() /// doesnt reload web page

    const newTask = { /// new task structure
      id: new Date().getTime(),  /// to get unique id
      text: task,
      completed: false
    }

    setTasks([...tasks].concat(newTask)) /// merge new task to all tasks
    setTask("") ///after writing, placeholder cleans
  }
   function deleteTask(id) { /// copy all tasks and filter only those who doesnt have that id 
     let updateTasks = [...tasks].filter((task) => task.id !== id)
     setTasks(updateTasks)
   }
   function ifCompleted(id) { /// find specific task, and set its completed to opposite
      let updateTasks = [...tasks].map((task) => {
        if(task.id === id) {
          task.completed = !task.completed
        }
        return task;
      });
      setTasks(updateTasks)
   }
   function editTask(id) { /// cpoy all tasks, and modified edited task
     let updatedTasks = [...tasks].map((task) =>{
       if(task.id === id) {
         task.text = textEdit
       }
       return task
     })
     setTasks(updatedTasks)
     setTaskEdit(null) /// reset
     setTextEdit("")
   }

  return (
    <div className="App">
        <form onSubmit={handleSubmit}> {/*To make button work as sumbit  */}
          <input 
            type="text"
            placeholder='What you need to do'
            onChange={(e) => setTask(e.target.value)} /// to get value from input form
            value={task}/>
          <button type='submit'>Add Task</button>
        </form>
        {tasks.map((task)=> 
          <div key={task.id}> {/*Every task have his own key */}

            {taskEdit === task.id ? ( /// if press edit btn, then new input , otherwise old text
             <div>
              <input 
                type="text"
                onChange={(e) => setTextEdit(e.target.value)}
                value={textEdit}
              />
              <button onClick={() => editTask(task.id)}>Submit</button>
             </div> 
            ) : (
            <div className='task_text'>
              {task.text}  {/*Show task text  */}
              <input
                type="checkbox"
                id="completed"
                checked = {task.completed}
                onChange={()=> ifCompleted(task.id)} /// when its checked, then function     
                />
                <button className='editBtn' onClick={() => setTaskEdit(task.id)}> Edit Task</button>
                <button className='delBtn' onClick={() =>deleteTask(task.id)}>Delete</button> {/*Delete button with function */} 
            </div>)}
              
          </div>)}
    </div>
  );
}

export default App;
