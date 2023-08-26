// リクエストデータの型定義
export type RequestData = {
  url: string;
  method: string;
  headers: HeadersInit;
  body: string;
};