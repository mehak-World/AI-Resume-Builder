import { StarIcon } from 'lucide-react'
import React from 'react'
import SectionHeading from './SectionHeading'

const ProfessionalSummary = ({data, setData}) => {

  return (
    <div>
        <div className = "flex justify-between">
            <SectionHeading title = "Professional Summary" description = "Add Summary for your resume here" />
            <div>
                <button className = "bg-pink-100 hover:bg-pink-200 cursor-pointer text-pink-800 p-2 rounded-lg text-sm gap-3 flex items-center"><StarIcon />AI Enhance</button>
            </div>
        </div>
      
        
        {/* Textarea to enter the professional summary */}
        <textarea onChange = {(e) => setData((prev) => ({ ...prev, summary: e.target.value}))} className = "w-full border border-gray-200 rounded-lg p-2 text-sm h-40 focus:border-blue-600 focus:outline-none" style = {{resize: "none"}} placeholder = "Write a professional summary for your resume...">
            {data.summary}
        </textarea>

       
    </div>
  )
}

export default ProfessionalSummary
