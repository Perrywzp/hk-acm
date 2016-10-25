/**
 * [desc]
 * @author wangzhipei
 * @date 2016/10/25/0025.
 */
//线条会交叉吗？

//params是输入行的数组参数,main方法为默认方法
function main(params) {
    /*code here*/
    var typeNumArr = params[0];

    typeNumArr = typeNumArr.split(" ");
    if (typeNumArr.length === 1 && (!typeNumArr[0] || typeNumArr[0] == 0)) {
        console.log(true)
    } else {
        console.log(Boolean(isLineCross(typeNumArr)));
    }
}
/**
 * 判断线条是否交叉
 */
function isLineCross(typeNumArr) {

    var points = [];
    points.push({x: 0, y: 0});

    // 输入0个数时，必交叉
    if (typeNumArr.length === 0) return true;

    // 小于3个数时，不交叉
    if (typeNumArr.length < 4) return false;

    for (var i = 1; i < typeNumArr.length + 1; i++) {
        var p;
        // 向上
        if (i % 4 === 1) {
            p = {x: points[i - 1].x, y: points[i - 1].y + parseInt(typeNumArr[i - 1])}
        }
        // 向左
        if (i % 4 === 2) {
            p = {x: points[i - 1].x - parseInt(typeNumArr[i - 1]), y: points[i - 1].y}
        }
        // 向下
        if (i % 4 === 3) {
            p = {x: points[i - 1].x, y: points[i - 1].y - parseInt(typeNumArr[i - 1])}
        }
        // 向右
        if (i % 4 === 0) {
            console.log(points[i - 1].x, typeNumArr[i - 1]);
            p = {x: points[i - 1].x + parseInt(typeNumArr[i - 1]), y: points[i - 1].y}
        }

        points.push(p);
    }
    console.log(points);
    var flag = false;
    for (var j = 4; j < points.length; j++) {
        if (segmentsIntr(points[j - 4], points[j - 3], points[j - 1], points[j])) {
            flag = true;
            break;
        }
    }
    return flag;

}

function segmentsIntr(a, b, c, d) {

    // 两点相重时说明相交了
    if (a.x === d.x && a.y === d.y) return true;

    // 三角形abc 面积的2倍
    var area_abc = (a.x - c.x) * (b.y - c.y) - (a.y - c.y) * (b.x - c.x);

    // 三角形abd 面积的2倍
    var area_abd = (a.x - d.x) * (b.y - d.y) - (a.y - d.y) * (b.x - d.x);

    // 面积符号相同则两点在线段同侧,不相交 (对点在线段上的情况,在开始便处理了);
    if (area_abc * area_abd >= 0) {
        return false;
    }

    // 三角形cda 面积的2倍
    var area_cda = (c.x - a.x) * (d.y - a.y) - (c.y - a.y) * (d.x - a.x);
    // 三角形cdb 面积的2倍
    // 注意: 这里有一个小优化.不需要再用公式计算面积,而是通过已知的三个面积加减得出.
    var area_cdb = area_cda + area_abc - area_abd;
    if (area_cda * area_cdb >= 0) {
        return false;
    }

    //计算交点坐标
    var t = area_cda / ( area_abd - area_abc );
    var dx = t * (b.x - a.x),
        dy = t * (b.y - a.y);
    return {x: a.x + dx, y: a.y + dy};

}

//以下为控制台输入
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var params = [];
rl.on('line', function (line) {
    params.push(line);
    rl.close();
});
rl.on('close', function () {
    //调用main方法
    main(params);
    process.exit(0);
});