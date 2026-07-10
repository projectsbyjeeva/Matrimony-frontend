import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <section className="search-section">
      <div className="container">
        <div className="search-card">

          <div className="search-item">
            <label>Looking For</label>
            <select>
              <option>Bride</option>
              <option>Groom</option>
            </select>
          </div>

          <div className="search-item">
            <label>Age</label>
            <select>
              <option>18 - 25</option>
              <option>26 - 30</option>
              <option>31 - 35</option>
              <option>36 - 40</option>
            </select>
          </div>

          <div className="search-item">
            <label>Religion</label>
            <select>
              <option>Hindu</option>
              <option>Christian</option>
              <option>Muslim</option>
              <option>Others</option>
            </select>
          </div>

          <div className="search-item">
            <label>Community</label>
            <select>
              <option>Select Community</option>
              <option>Vanniyar</option>
              <option>Mudaliyar</option>
              <option>Nadar</option>
              <option>Chettiar</option>
              <option>Gounder</option>
            </select>
          </div>

          <button className="search-btn">
            <FaSearch />
            <span>Search</span>
          </button>

        </div>
      </div>
    </section>
  );
}