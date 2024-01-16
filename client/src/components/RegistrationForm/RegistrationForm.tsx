import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { registrationFormData, initialData, resData } from './RegistrationForm.props';
import {PREFIX} from "../../constants/vars.ts";
import styles from "./RegistrationForm.module.css"
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext.tsx';

function RegistrationForm () {
  const { onChangeUser } = useContext(UserContext);
  const [formData, setFormData] = useState<registrationFormData>(initialData);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  function getMaxDate() {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
    const year = maxDate.getFullYear();
    const month = String(maxDate.getMonth() + 1).padStart(2, '0');
    const day = String(maxDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const navigate = useNavigate();
  const register = async (e: FormEvent<HTMLFormElement>):  Promise<void> => {
    e.preventDefault()
    if (formData.password !== formData.cpassword) {
      setPasswordError('Passwords do not match');
      return;
    } else {
      setPasswordError(null);
    }
    const dbOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({formData})
     }
    const res = await fetch(`${PREFIX}/api/register`, dbOptions);
    const data: resData = await res.json();
      if (data.success) {
      onChangeUser(data.user)
      localStorage.setItem("userId", data.user._id)
      navigate("/people")
    } 
    else {
      setPasswordError(data.error)
    }
    }

  return (
    <div>
      <h2>Register yourself</h2>
      <form onSubmit={register} className={styles["formContainer"]}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
          />
        </label>
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
        <label>
          Confirm your password:
          <input
            type="password"
            name="cpassword"
            value={formData.cpassword}
            onChange={onChange}
            required
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={onChange}
            max={getMaxDate()}
            required
          />
        </label>
        <label>
          Gender:
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={onChange}
            required
          />
        </label>
         <label>
          Photo:
          <input
            type="text"
            name="photo"
            value={formData.photo}
            onChange={onChange}
            required
          />
        </label>
        {passwordError && <p className={styles['error']}>{passwordError}</p>}
        <button type="submit" className={styles["submitButton"]}>Register</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
