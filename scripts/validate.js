const { readdirSync, readFileSync } = require('node:fs');
const { join, relative } = require('node:path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const root = join(__dirname, '..', 'contracts');
const base = 'https://github.com/TeplrGuy/shared-contracts/contracts/';

function files(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? files(path) : entry.name.endsWith('.schema.json') ? [path] : [];
  });
}

function loadValidator() {
  const ajv = new Ajv({ allErrors: true, strict: true });
  addFormats(ajv);
  const schemas = files(root).map(path => {
    const schema = JSON.parse(readFileSync(path, 'utf8'));
    schema.$id ??= base + relative(root, path).replace(/\\/g, '/');
    return schema;
  });
  for (const schema of schemas) ajv.addSchema(schema);
  for (const schema of schemas) ajv.getSchema(schema.$id);
  return ajv;
}

if (require.main === module) {
  try {
    loadValidator();
    console.log('All contract schemas compiled with formats and references.');
  } catch (error) {
    console.error('Schema validation failed:', error.message);
    process.exitCode = 1;
  }
}

module.exports = { loadValidator };
