import React from 'react';
import { IoClose } from 'react-icons/io5';
import Signup from '../components/Signup';

const SignupModal: React.FC<{ isOpen:boolean; onClose:()=> void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // const handleSignupSuccess = () => {
  //   onClose(); // Close modal when signup is successful
  // };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center backdrop-blur-sm z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-xl w-[450px] max-w-full">
        {/* Close Button */}
        <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 z-50" onClick={onClose}>
          <IoClose size={24} />
        </button>

        {/* Signup Form */}
        <div className='max-h-[90vh] overflow-y-auto'>
        <Signup onSignupSuccess={onClose} hideBackground/>
        </div>
      
      </div>
    </div>
  );
};

export default SignupModal;
