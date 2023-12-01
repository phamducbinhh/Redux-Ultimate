import Header from './components/Header'
import TabsContent from './components/TabsContent'
import { DarkModeProvider } from './context/Store-Context'

const App = () => {
  return (
    <>
      <DarkModeProvider>
        <Header />
        <TabsContent />
      </DarkModeProvider>
    </>
  )
}

export default App
