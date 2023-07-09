import { FormEvent } from 'react'
import { useAppSelector } from '../app/hooks'
import { useMutateTask } from '../hooks/useMutateTask'
import { selectTask } from '../slices/appSlice'
// import { useQuerySingleTask } from '../hooks/useQuerySingleTask'


export const useProcessTask = () => {
  const editedTask = useAppSelector(selectTask)
  const { createTaskMutation, updateTaskMutation } = useMutateTask()
  //taskをupdate更新した場合に、taskを再取得する
  // const {
  //   data: dataSingleTask,
  //   isLoading: isLoadingTask,
  //   refetch,
  // } = useQuerySingleTask(editedTask.id)

  //サブミットボタンが押された時の処理
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
    // Refetch the task to get updated data
    // refetch()

  }
  return { processTask }
}
