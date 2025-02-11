
import './App.css'
import Home from './views/home'
import Navbar from './components/Navbar.tsx'

function App() {
  return (
    <div className='container-fluid'>
      <Navbar/>
      <Home/>
    </div>
  )
}
export default App
