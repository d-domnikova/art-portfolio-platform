import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import SearchBar from './SearchBar'

export default function MobileNav(){
    const [open, setOpen] = useState(false);
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const links = [
        { href: '/explore', label: 'Explore' },
        { href: '/commissions', label: 'Commissions' },
        { href: '/shop', label: 'Shop' },
    ]

    return(
        <>
         <button onClick={() => setOpen(true)} className="lg:hidden inline-flex p-2 size-10 justify-center rounded-lg hover:ring-2">
                <svg className="size-5 mt-0.75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button >
        <Dialog open={open} onClose={setOpen} className="flex space-x-4 lg:hidden">
            <DialogBackdrop transition
                      className="fixed inset-0 bg-smoky/70 transition-opacity data-[closed]:opacity-0 duration-100 data-[enter]:ease-out data-[leave]:ease-in"/>
            <DialogPanel transition
                className="absolute inset-y-0 left-0 mt-20 z-15 bg-smoky border-r focus:outline-none transition-all 
                        data-[closed]:-translate-x-6 data-[closed]:opacity-0 duration-100 data-[enter]:ease-out data-[leave]:ease-in">
                    <div as="div" className="block md:hidden mx-4 py-3"> <SearchBar /> </div>
                {links.map((link) => (<div key={link.href}>
                    <a href={link.href} className='block px-6 text-xl font-semibold py-3 hover:bg-bone/10 hover:underline hover:text-white'>{link.label}</a></div>))}
                    { !isLoggedIn && (<>
                        <div className="my-4 h-0.5 bg-bone/25" />
                        <div>
                            <a href="/sign-up" className="mx-6 mt-6 mb-4 text-white border hover:bg-red-800/50 rounded-3xl px-5 py-2 text-center block">Sign Up</a>
                        </div>
                        <div>
                            <a href="/login" className="mx-6 text-white bg-cardinal hover:bg-red-800/75 rounded-3xl px-5 py-2 text-center block">Log In</a>
                        </div>
                    </>
                    )}
            </DialogPanel>
        </Dialog>
        </>
    )
}