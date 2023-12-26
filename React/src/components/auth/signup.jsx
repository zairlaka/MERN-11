import { useState } from "react"
import axios from "axios"
import PropTypes from "prop-types";

function Signup(props){
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  
  const submitForm = async (e) => {
    e.preventDefault();
    console.log("email", email)
    console.log("password", password)
    console.log("firstName", firstName)
    console.log("lastName", lastName)
    console.log("confirmPassword", confirmPassword)
    const data  = await axios.post("http://localhost:4000/auth/signup",
    {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    })
    console.log("signup response ", data)
    if(data){
      return alert("Invalid Credentials ")
    }
    return alert("Successfull logged in.")
  }

  return(
    <>
      <div className="flex justify-center">
        <div className="min-h-full flex-col justify-center px-6 py-12 lg:px-8 rounded-lg border border-indigo-500 drop-shadow-lg bg-slate-800 shadow-xl shadow-indigo-500/50">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Sign up to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <div className="flex mb-4">
                  <div className="w-1/2 mr-1">
                    <label className="block text-sm font-medium leading-6 text-white">First Name</label>
                    <input 
                      className="mt-2 block w-full rounded-md border-0 bg-white/5 p-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" 
                      placeholder="Zair"
                      required
                      id="first_name" 
                      type="text" 
                      onChange={(e) => {
                        setFirstName(e.target.value)
                      }}
                    />
                  </div>
                  <div className="w-1/2 ml-1">
                    <label className="block text-sm font-medium leading-6 text-white">Last Name</label>
                    <input 
                      className="mt-2 block w-full rounded-md border-0 bg-white/5 p-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" 
                      placeholder="Omer"
                      required
                      id="last_name" 
                      type="text" 
                      onChange={(e) => {
                        setLastName(e.target.value)
                      }}
                    />
                  </div>
                </div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="zair@example.com"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 bg-white/5 p-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex mb-4">
                  <div className="w-1/2 mr-1">
                    <label className="block text-sm font-medium leading-6 text-white">Password</label>
                    <input 
                      className="mt-2 block w-full rounded-md border-0 bg-white/5 p-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 placeholder:translate-y-1" 
                      id="password"
                      placeholder="*******"
                      required
                      type="password" 
                      onChange={(e) => {
                        setPassword(e.target.value)
                      }}
                    />
                  </div>
                  <div className="w-1/2 ml-1">
                    <label className="block text-sm font-medium leading-6 text-white">Confirm Password</label>
                    <input 
                      className="mt-2 block w-full rounded-md border-0 bg-white/5 p-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 placeholder:translate-y-1" 
                      id="confirmPassword"
                      placeholder="*******"
                      required
                      type="password" 
                      onChange={(e) => {
                        setConfirmPassword(e.target.value)
                      }}
                    />
                  </div>
                </div>
                <p className="mt-1.5 text-sm text-gray-500" id="email-description">
                  At least 8 characters
                </p>
              </div>

              <div>
                <button
                  className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white enabled:hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 focus:outline-none disabled:bg-gray-700 shadow-lg shadow-indigo-500/40 disabled:cursor-not-allowed"
                  disabled={!(email && password && firstName && lastName && confirmPassword)}
                  onClick={(e)=>{
                    submitForm(e)
                  }}
                >
                  Sign Up
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-400">
              Already have an account?{' '}
              <a 
                href="#" 
                onClick={() => { void props.updateState(true)}}
                className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Signup;

Signup.propTypes = {
  updateState: PropTypes.func, 
  // Other prop validations can continue from here
};