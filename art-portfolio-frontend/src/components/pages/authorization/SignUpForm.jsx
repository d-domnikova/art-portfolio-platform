import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Provider } from "./SignUpFormContext"
import axios from "axios";
import UserForm from "../UserForm";
import PasswordForm from "./PasswordForm";
import SignUpFirstPage from "./SignUpFirstPage";

export default function SignUpForm(){
  const navigate = useNavigate();

  const renderStep = (step) => {
    switch (step) {
        case 0:
        return <SignUpFirstPage />;
        case 1:
        return <PasswordForm />;
        case 2:
        return <UserForm />;
        default:
        return null;
      }
    };

    const credentialsInit = {
      email: "",
      username: "",
      dateOfBirth: "",
    };

    const passwordInit = {
      password: ""
    }

    const informationInit = {
      nickname: "",
      biography: "",
      location: "",
      website: "",
      profileImage: "",
      bannerImage: ""
    };

  const [credentials, setCredentials] = useState(credentialsInit);
  const [password, setPassword] = useState(passwordInit);
  const [information, setInformation] = useState(informationInit);

  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    if (currentStep === 2) {
      setCurrentStep(0);
      setCredentials(credentialsInit);
      setPassword(passwordInit)
      setInformation(informationInit);
      const userData = {
        nickname: information.nickname,
        username: credentials.username,
        email: credentials.email,
        password: password.password,
        dateOfBirth: credentials.dateOfBirth,
        biography: information.biography,
        location: information.location,
        website: information.website,
        profileImage: information.profileImage,
        bannerImage: information.bannerImage
      }
      axios.post("https://localhost:7029/api/Auth/register", userData).then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.user.username);
            localStorage.setItem("userId", response.data.user.id);
            localStorage.setItem("isLoggedIn", true);
            axios.get({headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}});
            navigate(`/user/${localStorage.getItem("username")}`);
          });
      return;
    }
    setCurrentStep(currentStep + 1);
  };
  
  return (
    <>
      <Provider value={{ credentials, setCredentials, password, setPassword, next, information, setInformation }}>
        <main>{renderStep(currentStep)}</main>
      </Provider>
    </>
  );
}
