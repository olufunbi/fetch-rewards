const rm = require('rimraf')
const ls = require('ls')

const snapshotDir = './reports/e2e';
// list all of existing report files
ls(snapshotDir)
// delete all existing report files
rm(snapshotDir, (error) => {
  if (error) {
    console.error(`Error while removing existing image files: ${error}`)
    process.exit(1)
  }
  console.log('Removing all existing image files successfully!')
});
