import React from 'react'
import { fallow } from 'react-sow/dom'
import Button from './Button'
import * as colors from './colors'

const tabClasses = [
    fallow({
        display: 'block'
    }),
    fallow({
        screen: { minWidth: '480px' },
        display: 'inline-block'
    })
]

const styles = {
    display: 'flex', flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1, borderStyle: 'solid', borderColor: colors.action.normal,
    borderRadius: 5
}

export default function Tabs({ items, selectedID, onSelectTab }) {
    return (
        <nav
            style={ styles }
        >
        {
            items.map(({ title, id }) => (
                <Button key={ id }
                    tab
                    title={ title }
                    selected={ selectedID === id }
                    classes={ tabClasses }
                    onClick={ onSelectTab.bind(null, id) }
                />
            ))
        }
        </nav>
    )
}
