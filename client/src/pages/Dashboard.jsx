import React from "react";
import {
  CircleXIcon,
  CloudUploadIcon,
  Edit2Icon,
  PenBoxIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { RedirectToSignIn } from "@clerk/clerk-react";
import axios from "axios";
import { colorOptions } from "../../utils.js/constants";
import useGetAllResumes from "../hooks/useGetAllResumes";
import Resume from "../components/dashboard.jsx/Resume";
import CreateResume from "../components/dashboard.jsx/CreateResume";
import ExistingResume from "../components/dashboard.jsx/ExistingResume";
import EditResume from "../components/dashboard.jsx/EditResume";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  const { allResumes, setAllResumes, loading, error } = useGetAllResumes(user?.id);
    
  // State variables
  const [createResumeOpen, setCreateResumeOpen] = useState(false);
  const [existingResumeOpen, setExistingResumeOpen] = useState(false);
  const [showEditResumeForm, setShowEditResumeForm] = useState(false);
  const [resume, setResume] = useState(null);
  const [title, setTitle] = useState("");
  const [editResumeId, setEditResumeId] = useState("");

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }


  // Delete resume
  const deleteResume = async (id) => {
    // Remove the resume from the db
     const response = await axios.post(
      `http://localhost:3000/resumes/${user.id}/${id}/delete`
    );
    // If resume successfully deleted from the database, then update the UI
    if(response){
      setAllResumes(allResumes.filter((resume) => resume._id !== id));
    }
    
  };

  // Edit resume
  const editResume = async (e) => {
     e.preventDefault();
    const response = await axios.post(
      `http://localhost:3000/resumes/${user.id}/${editResumeId}`,
      { data: {title} }
    );

     const new_resume = response?.data;
    console.log(new_resume);

   setAllResumes((prev) =>
  prev.map((resume) =>
    resume._id === editResumeId ? new_resume : resume
  )
);


    setTitle(""); // optional: clear input
    setShowEditResumeForm(false);
  }

  // Function to create resume
  const createResume = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `http://localhost:3000/resumes/${user.id}`,
      { title }
    );
    const new_resume = response?.data;
    console.log(new_resume);

    setAllResumes((prev) => [...prev, new_resume]);

    setTitle(""); // optional: clear input
    setCreateResumeOpen(false);
  };



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

     {allResumes.length == 0 && <div className = "text-gray-700 text-italic m-4"> There are no resumes </div>}

      {/* Render all resumes */}
      <div className="flex gap-4 m-5 flex-wrap">
        {allResumes.map((resume, idx) => {
          const color =
            colorOptions[Math.floor(Math.random() * colorOptions.length)];
          return (
           <Resume key = {resume._id} resume = {resume} color = {color} deleteResume={deleteResume} setShowEditResumeForm={setShowEditResumeForm} setEditResumeId={setEditResumeId}/>
          );
        })}
      </div>

        {/* Create Resume modal */}
      {createResumeOpen && (
        <CreateResume setTitle={setTitle} title = {title} setCreateResumeOpen= {setCreateResumeOpen} createResume = {createResume}  />
      )}

      {existingResumeOpen && (
       <ExistingResume setExistingResumeOpen={setExistingResumeOpen} setResume={setResume} />
      )}

      {showEditResumeForm && (
       <EditResume setTitle={setTitle} title = {title} setShowEditResumeForm={setShowEditResumeForm} editResume={editResume} />
      )}
    </div>
  );
};

export default Dashboard;
