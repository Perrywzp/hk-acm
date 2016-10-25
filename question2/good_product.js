/**
 * [desc]
 * @author wangzhipei
 * @date 2016/10/25/0025.
 */
//params是输入行的数组参数,main方法为默认方法
function main(params) {
    /*code here*/
    var dividend = params[0];
    console.log(calculate(dividend));
}

function calculate(dividend) {
    var arr = [];
    // good idea ,with no bug
    for (var num = 1;(num * num) <= dividend; num++) {
        if (dividend % num === 0) {
            arr.push(num);
        }
    }
    return arr.length;
}

//以下为控制台输入
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var params = [];

rl.setPrompt("请输入任意数字，计算其有多少个乘积组合！");

rl.on('line', function (line) {
    params.push(line);
    // 如此才能触发close方法
    rl.close();
});
rl.on('close', function () {
    //调用main方法
    main(params);
    process.exit(0);
});