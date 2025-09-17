'use client'
import { ErrorProps } from '@/types/error'
import React from 'react'

const Error = ({ error, reset }: ErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full border border-red-200">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
        <p className="text-gray-700 mb-6">{error?.message || "Unexpected error occurred."}</p>

        <button
          onClick={reset}
          className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}

export default Error
