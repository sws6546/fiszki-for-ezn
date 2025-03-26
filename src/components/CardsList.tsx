import { useContext } from "react"
import { CardContext, cardContextType } from "../contexts/cardsContext"

export default function CardsList() {
  const cardsManager: cardContextType | null = useContext(CardContext)
  return (
    <section className="container text-center d-flex gap-4 flex-wrap justify-content-center">
      {
        cardsManager!.cards.map((card, idx)=> (
          <div className="card text-bg-primary mb-3 " key={idx}>
            <div className="card-header">{card.firstLangName}</div>
            <div className="card-body">
              <h5 className="card-title">{card.secondLangName}</h5>
              <p className="card-text">
                <button onClick={() => {
                  cardsManager?.removeCard(card.id)
                }} className="btn btn-danger">🗑 Usuń kartę</button>
              </p>
            </div>
          </div>
        ))
      }
    </section>
  )
}
