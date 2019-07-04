const accordion = () => {
  (function ($) {

    const selectors = {
      accordion: 'data-pg-accordion',
      slide: 'data-pg-accordion-slide',
      content: 'data-pg-accordion-content',
    };

    const $selections = {
      accordions: $(`[${selectors.accordion}]`)
    };

    const classes = {
      active: 'is-active'
    }

    const bindToAccordion = (element) => {
      const $accordion = $(element);
      const $slides = $accordion.find(`[${selectors.slide}]`);
      const $contents = $accordion.find(`[${selectors.content}]`);

      $slides.click((e) => {
        const $slide = $(e.delegateTarget);
        const $content = $slide.find(`[${selectors.content}]`);

        $slides.filter((index, element) => {
          return element !== $slide[0];
        }).removeClass(classes.active);
        $slide.toggleClass(classes.active);

        $contents.filter((index, element) => {
          return element !== $content[0];
        }).slideUp();
        $content.slideToggle();
      });
    };

    $selections.accordions.once().each((index, element) => {
      bindToAccordion(element);
    });

  })(jQuery);
};

export default accordion;