import R from 'ramda'
import React from 'react'
import { Seed } from 'react-seeds'
import createUUID from 'uuid/v4'
import Resource from './Resource'
import ResourceEditor from './ResourceEditor'
import Result from './Result'
import Button from './Button'
import Field from './Field'
import collectionRenderer from './collectionRenderer'
import addHandlers from './addHandlers'

const styles = {
    main: {
        column: true,
        padding: { top: '1rem', bottom: '1rem' }
    },
    section: {
        column: true,
        margin: { bottom: '2rem' },
        alignItems: 'center'
    },
    routeHeading: {
        row: true,
        width: '18em',
        alignItems: 'baseline',
        justifyContent: 'left',
        margin: { bottom: '0.5rem' }
    }
}

const Section = (props) => (
    <Seed Component='section' {...props } { ...styles.section } />
)

const RouteHeading = ({
    method,
    path,
    showItemField = false,
    itemID,
    onAction,
    onChangeItemID
}) => (
    <Seed Component='p' { ...styles.routeHeading }>
        <Button
            title={ method }
            onClick={ onAction }
        />
        <span>&nbsp;</span>
        { path }
        { showItemField &&
            <span>&nbsp;</span>
        }
        { showItemField &&
            <Field
                value={ itemID }
                width='20em'
                onChange={ onChangeItemID }
            />
        }
    </Seed>
)

export default class Resources extends React.PureComponent {
    static defaultProps = {
        singularName: 'item',
        pluralName: 'items'
    }

    constructor(props) {
        super(props)

        this.state = {
            pluralName: 'items',
            schema: [
                { name: 'id', type: 'string' },
                { name: 'firstName', type: 'string' },
                { name: 'lastName', type: 'string' }
            ],
            collection: [],
            itemID: 'id',
            createValues: {},
            updateValues: {},
            lastResult: null
        }

        addHandlers(this)

        this.createItem = this.createItem.bind(this)
        this.readItem = this.readItem.bind(this)
        this.updateItem = this.updateItem.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
    }

    createItem() {
        this.setState(({ collection, createValues }) => {
            const id = createUUID() 
            return {
                collection: R.append(
                    R.merge({ id }, createValues),
                    collection
                ),
                itemID: id,
                lastResult: {
                    status: 200,
                    json: { success: true }
                }
            }
        })
    }

    readItem() {
        this.setState(({ collection, itemID }) => {
            const item = R.find(
                R.propEq('id', itemID),
                collection
            )

            return {
                lastResult: (
                    R.isNil(item) ? ({
                        status: 404
                    }) : ({
                        status: 200,
                        json: item
                    })
                )
            }
        })
    }

    updateItem() {
        this.setState(({ collection, itemID, updateValues }) => ({
            collection: R.map(
                (item) => (
                    (item.id === itemID) ? (
                        R.merge(item, updateValues)
                    ) : (
                        item
                    )
                ),
                collection
            ),
            lastResult: {
                status: 200,
                json: {
                    success: true,
                    previousItem: R.find(
                        R.propEq('id', itemID),
                        collection
                    )
                }
            }
        }))
    }

    deleteItem() {
        this.setState(({ collection, itemID }) => ({
            collection: R.reject(R.propEq('id', itemID), collection),
            lastResult: {
                status: 200,
                json: {
                    success: true,
                    previousItem: R.find(
                        R.propEq('id', itemID),
                        collection
                    )
                }
            }
        }))
    }

    useID(id) {
        this.setState({ itemID: id })
    }

    renderCollection = collectionRenderer(
        ({ item }) => (
            <Resource
                values={ item }
                schema={ this.state.schema }
                onClick={ () => this.useID(item.id) }
            />
        ),
        'id',
        <span>No items — create something!</span>
    )

    render() {
        const { pluralName, schema, collection, itemID, createValues, updateValues, lastResult } = this.state
        const itemIDHandler = this.handleEventValue('itemID')

        return (
            <Seed { ...styles.main }>
                <Section>
                    <Field
                        value={ pluralName }
                        title='Resource name'
                        width='8em'
                        onChange={ this.handleEventValue('pluralName') }
                    />
                </Section>

                { this.renderCollection(collection) }
                { lastResult &&
                    <Result { ...lastResult } />
                }

                <Section>
                    <h2>Create</h2>
                    <RouteHeading
                        method='POST'
                        path={ `/${ pluralName }` }
                        onAction={ this.createItem }
                    />
                    <ResourceEditor
                        schema={ schema }
                        values={ createValues }
                        onChangeField={ this.handleKeyValuePair('createValues') }
                    />
                </Section>
                <Section>
                    <h2>Read</h2>
                    <RouteHeading
                        method='GET'
                        path={ `/${ pluralName }` }
                        onAction={
                            null
                        }
                    />
                    <RouteHeading
                        method='GET'
                        path={ `/${ pluralName }/` }
                        showItemField
                        itemID={ itemID }
                        onChangeItemID={ itemIDHandler }
                        onAction={ this.readItem }
                    />
                </Section>
                <Section>
                    <h2>Update</h2>
                    <RouteHeading
                        method='PATCH'
                        path={ `/${ pluralName }/` }
                        showItemField
                        itemID={ itemID }
                        onChangeItemID={ itemIDHandler }
                        onAction={ this.updateItem }
                    />
                    <ResourceEditor
                        schema={ schema }
                        values={ updateValues }
                        onChangeField={ this.handleKeyValuePair('updateValues') }
                    />
                </Section>
                <Section>
                    <h2>Delete</h2>
                    <RouteHeading
                        method='DELETE'
                        path={ `/${ pluralName }/` }
                        showItemField
                        itemID={ itemID }
                        onChangeItemID={ itemIDHandler }
                        onAction={ this.deleteItem }
                    />
                </Section>
            </Seed>
        )
    }
}
