/**
 * 部署全局配置
 * workDir
 */
const path = require('path');
const fs = require('fs');
const getDefaultHome = require('./getPath').getDefaultHome;
const config_fields = require('./constant').config_fields;

// const config = new Config(_key)

class Config {
    constructor(opts) {
        if(!opts) {
            opts = {}
        }
        this.field = opts.field || ''
    }

    isValidated (_key) {
        return config_fields.includes(_key)
    }

    getConfig() {
        const config_path = path.resolve(getDefaultHome(), 'config.json');


    }

    add (_field, value) {
        const key = _field || opts.field;
        
        if(this.isValidated(_field)) {

        }
    }

    delete () {
        const key = _field || opts.field;
        
        if(this.isValidated(_field)) {
            
        }

    }


    update () {
        const key = _field || opts.field;
        
        if(this.isValidated(_field)) {
            
        }
    }


}


module.exports = Config;