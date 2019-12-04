module.exports = async (page, scenario, vp) => {
  await require('./loadCookies')(page, scenario);
  page = await require('./drupalLogin')(page, scenario);
};
