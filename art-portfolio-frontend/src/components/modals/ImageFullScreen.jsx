import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'


export default function ImageFullScreen({imageUrl}){
    const [open, setOpen] = useState(false);
    return (
        <>
        <img onClick={() => setOpen(true)} src={imageUrl} className="min-h-70 max-h-150 cursor-pointer"/>
            <Dialog open={open} onClose={setOpen} className="flex space-x-4 justify-center">
                <DialogBackdrop 
                          className="fixed inset-0 size-full z-25 bg-smoky/70 transition-opacity data-[closed]:opacity-0 duration-100 data-[enter]:ease-out data-[leave]:ease-in"/>
                    <DialogPanel transition className="absolute inset-y-0 z-30 transition-all py-2 place-content-center 
                                data-[closed]:opacity-0 duration-100 data-[enter]:ease-out data-[leave]:ease-in">
                            <button onClick={() => setOpen(false)} className='cursor-pointer fixed top-6 right-6 size-8 bg-bone/30 hover:bg-bone/50 rounded-full'>
                                <svg className="ml-2 size-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                            </button>
                            <img src={imageUrl} className="max-h-full max-w-full"/>
                </DialogPanel>
            </Dialog>
        </>
    )
}