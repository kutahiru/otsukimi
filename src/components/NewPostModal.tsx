'use client'

import { useState, useEffect } from 'react'
import { ShareToX } from './ShareToX'

interface NewPostModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (title: string, description: string) => void
  isEdit?: boolean
  initialTitle?: string
  initialDescription?: string
}

export function NewPostModal({
  isOpen,
  onClose,
  onSubmit,
  isEdit = false,
  initialTitle = '',
  initialDescription = ''
}: NewPostModalProps) {
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submittedTitle, setSubmittedTitle] = useState('')
  const [submittedDescription, setSubmittedDescription] = useState('')

  // 初期値が変更された時にフォームを更新
  useEffect(() => {
    setTitle(initialTitle)
    setDescription(initialDescription)
  }, [initialTitle, initialDescription])

  // モーダルが閉じられた時に成功状態をリセット
  useEffect(() => {
    if (!isOpen) {
      setIsSuccess(false)
      setSubmittedTitle('')
      setSubmittedDescription('')
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    setIsSubmitting(true)
    try {
      await onSubmit(title.trim(), description.trim())

      // 投稿成功時の処理
      if (!isEdit) {
        setSubmittedTitle(title.trim())
        setSubmittedDescription(description.trim())
        setIsSuccess(true)
        setTitle('')
        setDescription('')
      } else {
        onClose()
      }
    } catch (error) {
      console.error(isEdit ? '更新に失敗しました:' : '投稿に失敗しました:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl">
        {/* ヘッダー */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold" style={{ color: '#E0D4A7' }}>
            {isEdit ? '投稿を編集' : '秋の夜長の月見〇〇'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl font-bold w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
          >
            ×
          </button>
        </div>

        {/* 投稿成功画面 */}
        {isSuccess ? (
          <div className="text-center space-y-6">
            <div className="text-green-400 text-6xl mb-4">✓</div>
            <h3 className="text-xl font-bold text-white mb-4">投稿が完了しました！</h3>
            <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30 mb-6">
              <p className="text-lg font-medium mb-2" style={{ color: '#E0D4A7' }}>
                秋の夜長の月見{submittedTitle}
              </p>
              {submittedDescription && (
                <p className="text-gray-300 text-sm">
                  {submittedDescription}
                </p>
              )}
            </div>
            <div className="space-y-4">
              <ShareToX
                title={submittedTitle}
                className="w-full justify-center"
              />
              <button
                onClick={onClose}
                className="w-full px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors font-medium"
              >
                閉じる
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* 説明文 */}
            <div className="mb-6 text-gray-300 text-sm bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
              <p className="mb-2">
                秋の夜長の素敵な過ごし方を宣言をしてみませんか？
              </p>
              <p className="text-gray-400">
                月見にとらわれることなく、どんな内容でもお気軽にどうぞ。
              </p>
            </div>

            {/* フォーム */}
            <form onSubmit={handleSubmit} className="space-y-6">
          {/* タイトル入力 */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-300 mb-2">
              「秋の夜長の月見〇〇」の〇〇部分を教えてください <span className="text-red-400">*</span>
            </label>
            <div className="flex items-start mb-2">
              <span className="text-lg mr-2 font-medium py-2" style={{ color: '#E0D4A7' }}>秋の夜長の月見</span>
              <div className="flex-1">
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="読書 / バーガー / ご飯..."
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
                  maxLength={20}
                  required
                />
                <div className="text-xs text-gray-400 text-right mt-1">
                  {title.length}/20文字
                </div>
              </div>
            </div>
          </div>

          {/* 説明入力 */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-300 mb-2">
              詳細
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="こだわりポイントなどをご自由にお書きください"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all resize-none"
              rows={6}
              maxLength={100}
            />
            <div className="text-xs text-gray-400 text-right mt-1">
              {description.length}/100文字
            </div>
          </div>

          {/* ボタン */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors font-medium"
              disabled={isSubmitting}
            >
              キャンセル
            </button>
            <button
              type="submit"
              disabled={!title.trim() || isSubmitting}
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
            >
              {isSubmitting ? (isEdit ? '更新中...' : '投稿中...') : (isEdit ? '更新する' : '投稿する')}
            </button>
          </div>
        </form>
          </>
        )}
      </div>
    </div>
  )
}