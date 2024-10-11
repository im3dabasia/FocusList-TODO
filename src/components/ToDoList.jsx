/**
 * @fileoverview ToDoList component for displaying a list of tasks in the FocusList application.
 *
 * This component allows users to filter tasks.
 * It displays individual tasks using the ToDoItem component.
 *
 * @returns {JSX.Element} The rendered list of tasks or an empty message.
 *
 * @package FocusList
 */

import React, { useState } from 'react'

// Import Contexts and Components.
import { useTaskContext } from '../context/TaskContext'
import ToDoItem from './ToDoItem'

/**
 * @component ToDoList
 * @description A component for displaying a list of tasks in the FocusList application.
 *
 * @returns {JSX.Element} The rendered list of tasks based on the selected filter.
 *
 * @package FocusList
 */
const ToDoList = () => {
	const { tasks } = useTaskContext()
	const [ filter, setFilter ] = useState( 'all' )

	const filteredTasks = tasks
		.filter( ( task ) => {
			if ( 'completed' === filter ) {
				return task.isDone
			} else if ( 'pending' === filter ) {
				return !task.isDone
			}
			return true
		} )
		.sort( ( a, b ) => a.isDone - b.isDone )

	return (
		<div className="todo-list-container">
			<div className="filter-buttons">
				<button onClick={ () => setFilter( 'all' ) }>All Tasks</button>
				<button onClick={ () => setFilter( 'completed' ) }>
					Completed
				</button>
				<button onClick={ () => setFilter( 'pending' ) }>Pending</button>
			</div>

			<div className="todo-list">
				{ filteredTasks.length > 0 ? (
					filteredTasks.map( ( task ) => (
						<ToDoItem key={ task.id } task={ task } />
					) )
				) : (
					<div className="empty-task-message">
						<p>🎉 You are all caught up! 🎉</p>
						<p>Start by adding a new task!</p>
					</div>
				) }
			</div>
		</div>
	)
}

export default ToDoList
