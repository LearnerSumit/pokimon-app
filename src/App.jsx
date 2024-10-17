import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredPokemon = pokemonData.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
      setPokemonData(response.data.results);
    };
    fetchData();
  }, []);
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto p-5">
          <h1 className="text-3xl font-bold text-center mb-5">Pokémon Search</h1>
  
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search Pokémon"
            className="w-full p-2 mb-5 border border-gray-400 rounded-lg"
          />
  
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredPokemon.map((pokemon, index) => (
              <div key={index} className="bg-white customeShadow rounded-lg p-5 text-center">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`}
                  alt={pokemon.name}
                  className="mx-auto"
                />
                <h2 className="text-lg font-bold capitalize">{pokemon.name}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  


export default App
