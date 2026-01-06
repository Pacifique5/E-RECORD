export const CustomReports = () => {
  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Left Column - Report Preparation */}
      <div>
        <h4 className="text-lg font-medium mb-6">Report Preparement</h4>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm text-gray-600 mb-2">Select report fields</label>
            <div className="space-y-3">
              <select className="w-full p-2 border rounded-md bg-white">
                <option>Report field</option>
              </select>
              
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100">
                  Academic
                  <button className="ml-2 text-gray-500 hover:text-gray-700">×</button>
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Select time range</label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="yyyy/mm/dd" 
                  className="w-full p-2 border rounded-md pr-10"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2">
                  <CalendarIcon className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="yyyy/mm/dd" 
                  className="w-full p-2 border rounded-md pr-10"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2">
                  <CalendarIcon className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Download Report
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
              Preview
            </button>
          </div>
        </div>
      </div>

      {/* Right Column - Preview */}
      <div>
        <h4 className="text-lg font-medium mb-6">Preview</h4>
        <div className="bg-gray-100 rounded-lg w-full h-[400px]"></div>
      </div>
    </div>
  );
};

const CalendarIcon = ({ className = "w-6 h-6" }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
    />
  </svg>
); 