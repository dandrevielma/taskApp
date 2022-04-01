import {useState} from 'react';
import styles from '../Task/Card.module.css';
const { addTask } = require('../../db/index');

const CreateTask = (props) => {
    const [state, setState] = useState({
        title: '',
        description:''
    });
    const handleTitleChange = (e) => {
        const value = e.target.value;
        setState({...state, title:value})
        console.log(value);
    }
    const handleDescChange = (e) => {
        const value = e.target.value;
        setState({...state, description:value})
        console.log(value);
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
        props.updating(Math.random);
    }
  return (
      <>
        <div className={styles.card}>
            <div className={styles.create_task_content}>
                <input 
                    id='title' 
                    className={styles.create_task} 
                    placeholder='Title' 
                    maxLength={20} 
                    onChange={(e) => handleTitleChange(e)}/>
                <input 
                    id='description' 
                    className={styles.create_task} 
                    placeholder='Description' 
                    maxLength={40} 
                    onChange={(e) => handleDescChange(e)}/>
                <div className={styles.add_button}>
                    <div className={styles.button_primary} onClick={() => addAndRefresh()}>
                            <AddIcon color='#fff' width='40px' height='40px' />
                    </div>
                </div>

            </div>
        </div>
      </>
  )
}

export default CreateTask;

const AddIcon = (props) => {
    return (<svg id="Layer_4" data-name="Layer 4" fill={props.color} width={props.width} height={props.height} viewBox="0 0 600 600"><polygon class="cls-1" points="482.35 266.84 333.16 266.84 333.16 117.65 266.84 117.65 266.84 266.84 117.65 266.84 117.65 333.16 266.84 333.16 266.84 482.35 333.16 482.35 333.16 333.16 482.35 333.16 482.35 266.84"/></svg>)
}
