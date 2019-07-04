'use strict';

import "core-js/stable";
import "regenerator-runtime/runtime";

import breakpoints from './utilities/breakpoints.js';

import accordion from './components/accordion.js';

(function (Drupal) {

  Drupal.behaviors.playground = {
    attach: (context, settings) => {
      // Utils
      breakpoints();

      accordion();
    },
  };

})(Drupal);