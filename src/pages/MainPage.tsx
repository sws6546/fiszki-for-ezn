import { useContext } from "react"
import CardsList from "../components/CardsList"
import { NavigationContext } from "../contexts/navigationContext"
import { CardContext } from "../contexts/cardsContext"

export default function MainPage() {
  const navigation = useContext(NavigationContext)
  const cardsManager = useContext(CardContext)
  return (
    <main>
      <section className="container text-center mt-4 mb-4">
        <div className="btn-group btn-group-lg" role="group">
          <button onClick={() => {
            navigation?.setNavigation("add")
          }} type="button" className="btn btn-success">Dodaj Fiszkę </button>
          <button onClick={() => { navigation?.setNavigation("play") }}
            type="button" className="btn btn-warning" disabled={cardsManager?.cards.length === 0}>Sprawdź się</button>
        </div>
      </section>
      <CardsList />
    </main>
  )
}
