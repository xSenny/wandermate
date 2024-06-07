import { useEffect, useState } from "react"
import Header from "../components/Header"
import { useAuth } from "../lib/AuthContext"
import { getBusinessesByCriteria, getUserAvatar } from "../lib/appwrite"
import Loader from "../components/Loader"
import LocationContainer from "../components/LocationContainer"

const Home = () => {

  const {user} = useAuth()
  const [avatar, setAvatar] = useState('')
  const [loading, setLoading] = useState(false)

  const [businesses, setBusinesses] = useState([])

  useEffect(() => {
    fetchAvatar()
    searchBusinesses('', '')
  }, [])

  useEffect(() => {
    console.log(businesses)
  }, [businesses])

  const fetchAvatar = async () => {
    const avatar = await getUserAvatar(user.$id)
    setAvatar(avatar)
  }

  const searchBusinesses = async (region, type) => {
    setLoading(true)
    try {
      const fetched = await getBusinessesByCriteria(type, region)
      setBusinesses(fetched.documents)
    } catch(e) {
      alert(e)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div>
      <Header avatar={avatar} searchBusinesses={searchBusinesses}/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 lg:p-20 gap-3">
        {businesses.map(item => (
          <LocationContainer location={item} key={item.$id}/>
        ))}
      </div>
      <Loader isLoading={loading}/>
    </div>
  )
}

export default Home
