//タスクのデータ型を定義
export interface Task {
  id: string
  title: string
  description: string
}

//apiユーザーのエンドポイントから取得するデータ型を定義
export interface UserInfo {
  email: string
}

//フロントからRESTAPIにログイン時に渡すデータ型を定義　
export interface User {
  email: string
  password: string
}

//CsrfTokenのデータ型を定義
export interface CsrfToken {
  csrf_token: string
}
