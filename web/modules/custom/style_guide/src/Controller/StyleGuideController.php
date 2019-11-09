<?php

namespace Drupal\style_guide\Controller;

use Drupal\Core\Controller\ControllerBase;

class StyleGuideController extends ControllerBase {
  public function home() {
    return [
      '#theme' => 'style_guide',
    ];
  }

  public function webGl() {
    return [
      '#theme' => 'style_guide__web_gl',
    ];
  }
}
