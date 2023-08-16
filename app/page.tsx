'use client'
import axios from 'axios'
import '../styles/Homepage.scss'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [users, setUsers] = useState([])
  console.log(users)

  useEffect(() => {
    const getUsers = async () => {
      try {
        await axios
          .get('https://easyops.onrender.com/api/users')
          .then((res) => {
            setUsers(res.data.users)
          })
        console.log('try')
      } catch (error) {
        console.log(error)
      }
    }
    getUsers()
  }, [])
  return (
    <div className="homepage">
      {users?.map((item: any, index) => (
        <div className="card" key={index}>
          <div
            className="details"
            onClick={() => router.push(`/customer_details/${item._id}`)}
          >
            <h2>Name: {`${item.firstName}  ${item.lastName}`}</h2>
            <p>Email: {item.email}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
