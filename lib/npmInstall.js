const getPath = require('./getPath');
const path = require('path')
const fs = require('fs')
const child_process = require('child_process');
const chalk = require('chalk')
const log = console.log
const _ = require('lodash')


function getOldJson(work_path) {
  const old_file_path = path.resolve(work_path, '..', 'package.json')
  if(fs.existsSync(old_file_path)) {
    return JSON.parse(fs.readFileSync(old_file_path));
  }
  return {}
}

function getNewPkgJson(work_path) {
  const file_path = path.resolve(work_path, 'package.json')
  if(fs.existsSync(file_path)) {
    return JSON.parse(fs.readFileSync(file_path))
  }
  return {}
}

function install(work_path, callback) {
  child_process.exec('npm install', {
    cwd: work_path
  }, function(error, stdout, stderr) {
    if(error) {
      process.exit(1)
    } 
    log(chalk.green('npm模块安装完成，准备开始打包'))
    callback(0)
  })

}


module.exports = function(projectName, callback) {
  const work_path = path.resolve(getPath('WORK_PATH'), projectName, projectName);

  const oldJson = getOldJson(work_path);
  const oldDependencies = oldJson.dependencies;

  const newJson = getNewPkgJson(work_path);
  const newDependencies = newJson.dependencies;

  if(!oldDependencies) {
    // 不存在旧的package.json
    log(chalk.blue('正在安装依赖...'))
    install(work_path, callback)
  } else {
    // 对比新旧pkg json
    const isEqual = _.isEqual(oldDependencies, newDependencies);

    if(!isEqual) {
      // 重新install依赖
      log(chalk.blue('重新安装依赖...'))
      install(work_path, callback)
    } else {
      log(chalk.green('成功应用缓存依赖'))
      process.exit(0)
    }
  }
}