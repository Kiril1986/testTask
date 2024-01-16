import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import styles from "./NavBar.module.css"
import { UserContext } from '../../context/userContext'

function NavBar() {
  const { user } = useContext(UserContext);
    return (
    <>
    {user ? (<div className={styles["wrapper"]}>
    <Link to="/"><button className={styles["navButton"]}>Home</button></Link>
    <Link to="/account"><button className={styles["navButton"]}>Your Account</button></Link>
    <Link to="/people"><button className={styles["navButton"]}>Show all users</button></Link>
    <span className={styles["greeting"]}>Hello, {user.name}!</span>
</div>) : null}
</>
    )
}

export default NavBar