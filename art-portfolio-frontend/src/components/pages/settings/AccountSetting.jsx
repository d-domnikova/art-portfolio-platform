import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'

export default function AccountSettings(){
    return(
        <div className='space-y-6 mt-4'>
            <Disclosure as="div">
                <DisclosureButton className="font-bold text-xl hover:text-white hover:underline pl-4">Change username</DisclosureButton>
                <DisclosurePanel className="space-y-4 pt-4 pl-8">
                    <input type="text" className="block py-2 px-4 border border-bone lg:text-lg rounded-lg placeholder:text-bone/80 focus:ring" placeholder="Username" required/> 
                </DisclosurePanel>
            </Disclosure>
            <Disclosure as="div"> 
                <DisclosureButton className="font-bold text-xl hover:text-white hover:underline pl-4">Change birth date</DisclosureButton>
                <DisclosurePanel className="space-y-4 pt-4 pl-8">
                    <input type="date" className='block py-2 px-4 border border-bone rounded-lg focus:ring' required/>  
                </DisclosurePanel>
            </Disclosure>
            <Disclosure as="div">
                <DisclosureButton className="font-bold text-xl hover:text-white hover:underline pl-4">Change email</DisclosureButton>
                <DisclosurePanel className="space-y-4 pt-4 pl-8">
                    <input type="text" className="block py-2 px-4 border border-bone lg:text-lg rounded-lg placeholder:text-bone/80 focus:ring" placeholder="Email" required/>
                </DisclosurePanel>
            </Disclosure>
            <Disclosure as="div"> 
                <DisclosureButton className="font-bold text-xl hover:text-white hover:underline pl-4">Change password</DisclosureButton>
                <DisclosurePanel className="space-y-4 pt-4 pl-8">
                    <input type="password" name='currentPassword'
                            className="block py-2 px-4 border border-bone lg:text-lg rounded-lg placeholder:text-bone/80 focus:ring" placeholder="Current password" required/>
                    <input type="password" name='newPassword'
                            className="block py-2 px-4 border border-bone lg:text-lg rounded-lg placeholder:text-bone/80 focus:ring" placeholder="New password" required/>
                    <input type="password" name='newPasswordRepeat'
                            className="block py-2 px-4 border border-bone lg:text-lg rounded-lg placeholder:text-bone/80 focus:ring" placeholder="Confirm new password" required/>
                </DisclosurePanel>
            </Disclosure>
        </div>
    )
}