import React from 'react'
import Section from './Section'
import Routes from './API/Routes'
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
        display: 'flex', flexDirection: 'column',
        paddingTop: '1rem', paddingBottom: '1rem'
    }
}

export default class Resources extends React.PureComponent {
    static defaultProps = {
        pluralName: 'items'
    }

    constructor(props) {
        super(props)

        this.state = {
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
        const { collectionName } = this.props
        const { schema, collection, itemID, createValues, updateValues, lastResult } = this.state

        return (
            <div style={ styles.main }>
                <Section>
                { this.renderCollection(collection) }
                { lastResult &&
                    <Result { ...lastResult } />
                }
                </Section>
                <Routes
                    pluralName={ collectionName }
                    schema={ schema }
                    itemID={ itemID }
                    createValues={ createValues }
                    updateValues={ updateValues }
                    onChangeCreatedField={ this.handleKeyValuePair('createValues') }
                    onChangeUpdatedField={ this.handleKeyValuePair('updateValues') }
                    onChangeItemID={ this.handleEvent('itemID') }
                    onCreateItem={ this.createItem }
                    onListItems={ this.listItems }
                    onReadItem={ this.readItem }
                    onUpdateItem={ this.updateItem }
                    onDeleteItem={ this.deleteItem }
                />
            </div>
        )
    }
}
