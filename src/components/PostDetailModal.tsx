'use client'

import { useEffect } from 'react'

type Post = {
  id: number
  title: string
  description: string | null
  updated_at: string | null
  user: {
    id: string | null
    name: string | null
  } | null
}

interface PostDetailModalProps {
  isOpen: boolean
  onClose: () => void
  post: Post | null
}

export function PostDetailModal({ isOpen, onClose, post }: PostDetailModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !post) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* オーバーレイ */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* モーダルコンテンツ */}
      <div className="relative z-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 max-w-2xl max-h-[80vh] overflow-y-auto mx-4 border border-white/20 shadow-2xl">
        {/* ヘッダー */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2" style={{ color: '#E0D4A7' }}>
              秋の夜長の月見{post.title}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {post.user?.name?.charAt(0) || '?'}
                </div>
                <span>{post.user?.name || '匿名'}</span>
              </div>
              {post.updated_at && (
                <span>
                  更新日: {new Date(post.updated_at).toLocaleDateString('ja-JP')}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="ml-4 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* コンテンツ */}
        <div className="max-w-none">
          {post.description ? (
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {post.description}
            </p>
          ) : (
            <p className="text-gray-400 italic">説明がありません</p>
          )}
        </div>

        {/* フッター */}
        <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg transition-colors border border-white/20"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  )
}