import R from 'ramda'
import createUUID from 'uuid/v4'

export function createItem({ collection, createValues }) {
    const id = createUUID()
    const newItem = R.merge({ id }, createValues)
    return {
        collection: R.append(
            newItem,
            collection
        ),
        itemID: id,
        lastResult: {
            status: 201,
            json: {
                data: newItem
            }
        }
    }
}

export function listItems({ collection }) {
    return {
        lastResult: {
            status: 200,
            json: {
                data: collection
            }
        }
    }
}

export function readItem({ collection, itemID }) {
    const item = R.find(
        R.propEq('id', itemID),
        collection
    )

    return {
        lastResult: (
            R.isNil(item) ? ({
                status: 404,
                json: { data: null }
            }) : ({
                status: 200,
                json: { data: item }
            })
        )
    }
}

export function updateItem({ collection, itemID, updateValues }) {
    const item = R.find(
        R.propEq('id', itemID),
        collection
    )

    if (item) {
        const updatedItem = R.merge(item, updateValues)
        return {
            collection: R.map(
                (item) => (
                    (item.id === itemID) ? (
                        updatedItem
                    ) : (
                        item
                    )
                ),
                collection
            ),
            lastResult: {
                status: 200,
                json: {
                    data: updatedItem
                }
            }
        }
    }
    else {
        return {
            lastResult: {
                status: 404,
                json: {
                    data: null
                }
            }
        }
    }
}

export function deleteItem({ collection, itemID }) {
    const item = R.find(
        R.propEq('id', itemID),
        collection
    )

    if (item) {
        return {
            collection: R.reject(R.propEq('id', itemID), collection),
            lastResult: {
                status: 204
            }
        }
    }
    else {
        return {
            lastResult: {
                status: 404,
                json: {
                    data: null
                }
            }
        }
    }
}
