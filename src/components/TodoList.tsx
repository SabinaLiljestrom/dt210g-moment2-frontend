import React from 'react';

// Definierar typen för en Todo-uppgift med ett valfritt beskrivningsfält
type Todo = {
    _id: string;       // Unikt ID för todo-uppgiften
    title: string;     // Titel på uppgiften
    description?: string; // Valfri beskrivning av uppgiften
    status: string;    // Status för uppgiften (t.ex. "Pågående", "Avklarad")
};

// Definierar props-typen för TodoList-komponenten
type Props = {
    todos: Todo[];     // En lista av todo-objekt som ska visas
    onUpdate: (id: string, updates: object) => void; // Funktion för att uppdatera en todo
    onDelete: (id: string) => void;  // Funktion för att ta bort en todo
};

// Funktionell React-komponent som visar en lista av todos
const TodoList: React.FC<Props> = ({ todos, onUpdate, onDelete }) => (
    <ul className="todo-list">
        {/* Itererar över alla todos och skapar en lista */}
        {todos.map((todo) => (
            <li key={todo._id} className="todo-item">
                {/* Visar titel, beskrivning och status */}
                <h3>{todo.title}</h3>
                <p>{todo.description}</p> 
                <p>Status: {todo.status}</p>

                {/* Knappar för att uppdatera status eller ta bort en todo */}
                <button onClick={() => onUpdate(todo._id, { status: 'Pågående' })}>Starta</button>
                <button onClick={() => onUpdate(todo._id, { status: 'Avklarad' })}>Avklarad</button>
                <button onClick={() => onDelete(todo._id)}>Ta bort</button>
            </li>
        ))}
    </ul>
);

export default TodoList;
