export default function LoadingSpinner({ fullScreen = false }: { fullScreen?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center ${fullScreen ? "min-h-screen" : "py-10"}`}
      role="status"
      aria-label="Loading"
    >
      <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-[#1A75FF]" />
    </div>
  )
}
