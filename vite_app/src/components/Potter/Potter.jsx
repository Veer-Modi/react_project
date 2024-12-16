import React, { useState, useEffect } from "react";
import "./Potter.css";

const Potter = () => {
  const [lang, setLang] = useState("en");
  const [category, setCategory] = useState("books");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://potterapi-fedeperin.vercel.app/${lang}/${category}`
        );
        if (!res.ok) throw new Error("Invalid category or language.");
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lang, category]);

  const handleLangChange = (e) => {
    setLang(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `https://potterapi-fedeperin.vercel.app/${lang}/${category}?search=${searchQuery}`
      );
      if (!res.ok) throw new Error("Search failed.");
      const result = await res.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="potter-container">
      <h1>Potter API</h1>

      <div className="selects-container">
        <label>Choose Language: </label>
        <select value={lang} onChange={handleLangChange}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>

      <div className="selects-container">
        <label>Choose Category: </label>
        <select value={category} onChange={handleCategoryChange}>
          <option value="books">Books</option>
          <option value="characters">Characters</option>
          <option value="spells">Spells</option>
          <option value="houses">Houses</option>
        </select>
      </div>

      <div>
        <form onSubmit={handleSearch}>
          <div className="search-box">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
            />
            <button type="submit">Search</button>
          </div>
        </form>
      </div>

      <div className="potter-data">
        <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
        {data.length > 0 ? (
          <div className="card-container">
            {data.map((item, index) => (
              <div className="potter-card" key={index}>
                {category === "books" && item.title && (
                  <div className="book-card">
                    <img src={item.cover} alt={item.title} />
                    <h3>{item.title}</h3>
                    {/* <p>{item.description}</p>
                    <p>Pages: {item.pages}</p> */}
                  </div>
                )}
                {category === "characters" && item.fullName && (
                  <div className="character-card">
                    <img src={item.image} alt={item.fullName} />
                    <h3>{item.fullName}</h3>
                    {/* <p>House: {item.hogwartsHouse}</p>
                    <p>Portrayed by: {item.interpretedBy}</p>
                    <p>Birthdate: {item.birthdate}</p>
                    <h4>Children:</h4>
                    <ul>
                      {item.children.map((child, idx) => (
                        <li key={idx}>{child}</li>
                      ))}
                    </ul> */}
                  </div>
                )}
                {category === "spells" && item.spell && (
                  <div className="spell-card">
                    <h3>{item.spell}</h3>
                    <p>{item.use}</p>
                  </div>
                )}
                {category === "houses" && item.house && (
                  <div className="house-card">
                    <h3>
                      {item.house} {item.emoji}
                    </h3>
                    <p>Founder: {item.founder}</p>
                    <p>Colors: {item.colors.join(", ")}</p>
                    <p>Animal: {item.animal}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Potter;
