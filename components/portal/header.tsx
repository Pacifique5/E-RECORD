import { ChevronDown } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg text-gray-600">Welcome to our platform fique</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">2025</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">First Term</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
            <div>
              <div className="text-sm font-medium text-gray-900">fique paci</div>
              <div className="text-xs text-gray-500">Accountant</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
