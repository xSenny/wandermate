
const Review = ({data}) => {
  return (
    <div className="w-full justify-center p-4 mt-3 border-2 border-primary rounded-xl">
      <p>De la: {data.creatorUsername}</p>
      <p>Stele: {data.stars}</p>
      <p>Mesaj: {data.content}</p>
    </div>
  )
}


const Reviews = ({allReviews}) => {
  return (
    <div>
      {allReviews.length > 0 && (
        <>
          <p className="text-6xl font-primary text-center text-primary my-10 px-3">Reviews</p>
          <div className="flex flex-col gap-8 px-10">
            {allReviews.map(data => <Review key={data.$id} data={data}/>)}
          </div>
      </>
      )} 
    </div>
  )
}

export default Reviews
