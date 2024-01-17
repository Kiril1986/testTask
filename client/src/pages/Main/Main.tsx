import { useContext, useState } from "react";
import AuthorizationForm from "../../components/AuthorizationForm/AuthorizationForm";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import {PREFIX} from "../../constants/vars.ts";
import styles from "./Main.module.css"
import { Data } from "./Main.props.ts";

function Main() {
const [show, setShow] = useState<boolean>(true)
const { user } = useContext(UserContext)
const navigate = useNavigate();

async function logOut () {
  try {
  const userId: string | undefined = user?._id;
  const res = await fetch(`${PREFIX}/api/logout`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
    body: JSON.stringify({userId})
  });
  const data: Data = await res.json()
   if (data.success) {
      localStorage.removeItem("userId")
      } else {
    console.error(`Logout failed: ${data.error}`);
  }
} catch (error) {
  console.error('Error during logout:', error);
}
 navigate("/")
 window.location.reload();
}
return (
<>
  {!user &&  <div className={styles["buttonWrapper"]}>
  <button className={styles["switchButton"]} onClick={() => setShow(true)}>Registration</button>
  <button className={styles["switchButton"]} onClick={() => setShow(false)}>Authorization</button>
  </div>}
 
  {!user && (
  <>
    {show && <RegistrationForm />}
    {!show && <AuthorizationForm />}
  </>
)}
  {user && 
  <div className={styles["logoutButton"]}>
    <button type="button" className={styles["switchButton"]} onClick={logOut}>Logout</button>
  </div>}

</>
  )
}

export default Main;
