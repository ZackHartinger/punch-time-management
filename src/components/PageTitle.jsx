import React from 'react'

// Tiny Component that keeps formatiing of page titles the same
const PageTitle = (props) => {
    return (
        <div className="page-title">
            <h1 className="mb-3">{props.title}</h1>
        </div>
    )
}

export default PageTitle