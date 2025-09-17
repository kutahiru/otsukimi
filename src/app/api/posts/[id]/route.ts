import { db } from "@/db"
import { posts } from "@/db/schema"
import { eq, and } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"

// 投稿を更新
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "認証が必要です" },
        { status: 401 }
      )
    }

    const postId = parseInt(params.id)
    if (isNaN(postId)) {
      return NextResponse.json(
        { error: "無効な投稿IDです" },
        { status: 400 }
      )
    }

    const { title, description } = await request.json()

    if (!title?.trim()) {
      return NextResponse.json(
        { error: "タイトルは必須です" },
        { status: 400 }
      )
    }

    // 自分の投稿のみ更新可能
    const updatedPost = await db
      .update(posts)
      .set({
        title: title.trim(),
        description: description?.trim() || null,
        updated_at: new Date()
      })
      .where(and(
        eq(posts.id, postId),
        eq(posts.user_id, session.user.id)
      ))
      .returning()

    if (updatedPost.length === 0) {
      return NextResponse.json(
        { error: "投稿が見つからないか、編集権限がありません" },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedPost[0])
  } catch (error) {
    console.error("投稿更新エラー:", error)
    return NextResponse.json(
      { error: "投稿の更新に失敗しました" },
      { status: 500 }
    )
  }
}

// 投稿を削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "認証が必要です" },
        { status: 401 }
      )
    }

    const postId = parseInt(params.id)

    if (isNaN(postId)) {
      return NextResponse.json(
        { error: "無効な投稿IDです" },
        { status: 400 }
      )
    }

    // セッションからユーザーIDを取得
    const userId = session.user.id

    // 投稿の存在確認と所有者確認
    const existingPost = await db
      .select()
      .from(posts)
      .where(eq(posts.id, postId))
      .limit(1)

    if (existingPost.length === 0) {
      return NextResponse.json(
        { error: "投稿が見つかりません" },
        { status: 404 }
      )
    }

    if (existingPost[0].user_id !== userId) {
      return NextResponse.json(
        { error: "この投稿を削除する権限がありません" },
        { status: 403 }
      )
    }

    // 投稿を削除
    await db.delete(posts).where(eq(posts.id, postId))

    return NextResponse.json({ message: "投稿が削除されました" })
  } catch (error) {
    console.error("投稿削除エラー:", error)
    return NextResponse.json(
      { error: "投稿の削除に失敗しました" },
      { status: 500 }
    )
  }
}