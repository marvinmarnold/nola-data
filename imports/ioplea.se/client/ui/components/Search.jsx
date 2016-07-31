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
      value: '',
      loading: false
    };
  }

  handleSearch(event, value) {
    if(event)
      event.preventDefault()
    const thiz = this;
    console.log("something changed bro");
    this.setState({ value, loading: true })

    this.props.setQuery(value);
    // fakeRequest(value, (items) => {
    //   this.setState({ things: items, loading: false })
    // })
  }

  render() {
    return (
      <form className='m-t-3'>
        <div className="form-group">
          <Autocomplete
            inputProps={{
                className: "form-control",
                id: "iothing-autocomplete",
                placeholder: "I want to do something with my..."
              }}
              ref="autocomplete"
              value={this.state.value}
              items={this.props.things}
              getItemValue={(item) => item.name}
              onSelect={(value, item) => {
                console.log("onSelect");

                // set the menu to only the selected item
                this.setState({ value, things: [ item ] })
                this.handleSearch(undefined, value)
                // or you could reset it to a default list again
                // this.setState({ unitedStates: getStates() })
              }}
              onChange={this.handleSearch.bind(this)}
              renderItem={(item, isHighlighted) => (
                <div
                  style={isHighlighted ? styles.highlightedItem : styles.item}
                  key={item._id}
                  id={item._id}
                >{item.name}</div>
              )}
          />
          <small id="iothing-help" className="form-text text-muted">Device name, manufacturer, etc. of IoT device you own</small>
        </div>
      </form>
    );
  }
}

export default createContainer(({setQuery}) => {
  Meteor.subscribe("things");

  console.log(Things.find().fetch());

  return {
    things: Things.find().fetch(),
    setQuery
  };
}, Search);
