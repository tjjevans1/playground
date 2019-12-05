const dropdown = context => {
  const attrSelector = attr => `[${attr}]`;

  const ATTR = {
    DROPDOWN: "data-dropdown",
    DROPDOWN_TOP: "data-dropdown-top",
    DROPDOWN_BOTTOM: "data-dropdown-bottom",
    DROPDOWN_SELECTED: "data-dropdown-selected"
  };

  const CLASSES = {
    ACTIVE: "is-active",
    TRANSITION: "in-transition"
  };

  const $dropdowns = $(attrSelector(ATTR.DROPDOWN), context);

  const updateSelected = ($bottom, $selected, defaultText) => {
    const numberOfSelected = $bottom.find("input:checked").length;

    if (numberOfSelected > 0) {
      $selected.text(`${numberOfSelected} Selected`);
    } else {
      $selected.text(defaultText);
    }
  };

  const closeFilter = $dropdown => {
    const $bottom = $dropdown.find(attrSelector(ATTR.DROPDOWN_BOTTOM));

    $bottom.slideUp({
      start: e => {
        $dropdown.addClass(CLASSES.TRANSITION);
      },
      complete: e => {
        if ($bottom.filter(":visible").length === 0) {
          $dropdown.removeClass(CLASSES.ACTIVE);
        } else {
          $dropdown.addClass(CLASSES.ACTIVE);
        }
        $dropdown.removeClass(CLASSES.TRANSITION);
      }
    });
  };

  const toggleFilter = $dropdown => {
    const $bottom = $dropdown.find(attrSelector(ATTR.DROPDOWN_BOTTOM));

    $bottom.slideToggle({
      start: e => {
        $dropdown.addClass(CLASSES.TRANSITION);
      },
      complete: e => {
        if ($bottom.filter(":visible").length === 0) {
          $dropdown.removeClass(CLASSES.ACTIVE);
        } else {
          $dropdown.addClass(CLASSES.ACTIVE);
        }
        $dropdown.removeClass(CLASSES.TRANSITION);
      }
    });
  };

  const bindToDropdown = element => {
    const $dropdown = $(element);
    const $top = $dropdown.find(attrSelector(ATTR.DROPDOWN_TOP));
    const $bottom = $dropdown.find(attrSelector(ATTR.DROPDOWN_BOTTOM));
    const $selected = $dropdown.find(attrSelector(ATTR.DROPDOWN_SELECTED));
    const defaultText = $selected.text();

    $top.on("click keypress", e => {
      toggleFilter($dropdown);

      $dropdowns
        .filter((index, dropdown) => dropdown !== $dropdown[0])
        .each((index, element) => {
          closeFilter($(element));
        });
    });

    $bottom.on("change", e => {
      updateSelected($bottom, $selected, defaultText);
    });

    updateSelected($bottom, $selected, defaultText);
  };

  $dropdowns.each((index, element) => {
    bindToDropdown(element);
  });
};

export default dropdown;
