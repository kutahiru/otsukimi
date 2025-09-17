'use client'

import { useState } from 'react'
import { PostDetailModal } from './PostDetailModal'
import { ShareToX } from './ShareToX'

export type Post = {
  id: number
  title: string
  description: string | null
  updated_at: string | null
  user: {
    id: string | null
    name: string | null
  } | null
}

interface PostListProps {
  posts: Post[]
  isLoading: boolean
  showDeleteButton?: boolean
  showEditButton?: boolean
  showDetailButton?: boolean
  showShareButton?: boolean
  onDeletePost?: (postId: number) => Promise<void>
  onEditPost?: (postId: number) => void
  emptyMessage?: string
  emptyActionButton?: React.ReactNode
}

export function PostList({
  posts,
  isLoading,
  showDeleteButton = false,
  showEditButton = false,
  showDetailButton = true,
  showShareButton = false,
  onDeletePost,
  onEditPost,
  emptyMessage = "投稿がありません",
  emptyActionButton
}: PostListProps) {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  const handleShowDetail = (post: Post) => {
    setSelectedPost(post)
    setIsDetailModalOpen(true)
  }

  const handleCloseDetail = () => {
    setIsDetailModalOpen(false)
    setSelectedPost(null)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="text-white text-lg">投稿を読み込み中...</div>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-white text-lg mb-4">{emptyMessage}</p>
        {emptyActionButton}
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-colors duration-300 flex flex-col"
          >
            {/* カードヘッダー */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-xl font-bold group-hover:text-yellow-200 transition-colors duration-300 line-clamp-2" style={{ color: '#E0D4A7' }}>
                  秋の夜長の月見{post.title}
                </h2>
              </div>
              <div className="ml-4 text-right">
                <time className="text-xs text-gray-400 font-medium">
                  {post.updated_at && new Date(post.updated_at).toLocaleDateString('ja-JP', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </div>

            {/* カードコンテンツ */}
            <div className="flex-1">
              {post.description && (
                <p className="text-gray-300 mb-6 line-clamp-3 leading-relaxed">
                  {post.description}
                </p>
              )}
            </div>

            {/* カードフッター */}
            <div className="pt-4 border-t border-white/10 mt-auto space-y-3">
              {/* ユーザー情報 */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {post.user?.name?.charAt(0) || '?'}
                </div>
                <span className="text-sm text-gray-400 font-medium">
                  {post.user?.name || '匿名'}
                </span>
              </div>
              {/* ボタンエリア */}
              <div className="flex items-center justify-end space-x-2 flex-wrap gap-1">
                {showDetailButton && (
                  <button
                    onClick={() => handleShowDetail(post)}
                    className="text-sm font-medium transition-colors duration-200 flex items-center space-x-1 px-3 py-1 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/10"
                    style={{ color: '#E0D4A7' }}
                  >
                    <span>詳細を見る</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
                {showShareButton && (
                  <ShareToX
                    title={post.title}
                    className="text-xs px-2 py-1 bg-black hover:bg-gray-800"
                  />
                )}
                {showEditButton && onEditPost && (
                  <button
                    onClick={() => onEditPost(post.id)}
                    className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
                  >
                    編集
                  </button>
                )}
                {showDeleteButton && onDeletePost && (
                  <button
                    onClick={() => onDeletePost(post.id)}
                    className="text-sm text-red-400 hover:text-red-300 font-medium transition-colors duration-200"
                  >
                    削除
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 投稿詳細モーダル */}
      <PostDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetail}
        post={selectedPost}
      />
    </>
  )
}