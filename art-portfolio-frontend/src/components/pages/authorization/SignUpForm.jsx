import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Provider } from "./SignUpFormContext"
import axios from "axios";
import UserForm from "./UserForm";
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
      const formData = new FormData();
      formData.append("nickname", information.nickname);
      formData.append("username", credentials.username);
      formData.append("email", credentials.email);
      formData.append("password", password.password);
      formData.append("dateOfBirth", credentials.dateOfBirth);
      formData.append("biography", information.biography);
      formData.append("location", information.location);
      formData.append("website", information.website);
      formData.append("profileImage", information.profileImageSrc);
      formData.append("profileImageFile", information.profileImageFile);
      formData.append("bannerImage", information.bannerImageSrc);
      formData.append("bannerImageFile", information.bannerImageFile);

      axios.post("https://localhost:7029/api/Auth/register", formData).then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.user.username);
            localStorage.setItem("userId", response.data.user.id);
            localStorage.setItem("isLoggedIn", true);
            axios.get({headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}}); 

            axios.put(`https://localhost:7029/api/user/${response.data.user.id}`);
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
