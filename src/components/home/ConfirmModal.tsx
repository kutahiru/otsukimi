'use client'

interface ConfirmModalProps {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  message: string
}

export default function ConfirmModal({ isOpen, onConfirm, onCancel, message }: ConfirmModalProps) {
  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000
      }}
      onClick={onCancel}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '10px',
          textAlign: 'center',
          minWidth: '300px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <p style={{
          margin: '0 0 20px 0',
          fontSize: '16px',
          color: '#333'
        }}>
          {message}
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            onClick={onCancel}
            style={{
              padding: '10px 20px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            キャンセル
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: '#007bff',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            はい
          </button>
        </div>
      </div>
    </div>
  )
}