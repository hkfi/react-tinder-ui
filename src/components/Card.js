import React from "react";

export const Card = ({ name, age, img }) => {
  return (
    <div className=" max-w-sm rounded overflow-hidden shadow-lg flex flex-col">
      <img className="w-full h-64" src={img} alt="Profile picture" />

      <div className="px-6 py-4 bg-white">
        <div className="text-xl mb-2">
          <span className="font-bold">{name}</span>, <span>{age}</span>
        </div>
      </div>
    </div>
  );
};
