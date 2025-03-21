import Navbar from "./components/Navbar"
import { useNavigation } from "./hooks/useNavigation"
import { NavigationContext } from "./contexts/navigationContext"
import MainPage from "./pages/MainPage"
import useFlashCards from "./hooks/useFlashCards"
import { CardContext } from "./contexts/cardsContext"
import AddCard from "./pages/AddCard"
import Play from "./pages/Play"

function App() {
  const { navigation, setNavigation } = useNavigation()
  const { cards, addCard, removeCard } = useFlashCards()
  return (
    <NavigationContext.Provider value={{ navigation, setNavigation }}>
      <CardContext.Provider value={{ cards, addCard, removeCard }}>
        <Navbar />
        {navigation === "" && <MainPage />}
        {navigation === "add" && <AddCard />}
        {navigation === "play" && <Play />}
      </CardContext.Provider>
    </NavigationContext.Provider>
  )
}

export default App
