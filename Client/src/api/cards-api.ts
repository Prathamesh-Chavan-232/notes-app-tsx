import { API_URI } from "./config";

export async function getCardsApi(deckId: string): Promise<String[]> {
	// Promise chaining
	const cards = await fetch(`${API_URI}/decks/${deckId}`, {
		method: "GET",
	}).then(res => res.json());

	return cards;
}

export async function createCardApi(
	cardText: string,
	deckId: string,
): Promise<String[]> {
	const createdCard = await fetch(`${API_URI}/decks/${deckId}`, {
		method: "POST",
		body: JSON.stringify({
			cardText,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	}).then(res => res.json());

	return createdCard;
}

export async function deleteCardApi(deckId: string): Promise<Deck> {
	const deletedCard = await fetch(`${API_URI}/decks/${deckId}`, {
		method: "DELETE",
	}).then(res => res.json());

	return deletedCard;
}