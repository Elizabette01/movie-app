// import { useState } from 'react'
import './App.css';

import React from 'react';
import hero from "/hero.png";

const App = () => {
  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src={hero} alt="movie poster" className="" />
          <h1>Find <span className="text-gradient">Movies</span> You will enjoy without the hassel</h1>
          
        </header>

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


