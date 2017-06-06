import React from 'react'
import * as colors from './colors'

const styles = {
    resource: {
        display: 'flex', flexDirection: 'column',
        paddingLeft: '0.5em', paddingRight: '0.5em', paddingTop: '0.25em', paddingBottom: '0.25em',
        marginBottom: '0.25em',
        color: colors.action.highlight,
        backgroundColor: colors.text.normal
    },
    field: {
        display: 'flex', flexDirection: 'row',
        flexGrow: 1,
        alignItems: 'left',
        textAlign: 'left'
    },
    fieldKey: {
        minWidth: '8em'
    },
    fieldValue: {
        flexGrow: 1
    }
}

function Field({ id, value }) {
    return (
        <div style={ styles.field }>
            <div style={ styles.fieldKey }>{ id }</div>
            <div style={ styles.fieldValue }>{ value }</div>
        </div>
    )
}

export default function Resource({ schema = [], values, onClick }) {
    return (
        <div style={ styles.resource } onClick={ onClick }>
        {
            schema.map(({ name, type }, index) => (
                <Field key={ name }
                    id={ name }
                    value={ values[name] }
                />
            ))
        }
        </div>
    )
}
