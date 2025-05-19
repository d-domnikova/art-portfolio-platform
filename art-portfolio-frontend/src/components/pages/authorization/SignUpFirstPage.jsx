import { useState, useContext } from 'react';
import FormContext from './SignUpFormContext';

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
        next();
    }

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
                <input type="text" name={"email"} value={credentials.email} onChange={handleChange}
                        className="block py-2 px-4 border border-bone lg:text-lg rounded-lg placeholder:text-bone/80 focus:ring" placeholder="Email" required/>
                <input type="date" name={"dateOfBirth"} value={credentials.dateOfBirth} onChange={handleChange}
                        className='block py-2 px-4 border border-bone rounded-lg' required/>
                <button type="submit" onClick={handleSubmit} 
                    className="text-white bg-cardinal hover:bg-red-800/75 rounded-2xl mt-2 px-5 py-2 text-center inline">Continue</button>
                <p>Already have an account? <a href="/login" className="font-bold text-cardinal">Log in</a></p>
            </div>
        </div>
    </div>)
}