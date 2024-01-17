import React from 'react'
import { UserData } from './UserCard.props'
import styles from "./UserCard.module.css"

function UserCard({user}: UserData) {
  
    function calculateAge(birthdate: string) {
    const currentDate = new Date();
    const birthdateDate = new Date(birthdate);
    let age = currentDate.getFullYear() - birthdateDate.getFullYear();
    if (
      currentDate.getMonth() < birthdateDate.getMonth() ||
      (currentDate.getMonth() === birthdateDate.getMonth() &&
        currentDate.getDate() < birthdateDate.getDate())
    ) {
      age--;
    }
      return age;
  }

  const age = calculateAge(user.birthDate);

    return (
    <div className={styles["wrapper"]}>
        <img alt="profile photo" className={styles["image"]} src={user.photo}/>
        <span>Name: {user.name}</span>
        <span>Age: {age}</span>
    </div>
  )
}

export default UserCard