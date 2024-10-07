/**
 * @fileoverview ToastContainer component for displaying toast notification.
 *
 * Renders each toast message with the appropriate style.
 *
 * @param {Array} toasts - Array of Toast Object.
 *
 * @package FocusList
 */
import React from 'react'

/**
 * @component ToastContainer
 * @description A component for displaying a list of toast notifications.
 *
 * @param {Array} toasts - An array of toast objects. Each toast object contains:
 * @param {string} message - The message to be displayed in the toast.
 * @param {string} type - The type of the toast which determines its style.
 *
 * @returns {JSX.Element} A container rendering all the active toasts.
 *
 * @package FocusList
 */
const ToastContainer = ( { toasts } ) => {
  return (
    <div className='toast-container'>
      {toasts.map( ( toast, index ) => (
        <div key={index} className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      ) )}
    </div>
  )
}

export default ToastContainer
