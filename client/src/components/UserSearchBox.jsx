import { useState, useCallback, useEffect, useId } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";
import searchImg from "../assets/search-img.svg";
import { get } from "../api/client";

const UserSearchBox = ({ className = "" }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const inputId = useId();

  const performSearch = useCallback(async (term) => {
    if (!term) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await get(`/users/search?searchTerm=${encodeURIComponent(term)}`);
      setSearchResults(response.success ? response.users : []);
    } catch (error) {
      console.error("Search failed:", error.message);
      setSearchResults([]);
    }
  }, []);

  const [debouncedSearch] = useState(() => debounce(performSearch, 350));

  useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  return (
    <div className={`position-relative search-wrap ${className}`}>
      <label htmlFor={inputId} className="sr-only">
        Search for a user
      </label>
      <input
        id={inputId}
        type="search"
        className="rounded-pill ps-5 search-box"
        placeholder="search a user"
        value={searchTerm}
        onChange={handleSearch}
      />
      <img src={searchImg} alt="" aria-hidden="true" className="position-absolute img-fluid search-img" />
      {searchTerm && (
        <div
          className="search-results position-absolute z-1 bg-secondary text-white border rounded w-100"
          role="listbox"
          aria-label="Search results"
        >
          {searchResults.length ? (
            searchResults.map((user) => (
              <div key={user._id} className="search-result-item">
                <Link className="text-decoration-none text-white" to={`/singleuserprofile/${user._id}`}>
                  {user.userName}
                </Link>
              </div>
            ))
          ) : (
            <div className="search-no-results">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserSearchBox;
