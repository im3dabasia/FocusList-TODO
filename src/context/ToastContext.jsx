/**
 * @fileoverview ToastContext provider and hooks for managing toasts
 *
 * This file provides the `ToastProvider` component to wrap around the application,
 * enabling the display of toast notifications through the `addToast` function.
 *
 * Exports:
 * - `useToast`: Custom hook to access the toast notification functionality.
 * - `ToastProvider`: Context provider for managing toast notifications.
 *
 * @package FocusList
 */

import React, { createContext, useState, useContext } from 'react'

// Import Contexts and Components.
import ToastContainer from '../components/ToastContainer'

const ToastContext = createContext()

/**
 * @component ToastProvider
 * @description A context provider that manages toast notifications in the application.
 *
 * @param {ReactNode} children - The components that will have access to the toast context.
 *
 * @returns {JSX.Element} The `ToastContext.Provider` wrapped around the child components.
 */
export const ToastProvider = ( { children } ) => {
  const [ toasts, setToasts ] = useState( [] )

  /**
   * @function addToast
   * @description Adds a new toast notification to the toast list.
   *
   * @param {string} message - The message to be displayed in the toast.
   * @param {string} [type='success'] - The type of toast.
   *
   * @returns {void}
   */
  const addToast = ( message, type = 'success' ) => {
    setToasts( [ ...toasts, { message, type } ] )

    // Remove the toast after 3 seconds
    setTimeout( () => {
      setToasts( toasts.slice( 1 ) )
    }, 3000 )
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  )
}

/**
 * @function useToast
 * @description A custom hook to access the toast context.
 *
 * @returns {object} - An object containing the `addToast` function.
 */
export const useToast = () => {
  return useContext( ToastContext )
}
