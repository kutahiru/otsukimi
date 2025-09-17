'use client'

interface ShareToXProps {
  title: string
  url?: string
  className?: string
}

export function ShareToX({ title, url, className = "" }: ShareToXProps) {
  const handleShare = () => {
    const shareText = `私の過ごし方はこちら！\n秋の夜長の月見${title}\n#秋の夜長の月見〇〇`
    const shareUrl = url || window.location.origin

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`

    window.open(twitterUrl, '_blank', 'width=550,height=420')
  }

  return (
    <button
      onClick={handleShare}
      className={`inline-flex items-center space-x-2 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors font-medium ${className}`}
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
      <span>Xでシェア</span>
    </button>
  )
}