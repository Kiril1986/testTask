import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import AccountPage from "./pages/AccountPage/AccountPage";
import NavBar from "./components/NavBar/NavBar";
import ShowPeople from "./pages/ShowPeople/ShowPeople";
import "./App.css";
import { UserContext } from "./context/userContext";
import { useContext } from "react";
import Unauthorized from "./components/Unauthorized/Unauthorized";

function App() {
  const { user } = useContext(UserContext)
  return (
<>
<NavBar/>
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/account" element={user ? <AccountPage/> : <Unauthorized/>} />
    <Route path="/people" element={user ? <ShowPeople /> : <Unauthorized/>} />
  </Routes>
</>
 );
}
export default App;
