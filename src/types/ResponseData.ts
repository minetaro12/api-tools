// レスポンスデータの型定義
export type ResponseData = {
  statusCode: number;
  status: string;
  headers: string[];
  body: string;
  message: string;
};