import 'waypoints/lib/jquery.waypoints.min.js';

const header = () => {
  (function ($) {
    const selectors = {
      header: 'js-pg-header',
    };

    const $selections = {
      header: $(`.${selectors.header}`),
      body: $('body'),
    };

    const classes = {
      headerFixed: 'is-header-fixed'
    };

    const waypoints = [];
    
    const getOffset = () => {
      const offset = parseInt($selections.body.css('padding-top'), 10);
      console.log(offset);
      return offset;
    };

    const bindToHeader = (element) => {
      const $header = $(element);
      
      const $wrap = $('<div>').css({
        height: $header.outerHeight()
      });

      $selections.body.removeClass(classes.headerFixed);
      $header.unwrap();
      
      waypoints.push($header.waypoint({
        handler: function(direction) {
          if (direction === 'down') {
            $selections.header.wrap($wrap);
            $selections.body.addClass(classes.headerFixed);
          } else {
            $selections.body.removeClass(classes.headerFixed);
            $selections.header.unwrap();
          };
        },
        offset: getOffset()
      }));
    };

    $selections.header.each((index, element) => {
      bindToHeader(element);
    });

    $(window).once().on('drupalViewportOffsetChange', () => {
      waypoints.forEach(waypoint => {
        waypoint[0].destroy();
      });

      $selections.header.each((index, element) => {
        bindToHeader(element);
      });
    });

  })(jQuery);
};

export default header;