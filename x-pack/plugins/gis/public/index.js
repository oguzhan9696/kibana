/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { uiModules } from 'ui/modules'; // eslint-disable-line no-unused-vars
import chrome from 'ui/chrome';
import React  from 'react';
import ReactDOM from 'react-dom';
import 'ui/autoload/styles';
import 'ui/autoload/all';
import 'react-vis/dist/style.css';

import './style/main.css';


import template from './templates/index.html';
import { GISApp } from './components/gis_app';


chrome.setRootTemplate(template);
init();

async function init() {
  await whenDOMIsReady();
  const root = document.getElementById('react-gis-root');
  ReactDOM.render(<GISApp/>, root);
}

async function whenDOMIsReady() {
  return new Promise(resolve => {
    const checkInterval = setInterval(() => {
      const hasElm = !!document.getElementById('react-gis-root');
      if (hasElm) {
        clearInterval(checkInterval);
        resolve();
      }
    }, 10);
  });
}