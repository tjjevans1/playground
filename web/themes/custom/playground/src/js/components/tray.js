const tray = context => {
  const ATTR = {
    TRAY: "data-tray",
    TRAY_BOTTOM: "data-tray-bottom",
    TRAY_TRIGGER: "data-tray-trigger"
  };

  const CLASSES = {
    OPEN: "is-open"
  };

  const attrSelector = attr => `[${attr}]`;

  const bindToTray = element => {
    const $tray = $(element);
    const $bottom = $tray.find(attrSelector(ATTR.TRAY_BOTTOM));
    const $trigger = $tray.find(attrSelector(ATTR.TRAY_TRIGGER));

    $trigger.on("click keypress", e => {
      $bottom.slideToggle({});
      $tray.toggleClass(CLASSES.OPEN);
    });

    window.addEventListener(
      "orientationchange",
      () => {
        $bottom.css("display", "");
      },
      false
    );
  };

  $(attrSelector(ATTR.TRAY), context).each((index, element) => {
    bindToTray(element);
  });
};

export default tray;
