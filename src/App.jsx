/**
 * @fileoverview Main App component of the FocusList application.
 *
 * It renders the main input box for adding tasks and the to-do list component for displaying tasks.
 *
 * @package FocusList
 *
*/

import React from 'react'

//Import Components.
import ToDo from './components/ToDo'

// Import Assets.
import './App.scss'

function App() {
  return (
    <ToDo/>
  )
}

export default App
