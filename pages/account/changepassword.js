import { useState } from 'react'


export default function changePassword () {

  const [passwordData , setPasswordData] = useState({
    oldPassword : '' ,
    newPassword : '',
    newPassword2 : ''

  })
  const handleChange = e => {
    setPasswordData(prevPasswordData => {
      return {
        ...prevPasswordData,
        [e.target.name]: e.target.value
      }
    })
  }
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await fetch('/api/user/changepassword', {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(passwordData)
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div class='max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8'>
      <div class='max-w-lg mx-auto text-center'>
        <h1 class='text-2xl font-bold sm:text-3xl'>Get started today!</h1>

        <p class='mt-4 text-gray-500'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
          nulla eaque error neque ipsa culpa autem, at itaque nostrum!
        </p>
      </div>

      <form onSubmit={handleSubmit} class='max-w-md mx-auto mt-8 mb-0 space-y-4'>
      <div>
          <label for='password' class='sr-only'>
            Password
          </label>
          <div class='relative'>
            <input
              type='password'
              value= {passwordData.oldPassword}
              onChange={e=>handleChange(e)}
              name='oldPassword'
              class='w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm'
              placeholder='Enter old password'
            />

            <span class='absolute inset-y-0 inline-flex items-center right-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='w-5 h-5 text-gray-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                />
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label for='password' class='sr-only'>
            Password
          </label>
          <div class='relative'>
            <input
              type='password'
              value= {passwordData.newPassword}
              onChange={e=>handleChange(e)}
              name='newPassword'
              class='w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm'
              placeholder='Enter new password'
            />

            <span class='absolute inset-y-0 inline-flex items-center right-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='w-5 h-5 text-gray-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                />
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label for='password' class='sr-only'>
            Password
          </label>
          <div class='relative'>
            <input
              type='password'
              value= {passwordData.newPassword2}
              onChange={e=>handleChange(e)}
              name='newPassword2'
              class='w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm'
              placeholder='Confirm new password'
            />

            <span class='absolute inset-y-0 inline-flex items-center right-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='w-5 h-5 text-gray-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                />
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                />
              </svg>
            </span>
          </div>
        </div>

        <div class='flex items-center justify-between'>
          

          <button
            type='submit'
            class='inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-blue-500 rounded-lg'
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  )
}
