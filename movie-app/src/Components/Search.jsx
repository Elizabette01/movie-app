
const Search = ( { searchTerm, setSearchTerm } ) => {
  return (
    <div className="search ">
      <input 
        type="text" 
        placeholder="Search Movies"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        
      />

      <img src="search.svg" alt="Search Icon" />
    </div>
  )
}

export default Search