const DeployTask = require('../index');

// project_name
// git_path
// build_script: 'npm run build' // 打包命令
// start_script: 'npm start'  // 启动命令





const deploy = new DeployTask({
    project_name: 'free-duty-admin',
    git_path: 'ssh://git@git-repositories.zuzuche.com:10023/dfs/free-duty-admin.git',
    build_script: 'npm run build'
})

deploy.start();