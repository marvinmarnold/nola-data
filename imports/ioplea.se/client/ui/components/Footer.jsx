import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
        <div>
          <div className="row">
            <div className="col-xs-12">
              <span className='m-r-1'><a href="https://github.com/marvinmarnold/nola-data">Fork me on Github</a></span> |
              <span className='m-l-1'><a href="mailto:marvin@unplugged.im">Contact</a></span>
            </div>
          </div>
          <div className="row m-t-2">
            <div className="col-xs-12">
              <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons License" style={{"borderWidth": 0}} src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a>
            </div>
          </div>
        </div>
    )
  }
}
