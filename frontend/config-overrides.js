const { alias, configPaths } = require('react-app-rewire-alias');
const { aliasDangerous } = require('react-app-rewire-alias/src/aliasDangerous');

module.exports = function override(config) {
    // "@tenderd" module resides outside of root folder, need to add exception
    aliasDangerous(configPaths('./tsconfig.paths.json'))(config);
    return config;
};
