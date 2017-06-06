import R from 'ramda'

export const addSchemaItem = R.evolve({
    schema: R.append({
        name: 'untitled',
        type: 'string',
        required: true
    })
})

export function removeSchemaItem(index, prevState) {
    return R.evolve({
        schema: R.remove(index, 1)
    })(prevState)
}

export function changeSchemaItemName(index, name, { schema }) {
    return {
        schema: R.adjust(
            R.assoc('name', name),
            index,
            schema
        )
    }
}

export function changeSchemaItemType(index, type, { schema }) {
    return {
        schema: R.adjust(
            R.assoc('type', type),
            index,
            schema
        )
    }
}
/*
export function changeSchemaItemRequired(index, required, { schema }) {
    return {
        schema: R.adjust(
            R.assoc('required', required),
            index,
            schema
        )
    }
}
*/