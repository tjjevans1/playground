import 'waypoints/lib/jquery.waypoints.min.js';

const revealer = () => {
  (function($) {
    const selector = {
      revealer: 'data-pg-revealer',
      section: 'data-pg-revealer-section',
      text: 'data-pg-revealer-text',
      content: 'data-pg-revealer-content'
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
      let height = $first.outerHeight();

      const handleScroll = (e) => {
        window.requestAnimationFrame(() => {
          $first.css('max-height', `${height + $revealer[0].getBoundingClientRect().y}px`);
        });
      };

      waypoints.push($revealer.waypoint({
        handler: function(direction) {
          if ((direction) == 'down') {
            
            $sections.each((index, element) => {
              const $section = $(element);
              const $wrap = $('<div>').css({ height: $section.outerHeight()});
              $section.wrap($wrap);
              $first.find(`[${selector.content}]`).css({ height: height});
            });
            $sections.addClass(classes.fixed);

            $(window).on('scroll', handleScroll);
          } else {
            $sections.removeClass(classes.fixed);

            $sections.unwrap();

            $(window).off('scroll', handleScroll);
          }
        }
      }));

      waypoints.push($revealer.waypoint({
        handler: function(direction) {
          if ((direction) == 'down') {
            $sections.removeClass(classes.fixed);

            $sections.unwrap();

            $(window).off('scroll', handleScroll);

            $first[0].removeAttribute('style');
          } else {
            $sections.each((index, element) => {
              const $section = $(element);
              const $wrap = $('<div>').css({ height: $section.outerHeight()});
              
              $section.wrap($wrap);
            });
            $first.css('max-height', `0`)
            $sections.addClass(classes.fixed);
            $(window).on('scroll', handleScroll);
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