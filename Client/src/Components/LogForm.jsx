import {useState, useEffect } from 'react'
import apisLink from "../apis/users";
import {log_validate} from './FormValidation';
import './RegForm.css'

const LogForm = (callback, validate) => {

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
            const response = await apisLink.post('/users/login', {
                username: values.username,
                password: values.pwd
            })
        }
    } catch (err) {
        console.error(err);
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

const LoginForm = () => {
  const {values, handleChange, handleSubmit, errors} = LogForm(login, log_validate);

    function login() {
        console.log(values);
    }

    return (
        <div className="register-container">
            <div  className="register-title">
                <p>Login</p>
            </div>
            <div>
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        className={errors.username ? "error" : "non-error"} 
                        placeholder="Username"
                        type="text"
                        name="username"
                        onChange={handleChange}
                        value={values.username || ''}
                    />
                    {errors.username ? <p className="p-error">{errors.username}</p> : null}
                    
                    <input
                        className={errors.pwd ? "error" : "non-error"}
                        placeholder="Password"
                        type="password"
                        name="pwd"
                        onChange={handleChange}
                        value={values.pwd || ''}
                    />
                    {errors.pwd ? <p className="p-error">{errors.pwd}</p> : null}
                    <input 
                        type="submit" className="submit"  name="submit" value="Submit"
                    />
                </form>
            </div>
        </div>
    )
}

export default LoginForm;