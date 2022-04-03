import React, {useEffect, useState} from 'react'
import styles from './Notification.module.css'


export default function Notification({info, notification}) {
    const [status, setStatus] = useState('');
    useEffect( () => {
        setStatus(styles.slide_in_top);
        setTimeout(() => {
            setStatus(styles.fade_in)
        }, 2000);
    },[info])
  return (
    <div className={status == '' ? null : status}>
        <div className={styles.notification_box}>
            <span className={styles.notification_info}>
                {info}
            </span>
        </div>
    </div>
  )
}
