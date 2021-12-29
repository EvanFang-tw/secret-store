const fs = require('fs');
const path = require('path')
const aes = require('./aes')

const RECORDS_FOLDER_NAME = 'data';

function getRecordsFrom(filename, key) {
  return readObjectFromFile(filename, key);
}

function appendRecordTo(filename, key, record) {
  const records = readObjectFromFile(filename, key);
  records.push({
    id: (new Date()).getTime().toString(),
    record
  });
  writeObjectToFile(filename, key, records);
}

function removeRecordFrom(filename, key, recordId) {
  const records = readObjectFromFile(filename, key);
  const afterDeleted = records.filter((r) => r.id !== recordId)
  writeObjectToFile(filename, key, afterDeleted);
}

// privetate functions
function getFilePath(filename) {
  return path.join(
    RECORDS_FOLDER_NAME,
    filename
  );
}

function readObjectFromFile(filename, key) {
  const filePath = getFilePath(filename);
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const content = fs.readFileSync(filePath, {
    encoding: 'utf-8'
  });
  const decryptedContent = aes.decrypt(key.toString(), content)

  return JSON.parse(decryptedContent);
}

function writeObjectToFile(filename, key, obj) {
  const filePath = getFilePath(filename);
  const content = JSON.stringify(obj);
  const ecryptedContent = aes.encrypt(key.toString(), content);

  fs.writeFileSync(
    filePath,
    ecryptedContent, {
    encoding: 'utf-8'
  }
  );
}

module.exports = {
  getRecordsFrom,
  appendRecordTo,
  removeRecordFrom
}