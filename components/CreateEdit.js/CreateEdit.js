import React, { useState } from 'react';
import styles from '../Task/Card.module.css';
const { addTask, updateTask } = require('../../db/index');

const CreateTask = (props) => {
    const [state, setState] = useState({
        title: '',
        description:''
    });
    const handleTitleChange = (e) => {
        const value = e.target.value;
        setState({...state, title:value})
    }
    const handleDescChange = (e) => {
        const value = e.target.value;
        setState({...state, description:value})
    }
    const addAndRefresh = async () => {
        const title = document.getElementById('title');
        const description = document.getElementById('description');

        if( title.value == '' || description.value == ''){
            alert('you need to fill all the form');
        }else{
            await addTask(state.title, state.description);
        }
        title.value = '';
        description.value = '';
        props.setUpdate(Math.random);
        props.setNotification('Task added!')
    }
    const updateAndRefresh = async () => {
        const title = document.getElementById('title');
        const description = document.getElementById('description');

        if( title.value == '' || description.value == ''){
            alert('you need to fill all the form');
        }else{

            // console.log(props.editingTask.id, props.editingTask.title, props.editingTask.description, false)
            await updateTask(props.editingTask.id, state.title, state.description, false).then(
                () => {
                    props.setUpdate(Math.random);
                    props.setNotification('Task edited!')
                }
            )
        }
        title.value = '';
        description.value = '';
    }
  return (
      <>
        <div className={styles.card}>
            <div className={styles.create_task_content}>
                <input 
                    id='title' 
                    className={styles.create_task} 
                    placeholder={!props.edit ? 'Title' : props.editingTask.title} 
                    maxLength={20} 
                    onChange={(e) => handleTitleChange(e)}/>
                <input 
                    id='description' 
                    className={styles.create_task} 
                    placeholder={!props.edit ? 'Description' : props.editingTask.description} 
                    maxLength={40} 
                    onChange={(e) => handleDescChange(e)}/>
                <div className={styles.add_button}>
                    {
                        !props.edit ?
                        <div className={styles.button_primary} onClick={() => addAndRefresh()}>
                            <AddIcon color='#fff' width='40px' height='40px' />
                        </div>
                        :
                        <div className={styles.button_primary} onClick={() => updateAndRefresh()}>
                            <EditIcon color='#fff' width='40px' height='40px' />
                        </div>
                    }
                </div>

            </div>
        </div>
      </>
  )
}

export default CreateTask;

const AddIcon = (props) => {
    return (<svg id="Layer_4" data-name="Layer 4" fill={props.color} width={props.width} height={props.height} viewBox="0 0 600 600"><polygon className="cls-1" points="482.35 266.84 333.16 266.84 333.16 117.65 266.84 117.65 266.84 266.84 117.65 266.84 117.65 333.16 266.84 333.16 266.84 482.35 333.16 482.35 333.16 333.16 482.35 333.16 482.35 266.84"/></svg>)
}
const EditIcon = (props) => {
    return (<svg id="Layer_4" data-name="Layer 4" fill={props.color} width={props.width} height={props.height} viewBox="0 0 600 600"><defs><style>.cls-1</style></defs><polygon className="cls-1" points="405.39 452.43 247.5 294.3 294.44 247.44 452.34 405.54 405.39 452.43"/><rect class="cls-1" x="166.19" y="159.32" width="66.31" height="79.87" transform="translate(-82.51 199.32) rotate(-45)"/></svg>
    
    )
}