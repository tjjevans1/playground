const alert = context => {
  const ATTR = {
    alert: "data-pg-alert",
    close: "data-pg-alert-close"
  };

  $(`[${ATTR.close}]`).click(function() {
    $(this)
      .closest(`[${ATTR.alert}]`)
      .slideUp();
  });
};

export default alert;
