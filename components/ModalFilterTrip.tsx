import React from 'react'

type ModalProps = {
  title: string
  details: {
    subtitle: string
    content: string
    description?: string
  }[] | null
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ title, details, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg w-3/4 md:w-1/2 p-6 relative max-h-screen">
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        onClick={onClose}
      >
        ✕
      </button>
      <h2 className="text-xl font-bold mb-4 text-black">{title}</h2>
      <div className="overflow-y-auto max-h-[75vh]">
        {details &&
          details.map((detail, index) => {
            const dayDescriptions = detail.description?.split("\n").filter(line => line.trim()) || [];
            return (
              <div key={index} className="mb-3">
                <h3 className="text-sm font-semibold text-blue-500 mb-2">
                  {detail.subtitle}
                </h3>
                <p className="text-gray-700 text-xs mb-4">{detail.content}</p>
                {dayDescriptions.length > 0 && (
                  <div className="text-xs text-gray-700 space-y-2">
                    {dayDescriptions.map((line, idx) => (
                      <p key={idx} className={line.startsWith("Day") ? "font-semibold text-black" : ""}>
                        {line}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full"
        onClick={onClose}
      >
        Book Now
      </button>
    </div>
  </div>
  )
}

export default Modal
