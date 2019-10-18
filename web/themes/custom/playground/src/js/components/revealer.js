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

    const getHandleScroll = ($revealer, $sections) => {
      const height = $sections.first().outerHeight();

      const handleScroll = e => {
        window.requestAnimationFrame(() => {
          $sections.first().css('max-height', `${height + $revealer[0].getBoundingClientRect().y}px`);
        });
      };
      
      return  handleScroll;
    };

    const getOffset = bottom => bottom ? 'bottom-in-view': 0;

    const unfixRevealer = ($revealer, $sections, handleScroll) => {
      $sections.removeClass(classes.fixed);

      $sections.unwrap();

      $(window).off('scroll', handleScroll);

      $sections.each((index, element) => {
        element.removeAttribute('style');
      });
    };

    const fixRevealer = ($sections, handleScroll, direction) => {
      $sections.each((index, element) => {
        const $section = $(element);
        const $wrap = $('<div>').css({ height: $section.outerHeight()});
        $section.wrap($wrap);
        
        const height = $section.outerHeight();
        $section.find(`[${selector.content}]`).css({ height: height});

        if (index === 0 && direction !== 'down') {
          $section.css('max-height', 0)
        }
      });

      $sections.addClass(classes.fixed);

      $(window).on('scroll', handleScroll);
    };

    const bindToRevealer = (element) => {
      const $revealer = $(element);
      const $sections = $revealer.find(`[${selector.section}]`);

      const handleScroll = getHandleScroll($revealer, $sections);

      [false, true].forEach(bottom => {
        waypoints.push($revealer.waypoint({
          handler: function(direction) {
            if ((direction) == 'down') {
              if (!bottom) {
                fixRevealer($sections, handleScroll, direction);
              } else {
                unfixRevealer($revealer, $sections, handleScroll);  
              }
            } else {
              if (!bottom) {
                unfixRevealer($revealer, $sections, handleScroll);
              } else {
                fixRevealer($sections, handleScroll, direction);
              }
            }
          },
          offset: getOffset(bottom)
        }));
      });

    };

    $selections.revealers.once('revealer').each((index, element) => {
      bindToRevealer(element);
    });
  })(jQuery);
}

export default revealer;