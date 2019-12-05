import "waypoints/lib/jquery.waypoints.min.js";

const scroller = () => {
  const selector = {
    scroller: "data-pg-scroller",
    main: "data-pg-scroller-main",
    inset: "data-pg-scroller-inset",
    head: "data-pg-scroller-head"
  };

  const $selections = {
    scrollers: $(`[${selector.scroller}]`)
  };

  const classes = {
    fixed: "is-fixed",
    finished: "is-finished"
  };

  const waypoints = [];

  const getOffset = ($scroller, $main, $head, bottom = false) => {
    let offset =
      ($(window).height() - ($main.outerHeight() + $head.outerHeight())) / 2;

    if (bottom) {
      offset = -($scroller.outerHeight() - $(window).height()) - offset;
    }

    return offset;
  };

  const fixScroller = ($scroller, $main, $head, directon) => {
    [$main, $head].forEach($selection => {
      const rect = $selection[0].getBoundingClientRect();

      let top =
        ($(window).height() - ($main.outerHeight() + $head.outerHeight())) / 2;

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

    const $wrap = $("<div>").css({ height: $head.outerHeight() });

    if ($head.parent(`[${selector.scroller}]`).length >= 1) {
      $head.wrap($wrap);
    }

    $scroller.addClass(classes.fixed);
    $scroller.removeClass(classes.finished);
  };

  const unfixScroller = ($scroller, $main, $head, direction = "up") => {
    $scroller.removeClass(classes.fixed);

    [$main, $head].forEach($selection => {
      $selection.removeAttr("style");
    });

    if (direction == "down") {
      $scroller.addClass(classes.finished);
      $head.css({ bottom: $main.outerHeight() });
    } else {
      $scroller.removeClass(classes.finished);
      if ($head.parent(`[${selector.scroller}]`).length < 1) {
        $head.unwrap();
      }
    }
  };

  const updateFixedElement = element => {
    const $scroller = $(element);
    const $main = $scroller.find(`[${selector.main}]`);
    const $head = $scroller.find(`[${selector.head}]`);

    [$main, $head].forEach($selection => {
      $scroller.removeClass(classes.fixed);
      $selection.css({ left: "" });

      const left = $selection[0].getBoundingClientRect().x;

      $scroller.addClass(classes.fixed);
      $selection.css({ left: left });
    });
  };

  const bindToScroller = element => {
    const $scroller = $(element);
    const $main = $scroller.find(`[${selector.main}]`);
    const $head = $scroller.find(`[${selector.head}]`);
    const $inset = $scroller.find(`[${selector.inset}]`);

    if ($inset.outerHeight() < $main.outerHeight()) {
      return;
    }

    [false, true].forEach(bottom => {
      waypoints.push(
        $scroller.waypoint({
          handler: function(direction) {
            if (direction == "down") {
              if (!bottom) {
                fixScroller($scroller, $main, $head, direction);
              } else {
                unfixScroller($scroller, $main, $head, direction);
              }
            } else {
              if (!bottom) {
                unfixScroller($scroller, $main, $head, direction);
              } else {
                fixScroller($scroller, $main, $head, direction);
              }
            }
          },
          offset: getOffset($scroller, $main, $head, bottom)
        })
      );
    });
  };

  if (!["xs", "sm"].includes(window.getBreakpoint())) {
    $selections.scrollers.once("scroller").each((index, element) => {
      bindToScroller(element);
    });
  }

  $(window).on("breakpoint", e => {
    waypoints.forEach(waypoint => {
      waypoint[0].destroy();
    });

    $selections.scrollers.each((index, element) => {
      const $scroller = $(element);
      const $main = $scroller.find(`[${selector.main}]`);
      const $head = $scroller.find(`[${selector.head}]`);
      unfixScroller($scroller, $main, $head);
    });

    if (!["xs", "sm"].includes(e.detail)) {
      $selections.scrollers.each((index, element) => {
        bindToScroller(element);
      });
    }
  });

  let resize;
  $(window)
    .once("breakpoint-resize")
    .on("resize", e => {
      clearTimeout(resize);
      resize = setTimeout(() => {
        $selections.scrollers
          .filter((index, element) => {
            return $(element).hasClass(classes.fixed);
          })
          .each((index, element) => {
            updateFixedElement(element);
          });
      }, 20);
    });
};

export default scroller;
