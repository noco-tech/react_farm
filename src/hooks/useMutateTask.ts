import axios from 'axios'
import { useAppDispatch } from '../app/hooks'
import { useMutation, useQueryClient } from 'react-query'
import { resetEditedTask, toggleCsrfState } from '../slices/appSlice'
import { Task } from '../types/types'
import { useNavigate } from 'react-router-dom'

// タスクの登録・更新・削除を行うカスタムフック
export const useMutateTask = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // タスクの登録
  const createTaskMutation = useMutation(
    (task: Omit<Task, 'id'>) =>
      axios.post<Task>(`${process.env.REACT_APP_API_URL}/todo`, task, {
        withCredentials: true,
      }),
    {
      onSuccess: (res) => {
        const previousTodos = queryClient.getQueryData<Task[]>('tasks')
        if (previousTodos) {
          queryClient.setQueryData('tasks', [...previousTodos, res.data])
        }
        dispatch(resetEditedTask())
      },
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`)
        if (
          err.response.data.detail === 'The JWT has expired.' ||
          err.response.data.detail === 'The CSRF token has expired.'
        ) {
          dispatch(toggleCsrfState())
          dispatch(resetEditedTask())
          navigate('/')
        }
      },
    }
  )

  // タスクの更新
  const updateTaskMutation = useMutation(
    (task: Task) =>
      axios.put<Task>(
        `${process.env.REACT_APP_API_URL}/todo/${task.id}`,
        {
          title: task.title,
          description: task.description,
        },
        {
          withCredentials: true,
        }
      ),
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>('tasks')
        if (previousTodos) {
          queryClient.setQueryData(
            'tasks',
            previousTodos.map((task) =>
              task.id === variables.id ? res.data : task
            )
          )
        }
        dispatch(resetEditedTask())
      },
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`)
        if (
          err.response.data.detail === 'The JWT has expired.' ||
          err.response.data.detail === 'The CSRF token has expired.'
        ) {
          dispatch(toggleCsrfState())
          dispatch(resetEditedTask())
          navigate('/')
        }
      },
    }
  )

  // タスクの削除
  const deleteTaskMutation = useMutation(
    (id: string) =>
      axios.delete(`${process.env.REACT_APP_API_URL}/todo/${id}`, {
        withCredentials: true,
      }),
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>('tasks')
        if (previousTodos) {
          queryClient.setQueryData<Task[]>(
            'tasks',
            previousTodos.filter((task) => task.id !== variables)
          )
        }
        dispatch(resetEditedTask())
      },
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`)
        if (
          err.response.data.detail === 'The JWT has expired.' ||
          err.response.data.detail === 'The CSRF token has expired.'
        ) {
          dispatch(toggleCsrfState())
          dispatch(resetEditedTask())
          navigate('/')
        }
      },
    }
  )

  return {
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
  }
}
