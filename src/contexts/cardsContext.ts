import { createContext } from "react";
import type { flashCardType } from "../hooks/useFlashCards";

export type cardContextType = {
  cards: flashCardType[];
  addCard: (firstLangName: string, secondLangName: string) => void;
  removeCard: (id: string) => void;

}

export const CardContext = createContext<cardContextType | null>(null)