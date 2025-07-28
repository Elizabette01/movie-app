import { useState, useEffect } from 'react'

import hero from "/hero.png";
import Search from "./Components/Search";
import MovieCard from './Components/MovieCard';


// Base API URL and API KEY
    
  const API_BASE_URL = 'https://api.themoviedb.org/3';
  const API_KEY = import.meta.env.VITE_TMBD_API_KEY;

  const API_OPTIONS = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      accept: 'application/json',
    }
  }


const App = () => {

  // useStates
  const [ searchTerm, setSearchTerm ] = useState('');
  const [errorMessage, setErrorMessage] = useState('')


  // Function to make the API calls
  const fetchMovies = async () => {
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
       const response = await fetch(endpoint, API_OPTIONS);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    }
  }


  // useEffect to make our API call whenever the page loads
  useEffect(() => {

  }, []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src={hero} alt="movie poster" className="" />
          <h1>Find <span className="text-gradient">Movies</span> You will enjoy without the hassel</h1>
        </header>

        {/* Passing a useState into the component as a props */}
       <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      </div>

      <section className='all-movies'>
        <h2 className='text-center'>All Movies</h2>

        <ul className='w-[85%] mx-auto'>
        
        </ul>
          


      </section>     
      
    </main>
  )
}

export default App


