import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'
import Task from '../components/Task/Task'
import CreateEdit from '../components/CreateEdit.js/CreateEdit'
import Notification from '../components/Notification/Notification'
import Head from 'next/head'

const { showTasks, deleteTask } = require('../db/index');

export default function Home() {
  const [tasks,setTasks] = useState([])
  const [currentTaskList, setCurrentTaskList] = useState('pending');
  const [tasksDone, setTasksDone] = useState(0);
  const [tasksPending, setTasksPending] = useState(0);
  const [update, setUpdate] = useState(0)
  const [notification, setNotification] = useState('');
  const [edit, setEditMode] = useState(false);
  const [editingTask, setEditingTask] = useState({});

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
      <Head>
        <title>Task App</title>
        <meta name="Task Application - Organize your tasks"/>
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
      <div className={styles.bg}>
      { notification != '' ?
        <Notification
          info={notification}
          setNotification={setNotification}
        />
        : null
      }
        <div className={styles.top_section}>
          <div className={styles.title}>
            You have
            <span className={styles.text_purple}>
            &nbsp; {tasksPending} &nbsp;
            </span>
            {tasksPending != 1 ? 'tasks pending' : 'task pending'}

          </div>
          <div className={styles.rounded_title} onClick={() => {  setNotification(Math.random)}}>
            <span className={styles.text_purple}>
            {tasksDone} &nbsp;
            </span>
            {tasksDone != 1 ? 'tasks done' : 'task done'}
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.left_content}>
            <div className={styles.section_head}>
              <div className={styles.secondary_title}>
                {
                  !edit ? 'Create a new task'
                  : 'Edit task'
                }
              </div>
            </div>
            <div className={styles.new_task}>
              <CreateEdit 
                setUpdate={setUpdate}
                setNotification={setNotification}
                edit={edit}
                setEditMode={setEditMode}
                editingTask={editingTask}
              />
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
                      setUpdate={setUpdate}
                      description={task.description}
                      key={task.id}
                      id={task.id}
                      delete={deleteTask}
                      getTasksStatus={getTasksStatus}
                      currentTaskList={currentTaskList}
                      setNotification={setNotification}
                      editingTask={editingTask}
                      setEditingTask={setEditingTask}
                      setEditMode={setEditMode}
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
