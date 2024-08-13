const report = require('multiple-cucumber-html-reporter');

const os = require("os");

const platform = {
  Darwin: 'osx',
  Linux: 'linux',
  Windows_NT: 'windows',
}[os.type()];

report.generate({
  jsonDir: './reports/e2e/',
  reportPath: './reports/e2e/',
  saveCollectedJSON: true,
  displayDuration: true,
  durationInMS: false,
  displayReportTime: true,
  pageTitle: 'Fetch Coding Challenge',
  reportName: 'Find Fake Gold Bar',
  metadata: {
    browser: {
      name: 'chrome'
    },
    device: 'Desktop',
    platform: {
      name: `${platform}`
    }
  },
  customData: {
    title: 'Run info',
    data: [
      { label: 'Project', value: 'Fetch Coding Challenege' },
      { label: 'Run Mode', value: 'Sequential' },
      { label: 'Test Engine', value: 'Cypress' },
      { label: 'Execution Date', value: `${new Date().toDateString()}` },
      { label: 'Execution Time', value: `${new Date().toTimeString()}` }
    ]
  },
  pageFooter: '<div class="created-by">\n' +
        '            <p>| Created by Olufunbi Babalola |        </p>'
});
