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

    // wrong idea
    //for (var divisor = 1; divisor < dividend / 2; divisor++) {
    //    var result = dividend / divisor;
    //    Number.isInteger(result) && arr.push(divisor);
    //}
    //arr = excludeRepeat(dividend, arr);

    // good idea ,with no bug
    for (var num = 1;(num * num) <= dividend; num++) {
        if (dividend % num === 0) {
            arr.push(num);
        }
    }
    return arr.length;
}

// bad
function excludeRepeat(dividend, arr) {
    arr.filter((x, i)=> {
        for (var j = 0; j < arr.length; j++) {
            if (i !== j && x * arr[j] === parseInt(dividend)) {
                arr.splice(i, 1);
            }
        }
    });
    console.log(arr);
    return arr;
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