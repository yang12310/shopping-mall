import React from 'react'
import UserMyPage from './UserMyPage'
import AdminMyPage from './AdminMyPage'
import { useSelector } from 'react-redux'


const Mypage = () => {

  const user = useSelector((state) => state.auth.user)
 
  return (
    <div>
      { user?.name === "admin" ? <AdminMyPage />  : <UserMyPage /> }
    </div>
   
  )
}

export default Mypage