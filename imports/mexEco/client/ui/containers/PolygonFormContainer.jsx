import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import PolygonForm from '../components/PolygonForm.jsx';

import { Questions } from '../../../common/collections/questions.js';

export default PolygonFormContainer = createContainer(({currentPolygon, insertingPolygon}) => {
  console.log("rerender PolygonForm");
  console.log(insertingPolygon);

  const questionsHandle = Meteor.subscribe('questions.all');
  const isLoading = !questionsHandle.ready();

  console.log("questions loading");
  console.log(isLoading);

  console.log(Questions.find().fetch());

  return {
    currentPolygon,
    insertingPolygon,
    isLoading,
    questions: isLoading ? [] : Questions.find().fetch(),
  };
}, PolygonForm);
