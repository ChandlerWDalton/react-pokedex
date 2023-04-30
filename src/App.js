import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [selPokemon, setSelPokemon] = useState();
  const [favorites, setFavorites] = useState([]);
  const types = [
    'bug',
    'dragon',
    'electric',
    'fighting',
    'fire',
    'flying',
    'ghost',
    'grass',
    'ground',
    'ice',
    'normal',
    'poison',
    'psychic',
    'rock',
    'water',
    'dark',
    'steel',
    'fairy'
  ];

  useEffect(() => {
    async function getData() {
      try {
        const retrievedpokemon = await getPokemon();
        console.log(retrievedpokemon)
        setPokemon(retrievedpokemon);
        setFilteredPokemon(retrievedpokemon);

      } catch (err) {
        console.error('Error retreiving pokemon', err);
      }
    }
    getData();
  }, [])

  async function getPokemon() {
    let HoennPokemon = []
    for (let i = 252; i <= 386; i++) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        const pokemonData = await response.json();
        HoennPokemon.push(pokemonData);
      } catch (err) {
        console.error('Error getting pokemon', err)
      }
    }
    return HoennPokemon

  }

  const filterPokemon = (type) => () => {
    setFilteredPokemon(pokemon.filter(x => {
      if (x.types.filter(e => e.type.name === type).length > 0) {
        return true
      }
    }));
  }

  function viewFavorites() {
    setFilteredPokemon(pokemon.filter(pokemon => {
      if(favorites.includes(pokemon.name))
      {
        return true
      }
    }))
  }

  const handleSelPokemon = (pokemon) => () => {
    setSelPokemon(pokemon)
  }

  function resetFilter(){
    setFilteredPokemon(pokemon)
  }

  function handleAddFavorite(){
    setFavorites([selPokemon.name, ...favorites])
  }

  function removeFavorite(){
    setFavorites(favorites.filter(favorite => favorite !== selPokemon.name))
  }

  return (
    <main>
       <div classNameName="App">
      <h1>Hoenn Dex</h1>
      <div classNameName="body">
      {selPokemon && <div className="selPokemon">
          <div className="selPokemon-images">
            <img className="sel-Image" src={selPokemon.sprites.front_default} alt="front sprite" />

            {!favorites.includes(selPokemon.name) && <a>
              <svg onClick={handleAddFavorite} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="m-4 inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </a>}
            {favorites.includes(selPokemon.name) && <a>
              <svg onClick={removeFavorite} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="m-4 inline-block w-8 h-8 stroke-current fill-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </a>}
          </div>
          <h3>{selPokemon.name}</h3>
          <p># {selPokemon.id}</p>
          <p>Height: {selPokemon.height} M</p>
          <p>Weight: {selPokemon.weight} KG</p>
        </div>}
        <div className="allPokemon">
          <div className="filter-nav">
            {types.map(e =>
              <button onClick={filterPokemon(e)}>{e}</button>
            )}
            <button onClick={viewFavorites}>FAVORITED</button>
            <button onClick={resetFilter}>RESET</button>
          </div>
          <ul>
            {filteredPokemon.map(item =>
              <li key={item.name}>
                <div onClick={handleSelPokemon(item)}>
                  <img className="rounded-box btn bg-secondary h-24" src={item.sprites.front_default} alt="front sprite" />
                  <a href={item.url}>{item.name}</a>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>

    </main>
  );
}

export default App;
