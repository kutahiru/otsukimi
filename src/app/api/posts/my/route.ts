import { db } from "@/db"
import { posts, users } from "@/db/schema"
import { desc, eq } from "drizzle-orm"
import { NextResponse } from "next/server"
import { auth } from "@/auth"

// ログイン中のユーザーの投稿一覧を取得
export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "認証が必要です" },
        { status: 401 }
      )
    }

    // セッションからユーザーIDを取得
    const userId = session.user.id

    const myPosts = await db
      .select({
        id: posts.id,
        title: posts.title,
        description: posts.description,
        updated_at: posts.updated_at,
        user: {
          id: users.id,
          name: users.name,
        },
      })
      .from(posts)
      .leftJoin(users, eq(posts.user_id, users.id))
      .where(eq(posts.user_id, userId))
      .orderBy(desc(posts.created_at))

    return NextResponse.json(myPosts)
  } catch (error) {
    console.error("マイ投稿取得エラー:", error)
    return NextResponse.json(
      { error: "投稿の取得に失敗しました" },
      { status: 500 }
    )
  }
}