import { useContext, useState } from "react"
import { CardContext } from "../contexts/cardsContext"
import { NavigationContext } from "../contexts/navigationContext"

export default function AddCard() {
  const cardManager = useContext(CardContext)
  const navigation = useContext(NavigationContext)
  const [formState, setFormState] = useState<{ first: string, second: string }>({ first: "", second: "" })
  return (
    <>
      <section>
        <div className="mb-3 mt-3 container-sm text-center">
          <p>Dodaj słówko</p>
          <input onChange={(e) => {
            setFormState(s => ({ ...s, first: e.target.value }))
          }} type="text" className="form-control" placeholder="słówko" value={formState.first} />
          <input onChange={(e) => {
            setFormState(s => ({ ...s, second: e.target.value }))
          }} type="text" className="form-control mt-3" placeholder="tłumaczenie" value={formState.second} />
          <div className="btn-group btn-group-lg" role="group">
            <button onClick={() => {
              if (formState.first != "" && formState.second != "") {
                const filteredCards = cardManager?.cards.filter(card => card.firstLangName === formState.first);
                if (!filteredCards?.length) {
                  cardManager?.addCard(formState.first, formState.second);
                  setFormState({ first: "", second: "" })
                } else {
                  console.error("A card with the same first word already exists.");
                  alert("To słówko już istnieje")
                }
              }
            }}
              className="btn btn-primary mt-3">Dodaj słówko</button>
            <button onClick={() => {
              navigation?.setNavigation("")
            }}
              className="btn btn-secondary mt-3">Powrót</button>
          </div>
        </div>
      </section>
      <section className="container container-sm">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Słówko</th>
              <th scope="col">Tłumaczenie</th>
            </tr>
          </thead>
          <tbody>
            {
              cardManager?.cards.map((card, idx) => (
                <tr key={idx}>
                  <th scope="row">{idx + 1}</th>
                  <td>{card.firstLangName}</td>
                  <td>{card.secondLangName}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </section>
    </>
  )
}
