import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import "./SearchPotter.css"; // Add CSS for styling

const SearchPotter = () => {
  const { lang, category } = useParams(); // Dynamic URL parameters
  const [searchParams] = useSearchParams(); // For handling search queries
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchTerm = searchParams.get("search"); // Get the search query

  const fetchData = () => {
    setLoading(true);
    setError(null);

    // Construct the API URL based on whether there's a search query
    const url = searchTerm
      ? `https://potterapi-fedeperin.vercel.app/${lang}/${category}?search=${searchTerm}`
      : `https://potterapi-fedeperin.vercel.app/${lang}/${category}`;

    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        if (Array.isArray(result) && result.length > 0) {
          setData(result);
        } else {
          setError("No results found.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching data.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount or when parameters change
  }, [lang, category, searchTerm]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="potter-details">
      <Link to="/potter" className="back-btn">← Back</Link>
      <h1>
        {category.charAt(0).toUpperCase() + category.slice(1)} ({lang})
      </h1>

      <div className="potter-items">
        {data.map((item, index) => (
          <div className="potter-item" key={index}>
            <h2>{item.name || item.title}</h2>
            <p>{item.description || item.author || "Details not available"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPotter;
