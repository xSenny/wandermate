import ReactLoading from "react-loading";

const Loader = ({isLoading}) => {
  if (!isLoading) return null
  return (
    <div className="absolute flex justify-center items-center w-screen h-screen bg-primary/60 z-10 top-0 left-0">
      <ReactLoading type="bubbles"/>
    </div>
  )
}

export default Loader
