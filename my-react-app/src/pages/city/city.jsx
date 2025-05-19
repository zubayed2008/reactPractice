import { useEffect, useState } from "react";
import cityList from '../../assets/city_json/city.list.json';

// Assume you have extracted city.list.json to public/city.list.json
// and it's accessible via fetch('/city.list.json')
const CITY_LIST_URL = "/assets/city_json/city.list.json";

function City() {
  const [cities, setCities] = useState(cityList);
  const [defaultCityId, setDefaultCityId] = useState(
    () => localStorage.getItem("defaultCityId") || null
  );

  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const PAGE_SIZE = 100;


  const handleSetDefault = (cityId,cityName) => {
    setDefaultCityId(cityId);
    localStorage.setItem("defaultCityId", cityId);
    localStorage.setItem("defaultCity", cityName);

  };

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(search.toLowerCase()) ||
    city.country.toLowerCase().includes(search.toLowerCase()) ||
    (city.state && city.state.toLowerCase().includes(search.toLowerCase()))
  );

  // Move default city to top
  const sortedCities = [...filteredCities];
  if (defaultCityId) {
    const idx = sortedCities.findIndex((c) => String(c.id) === String(defaultCityId));
    if (idx > -1) {
      const [defaultCity] = sortedCities.splice(idx, 1);
      sortedCities.unshift(defaultCity);
    }
  }

   const totalPages = Math.ceil(sortedCities.length / PAGE_SIZE);

  const handlePrev = () => setPage((p) => Math.max(p - 1, 0));
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages - 1));

  const pagedCities = sortedCities.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  

  return (
    <div className="container mt-4">
      <h2>City List</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by city, country, or state..."
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setPage(0); // Reset to first page on search
          }}
        />
      </div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>City</th>
            <th>Country</th>
            <th>State</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          {pagedCities.map((city) => ( // Show first 100 for performance
            <tr key={city.id} style={city.id == defaultCityId ? { background: "#ffeeba" } : {}}>
              <td>{city.name}</td>
              <td>{city.country}</td>
              <td>{city.state}</td>
              <td>{city.coord.lat}</td>
              <td>{city.coord.lon}</td>
              <td>
                {city.id == defaultCityId ? (
                  <span className="badge bg-success">Default</span>
                ) : (
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleSetDefault(city.id,city.name)}
                  >
                    Set as Default
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center">
        <button className="btn btn-secondary" onClick={handlePrev} disabled={page === 0}>
          Previous
        </button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button className="btn btn-secondary" onClick={handleNext} disabled={page === totalPages - 1}>
          Next
        </button>
      </div>
      <p>
        <small>
          Showing {PAGE_SIZE} cities per page. Search/filter for more.
        </small>
      </p>
    </div>
    
  );
}

export default City;