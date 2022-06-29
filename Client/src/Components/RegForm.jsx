import React, {useState, useEffect } from 'react'
import apisLink from "../apis/users";
import { reg_validate } from './FormValidation';
import './RegForm.css'

const RegForm = (callback, validate) => {

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
  }, );

  const handleSubmit = async (event) => {
    if (event) 
        event.preventDefault();
    try {
        setIsSubmitting(true);
        setErrors(validate(values));
        if (Object.keys(errors).length === 0) {
            const response = await apisLink.post('/users/register', {
                first_name: values.fname,
                last_name: values.lname,
                username: values.username,
                email: values.email,
                password: values.pwd
            })
        }
    } catch (err) {
        console.log(err.response);
        if (err.response.data === "Username or email already in use");
        {
          let new_err = {};
          new_err.username = "Username or email already in use";
          console.log("***********")
          console.log(errors);
        }
    }

  };

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors
  }
};

const Registration = () => {
  const {values, handleChange, handleSubmit, errors} = RegForm(login, reg_validate);
    
  function login() {
      console.log(values);
  }
  
  return (
      <div className="register-container">
          <div className="register-title">
            <p>Register</p>
          </div>
          <div >
            <form className="form" onSubmit={handleSubmit}>
                <input className={errors.fname ? "error" : "non-error"} 
                  placeholder="First Name" type="text" name="fname" onChange={handleChange} value={values.fname || ''}
                />
                  {errors.fname ? <p className="p-error">{errors.fname}</p> : null}
                
                <input className={errors.lname ? "error" : "non-error"}  placeholder="Last Name" type="text" name="lname" onChange={handleChange} value={values.lname || ''}/>
                  {errors.lname ? <p className="p-error">{errors.lname}</p> : null}
                
                <input className={errors.username ? "error" : "non-error"} placeholder="Username" type="text" name="username" onChange={handleChange} value={values.username || ''}/>
                  {errors.username ? <p className="p-error">{errors.username}</p> : null}
                
                <input className={errors.email ? "error" : "non-error"} placeholder="Email" type="text" name="email" onChange={handleChange} value={values.email || ''}/>
                  {errors.email ? <p className="p-error">{errors.email}</p> : null}
                
                <input className={errors.pwd ? "error" : "non-error"} placeholder="Password" type="password" name="pwd" onChange={handleChange} value={values.pwd || ''}/>
                  {errors.pwd ? <p className="p-error">{errors.pwd}</p> : null}
                
                <input className={errors.pwd2 ? "error" : "non-error"} placeholder="Confirm Password" type="password" name="pwd2" onChange={handleChange} value={values.pwd2 || ''} />
                  {errors.pwd2 ? <p className="p-error">{errors.pwd2}</p> : null}
                
                <input type="submit" name="submit" className="submit" value="Submit"/>
            </form>
          </div>
      </div>
  )
}


export default Registration;