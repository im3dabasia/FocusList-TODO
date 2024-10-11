/**
 * @fileoverview The entry point of the React application.
 * It renders the App component into the root DOM node and applies global styles.
 *
 * @package FocusList
 */

import React from 'react'
import ReactDOM from 'react-dom/client'

// Import Contexts and Components.
import './index.scss'
import App from './App'

const rootElement = document.getElementById( 'root' );

if ( rootElement ) {
    const root = ReactDOM.createRoot( rootElement );
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
