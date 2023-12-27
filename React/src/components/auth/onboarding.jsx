import { useEffect, useState } from "react"
import axios from "axios"
import Dropdown from "../common/dropdown";



// fetch need to be convert into json
// axios auto convert json

export default function Onboarding() {

  const [instructorId, setInstructorId] = useState("")
  const [instructors, setInstructors] = useState([{ id: '', name: 'Choose Instructor' }])

  const getAllInstructors = async () => {
    await axios.get("http://localhost:4000/user/getAllInstructors").then((res) => {
      console.log("🚀 ~ file: onboarding.jsx:18 ~ const{data}=awaitaxios.get ~ res🔻:", res)
      
      const list_arr = res.data.response.map(elem => (
        {
          id: elem.userId,
          name: [elem.firstName,elem.lastName].join(" ")
        } 
      ));
      setInstructors(list_arr);
      console.log("-----", instructors);
    })
    
  };

  useEffect(() => {
    getAllInstructors();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();

    // const { data } = await axios.post("http://localhost:4000/auth/login",
    // {
    //   instructorId,
    // })

    // if(data.error){
    //   return alert("Invalid Credentials ")
    // }
    return alert(instructorId)
  }

  return (
    <>
    <div className="flex justify-center">
      <div className="min-h-full max-w-fit flex-1 flex-col px-10 py-12 lg:px-8 rounded-lg border border-indigo-500 drop-shadow-lg bg-slate-800 shadow-xl shadow-indigo-500/50">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Onboarding
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" >
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                Please select your instructor
              </label>
              <div className="mt-2">

              <Dropdown list_arr={instructors} onSelection={setInstructorId} />
              
              </div>
            </div>

            <div>
              <button
                disabled={!(instructorId)}
                onClick={(e) => {submitForm(e)}}
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white enabled:hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 focus:outline-none disabled:bg-gray-700 shadow-lg shadow-indigo-500/40 disabled:cursor-not-allowed"
              >
                Send Request
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
    </>
  )
}
