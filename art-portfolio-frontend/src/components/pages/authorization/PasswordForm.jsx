import { useState, useContext } from 'react';
import FormContext from './SignUpFormContext';

export default function PasswordForm() {
    const { password, setPassword, next} = useContext(FormContext);

      const handleChange = (e) => {
        const value = e.target.value;
        setPassword({
          ...password,
          [e.target.name]: value
        });
        const newErrors = validateForm(password);
        setErrors(newErrors);
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setPassword(password);
        
        const newErrors = validateForm(password);
        if (Object.keys(newErrors).length === 0) {
           next();
        }
    }

    const [errors, setErrors] = useState({});

    const validateForm = (data) => {
        const errors = {};

         if (!data.password) {
            errors.password = 'Password is required';
        } else if (data.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long';
        }

        if (data.confirmPassword !== data.password) {
            errors.confirmPassword = 'Passwords do not match';
        }
        return errors;
    };

    return(
        <div className="m-auto w-[80%] md:w-[50%] flex flex-col justify-start space-y-5 pt-8 pb-6">   
        <p>Email confirmation is unaviable right now.</p>
            <input type="text" name={'emailConfirm'}
                        className="block bg-bone/10 py-2 px-4 border border-bone lg:text-lg rounded-lg placeholder:text-bone/80 focus:ring" placeholder="_ _ _ _ _ _" disabled/>
            <p>Password must be at least 8 characters in lenght.</p>
            <input type="password" name={'password'} value={password.password} onChange={handleChange}
                        className="block py-2 px-4 border border-bone lg:text-lg rounded-lg placeholder:text-bone/80 focus:ring" placeholder="Password" required/>
                        {errors.password && ( <span className="error-message -mt-3 text-sm text-red-500"> {errors.password}</span>)}
            <p>Please, confirm the password</p>
            <input type="password" name={'confirmPassword'} onChange={handleChange}
                        className="block py-2 px-4 border border-bone lg:text-lg rounded-lg placeholder:text-bone/80 focus:ring" placeholder="Confirm password" required/> 
                        {errors.confirmPassword && ( <span className="error-message -mt-3 text-sm text-red-500"> {errors.confirmPassword}</span>)}           
            <button type="submit" onClick={handleSubmit} 
                 className="text-white bg-cardinal hover:bg-red-800/75 rounded-2xl mt-2 px-5 py-2 text-center inline">Continue</button>
        </div>
    )
}