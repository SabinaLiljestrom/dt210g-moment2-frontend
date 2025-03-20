import axios from 'axios';

// Bas-URL för API-anrop
const API_URL = 'http://localhost:5013/api/todos';

// Hämtar alla todos från API:t
export const getTodos = async () => (await axios.get(API_URL)).data;

// Lägger till en ny todo i API:t
// Tar emot ett objekt med titel och (valfri) beskrivning
export const addTodo = async (todo: { title: string; description?: string }) => 
  (await axios.post(API_URL, todo)).data;

// Uppdaterar en befintlig todo i API:t
// Tar emot ett ID och ett objekt med uppdaterade fält
export const updateTodo = async (id: string, updates: object) => 
  (await axios.put(`${API_URL}/${id}`, updates)).data;

// Tar bort en todo från API:t
// Tar emot ett ID och skickar en DELETE-förfrågan
export const deleteTodo = async (id: string) => 
  axios.delete(`${API_URL}/${id}`);
