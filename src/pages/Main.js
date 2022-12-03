import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { NotificationContext } from '..'
import MainBanner from '../components/ui/banner/MainBanner'
import  PageContainer  from '../components/ui/page/PageContainer'
import { v4 } from "uuid";
import { deleteNotification, fetchNotification } from '../http/notificationApi'

const Main = observer(() => {
  const { Notification } = useContext(NotificationContext)

  const queryParams = new URLSearchParams(window.location.search)
  const uuid = queryParams.get("uuid")  

  useEffect(() => {
    async function handleUrlNotification() {
      let notification = await fetchNotification(uuid)
      Notification.addNotification([{ id: v4(), type: notification.type, message: notification.message }])
      await deleteNotification(notification.id)
    }
    if (uuid) {
      handleUrlNotification()
    }
  }, [])

  return (
    <PageContainer>
      <title>logid</title>
      <MainBanner />
    </PageContainer>
  )
})

export default Main