/**
 * @fileoverview ToDo component for managing task input and displaying tasks.
 *
 * It includes the InputBox for adding/editing tasks and the ToDoList for displaying the list of tasks.
 *
 * @package FocusList
 */

import React from 'react'

//Import Contexts and Components.
import { TaskProvider } from '../context/TaskContext'
import { ToastProvider } from '../context/ToastContext'
import InputBox from './InputBox'
import ToDoList from './ToDoList'

const ToDo = () => {
  return (
    <ToastProvider>
      <TaskProvider>
        <div className='app-container'>
          <h1>FocusList</h1>
          <h2>Organize today, achieve tomorrow</h2>
          <InputBox />
          <ToDoList />
        </div>
      </TaskProvider>
    </ToastProvider>
  )
}

export default ToDo
