import React from 'react';

const TerminateModal = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center terminate-bg">
      <div className="header-bg rounded-2xl p-6 w-[90%] max-w-sm relative text-center">
        {/* Top bar with red dot as close trigger */}
        <div className="absolute top-0 left-0 w-full h-9 ai-bg rounded-t-3xl flex items-center justify-end px-3 gap-2">
          {/* Clickable Red Dot (acts as close) */}
          <div
            onClick={onClose}
            className="w-4 h-4 rounded-full recording-off cursor-pointer hover:scale-110 transition-transform"
            aria-label="Close"
            title="Close"
          ></div>
        </div>

        <div className="mt-16 username font-semibold text-sm mb-6">
          Do you really want to<br />close the session?
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-3 mb-12">
          <button
            onClick={onConfirm}
            className="ai-img text-xs font-normal px-4 py-1 rounded-full cursor-pointer transition-transform duration-200 hover:scale-105"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="ai-img text-xs font-normal px-4 py-1 rounded-full cursor-pointer transition-transform duration-200 hover:scale-105"
          >
            No
          </button>
        </div>


      </div>
    </div >
  );
};

export default TerminateModal;
