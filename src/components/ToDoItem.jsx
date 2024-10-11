/**
 * @fileoverview ToDoItem component for displaying and managing individual tasks.
 *
 * This component allows users to toggle task status (done/undo), edit tasks, and delete tasks.
 *
 * @param {object} task - The task object containing task details.
 *
 * @package FocusList
 */
import React, { useState } from 'react'

// Import Contexts and Components.
import { useTaskContext } from '../context/TaskContext'
import { useToast } from '../context/ToastContext' // Import useToast
import InputBox from './InputBox'

// Import Assets.
import { ReactComponent as EditIcon } from '../assets/images/edit-icon.svg'
import { ReactComponent as DeleteIcon } from '../assets/images/delete-icon.svg'
import { ReactComponent as DoneIcon } from '../assets/images/tick-icon.svg'
import { ReactComponent as UndoIcon } from '../assets/images/undo-icon.svg'

/**
 * @component ToDoItem
 * @description A component that displays and manages an individual task.
 *
 * @param {object} task - The task object containing details such as:
 * @param {number} task.id - The unique ID of the task.
 * @param {string} task.text - The text content of the task.
 * @param {boolean} task.isDone - A boolean indicating whether the task is completed or not.
 *
 * @returns {JSX.Element} The rendered task item with action buttons.
 *
 * @package FocusList
 */
const ToDoItem = ( { task } ) => {
	const { removeTask, toggleTaskStatus, editTask } = useTaskContext()
	const { addToast } = useToast()
	const [ isEditing, setIsEditing ] = useState( false )

	/**
	 * @function handleSaveEdit
	 * @description Handles saving the edited task. It updates the task text.
	 *
	 * @param {string} updatedText - The new text for the task.
	 *
	 * @returns {void}
	 */
	const handleSaveEdit = ( updatedText ) => {
		editTask( task.id, updatedText )
		addToast( 'Task edited successfully!', 'info' )
		setIsEditing( false )
	}

	/**
	 * @function handleToggleTaskStatus
	 * @description Toggles the task status and shows an appropriate toast message.
	 *
	 * @returns {void}
	 */
	const handleToggleTaskStatus = () => {
		toggleTaskStatus( task.id )
		const toastMessage = task.isDone
			? 'Task marked as undone!'
			: 'Task marked as done!'
		addToast( toastMessage, 'success' )
	}

	/**
	 * @function handleDelete
	 * @description Displays a confirmation dialog before deleting the task.
	 *
	 * @returns {void}
	 */
	const handleDelete = () => {
		if ( window.confirm( 'Are you sure you want to delete this task?' ) ) {
			removeTask( task.id )
			addToast( 'Task deleted successfully!', 'error' )
		}
	}

	return (
		<div className={ `task-item ${task.isDone ? 'completed' : ''}` }>
			{ isEditing ? (
				<InputBox
					isEditing={ true }
					existingValue={ task.text }
					handleSaveEdit={ handleSaveEdit }
				/>
			) : (
				<p>{ task.text }</p>
			) }
			{ !isEditing && (
				<div className="task-actions">
					{ /* Toggle Task Status: Done/Undo */ }
					<button
						onClick={ handleToggleTaskStatus }
					>
						{ task.isDone ? (
							<UndoIcon width="24" height="24" />
						) : (
							<DoneIcon width="24" height="24" />
						) }
					</button>

					{ /* Edit Button */ }
					<button onClick={ () => setIsEditing( true ) }>
						<EditIcon width="24" height="24" />
					</button>

					{ /* Delete Button with confirmation */ }
					<button onClick={ handleDelete }>
						<DeleteIcon width="24" height="24" />
					</button>
				</div>
			) }
		</div>
	)
}

export default ToDoItem
