import { FormEvent } from 'react'
import { useAppSelector } from '../app/hooks'
import { useMutateTask } from './useMutateTask'
import { selectTask } from '../slices/appSlice'

// タスクのサブミットボタンが押された時の処理を行うカスタムフック
export const useProcessTask = () => {
  const editedTask = useAppSelector(selectTask)
  const { createTaskMutation, updateTaskMutation } = useMutateTask()

  // タスクの登録・更新
  const processTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedTask.id === '')
      createTaskMutation.mutate({
        title: editedTask.title,
        description: editedTask.description,
      })
    else {
      updateTaskMutation.mutate(editedTask)
    }
  }
  return { processTask }
}
