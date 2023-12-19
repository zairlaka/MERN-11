function Signup(){
  return(
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
                />
              </div>
            </div>

            <div>
              <div className="flex mb-4">
                <div className="w-1/2 mr-1">
                  <label className="block text-sm font-medium leading-6 text-white">Password</label>
                  <input 
                    className="mt-2 block w-full rounded-md border-0 bg-white/5 p-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" 
                    id="password"
                    placeholder="*******"
                    required
                    type="password" 
                  />
                </div>
                <div className="w-1/2 ml-1">
                  <label className="block text-sm font-medium leading-6 text-white">Confirm Password</label>
                  <input 
                    className="mt-2 block w-full rounded-md border-0 bg-white/5 p-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" 
                    id="confirmPassword"
                    placeholder="*******"
                    required
                    type="password" 
                  />
                </div>
              </div>
              <p className="mt-1.5 text-sm text-gray-500" id="email-description">
                At least 8 characters
              </p>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
export default Signup;