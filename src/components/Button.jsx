
const Button = ({text, className, onClick}) => {
  return (
    <button onClick={onClick} className={`w-full border-solid border-2 border-primary rounded-md p-2 bg-secondary  text-[#000] ${className}`}>{text}</button>
  )
}

export default Button
