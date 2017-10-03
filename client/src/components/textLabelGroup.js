import React from 'react'

const TextLabelGroup = ({ label, value }) => (
    <div className="row">
        <div className="col-sm-2">
            <label>{label}</label>
        </div>
        <div className="col-sm-10">
            <span>{value}</span>
        </div>
    </div>
)

export default TextLabelGroup