import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { useState, useEffect } from "react";
import DeleteModal from "../modals/DeleteModal";
import ThreeDots from "../icons/ThreeDots";
import axios from 'axios';

export default function Comment(props){
    const [user, setUser] = useState([])

    useEffect(() => {
        axios.get(`https://localhost:7029/api/user/${props.userId}`)
        .then(response => {
             setUser(response.data);
         })
         .catch(error => {
             console.error(error);
         });
    }, []);

    return(
        <div className="bg-cardinal/20 w-full min-h-20 rounded-xl text-white">
            <div className="flex justify-start space-x-3">
                <div className="mt-4 ml-2 size-12 bg-red-200/40 rounded-full">
                    <img src={user.profileImageSrc != null ? user.profileImageSrc :"/defaultImages/ProfilePicture.png"}/>
                </div>
                <div className="space-y-2 w-full">
                    <div className="mt-2 flex space-x-2 relative">
                        <h1 className="text-white font-semibold md:text-lg">{user.nickname}</h1>
                        <p className="md:text-base text-bone/75 text-sm mt-0.5">@{user.username}</p>
                        {localStorage.getItem("userId") == user.userId && 
                            <Popover className="absolute top-2 right-4">
                                <PopoverButton className="mr-8 rounded-full hover:ring"><ThreeDots /></PopoverButton>
                                <PopoverPanel anchor="bottom" className="flex flex-col mt-2 z-30 bg-smoky text-bone p-2 rounded-lg border border-bone space-y-2">
                                    <DeleteModal id={user.id} type="comment"/>
                                </PopoverPanel>
                            </Popover>
                        }
                    </div>
                <p className="text-sm md:text-base">{user.commentBody}</p>
                </div>
            </div>    
        </div>
    )
}