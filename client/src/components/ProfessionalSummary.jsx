import { Loader, StarIcon } from 'lucide-react'
import React from 'react'
import SectionHeading from './SectionHeading'
import axios from "axios"
import {useUser} from "@clerk/clerk-react"
import { useParams } from 'react-router-dom'
import {useState} from "react"

const ProfessionalSummary = ({data, setData}) => {

  const {user} = useUser();
   const { resumeId } = useParams();
   const [isLoading, setIsLoading] = useState(false);
   const url = import.meta.env.VITE_BACKEND_URL;
   
  console.log(resumeId);
  console.log(user);

  const enhanceProfSummary = async () => {
      // Send aan api request to the backend
      setIsLoading(true);
      const res = await axios.post(`${url}/ai/${user.id}/${resumeId}/enhanceProfSumm`, {summary: data.summary});
      console.log(res)
      if(res){
         setData((prev) => ({ ...prev, summary: res.data}))
         setIsLoading(false);
      }
     
  }

  return (
    <div>
        <div className = "flex justify-between">
            <SectionHeading title = "Professional Summary" description = "Add Summary for your resume here" />
            <div>
                <button onClick = {enhanceProfSummary} className = "bg-pink-100 hover:bg-pink-200 cursor-pointer text-pink-800 p-2 rounded-lg text-sm gap-3 flex items-center">{!isLoading ? <StarIcon />: <Loader />}{isLoading ? "Generating Content..." : "AI Enhance"}</button>
            </div>
        </div>
      
        
        {/* Textarea to enter the professional summary */}
        <textarea  value={data.summary} onChange = {(e) => setData((prev) => ({ ...prev, summary: e.target.value}))} className = "w-full border border-gray-200 rounded-lg p-2 text-sm h-40 focus:border-blue-600 focus:outline-none" style = {{resize: "none"}} placeholder = "Write a professional summary for your resume...">
            {data.summary}
        </textarea>

       
    </div>
  )
}

export default ProfessionalSummary
