import { useNavigate } from 'react-router-dom'
import filledStar from '../assets/icons/filledStar.png'

const LocationContainer = ({location}) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/business/${location.$id}`)} className='cursor-pointer'>
      <div className="bg-gray-300 h-96">
        <div className="h-12 flex justify-center px-5 items-center">
          <p className="text-lg font-secondary">{location.name}</p>
        </div>
        <img src={location.thumbnail} alt="" className="h-full w-full object-cover"/>
      </div>
      <div className="h-12 flex items-center px-4 bg-gray-300 flex-row z-2 relative">
        <p>{location.review || `5.0`}</p>
        <img src={filledStar} alt="" className='h-7 w-7' />
      </div>
    </div>
  )
}

export default LocationContainer
