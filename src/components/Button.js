import React from 'react'
import * as colors from './colors'

const styles = ({ selected, tab }) => ({
    flexGrow: tab ? 1 : null,
    fontSize: '1rem',
    lineHeight: '1.3rem',
    color: colors.action[selected ? 'highlight' : 'normal'],
    paddingTop: '0.1em',
    paddingBottom: '0.1em',
    paddingLeft: '0.5em',
    paddingRight: '0.5em',
    backgroundColor: colors.action[selected ? 'normal' : 'highlight'],
    borderWidth: tab ? 0 : 1, borderStyle: 'solid', borderColor: colors.action.normal,
    borderRadius: tab ? 0 : 5,
    cursor: 'pointer'
})

export default function Button({ title, selected = false, tab = false, classes, onClick }) {
    return (
        <button
            style={ styles({ selected, tab }) }
            children={ title }
            classes={ classes }
            onClick={ onClick }
        />
    )
}
