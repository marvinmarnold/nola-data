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

  hasQuery() {
    return this.state.query !== ""
  }

  setQuery(query, thingId) {
    this.setState({query, thingId})
  }

  render() {
    if(this.hasQuery()) {
      return (
        <div id='ioplease'>
          <div className="ioplease-banner">
            <div className="container-fluid text-xs-center">
              <div className="row">
                <div className="col-xs-12 col-sm-10 offset-sm-1 col-md-6 offset-md-3">
                  <h1 className='ioplease-title'><stong>Do stuff</stong> with your IoT</h1>

                  <Search setQuery={this.setQuery.bind(this)}/>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid text-xs-center" id='content'>
            <div className="row">
              <div className="col-xs-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2">
                <Results query={this.state.query} thingId={this.state.thingId} />
              </div>
            </div>
          </div>

          <div id="ioplease-footer" className="text-xs-center">
            <div className="container">
              <Footer />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div id='ioplease'>
          <div className="ioplease-banner-full">
            <div className="container-fluid text-xs-center">
              <div className="row">
                <div className="col-xs-12 col-sm-10 offset-sm-1 col-md-6 offset-md-3">
                  <h1 className='ioplease-title'><stong>Do stuff</stong> with your IoT</h1>

                  <Search setQuery={this.setQuery.bind(this)}/>

                  <Footer className='m-t-3'/>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

  }
}
