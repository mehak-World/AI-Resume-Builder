import React from 'react'
import { CloudUploadIcon, CircleXIcon } from 'lucide-react'


const ExistingResume = ({setExistingResumeOpen, setResume}) => {
  return (
     <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          {/* Modal container */}
          <div className="relative bg-white text-gray-600 max-w-md w-full mx-4 p-6 rounded-2xl shadow-xl animate-fadeIn">
            {/* Close Icon */}
            <button
              onClick={() => setExistingResumeOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition cursor-pointer"
            >
              <CircleXIcon className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Upload Existing Resume
            </h2>

            <form>
              <label
                for="resume"
                className="cursor-pointer block text-sm font-medium border border-dashed flex items-center flex-col gap-3 rounded-lg p-3"
              >
                {resume ? (
                  <p>{resume.name}</p>
                ) : (
                  <div className="text-center">
                    <p>Select resume</p>
                    <CloudUploadIcon />
                  </div>
                )}
              </label>
              <input
                onChange={(e) => setResume(e.target.files[0])}
                id="resume"
                className="w-full border mt-1 border-gray-400/40 outline-none rounded-md p-2 focus:border-indigo-500 transition hidden"
                type="file"
                name="resume"
                accept=".pdf"
                required
              />

              <button
                type="submit"
                className="cursor-pointer w-full mt-5 bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition py-2.5 rounded-lg text-white font-medium"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
  )
}

export default ExistingResume
