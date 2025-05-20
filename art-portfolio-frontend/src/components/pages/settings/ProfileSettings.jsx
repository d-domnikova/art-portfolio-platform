import { useState, useRef, useContext, useEffect } from "react";

import axios from "axios";
import ImagePicker from "../../icons/ImagePicker";

export default function ProfileSettings(){
    const [user, setUser] = useState({});
    let id = localStorage.getItem("userId");
    const [avatarURL, setAvatarURL] = useState();
    const [bannerURL, setBannerURL] = useState();
    const fileUploadRef = useRef(null);  
    const fileUploadBanner = useRef(null); 

        {useEffect(() => {
            axios.get(`https://localhost:7029/api/user/${id}`)
            .then(response => {console.log(response.data)
                 setUser(response.data);
             })
             .catch(error => {
                 console.error(error);
             });
         }, []);
        }
        
    console.log(user)    
    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
                nickname: user.nickname,
                biography: user.biography,
                location: user.location,
                website: user.website,
                profileImage: "",
                bannerImage: ""
              };
            axios.put(`https://localhost:7029/api/user/${id}`, userData, 
                { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}}).then(
                    window.location.reload(false)
              );  
    }
    
    const handleChange = (e) => {
        const value = e.target.value;
        setUser({
          ...user,
          [e.target.name]: value
        });
      };    

    const uploadAvatarDisplay = async () => {
        const uploadedFile = fileUploadRef.current.files[0];
        const cachedURL = URL.createObjectURL(uploadedFile);
        setAvatarURL(cachedURL);
    }

    const uploadBannerDisplay = async () => {
        const uploadedFile = fileUploadBanner.current.files[0];
        const cachedURL = URL.createObjectURL(uploadedFile);
        setBannerURL(cachedURL);
    }

    return(
        <>
            <form className="m-auto w-[80%] md:w-[60%] flex flex-col justify-start space-y-5 mt-4">         
                <label for="banner-file" className="flex items-center justify-center w-full md:h-44 h-36 bg-cardinal/20 rounded-lg border border-dashed border-bone/80 cursor-pointer hover:bg-cardinal/40">
                    {bannerURL != null && <img className="object-center object-cover w-full md:h-44 h-36 rounded-lg" src={bannerURL} />}
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                       {bannerURL == null && 
                        <>
                           <ImagePicker />
                           <p className="mb-2 text-sm"><span className="font-semibold">Click to upload image</span> or drag and drop</p>
                       </>}
                    </div>
                    <input id="banner-file" type="file" className="hidden" accept="image/*" onChange={uploadBannerDisplay}/>
                </label>
                <div className="flex justify-start space-x-4">
                    <label for="avatar-file" className="-mr-4 flex items-center justify-center md:size-30 size-24 bg-cardinal/20 rounded-full border border-dashed border-bone/80 cursor-pointer hover:bg-cardinal/40">
                    {avatarURL != null && <img className="object-center object-cover md:size-30 size-24 rounded-full" src={avatarURL} />}
                    <div className="flex flex-col items-center justify-center pt-7 pb-6">
                        {avatarURL == null && <ImagePicker />}
                    </div>
                    <input id="avatar-file" type="file" className="hidden" accept="image/*" onChange={uploadAvatarDisplay}/>
                </label>
                    <input type="text" name='nickname' value={user.nickname} onChange={handleChange} 
                            className="block place-self-center w-full h-12 py-2 px-4 ml-8 border border-bone lg:text-lg rounded-lg placeholder:text-bone/80 focus:ring" placeholder="Profile name" />   
                </div>
                <label className="font-bold">Location <span className="font-normal text-bone/70">(optional)</span></label>
                    <input type="text" name='location' value={user.location} onChange={handleChange}
                            className="block -mt-2.5 py-2 px-4 border border-bone lg:text-lg rounded-lg placeholder:text-bone/80 focus:ring" placeholder="Location" />   
                <label className="font-bold">Website <span className="font-normal text-bone/70">(optional)</span></label>
                    <input type="text" name='website' value={user.website} onChange={handleChange}
                            className="block -mt-2.5 py-2 px-4 border border-bone lg:text-lg rounded-lg placeholder:text-bone/80 focus:ring" placeholder="Website" /> 
                <label className="font-bold">Description <span className="font-normal text-bone/70">(optional)</span></label>
                    <textarea name="description" value={user.description} onChange={handleChange}
                            className="-mt-2.5 p-4 w-full border border-bone lg:text-lg rounded-lg outline-hidden resize-none focus:ring placeholder:text-bone/80" rows="2" placeholder="Description" />

                <button type="submit" onClick={handleSubmit} 
                        className="mt-2 text-white bg-cardinal hover:bg-red-800/75 rounded-3xl px-5 py-2 text-center inline">Confirm</button>
            </form>
        </>
    )
}