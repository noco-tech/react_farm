/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { LogoutIcon } from '@heroicons/react/outline'
import { ShieldCheckIcon } from '@heroicons/react/solid'

import { useProcessAuth } from '../hooks/useProcessAuth'
import { useProcessTask } from '../hooks/useProcessTask'
import { useQueryUser } from '../hooks/useQueryUser'
import { useQueryTasks } from '../hooks/useQueryTasks'
import { TaskItemMemo } from './TaskItem'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectTask, setEditedTask } from '../slices/appSlice'

export const Todo = () => {
  const { logout } = useProcessAuth()
  const { data: dataUser } = useQueryUser()
  const { data: dataTasks, isLoading: isLoadingTasks } = useQueryTasks()
  const { processTask } = useProcessTask()
  const dispatch = useAppDispatch()
  const editedTask = useAppSelector(selectTask)

  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
      <div className="flex items-center">
        <ShieldCheckIcon className="h-8 w-8 mr-3 text-green-500 cursor-pointer" />
        <span className="text-center text-3xl font-extrabold">CRUD tasks</span>
      </div>
      <p className="my-3 text-sm">{dataUser?.email}</p>

      <LogoutIcon
        onClick={logout}
        className="h-7 w-7 mt-1 mb-5 text-blue-500 cursor-pointer"
      />

      <form onSubmit={processTask}>
        {/* title */}
        <input
          className="mb-3 mr-3 px-3 py-2 border border-gray-300"
          placeholder="title ?"
          type="text"
          onChange={(e) =>
            dispatch(setEditedTask({ ...editedTask, title: e.target.value }))
          }
          value={editedTask.title}
        />
        {/* description */}
        <input
          className="mb-3 px-3 py-2 border border-gray-300"
          placeholder="description ?"
          type="text"
          onChange={(e) =>
            dispatch(
              setEditedTask({ ...editedTask, description: e.target.value })
            )
          }
          value={editedTask.description}
        />
        {/* サブミットボタン */}
        <button
          className="disabled:opacity-40 mx-3 py-2 px-3 text-white bg-indigo-600 rounded"
          disabled={!editedTask.title || !editedTask.description}
        >
          {editedTask.id === '' ? 'Create' : 'Update'}
        </button>
      </form>

      {/* タスクの一覧表示 */}
      {isLoadingTasks ? (
        <p>Loading...</p>
      ) : (
        <ul className="my-5">
          {dataTasks?.map((task) => (
            <TaskItemMemo
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
