import React from 'react'
import Field from './Field'

const style = {
    display: 'flex', flexDirection: 'column'
}

export default function ResourceEditor({ schema, values, onChangeField }) {
    return (
        <div style={ style }>
        {
            schema.map(({ name, type }) => (
                (name === 'id') ? (
                    <noscript key={ name } />
                ) : (
                    <Field key={ name }
                        title={ name }
                        value={ values[name] }
                        onChange={ (event) => {
                            onChangeField(name, event.target.value)
                        } }
                    />
                )
            ))
        }
        </div>
    )
}
