import React from 'react'
import { Seed } from 'react-seeds'
import Field from './Field'

export default function ResourceEditor({ schema, values, onChangeField }) {
    return (
        <Seed column>
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
        </Seed>
    )
}
