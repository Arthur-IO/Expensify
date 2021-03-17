import React from "react";

import {Link} from "react-router-dom";

const ExpenseListItem = ({id, description, amount, createdAt}) => (
    <div>
        <h3>
            {/* Links this specific component to the link provided */}
            <Link to={`/edit/${id}`}>
                {description}
            </Link>
        </h3>
        <p>{amount} - {createdAt}</p>
    </div>
)

export default ExpenseListItem