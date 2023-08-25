import { error, json } from '@sveltejs/kit'

type reqType = {
  url: string,
  method: string,
  headers: HeadersInit
  body: string
}

export const POST = async ({ request }) => {
  // リクエストデータを格納
  const req: reqType = await request.json()

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

    return json({
      status: res.statusText,
      statusCode: res.status,
      headers: headers,
      body: await res.text()
    })
  } catch (e: any) {
    console.log(e)
    return json({ message: e.message }, { status: 500 })
  }
}