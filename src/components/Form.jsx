import React, { useEffect, useRef, useState } from 'react'

function Form(props) {
    const [inputText, setInputText] = useState(props.edit ? props.edit.value : '') /// take tasks value

    const textRef = useRef(null) /// to use focus

    useEffect(() => { /// to make focus in input placeholder
      textRef.current.focus();
    });
    

    const handleChange = e => { /// set value
        setInputText(e.target.value)
    };

    const handleSubmit = e => { /// for task decleration
        e.preventDefault(); /// prevent page reload
        props.onSubmit({ /// task structure
            id: new Date().getTime(),  /// to get unique id
            text: inputText
        });
        setInputText('') /// reset input 
    }


  return (
    <form className='taskForm' onSubmit={handleSubmit} > {/*  */}
        {props.edit ? ( /// when edit then this
            <div>
                <input
                    type="text"
                    placeholder='Edit your task'
                    value={inputText}
                    onChange={handleChange}
                    className="inText_edit"
                    ref={textRef}
                    />
                <button type='submit' className='Submit_btn_edit' onClick={handleSubmit}>Submit</button>
            </div>
            ) : ( /// else this
            <div>
                <input 
                    type="text"
                    placeholder='What you need to do'
                    onChange={handleChange}
                    className="inText"
                    value={inputText}
                    ref={textRef}
                    />
                <button type='submit' className='Submit_btn' onClick={handleSubmit}>Add Task</button>
            </div>
        )}
    </form>
  );
}

export default Form;