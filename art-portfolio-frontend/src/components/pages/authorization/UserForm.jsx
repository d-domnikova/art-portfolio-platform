import { useState, useRef, useContext } from "react";
import FormContext from './SignUpFormContext';
import ImagePicker from "../../icons/ImagePicker";

export default function UserForm(){
    const { information, setInformation, next} = useContext(FormContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        setInformation(information);
        next();
    }
    
    const handleChange = (e) => {
        const value = e.target.value;
        setInformation({
          ...information,
          [e.target.name]: value
        });
      };    

    const uploadProfileImageDisplay = (e) => {
            const uploadedFile = e.target.files[0];
            console.log(e.target.files)
            const reader = new FileReader(); 
            reader.onload = x => {
                setInformation({  
                    ...information,
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
                setInformation({  
                    ...information,
                    bannerImageFile: uploadedFile,
                    bannerImageSrc: x.target.result
                })
            }
            reader.readAsDataURL(uploadedFile);
    }

    return(
        <>
            <div className="block -mt-16 -mx-6">
                <a href="/" className="inline-block items-center mx-4">
                    <span className="self-center text-white text-xl font-semibold xl:text-2xl hover:text-bone/40">ArtFocus</span>
                </a>
            </div>
            <form className="m-auto w-[80%] md:w-[60%] flex flex-col justify-start space-y-5 mt-4" autocomplete="off">         
                <label for="bannerImageFile" className="flex items-center justify-center w-full md:h-44 h-36 bg-cardinal/20 rounded-lg border border-dashed border-bone/80 cursor-pointer hover:bg-cardinal/40">
                    {information.bannerImageSrc != null && <img className="object-center object-cover w-full md:h-44 h-36 rounded-lg" src={information.bannerImageSrc} />}
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                       {information.bannerImageSrc == null && 
                        <>
                           <ImagePicker />
                           <p className="mb-2 text-sm font-semibold">Click to upload image</p>
                       </>}
                    </div>
                    <input id="bannerImageFile" type="file" className="hidden" accept="image/*" onChange={uploadBannerImageDisplay}/>
                </label>
                <div className="flex justify-start space-x-4">
                    <label for="profileImageFile" className="-mr-4 flex items-center justify-center md:size-30 size-24 bg-cardinal/20 rounded-full border border-dashed border-bone/80 cursor-pointer hover:bg-cardinal/40">
                    {information.profileImageSrc != null && <img className="object-center object-cover md:size-30 size-24 rounded-full" src={information.profileImageSrc} />}
                    <div className="flex flex-col items-center justify-center pt-7 pb-6">
                        {information.profileImageSrc == null && <ImagePicker />}
                    </div>
                    <input id="profileImageFile" type="file" className="hidden" accept="image/*" onChange={uploadProfileImageDisplay}/>
                </label>
                    <input type="text" name={'nickname'} value={information.nickname} onChange={handleChange} 
                            className="block place-self-center w-full h-12 py-2 px-4 ml-8 border border-bone lg:text-lg rounded-lg placeholder:text-bone/80 focus:ring" placeholder="Profile name" />   
                </div>
                <label className="font-bold">Location <span className="font-normal text-bone/70">(optional)</span></label>
                    <input type="text" name={'location'} value={information.location} onChange={handleChange}
                            className="block -mt-2.5 py-2 px-4 border border-bone lg:text-lg rounded-lg placeholder:text-bone/80 focus:ring" placeholder="Location" />   
                <label className="font-bold">Website <span className="font-normal text-bone/70">(optional)</span></label>
                    <input type="text" name={'website'} value={information.website} onChange={handleChange}
                            className="block -mt-2.5 py-2 px-4 border border-bone lg:text-lg rounded-lg placeholder:text-bone/80 focus:ring" placeholder="Website" /> 
                <label className="font-bold">Description <span className="font-normal text-bone/70">(optional)</span></label>
                    <textarea name={"biography"} value={information.biography} onChange={handleChange}
                            className="-mt-2.5 p-4 w-full border border-bone lg:text-lg rounded-lg outline-hidden resize-none focus:ring placeholder:text-bone/80" rows="2" placeholder="Description" />

                <button type="submit" onClick={handleSubmit} 
                        className="mt-2 text-white bg-cardinal hover:bg-red-800/75 rounded-3xl px-5 py-2 text-center inline">Confirm</button>
            </form>
        </>
    )
}
