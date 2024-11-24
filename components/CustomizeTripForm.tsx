'use client';
import React from 'react';

interface CustomizeTripFormProps {
  onClose: () => void;
  destination: string; // Add 'destination' to the props interface
}

const CustomizeTripForm: React.FC<CustomizeTripFormProps> = ({ onClose, destination }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-[90%] max-w-xl p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Customize My Trip</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Destination</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={destination} // Use the destination prop
              readOnly
            />
          </div>
          <div className="flex space-x-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomizeTripForm;

