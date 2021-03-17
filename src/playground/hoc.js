// Higher order component (react-redux) - A component that renders another component
// Reuse code
// Render hijacking
// Props manipulation
// Abstract state

import React from "react";
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
)

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {
                props.isAdmin && <p>This is private info. Please don't share!</p>
            }
            <WrappedComponent {...props} />
        </div>
    )
}

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {
                props.isAuthenticated ? (
                    <WrappedComponent {...props} />
                ) : (
                    <p>Please authenticate to view the details.</p>
                )
            }
        </div>
    )
}

const AdminInfo = withAdminWarning(Info)
const AuthInfo = requireAuthentication(Info)

// ReactDOM.render(<AdminInfo isAdmin={true} info={'There are the details'} />, document.getElementById('app'))
ReactDOM.render(<AuthInfo isAuthenticated={false} info={'There are the details'} />, document.getElementById('app'))