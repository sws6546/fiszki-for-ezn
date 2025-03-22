import { useContext, useState } from "react"
import { CardContext } from "../contexts/cardsContext"
import type { flashCardType } from "../hooks/useFlashCards";
import ResultsTable from "../components/ResultsTable";
import { NavigationContext } from "../contexts/navigationContext";


function shuffleArray(arr: any[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
  }
  return arr;
}

export default function Play() {
  const cardsManager = useContext(CardContext);
  const [cards, setCards] = useState<flashCardType[]>(shuffleArray([...cardsManager!.cards]))
  const [correct, setCorrect] = useState<flashCardType[]>([])
  const [incorrect, setInCorrect] = useState<flashCardType[]>([])
  const [translation, setTranslation] = useState<string>("")
  const navigation = useContext(NavigationContext)

  function refreshGame() {
    setCards(shuffleArray([...cardsManager!.cards]))
    setCorrect([])
    setInCorrect([])
    setTranslation("")
  }

  if (cards.length === 0) {
    return (
      <>
        <section className="container-sm text-center mt-4">
          <div className="row"><h2>wyniki</h2></div>
          <div className="row justify-content-evenly">
            <div className="col-2"><h3 className="text-success">Poprawne: {correct.length}</h3></div>
            <div className="col-2"><h3 className="text-danger">Błędne: {incorrect.length}</h3></div>
          </div>
          <div className="btn-group btn-group-lg">
            <button className="btn btn-primary" onClick={() => navigation?.setNavigation("")}>Powrót</button>
            <button className="btn btn-info" onClick={() => refreshGame()}>Jeszcze raz</button>
          </div>
          <ResultsTable corrects={correct} incorrects={incorrect} />
        </section>
      </>
    )
  }

  return (
    <section >
      <form onSubmit={(e) => {
        e.preventDefault()
        if (cards[0].secondLangName.toLowerCase() == translation.toLowerCase()) {
          setCorrect(c => [...c, cards[0]])
        }
        else {
          setInCorrect(c => [...c, { ...cards[0], secondLangName: translation.toLowerCase() }])
        }
        setCards(cards.filter(c => c !== cards[0]))
        setTranslation("")
      }}
        className="text-center container"
      >
        <h2 className="mt-4 mb-4">{cards[0].firstLangName}</h2>
        <div className="row justify-content-center">
          <div className="col-4">
            <input onChange={(e) => { setTranslation(e.target.value) }} className="form-control"
              type="text" placeholder="tłumaczenie" value={translation} required />
          </div>
          <div className="col-1">
            <button type="submit" className="btn btn-primary form-control">Ok</button>
          </div>
        </div>
      </form>
    </section >
  )
}
