import { useState, useEffect } from 'react'

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
  const [errorMessage, setErrorMessage] = useState('');
  const [ movies, setMovies ] = useState([]);
  const [loading, setLoading] = useState(false);


  // Function to make the API calls
  const fetchMovies = async () => {

    setLoading(true)

    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
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
    fetchMovies();
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
        <h2 className='text-center mb-14 mt-7'>All Movies</h2>

         {loading ? (
          <ul className="w-[85%] mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-10">
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


