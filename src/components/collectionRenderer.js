import React from 'react'
import R from 'ramda'

export default function collectionRenderer(
    Item,
    keyProp,
    elementWhenEmpty = 'No items'
) {
    return R.ifElse(
        R.propEq('length', 0),
        R.always(elementWhenEmpty),
        R.map(
            (item) => (
                <Item key={ item[keyProp] } item={ item } />
            )
        )
    )
}
