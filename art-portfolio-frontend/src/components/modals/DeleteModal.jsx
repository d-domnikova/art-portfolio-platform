import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function DeleteModal(props) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const type = props.type;

  const handleClick = (id) => {
      axios.delete(`https://localhost:7029/api/${type}/${id}`, 
          { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
      .then(response => {
        console.log(response + `Deleted from ${type} with ID ${id}`);
      })
      .catch(error => {
        console.error(error);
      });
      setOpen(false);
      switch(type) {
        case "post":
          navigate(`/user/${localStorage.getItem("username")}`);
          break;
        default:
          window.location.reload(false);
          break;
      }
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="block text-red-500 md:hover:text-white rounded-full p-2">Delete</button>

      <Dialog open={open} onClose={setOpen} className="relative z-30">
        <DialogBackdrop transition
          className="fixed inset-0 bg-smoky/50 transition-opacity data-[closed]:opacity-0 duration-200 data-[enter]:ease-out data-[leave]:ease-in"/>
        <div className="fixed inset-0 z-60 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

          <DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-smoky border border-bone text-left shadow-xl transition-all 
                        data-[closed]:translate-y-4 data-[closed]:opacity-0 duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-md">
                  <div className="flex items-center justify-between rounded-t border-b py-3 md:py-4 px-5">
                      <h3 className="text-xl ml-2 font-semibold">Delete {props.type}</h3>
                      <button type="button" onClick={() => setOpen(false)} className="inline-flex size-8 items-center justify-center rounded-lg text-sm hover:bg-red-800/35">
                          <svg className="size-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                          </svg>
                      </button>
                  </div>

                  <div className="mt-2 px-5">
                      <p> Are you sure you want to delete this {props.type}? This action is unreversable. </p>
                    </div>
              <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-between">
                <button type="button" onClick={() => handleClick(props.id)}
                  className="mt-2 w-full md:w-36 text-white bg-cardinal hover:bg-red-800/75 rounded-3xl px-5 py-2 text-center inline">
                  Delete
                </button>
                <button type="button" onClick={() => setOpen(false)}
                  className="mt-2 w-full md:w-36 text-white border border-bone hover:bg-red-800/35 rounded-3xl px-5 py-2 text-center inline">
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
