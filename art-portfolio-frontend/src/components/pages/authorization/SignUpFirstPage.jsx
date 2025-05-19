import { useState, useContext } from 'react';
import FormContext from './SignUpFormContext';
import axios from 'axios';

export default function SignUpFirstPage(){
    const { credentials, setCredentials, next} = useContext(FormContext);

      const handleChange = (e) => {
        const value = e.target.value;
        setCredentials({
          ...credentials,
          [e.target.name]: value
        });
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setCredentials(credentials);
        const newErrors = validateForm(credentials);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
           next();
        }
    }

    const [errors, setErrors] = useState({});

    const validateForm = (data) => {
        const errors = {};

        if (!data.username.trim()) {
            errors.username = 'Username is required';
        } else if (data.username.length < 6) {
            errors.username = 'Username must be at least 6 characters long';
        } else {
            axios.get(`https://localhost:7029/api/user/username/${data.username}`)
            .then(response => {
              if(response.data.length != 0) 
                {errors.credential = "This username is already taken"};
          })
        }

        if (!data.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Invalid email';
        } else {
         axios.get(`https://localhost:7029/api/user/email/${data.email}`)
            .then(response => {
              if(response.data.length != 0) 
                {errors.credential = "This email is already taken"};
         })
        }
        return errors;
    };

    return (
    <div className="md:grid md:grid-cols-7 h-full gap-3 w-full h-full">
        <div className="bg-cardinal col-span-3 -mx-8 -mt-20 h-24 md:h-screen -mb-8">
            <a href="/" className="inline-block items-center mx-6 mt-4">
                        <span className="self-center text-white text-xl font-semibold xl:text-2xl hover:text-smoky/40">ArtFocus</span>
                    </a>
            <img src="/"/>
        </div>
        <div className="col-span-4 h-full flex flex-col items-start">
            <div className="m-auto w-[80%] md:w-[50%] flex flex-col justify-start space-y-5 pt-8 pb-6"> 
                <h1 className="text-bone font-bold text-3xl">Sign Up</h1>
                <p className="-mt-1">Create an account to get started</p>
                <input type="text" name={"username"} value={credentials.username} onChange={handleChange}
                        className="block py-2 px-4 border border-bone lg:text-lg rounded-lg placeholder:text-bone/80 focus:ring" placeholder="Username" required/> 
                        {errors.username && ( <span className="error-message -mt-3 text-sm text-red-500"> {errors.username}</span>)}

                <input type="text" name={"email"} value={credentials.email} onChange={handleChange}
                        className="block py-2 px-4 border border-bone lg:text-lg rounded-lg placeholder:text-bone/80 focus:ring" placeholder="Email" required/>
                        {errors.email && ( <span className="error-message -mt-3 text-sm text-red-500"> {errors.email}</span>)}

                <input type="date" name={"dateOfBirth"} value={credentials.dateOfBirth} onChange={handleChange}
                        className='block py-2 px-4 border border-bone rounded-lg' required/>
                <button type="submit" onClick={handleSubmit} 
                    className="text-white bg-cardinal hover:bg-red-800/75 rounded-2xl mt-2 px-5 py-2 text-center inline">Continue</button>
                <p>Already have an account? <a href="/login" className="font-bold text-cardinal">Log in</a></p>
            </div>
        </div>
    </div>
    )
}