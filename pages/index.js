import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'
import Task from '../components/Task/Task'
import CreateTask from '../components/CreateTask/CreateTask'
const { showTasks, finishTask, deleteTask } = require('../db/index');


export default function Home() {

  const [tasks,setTasks] = useState([])
  const [update, setUpdate] = useState(0)
  useEffect( () => {
    showTasks().then(({tasksList}) => {setTasks(tasksList.items)})
  },[update])
  

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.top_section}>
          <div className={styles.title}>
            You have
            <span className={styles.text_purple}>
            &nbsp; 3 &nbsp;
            </span>
            tasks pending
          </div>
          <div className={styles.rounded_title}>
            <span className={styles.text_purple}>
            3 &nbsp;
            </span>
            tasks done
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.left_content}>
            <div className={styles.section_head}>
              <div className={styles.secondary_title}>
                Create a new task
              </div>
            </div>
            <div className={styles.new_task}>
              <CreateTask updating={setUpdate} />

            </div>
          </div>
          <div className={styles.right_content}>
            <div className={styles.section_head}>
              <div className={styles.secondary_title}>
                My tasks
              </div>
              <div>
                <ul className={styles.select_status}>
                  <li>Pending</li>
                  <li>Done</li>
                </ul>
              </div>
            </div>
            <div className={styles.tasks}>
              {
                tasks.map((task, index) => {
                  return(
                    <Task
                      title={task.title}
                      updating={setUpdate}
                      description={task.description}
                      key={task.id}
                      id={task.id}
                      delete={deleteTask}
                      finish={finishTask}/>
                  )
                })
              }
            </div> 
          </div>
        </div>
      </div>
    </>
  )
}
