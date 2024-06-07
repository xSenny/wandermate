import { useEffect, useState } from "react"
import { useAuth } from "../lib/AuthContext"
import { getMessageChannels } from "../lib/appwrite"
import { useNavigate } from "react-router-dom"

const Messages = () => {

  const {user} = useAuth()
  const navigate = useNavigate()

  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const messageChannels = await getMessageChannels(user.$id)
      setData(messageChannels)
    } catch (e) {
      alert(e)
    }
  }

  const handleChangeConversation = (id) => {
    navigate(`/messages/${id}`)
  }

  return (
    <div className="min-h-[100vh] w-full bg-gray-300 p-4">
      <div className="h-20 bg-gray-400 px justify-center items-center flex">
        <p className="font-primary text-3xl">Conversatii</p>
      </div>
      {data.length > 0 && (
        <>
          {data.map(item => (
            <div onClick={() => handleChangeConversation(item.getterId === user.$id ? item.senderId : item.getterId)} key={item.getterId === user.$id ? item.senderName : item.getterName} className=" bg-gray-400 cursor-pointer w-full h-24 mt-8 justify-center items-center flex">
              <p className="text-2xl font-secondary">{`${item.getterId === user.$id ? item.senderName : item.getterName}`}</p>
            </div>
          ))}
        </>
    )}
    </div>
  )
}

export default Messages
