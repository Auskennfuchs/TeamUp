import React from 'react'

const TextFieldGroup = ({field,label,value,onChange}) => (
    <div className="form-group">
        <label className="control-label">{label}</label>
        <input type="text" defaultValue={value} name={field} className="form-control" onChange={onChange}/>
    </div>
)

export default TextFieldGroup