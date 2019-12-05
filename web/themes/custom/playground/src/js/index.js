'use strict';

import "core-js/stable";
import "regenerator-runtime/runtime";

import breakpoints from './utilities/breakpoints.js';

import accordion from './components/accordion.js';
import scroller from './components/scroller.js';
import grid from './components/grid.js';
import revealer from './components/revealer.js';
import player from './components/player.js';
import menu from './components/menu.js';
import header from './components/header.js';
import homepageGl from './components/homepage-gl.js';
import tray from './components/tray.js';
import dropdown from './components/dropdown.js';

window.$ = window.$ || jQuery;

(function (Drupal) {

  Drupal.behaviors.playground = {
    attach: (context, settings) => {
      // Utils
      breakpoints();

      header();
      accordion();
      scroller();
      grid();
      revealer();
      player();
      menu();
      homepageGl();
      tray(context);
      dropdown(context);
    },
  };

})(Drupal);