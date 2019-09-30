import 'waypoints/lib/jquery.waypoints.min.js';

const revealer = () => {
  (function($) {
    const selector = {
      revealer: 'data-pg-revealer',
      section: 'data-pg-revealer-section',
      text: 'data-pg-revealer-text',
    };

    const $selections = {
      revealers: $(`[${selector.revealer}]`)
    };

    const classes = {
      fixed: 'is-fixed'
    };

    const waypoints = [];

    const bindToRevealer = (element) => {
      let $revealer = $(element);
      let $sections = $revealer.find(`[${selector.section}]`);
      let $first = $sections.first();
      let $text = $first.find(`[${selector.text}]`);
      let $last = $sections.last();

      const handleTextScroll = (e) => {
        $text.css('bottom', `calc(50% + ${$revealer[0].getBoundingClientRect().y}px`);
      };

      waypoints.push($revealer.waypoint({
        handler: function(direction) {
          if ((direction) == 'down') {
            const $wrap = $('<div>').css({ height: $last.outerHeight()});
            
            $last.wrap($wrap);
            $last.addClass(classes.fixed);

            $(window).on('scroll', handleTextScroll);
          } else {
            $last.unwrap();
            $last.removeClass(classes.fixed);
            $text.css('bottom', `50%`);

            $(window).off('scroll', handleTextScroll);
          }
        }
      }));

      waypoints.push($revealer.waypoint({
        handler: function(direction) {
          if ((direction) == 'down') {
            $last.unwrap();
            $last.removeClass(classes.fixed);
            $text.css('bottom', `50%`);

            $(window).off('scroll', handleTextScroll);
          } else {
            const $wrap = $('<div>').css({ height: $last.outerHeight()});
            
            $last.wrap($wrap);
            $last.addClass(classes.fixed);

            $(window).on('scroll', handleTextScroll);
          }
        },
        offset: 'bottom-in-view',
      }));
    };

    $selections.revealers.once('revealer').each((index, element) => {
      bindToRevealer(element);
    });
  })(jQuery);
}

export default revealer;