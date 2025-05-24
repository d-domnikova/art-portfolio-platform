import { Popover, PopoverButton, PopoverPanel} from '@headlessui/react';
import { useLocation } from "react-router";
import SearchBar from "./SearchBar";
import Add from '../icons/Add';
import MobileNav from './MobileNav';

export default function Header({isLoggedIn}){
    const location = useLocation();
    const user = localStorage.getItem("username");
    const profileImage = localStorage.getItem("profileImageSrc");

    const links = [
        { href: '/explore', label: 'Explore' },
        { href: '/commissions', label: 'Commissions' },
        { href: '/shop', label: 'Shop' },
    ]

    return(
        <>
        <nav className={location.pathname == "/sign-up" || location.pathname == "/login"? 
                        "hidden" : "bg-smoky fixed w-full z-20 top-0 start-0 border-b border-bone font-medium"}>
            <div className="max-w-screen-2xl flex items-center justify-between mx-auto md:max-lg:px-2 px-4 py-3 text-white">
                <div className="flex items-center justify-start">
                    <div className="flex space-x-4">
                    <MobileNav />
                    <a href="/" className="flex items-center space-x-3">
                        <img src={"/defaultImages/LogoFull.png"} className="h-12 md:max-lg:h-10" alt='ArtFocus'/>
                    </a>
                </div>
            <div className="flex justify-between md:order-1">
                <ul className="text-sm flex flex-col w-full md:flex-row lg:w-auto p-4 md:p-0 ml-8 space-x-4 xl:space-x-8">
                    {links.map((link) => (
                        <li key={link.href} className="hidden lg:flex text-center pt-2"> <HeaderButtons text={link.label} url={link.href}/> </li>
                    ))}
                    <li className="hidden md:flex">
                        <SearchBar />
                    </li>
                </ul>
            </div>
            </div>
             { isLoggedIn ? (
                        <div className="flex md:order-2">
                            <a href='/post/create' className="mr-8 my-1 text-white bg-cardinal/40 hover:bg-red-800/75 rounded-3xl px-4 py-2 text-center block">
                                <Add /><span className='hidden sm:inline'>Add post</span>
                            </a>
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
        <div className="pt-20" />
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