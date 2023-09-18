import '../sass/Card.scss'

export default function Card({name, img}) {
  return (
  
    <div className="card">
        <p className="card__name">{name}</p>
        <div className="card__circle"></div>
        <img className="card__img" src={img} alt={name}/>
    </div>
  )
}
