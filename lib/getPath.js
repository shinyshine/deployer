const path = require('path')
const fs = require('fs')
const chalk = require('chalk');
const { config } = require('process');
const log = console.log

// 惰性函数创建或获取项目根目录
function getDefaultHome() {
  let DEPLOY_HOME;

  if (process.env.DEPLOY_HOME) {
    DEPLOY_HOME = process.env.DEPLOY_HOME;
  } else if (process.env.HOME && !process.env.HOMEPATH) {
    DEPLOY_HOME = path.resolve(process.env.HOME, '.deploy');
  } else if (process.env.HOME || process.env.HOMEPATH) {
    DEPLOY_HOME = path.resolve(process.env.HOMEDRIVE, process.env.HOME || process.env.HOMEPATH, '.deploy');
  } else {
    console.error('[Deploy][Initialization] Environment variable HOME (Linux) or HOMEPATH (Windows) are not set!');
    console.error('[Deploy][Initialization] Defaulting to /etc/.deploy');
    DEPLOY_HOME = path.resolve('/etc', '.deploy');
  }
  if(!fs.existsSync(DEPLOY_HOME)) {
    log(chalk.blue(`正在创建${DEPLOY_HOME}`))
    fs.mkdirSync(DEPLOY_HOME)

  }

  return DEPLOY_HOME;
}

// 获取配置文件目录
function getConfigDir() {
  const DEPLOY_HOME = getDefaultHome();
  let configDir = path.resolve(DEPLOY_HOME, 'config');

  if(!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir);
  }
  return configDir
}

module.exports = function(path_key) {
  const DEPLOY_HOME = getDefaultHome();
  
  const paths = {
    DEPLOY_HOME:       DEPLOY_HOME,
    PROJECT_CONFIG:    path.resolve(DEPLOY_HOME, 'config'),
    DEPLOY_CONFIG:     path.resolve(DEPLOY_HOME, 'config.json'),
    // WORK_PATH: '/usr/local/data/deploy'
  }
  return path_key ? paths[path_key] : paths;
}

module.exports.getHomePath = getDefaultHome;
module.exports.getDefaultHome = getDefaultHome;
module.exports.getConfigDir = getConfigDir;
module.exports.getConfig = function() {

}




