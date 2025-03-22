import { useContext } from "react";
import { flashCardType } from "../hooks/useFlashCards";
import { CardContext } from "../contexts/cardsContext";


export default function ResultsTable({ corrects, incorrects }: { corrects: flashCardType[], incorrects: flashCardType[] }) {
  const cardsManager = useContext(CardContext)
  return (
    <section className="container-sm text-center mt-4">
      <table className="table table-danger">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Słówko</th>
            <th scope="col">Odpowiedź użytkownika</th>
            <th scope="col">Poprawne tłumaczenie</th>
          </tr>
        </thead>
        <tbody>
          {incorrects.map((incorrectCard, idx) => {
            return <tr>
              <th scope="row">{idx}</th>
              <td>{incorrectCard.firstLangName}</td>
              <td className="text-danger fw-bold">{incorrectCard.secondLangName}</td>
              <td>{cardsManager?.cards.find(card => card.id === incorrectCard.id)?.secondLangName}</td>
            </tr>
          })}
        </tbody>
      </table>
      <table className="table table-success">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Słówko</th>
            <th scope="col">Odpowiedź użytkownika</th>
          </tr>
        </thead>
        <tbody>
          {corrects.map((correctCard, idx) => (
            <tr key={correctCard.id}>
              <th scope="row">{idx + 1}</th>
              <td>{correctCard.firstLangName}</td>
              <td className="text-success fw-bold">{correctCard.secondLangName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
