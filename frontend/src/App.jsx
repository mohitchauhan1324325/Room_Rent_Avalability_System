import './App.css'
import Rooms from './pages/Rooms'

function App() {

  return (
    <>
      <header>
        <h1>My App</h1>
      </header>
      <main>
        <p>Welcome to my app!</p>
        <div>
          { <Rooms /> }
          
        </div>
      </main>
      <footer>
        <p>© 2024 My App. All rights reserved.</p>
      </footer>
    </>
  )
}

export default App
