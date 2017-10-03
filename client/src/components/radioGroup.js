import React from 'react'
import styled from 'styled-components'

const _RadioGroup = ({ field, label, values, className, onChange }) => (
    <div className={className + ' form-group'}>
        <label className="control-label">{label}</label>
        <div className="form-group">
            {values.map((value) => (
                <div className="col-md-6">
                    <div className="input-group">
                        <div className="input-group-addon" >
                            <input type="radio" value={value} name={field} onChange={onChange}/>
                        </div>
                        <label className="form-control">{value}</label>
                    </div>
                </div>
            ))}
        </div>
    </div>
)

const RadioGroup = styled(_RadioGroup) `
`

export default RadioGroup