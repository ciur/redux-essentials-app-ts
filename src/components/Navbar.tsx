import { useAppDispatch, useAppSelector } from '@/app/hooks'

import { logout } from '@/features/auth/authSlice'
import { selectCurrentUser } from '@/features/users/usersSlice'
import {
  fetchNotificationsWebsocket,
  selectUnreadNotificationsCount,
  useGetNotificationsQuery
} from '@/features/notifications/notificationsSlice'

import { UserIcon } from './UserIcon'
import { Link} from 'react-router-dom'
import React from 'react'

export const Navbar = () => {

  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUser)
  const numUnreadNotifications = useAppSelector(selectUnreadNotificationsCount)


  const isLoggedIn = !!user

  let navContent: React.ReactNode = null
  useGetNotificationsQuery()

  if (isLoggedIn) {
    const onLogoutClicked = () => {
      dispatch(logout())
    }

    const fetchNewNotifications = () => {
      dispatch(fetchNotificationsWebsocket())
    }

    // Trigger initial fetch of notifications and keep the websocket open to receive update

    let unreadNotificationsBadge: React.ReactNode | undefined

    if (numUnreadNotifications > 0) {
      unreadNotificationsBadge = (
        <span className="badge">{numUnreadNotifications}</span>
      )
    }

    navContent = (
      <div className="navContent">
        <div className="navLinks">
          <Link to="/posts">Posts</Link>
          <Link to="/users">Users</Link>
          <Link to="/notifications">Notifications {unreadNotificationsBadge}</Link>
          <button className="button small" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
        <div className="userDetails">
          <UserIcon size={32} />
          {user.name}
          <button className="button small" onClick={onLogoutClicked}>
            Log Out
          </button>
        </div>
      </div>
    )
  }

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          {navContent}
        </div>
      </section>
    </nav>
  )
}
