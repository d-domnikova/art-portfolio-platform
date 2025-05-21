import { useState, useEffect } from "react";
import axios from "axios";
import ImagePicker from "../../icons/ImagePicker";

export default function ProfileSettings(){
    const [user, setUser] = useState({
        nickname: '',
        biography: '',
        location: '',
        website: ''
    });
    let id = localStorage.getItem("userId");

        {useEffect(() => {
            axios.get(`https://localhost:7029/api/user/${id}`)
            .then(response => {
                 setUser(response.data);
             })
             .catch(error => {
                 console.error(error);
             });
         }, []);
        }
                        
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("nickname", user.nickname);
        formData.append("username", user.username);
        formData.append("email", user.email);
        formData.append("password", user.password);
        formData.append("dateOfBirth", user.dateOfBirth);
        formData.append("biography", user.biography);
        formData.append("location", user.location);
        formData.append("website", user.website);
        formData.append("profileImage", user.profileImageSrc);
        formData.append("profileImageFile", user.profileImageFile);
        formData.append("bannerImage", user.bannerImageSrc);
        formData.append("bannerImageFile", user.bannerImageFile);

        axios.put(`https://localhost:7029/api/user/${id}`, formData, 
            { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}});
    }
    
    const handleChange = (e) => {
        const value = e.target.value;
        setUser({
          ...user,
          [e.target.name]: value
        });
      };  

    const uploadProfileImageDisplay = (e) => {
            const uploadedFile = e.target.files[0];
            console.log(e.target.files)
            const reader = new FileReader(); 
            reader.onload = x => {
                setUser({  
                    ...user,
                    profileImageFile: uploadedFile,
                    profileImageSrc: x.target.result
                })
            }
            reader.readAsDataURL(uploadedFile);
    }

        const uploadBannerImageDisplay = (e) => {
            const uploadedFile = e.target.files[0];
            console.log(e.target.files)
            const reader = new FileReader(); 
            reader.onload = x => {
                setUser({  
                    ...user,
                    bannerImageFile: uploadedFile,
                    bannerImageSrc: x.target.result
                })
            }
            reader.readAsDataURL(uploadedFile);
    }

    return(
        <>
            <form className="m-auto w-[80%] md:w-[60%] flex flex-col justify-start space-y-5 mt-4" autocomplete="off">         
                <label for="bannerImage" className="flex items-center justify-center w-full md:h-44 h-36 bg-cardinal/20 rounded-lg border border-dashed border-bone/80 cursor-pointer hover:bg-cardinal/40">
                    {user.bannerImageSrc != null && <img className="object-center object-cover w-full md:h-44 h-36 rounded-lg" src={user.bannerImageSrc} />}
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                       {user.bannerImageSrc == null && 
                        <>
                           <ImagePicker />
                           <p className="mb-2 text-sm font-semibold">Click to upload image</p>
                       </>}
                    </div>
                    <input id="bannerImage" type="file" className="hidden" accept="image/*" onChange={uploadBannerImageDisplay}/>
                </label>
                <div className="flex justify-start space-x-4">
                    <label for="profileImage" className="-mr-4 flex items-center justify-center md:size-30 size-24 bg-cardinal/20 rounded-full border border-dashed border-bone/80 cursor-pointer hover:bg-cardinal/40">
                    {user.profileImageSrc != null && <img className="object-center object-cover md:size-30 size-24 rounded-full" src={user.profileImageSrc} />}
                    <div className="flex flex-col items-center justify-center pt-7 pb-6">
                        {user.profileImageSrc == null && <ImagePicker />}
                    </div>
                    <input id="profileImage" type="file" className="hidden" accept="image/*" onChange={uploadProfileImageDisplay}/>
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
                    <textarea name="biography" value={user.biography} onChange={handleChange}
                            className="-mt-2.5 p-4 w-full border border-bone lg:text-lg rounded-lg outline-hidden resize-none focus:ring placeholder:text-bone/80" rows="2" placeholder="Description" />

                <button type="submit" onClick={handleSubmit} 
                        className="mt-2 text-white bg-cardinal hover:bg-red-800/75 rounded-3xl px-5 py-2 text-center inline">Confirm</button>
            </form>
        </>
    )
}