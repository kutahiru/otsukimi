'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'

interface HeaderProps {
  currentPage?: 'home' | 'posts' | 'new' | 'my'
}

export function Header({ currentPage = 'home' }: HeaderProps) {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="backdrop-blur-md border-b border-opacity-10" style={{
      backgroundColor: 'rgba(0, 4, 40, 0.15)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      boxShadow: '0 1px 20px rgba(25, 25, 112, 0.2)'
    }}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold hover:text-blue-300 transition-colors" style={{ color: '#E0D4A7' }}>
            秋の夜長の月見〇〇
          </Link>

          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-6">
              <Link
                href="/"
                className={`transition-colors ${
                  currentPage === 'home'
                    ? 'text-blue-300 font-semibold'
                    : 'text-white hover:text-blue-300'
                }`}
              >
                ホーム
              </Link>
              <Link
                href="/posts"
                className={`transition-colors ${
                  currentPage === 'posts'
                    ? 'text-blue-300 font-semibold'
                    : 'text-white hover:text-blue-300'
                }`}
              >
                投稿一覧
              </Link>
              {session && (
                <Link
                  href="/my"
                  className={`transition-colors ${
                    currentPage === 'my'
                      ? 'text-blue-300 font-semibold'
                      : 'text-white hover:text-blue-300'
                  }`}
                >
                  マイページ
                </Link>
              )}
            </nav>

            {/* デスクトップ版認証ボタン */}
            <div className="hidden md:block">
              {status === 'loading' ? (
                <div className="text-white text-sm">読み込み中...</div>
              ) : session ? (
                <button
                  onClick={() => signOut()}
                  className="transition-colors text-white hover:text-blue-300"
                >
                  ログアウト
                </button>
              ) : (
                <button
                  onClick={() => window.location.href = '/auth/signin'}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  ログイン
                </button>
              )}
            </div>

            {/* ハンバーガーメニューボタン */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-blue-300 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10">
            <nav className="flex flex-col space-y-3 mt-4">
              <Link
                href="/"
                className={`transition-colors ${
                  currentPage === 'home'
                    ? 'text-blue-300 font-semibold'
                    : 'text-white hover:text-blue-300'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                ホーム
              </Link>
              <Link
                href="/posts"
                className={`transition-colors ${
                  currentPage === 'posts'
                    ? 'text-blue-300 font-semibold'
                    : 'text-white hover:text-blue-300'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                投稿一覧
              </Link>
              {session && (
                <Link
                  href="/my"
                  className={`transition-colors ${
                    currentPage === 'my'
                      ? 'text-blue-300 font-semibold'
                      : 'text-white hover:text-blue-300'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  マイページ
                </Link>
              )}

              {/* モバイル版認証ボタン */}
              <div className="pt-3 border-t border-white/10">
                {status === 'loading' ? (
                  <div className="text-white text-sm">読み込み中...</div>
                ) : session ? (
                  <button
                    onClick={() => {
                      signOut()
                      setIsMenuOpen(false)
                    }}
                    className="w-full text-left transition-colors text-white hover:text-blue-300"
                  >
                    ログアウト
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      window.location.href = '/auth/signin'
                      setIsMenuOpen(false)
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/25"
                  >
                    ログイン
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}