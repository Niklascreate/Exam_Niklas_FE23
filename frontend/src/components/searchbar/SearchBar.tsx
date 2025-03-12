import "./searchbar.css";

function SearchBar() {
  return (
    <div className="search-container">
      <input type="text" className="search-input" placeholder="SÖK EFTER LUNISAR..." />
      <button className="search-button">Sök</button>
    </div>
  );
}

export default SearchBar;
