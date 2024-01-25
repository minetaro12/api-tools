import { json } from '@sveltejs/kit'
import type { RequestData } from '../../types/RequestData.js'
import type { ResponseData } from '../../types/ResponseData.js'

export const POST = async ({ request }) => {
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

    // レスポンスデータの格納
    const data: ResponseData = {
      status: res.statusText,
      statusCode: res.status,
      headers: headers,
      body: await res.text(),
      message: "success"
    }

    return json(data)

  } catch (e: any) {
    console.log(e)
    return json({ message: e.message }, { status: 500 })
  }
}