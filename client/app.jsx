App = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    // Meteor.subscribe("service-calls/arrived-at", 100);

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
        <p>Displaying police districts, colored in order of average response time.</p>
        <ul>
          <li><span style={{backgroundColor: '#0a15a8'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> - #1 fastest</li>
          <li><span style={{backgroundColor: '#6bede1'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> - #2 fastest</li>
          <li><span style={{backgroundColor: '#be2879'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> - #3 fastest</li>
          <li><span style={{backgroundColor: '#14b41a'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> - #4 fastest</li>
          <li><span style={{backgroundColor: '#fff51d'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> - #5 fastest</li>
          <li><span style={{backgroundColor: '#000000'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> - #6 fastest</li>
          <li><span style={{backgroundColor: '#b44414'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> - #7 fastest</li>
          <li><span style={{backgroundColor: '#e90000'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> - #8 fastest</li>
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

        <ServiceCallsMap serviceCalls={this.data.serviceCalls} priorityNum={this.state.priorityNum}/>

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
