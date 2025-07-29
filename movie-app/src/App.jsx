import { useState, useEffect } from 'react';
import {useDebounce} from 'react-use';


import hero from "/hero.png";
import Search from "./Components/Search";
import MovieCard from './Components/MovieCard';
import LoadingCard from './Components/Loading';


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
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ movies, setMovies ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce the search term to prevent making too many API calls
  // by waiting for the user to stop typing fro 1sec
  useDebounce(() => setDebouncedSearch(searchTerm), 1000, [searchTerm])

  // Function to make the API calls
  const fetchMovies = async (query = '') => {

    setLoading(true)

    try {
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if(!response.ok) {
        throw new Error('Failed to fetch movies')
      }

      const data = await response.json();


      if(data.Response === 'False'){
        setErrorMessage( data.Error || 'Failed to fetch movies' );
        setMovies([])
        return;
      }

       setMovies(data.results || [])

    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');


    } finally {
      setLoading(false)
    }
  }


  // useEffect to make our API call whenever the page loads
  useEffect(() => {
    fetchMovies(debouncedSearch);
  }, [debouncedSearch]);

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
        <h2 className='text-center mb-14 mt-7 text-2xl font-bold text-white sm:text-3xl'>All Movies</h2>
        
         {loading ? (
          <ul className="w-[85%] mx-auto">
            {Array.from({length: 20}).map((_, index) => (
              <LoadingCard key={index} />
            ))}
          </ul>
        ) : errorMessage ? 
          ( <p className='text-purple-300 text-center'>{errorMessage}</p>
          ) : (
            <ul className='w-[85%] mx-auto'>
              {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          ) }

          


      </section>     
      
    </main>
  )
}

export default App


