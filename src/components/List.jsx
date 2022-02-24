import React, { useState } from 'react'
import Form from './Form'
import Task from './Task'

function List() {
    const [tasks, setTasks] = useState([])

    const addTask = task => {
        const newTasks = [task, ...tasks]
        setTasks(newTasks)



        console.log(...tasks)
    }
    const updateTask = (taskId, newText) => {
        if(!newText.text || /^\s*$/.test(newText.text)){ /// checks if edited text arent empty or only with spaces
            return;
        }
        setTasks(prev => prev.map(item => (item.id === taskId ? newText : item)));
        /// setTasks([...tasks].concat(addTask))
        /// setTasks("")
    }

    const deleteTask = id => {
        let updateTasks = [...tasks].filter((task) => task.id !== id)
        setTasks(updateTasks)
    }
    const doneTask = id => {
        let updateTasks = tasks.map(task => {
        if(task.id === id) {
          task.completed = !task.completed
        }
        return task;
      });
      setTasks(updateTasks)
    }

  return (
    <div>
        <h1>Your task list</h1>
        <Form onSubmit={addTask}/>
        <Task
            tasks={tasks}
            doneTask={doneTask}
            deleteTask={deleteTask}
            updateTask={updateTask}
        />
    </div>
  )
}

export default List;