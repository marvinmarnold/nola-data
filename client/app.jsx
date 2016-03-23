App = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    Meteor.subscribe("service-calls/arrived-at", 100);

    var filter = {}
    if(this.state.priorityNum)
      filter.priorityNum = this.state.priorityNum

    return {
      serviceCalls: ServiceCalls.find(filter).fetch()
    }
  },

  getInitialState() {
    return {
      priorityNum: undefined
    }
  },

  filterPriorityNum0() {
    this.setState({priorityNum: undefined})
  },

  filterPriorityNum1() {
    this.setState({priorityNum: 1})
  },

  filterPriorityNum2() {
    this.setState({priorityNum: 2})
  },

  render() {
    return (
      <div>
        <h1>NOPD Service Calls 2016</h1>
        <p>Displaying time it took NOPD to arrive on scence after 911 call made.</p>
        <ul>
          <li>Blue - 1 minute or less</li>
          <li>Yellow - 5 minutes or less</li>
          <li>Orange - 15 minutes or less</li>
          <li>Red - 1 hour or less</li>
          <li>Black - more than an hour</li>
        </ul>

        <div className="filters">
          <h2>Filter by Priority</h2>
          <button onClick={this.filterPriorityNum0}>All Priorities</button>
          <button onClick={this.filterPriorityNum1}>Low Priority</button>
          <button onClick={this.filterPriorityNum2}>High Priority</button>

          <h2>Filter by Date</h2>
          <label>Start Date</label>
          <input type='text'></input>

          <label>End Date</label>
          <input type='text'></input>

        </div>

        <ServiceCallsMap serviceCalls={this.data.serviceCalls} />

      <p>
        Source
        &nbsp;<a href="https://data.nola.gov/Public-Safety-and-Preparedness/Calls-for-Service-2016/wgrp-d3ma">
          https://data.nola.gov/Public-Safety-and-Preparedness/Calls-for-Service-2016/wgrp-d3ma
        </a>
      </p>
      </div>
    )
  }
})
