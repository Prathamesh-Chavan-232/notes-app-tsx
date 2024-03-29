import React, { ReactHTML, useEffect, useState } from "react";
import { createDeckApi, deleteDeckApi, getDecksApi } from "../api/decks-api";
import { Link } from "react-router-dom";
import { Deck } from "../types/types";

export const Decks = () => {
    const [decks, setDecks] = useState<Deck[]>([]);

    const [title, setTitle] = useState("");

    const [error, setError] = useState(false);

    async function fetchDecks() {
        const decks = await getDecksApi();
        setDecks(decks); // Store Decks for Display
        console.log(decks);
    }

    async function handleDeleteDeck(deckId: string) {
        const res = await deleteDeckApi(deckId);
        console.log(res);
        // Optimisic Update
        setDecks(decks.filter((deck) => deck._id !== deckId)); // filter function returns when the condition is false
    }

    async function handleCreateDeck(e: React.FormEvent) {
        e.preventDefault();
        if (title && title != "") {
            const newDeck = await createDeckApi(title);
            console.log(newDeck);

            // Optimistic Updates
            setDecks([...decks, newDeck]);
            // Reset Title & alert
            setTitle("");
        } else {
            // Display alert
            setError(true);
        }
    }

    useEffect(() => {
        fetchDecks();

        return () => {
            console.log(decks);
            console.log("Started");
        };
    }, []);

    return (
        // Flex-box centers the entire component
        <div className="Home">
            <h1>Flash Card Decks</h1>
            <div className="decks">
                {decks.map((deck) => (
                    <li key={deck._id}>
                        <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
                        <Link className="deck-title" to={`/decks/${deck._id}`}>
                            {deck.title}
                        </Link>
                    </li>
                ))}
            </div>

            {/* separate form & alert span */}
            <div className="form-span">
                <form className="create-deck-form" onSubmit={handleCreateDeck}>
                    <label htmlFor="title">Deck Title</label>
                    <input
                        className="input-field"
                        type="text"
                        value={title}
                        id="title"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setTitle(e.target.value);
                        }}
                    />
                    <button className="submit-button">Create Deck</button>
                </form>

                <span className={error ? "alert " : ""}></span>
            </div>
        </div>
    );
};
