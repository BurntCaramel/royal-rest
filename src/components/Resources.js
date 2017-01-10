import R from 'ramda'
import React from 'react'
import { Seed } from 'react-seeds'
import Resource from './Resource'
import ResourceEditor from './ResourceEditor'
import Result from './Result'
import Button from './Button'
import Field from './Field'
import collectionRenderer from './collectionRenderer'
import * as crudStateChangers from '../stateChangers/crud'
import addHandlers from './addHandlers'

const styles = {
    main: {
        column: true,
        padding: { top: '1rem', bottom: '1rem' }
    },
    section: {
        column: true,
        margin: { bottom: '1rem' },
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
            lastRequest: null,
            lastResult: null
        }

        addHandlers(this, {
            changeState: crudStateChangers
        })
    }

    renderCollection = collectionRenderer(
        ({ item }) => (
            <Resource
                values={ item }
                schema={ this.state.schema }
                onClick={ () => this.setState({ itemID: item.id }) }
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
                        title='Collection name'
                        width='8em'
                        onChange={ this.handleEventValue('pluralName') }
                    />
                </Section>
                <Section>
                { this.renderCollection(collection) }
                { lastResult &&
                    <Result { ...lastResult } />
                }
                </Section>
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
                        onAction={ this.listItems }
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
