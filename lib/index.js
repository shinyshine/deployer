const child_process = require('child_process');
const path = require('path')
const npmInstall = require('./npmInstall')
const getPath = require('./getPath');
const chalk = require('chalk');
const log = console.log;


module.exports = function() {
  const gitReg = /([^\/.]*)\.git/g
  const gitPath = 'ssh://git@git-repositories.zuzuche.com:10023/dfs/free-duty-admin.git';
  const gitName = gitPath.match(gitReg)[0].split('.')[0]

  // 确定代码的检出目录
  // 两个工作目录 worker & __worker__
  // getWorkerDir 返回空的那一个工作目录
  // 

  const gitPull = child_process.spawn(
    'sh', 
    [
      path.resolve('./shell/git-pull.sh'),
      '-n', gitName,
      '-p', gitPath
    ], 
    {
      cwd: path.resolve('/usr/local/data/deploy', gitName)
    }
  )
  
  gitPull.stdout.on('data', function(data) {
    log(data.toString())
  })
  gitPull.stderr.on('data', function(data) {
    log(chalk.blue(data.toString()))
  })
  
  gitPull.on('close', function(gitStatus) {
    console.log('子进程退出code', gitStatus)
    if(gitStatus === 0) {
      // const work_path = path.resolve(getPath('WORK_PATH'), gitName);

      // // 对比前后的package.json，确定是否更新依赖
      // npmInstall(gitName, function(exitCode) {
      //   // npm run build 
      //   if(exitCode === 0) {
      //     child_process.exec('npm run build', {
      //       cwd: work_path
      //     }, function(error, stdout, stderr) {
      //       if(error) {
      //         log(chalk.red('npm run build出现错误❌'));
      //         return
      //       }
      //       log(chalk.green('打包成功，即将部署到以下主机列表'))
      //     })
          
      //   }
      // })

  
  
  
    } 
  })

}