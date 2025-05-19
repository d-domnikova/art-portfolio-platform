import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import UserForm from "./UserForm";

export default function SettingsPage(){
    return(
        <TabGroup vertical className="md:grid md:grid-cols-5">
            <div className="ml-10 lg:ml-30 -mt-4 col-span-2 md:block md:fixed h-full p-4 text-bone xl:w-78 min-w-24 max-w-78 space-y-2 border-r-4 border-double border-bone">
                <TabList as="div" className="flex flex-col space-y-5 text-lg pt-4 pr-6">
                    <Tab className="cursor-pointer data-selected:text-white data-selected:font-bold 
                                        hover:text-white hover:underline focus:not-data-focus:outline-none text-right border-b">Profile </Tab>
                    <Tab className="cursor-pointer data-selected:text-white data-selected:font-bold 
                                        hover:text-white hover:underline focus:not-data-focus:outline-none text-right border-b">Account settings </Tab>
                    <Tab className="cursor-pointer data-selected:text-white data-selected:font-bold 
                                        hover:text-white hover:underline focus:not-data-focus:outline-none text-right border-b">Delete account </Tab>
                </TabList>
            </div>
            <div className="col-span-3 fixed overflow-y-auto overscrol-y-contain md:left-[30%] left-[40%] right-4">
                <TabPanels>
                    <TabPanel>
                        <h1 className="text-white font-bold text-2xl ml-20 mt-4">Change profile settings</h1>
                        <UserForm />
                    </TabPanel>
                    <TabPanel className="w-[80%] md:w-[60%] md:ml-20 space-y-6 mt-4">
                        <h1 className="text-white font-bold text-2xl mt-4">Change account settings</h1>
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
                    </TabPanel>
                    <TabPanel className="w-[80%] md:w-[60%] md:ml-20 mt-4 space-y-3">
                        <h1 className="text-white font-bold text-2xl">Delete account</h1>
                        <p className='text-base/7'>Are you sure you want to delete your account? All data will be permamentely deleted. This action is unreversable.</p>
                        <button type="button" onClick={() => handleClick(props.id)}
                            className="mt-2 w-full md:w-36 text-white text-lg bg-cardinal hover:bg-red-800/75 rounded-3xl px-5 py-2 text-center inline">
                            Delete
                        </button>
                    </TabPanel>
                </TabPanels>
            </div>
        </TabGroup>
    )
}