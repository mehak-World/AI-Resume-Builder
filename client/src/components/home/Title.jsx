import React from "react";

const Title = ({ title, description }) => {
  return (
      <div className="flex flex-col items-center p-4 w-[55%]">
        <h1 className="text-4xl my-5">{title}</h1>
        <p className="text-gray-700 text-center">
         {description}
        </p>
      </div>
  );
};

export default Title;
