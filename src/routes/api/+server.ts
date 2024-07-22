import { json, RequestHandler } from '@sveltejs/kit'
import type { RequestData } from '../../types/RequestData.ts'
import type { ResponseData } from '../../types/ResponseData.ts'
import { Buffer } from 'buffer'

export const POST: RequestHandler = async ({ request }) => {
  // リクエストデータを格納
  const req: RequestData = await request.json()

  // fetchのオプションを格納
  const options: RequestInit = {
    method: req.method,
    redirect: "manual", // リダイレクトを無効化
    headers: req.headers,
    body: req.body,
  }

  // GETの場合はbodyを削除
  if (req.method.toUpperCase() === 'GET') {
    delete options.body
  }

  try {
    // リクエストの実行
    const res = await fetch(req.url, options)

    // レスポンスヘッダーの格納
    let headers: string[] = []
    res.headers.forEach((v, k) => {
      headers.push(`${k}: ${v}`)
    })

    let isBase64: boolean = false
    let body: string = ""

    if (res.headers.get("Content-Type")?.startsWith("image/")) {
      // 画像の場合はbase64エンコードする
      isBase64 = true
      const blob = await res.blob()
      const arrayBuffer = await blob.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      body = buffer.toString("base64")
    } else {
      body = await res.text()
    }

    // レスポンスデータの格納
    const data: ResponseData = {
      status: res.statusText,
      statusCode: res.status,
      headers: headers,
      contentType: res.headers.get("Content-Type") || "",
      body: body,
      isBase64: isBase64,
      message: "success"
    }

    return json(data)

  } catch (e: any) {
    console.log(e)
    return json({ message: e.message }, { status: 500 })
  }
}
