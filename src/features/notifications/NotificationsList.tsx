import { useLayoutEffect } from 'react'
import classnames from 'classnames'
import { useAppSelector, useAppDispatch } from '@/app/hooks'

import { TimeAgo } from '@/components/TimeAgo'

import { PostAuthor } from '@/features/posts/PostAuthor'

import { allNotificationsRead, useGetNotificationsQuery, selectMetadataEntities } from './notificationsSlice'

export const NotificationsList = () => {
  const { data: notifications = [] } = useGetNotificationsQuery()
  const notificationsMetadata = useAppSelector(selectMetadataEntities)
  const dispatch = useAppDispatch()
  //const notifications = useAppSelector(selectAllNotifications)

  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })

  const renderedNotifications = notifications.map(notification => {
    const metadata = notificationsMetadata[notification.id]
    const notificationClassname = classnames('notification', {
      // re-enable the `isNew` check for styling
      new: metadata.isNew,
    })

    return (
      <div key={notification.id} className={notificationClassname}>
        <div>
          <b>
            <PostAuthor userId={notification.user} showPrefix={false} />
          </b>{' '}
          {notification.message}
        </div>
        <TimeAgo timestamp={notification.date} />
      </div>
    )
  })

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}
