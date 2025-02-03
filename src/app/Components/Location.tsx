"use client";
import React, { useState } from "react";
import Select, { SingleValue } from "react-select";

type LocationOption = {
  value: string;
  label: string;
};

const Locationdropdown = () => {
  const [selectedOption, setSelectedOption] = useState<LocationOption | null>(
    null
  );

  const locations: LocationOption[] = [
    { value: "Karachi", label: "Karachi" },
    { value: "lahore", label: "lahore" },
    { value: "Islamabad", label: "Islamabad" },
    { value: "Hyderabad", label: "Hyderabad" },
    { value: "Faisalabad", label: "Faisalabad" },
  ];

  const handleChange = (option: SingleValue<LocationOption>) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <label className="block text-gray-700 font-bold text-2xl mb-2">
        Locations
      </label>
      <Select
        options={locations}
        value={selectedOption}
        onChange={handleChange}
        isSearchable
        placeholder="Select Location"
        className="outline-none border-none"
      />
      {selectedOption && (
        <p className="text-gray-600 mt-2">
          You selected:{" "}
          <span className="font-semibold font-serif">{selectedOption.label}</span>
        </p>
      )}
    </div>
  );
};

export default Locationdropdown;
