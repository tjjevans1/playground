'use strict';

import "core-js/stable";
import "regenerator-runtime/runtime";

import breakpoints from './utilities/breakpoints.js';

import accordion from './components/accordion.js';
import scroller from './components/scroller.js';
import grid from './components/grid.js';
import revealer from './components/revealer.js';

(function (Drupal) {

  Drupal.behaviors.playground = {
    attach: (context, settings) => {
      // Utils
      breakpoints();

      accordion();
      scroller();
      grid();
      revealer();
    },
  };

})(Drupal);