// リクエストデータの型定義
export type RequestData = {
  url: `https://${string}` | `http://${string}`;
  method: "get" | "post" | "put" | "delete";
  headers: HeadersInit;
  body: string;
};