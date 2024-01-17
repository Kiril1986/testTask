import React, { FormEvent, useState, ChangeEvent, useContext } from 'react'
import { registrationFormData, initialData, resData } from '../../components/RegistrationForm/RegistrationForm.props';
import {PREFIX} from "../../constants/vars.ts"
import styles from "./AccountPage.module.css"
import { UserContext } from '../../context/userContext.tsx';
import { useNavigate } from 'react-router-dom';

function AccountPage() {
  const { user, onChangeUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Pick<registrationFormData, "_id" | "name" | "password" | "photo">>(initialData);
  
  const validateImageFormat = (imagePath: string) => {
  const allowedExtensions = /(\.jpg)$/i;
  return allowedExtensions.exec(imagePath);
  };
  
  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "photo") {
      if (!validateImageFormat(event.target.value)) {
       setPasswordError("Please provide file with .jpg extension.");
             return;
         } else {
             setPasswordError(null);
           }
            }
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  
  const update = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const _id: string | undefined = user?._id
    const res = await fetch(`${PREFIX}/api/account`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...formData, _id})
    })
    const data: resData = await res.json()
    if (data.success) {
      onChangeUser(data.user)
      navigate("/people")
    } else {
      setPasswordError(data.error)
    }
    }
  return (
    <>
   <div>
      <h2>Update your account</h2>
      <form className={styles["formContainer"]} onSubmit={update}>
        <label>
          Enter new name
          <input type="text" name="name" value={formData.name} onChange={onChange}  required/>
        </label>
        <label>
          Enter new password
          <input type="password" name="password" value={formData.password} onChange={onChange}  required/>
        </label>
        <label>
          Enter new photo
          <input type="text" name="photo" value={formData.photo} onChange={onChange}  required accept=".jpg"/>
        </label>
        {passwordError && <p className={styles['error']}>{passwordError}</p>}
        <button className={styles["submitButton"]} type="submit">Update</button>
      </form>
    </div> 
    </>
  )
}

export default AccountPage