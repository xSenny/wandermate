import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../lib/AuthContext"
import { getMessagesFromChannel } from "../lib/appwrite"
import back from '../assets/icons/back.png'

const Conversation = () => {
  const {id} = useParams()

  const [data, setData] = useState({
    messagesReceived: [],
    messagesSent: [],
    totalMessages: [],
  })

  const {user} = useAuth()
  useEffect(() => {
    fetchData()
  }, [])
  const navigate = useNavigate()

  const fetchData = async () => {
    const messages = await getMessagesFromChannel(user.$id, id);
    setData(messages)
  }

  const handleBack = () => {
    navigate('/messages')
  }

  return (
    <>
      <header className="top-0 left-0 w-full flex justify-between items-center h-20 px-6">
        <img onClick={handleBack} src={back} alt="" className="cursor-pointer"/>
      </header>
    <div className="p-4">
      {data.totalMessages.map((item) => (
        <div key={item.getterId === user.$id ? item.senderName : item.getterName} className="bg-gray-400 w-full flex-col mb-8 py-10 rounded-lg flex justify-center items-center">
          <p className="text-center">{`${item.senderId === user.$id ? 'Tu l-ai invitat pe ' + item.getterName + ' la o vizita pe data de: ' + item.date : item.senderName + ' te-a invitat pe tine la o vizita pe data de: ' + item.date}`}</p>
          <p onClick={() => navigate(`/business/${item.businessId}`)} className="cursor-pointer text-center text-white~">Click pentru a vedea detalii despre locatie</p>
        </div>
      ))}
    </div>
    </>
  )
}

export default Conversation
