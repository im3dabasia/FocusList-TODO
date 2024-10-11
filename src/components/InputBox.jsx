/**
 * @fileoverview InputBox component for adding or editing tasks.
 *
 * The component handles both task creation and editing.
 *
 * @package FocusList
 */

import React, { useState, useEffect } from 'react'

// Import Contexts and Components.
import { useTaskContext } from '../context/TaskContext'
import { useToast } from '../context/ToastContext'

// Import Assets.
import { ReactComponent as AddIcon } from '../assets/images/add-icon.svg'
import { ReactComponent as SaveIcon } from '../assets/images/save-icon.svg'

/**
 * @component InputBox
 * @description A form component for adding or editing tasks in the task manager.
 *
 * @param {boolean} isEditing - Indicates if the component is in editing mode.
 * @param {string} existingValue - The existing value to pre-fill the input box when editing.
 * @param {function} handleSaveEdit - Function to save the edited task.
 *
 * @returns {JSX.Element} The rendered form for task input.
 *
 * @package FocusList
 */
const InputBox = ( { isEditing, existingValue, handleSaveEdit } ) => {
	const [ inputText, setInputText ] = useState( existingValue || '' )
	const { addTask } = useTaskContext()
	const { addToast } = useToast()

	const MAX_CHARS = 100

	useEffect( () => {
		if ( existingValue ) {
			setInputText( existingValue )
		}
	}, [ existingValue ] )

	/**
	 * @function handleSubmit
	 * @description Handles the form submission for adding or editing tasks.
	 *
	 * @param {Event} event - The form submission event.
	 *
	 * @returns {void}
	 */
	const handleSubmit = ( event ) => {
		event.preventDefault()
		const trimmedInput = inputText.trim()

		if ( trimmedInput.length > MAX_CHARS ) {
			addToast( `Task cannot exceed ${MAX_CHARS} characters.`, 'error' )
			return
		}

		if ( isEditing ) {
			handleSaveEdit( trimmedInput )
			addToast( 'Task edited successfully!', 'info' )
		} else {
			addTask( trimmedInput )
			addToast( 'Task added successfully!', 'success' )
		}
		setInputText( '' )
	}

	return (
		<form onSubmit={ handleSubmit } className="input-form">
			<input
				value={ inputText }
				onChange={ ( event ) => setInputText( event.target.value ) }
				placeholder={
					isEditing
						? 'Edit your task'
						: 'Add a new task (Max chars 100)'
				}
			/>
			<button
				type="submit"
				disabled={ !inputText.trim() }
				aria-label={ isEditing ? 'Save task' : 'Add task' }
			>
				{ isEditing ? (
					<SaveIcon width="24" height="24" />
				) : (
					<AddIcon width="24" height="24" />
				) }
			</button>
		</form>
	)
}

export default InputBox
