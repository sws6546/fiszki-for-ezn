import { useEffect, useState } from "react";

export type flashCardType = {
  id: string
  firstLangName: string;
  secondLangName: string;
}

export default function useFlashCards() {
  const [loadedFlashCards, setLoadedFlashCards] = useState<flashCardType[]>([])

  useEffect(() => {
    const cards: flashCardType[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key: string = localStorage.key(i)!;
      const cardInMemory: flashCardType = JSON.parse(localStorage.getItem(key)!);
      cards.push(cardInMemory);
    }
    setLoadedFlashCards(cards);
  }, [])

  function addFlashCard(firstLangName: string, secondLangName: string) {
    try {
      const cardId = crypto.randomUUID();
      const newCard: flashCardType = { id: cardId, firstLangName, secondLangName };
      localStorage.setItem(cardId, JSON.stringify(newCard));
      setLoadedFlashCards(cards => [...cards, newCard]);
    } catch (error) {
      console.log(error);
    }
  }
  function deleteCard(id: string) {
    try {
      localStorage.removeItem(id);

      setLoadedFlashCards(cards => cards.filter(card => card.id !== id));
    } catch (error) {
      console.log("Error while deleting the card: ", error);
    }
  }

  return { cards: loadedFlashCards, addCard: addFlashCard, removeCard: deleteCard }
}