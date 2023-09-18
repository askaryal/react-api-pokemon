import { useState, useEffect } from 'react'
import Btn from './components/Button'
import Card from './components/Card'
import './sass/App.scss'
import './sass/index.scss'
import { TiArrowLeftOutline,TiArrowRightOutline } from "react-icons/ti";


function App() {
const [isLoading, setIsLoading] = useState(true);
const [number, setNumber] = useState(1)
const [pokemones, setPokemones] = useState('')


function previous(){
  setNumber(number - 1);
}
function next(){
  setNumber(number + 1);
}

let searchPokemon = async itemNumber => {
  try {    
  const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${itemNumber}`)
  const items =  await response.json();
    let pokemnEvoArray = [];
    let pokemnLv1 = items.chain.species.name;
    let pokemnLv1Img = await searchPokemonImg(pokemnLv1);
    pokemnEvoArray.push([pokemnLv1, pokemnLv1Img]);
    
    if(items.chain.evolves_to.length !==0 ){
      let pokemnLv2 = items.chain.evolves_to[0].species.name;
      let pokemnLv2Img = await searchPokemonImg(pokemnLv2);
      pokemnEvoArray.push([pokemnLv2, pokemnLv2Img]);

      if(items.chain.evolves_to[0].evolves_to.length !==0 ){
        let pokemnLv3 = items.chain.evolves_to[0].evolves_to[0].species.name;
        let pokemnLv3Img = await searchPokemonImg(pokemnLv3);
        pokemnEvoArray.push([pokemnLv3, pokemnLv3Img]);
      }
    }
   
    setPokemones(pokemnEvoArray);
    setIsLoading(false);
  } catch (error) {
    console.log('Hubo un problema con la petición Fetch:' + error.message);
  }
}
let searchPokemonImg = async name => {
  try {    
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  const items =  await response.json();
 
  return items.sprites.other['official-artwork'].front_default;

  } catch (error) {
    console.log('Hubo un problema con la petición Fetch:' + error.message);
  }
}
useEffect(() => {
  searchPokemon(number)

}, [number])

if (isLoading) { // ⬅️ si está cargando, mostramos un texto que lo indique
  return (
    <div className="App">
      <h1>Cargando...</h1>
    </div>
  );
}
  return (
  <div className='app'>
    <div className={`card-container card${pokemones.length}`}> 
    {
    pokemones.map((pokemon) => 
      <Card 
        key = {pokemon[0]}
        name = {pokemon[0]}
        img = {pokemon[1]}
      />
    )}                
    {/*<p> page {number}</p>*/}
    </div>
    
      <div className='buttons-container'>
      
        <Btn 
          icon={<TiArrowLeftOutline/>} 
          hadleClick={previous}
        />
        <Btn 
          icon={<TiArrowRightOutline/>} 
          hadleClick={next}
        />  
      </div>  
    </div>
  )
}

export default App
