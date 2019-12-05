const menu = () => {
  const selectors = {
    menu: "js-pg-menu-trigger"
  };

  const $selections = {
    menuTrigger: $(`.${selectors.menu}`),
    body: $("body")
  };

  const classes = {
    menuActive: "is-menu-active"
  };

  const bindToMenuTrigger = element => {
    const $trigger = $(element);

    $trigger.click(e => {
      $selections.body.toggleClass(classes.menuActive);
    });
  };

  $selections.menuTrigger.once().each((index, element) => {
    bindToMenuTrigger(element);
  });
};

export default menu;
