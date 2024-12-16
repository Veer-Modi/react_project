// import React, { useState, useEffect } from "react";
// import './Potter.css'

// const Potter = () => {
//   const [languages, setLanguages] = useState(["en", "es", "fr", "de"]); // Supported languages
//   const [selectedLang, setSelectedLang] = useState("en"); // Default language
//   const [categories, setCategories] = useState(["books", "characters", "spells", "houses"]); // Categories
//   const [selectedCategory, setSelectedCategory] = useState(""); // Selected category
//   const [data, setData] = useState([]); // Fetched data
//   const [searchTerm, setSearchTerm] = useState(""); // Search input
//   const [loading, setLoading] = useState(false); // Loading state
//   const [error, setError] = useState(null); // Error state

//   // Fetch data based on selected language and category
//   const fetchData = (url) => {
//     setLoading(true);
//     setError(null);

//     fetch(url)
//       .then((res) => res.json())
//       .then((result) => {
//         setData(result); // Store the fetched data
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Error fetching data.");
//         setLoading(false);
//       });
//   };

//   // Fetch random data or category data
//   useEffect(() => {
//     if (selectedCategory) {
//       fetchData(`https://potterapi-fedeperin.vercel.app/${selectedLang}/${selectedCategory}`);
//     }
//   }, [selectedLang, selectedCategory]);

//   // Handle search form submission
//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchTerm.trim()) {
//       fetchData(
//         `https://potterapi-fedeperin.vercel.app/${selectedLang}/${selectedCategory}?search=${searchTerm}`
//       );
//     }
//   };

//   return (
//     <div className="potter">
//       <h1>PotterAPI</h1>

//       {/* Language Selector */}
//       <div className="language-selector">
//         <label>Select Language: </label>
//         <select
//           value={selectedLang}
//           onChange={(e) => setSelectedLang(e.target.value)}
//         >
//           {languages.map((lang) => (
//             <option key={lang} value={lang}>
//               {lang.toUpperCase()}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Categories */}
//       <div className="categories">
//         <h3>Select a Category:</h3>
//         {categories.map((category) => (
//           <button
//             key={category}
//             onClick={() => setSelectedCategory(category)}
//             className={selectedCategory === category ? "active" : ""}
//           >
//             {category.charAt(0).toUpperCase() + category.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Search */}
//       {selectedCategory && (
//         <form onSubmit={handleSearch}>
//           <div className="search-box">
//             <input
//               type="text"
//               placeholder={`Search in ${selectedCategory}`}
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <button type="submit">Search</button>
//           </div>
//         </form>
//       )}

//       {/* Loading and Error States */}
//       {loading && <div>Loading...</div>}
//       {error && <div>{error}</div>}

//       {/* Display Data */}
//       <div className="data-container">
//         {data.length > 0 ? (
//           <ul>
//             {data.map((item, index) => (
//               <li key={index}>
//                 {item.name || item.title || item.id || "Unnamed Item"}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           !loading && <div>No data available.</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Potter;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Potter.css"; // Add any styles for Potter

// const Potter = () => {
//   const [lang, setLang] = useState("en"); // Default language
//   const [category, setCategory] = useState("books"); // Default category
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();

//   // Fetch data based on lang and category
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`https://potterapi-fedeperin.vercel.app/${lang}/${category}`);
//         if (!res.ok) throw new Error("Invalid category or language.");
//         const result = await res.json();
//         setData(result);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [lang, category]);

//   // Handle language and category change
//   const handleLangChange = (e) => {
//     setLang(e.target.value);
//   };

//   const handleCategoryChange = (e) => {
//     setCategory(e.target.value);
//   };

//   // Handle search
//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await fetch(`https://potterapi-fedeperin.vercel.app/${lang}/${category}?search=${searchQuery}`);
//       if (!res.ok) throw new Error("Search failed.");
//       const result = await res.json();
//       setData(result);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="potter-container">
//       <h1>Potter API</h1>

//       {/* Language Selector */}
//       <div>
//         <label>Choose Language: </label>
//         <select value={lang} onChange={handleLangChange}>
//           <option value="en">English</option>
//           <option value="es">Spanish</option>
//           <option value="fr">French</option>
//           <option value="de">German</option>
//         </select>
//       </div>

//       {/* Category Selector */}
//       <div>
//         <label>Choose Category: </label>
//         <select value={category} onChange={handleCategoryChange}>
//           <option value="books">Books</option>
//           <option value="characters">Characters</option>
//           <option value="spells">Spells</option>
//           <option value="houses">Houses</option>
//         </select>
//       </div>

//       {/* Search */}
//       <div>
//         <form onSubmit={handleSearch}>
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search..."
//           />
//           <button type="submit">Search</button>
//         </form>
//       </div>

//       {/* Display Data */}
//       <div className="potter-data">
//         <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
//         {data.length > 0 ? (
//           <ul>
//             {data.map((item, index) => (
//               <li key={index}>
//                 {category === "books" && item.title ? (
//                   <div>
//                     <h3>{item.title}</h3>
//                     <img src={item.cover} alt={item.title} />
//                     <p>{item.description}</p>
//                   </div>
//                 ) : category === "characters" && item.name ? (
//                   <div>
//                     <h3>{item.name}</h3>
//                     <p>{item.house}</p>
//                   </div>
//                 ) : category === "spells" && item.spell ? (
//                   <div>
//                     <h3>{item.spell}</h3>
//                     <p>{item.use}</p>
//                   </div>
//                 ) : category === "houses" && item.name ? (
//                   <div>
//                     <h3>{item.name}</h3>
//                     <p>{item.description}</p>
//                   </div>
//                 ) : null}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No results found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Potter;


import React, { useState, useEffect } from "react";
import "./Potter.css"; // Import existing CSS

const Potter = () => {
  const [lang, setLang] = useState("en"); // Default language
  const [category, setCategory] = useState("books"); // Default category
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch data based on lang and category
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://potterapi-fedeperin.vercel.app/${lang}/${category}`);
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

  // Handle language and category change
  const handleLangChange = (e) => {
    setLang(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`https://potterapi-fedeperin.vercel.app/${lang}/${category}?search=${searchQuery}`);
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

      {/* Language Selector */}
      <div className="selects-container">
        <label>Choose Language: </label>
        <select value={lang} onChange={handleLangChange}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>

      {/* Category Selector */}
      <div className="selects-container">
        <label>Choose Category: </label>
        <select value={category} onChange={handleCategoryChange}>
          <option value="books">Books</option>
          <option value="characters">Characters</option>
          <option value="spells">Spells</option>
          <option value="houses">Houses</option>
        </select>
      </div>

      {/* Search */}
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

      {/* Display Data */}
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
                    <h3>{item.house} {item.emoji}</h3>
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

