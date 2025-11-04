import {useEffect, useState} from 'react'
import { CircleXIcon } from 'lucide-react'
import axios from "axios"
import { useUser } from '@clerk/clerk-react'

const EditResume = ({setShowEditResumeForm, setTitle, editResume, title, editResumeId}) => {

  const url = import.meta.env.VITE_BACKEND_URL;
  const {user} = useUser();
  // const [resume, setResume] = useState({});

  useEffect(() => {
    const getResume = async () => {
      const res = await axios.get(`${url}/resumes/${user.id}/${editResumeId}`)
      if(res){
        setTitle(res.data.title)
      }
    } 

    getResume();
      
  }, [])


  return (
     <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          {/* Modal container */}
          <div className="relative bg-white text-gray-600 max-w-md w-full mx-4 p-6 rounded-2xl shadow-xl animate-fadeIn">
            {/* Close Icon */}
            <button
              onClick={() => setShowEditResumeForm(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
            >
              <CircleXIcon className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Update Resume Title
            </h2>

            <form>
              <input
                id="title"
                className="w-full border mt-1 border-gray-400/40 outline-none rounded-md p-2 focus:border-indigo-500 transition"
                type="text"
                placeholder="e.g. Frontend Developer Resume"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <button
                type="submit"
                onClick = {editResume}
                className="w-full mt-5 bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition py-2.5 rounded-lg text-white font-medium"
              >
                Edit Resume
              </button>
            </form>
          </div>
        </div>
  )
}

export default EditResume
