const ProjectConfig = require('../lib/ProjectConfig');

const config = new ProjectConfig({
    from_docker: '',
    project_name: 'free-duty-admin',
    git_path: 'ssh://git@git-repositories.zuzuche.com:10023/dfs/free-duty-admin.git',
    build_script: 'npm run build'
});

console.log(config)

// config.setName('free-admin')

// config.setGitPath('ssh:nnnnnnnn.git');

// config.setBuildScript('npm run build')

