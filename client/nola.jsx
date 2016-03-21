Meteor.startup(function() {
  ReactDOM.render(<App />, document.getElementById("render-target"));

  Mapbox.load({
    plugins: ['heat', 'label']
  });
});
