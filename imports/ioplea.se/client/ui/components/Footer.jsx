import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <div id="ioplease-footer" className="text-xs-center">
        <span><a href="https://github.com/marvinmarnold/nola-data">Fork me on Github</a></span> |
        <span><a href="mailto:marvin@unplugged.im">Contact</a></span>
        <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons License" style={{"border-width": 0}} src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Attribution-NonCommercial 4.0 International License</a>.
      </div>
    )
  }
}
