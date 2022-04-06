import { updateTask } from '../../db/index';
import { useState } from 'react';
import styles from './Card.module.css'
import axios from 'axios'

const Task = (props) => {
    const [done, setDone] = useState(false);
    const updatingDelete = async () => {
        await props.delete(props.id);
        props.setUpdate(Math.random)
        props.getTasksStatus()
        props.setNotification('Task deleted!')

    }
    const updatingFinish = async () => {
        await axios.post('https://api.8base.com/ckymbkwiz02w709mm5haec39s/webhook/webhook', {
            id: props.id,
            finished: !props.finished
          })
        props.setUpdate(Math.random)
        props.getTasksStatus()
        setDone(true);
        props.setNotification('Task done!')

    }
    
  return (
    <>
        <div data-testid="task" className={styles.card}>
            <div className={styles.title}>
                {props.title}
            </div>
            <div className={styles.description}>
                {props.description}
            </div>
            <div className={styles.buttons}>
                <div className={styles.button_secondary} onClick={() => updatingDelete()}><DeleteIcon color='#9500f9' width='40px' height='40px' /></div>
                {
                    props.currentTaskList == 'pending' ?
                    <div className={styles.buttons_2}>
                        <div className={styles.button_secondary}><EditIcon color='#9500f9' width='40px' height='40px' /></div>
                        <div className={styles.button_primary} onClick={() => updatingFinish()}><CheckIcon color='#fff' width='40px' height='40px' /></div>
                    </div>
                    : null
                }
            </div>
        </div>
    </>
  );
}

export default Task;

const DeleteIcon = (props) => {
    return (<svg id="Layer_4" data-name="Layer 4" fill={props.color} width={props.width} height={props.height} viewBox="0 0 600 600"><polygon class="cls-1" points="452.39 194.51 405.5 147.63 300 253.11 194.5 147.63 147.61 194.51 253.11 300 147.61 405.49 194.5 452.38 300 346.89 405.5 452.38 452.39 405.49 346.89 300 452.39 194.51"/></svg>)
}
const EditIcon = (props) => {
    return (<svg id="Layer_4" data-name="Layer 4" fill={props.color} width={props.width} height={props.height} viewBox="0 0 600 600"><defs><style>.cls-1</style></defs><polygon class="cls-1" points="405.39 452.43 247.5 294.3 294.44 247.44 452.34 405.54 405.39 452.43"/><rect class="cls-1" x="166.19" y="159.32" width="66.31" height="79.87" transform="translate(-82.51 199.32) rotate(-45)"/></svg>
    
    )
}
const CheckIcon = (props) => {
    return (<svg id="Layer_4" data-name="Layer 4" fill={props.color} width={props.width} height={props.height} viewBox="0 0 600 600"><defs><style>.cls-1</style></defs><polygon class="cls-1" points="227.94 456.88 128.65 357.58 175.54 310.69 227.94 363.1 424.46 166.58 471.35 213.47 227.94 456.88"/></svg>)
}