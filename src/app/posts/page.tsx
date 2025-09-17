'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Header } from "@/components/Header"
import { NewPostModal } from "@/components/NewPostModal"
import { PostList, type Post } from "@/components/PostList"

export default function PostsPage() {
  const { data: session } = useSession()
  const [allPosts, setAllPosts] = useState<Post[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      const posts = await response.json()
      setAllPosts(posts)
    } catch (error) {
      console.error('投稿の取得に失敗しました:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewPost = async (title: string, description: string) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      })

      if (response.ok) {
        await fetchPosts() // 投稿一覧を再取得
      }
    } catch (error) {
      console.error('投稿に失敗しました:', error)
      throw error
    }
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(to bottom, #191970 0%, #000428 100%)'
      }}
    >
      <Header currentPage="posts" />

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* ヘロセクション */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4" style={{ color: '#E0D4A7' }}>
            投稿一覧
          </h1>
          <div className="text-gray-300 max-w-4xl mx-auto">
            <p className="text-lg mb-4">
              忙しかったり、辛かったり、悲しかったり、いらついたり、怒られたり
            </p>
            <p className="text-lg mb-4">
              いろいろなことがある人生ですが、
            </p>
            <p className="text-xl font-semibold mb-2" style={{ color: '#E0D4A7' }}>
              秋の夜長の素敵な過ごし方を宣言をしてみませんか？
            </p>
            <p className="text-base text-gray-400 mb-8">
              無理に月見にとらわれることなくご自由にどうぞ。
            </p>

            {/* 新規投稿ボタン - ログイン時のみ表示 */}
            {session && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/25"
              >
                今すぐ投稿する
              </button>
            )}
          </div>
        </div>

        <PostList
          posts={allPosts}
          isLoading={isLoading}
          emptyMessage="投稿がありません"
          emptyActionButton={
            session && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded"
              >
                最初の投稿を作成
              </button>
            )
          }
        />
      </div>

      {/* 新規投稿モーダル */}
      <NewPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNewPost}
      />
    </div>
  )
}
