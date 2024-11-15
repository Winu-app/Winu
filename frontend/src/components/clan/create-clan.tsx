"use client";
import React, { useState } from "react";
import InputField from "../ui/input-field";

const CreateClan = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div className="size-full py-3 flex items-center justify-center">
      <div className="p-4 rounded-lg bg-active w-72 flex flex-col gap-2">
        <div className="w-full flex items-center">
          <p className="text-xl ">Create clan</p>
        </div>
        <InputField
          fieldName="Clan Name"
          value={name}
          setValue={setName}
          placeholder="Name"
        />
        <InputField
          fieldName="Short Description"
          value={description}
          setValue={setDescription}
          placeholder="description"
        />
        <button className="active:scale-95 transition-transform px-4 py-1 bg-white rounded-lg text-black font-semibold">
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateClan;
