import '../sass/Button.scss'

export default function Button({icon,hadleClick}) {
  return (
    <div className='button__box'>
        <button className="button" onClick={hadleClick}>{icon} </button>
        <div className='button__shadow' onClick={hadleClick}></div>
    </div>        
  )
}
