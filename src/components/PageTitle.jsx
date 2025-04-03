import React from 'react'

// Tiny Component that keeps formatiing of page titles the same
const PageTitle = (props) => {
    return (
        <div className="page-title">
            <h2 className="mb-4 mt-4">{props.title}</h2>
            <hr></hr>
        </div>
    )
}

export default PageTitle