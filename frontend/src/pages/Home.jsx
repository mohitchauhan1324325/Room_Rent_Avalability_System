import { useNavigate } from "react-router-dom"

const Home = () => {
  
const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to StayNest</h1>
      <button onClick={() => navigate("/Rooms")}>See Rooms</button>
    </div>
  )
}

export default Home
