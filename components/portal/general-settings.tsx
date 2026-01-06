export default function GeneralSettings() {
  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">General Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
          <input
            type="text"
            defaultValue="Rwanda coding academy"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">School Logo</label>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <button className="text-blue-600 text-sm hover:text-blue-700">Change Logo</button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
          <input
            type="text"
            defaultValue="2024-2025"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Term</label>
          <input
            type="text"
            defaultValue="Term 1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            defaultValue="Kigali Rwanda"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>
      </div>
    </div>
  )
}
