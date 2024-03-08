import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Map from './components/Map'
import AuthContextProvider from './context/authContextProvider'
import './App.css'

function App() {

  return (
    <AuthContextProvider>        
      <>
        <Header />
        <Sidebar />
        <Map />
      </>
    </AuthContextProvider>
  )
}

export default App
