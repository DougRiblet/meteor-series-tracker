import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import App from '../imports/ui/App.jsx';

const renderTarget = document.getElementById('render-target');
 
Meteor.startup(() => {
  render(<App />, renderTarget);
});