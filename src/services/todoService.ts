import axios from 'axios';

const API_URL = 'http://localhost:5012/api/todos';

export const getTodos = async () => (await axios.get(API_URL)).data;
export const addTodo = async (todo: { title: string; description?: string }) => (await axios.post(API_URL, todo)).data;
export const updateTodo = async (id: string, updates: object) => (await axios.put(`${API_URL}/${id}`, updates)).data;
export const deleteTodo = async (id: string) => axios.delete(`${API_URL}/${id}`);
