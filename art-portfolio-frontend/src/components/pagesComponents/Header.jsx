import { Popover, PopoverButton, PopoverPanel} from '@headlessui/react';
import { useLocation } from "react-router";
import SearchBar from "./SearchBar";
import Add from '../icons/Add';

export default function Header({isLoggedIn}){
    const location = useLocation();
    const user = localStorage.getItem("username");
    const profileImage = localStorage.getItem("profileImageSrc");

    return(
        <>
        <nav className={location.pathname == "/sign-up" || location.pathname == "/login"? 
                        "hidden" : "bg-smoky fixed w-full z-50 top-0 start-0 border-b border-bone font-medium"}>
            <div className="max-w-screen-2xl flex items-center justify-between mx-auto md:max-lg:px-2 px-4 py-3 text-white">
                <div className="flex items-center justify-start">
                <div className="flex space-x-4">
                    <button type="button" className="inline-flex p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:ring-2">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="#cacab9" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                    <a href="/" className="flex items-center space-x-3">
                        <img src={"/defaultImages/LogoFull.png"} className="h-12 md:max-lg:h-10" alt='ArtFocus'/>
                    </a>
                </div>
            <div className="justify-between hidden md:flex md:order-1" id="navbar-sticky">
                <ul className="text-sm flex flex-col w-full md:flex-row lg:w-auto p-4 md:p-0 ml-8 space-x-4 xl:space-x-8">
                    <li className="text-center pt-2">
                        <HeaderButtons text="Explore" url="/explore"/>
                    </li>
                    <li className="text-center pt-2">
                        <HeaderButtons text="Commissions" url="/commissions"/>
                    </li>
                    <li className="text-center pt-2">
                        <HeaderButtons text="Shop" url="/shop"/>
                    </li>
                    <li className="sm:flex">
                        <SearchBar />
                    </li>
                    { isLoggedIn && (
                        <>
                            <li className="text-center pt-2">
                                <a href='/post/create' className="mt-2 text-white bg-cardinal/40 hover:bg-red-800/75 rounded-3xl px-5 py-2 text-center inline">
                               <Add /> Add post </a>
                            </li>
                        </>
                    )}
                </ul>
            </div>
            </div>
             { isLoggedIn ? (
                        <div className="flex md:order-2">
                            <Popover className="relative">
                                <PopoverButton className="mr-8 size-10 rounded-full hover:outline-2 hover:outline-offset-2 hover:outline-cardinal">
                                    <img src={ profileImage != null ? profileImage : "/defaultImages/ProfilePicture.png"} className="object-cover object-center"/>
                                </PopoverButton>
                                <PopoverPanel anchor="bottom" className="flex flex-col z-30 bg-smoky text-bone text-left p-3 rounded-lg border border-bone space-y-4">
                                    <a href={"/user/" + user} className="pt-4 block md:hover:text-white">Your profile</a>
                                    <a href={"/commissions/" + user} className="block md:hover:text-white">Your commissions</a>
                                    <a href={"/shop/" + user} className="block md:hover:text-white">Your shop</a>
                                    <a href="/settings" className="pb-3 block md:hover:text-white border-b border-bone/75">Settings</a>
                                    <a href="/" onClick={logout} className="block md:hover:text-white">Log out</a>
                                </PopoverPanel>
                                </Popover>
                        </div>
            ) : (
                        <div className="flex md:order-2 space-x-2">
                            <a href="/sign-up" 
                                className="text-white hover:underline px-5 py-2 text-center hidden ld:inline">Sign Up</a>
                            <a href="/login" 
                                className="text-white bg-cardinal hover:bg-red-800/75 rounded-3xl px-5 py-2 text-center inline">Log In</a>
                        </div>
                    )}
            </div>
        </nav>
        <div className="pt-20"></div>
        </>
    )
}

function HeaderButtons(props){
    return(
        <a href={props.url} className="inline text-bone font-semibold tracking-wide md:hover:text-white text-medium hover:underline">{props.text}</a>
    )
}

const logout=()=>{
    localStorage.clear();
}