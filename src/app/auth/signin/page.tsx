'use client'

import { signIn, getProviders } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Header } from '@/components/Header'

type Provider = {
  id: string
  name: string
  type: string
  signinUrl?: string
  callbackUrl?: string
}

export default function SignInPage() {
  const [providers, setProviders] = useState<Record<string, Provider> | null>(null)

  useEffect(() => {
    const setAuthProviders = async () => {
      const providers = await getProviders()
      setProviders(providers)
    }
    setAuthProviders()
  }, [])

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(to bottom, #191970 0%, #000428 100%)'
      }}
    >
      <Header />

      <div className="container mx-auto px-4 py-12 max-w-md">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4" style={{ color: '#E0D4A7' }}>
              ログイン
            </h1>
            <p className="text-gray-300 text-sm">
              秋の夜長の月見〇〇へようこそ
            </p>
          </div>

          {/* プロバイダーボタン */}
          <div className="space-y-4">
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id, { callbackUrl: '/posts' })}
                  className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  {provider.id === 'google' && (
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  )}
                  <span>
                    {provider.id === 'google' ? 'Googleでログイン' : `${provider.name}でログイン`}
                  </span>
                </button>
              ))}
          </div>

          {/* 説明文 */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              ログインすることで、秋の夜長の素敵な過ごし方を
              <br />
              投稿することができます
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}