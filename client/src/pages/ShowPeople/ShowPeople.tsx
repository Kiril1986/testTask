import React, { useContext, useEffect, useState } from 'react'
import {PREFIX} from "../../constants/vars"
import {User} from "../../components/UserCard/UserCard.props"
import UserCard from '../../components/UserCard/UserCard';
import styles from "./ShowPeople.module.css"
import { UserContext } from '../../context/userContext';
import { usersData } from './ShowPeople.props';

const ShowPeople = React.memo(() => {
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useContext(UserContext);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function getAllUsers() {
      const res = await fetch(`${PREFIX}/people`);
      const data: usersData = await res.json();
      if (data.success) {
        const users = data.users.filter((el: User) => el._id !== user?._id);
        const updatedUsers = users.map((el) => {
          return { ...el, photo: `${PREFIX}/${el.photo}` };
        });
        setUsers(updatedUsers);
      } 
      else {
        setError(data.error)
      }
    }
    getAllUsers();
  }, [user]);

  return (
    <>
      <div className={styles['wrapper']}>
        {users && users.map((user) => (
          <UserCard key={user._id.toString()} user={user} />
        ))}
      </div>
      {error && <p className={styles['error']}>{error}</p>}
    </>
  );
});

export default ShowPeople;
