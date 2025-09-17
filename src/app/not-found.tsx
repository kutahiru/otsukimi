'use client'

import Link from 'next/link'
import { Header } from '@/components/Header'

export default function NotFound() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(to bottom, #191970 0%, #000428 100%)'
      }}
    >
      <Header />

      <div className="container mx-auto px-4 py-12 max-w-md">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl text-center">
          <h1 className="text-6xl font-bold mb-4" style={{ color: '#E0D4A7' }}>
            404
          </h1>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            ページが見つかりません
          </h2>
          <p className="text-gray-300 mb-8">
            お探しのページは存在しないか、移動された可能性があります。
          </p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/25"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  )
}