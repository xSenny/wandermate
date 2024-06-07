import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { getUserData } from '../lib/appwrite'
import { Button } from '@material-tailwind/react'

const Profile = () => {
  const {id} = useParams()
  const {user} = useAuth();
  const navigate = useNavigate()
  const [data, setData] = useState({
    avatar: ''
  })

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])

  
  const fetchData = async () => {
    const uData = await getUserData(id)
    setData(uData)
  }
  return (
    <>
      {data !== null && (
        <>
          <div className='w-full h-screen bg-gray-300 flex flex-col'>
          <div className='w-full h-[70%] flex flex-row'>
            <div className='h-full w-[40%] flex justify-center items-center'>
              <img src={data.avatar} alt="" className='w-[80%] md:w-[40%] rounded-full ' />
            </div>
            <div className='h-full w-[60%] flex justify-center items-center flex-col '>
              <p className='text-2xl font-bold'>Nume: {data.username}</p>
              <p className='text-3xl font-bold'>Regiunea: {data.region}</p>
            </div>
          </div>
          {id === user.$id && (
            <div className='display: flex justify-evenly items-center'>
              <Button onClick={() => navigate('/onboarding')}>Editeaza-ti profilul</Button>
              <Button onClick={() => navigate('/messages')} variant='outlined' color='green'>Mesaje</Button>
            </div>
          )} 
        </div>
        </>
      )}
    </>
  )
}

export default Profile
