import React, { Component } from 'react';

export default class Index extends Component {
  getProjects() {
    return [
      {
        _id: "1",
        name: "NOPD Response Time 2016",
        description: "Explore how quickly NOPD respond to service calls across New Orelans.",
        url: "/nopd-response-time-2016"
      },
      {
        _id: "2",
        name: "ioPLEA.SE",
        description: "Do stuff with your IoT",
        url: "/ioplease"
      },
      {
        _id: "3",
        name: "mexEco",
        description: "Investigate envrionmental & ecological integrity in Mexico.",
        url: "/mexEco"
      }
    ];
  }

  renderProjects() {
    return this.getProjects().map((project) => (
      <div key={project._id} className="col-xs-6 col-lg-4">
        <div className="card card-block">
          <h4 className="card-title">{project.name}</h4>
          <p className="card-text">{project.description}</p>
          <a href={project.url} className="card-link">Learn More</a>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div className="container">
        <div className="m-t-2">
          <h1>Projects</h1>
        </div>

        <div className="row">
          {this.renderProjects()}
        </div>
      </div>
    );
  }
}
