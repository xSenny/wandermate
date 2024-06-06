import { useNavigate, useParams } from "react-router-dom"
import { getAllReviews, getBusinessById } from "../lib/appwrite"
import { useEffect, useState } from "react"
import back from '../assets/icons/back.png'
import Loader from "../components/Loader"
import contact from "../assets/icons/contact.png"

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
} from "@material-tailwind/react";
import Reviews from "../components/Reviews"
import AddReview from "../components/AddReview"
import { useAuth } from "../lib/AuthContext"

const Business = () => {
  const {id} = useParams()
  const {user} = useAuth()

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([])
  const [open, setOpen] = useState(false);
  const [reviews, setReviews] = useState([])

  const handleOpen = () => setOpen((cur) => !cur);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData()
    fetchReviews()
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])


  const fetchData = async () => {
    setLoading(true)
    try {
      const business = await getBusinessById(id)
      setData(business)
      setImages(JSON.parse(business.images))
    } catch (e) {
      alert(e)
    } finally {
      setLoading(false)
    }
  }

  const fetchReviews = async () => {
    setLoading(true)
    try {
      const reviews = await getAllReviews(id)
      setReviews(reviews)
    } catch(e) {
      alert(e)
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {navigate('/home')}

  return (
    <div>
      <header className="top-0 left-0 w-full flex justify-between items-center h-20 px-6">
        <img onClick={handleBack} src={back} alt="" className="cursor-pointer"/>
        <button onClick={() => navigate(`/business/${id}/find`)}>Gaseste-ti un coleg!</button>
      </header>
      <div className="w-full flex justify-between px-6">
        <p className="font-primary text-3xl">{data.name}</p>
        <img onClick={handleOpen} src={contact} className="cursor-pointer"/>
      </div>
      <div className="overflow-x-scroll mt-6 flex flex-row gap-6 ml-6 scrollbar-hide">
        {images.map(e => (
          <img key={e} src={e} className="h-80"/>
        ))}
      </div>
      <p className="text-center mt-10">{data.description}</p>
      <div className="w-full justify-center flex mt-6" dangerouslySetInnerHTML={{ __html: data.googlemaps }}></div>
      <Reviews allReviews={reviews}/>
      <AddReview businessId={id} user={user} />
      <Loader isLoading={loading}/>
      <Dialog className="p-4" size="md" open={open} handler={handleOpen}>
        <DialogHeader className="justify-between">
          Detalii de contact
        </DialogHeader>
        <DialogBody className="overflow-y-scroll scrollbar-hide">
          <Typography color="blue-gray" className="mb-1 font-bold">
            Email:
          </Typography>
          <Typography
            variant="paragraph"
            className="font-normal text-gray-600 max-w-lg"
          >
            {data.email}
          </Typography>
          <Typography color="blue-gray" className="mb-1 font-bold">
            Numar de telefon:
          </Typography>
          <Typography
            variant="paragraph"
            className="font-normal text-gray-600 max-w-lg"
          >
            {data.phoneNumber}
          </Typography>
          <Button onClick={handleOpen} color="green" className="w-full mt-10">Inchide</Button>
        </DialogBody>
      </Dialog>
    </div>
  )
}

export default Business
