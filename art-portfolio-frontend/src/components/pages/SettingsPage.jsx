import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import AccountSettings from './settings/AccountSetting';
import ProfileSettings from './settings/ProfileSettings';

export default function SettingsPage(){
    const id = localStorage.getItem("userId")

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
            <div className="col-span-3 fixed h-[85%] overflow-y-auto overscrol-y-contain md:left-[30%] left-[40%] right-4">
                <TabPanels>
                    <TabPanel>
                        <h1 className="text-white font-bold text-2xl ml-20 mt-4">Change profile settings</h1>
                        <ProfileSettings />
                    </TabPanel>
                    <TabPanel className="w-[80%] md:w-[60%] md:ml-20 space-y-6 mt-4">
                        <h1 className="text-white font-bold text-2xl mt-4">Change account settings</h1>
                        <AccountSettings />
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