import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { Task } from '../types/types'

//stateの型を定義
export interface AppState {
  editedTask: Task
  csrfTokenExp: boolean
}

//stateの初期値を定義
const initialState: AppState = {
  editedTask: {
    id: '',
    title: '',
    description: '',
  },
  csrfTokenExp: false,
}

//createSliceを使ってstateとactionを定義
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setEditedTask: (state, action: PayloadAction<Task>) => {
      state.editedTask = action.payload
    },
    resetEditedTask: (state) => {
      state.editedTask = initialState.editedTask
    },
    toggleCsrfTokenExp: (state) => {
      state.csrfTokenExp = !state.csrfTokenExp
    }
  },
})
export const { setEditedTask, resetEditedTask, toggleCsrfTokenExp } = appSlice.actions

//stateの値をuseSelectorで参照するための関数を定義
export const selectTask = (state: RootState): Task => state.app.editedTask
export const selectCsrfState = (state: RootState) => state.app.csrfTokenExp
export default appSlice.reducer
