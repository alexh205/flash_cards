import { API_URL } from "./config"

export async function createDecks(title: string) {
    const response = await fetch("http://localhost:3000/decks", {
        method: "POST",
        body: JSON.stringify({
            title,
        }),
        headers: {
            'content-Type': "application/json"
        }
    })
    return response.json()
}
