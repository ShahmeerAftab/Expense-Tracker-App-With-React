interface ButtonAppType{
    onClick:()=>void,
    text:string
}

const Button = ({text,onClick}:ButtonAppType) => {
  return (
    <div className="bg-emerald-600 text-center hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500">
      <button onClick={onClick}>{text}</button>
    </div>
  )
}

export default Button
