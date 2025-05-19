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
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setPassword(password);
        next();
    }

    return(
        <div className="m-auto w-[80%] md:w-[50%] flex flex-col justify-start space-y-5 pt-8 pb-6">   
        <p>Email confirmation is unaviable right now.</p>
            <input type="text" name={'emailConfirm'}
                        className="block bg-bone/10 py-2 px-4 border border-bone lg:text-lg rounded-lg placeholder:text-bone/80 focus:ring" placeholder="_ _ _ _ _ _" disabled/>
            <p>Password must be at least 8 characters in lenght.</p>
            <input type="password" name={'password'} value={password.password} onChange={handleChange}
                        className="block py-2 px-4 border border-bone lg:text-lg rounded-lg placeholder:text-bone/80 focus:ring" placeholder="Password" required/>
            <p>Please, confirm the password</p>
            <input type="password" onChange={handleChange}
                        className="block py-2 px-4 border border-bone lg:text-lg rounded-lg placeholder:text-bone/80 focus:ring" placeholder="Confirm password" required/>            
            <button type="submit" onClick={handleSubmit} 
                 className="text-white bg-cardinal hover:bg-red-800/75 rounded-2xl mt-2 px-5 py-2 text-center inline">Continue</button>
        </div>
    )
}