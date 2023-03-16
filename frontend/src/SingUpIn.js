import React from 'react'
import Registration from './features/users/Registration'
import Login from './features/auth/Login'

const SingUpIn = () => {
  return (
    <div className="container">
      <input type="checkbox" id="hidden-btn" />
      <Registration />
      <Login />
    </div>
  )
}

export default SingUpIn