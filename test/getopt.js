const child_process = require('child_process')


const testSh = child_process.spawn(
  'sh',
  ['./getopt.sh', '-b', '--name', 'name1', '--path', 'path1']
)

testSh.stdout.on('data', function(data) {
  console.log('ondata', data.toString())
})

testSh.stderr.on('data', function(err) {
  console.log('onerror', err.toString())
})

testSh.on('close', function() {
  console.log('进程完成退出')
})

