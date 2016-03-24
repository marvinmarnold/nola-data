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
      nopdType: undefined,
      startDate: undefined,
      endDate: undefined
    }
  },

  filterPriority(n) {
    this.setState({priorityNum: n})
  },

  filterType(_type) {
    console.log(_type);
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

  componentDidMount() {
    var thiz = this
    $('.startDate').pickadate({
      onSet: function(context) {
        thiz.setState({startDate: new Date(context.select)})
      }
    });
    $('.endDate').pickadate({
      onSet: function(context) {
        thiz.setState({endDate: new Date(context.select)})
      }
    });
  },

  renderFilters() {
    return (
      <div className="filters">
        <h2>Filter by Priority (Working)</h2>
        <button onClick={() => this.filterPriority(undefined)}>All Priorities</button>
        <button onClick={() => this.filterPriority(1)}>Low Priority</button>
        <button onClick={() => this.filterPriority(2)}>High Priority</button>

        <h2>Filter by Type (Working)</h2>
        <button onClick={() => this.filterType(undefined)}><i className='fa fa-star'></i> All Types</button>
        {_.map(NOPD_TYPES, (desc, _type) => {
          return <button key={_type} onClick={() => this.filterType(_type)}><i className='fa fa-star'></i> {_type} - {desc}</button>
        })}

        <h2>Filter by Date (Working)</h2>
        <label>Start Date</label>
        <input type='text' className="startDate"></input>

        <label>End Date</label>
        <input type='text' className="endDate"></input>

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
          state={this.state} />

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
