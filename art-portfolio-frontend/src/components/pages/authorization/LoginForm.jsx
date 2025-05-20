import { useState } from 'react';
import { useNavigate } from "react-router";
import axios from "axios";

export default function AuthForm(){
    const navigate = useNavigate();

    const [login, setLoginData] = useState({
        credential: "",
        password: ""
      });
    
    const [errors, setErrors] = useState({});

    const validateForm = (data) => {
        const errors = {};

        if (!data.credential.trim()) {
            errors.credential = 'Username or email is required';
        } else {
          if (/\S+@\S+/.test(data.credential)){
            axios.get(`https://localhost:7029/api/user/email/${data.credential}`)
                  .then(response => {
              if(response.data.length === 0)
                {errors.credential = "User with this email does not exist"};
            })
          } else {
            axios.get(`https://localhost:7029/api/user/username/${data.credential}`)
                  .then(response => {
              if(response.data.length === 0) 
                {errors.credential = "User with this username does not exist"}
            })
          }
        }

        if (!data.password) {
            errors.password = 'Password is required';
        } else if (data.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long';
        }
        return errors;
    };

      const handleChange = (e) => {
        const value = e.target.value;
        setLoginData({
          ...login,
          [e.target.name]: value
        });
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm(login);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
          const userData = {
            credential: login.credential,
            password: login.password
          };

          axios.post("https://localhost:7029/api/Auth/login", userData).then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.user.username);
            localStorage.setItem("userId", response.data.user.id);
            localStorage.setItem("isLoggedIn", true);
            axios.get({headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}});
            navigate("/explore");
          });
        }
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
            <form className="m-auto w-[80%] md:w-[50%] flex flex-col justify-start space-y-5 pt-8 pb-6" onSubmit={handleSubmit}> 
                <h1 className="text-bone font-bold text-3xl">Log In</h1>
                <p className="-mt-1">Please log in to continue</p>
                <input type="text" name='credential' value={login.credential} onChange={handleChange} 
                        className="block py-2 px-4 border border-bone lg:text-lg rounded-lg placeholder:text-bone/80 focus:ring" placeholder="Username or email" required/>
                        {errors.credential && ( <span className="error-message -mt-3 text-sm text-red-500"> {errors.credential}</span>)}

                <input type="password" name='password' value={login.password} onChange={handleChange} 
                        className="block py-2 px-4 border border-bone lg:text-lg rounded-lg placeholder:text-bone/80 focus:ring" placeholder="Password" required/>
                        {errors.password && ( <span className="error-message -mt-3 text-sm text-red-500"> {errors.password}</span>)}

                <button type="submit" className="text-white bg-cardinal hover:bg-red-800/75 rounded-2xl mt-2 px-5 py-2 text-center inline">Log In</button>
                <p>Don't have an account? <a href="/sign-up" className="font-bold text-cardinal">Sign up</a></p>
            </form>
        </div>
    </div>)
}