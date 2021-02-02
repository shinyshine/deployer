// console.log('module ====', module)
// console.log('exports====', exports)
// console.log('require====', require)

exports.getFactor = function() {
    console.log('getFactor')
}
// console.log(exports)
// console.log(module.exports)

console.log(exports === module.exports)

module.exports = function getFactor222() {
    console.log('factor')
}

console.log(exports === module.exports)
// console.log(module.exports)
// console.log(exports)