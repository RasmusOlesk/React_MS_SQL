import { useEffect, useState } from "react";
import { api } from "./api.ts";

interface Item {
  id: number;
  name: string;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [newName, setNewName] = useState("");

  const loadData = async () => {
    const res = await api.get("/items");
    setItems(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const addItem = async () => {
    if (!newName) return;
    await api.post("/items", { name: newName });
    setNewName("");
    loadData();
  };

  const updateItem = async (id: number, oldName: string) => {
    const newValue = prompt("Uus nimi:", oldName);
    if (!newValue) return;
    await api.put(`/items/${id}`, { name: newValue });
    loadData();
  };

  const deleteItem = async (id: number) => {
    await api.delete(`/items/${id}`);
    loadData();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>MS SQL + React CRUD Test</h1>

      <input
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Uus nimi"
      />
      <button onClick={addItem}>Lisa</button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}

            <button onClick={() => updateItem(item.id, item.name)}>
              Muuda
            </button>

            <button onClick={() => deleteItem(item.id)}>
              Kustuta
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
