// レスポンスデータの型定義
export type ResponseData = {
  statusCode: number;
  status: string;
  headers: string[];
  contentType: string;
  body: string;
  isBase64: boolean;
  message: string;
};
