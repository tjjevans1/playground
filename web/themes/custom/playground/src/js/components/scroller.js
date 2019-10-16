import 'waypoints/lib/jquery.waypoints.min.js';

const scroller = () => {
  (function($) {
    const selector = {
      scroller: 'data-pg-scroller',
      main: 'data-pg-scroller-main',
      inset: 'data-pg-scroller-inset',
      head: 'data-pg-scroller-head',
    };

    const $selections = {
      scrollers: $(`[${selector.scroller}]`),
    };

    const classes = {
      fixed: 'is-fixed',
      finished: 'is-finished'
    };

    const waypoints = [];

    const fixScroller = ($scroller, $main, $head, directon) => {
      [$main, $head].forEach($selection => {
        const rect = $selection[0].getBoundingClientRect();

        let top = ($(window).height() - ($main.outerHeight() + $head.outerHeight())) / 2;

        if ($selection[0].hasAttribute(selector.main)) {
          top += $head.outerHeight();
        }

        $selection.css({
          top: top,
          left: rect.left,
          height: rect.height,
          width: rect.width
        });
      });
      
      const $wrap = $('<div>').css({ height: $head.outerHeight() });
      $head.wrap($wrap);

      $scroller.addClass(classes.fixed);
      $scroller.removeClass(classes.finished);
    };

    const unfixScroller = ($scroller, $main, $head, direction) => {
      $scroller.removeClass(classes.fixed);

      [$main, $head].forEach($selection => {$selection.removeAttr('style')});

      if (direction == 'down') {
        $scroller.addClass(classes.finished);
        $head.css({bottom: $main.outerHeight()});
      } else {
        $head.unwrap();
      }
    };

    const updateFixedElement = (element) => {
      const $scroller = $(element);
      const $main = $scroller.find(`[${selector.main}]`);
      const $head = $scroller.find(`[${selector.head}]`);
      
      [$main, $head].forEach($selection => {
        $scroller.removeClass(classes.fixed);
        $selection.css({left: ''});

        const left = $selection[0].getBoundingClientRect().x;

        $scroller.addClass(classes.fixed);
        $selection.css({left: left});
      });
    };

    const unbindFromScroller = function(element) {
      const $scroller = $(element);
      const $main = $scroller.find(`[${selector.main}]`);
      const $head = $scroller.find(`[${selector.head}]`);
  
      $scroller.removeClass(classes.fixed, classes.finished);
  
      if ($head.parent(`[${selector.scroller}]`).length < 1) {
        $head.unwrap();
      }
  
      [$main, $head].forEach($selection => $selection.removeAttr('style'));
    }

    const bindToScroller = (element) => {
      const $scroller = $(element);
      const $main = $scroller.find(`[${selector.main}]`);
      const $head = $scroller.find(`[${selector.head}]`);
      const $inset = $scroller.find(`[${selector.inset}]`);

      if ($inset.outerHeight() < $main.outerHeight()) {return;}

      waypoints.push($scroller.waypoint({
        handler: function(direction) {
          if(direction == 'down') {
            fixScroller($scroller, $main, $head, direction);
          } else {
            unfixScroller($scroller, $main, $head, direction);
          }
        },
        offset: ($(window).height() - ($main.outerHeight() + $head.outerHeight())) / 2,
      }));

      waypoints.push($scroller.waypoint({
        handler: function (direction) {
          if (direction == 'down') {
            unfixScroller($scroller, $main, $head, direction);
          } else {
            fixScroller($scroller, $main, $head, direction);
          }
        },
        offset: -($scroller.outerHeight() - $(window).height()) - (($(window).height() - ($main.outerHeight() + $head.outerHeight())) / 2),
      }));
    }; 

    if (!['xs', 'sm'].includes(window.getBreakpoint())) {
      $selections.scrollers.once('scroller').each((index, element) => {
        bindToScroller(element);
      });
    }

    $(window).on('breakpoint', (e) => {
      waypoints.forEach(waypoint => {
        waypoint[0].destroy();
      });

      $selections.scrollers.each((index, element) => {
        unbindFromScroller(element);
      });

      if (!['xs', 'sm'].includes(e.detail)) {
        $selections.scrollers.each((index, element) => {
          bindToScroller(element);
        });
      }
    });
    
    let resize;
    $(window).once('breakpoint-resize').on('resize', (e) => {
      clearTimeout(resize);
      resize = setTimeout(() => {
        $selections.scrollers.filter((index, element) => {
          return $(element).hasClass(classes.fixed);
        }).each((index, element) => {
          updateFixedElement(element);
        });
      }, 20);
    });
  })(jQuery);
}

export default scroller;