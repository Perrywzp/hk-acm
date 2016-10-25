/**
 * [desc]
 * @author wangzhipei
 * @date 2016/10/25/0025.
 */
//params是输入行的数组参数,main方法为默认方法
function main(params){
    /*code here*/
    var str = params.join('');
    console.log(`${str}, Hello!`);
}

//以下为控制台输入
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

var params = [];
rl.on('line', function(line) {
    params.push(line);
    rl.close();
});
rl.on('close', function() {
    //调用main方法
    main(params);
    process.exit(0);
});