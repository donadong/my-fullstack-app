import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/HttpExample")
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🚀 My Free-Tier Azure Full-Stack App</h1>
      <h2>Items from Cosmos DB:</h2>
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
