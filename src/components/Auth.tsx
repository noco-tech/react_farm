import React, { FC } from 'react'
import { RefreshIcon } from '@heroicons/react/solid'
import { BadgeCheckIcon } from '@heroicons/react/solid'
import { useProcessAuth } from '../hooks/useProcessAuth'

export const Auth: FC = () => {
  const {
    pw,
    setPw,
    email,
    setEmail,
    isLogin,
    setIsLogin,
    registerMutation,
    loginMutation,
    processAuth,
  } = useProcessAuth()

  //ローディング処理
  if (registerMutation.isLoading || loginMutation.isLoading) {
    return (
      <div className="flex justify-center items-center felx-col min-h-screen">
        <h1 className="text-xl text-gray-600 font-mono">Loading...</h1>
      </div>
    )
  }
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
      <div className="flex items-center">
        <BadgeCheckIcon className="h-8 w-8 mr-2 text-blue-500" />
        <span className="text-center text-3xl font-extrabold">
          FARM Stack web app
        </span>
      </div>
      <h2 className="my-6">{isLogin ? 'login' : 'Create a new account'}</h2>
      {/* form */}
      <form onSubmit={processAuth}>
        {/* email */}
        <div>
          <input
            className="mb-3 px-3 text-sm py-2 border border-gray-300"
            name="email"
            type="email"
            autoFocus
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        {/* password */}
        <div>
          <input
            className="mb-3 px-3 text-sm py-2 border border-gray-300"
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPw(e.target.value)}
            value={pw}
          />
        </div>
        {/* submitボタン */}
        <div className="flex justify-center my-2">
          <button
            className="disabled:opacity-40 py-2 px-4 rounded text-white bg-indigo-600"
            disabled={!email || !pw}
            type="submit"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </div>
      </form>
      {/* toggleボタン */}
      <RefreshIcon
        onClick={() => setIsLogin(!isLogin)}
        className="h-8 w-8 my-2 text-blue-500 cursor-pointer"
      />
      <span>login or sign up</span>
    </div>
  )
}
