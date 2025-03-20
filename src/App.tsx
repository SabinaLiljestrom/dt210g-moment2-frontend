import React, { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import './App.css';

type Todo = { _id: string; title: string; description?: string; status: string };

const API_URL = 'http://localhost:5013/api/todos';

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Hämta alla todos vid sidladdning
    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(setTodos)
            .catch(() => setError('Kunde inte hämta todos'));
    }, []);

    // Skapa en ny todo
    const handleAddTodo = async (title: string, description?: string) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description }),
            });
            if (!response.ok) throw new Error();
            const newTodo = await response.json();
            setTodos([...todos, newTodo]);
        } catch {
            setError('Kunde inte lägga till todo');
        }
    };

    // Uppdatera en todo
    const handleUpdateTodo = async (id: string, updates: object) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates),
            });
            if (!response.ok) throw new Error();
            const updatedTodo = await response.json();
            setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)));
        } catch {
            setError('Kunde inte uppdatera todo');
        }
    };

    // Ta bort en todo
    const handleDeleteTodo = async (id: string) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error();
            setTodos(todos.filter(todo => todo._id !== id));
        } catch {
            setError('Kunde inte ta bort todo');
        }
    };

    return (
        <div className="container">
            <h1>📝 Att göra-lista</h1>
            {error && <p className="error">{error}</p>}
            <TodoForm onAdd={handleAddTodo} />
            {todos.length > 0 ? (
                <TodoList todos={todos} onUpdate={handleUpdateTodo} onDelete={handleDeleteTodo} />
            ) : (
                <p className="no-todos"> Inga uppgifter ännu! Lägg till en ny todo.</p>
            )}
        </div>
    );
};

export default App;
