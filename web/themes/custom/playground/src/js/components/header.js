import "waypoints/lib/jquery.waypoints.min.js";

const header = () => {
  const selectors = {
    header: "js-pg-header",
    wrap: "js-pg-wrap"
  };

  const $selections = {
    header: $(`.${selectors.header}`),
    body: $("body")
  };

  const classes = {
    headerFixed: "is-header-fixed",
    toolbarFixed: "toolbar-fixed"
  };

  const waypoints = [];

  const getOffset = () => {
    let offset = 0;

    if ($selections.body.hasClass(classes.toolbarFixed)) {
      offset += parseInt($selections.body.css("padding-top"), 10);
    }

    return offset;
  };

  const bindToHeader = element => {
    const $header = $(element);

    $selections.body.removeClass(classes.headerFixed);
    $header.unwrap(`.${selectors.wrap}`);

    const $wrap = $("<div>")
      .css({ height: $header.outerHeight() })
      .addClass(selectors.wrap);

    waypoints.push(
      $header.waypoint({
        handler: function(direction) {
          if (direction === "down") {
            $selections.header.wrap($wrap);
            $selections.body.addClass(classes.headerFixed);
          } else {
            $selections.body.removeClass(classes.headerFixed);
            $selections.header.unwrap(`.${selectors.wrap}`);
          }
        },
        offset: getOffset()
      })
    );
  };

  $selections.header.once().each((index, element) => {
    bindToHeader(element);
  });

  $(window)
    .once()
    .on("drupalViewportOffsetChange", () => {
      waypoints.forEach(waypoint => {
        waypoint[0].destroy();
      });

      $selections.header.each((index, element) => {
        bindToHeader(element);
      });
    });
};

export default header;
