const path = require('path');
const fs = require('fs')
const getConfigDir = require('./getPath').getConfigDir;

const chalk = require('chalk');
const log = console.log;

/**
 * project_name: string
 * git_path: string
 * build_script: string
 * from_docker: string
 */

class ProjectConfig {
    constructor(opts) {
        if(!opts) {
            opts = {}
        }

        if(!typeof opts.project_name === 'string') {
            log(chalk.red('请填写正确的项目名称'))
            return;
        }

        const { project_name, git_path, build_script, ...rest } = opts;


        this.config = {
            project_name: project_name,
            git_path: typeof opts.git_path === 'string' ? opts.git_path : '',
            build_script: typeof opts.build_script === 'string' ? opts.build_script : '',
            ...rest
        }

        const configFromDisk = this.getConfigFromDisk(project_name)

        if(configFromDisk) {
            this.setConfig(configFromDisk)
        }
    }

    setName (nextName) {
        const configDir = getConfigDir()
        const oldName = this.config.project_name;
        const oldPath = path.resolve(configDir, `${oldName}.json`)
        const newPath = path.resolve(configDir, `${nextName}.json`)



        fs.rename(oldPath, newPath, function(err) {
            if(!err) {
                log(chalk.green('项目名称修改成功'))
                this.setConfig({ 
                    project_name: nextName 
                }, true)
            }
        })

        
    }

    setGitPath () {

    }

    setBuildScript () {

    }

    getConfigFromDisk (project_name) {
        const cfgFile = `${project_name}.json`;
        const cfgPath = path.resolve(getConfigDir(), cfgFile);

        log(cfgPath);

        if(fs.existsSync(cfgPath)) {
            const configJson = JSON.parse(fs.readFileSync(cfgPath))
            return configJson;
        }

        fs.writeFile(cfgPath, JSON.stringify(this.config), function(err) {
            if(!err) {
                log(chalk.green(`${cfgFile}文件创建成功`))
            }
        })

        return null;

    }

    setConfig (nextConfig, updateToDisk) {
        this.config = { ...nextConfig }

        if(updateToDisk) {
            this.updateToDisk(nextConfig)
        }
    }

    updateConfigFile (nextConfig) {
        const project_name =  this.config.project_name;
    }
}

module.exports = ProjectConfig;