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
      priorityNum: undefined,
      nopdType: undefined
    }
  },

  filterPriority(n) {
    this.setState({priorityNum: n})
  },

  filterType(_type) {
    this.setState({nopdType: _type})
  },

  renderLabels() {
    return (
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
    )
  },

  renderFilters() {
    return (
      <div className="filters">
        <h2>Filter by Priority (Working)</h2>
        <button onClick={() => this.filterPriority(undefined)}>All Priorities</button>
        <button onClick={() => this.filterPriority(1)}>Low Priority</button>
        <button onClick={() => this.filterPriority(2)}>High Priority</button>

        <h2>Filter by Type (Unimplemented)</h2>
        <button onClick={() => this.filterType("94F")}><i className='fa fa-star'></i> 94F - Fireworks</button>
        <button onClick={() => this.filterType("18")}><i className='fa fa-star'></i> 18 - Traffic Incident</button>
        <button onClick={() => this.filterType("94")}><i className='fa fa-star'></i> 94 - Discharging Firearm</button>
        <button onClick={() => this.filterType("103D")}><i className='fa fa-star'></i> 103D - Domestic Disturbance</button>
        <button onClick={() => this.filterType("24")}><i className='fa fa-star'></i> 24 - Medical</button>
        <button onClick={() => this.filterType("62A")}><i className='fa fa-star'></i> 62A - Burglar Alarm, Silent</button>
        <button onClick={() => this.filterType("21")}><i className='fa fa-star'></i> 21 - Complaint Other</button>
        <button onClick={() => this.filterType("67P")}><i className='fa fa-star'></i> 67P - Pickpocket</button>
        <button onClick={() => this.filterType("107")}><i className='fa fa-star'></i> 107 - Suspicious Person</button>
        <button onClick={() => this.filterType("64A")}><i className='fa fa-star'></i> 64A - Hold Up Alarm</button>
        <button onClick={() => this.filterType("21P")}><i className='fa fa-star'></i> 21P - Lost Property</button>
        <button onClick={() => this.filterType("103")}><i className='fa fa-star'></i> 103 - Disturbance Other</button>
        <button onClick={() => this.filterType("911")}><i className='fa fa-star'></i> 911 - Silent 911 Call</button>
        <button onClick={() => this.filterType("62R")}><i className='fa fa-star'></i> 62R - Residence Burglary</button>
        <button onClick={() => this.filterType("67A")}><i className='fa fa-star'></i> 67A - Auto Theft</button>
        <button onClick={() => this.filterType("20")}><i className='fa fa-star'></i> 20 - Auto Accident</button>
        <button onClick={() => this.filterType("42U")}><i className='fa fa-star'></i> 42U - Aggravated Rape</button>
        <button onClick={() => this.filterType("17R")}><i className='fa fa-star'></i> 17R - WARR Stop with Release</button>
        <button onClick={() => this.filterType("103M")}><i className='fa fa-star'></i> 103M - Mental Patient</button>
        <button onClick={() => this.filterType("20I")}><i className='fa fa-star'></i> 20I - Auto Accident with Injury</button>
        <button onClick={() => this.filterType("100")}><i className='fa fa-star'></i> 100 - Hit and Run</button>
        <h2>Filter by Date (Unimplemented)</h2>
        <label>Start Date</label>
        <input type='text'></input>

        <label>End Date</label>
        <input type='text'></input>

      </div>
    )
  },

  render() {
    return (
      <div>
        <h1>NOPD Service Calls 2016</h1>
        <p>Displaying police districts, colored in order of average response time.</p>

        {this.renderLabels()}
        {this.renderFilters()}

        <ServiceCallsMap
          serviceCalls={this.data.serviceCalls}
          priorityNum={this.state.priorityNum}
          nopdType={this.state.nopdType} />

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
