/**
 * @fileoverview TaskContext provider and hooks for managing tasks in the FocusList application.
 *
 * This file provides the `TaskProvider` component to wrap around the application.
 *
 * Exports:
 * - `useTaskContext`: Custom hook to access the task management functions and state.
 * - `TaskProvider`: Context provider for the task state and operations.
 *
 * @package FocusList
 */

import React, { createContext, useContext, useState, useEffect } from 'react'

const TaskContext = createContext()

export const useTaskContext = () => {
  return useContext( TaskContext )
}

/**
 * @component TaskProvider
 * @description A context provider component that manages the tasks.
 *
 * @param {ReactNode} children - The child components that will have access to the task context.
 *
 * @returns {JSX.Element} The `TaskContext.Provider` wrapped around the child components.
 */
export const TaskProvider = ( { children } ) => {
  const [ tasks, setTasks ] = useState( () => {
    const savedTasks = sessionStorage.getItem( 'tasks' )
    return savedTasks ? JSON.parse( savedTasks ) : []
  } )

  useEffect( () => {
    sessionStorage.setItem( 'tasks', JSON.stringify( tasks ) )
  }, [ tasks ] )

  /**
   * @function addTask
   * @description Adds a new task to the task list.
   *
   * @param {string} newTask - The text for the new task to be added.
   *
   * @returns {void}
   */
  const addTask = ( newTask ) => {
    const task = { id: Date.now(), text: newTask, isDone: false }
    setTasks( ( prevTasks ) => [ ...prevTasks, task ] )
  }

  /**
   * @function removeTask
   * @description Removes a task from the task list based.
   *
   * @param {number} taskId - The unique ID of the task to be removed.
   *
   * @returns {void}
   */
  const removeTask = ( taskId ) => {
    setTasks( ( prevTasks ) => prevTasks.filter( ( task ) => task.id !== taskId ) )
  }

  /**
   * @function toggleTaskStatus
  * @description Toggles the completion status of a task.
  *
  * @param {number} taskId - The unique ID of the task to toggle its status.
  *
  * @returns {void}
  */
  const toggleTaskStatus = ( taskId ) => {
    setTasks( ( prevTasks ) =>
      prevTasks.map( ( task ) =>
        task.id === taskId ? { ...task, isDone: ! task.isDone } : task
      )
    )
  }

  /**
   * @function editTask
   * @description Edits the text of a task.
   *
   * @param {number} taskId - The unique ID of the task to be edited.
   * @param {string} updatedText - The new text that will replace the existing task text.
   *
   * @returns {void}
   */
  const editTask = ( taskId, updatedText ) => {
    setTasks( ( prevTasks ) =>
      prevTasks.map( ( task ) =>
        task.id === taskId ? { ...task, text: updatedText } : task
      )
    )
  }

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, removeTask, toggleTaskStatus, editTask }}
    >
      {children}
    </TaskContext.Provider>
  )
}
