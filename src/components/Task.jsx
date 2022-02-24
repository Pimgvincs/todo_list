import React, { useState } from "react";
import Form from "./Form";


const Task = ({ tasks, doneTask, deleteTask, updateTask }) => { /// array with task types
    const [taskEdit, setTaskEdit] = useState({
        id: null,
        value: ''
    });

    const submitUpdate = value => { /// if i have only one value, i dont  need "()" 
        updateTask(taskEdit.id, value)
        setTaskEdit({
            id: null,
            value: ''
        })
    }
    if(taskEdit.id) {
        return <Form taskEdit={taskEdit} onSubmit={submitUpdate} />
    }

    return tasks.map((task, keyValue) =>(
        <div key={keyValue} className={task.isDone ? "task_row done" : "task_row"} >
            <div key={task.id} onClick={() => doneTask(task.id)}>
                {task.text}
                <input 
                    type="checkbox"
                    id="completed"
                    checked = {task.completed}
                    onChange={()=> doneTask(task.id)} /// when its checked, then function     
                />
            </div>
            <div className="all_btn">
                <button className="delete_btn" onClick={() => deleteTask(task.id)}>Delete</button>
                <button className="edit_btn" onClick={() => setTaskEdit({ id: task.id, value: task.text})}>Edit</button>
            </div>
        </div>

    ));
}
export default Task;