const util = require('util');
const exec = util.promisify(require('child_process').exec);
const dotenv = require('/usr/local/lib/node_modules/dotenv').config();

module.exports = async (page, scenario) => {
  if (scenario.drupalLogin) {
    await page.goto(process.env.ADMIN_LOGIN_URL);

    await page.type('#edit-name', process.env.ADMIN_LOGIN_USERNAME);
    await page.type('#edit-pass', process.env.ADMIN_LOGIN_PASSWORD);

    await Promise.all([
      page.click('#edit-submit'),
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);
  }
};