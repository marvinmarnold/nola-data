import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Autocomplete from 'react-autocomplete';
import { Things } from '../../../common/collections/things.js';

const styles = {
  item: {
    padding: '2px 6px',
    cursor: 'default'
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default'
  },

  menu: {
    border: 'solid 1px #ccc'
  }
}

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  handleSearch(event, value, thingId) {
    if(event)
      event.preventDefault()

    const thiz = this;
    this.setState({ value })

    this.props.setQuery(value, thingId);
  }

  renderItem(item, isHighlighted) {
    return (
      <div
        style={isHighlighted ? styles.highlightedItem : styles.item}
        key={item._id}>{item.name}</div>
    )
  }

  render() {
    return (
      <form className='m-t-2'>
        <div className="form-group">
          <Autocomplete
            inputProps={{
                className: "form-control form-control-lg",
                id: "iothing-autocomplete",
                placeholder: "I want to do something with my...",
                type: "text",
              }}
              wrapperStyle={{}}
              ref="autocomplete"
              value={this.state.value}
              items={this.props.things}
              getItemValue={(item) => item.name}
              onSelect={(value, item) => {
                // set the menu to only the selected item
                this.setState({ value, things: [ item ] })
                this.handleSearch(undefined, value, item._id)

              }}
              onChange={this.handleSearch.bind(this)}
              renderItem={this.renderItem.bind(this)}
          />
          <small id="iothing-help" className="form-text text-muted">Device name, manufacturer, etc.</small>
        </div>
      </form>
    );
  }
}

export default createContainer(({setQuery}) => {
  Meteor.subscribe("things");

  return {
    things: Things.find().fetch(),
    setQuery
  };
}, Search);
