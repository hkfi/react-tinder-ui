import React from "react";

export const ProfileModal = ({ func, name, age, img }) => {
  return (
    <div
      className="fixed inset-0 flex flex-col justify-center items-center z-40 bg-opacity-25 bg-black p-6"
      onClick={() => {
        func(false);
      }}
    >
      <div
        className="w-full max-w-3xl z-50"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex items-center justify-center">
          <div className="bg-white p-2 w-full h-full">
            <img className="w-full h-64" src={img} alt="Profile picture" />

            <div className="text-xl mb-2">
              <span className="font-bold">{name}</span>, <span>{age}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
