// import { useState } from 'react'
import React from 'react';

import hero from "/hero.png";
import Search from "./Components/Search";
import MovieCard from './Components/MovieCard';

const App = () => {

  // useStates
   const [ searchTerm, setSearchTerm ] = useState('');

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


