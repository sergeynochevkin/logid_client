import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { NotificationContext } from '../..'
import './Notification.css'

const NotificationItem = observer(({ message, type, id }) => {
  const [width, setWidth] = useState(100)
  const [intervalId, setIntervalId] = useState(null)
  const [exit, setExit] = useState('')
  const { Notification } = useContext(NotificationContext)

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setWidth((prev) => {
        if (prev > 0) {
          return prev - 0.5
        }
        clearInterval(id)
        return prev
      })
    }, 100);
    setIntervalId(id)
  }

  useEffect(() => {
    handleStartTimer()
  }, [])

  useEffect(() => {
    if (width === 0) {
      handleCloseNotification()
    }
  }, [width])

  const handleCloseNotification = () => {
    setExit('exit')
    Notification.filterNotifications(id)
  }

  return (

    <div
      className={`notification_item ${type} ${exit}`}
    >
      <div
        className={`message`}
      >{message}</div>
      <div
        className={`bar ${type}`}
        style={{ width: `${width}%` }}
      ></div>
    </div>

  )
})

export default NotificationItem