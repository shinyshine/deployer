const ProjectConfig = require('./ProjectConfig');
const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const getPath = require('./getPath');
const chalk = require('chalk');
const log = console.log;
/**
 * 单个配置文件内容 ~/.deploy/config/[projectName].json
 * 项目名称 projectName
 * 仓库地址 gitPath
 * 构建命令 buildScript
 * 
 * 
 * 两个工作目录 worker __worker__
 * 
 */

class API {
    constructor(opts) {
        if(!opts) {
            opts = {}
        }
        // project_name
        // git_path
        // build_script: 'npm run build' // 打包命令
        // start_script: 'npm start'  // 启动命令

        if(typeof opts.project_name !== 'string') {
            log(chalk.red('项目名称必须填写'));
            return;
        }
        this.initConfig(opts)
        this.initFileStructure();

    }
    initConfig(opts) {
        const PROJECT_CONFIG = path.resolve(getPath('PROJECT_CONFIG'), opts.project_name);
        if(fs.existsSync(PROJECT_CONFIG)) {
            try {
                const _file = fs.readFileSync(PROJECT_CONFIG);
                const json = JSON.parse(_file);
                this.config = { ...json, ...opts };
            } catch(e) {
                log(chalk(e))
            }
            return;
        }

        this.config = { ...opts };
    }

    // static 获取代码检出目录
    getWorkDir() {
        const workDir = this.workPool.find(item => !fs.existsSync(item));
        try {
            mkdirp.sync(workDir)
        } catch(e) {
            log(chalk.red(e))
        }
        return workDir
    }

    getProjectConfig() {
        const opts = this.config;
        const PROJECT_CONFIG = path.resolve(getPath('PROJECT_CONFIG'), opts.project_name);
        if(fs.existsSync(PROJECT_CONFIG)) {
            try {
                const _file = fs.readFileSync(PROJECT_CONFIG);
                const json = JSON.parse(_file);
                return { ...json, ...opts };
            } catch(e) {
                log(chalk(e))
            }
        }

        return { ...opts }
    }


    installNodeModules() {
        const cacheDir = this.workPool.find(item => item !== this.workDir)
        if(!fs.existsSync(cacheDir)) {
            // 不存在直接install
        }

        // 存在新旧作比较
        // 新旧相同则使用软链
        // 新旧不同则删除cacheDir，
    }

    // 部署执行
    start() {
        const workDir = this.workDir;
        const projectConfig = this.config;

        log(chalk.blue(`代码将在${workDir}检出`));

        const gitPull = child_process.spawn('sh', [
            path.resolve('../shell/git-pull.sh'), '-p', projectConfig.git_path 
        ], {
            cwd: workDir
        })
        gitPull.stdout.on('data', function(data) {
            log(data.toString())
        })
        gitPull.stderr.on('data', function(data) {
            log(chalk.blue(data.toString()))
        })
        gitPull.on('close', function(gitStatus) {
            if(gitStatus === 0) {
                // 代码检出成功,准备安装依赖
                // this.installNodeModules()
            }
        })
    }

    initFileStructure() {
        const paths = getPath();

        if(!fs.existsSync(paths.PROJECT_CONFIG)) {
            try {
                mkdirp.sync(paths.PROJECT_CONFIG)
            } catch(e) {
                console.error(e.stack || e);
            }
        }

        if(!fs.existsSync(paths.DEPLOY_CONFIG)) {
            const defaultConfig = {
                workDir: [
                    '/usr/local/data/deploy'
                ]
            }
            try {
                fs.writeFileSync(paths.DEPLOY_CONFIG, JSON.stringify(defaultConfig))
            } catch(e) {
                console.error(e.stack || e);
            }
        }

        const { project_name, work_dir } = this.config;

        const DEPLOY_CONFIG = paths.DEPLOY_CONFIG;
        let config = fs.readFileSync(DEPLOY_CONFIG);
        config = JSON.parse(config);
        const workDirArr = config.workDir;

        const WORK_ROOT = workDirArr.includes(work_dir) 
            ? `${work_dir}/${project_name}` : `${config.workDir[0]}/${project_name}`;
        
        const WORK = path.resolve(WORK_ROOT, 'work');
        const __WORK__ = path.resolve(WORK_ROOT, '__work__');

        this.workPool = [WORK, __WORK__];
        this.workDir = this.getWorkDir();
    }

}

module.exports = API;