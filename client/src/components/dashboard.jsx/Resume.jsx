import React from 'react'
import {
  Edit2Icon,
  PenBoxIcon,
  Trash2Icon,
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Resume = ({resume, color, deleteResume, setShowEditResumeForm, setEditResumeId}) => {
    const navigate = useNavigate();
  return (
       <button
              key={resume._id}
              onClick={() => navigate("/app/builder/" + resume._id)}
              className={`relative text-sm ${color.text} transition-all duration-300 hover:shadow-lg bg-gradient-to-br ${color.light} w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg cursor-pointer group`}
            >
              <PenBoxIcon className={`${color.text}`} />
              <p className={`${color.text}`}>{resume?.title}</p>

              <div className={`text-xs absolute bottom-1 ${color.text}/70`}>
                Updated on {resume?.updatedAt.split("T")[0]}
              </div>

              {/* Edit and trash icons */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-1 r-0 flex gap-2 text-xs hidden group-hover:flex"
              >
                <Trash2Icon
                  onClick={() => deleteResume(resume._id)}
                  size={16}
                />
                <Edit2Icon
                  onClick={() => {
                    setShowEditResumeForm(true); setEditResumeId(resume._id)}}
                  size={16}
                />
              </div>
            </button>
  )
}

export default Resume
