export default function DataBackup() {
  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Data Backup</h2>

      <div className="flex space-x-4">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Backup Now</button>
        <button className="bg-white border border-gray-300 text-gray-600 px-6 py-2 rounded-md hover:bg-gray-50">
          Restore Data
        </button>
      </div>
    </div>
  )
}
