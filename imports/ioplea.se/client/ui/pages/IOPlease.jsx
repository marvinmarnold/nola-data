import React, { Component } from 'react';
import Footer from '../components/Footer.jsx';
import Results from '../components/Results.jsx';
import Search from '../components/Search.jsx';

export default class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      thingId: undefined
    };
  }

  setQuery(query, thingId) {
    this.setState({query, thingId})
  }

  render() {
    return (
      <div>
        <div className="ioplease-banner">
          <div className="container-fluid text-xs-center">
            <div className="row">
              <div className="col-xs-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2">
                <h1 className='m-t-3'><stong>Do stuff</stong> with your IoT</h1>

                <Search setQuery={this.setQuery.bind(this)}/>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid text-xs-center">
          <div className="row">
            <div className="col-xs-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2">
              {this.state.query == "" ? null : <Results query={this.state.query} thingId={this.state.thingId} />}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}
