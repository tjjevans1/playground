import 'waypoints/lib/jquery.waypoints.min.js';

const scroller = () => {
  (function($) {
    const selector = {
      scroller: 'data-pg-scroller',
      main: 'data-pg-scroller-main',
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

    const updateFixedElement = (element) => {
      const $scroller = $(element);
      const $main = $scroller.find(`[${selector.main}]`);
      const $head = $scroller.find(`[${selector.head}]`);

      $scroller.removeClass(classes.fixed);
      $main.css({
        left: ''
      });

      $head.css({
        left: ''
      });

      const mainLeft = $main[0].getBoundingClientRect().x;
      const headLeft = $head[0].getBoundingClientRect().x;

      $scroller.addClass(classes.fixed);

      $main.css({
        left: mainLeft
      });

      $head.css({
        left: headLeft
      });
    };

    const bindToScroller = (element) => {
      const $scroller = $(element);
      const $main = $scroller.find(`[${selector.main}]`);
      const $head = $scroller.find(`[${selector.head}]`);

      $scroller.removeClass(classes.fixed, classes.finished);

      $main.css({
        top: '',
        left: '',
        height: '',
        width: '',
      });

      $head.css({
        top: '',
        left: '',
        height: '',
        width: '',
        bottom: ''
      });

      waypoints.push($scroller.waypoint({
        handler: function(direction) {
          if(direction == 'down') {
            const mainRect = $main[0].getBoundingClientRect();
            const headRect = $head[0].getBoundingClientRect();

            $main.css({
              top: (($(window).height() - ($main.outerHeight() + $head.outerHeight())) / 2) + $head.outerHeight(),
              left: mainRect.left,
              height: mainRect.height,
              width: mainRect.width
            });

            $head.css({
              top: ($(window).height() - ($main.outerHeight() + $head.outerHeight())) / 2,
              left: headRect.left,
              height: headRect.height,
              width: headRect.width,
            });

            const $wrap = $('<div>').css({ height: $head.outerHeight() });
            
            $head.wrap($wrap);

            $scroller.addClass(classes.fixed);

          } else {
            $scroller.removeClass(classes.fixed);
            $main.css({
              top: '',
              left: '',
              height: '',
              width: '',
            });

            $head.css({
              top: '',
              left: '',
              height: '',
              width: '',
              bottom: ''
            });

            $head.unwrap();
          }
        },
        offset: ($(window).height() - ($main.outerHeight() + $head.outerHeight())) / 2,
      }));

      waypoints.push($scroller.waypoint({
        handler: function (direction) {
          if (direction == 'down') {
            $scroller.removeClass(classes.fixed);
            $scroller.addClass(classes.finished);
            $main.css({
              top: '',
              left: '',
              height: '',
              width: '',
            });

            $head.css({
              top: '',
              left: '',
              height: '',
              width: '',
              bottom: $main.outerHeight(),
            });
          } else {
            const mainRect = $main[0].getBoundingClientRect();
            const headRect = $head[0].getBoundingClientRect();

            $main.css({
              top: (($(window).height() - ($main.outerHeight() + $head.outerHeight())) / 2) + $head.outerHeight(),
              left: mainRect.left,
              height: mainRect.height,
              width: mainRect.width
            });

            $head.css({
              top: ($(window).height() - ($main.outerHeight() + $head.outerHeight())) / 2,
              left: headRect.left,
              height: headRect.height,
              width: headRect.width,
              bottom: ''
            });
            $scroller.removeClass(classes.finished);
            $scroller.addClass(classes.fixed);
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