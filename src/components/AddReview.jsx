import { Button, Textarea } from "@material-tailwind/react"
import { useState } from "react"
import emptyStar from '../assets/icons/emptyStar.png'
import filledStar from '../assets/icons/filledStar.png'
import { createReview } from "../lib/appwrite"
import { useNavigate } from "react-router-dom"

const AddReview = ({user, businessId}) => {

  const [review, setReview] = useState({
    content: '',
    stars: 0,
  })

  const handlePost = async () => {
    if (review.content === '' || review.stars === 0) {
      alert('Nu ai completat review-ul')
      return;
    }
    try {
      await createReview(businessId, review.content, review.stars, user.$id, user.name)
      window.location.reload();
    } catch(e) {
      alert(e)
    }
  }

  return (
    <div className="w-full flex justify-center flex-col items-center">
      <p className="text-6xl font-primary text-center text-primary my-10 px-3">Adauga un review</p>
      <div className="flex w-[90%] flex-col gap-6">
        <Textarea value={review.content} onChange={(val) => setReview(review => ({...review, content: val.target.value}))} rows={10} color="green" label="Review" />
      </div>
      <div className="flex justify-evenly flex-row mt-10 gap-4 mb-10">
        <img className="cursor-pointer" src={review.stars < 1 ? emptyStar : filledStar} alt="" onClick={() => setReview(review => ({...review, stars: 1}))}/>
        <img className="cursor-pointer" src={review.stars < 2 ? emptyStar : filledStar} alt="" onClick={() => setReview(review => ({...review, stars: 2}))}/>
        <img className="cursor-pointer" src={review.stars < 3 ? emptyStar : filledStar} alt="" onClick={() => setReview(review => ({...review, stars: 3}))}/>
        <img className="cursor-pointer" src={review.stars < 4 ? emptyStar : filledStar} alt="" onClick={() => setReview(review => ({...review, stars: 4}))}/>
        <img className="cursor-pointer" src={review.stars < 5 ? emptyStar : filledStar} alt="" onClick={() => setReview(review => ({...review, stars: 5}))}/>
      </div>
      <Button variant='gradient' className="mb-10" color="green" onClick={handlePost}>Posteaza</Button>
    </div>
  )
}

export default AddReview
