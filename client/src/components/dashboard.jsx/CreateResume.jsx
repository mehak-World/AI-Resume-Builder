import React from 'react'
import {
  CircleXIcon,
} from "lucide-react";

const CreateResume = ({setTitle, title, setCreateResumeOpen, createResume}) => {
  return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
              {/* Modal container */}
              <div className="relative bg-white text-gray-600 max-w-md w-full mx-4 p-6 rounded-2xl shadow-xl animate-fadeIn">
                {/* Close Icon */}
                <button
                  onClick={() => setCreateResumeOpen(false)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
                >
                  <CircleXIcon className="w-5 h-5" />
                </button>
    
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Create New Resume
                </h2>
    
                <form>
                  <label htmlFor="title" className="block text-sm font-medium">
                    Enter Resume Title
                  </label>
                  <input
                    id="title"
                    className="w-full border mt-1 border-gray-400/40 outline-none rounded-md p-2 focus:border-indigo-500 transition"
                    type="text"
                    placeholder="e.g. Frontend Developer Resume"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
    
                  <button
                    type="submit"
                    onClick={createResume}
                    className="w-full mt-5 bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition py-2.5 rounded-lg text-white font-medium"
                  >
                    Create Resume
                  </button>
                </form>
              </div>
            </div>
  )
}

export default CreateResume
