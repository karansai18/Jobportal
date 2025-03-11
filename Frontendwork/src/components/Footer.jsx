import React from 'react'

const Footer = () => {
  return (
    <footer className="py-8 text-white bg-gray-900">
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between md:flex-row">
       
        <div className="flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-white" aria-label="Facebook">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12A10 10 0 1 0 12 22v-7h-2v-3h2v-2c0-2.2 1.4-3.5 3.4-3.5 1 0 2 .2 2 .2v2.3h-1.3c-1.3 0-1.7.8-1.7 1.6v1.8h3l-.5 3h-2.5v7a10 10 0 0 0 8-10Z" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white" aria-label="Twitter">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10 10 0 0 1-2.8.8 5 5 0 0 0 2.2-2.7 10 10 0 0 1-3.2 1.2A5 5 0 0 0 12 8a14 14 0 0 1-10-5s-4 9 5 13a11 11 0 0 1-7 2c9 5 20 0 20-11v-1A7 7 0 0 0 23 3Z" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white" aria-label="Instagram">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm8 3H9a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4Zm-3 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm4.5-3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white" aria-label="LinkedIn">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4Zm3 4h2v2a2 2 0 1 1-2-2Zm0 4h2v8H7v-8Zm4 0h2v1.2A3 3 0 0 1 18 10a3 3 0 0 1 3 3v6h-2v-6a1 1 0 0 0-1-1 1 1 0 0 0-1 1v6h-2v-8Z" />
            </svg>
          </a>
        </div>
  
       
        <p className="mt-4 text-sm text-gray-400 md:mt-0">
          © 2025 Your Company. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
  
  )
}

export default Footer
