const { Command } = require('commander');
const program = new Command();
program.version('0.0.1');

const logger = require('./logger');
const { getFromPrompt } = require('./prompt');
const records = require('./records')

// set options
program
  .option('-l, --list', 'list records')
  .option('-a, --add', 'add record')
  .option('-d, --delete', 'delete record by id');

program.parse(process.argv);

const options = program.opts();

if (options.list) {
  getFromPrompt(['filename', 'key']).then(data => {
    data = records.getRecordsFrom(data.filename, data.key);
    logger.info(data);
  })
} else if (options.add) {
  getFromPrompt(['filename', 'key', 'record']).then(data => {
    records.appendRecordTo(data.filename, data.key, data.record);
    logger.info('done');
  })
} else if (options.delete) {
  getFromPrompt(['filename', 'key', 'id']).then(data => {
    records.removeRecordFrom(data.filename, data.key, data.id)
  })
}
