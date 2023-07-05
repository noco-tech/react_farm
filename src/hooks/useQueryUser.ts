import { useQuery } from "react-query";
import axios from "axios";
import { UserInfo } from "../types/types";
import { useNavigate } from "react-router-dom";

// ログインユーザー情報を取得するカスタムフック Todo.tsxで呼び出す
export const useQueryUser = () => {
  const navigate = useNavigate();

  const getCurrentUser = async () => {
    const { data } = await axios.get<UserInfo>(
      `${process.env.REACT_APP_API_URL}/user`,
      {
        withCredentials: true,
      }
    )
    return data
  }

  return useQuery({
    queryKey: 'user',
    queryFn: getCurrentUser,
    staleTime: Infinity,
    onError: () => navigate('/')
  })
}

