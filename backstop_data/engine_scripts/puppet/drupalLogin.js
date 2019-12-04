const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = async (page, scenario) => {
  if (scenario.drupalLogin) {
    const { stdout, stderr } = await exec('ddev exec drush uli');
    
    await page.goto(stdout);
    await page.goto(scenario.url);
  }

  return page;
};