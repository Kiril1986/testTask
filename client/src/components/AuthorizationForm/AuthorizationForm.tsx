import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { initialData } from './AuthorizationForm.props';
import { useNavigate } from 'react-router-dom';
import { registrationFormData, resData } from '../RegistrationForm/RegistrationForm.props';
import {PREFIX} from "../../constants/vars.ts"
import styles from "./AuthorizationForm.module.css"
import { UserContext } from '../../context/userContext.tsx';

function AuthorizationForm() {
  const { onChangeUser } = useContext(UserContext);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Pick<registrationFormData, "email" | "password">>(initialData);
    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    const navigate = useNavigate();
const auth = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
  const dbOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({formData})
   }
   e.preventDefault()
  const res = await fetch(`${PREFIX}/api/auth`, dbOptions)
  const data: resData = await res.json();
    if (data.success) {
   onChangeUser(data.user)
   localStorage.setItem("userId", data.user._id)
   // navigate("/people")
  }
  else {
    setPasswordError(data.error)
  }
  }
  return (
        <div>
          <h2>Sign in</h2>
          <form className={styles["formContainer"]} onSubmit={auth}>
             <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                required
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={onChange}
                required
              />
            </label>
            {passwordError && <p className={styles['error']}>{passwordError}</p>}
            <button  className={styles["submitButton"]} type="submit">Get in</button>
          </form>
        </div>
      );
}

export default AuthorizationForm