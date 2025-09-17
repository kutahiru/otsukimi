'use client'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: 'linear-gradient(to bottom, #191970 0%, #000428 100%)'
      }}
    >
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#E0D4A7' }}>
          エラーが発生しました
        </h1>
        <p className="text-gray-300 mb-6">
          申し訳ございません。予期しないエラーが発生しました。
        </p>
        <button
          onClick={() => reset()}
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/25"
        >
          再試行
        </button>
      </div>
    </div>
  )
}