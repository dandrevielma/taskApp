import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'
import Task from '../components/Task/Task'
import CreateTask from '../components/CreateTask/CreateTask'
const { showTasks, deleteTask } = require('../db/index');


export default function Home() {

  const [tasks,setTasks] = useState([])
  const [currentTaskList, setCurrentTaskList] = useState('pending');
  const [tasksDone, setTasksDone] = useState(0);
  const [tasksPending, setTasksPending] = useState(0);
  const [update, setUpdate] = useState(0)

  const handleCurrentTaskList = (current) => {
    setCurrentTaskList(current)
  }
  const getTasksStatus = () => {
      setTasksDone(tasks.filter(task => task.finished == true).length)
      setTasksPending(tasks.filter(task => task.finished == false).length)
  }
  let currentList = currentTaskList == 'pending' ? tasks.filter(task => task.finished == false) : tasks.filter(task => task.finished == true)

  useEffect( () => {
    getTasksStatus()
  })
  const updateTasks = () => {
    showTasks().then(({tasksList}) => {setTasks(tasksList.items)})
  }
  useEffect( () => {
    updateTasks()
    currentList = currentTaskList == 'pending' ? tasks.filter(task => task.finished == false) : tasks.filter(task => task.finished == true);

  },[update])

  
  
  return (
    <>
      <div className={styles.bg}>
        <div className={styles.top_section}>
          <div className={styles.title}>
            You have
            <span className={styles.text_purple}>
            &nbsp; {tasksPending} &nbsp;
            </span>
            tasks pending
          </div>
          <div className={styles.rounded_title}>
            <span className={styles.text_purple}>
            {tasksDone} &nbsp;
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
                  <li className={currentTaskList == 'pending' ? styles.purple : null}>
                    <a className={styles.current_task_list_selector} onClick={() => handleCurrentTaskList('pending')}>
                      Pending
                    </a>
                  </li>
                  <li className={currentTaskList == 'done' ? styles.purple : null}>
                    <a className={styles.current_task_list_selector} onClick={() => handleCurrentTaskList('done')}>
                      Done
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.tasks}>
              {
                currentList.map((task, index) => {
                  return(
                    <Task
                      title={task.title}
                      finished={task.finished}
                      updating={setUpdate}
                      description={task.description}
                      key={task.id}
                      id={task.id}
                      delete={deleteTask}
                      getTasksStatus={getTasksStatus}
                      />
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
