import React, { useState } from "react";
import { CloudUploadIcon, CircleXIcon } from "lucide-react";
import pdfToText from "react-pdftotext";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { OrbitProgress } from "react-loading-indicators";


const ExistingResume = ({ setExistingResumeOpen, resume, setResume, resumes, setAllResumes }) => {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const url = import.meta.env.VITE_BACKEND_URL;

  const uploadExistingResume = async (e) => {
    e.preventDefault();
    if (!resume || !title) return alert("Please select a file and enter a title.");
    setIsLoading(true);

    try {
      const resumeText = await pdfToText(resume);
      const result = await axios.post(
        `${url}/ai/${user.id}/uploadResume`,
        { resumeText, resumeTitle: title }
      );

      if (result.data) {
        setAllResumes((prev) => [...prev, result.data]);
      }
      setExistingResumeOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to upload resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 px-4">
      <div className="relative bg-white text-gray-700 max-w-md w-full p-6 rounded-2xl shadow-xl animate-fadeIn space-y-4">
        {/* Close Icon */}
        <button
          onClick={() => setExistingResumeOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <CircleXIcon className="w-6 h-6" />
        </button>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          Upload Existing Resume
        </h2>

        <form className="space-y-4">
          {/* File Upload */}
          <label
            htmlFor="resume"
            className="cursor-pointer border border-dashed rounded-lg p-5 flex flex-col items-center justify-center gap-3 hover:border-indigo-400 transition"
          >
            {resume ? (
              <p className="text-gray-800 font-medium">{resume.name}</p>
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <CloudUploadIcon className="w-8 h-8" />
                <p>Select PDF Resume</p>
              </div>
            )}
          </label>
          <input
            type="file"
            id="resume"
            name="resume"
            accept=".pdf"
            onChange={(e) => setResume(e.target.files[0])}
            className="hidden"
            required
          />

          {/* Resume Title */}
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="text-sm font-medium text-gray-600">
              Enter Resume Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Software Developer Resume"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-center">
              <OrbitProgress color="#4f46e5" size="medium" text="" textColor="" />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            onClick={uploadExistingResume}
            disabled={isLoading}
            className="w-full bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition py-3 rounded-lg text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Uploading..." : "Upload Resume"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExistingResume;
