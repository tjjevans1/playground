const breakpoints = () => {
  (function($) {
    const breakpoints = {
      xs: ["d-block", "d-sm-none"],
      sm: ["d-none", "d-sm-block", "d-md-none"],
      md: ["d-none", "d-md-block", "d-lg-none"],
      lg: ["d-none", "d-lg-block", "d-xl-none"],
      xl: ["d-none", "d-xl-block"]
    };

    const attributes = {
      breakpoint: "data-tm-breakpoint"
    };

    const $body = $("body");

    window.getBreakpoint = () => {
      return $(`[${attributes.breakpoint}]:visible`).attr(
        attributes.breakpoint
      );
    };

    // Init breakpoint spans
    let spans = $();
    Object.keys(breakpoints).forEach(key => {
      let span = $("<span>")
        .addClass(breakpoints[key].join(" "))
        .attr(attributes.breakpoint, key);

      spans = spans.add(span);
    });
    $body.once("breakpoints").append(spans);

    // Get initial breakpoint on load;
    let currentBreakpoint = window.getBreakpoint();

    // Add resize event handler in debounce function for increase performance
    let resize;
    $(window)
      .once("breakpoints")
      .resize(() => {
        clearTimeout(resize);
        resize = setTimeout(() => {
          let breakpoint = window.getBreakpoint();

          if (breakpoint !== currentBreakpoint) {
            const breakpointEvent = new CustomEvent("breakpoint", {
              detail: breakpoint
            });
            window.dispatchEvent(breakpointEvent);

            currentBreakpoint = breakpoint;
          }
        }, 50);
      });
  })(jQuery);
};

export default breakpoints;
