import './App.css'
import Rooms from './pages/Rooms'

function App() {

  return (
    <>
      <header>
        <h1> <img src="transparent-logo.png" alt="logo" style={{ width: "70px", height: "80px" }}/> StayNest</h1>
      </header>
      <main>
        <p>Smart Room Availability & Rent Booking Platform</p>
        <div>
          { <Rooms /> }
          
        </div>
      </main>
      <footer>
        <p>© 2026 StayNest. All rights reserved.</p>
      </footer>
    </>
  )
}

export default App
