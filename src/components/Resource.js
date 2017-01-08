import React from 'react'
import { Seed } from 'react-seeds'
import * as colors from './colors'

const styles = {
    resource: {
        column: true,
        padding: { left: '0.5em', right: '0.5em', top: '0.25em', bottom: '0.25em' },
        margin: { bottom: '0.25em' },
        text: { color: colors.action.highlight },
        background: { color: colors.action.normal }
    },
    field: {
        row: true,
        grow: 1,
        alignItems: 'left',
        text: { align: 'left' }
    },
    fieldKey: {
        minWidth: '8em'
    },
    fieldValue: {
        grow: 1
    }
}

function Field({ id, value }) {
    return (
        <Seed { ...styles.field }>
            <Seed { ...styles.fieldKey }>{ id }</Seed>
            <Seed { ...styles.fieldValue }>{ value }</Seed>
        </Seed>
    )
}

export default function Resource({ schema = [], values, onClick }) {
    return (
        <Seed { ...styles.resource } onClick={ onClick }>
        {
            schema.map(({ name, type }, index) => (
                <Field key={ name }
                    id={ name }
                    value={ values[name] }
                />
            ))
        }
        </Seed>
    )
}
