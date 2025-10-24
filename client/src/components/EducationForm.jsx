import { Trash2Icon } from "lucide-react";
import React from "react";
import { Calendar1Icon } from "lucide-react";

const EducationForm = ({ education, onChange, onDelete, index }) => {
    console.log(education)

    const updateEdu = (e) => {
            const key = e.target.name;
            const value = e.target.value;
            
            const updatedEducation = {...education};
            updatedEducation[key] = value;
            onChange(index, updatedEducation);
    }
  return (
    <div className="rounded-lg border border-gray-200 p-2 ">
      <div className="flex justify-between text-sm font-bold mb-4">
        <h2>Education #{index + 1}</h2>
        <Trash2Icon onClick = {() => onDelete(index)} className="text-red-700 cursor-pointer" size={16} />
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        {/* Institution name */}
        <input
          placeholder="Enter institution"
          name = "institution"
          value = {education.institution}
          onChange = {(e) => updateEdu(e)}
          className=" p-2 focus:outline-none focus:border-2 focus:border-blue-500 focus:shadow-lg rounded-lg border border-gray-200"
        />
        {/* Degree name */}
        <input
          placeholder="Enter degree name (Ex: Masters, Bachelors etc)"
          name = "degree"
          value = {education.degree}
          onChange = {(e) => updateEdu(e)}
          className=" p-2 focus:outline-none focus:border-2 focus:border-blue-500 focus:shadow-lg rounded-lg border border-gray-200"
        />
        {/* field of study */}
        <input
          placeholder="Enter Field of study"
          name = "field"
          value = {education.field}
          onChange = {(e) => updateEdu(e)}
          className=" p-2 focus:outline-none focus:border-2 focus:border-blue-500 focus:shadow-lg rounded-lg border border-gray-200"
        />
        {/* grad date */}
        <div className="w-full p-2 focus:outline-none focus:border-blue-500 rounded-lg border border-gray-300 mb-3 focus:shadow-sm">
          <div className="flex justify-between items-center relative">
            {education.graduationDate === ""
              ? "---------,--"
              : education.graduationDate}
            <label
              htmlFor={`graduationDate-${index}`}
              className="cursor-pointer"
            >
              <Calendar1Icon size={16} />
            </label>
            <input
              id={`graduationDate-${index}`}
              type="date"
              className="absolute right-0 opacity-0 w-6"
              value={education.graduationDate}
              // onChange={(e) => handleChange("graduationDate", e.target.value)}
              name="graduationDate"
              onChange = {(e) => updateEdu(e)}
            />
          </div>
        </div>
        {/* GPA */}
        <input
          placeholder="Enter GPA (Optional)"
          type = "number"
          value = {education.gpa}
          name = "gpa"
           onChange = {(e) => updateEdu(e)}
          className=" p-2 focus:outline-none focus:border-2 focus:border-blue-500 focus:shadow-lg rounded-lg border border-gray-200"
        />
      </div>
    </div>
  );
};

export default EducationForm;
