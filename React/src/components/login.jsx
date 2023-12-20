import { useState } from "react"
import axios from "axios"
// fetch need to be convert into json
// axios auto convert json

export default function Login(updateState) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submitForm = async (e) => {
    e.preventDefault();
    console.log("email", email)
    console.log("password", password)
    const { data } = await axios.post("http://localhost:4000/auth/login",
    {
      email,
      password
    })
    console.log("login response ", data)
    if(data.error){
      return alert("Invalid Credentials ")
    }
    return alert("Successfull logged in.")
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-10 py-12 lg:px-8 rounded-lg border border-indigo-500 drop-shadow-lg bg-slate-800 shadow-xl shadow-indigo-500/50">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" >
            <div>
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="******"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 bg-white/5 p-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                />
              </div>
            </div>

            <div>
              <button
                disabled={!(email && password)}
                onClick={(e) => {submitForm(e)}}
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white enabled:hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 focus:outline-none disabled:bg-gray-700 shadow-lg shadow-indigo-500/40"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-400">
            Not a member?{' '}
            <a 
              href="#" 
              onClick={() => { void updateState.updateState(false)}} 
              className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
            >
              Register here
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
