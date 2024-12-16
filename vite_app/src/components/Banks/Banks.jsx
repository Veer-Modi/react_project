import React, { useState, useEffect } from "react";
import "./Banks.css";

const Banks = () => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [centers, setCenters] = useState([]);
  const [branches, setBranches] = useState([]);
  const [branchDetails, setBranchDetails] = useState(null);

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCenter, setSelectedCenter] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

  const [ifscCode, setIfscCode] = useState("");
  const [ifscDetails, setIfscDetails] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch states from API
  useEffect(() => {
    setLoading(true);
    fetch("https://bank-apis.justinclicks.com/API/V1/STATE/")
      .then((res) => res.json())
      .then((data) => {
        setStates(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching states");
        setLoading(false);
      });
  }, []);

  // Fetch districts based on state
  useEffect(() => {
    if (selectedState) {
      setLoading(true);
      fetch(`https://bank-apis.justinclicks.com/API/V1/STATE/${selectedState}/`)
        .then((res) => res.json())
        .then((data) => {
          setDistricts(data);
          setLoading(false);
        })
        .catch(() => {
          setError("Error fetching districts");
          setLoading(false);
        });
    }
  }, [selectedState]);

  // Fetch cities based on state and district
  useEffect(() => {
    if (selectedDistrict) {
      setLoading(true);
      fetch(
        `https://bank-apis.justinclicks.com/API/V1/STATE/${selectedState}/${selectedDistrict}/`
      )
        .then((res) => res.json())
        .then((data) => {
          setCities(data);
          setLoading(false);
        })
        .catch(() => {
          setError("Error fetching cities");
          setLoading(false);
        });
    }
  }, [selectedDistrict, selectedState]);

  // Fetch centers based on city
  useEffect(() => {
    if (selectedCity) {
      setLoading(true);
      fetch(
        `https://bank-apis.justinclicks.com/API/V1/STATE/${selectedState}/${selectedDistrict}/${selectedCity}/`
      )
        .then((res) => res.json())
        .then((data) => {
          setCenters(data);
          setLoading(false);
        })
        .catch(() => {
          setError("Error fetching centers");
          setLoading(false);
        });
    }
  }, [selectedCity, selectedDistrict, selectedState]);

  // Fetch branches based on center
  useEffect(() => {
    if (selectedCenter) {
      setLoading(true);
      fetch(
        `https://bank-apis.justinclicks.com/API/V1/STATE/${selectedState}/${selectedDistrict}/${selectedCity}/${selectedCenter}/`
      )
        .then((res) => res.json())
        .then((data) => {
          setBranches(data);
          setLoading(false);
        })
        .catch(() => {
          setError("Error fetching branches");
          setLoading(false);
        });
    }
  }, [selectedCenter, selectedCity, selectedDistrict, selectedState]);

  // Fetch branch details based on selected branch
  useEffect(() => {
    if (selectedBranch) {
      setLoading(true);
      fetch(
        `https://bank-apis.justinclicks.com/API/V1/STATE/${selectedState}/${selectedDistrict}/${selectedCity}/${selectedCenter}/${selectedBranch}`
      )
        .then((res) => res.json())
        .then((data) => {
          setBranchDetails(data);
          setLoading(false);
        })
        .catch(() => {
          setError("Error fetching branch details");
          setLoading(false);
        });
    }
  }, [
    selectedBranch,
    selectedCenter,
    selectedCity,
    selectedDistrict,
    selectedState,
  ]);

  // Fetch IFSC code details
  const handleIfscSearch = (e) => {
    e.preventDefault();
    if (!ifscCode) return;

    setLoading(true);
    setBranchDetails(null); // Reset branch details when performing IFSC search
    setIfscDetails(null); // Clear any previous IFSC search results
    fetch(`https://bank-apis.justinclicks.com/API/V1/IFSC/${ifscCode}/`)
      .then((res) => res.json())
      .then((data) => {
        setIfscDetails(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching IFSC details");
        setLoading(false);
      });
  };

  return (
    <div className="banks">
      <h1>Bank Locator</h1>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      {/* State Selection */}
      <div className="dropdown">
        <label>Select State:</label>
        <select
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            setSelectedDistrict("");
            setCities([]);
            setCenters([]);
            setBranches([]);
            setBranchDetails(null);
            setIfscDetails(null); // Reset IFSC details when changing state
          }}
        >
          <option value="">-- Select State --</option>
          {states.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* District Selection */}
      <div className="dropdown">
        <label>Select District:</label>
        <select
          value={selectedDistrict}
          onChange={(e) => {
            setSelectedDistrict(e.target.value);
            setCities([]);
            setCenters([]);
            setBranches([]);
            setBranchDetails(null);
            setIfscDetails(null); // Reset IFSC details when changing district
          }}
          disabled={!selectedState}
        >
          <option value="">-- Select District --</option>
          {districts.map((district, index) => (
            <option key={index} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>

      {/* City Selection */}
      <div className="dropdown">
        <label>Select City:</label>
        <select
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value);
            setCenters([]);
            setBranches([]);
            setBranchDetails(null);
            setIfscDetails(null); // Reset IFSC details when changing city
          }}
          disabled={!selectedDistrict}
        >
          <option value="">-- Select City --</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Center Selection */}
      <div className="dropdown">
        <label>Select Center:</label>
        <select
          value={selectedCenter}
          onChange={(e) => {
            setSelectedCenter(e.target.value);
            setBranches([]);
            setBranchDetails(null);
            setIfscDetails(null); // Reset IFSC details when changing center
          }}
          disabled={!selectedCity}
        >
          <option value="">-- Select Center --</option>
          {centers.map((center, index) => (
            <option key={index} value={center}>
              {center}
            </option>
          ))}
        </select>
      </div>

      {/* Branch Selection */}
      <div className="dropdown">
        <label>Select Branch:</label>
        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          disabled={!selectedCenter}
        >
          <option value="">-- Select Branch --</option>
          {branches.map((branch, index) => (
            <option key={index} value={branch}>
              {branch}
            </option>
          ))}
        </select>
      </div>

      {/* IFSC Search */}
      <div className="ifsc-search">
        <h2>Search by IFSC Code</h2>
        <form onSubmit={handleIfscSearch}>
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter IFSC Code"
              value={ifscCode}
              onChange={(e) => setIfscCode(e.target.value)}
            />
            <button type="submit">Search</button>
          </div>
        </form>


      {/* Branch Details */}
      {branchDetails && !ifscDetails && (
        <div className="branch-details">
          <h2>Branch Details</h2>
          <ul>
            {Object.entries(branchDetails).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value.toString()}
              </li>
            ))}
          </ul>
        </div>
      )}


        {/* IFSC Details */}
        {ifscDetails && (
          <div className="ifsc-details">
            <h3>Bank Details (IFSC)</h3>
            <ul>
              {Object.entries(ifscDetails).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value.toString()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banks;
