import React from "react";
import {
  CircleXIcon,
  CloudUploadIcon,
  Edit2Icon,
  PenBoxIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";
import { dummyResumeData } from "../assets/assets";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const deleteResume = (id) => {
    setAllResumes(allResumes.filter((resume) => resume._id !== id));
  }

  const colorOptions = [
    {
      from: "from-sky-300",
      to: "to-blue-500",
      text: "text-sky-600",
      light: "from-sky-100 to-blue-200",
    },
    {
      from: "from-violet-300",
      to: "to-purple-500",
      text: "text-violet-600",
      light: "from-violet-100 to-purple-200",
    },
    {
      from: "from-emerald-300",
      to: "to-green-500",
      text: "text-emerald-600",
      light: "from-emerald-100 to-green-200",
    },
    {
      from: "from-rose-300",
      to: "to-pink-500",
      text: "text-rose-600",
      light: "from-rose-100 to-pink-200",
    },
    {
      from: "from-amber-300",
      to: "to-orange-500",
      text: "text-amber-600",
      light: "from-amber-100 to-orange-200",
    },
  ];

  // State variables
  const [allResumes, setAllResumes] = useState(dummyResumeData);
  const [createResumeOpen, setCreateResumeOpen] = useState(false);
  const [existingResumeOpen, setExistingResumeOpen] = useState(false);
  const [showEditResumeForm, setShowEditResumeForm] = useState(false);
  const [resume, setResume] = useState(null);
  const [title, setTitle] = useState('');
  const [editResumeId, setEditResumeId] = useState('')

  return (
    <div className="relative min-h-screen bg-gray-100">
      <div className="flex gap-4 p-10">
        {/* Create Resume Button */}
        <button
          onClick={() => setCreateResumeOpen(true)}
          className="transition-all duration-300 hover:shadow-lg bg-white w-full sm:max-w-36 h-48 flex flex-col items-center hover:border-indigo-500 justify-center border border-black border-dashed rounded-lg cursor-pointer group"
        >
          <div className="mb-4 w-10 h-10 p-3 rounded-full bg-gradient-to-r from-indigo-300 to-indigo-500 flex items-center justify-center group-hover:from-indigo-400 group-hover:to-indigo-600 transition-all duration-300">
            <PlusIcon className="text-white w-5 h-5" />
          </div>
          <p className="text-gray-600 text-sm group-hover:text-indigo-500 transition-colors duration-300">
            Create Resume
          </p>
        </button>

        {/* Upload Existing Button */}
        <button
          onClick={() => setExistingResumeOpen(true)}
          className="transition-all duration-300 hover:shadow-lg bg-white w-full sm:max-w-36 h-48 flex flex-col items-center hover:border-purple-500 justify-center border border-black border-dashed rounded-lg cursor-pointer group"
        >
          <div className="mb-4 w-10 h-10 p-3 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center group-hover:from-purple-400 group-hover:to-purple-600 transition-all duration-300">
            <CloudUploadIcon className="text-white w-5 h-5" />
          </div>
          <p className="text-gray-600 text-sm group-hover:text-purple-500 transition-colors duration-300">
            Upload Existing
          </p>
        </button>
      </div>

      <div className="text-slate-400 w-100 pl-5 my-3">
        <hr />
      </div>

      {/* Render all resumes */}
      <div className="flex gap-4 m-5 flex-wrap">
        {allResumes.map((resume) => {
          const color =
            colorOptions[Math.floor(Math.random() * colorOptions.length)];
          return (
            <button
              key={resume._id}
              onClick={() => navigate("/app/builder/123")}
              className={`relative text-sm ${color.text} transition-all duration-300 hover:shadow-lg bg-gradient-to-br ${color.light} w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg cursor-pointer group`}
            >
              <PenBoxIcon className={`${color.text}`} />
              <p className={`${color.text}`}>{resume.title}</p>

              <div className={`text-xs absolute bottom-1 ${color.text}/70`}>
                Updated on {resume.updatedAt.split("T")[0]}
              </div>

              {/* Edit and trash icons */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-1 r-0 flex gap-2 text-xs hidden group-hover:flex"
              >
                <Trash2Icon onClick = {() => deleteResume(resume._id)} size={16} />
                <Edit2Icon onClick = {() => setShowEditResumeForm(true)} size={16} />
              </div>
            </button>
          );
        })}
      </div>

      {createResumeOpen && (
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
                onChange = {(e) => setTitle(e.target.value)}
                value = {title}
              />

              <button
                type="submit"
                className="w-full mt-5 bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition py-2.5 rounded-lg text-white font-medium"
              >
                Create Resume
              </button>
            </form>
          </div>
        </div>
      )}

      {existingResumeOpen && (
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
                onClick={() => navigate("/app/builder/123")}
                className="cursor-pointer w-full mt-5 bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition py-2.5 rounded-lg text-white font-medium"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      )}

      {showEditResumeForm && (
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
              Update Resume Title
            </h2>

            <form>
              <input
                id="title"
                className="w-full border mt-1 border-gray-400/40 outline-none rounded-md p-2 focus:border-indigo-500 transition"
                type="text"
                placeholder="e.g. Frontend Developer Resume"
                value = {title}
                onChange = {(e) => setTitle(e.target.value)}
                required
              />

              <button
                type="submit"
                className="w-full mt-5 bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition py-2.5 rounded-lg text-white font-medium"
              >
                Edit Resume
              </button>
            </form>
          </div>
        </div>
      )
      }
    </div>
  );
};

export default Dashboard;
