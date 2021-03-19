import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {startLogout} from "../actions/auth";

// Renders the 'Header' component to the head of the DOM on every page.

export const Header = ({startLogout}) => (
    <header className={"header"}>
        <div className={"content-container"}>
            <div className={"header__content"}>
                <Link className={"header__title"} to="/" activeClassName="is-active" exact={true}>
                    <h1>Expensify</h1>
                </Link>
                <button className={"button--link"} onClick={startLogout}>Logout</button>
            </div>
        </div>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Header)
