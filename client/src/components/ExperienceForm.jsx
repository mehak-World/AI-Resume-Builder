import React, {useState} from "react";
import { Calendar1Icon, TrashIcon } from "lucide-react";
import { StarIcon, Loader } from "lucide-react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import {useParams} from "react-router-dom"

const ExperienceForm = ({ experience, index, onChange, onDelete }) => {

  console.log(experience)
  const {user} = useUser();
  const {resumeId} = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field, value) => {
    let updatedExp = { ...experience };

    if (field === "currentlyWorking") {
      updatedExp.currentlyWorking = value;
      if (value) updatedExp.endDate = "";
    } else {
      updatedExp[field] = value;
    }

    // Date validation
    if (field === "endDate" && updatedExp.startDate && value) {
      if (new Date(value) < new Date(updatedExp.startDate)) {
        window.alert("End date cannot be earlier than the start date");
        return;
      }
    }

    onChange(index, updatedExp);
  };

  const enhanceJobDesc = async (req, res) => {
    setIsLoading(true)
    const response = await axios.post(`http://localhost:3000/ai/${user.id}/${resumeId}/enhanceJobDesc`, {experienceId: experience._id, jobDescription: experience.jobDescription})
    if(response){
       handleChange("jobDescription", response.data)}
       setIsLoading(false);
    }

  return (
    <div className="border border-gray-300 p-3 rounded-lg text-sm mb-3">
      {/* Header */}
      <div className="flex justify-between items-center my-3">
        <p className="font-bold">Experience #{index + 1}</p>
        <div className="cursor-pointer">
          <TrashIcon
            onClick={() => onDelete(index)}
            size={16}
            className="text-red-700"
          />
        </div>
      </div>

      {/* Company & Position */}
      <input
        type="text"
        placeholder="Enter company name"
        value={experience.company}
        onChange={(e) => handleChange("company", e.target.value)}
        name="company"
        className="border border-gray-200 w-full p-2 focus:outline-none focus:border-blue-500 rounded-lg focus:border-2 border-gray-300 mb-3 focus:shadow-sm"
      />

      <input
        type="text"
        placeholder="Enter position"
        value={experience.position}
        onChange={(e) => handleChange("position", e.target.value)}
        name="position"
        className="border border-gray-200  w-full p-2 focus:outline-none focus:border-blue-500 rounded-lg focus:border-2 border-gray-300 mb-3 focus:shadow-sm"
      />

      {/* Dates */}
      <div className="grid grid-cols-2 gap-2">
        {/* Start Date */}
        <div className="w-full p-2 focus:outline-none focus:border-blue-500 rounded-lg border border-gray-300 mb-3 focus:shadow-sm">
          <div className="flex justify-between items-center relative">
            {experience.startDate === "" ? "---------,--" : experience.startDate}
            <label htmlFor={`startDate-${index}`} className="cursor-pointer">
              <Calendar1Icon size={16} />
            </label>
            <input
              id={`startDate-${index}`}
              type="date"
              className="border border-gray-200  absolute right-0 opacity-0 w-6"
              value={experience.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              name="startDate"
            />
          </div>
        </div>

        {/* End Date */}
        {!experience.currentlyWorking && (
          <div className="w-full p-2 focus:outline-none focus:border-blue-500 rounded-lg border border-gray-300 mb-3 focus:shadow-sm">
            <div className="flex justify-between items-center relative">
              {experience.endDate === "" ? "---------,--" : experience.endDate}
              <label htmlFor={`endDate-${index}`} className="cursor-pointer">
                <Calendar1Icon size={16} />
              </label>
              <input
                id={`endDate-${index}`}
                type="date"
                className="border border-gray-200  absolute right-0 opacity-0 w-6"
                value={experience.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
                name="endDate"
              />
            </div>
          </div>
        )}
      </div>

      {/* Currently Working */}
      <div className="flex gap-2 text-slate-500 mb-3">
        <input
          type="checkbox"
          className="border border-gray-200  cursor-pointer text-sm"
          checked={experience.currentlyWorking}
          onChange={(e) => handleChange("currentlyWorking", e.target.checked)}
          name="currentlyWorking"
        />
        <label>Currently working here</label>
      </div>

      {/* Job Description */}
      <div className="flex flex-col gap-2">
        <div className = "flex justify-between items-center text-sm">
            <label>Job Description</label>
             <button onClick = {enhanceJobDesc} className = "bg-green-100 hover:bg-green-200 cursor-pointer text-green-800 p-2 rounded-lg text-sm gap-3 flex items-center">{!isLoading ? <StarIcon />: <Loader />}{isLoading ? "Generating Content..." : "AI Enhance"}</button>
        </div>
      
        <textarea
          value={experience.jobDescription}
          onChange={(e) => handleChange("jobDescription", e.target.value)}
          name="jobDescription"
          className="border border-gray-200  resize-none h-20 p-3 focus:outline-none focus:border-2 focus:shadow-lg rounded-lg focus:border-blue-600"
          placeholder="Describe your responsibilities"
        />
      </div>
    </div>
  );
}

export default ExperienceForm;
