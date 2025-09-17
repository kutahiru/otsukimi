import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function PUT(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
    }

    const { name } = await request.json()

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: '有効な名前を入力してください' }, { status: 400 })
    }

    if (name.trim().length > 20) {
      return NextResponse.json({ error: '名前は20文字以内で入力してください' }, { status: 400 })
    }

    // ユーザーの名前を更新
    await db
      .update(users)
      .set({
        name: name.trim(),
        updated_at: new Date()
      })
      .where(eq(users.email, session.user.email))

    return NextResponse.json({ message: '名前が更新されました' })
  } catch (error) {
    console.error('プロフィール更新エラー:', error)
    return NextResponse.json({ error: 'プロフィールの更新に失敗しました' }, { status: 500 })
  }
}