import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]); /// Arrayt of tasks
  const [task, setTask] = useState(''); /// For every individual task

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

            <div className='task_text'>
              {task.text}  {/*Show task text  */}
            </div>
            <button onClick={() =>deleteTask(task.id)}>Delete</button> {/*Delete button with function */} 
            <input
              type="checkbox"
              id="completed"
              checked = {task.completed}
              onChange={()=> ifCompleted(task.id)}            
              />
          </div>)}
    </div>
  );
}

export default App;
