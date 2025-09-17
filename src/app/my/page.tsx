'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { Header } from "@/components/Header"
import { NewPostModal } from "@/components/NewPostModal"
import { PostList, type Post } from "@/components/PostList"
import { redirect } from 'next/navigation'

export default function MyPage() {
  const { data: session, status, update } = useSession()
  const [myPosts, setMyPosts] = useState<Post[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [offset, setOffset] = useState(0)
  const [isEditingName, setIsEditingName] = useState(false)
  const [newName, setNewName] = useState('')
  const [isSavingName, setIsSavingName] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const observer = useRef<IntersectionObserver | null>(null)
  const LIMIT = 12

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      redirect('/posts')
      return
    }
    fetchMyPosts()
  }, [session, status])

  const fetchMyPosts = async (currentOffset = 0, isInitial = true) => {
    try {
      if (isInitial) {
        setIsLoading(true)
      } else {
        setIsLoadingMore(true)
      }

      const response = await fetch(`/api/posts/my?limit=${LIMIT}&offset=${currentOffset}`)
      const posts = await response.json()

      if (isInitial) {
        setMyPosts(posts)
        setOffset(LIMIT)
      } else {
        setMyPosts(prev => [...prev, ...posts])
        setOffset(prev => prev + LIMIT)
      }

      // 取得した投稿数がLIMITより少ない場合、もうデータがないと判断
      if (posts.length < LIMIT) {
        setHasMore(false)
      }
    } catch (error) {
      console.error('マイ投稿の取得に失敗しました:', error)
    } finally {
      setIsLoading(false)
      setIsLoadingMore(false)
    }
  }

  // 無限スクロール用のコールバック
  const lastPostElementRef = useCallback((node: HTMLDivElement) => {
    if (isLoadingMore) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchMyPosts(offset, false)
      }
    })
    if (node) observer.current.observe(node)
  }, [isLoadingMore, hasMore, offset])

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
        // 新規投稿後は最初からリセット
        setOffset(0)
        setHasMore(true)
        await fetchMyPosts(0, true)
      }
    } catch (error) {
      console.error('投稿に失敗しました:', error)
      throw error
    }
  }

  const handleDeletePost = async (postId: number) => {
    if (!confirm('この投稿を削除しますか？')) return

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        // 削除後は最初からリセット
        setOffset(0)
        setHasMore(true)
        await fetchMyPosts(0, true)
      }
    } catch (error) {
      console.error('投稿の削除に失敗しました:', error)
    }
  }

  const handleEditPost = (postId: number) => {
    const post = myPosts.find(p => p.id === postId)
    if (post) {
      setEditingPost(post)
      setIsEditModalOpen(true)
    }
  }

  const handleEditSubmit = async (title: string, description: string) => {
    if (!editingPost) return

    try {
      const response = await fetch(`/api/posts/${editingPost.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      })

      if (response.ok) {
        // 編集後は最初からリセット
        setOffset(0)
        setHasMore(true)
        await fetchMyPosts(0, true)
      } else {
        throw new Error('更新に失敗しました')
      }
    } catch (error) {
      console.error('投稿の更新に失敗しました:', error)
      throw error
    }
  }

  const handleEditModalClose = () => {
    setIsEditModalOpen(false)
    setEditingPost(null)
  }

  const handleEditName = () => {
    setNewName(session?.user?.name || '')
    setIsEditingName(true)
  }

  const handleSaveName = async () => {
    if (!newName.trim()) return

    setIsSavingName(true)
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName.trim() }),
      })

      if (response.ok) {
        // セッションを更新してUIに反映
        await update({ name: newName.trim() })
      } else {
        alert('名前の更新に失敗しました')
      }
    } catch (error) {
      console.error('名前の更新に失敗しました:', error)
      alert('名前の更新に失敗しました')
    } finally {
      setIsSavingName(false)
      setIsEditingName(false)
    }
  }

  const handleCancelEdit = () => {
    setIsEditingName(false)
    setNewName('')
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #191970 0%, #000428 100%)' }}>
        <Header currentPage="home" />
        <div className="flex justify-center items-center py-20">
          <div className="text-white text-lg">読み込み中...</div>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(to bottom, #191970 0%, #000428 100%)'
      }}
    >
      <Header currentPage="home" />

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* ヘロセクション */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold mb-4" style={{ color: '#E0D4A7' }}>
            マイページ
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            あなたの投稿を管理できます
          </p>
        </div>

        {/* プロフィール編集セクション */}
        <div className="max-w-md mx-auto mb-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-4">プロフィール</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">名前</label>
            {!isEditingName ? (
              <div className="flex items-center justify-between">
                <span className="text-white text-lg">{session?.user?.name || '未設定'}</span>
                <button
                  onClick={handleEditName}
                  className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
                >
                  編集
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                  placeholder="新しい名前を入力"
                  maxLength={20}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveName}
                    disabled={isSavingName || !newName.trim()}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    {isSavingName ? '保存中...' : '保存'}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    disabled={isSavingName}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <PostList
          posts={myPosts}
          isLoading={isLoading}
          showDeleteButton={true}
          showEditButton={true}
          showDetailButton={false}
          showShareButton={true}
          onDeletePost={handleDeletePost}
          onEditPost={handleEditPost}
          emptyMessage="まだ投稿がありません"
          emptyActionButton={
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded"
            >
              最初の投稿を作成
            </button>
          }
          lastPostElementRef={lastPostElementRef}
        />

        {/* 無限スクロール用のローディング表示 */}
        {isLoadingMore && hasMore && (
          <div className="flex justify-center items-center py-8">
            <div className="text-white text-lg">さらに読み込み中...</div>
          </div>
        )}

        {/* これ以上データがない場合の表示 */}
        {!hasMore && myPosts.length > 0 && (
          <div className="flex justify-center items-center py-8">
            <div className="text-gray-400 text-sm">すべての投稿を表示しました</div>
          </div>
        )}
      </div>

      {/* 新規投稿モーダル */}
      <NewPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNewPost}
      />

      {/* 編集モーダル */}
      <NewPostModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        onSubmit={handleEditSubmit}
        isEdit={true}
        initialTitle={editingPost?.title || ''}
        initialDescription={editingPost?.description || ''}
      />
    </div>
  )
}