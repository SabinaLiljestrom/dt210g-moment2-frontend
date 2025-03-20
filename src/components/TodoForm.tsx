import React, { useState } from 'react';

// Definierar props-typen för TodoForm-komponenten
type Props = {
    onAdd: (title: string, description?: string) => void; // Funktion som anropas när en ny todo läggs till
};

// Funktionell React-komponent för att lägga till en ny todo
const TodoForm: React.FC<Props> = ({ onAdd }) => {
    // State för att hålla titeln på todo-uppgiften
    const [title, setTitle] = useState('');
    // State för att hålla beskrivningen av todo-uppgiften
    const [description, setDescription] = useState('');

    // Funktion som hanterar formulärinskick
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Förhindrar att sidan laddas om

        // Validerar titelns längd (minst 3 tecken)
        if (title.length < 3) return alert("Titeln måste vara minst 3 tecken lång.");
        
        // Validerar beskrivningens längd (max 200 tecken)
        if (description.length > 200) return alert("Beskrivningen får vara max 200 tecken.");

        // Anropar onAdd-funktionen med titel och beskrivning
        onAdd(title, description);

        // Rensar formuläret efter att todo har lagts till
        setTitle('');
        setDescription('');
    };

    return (
        // Formulär för att lägga till en ny todo
        <form onSubmit={handleSubmit} className="todo-form">
            {/* Textfält för titel med tvåvägsbindning */}
            <input 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                placeholder="Titel" 
                required 
            />
            {/* Textarea för beskrivning med tvåvägsbindning */}
            <textarea 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
                placeholder="Beskrivning (valfritt)" 
            />
            {/* Knapp för att skicka in formuläret */}
            <button type="submit">Lägg till</button>
        </form>
    );
};

export default TodoForm;
