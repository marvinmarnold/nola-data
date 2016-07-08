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

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      loading: false
    };
  }

  render() {
    return (
      <div className="container-fluid text-xs-center">
        <div className="row">
          <div className="col-xs-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2">
            <h1 className='m-t-2'>IoPlea.se</h1>
            <h2><stong>Do stuff</stong></h2>
            <h2>with your IoThings</h2>

            <form className='m-t-3'>
              <div className="form-group">
                <Autocomplete
                  inputProps={{
                      class: "form-control",
                      id: "iothing-autocomplete",
                      aria: {describedby: "typeOfThing"},
                      placeholder: "I want to do something with my..."
                    }}
                    ref="autocomplete"
                    value={this.state.value}
                    items={this.props.things}
                    getItemValue={(item) => item.name}
                    onSelect={(value, item) => {
                      // set the menu to only the selected item
                      this.setState({ value, things: [ item ] })
                      // or you could reset it to a default list again
                      // this.setState({ unitedStates: getStates() })
                    }}
                    onChange={(event, value) => {
                      const thiz = this;
                      // console.log("something changed bro");
                      this.setState({ value, loading: true })
                      setTimeout(() => {
                        Things.find({})
                        thiz.setState({ loading: false })
                      }, 1000);
                      // fakeRequest(value, (items) => {
                      //   this.setState({ things: items, loading: false })
                      // })
                    }}
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
          </div>
        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe("things");

  console.log(Things.find().fetch());


  return {
    things: Things.find().fetch()
  };
}, Index);
