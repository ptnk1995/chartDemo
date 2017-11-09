"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function convertToFixed(inputnum) {
    var mynum = inputnum.toPrecision(16); //adds zeros for demonstration purposes 
    var mynumstr = mynum.toString();
    var final = parseFloat(mynumstr);
    return final;
}

Array.prototype.uniqueMerge = function (a) {
    for (var nonDuplicates = [], i = 0, l = a.length; i < l; ++i) {
        if (this.indexOf(a[i]) === -1) {
            nonDuplicates.push(a[i]);
        }
    }
    return this.concat(nonDuplicates);
};


var ArrayValue = function(){
    function ArrayValue(arr) {
        _classCallCheck(this, ArrayValue);
        this.arr = arr;
        return this;
    }

     _createClass(ArrayValue, [{
        key: "sumSingleIteration",
        value: function sumSingleIteration(arrayValue1){
            if(arrayValue1){
                return this.arr.map((currentValue, index) => currentValue + arrayValue1.arr[index]);
            }else{
                return this.arr;
            }
        }
    }]);
     return ArrayValue;
}();

var PieChart = function () {
    function PieChart(options) {
        _classCallCheck(this, PieChart);

        this.options = options;
        this.colors = options.colors;
        this.points = options.points;
        this.nameCategory = options.nameCategory;
    }

    _createClass(PieChart, [{
        key: "draw",
        value: function draw() {
            var slice_angles = this.slice_angles();
            // console.log(slice_angles);
            // console.log(this.points[this.nameCategory[0]]);
            var d = new Date();
            var n = d.getTime();
            var canv = new Canvas('can' + n, this.w_canvas, this.h_canvas, this.top_canvas, this.left_canvas);
            var ctx = canv.genCanvas();

            var color_index = 0;
            for (var i = 0; i < this.nameCategory.length; i++) {
                var x1 = this.points[this.nameCategory[i]][0][0];
                var y1 = this.points[this.nameCategory[i]][0][1];
                var x2 = this.points[this.nameCategory[i]][1][0];
                var y2 = this.points[this.nameCategory[i]][1][1];
                var x_cp = x2 - x1;
                var y_cp = y2 - y1;
                var point1 = new Point(x1, y1);
                var point2 = new Point(x2, y2);
                var arc = new Arc(point1);
                arc.draw(ctx);
                arc = new Arc(point2);
                arc.draw(ctx);
                var radius = point1.distance(point2);

                var start_angle = 180 / Math.PI * Math.acos(x_cp / Math.sqrt(Math.pow(x_cp, 2) + Math.pow(y_cp, 2)));
                if (y2 <= y1) {
                    start_angle *= -1;
                }
                start_angle = start_angle / 180 * Math.PI;
                color_index = i;

                this.drawPieSlice(ctx, point1, radius, start_angle, start_angle + slice_angles[i], this.colors[color_index % this.colors.length]);
            }
        }
    }, {
        key: "drawPieSlice",
        value: function drawPieSlice(ctx, center, radius, startAngle, endAngle, color) {
            ctx.strokeStyle = "red";
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(center.x, center.y);
            ctx.arc(center.x, center.y, radius, startAngle, endAngle);
            ctx.lineWidth = 2;
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }
    }, {
        key: "slice_angles",
        value: function slice_angles() {
            var total_value = 0;
            var color_index = 0;
            for (var categ in this.options.data) {
                var val = this.options.data[categ];
                total_value += val;
            }
            var slice_angles = [];
            for (categ in this.options.data) {
                val = this.options.data[categ];
                var slice_angle = 2 * Math.PI * val / total_value;
                slice_angles.push(slice_angle);
            }

            return slice_angles;
        }
    }]);

    return PieChart;
}();

var AreaChart = function () {
    function AreaChart(options) {
        _classCallCheck(this, AreaChart);

        this.options = options;
        this.data = options["data"];
        this.gridConfig = options["gridLine"];
        this.title = options["title"];
        this.axes = options["axes"];
        this.axisTitle = options["axisTitle"];
        this.seriesOption = options["seriesOption"];
        this.frame = options["frame"];
        this.chart = options.frame[1];
    }

    _createClass(AreaChart, [{
        key: "draw",
        value: function draw() {
            var ctx = this.genCanvas();
                
            if(this.options.type == "AreaChartTemplate3"){             
                let areaChartTemplate3 = new AreaChartTemplate3(this);
                areaChartTemplate3.draw(ctx);
            }else if(this.options.type == "AreaChartTemplate2"){
                let areaChartTemplate2 = new AreaChartTemplate2(this);
                areaChartTemplate2.draw(ctx);
            }else{
                let areaChartTemplate1 = new AreaChartTemplate1(this);
                areaChartTemplate1.draw(ctx);
            }          
        }
    }, {
        key: "genCanvas",
        value: function genCanvas() {
            var d = new Date();
            var n = d.getTime();
            var canv = new Canvas('can' + n, this.frame[0]["w"], this.frame[0]["h"], this.frame[0]["top"], this.frame[0]["left"]);
            var ctx = canv.genCanvas();
            return ctx;
        }
    }]);

    return AreaChart;
}();

var AreaChartTemplate1 = function () {
    function AreaChartTemplate1(chart) {
        _classCallCheck(this, AreaChartTemplate1);

        this.options = chart.options;
        this.data = this.options["data"];
        this.gridConfig = this.options["gridLine"];
        this.title = this.options["title"];
        this.axes = this.options["axes"];
        this.axisTitle = this.options["axisTitle"];
        this.seriesOption = this.options["seriesOption"];
        this.frame = this.options["frame"];
        this.chart = this.options.frame[1];
        return this;
    }

    _createClass(AreaChartTemplate1, [{
        key: "draw",
        value: function draw(ctx) {                
            this.drawGrid(ctx);
            this.drawAreaTemplate1(ctx);
            this.seriesName(ctx);
        }
    }, {
        key: "minX",
        value: function minX() {
            return this.chart.x;
        }
    }, {
        key: "minY",
        value: function minY() {
            return this.chart.y;
        }
    }, {
        key: "maxValAxis",
        value: function maxValAxis() {
            var right = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var maxData = this.maxData(right);
            var step = this.calculatorStep(maxData);
            var maxRecent = this.maxRecent(maxData, step);

            if ((maxData - (maxRecent - step)) / step > 0.75) {
                maxRecent = maxRecent + step;
            }
            return maxRecent;
        }
    }, {
        key: "maxRecent",
        value: function maxRecent(maxData, step) {
            return Math.ceil(maxData / step) * step;
        }
    }, {
        key: "drawLine",
        value: function drawLine(dataLines, ctx) {
            for (var k = 0; k < dataLines.length; k++) {
                dataLines[k].draw(ctx);
            }
        }
    }, {
        key: "drawText",
        value: function drawText(dataTexts, ctx) {
            for (var i = 0; i < dataTexts.length; i++) {
                dataTexts[i].draw(ctx);
            }
        }
    }, {
        key: "drawGrid",
        value: function drawGrid(ctx) {
            var minX = this.minX();
            var minY = this.minY();
            var maxX = minX + this.chart.w;
            var maxY = minY + this.chart.h;
            

            var dataGrids = [];
            var dataTexts = [];
            var stepHeightLeft = this.stepHeight();
            var stepHeightRight = this.stepHeight(true);
            var maxValAxisLeft = this.maxValAxis();
            var stepLeft = this.step();
            var maxValAxisRight = this.maxValAxis(true);
            var stepRight = this.step(true);
            var i = 0;
            var y = minY;

            var primaryMajorHorizontal = this.gridConfig.primaryMajorHorizontal;
            var primaryMinorHorizontal = this.gridConfig.primaryMinorHorizontal;
            var primaryMinorVertical = this.gridConfig.primaryMinorVertical;
            var primaryMajorVertical = this.gridConfig.primaryMajorVertical;

            for (var j = 0; j <= maxValAxisLeft; j += stepLeft) {
                var text = maxValAxisLeft - stepLeft * i;

                var point = new Point(minX - 16, y);
                GenerateText(dataTexts, "text" + y, text, point, "Helvetica", 12, "black", "end");
                i++;
                y+= stepHeightLeft;
            }

            y = minY;
            if (primaryMajorHorizontal && !primaryMinorHorizontal) {
                for (var _j = 0; _j <= maxValAxisLeft; _j += stepLeft) {
                    var point1 = new Point(minX, y);
                    var point2 = new Point(maxX, y);

                    GenerateLine(dataGrids, point1, point2, "#d9d9d9", 1);

                    y += stepHeightLeft;
                }
            } else if (primaryMajorHorizontal && primaryMinorHorizontal) {

                for (var _j2 = 0; _j2 <= maxValAxisLeft; _j2 += stepLeft) {
                    if (_j2 != maxValAxisLeft) {
                        for (var m = 0; m < 5; m++) {
                            var _point = new Point(minX, y + stepHeightLeft / 5 * m);
                            var _point2 = new Point(maxX, y + stepHeightLeft / 5 * m);
                            var colorLine = void 0;
                            if (m == 0) {
                                colorLine = "#d9d9d9";
                            } else {
                                colorLine = "#f2f2f2";
                            }
                            GenerateLine(dataGrids, _point, _point2, colorLine, 1);
                        }
                    } else {
                        var _point3 = new Point(minX, y);
                        var _point4 = new Point(maxX, y);
                        var _colorLine = "#d9d9d9";
                        GenerateLine(dataGrids, _point3, _point4, _colorLine, 1);
                    }
                    y += stepHeightLeft;
                }
            } else if (!primaryMajorHorizontal && primaryMinorHorizontal) {
                for (var _j3 = 0; _j3 <= maxValAxisLeft; _j3 += stepLeft) {
                    if (_j3 != maxValAxisLeft) {
                        for (var _m = 0; _m < 5; _m++) {
                            var _point5 = new Point(minX, y + stepHeightLeft / 5 * _m);
                            var _point6 = new Point(maxX, y + stepHeightLeft / 5 * _m);
                            GenerateLine(dataGrids, _point5, _point6, "#f2f2f2", 1);
                        }
                    } else {
                        var _point7 = new Point(minX, y);
                        var _point8 = new Point(maxX, y);
                        var _colorLine2 = "#d9d9d9";
                        GenerateLine(dataGrids, _point7, _point8, _colorLine2, 1);
                    }
                    y += stepHeightLeft;
                }
            }

            y = minY;
            i = 0;
            for (var _j4 = 0; _j4 <= maxValAxisRight; _j4 += stepRight) {
                var _text = maxValAxisRight - stepRight * i;

                var _point9 = new Point(maxX + 17, y);
                GenerateText(dataTexts, "text" + y, _text, _point9, "Helvetica", 12, "black", "left");
                i++;
                y += stepHeightRight;
            }
            this.drawText(dataTexts, ctx);
            this.drawLine(dataGrids, ctx);

            // 
            var numCategory = this.numCategory();

            let avgWidth;
            
            if(this.options.dataTable.display){
              avgWidth = this.avgWidth();
            }else{
              avgWidth = this.chart.w / (this.numCategory() - 1);
            }

            if (primaryMajorVertical && !primaryMinorVertical) {
                for (var _i2 = 0; _i2 <= numCategory; _i2++) {
                    var x = avgWidth * _i2 + this.chart.x;
                    var y1 = minY;
                    var y2 = minY + this.frame[1].h;
                    var _point19 = new Point(x, y1);
                    var _point20 = new Point(x, y2);
                    var line = new Line(_point19, _point20, "#d9d9d9");
                    line.draw(ctx);
                }
            } else if (!primaryMajorVertical && primaryMinorVertical) {
                for (var _i3 = 0; _i3 <= numCategory; _i3++) {
                    var _x33 = avgWidth * _i3 + this.chart.x;
                    var _y = minY;
                    var _y2 = minY + this.frame[1].h;
                    for (var _j9 = 0; _j9 < 2; _j9++) {
                        var _point21 = new Point(_x33 + avgWidth / 2 * _j9, _y);
                        var _point22 = new Point(_x33 + avgWidth / 2 * _j9, _y2);
                        var _line = new Line(_point21, _point22, "#f2f2f2");
                        _line.draw(ctx);
                    }
                }
            } else if (primaryMajorVertical && primaryMinorVertical) {
                for (var _i4 = 0; _i4 <= numCategory; _i4++) {
                    var _x34 = avgWidth * _i4 + this.chart.x;
                    var _y3 = minY;
                    var _y4 = minY + this.frame[1].h;
                    for (var _j10 = 0; _j10 < 2; _j10++) {
                        var _point23 = new Point(_x34 + avgWidth / 2 * _j10, _y3);
                        var _point24 = new Point(_x34 + avgWidth / 2 * _j10, _y4);
                        if (_j10 == 0) {
                            var _line2 = new Line(_point23, _point24, "#d9d9d9");
                            _line2.draw(ctx);
                        } else {
                            var _line3 = new Line(_point23, _point24, "#f2f2f2");
                            _line3.draw(ctx);
                        }
                    }
                }
            }
        }
    }, {
        key: "numCategory",
        value: function numCategory() {
            return this.options.data.length;
        }
    }, {
        key: "numSeri",
        value: function numSeri() {
            return this.options.seriesOption.length;
        }
    }, {
        key: "avgWidth",
        value: function avgWidth() {
            return this.chart.w / this.numCategory();
        }
    }, {
        key: "drawPoint",
        value: function drawPoint(ctx, points, color) {
          ctx.beginPath();
          ctx.fillStyle = color;
          ctx.moveTo(points[0][0], points[0][1]);
          for (var i = 1; i < points.length; i++) {
            ctx.lineTo(points[i][0], points[i][1], color);
          }
          ctx.lineTo(points[points.length - 1][0], this.chart.h + this.chart.y);
          ctx.lineTo(points[0][0], this.chart.h + this.chart.y);
          ctx.lineTo(points[0][0], points[0][1]);
          ctx.fill();
        }
    }, {
        key: "drawAreaTemplate1",
        value: function drawAreaTemplate1(ctx) {
            let arrOptionAxis = this.arrOptionAxis();
            let seriAcording = (arrOptionAxis[0]).concat(arrOptionAxis[1]);
            let xAcordingCategory = this.xAcordingCategory();
                
            for(let m=0; m < this.options.seriesOption.length; m++){
                let point = [];
                let areaPoints = [];
                let isSecondary = false;
                let index = seriAcording[m];
                let val = this.getDataAcordingIndexSeri(index);
                for(let i=0; i < this.data.length; i++){
                    point = [];
                    point.push(xAcordingCategory[i]);
                    if(this.seriesOption[index].seriOption == 2){
                        isSecondary = true;
                    }
                    point.push(this.cacl_y(val[i], isSecondary));
                    areaPoints.push(point);
                }

                this.drawPoint(ctx, areaPoints, this.seriesOption[index].color);
                ctx.textBaseline="bottom"; 
                ctx.textAlign="center"; 
                ctx.font = "14px Arial";
                ctx.fillStyle = "black";
                if(m==0){
                    for(let j=0; j < val.length; j++){
                        ctx.fillText(this.options.data[j].date, xAcordingCategory[j], this.cacl_y(0, true) + 20);
                    }
                }
            }
            
            ctx.save();
            ctx.fillStyle = "black";
            ctx.textBaseline="middle"; 
            ctx.textAlign="center"; 
            ctx.font = "14px Arial";
          
            for(let j=0; j < this.options.seriesOption.length; j++){
                if(!this.seriesOption[j].dataLable) break;
                for(let i=0; i < this.data.length; i++){
                    let index = seriAcording[j];
                    let val = this.getDataAcordingIndexSeri(j);
                    let isSecondary = false;
                    if(this.seriesOption[j].seriOption == 2){
                        isSecondary= true;
                    }
                    ctx.fillText(val[i],xAcordingCategory[i],this.cacl_y(val[i]/2 , isSecondary));          
                }
            }
        }

        /* Seri thu nao co option Primary Axis, Secondary Axis */

    }, {
        key: "pointsTemplate2",
        value: function pointsTemplate2() {
            var points = [];
            var numCategory = this.numCategory();
            var numSeri = this.numSeri();
            var minX = this.minX();
            var avgWidth = this.avgWidth();
            var margin = 0;
            var sumCategory = [];
            for (var i = 0; i < numCategory; i++) {
                var sumEverCategory = 0;
                for (var j = 0; j < numSeri; j++) {
                    sumEverCategory += this.data[i][j];
                }
                sumCategory.push(sumEverCategory);
            }
            // console.log(sumCategory);
            for (var _i11 = 0; _i11 < numCategory; _i11++) {
                margin = avgWidth / 2 + _i11 * avgWidth;
                for (var _j14 = 0; _j14 < numSeri; _j14++) {
                    var pointsOfSeri = [];
                    var x = void 0,
                        y = void 0;
                    x = minX + margin;
                    var val = 0;
                    for (var m = _j14; m < numSeri; m++) {
                        val += this.options.data[_i11]["series"][m].value;
                    }
                    var y_val = this.chart.location_chart.y + (1 - val / sumCategory[_i11]) * this.chart.h_chart;

                    pointsOfSeri.push(x, y_val);
                    points.push(pointsOfSeri);
                }
            }
            return points;
        }
    },{
        key: "xAcordingCategory",
        value: function xAcordingCategory(){
          var xAcordingCategory = [];
          var numCategory = this.numCategory();
          var numSeri = this.numSeri();
          var minX = this.minX();

          // let secondAxis = this.chart.secondAxis;
          var margin = 0;
          
          let x;
          for (var i = 0; i < numCategory; i++) {
            if(!this.options.dataTable.display){
              let avgWidth = this.chart.w / (this.numCategory() - 1);
              margin = i * avgWidth;
              x = minX + margin;
            }else{
              let avgWidth = this.avgWidth();
              margin = avgWidth / 2 + i * avgWidth;
              x = minX + margin;
            }
            xAcordingCategory.push(x);
          }
          return xAcordingCategory;
        }
    }, {
        key: "arrOptionAxis",
        value: function arrOptionAxis() {
            var seriOption = [];
            var indexOfPrimaryAxis = [];
            var indexOfSecondAxis = [];
            for (var i = 0; i < this.seriesOption.length; i++) {
                if (this.seriesOption[i]["seriOption"] == 2) {
                    indexOfSecondAxis.push(i);
                } else {
                    indexOfPrimaryAxis.push(i);
                }
            }
            seriOption.push(indexOfPrimaryAxis);
            seriOption.push(indexOfSecondAxis);
            // console.log(seriOption);
            return seriOption;
        }
    }, {
        key: "seriesName",
        value: function seriesName(ctx) {
            let arrOptionAxis = this.arrOptionAxis();
            let seriAcording = (arrOptionAxis[0]).concat(arrOptionAxis[1]);

            for(let i = 0; i <  this.options.seriesOption.length; i++){
                let index = seriAcording[i];
                if(this.options.seriesOption[index].legend){
                    let point3 = new Point(this.options.seriesOption[index].legend.x, this.cacl_y(0, true) + 60);
                    let rect = new Rect(1, point3, 6, 6, this.options.seriesOption[index].color, true);
                    rect.draw(ctx);
                    ctx.textBaseline="middle";  
                    // let point4 = new Point(10, this.cacl_y(0, true) + 60 + 3 );
                    let point4 = new Point(this.options.seriesOption[index].legend.x + 10, 
                        this.options.seriesOption[index].legend.y + 6/2);
                    let text = new Text(1, this.options.seriesOption[index].name, point4, 
                        this.options.seriesOption[index].legend.fontsize, 16, "black");
                    text.draw(ctx);
                } 
            }
        }
    }, {
        key: "getDataAcordingIndexSeri",
        value: function getDataAcordingIndexSeri(index=0) {
            var dataSeri = [];
            for (var i = 0; i < this.options["data"].length; i++) {
                dataSeri.push(this.options["data"][i]["series"][index].value);
            }
            return dataSeri;
        }
    }, {
        key: "maxData",
        value: function maxData() {
            var right = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var indexOfAxis = [];
            var arrOptionAxis = this.arrOptionAxis();
            if (right) {
                indexOfAxis = arrOptionAxis[1];
            } else {
                indexOfAxis = arrOptionAxis[0];
            }
            var maxData = 0;
            for (var i = 0; i < indexOfAxis.length; i++) {
                var getDataSeri = this.getDataAcordingIndexSeri(indexOfAxis[i]);
                for (var j = 0; j < getDataSeri.length; j++) {
                    if (getDataSeri[j] > maxData) maxData = getDataSeri[j];
                }
            }
            return maxData;
        }
    }, {
        key: "step",
        value: function step() {
            var right = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var maxData = this.maxData(right);
            var step = this.calculatorStep(maxData);
            return step;
        }
    }, {
        key: "calculatorStep",
        value: function calculatorStep(sMax) {
            var m = 0;
            var a = [1.0, 2.0, 5.0, 10.0];
            var x = sMax / 9.52;
            var z = Math.floor(Math.log(x)/Math.log(10));
            for (var i = 0; i < a.length; i++) {
                a[i] = a[i] * Math.pow(10, z);
                if (x <= a[i]) {
                    m = a[i];
                    break;
                }
            }
            return m;
        }
    }, {
        key: "stepHeight",
        value: function stepHeight() {
            var right = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var heightChart = this.chart.h;
            var step = this.step(right);
            var maxValAxis = this.maxValAxis(right);

            var khoang = maxValAxis / step;
            var stepHeight = heightChart / khoang;
            return stepHeight;
        }
    }, {
        key: "cacl_y",
        value: function cacl_y(val) {
            var right = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var y_val = this.chart.h + this.chart.y - this.h_val(val, right);
            return y_val;
        }
    }, {
        key: "h_val",
        value: function h_val(val) {
            var right = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var step = this.step(right);
            var stepHeight = this.stepHeight(right);

            var h = Math.floor(val / step) * stepHeight + stepHeight / step * (val - Math.floor(val / step) * step);
            return h;
        }
    }, {
        key: "secondAxisOrderNum",
        value: function secondAxisOrderNum() {
            var arrOptionSecondAxis = this.arrOptionSecondAxis();
            var arr = [];
            for (var i = 0; i < arrOptionSecondAxis.length; i++) {
                if (arrOptionSecondAxis[i]) arr.push(i);
            }
            return arr;
        }
    }, {
        key: "primaryAxisOrderNum",
        value: function primaryAxisOrderNum() {
            var arrOptionSecondAxis = this.arrOptionSecondAxis();
            var arr = [];
            for (var i = 0; i < arrOptionSecondAxis.length; i++) {
                if (arrOptionSecondAxis[i] == false) arr.push(i);
            }
            return arr;
        }
    }]);

    return AreaChartTemplate1;
}();

var AreaChartTemplate2 = function () {
    function AreaChartTemplate2(chart) {
        _classCallCheck(this, AreaChartTemplate2);

        this.options = chart.options;
        this.data = this.options["data"];
        this.gridConfig = this.options["gridLine"];
        this.title = this.options["title"];
        this.axes = this.options["axes"];
        this.axisTitle = this.options["axisTitle"];
        this.seriesOption = this.options["seriesOption"];
        this.frame = this.options["frame"];
        this.chart = this.options.frame[1];
        return this;
    }

    _createClass(AreaChartTemplate2, [{
        key: "draw",
        value: function draw(ctx) {                
            this.drawGrid(ctx);
            this.seriesName(ctx);
            this.displayLabelPrimaryHorizontal(ctx);
            this.drawAreaTemplate(ctx);
            
            /*var a = xAcordingCategory;
            var b = yCalcAcordingTemplate[1][0];

            var c = a.map(function(e, i) {
              return [e, b[i]];
            });
            console.log(c);*/
        }
    }, {
        key: "yCalcAcordingTemplate",
        value: function yCalcAcordingTemplate(ctx) {
            /* Liet ke cac Seri co option PrimaryAxis */
            let index, arr, arrayValue ;
            let sum;
            let dataSeri = [];
            let valToDraw= [];
            let color;
            /* Co the toi uu, rut gon bot doan nay, gop PrimaryAxis va SecondaryAxis vao */
            for(let j=0; j < 2; j++){
                index= 0, arr=[], arrayValue =[];
                dataSeri = [];
                sum=[];
                for(let i =0; i < this.arrOptionAxis()[j].length; i++){
                    index = this.arrOptionAxis()[j][i];
                    arr = this.getDataAcordingIndexSeri(index);
                    if(i == 0){
                        sum = arr;
                    }else{
                        arrayValue = new ArrayValue(arr);
                        sum = new ArrayValue(sum);
                        sum = sum.sumSingleIteration(arrayValue);
                    }
                    dataSeri.push(sum);
                }

                valToDraw.push(dataSeri.reverse());
            }
            return valToDraw;
        }
    }, {
        key: "drawArea",
        value: function drawArea(ctx, color, points, points2) {
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.moveTo(points[0][0], points[0][1]);
            for (var i = 1; i < points.length; i++) {
                ctx.lineTo(points[i][0], points[i][1], color);
            }

            if(points2){
                ctx.lineTo(points[points.length - 1][0], points2[points2.length -1][1]);
                for (var j = points2.length-1; j >= 0; j--) {
                    ctx.lineTo(points2[j][0], points2[j][1], color);
                }
                ctx.lineTo(points2[0][0], points[0][1]);
            }else{
                ctx.lineTo(points[points.length - 1][0], this.chart.h + this.chart.y);
                ctx.lineTo(points[0][0], this.chart.h + this.chart.y);
                ctx.lineTo(points[0][0], points[0][1]);
            }
            // ctx.lineTo(points[0][0], this.chart.h + this.chart.y);
            // ctx.lineTo(points[0][0], points[0][1]);
            ctx.fill();
            ctx.closePath();
        }
    }, {
        key: "drawAreaTemplate",
        value: function drawAreaTemplate(ctx) {
            let xAcordingCategory = this.xAcordingCategory();
            let yCalcAcordingTemplate = this.yCalcAcordingTemplate(ctx);
           /* console.log(xAcordingCategory);
            console.log(yCalcAcordingTemplate);*/

            let arr = [];
            let points = [], points2 = [], arr1 = [], currentSeri, color;
            let isSecondary = false;
            for(let j = 0; j < 2; j++){
                if(j == 1){
                    isSecondary = true;
                }
                for(let i= 0; i < yCalcAcordingTemplate[j].length ; i++){
                    currentSeri = this.indexToDraw()[j][i];
                    color = this.seriesOption[currentSeri].color;
                    arr = yCalcAcordingTemplate[j][i];
                    arr = arr.map(x => this.cacl_y(x, isSecondary));
                    points = xAcordingCategory.map(function(e, i) {
                      return [e, arr[i]];
                    });
                    if(i == yCalcAcordingTemplate[j].length - 1){
                        this.drawArea(ctx, color, points);
                    }else{
                        arr1= yCalcAcordingTemplate[j][i+1];
                        arr1 = arr1.map(x => this.cacl_y(x, isSecondary));
                        points2 = xAcordingCategory.map(function(e, i) {
                          return [e, arr1[i]];
                        });
                        this.drawArea(ctx, color, points, points2);
                    }
                }
            }

        }

        /* Seri thu nao co option Primary Axis, Secondary Axis */

    }, {
        key: "displayLabelPrimaryHorizontal",
        value: function displayLabelPrimaryHorizontal(ctx){
            ctx.textBaseline="bottom"; 
            ctx.textAlign="center"; 
            ctx.font = "15px Arial";
            ctx.fillStyle = "black";
            let xAcordingCategory = this.xAcordingCategory();
            for(let j=0; j < 5; j++){
                ctx.fillText(this.options.data[j].date, xAcordingCategory[j], this.cacl_y(0, true) + 34);
            }
           /* var _point20 = new Point(0, this.cacl_y(0, true) + 34);
            var _point19 = new Point(300, this.cacl_y(0, true) + 34);
            var line = new Line(_point19, _point20, "#d9d9d9");
            line.draw(ctx);*/
        }
    }, {
        key: "minX",
        value: function minX() {
            return this.chart.x;
        }
    }, {
        key: "minY",
        value: function minY() {
            return this.chart.y;
        }
    }, {
        key: "maxValAxis",
        value: function maxValAxis() {
            var right = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var maxData = this.maxData(right);
            var step = this.calculatorStep(maxData);
            var maxRecent = this.maxRecent(maxData, step);

            if ((maxData - (maxRecent - step)) / step > 0.75) {
                maxRecent = maxRecent + step;
            }
            return maxRecent;
        }
    }, {
        key: "maxRecent",
        value: function maxRecent(maxData, step) {
            return Math.ceil(maxData / step) * step;
        }
    }, {
        key: "drawLine",
        value: function drawLine(dataLines, ctx) {
            for (var k = 0; k < dataLines.length; k++) {
                dataLines[k].draw(ctx);
            }
        }
    }, {
        key: "drawText",
        value: function drawText(dataTexts, ctx) {
            for (var i = 0; i < dataTexts.length; i++) {
                dataTexts[i].draw(ctx);
            }
        }
    }, {
        key: "drawGrid",
        value: function drawGrid(ctx) {
            var minX = this.minX();
            var minY = this.minY();
            var maxX = minX + this.chart.w;
            var maxY = minY + this.chart.h;
            

            var dataGrids = [];
            var dataTexts = [];
            
            var stepHeightLeft = this.stepHeight();
            var stepHeightRight = this.stepHeight(true);
            var maxValAxisLeft = this.maxValAxis();
            var stepLeft = this.step();
            var maxValAxisRight = this.maxValAxis(true);
            var stepRight = this.step(true);
            var i = 0;
            var y = minY;

            var primaryMajorHorizontal = this.gridConfig.primaryMajorHorizontal;
            var primaryMinorHorizontal = this.gridConfig.primaryMinorHorizontal;
            var primaryMinorVertical = this.gridConfig.primaryMinorVertical;
            var primaryMajorVertical = this.gridConfig.primaryMajorVertical;

            for (var j = 0; j <= maxValAxisLeft; j += stepLeft) {
                var text = maxValAxisLeft - stepLeft * i;

                var point = new Point(minX - 10, y);
                GenerateText(dataTexts, "text" + y, text, point, "Helvetica", 12, "black", "end");
                i++;
                y += stepHeightLeft;
            }

            y = minY;
            if (primaryMajorHorizontal && !primaryMinorHorizontal) {
                for (var _j = 0; _j <= maxValAxisLeft; _j += stepLeft) {
                    var point1 = new Point(minX, y);
                    var point2 = new Point(maxX, y);

                    GenerateLine(dataGrids, point1, point2, "#d9d9d9", 1);

                    y += stepHeightLeft;
                }
            } else if (primaryMajorHorizontal && primaryMinorHorizontal) {

                for (var _j2 = 0; _j2 <= maxValAxisLeft; _j2 += stepLeft) {
                    if (_j2 != maxValAxisLeft) {
                        for (var m = 0; m < 5; m++) {
                            var _point = new Point(minX, y + stepHeightLeft / 5 * m);
                            var _point2 = new Point(maxX, y + stepHeightLeft / 5 * m);
                            var colorLine = void 0;
                            if (m == 0) {
                                colorLine = "#d9d9d9";
                            } else {
                                colorLine = "#f2f2f2";
                            }
                            GenerateLine(dataGrids, _point, _point2, colorLine, 1);
                        }
                    } else {
                        var _point3 = new Point(minX, y);
                        var _point4 = new Point(maxX, y);
                        var _colorLine = "#d9d9d9";
                        GenerateLine(dataGrids, _point3, _point4, _colorLine, 1);
                    }
                    y += stepHeightLeft;
                }
            } else if (!primaryMajorHorizontal && primaryMinorHorizontal) {
                for (var _j3 = 0; _j3 <= maxValAxisLeft; _j3 += stepLeft) {
                    if (_j3 != maxValAxisLeft) {
                        for (var _m = 0; _m < 5; _m++) {
                            var _point5 = new Point(minX, y + stepHeightLeft / 5 * _m);
                            var _point6 = new Point(maxX, y + stepHeightLeft / 5 * _m);
                            GenerateLine(dataGrids, _point5, _point6, "#f2f2f2", 1);
                        }
                    } else {
                        var _point7 = new Point(minX, y);
                        var _point8 = new Point(maxX, y);
                        var _colorLine2 = "#d9d9d9";
                        GenerateLine(dataGrids, _point7, _point8, _colorLine2, 1);
                    }
                    y += stepHeightLeft;
                }
            }

            y = minY;
            i = 0;
            for (var _j4 = 0; _j4 <= maxValAxisRight; _j4 += stepRight) {
                var _text = maxValAxisRight - stepRight * i;

                var _point9 = new Point(maxX + 20, y);
                GenerateText(dataTexts, "text" + y, _text, _point9, "Helvetica", 12, "black", "end");
                i++;
                y += stepHeightRight;
            }
            this.drawText(dataTexts, ctx);
            this.drawLine(dataGrids, ctx);

            // 
            var numCategory = this.numCategory();

            let avgWidth;
            
            if(this.options.dataTable.display){
              avgWidth = this.avgWidth();
            }else{
              avgWidth = this.chart.w / (this.numCategory() - 1);
            }

            if (primaryMajorVertical && !primaryMinorVertical) {
                for (var _i2 = 0; _i2 <= numCategory; _i2++) {
                    var x = avgWidth * _i2 + this.chart.x;
                    var y1 = minY;
                    var y2 = minY + this.frame[1].h;
                    var _point19 = new Point(x, y1);
                    var _point20 = new Point(x, y2);
                    var line = new Line(_point19, _point20, "#d9d9d9");
                    line.draw(ctx);
                }
            } else if (!primaryMajorVertical && primaryMinorVertical) {
                for (var _i3 = 0; _i3 <= numCategory; _i3++) {
                    var _x33 = avgWidth * _i3 + this.chart.x;
                    var _y = minY;
                    var _y2 = minY + this.frame[1].h;
                    for (var _j9 = 0; _j9 < 2; _j9++) {
                        var _point21 = new Point(_x33 + avgWidth / 2 * _j9, _y);
                        var _point22 = new Point(_x33 + avgWidth / 2 * _j9, _y2);
                        var _line = new Line(_point21, _point22, "#f2f2f2");
                        _line.draw(ctx);
                    }
                }
            } else if (primaryMajorVertical && primaryMinorVertical) {
                for (var _i4 = 0; _i4 <= numCategory; _i4++) {
                    var _x34 = avgWidth * _i4 + this.chart.x;
                    var _y3 = minY;
                    var _y4 = minY + this.frame[1].h;
                    for (var _j10 = 0; _j10 < 2; _j10++) {
                        var _point23 = new Point(_x34 + avgWidth / 2 * _j10, _y3);
                        var _point24 = new Point(_x34 + avgWidth / 2 * _j10, _y4);
                        if (_j10 == 0) {
                            var _line2 = new Line(_point23, _point24, "#d9d9d9");
                            _line2.draw(ctx);
                        } else {
                            var _line3 = new Line(_point23, _point24, "#f2f2f2");
                            _line3.draw(ctx);
                        }
                    }
                }
            }
        }
    }, {
        key: "numCategory",
        value: function numCategory() {
            return this.options.data.length;
        }
    }, {
        key: "numSeri",
        value: function numSeri() {
            return this.options.seriesOption.length;
        }
    }, {
        key: "avgWidth",
        value: function avgWidth() {
            return this.chart.w / this.numCategory();
        }
    }, {
        key: "xAcordingCategory",
        value: function xAcordingCategory(){
          var xAcordingCategory = [];
          var numCategory = this.numCategory();
          var numSeri = this.numSeri();
          var minX = this.minX();

          // let secondAxis = this.chart.secondAxis;
          var margin = 0;
          
          let x;
          for (var i = 0; i < numCategory; i++) {
            if(!this.options.dataTable.display){
              let avgWidth = this.chart.w / (this.numCategory() - 1);
              margin = i * avgWidth;
              x = minX + margin;
            }else{
              let avgWidth = this.avgWidth();
              margin = avgWidth / 2 + i * avgWidth;
              x = minX + margin;
            }
            xAcordingCategory.push(x);
          }
          return xAcordingCategory;
        }
    }, {
        key: "arrOptionAxis",
        value: function arrOptionAxis() {
            var seriOption = [];
            var indexOfPrimaryAxis = [];
            var indexOfSecondAxis = [];
            for (var i = 0; i < this.seriesOption.length; i++) {
                if (this.seriesOption[i]["seriOption"] == 2) {
                    indexOfSecondAxis.push(i);
                } else {
                    indexOfPrimaryAxis.push(i);
                }
            }
            seriOption.push(indexOfPrimaryAxis);
            seriOption.push(indexOfSecondAxis);
            return seriOption;
        }
    }, {
        // Thu tu ve hinh cac series
        key: "indexToDraw",
        value: function indexToDraw(){
            let arrOptionAxis = this.arrOptionAxis();
            let arrIndexToDraw  = [];
            arrIndexToDraw.push(arrOptionAxis[0].reverse());
            arrIndexToDraw.push(arrOptionAxis[1].reverse());
            return arrIndexToDraw;
        }
    }, {
        // Thu tu thuc hien cac series de ve series name
        key: "indexSeriNumber",
        value: function indexSeriNumber(){
            let arrOptionAxis = this.arrOptionAxis();
            let seriAcording = (arrOptionAxis[0]).concat(arrOptionAxis[1]);
            return seriAcording;
        }
    },{
        key: "seriesName",
        value: function seriesName(ctx) {
            let seriAcording = this.indexSeriNumber();

            for(let i = 0; i <  this.options.seriesOption.length; i++){
                let index = seriAcording[i];
                if(this.options.seriesOption[index].legend){
                    let point3 = new Point(this.options.seriesOption[index].legend.x, this.cacl_y(0, true) + 60);
                    let rect = new Rect(1, point3, 6, 6, this.options.seriesOption[index].color, true);
                    rect.draw(ctx);
                    ctx.textBaseline="middle";  
                    // let point4 = new Point(10, this.cacl_y(0, true) + 60 + 3 );
                    let point4 = new Point(this.options.seriesOption[index].legend.x + 10, 
                        this.options.seriesOption[index].legend.y + 6/2);
                    let text = new Text(1, this.options.seriesOption[index].name, point4, 
                        this.options.seriesOption[index].legend.fontsize, 16, "black");
                    text.draw(ctx);
                } 
            }
        }
    }, {
        key: "getDataAcordingIndexSeri",
        value: function getDataAcordingIndexSeri(index=0) {
            var dataSeri = [];
            for (var i = 0; i < this.options["data"].length; i++) {
                dataSeri.push(this.options["data"][i]["series"][index].value);
            }
            return dataSeri;
        }
    }, {
        key: "maxData",
        value: function maxData() {

            var right = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var indexOfAxis = [];
            var arrOptionAxis = this.arrOptionAxis();
            if (right) {
                indexOfAxis = arrOptionAxis[1];
            } else {
                indexOfAxis = arrOptionAxis[0];
            }

            var numCategory = this.numCategory();
            var maxData = 0;

            var sumEverCategory = void 0;
            for (var i = 0; i < numCategory; i++) {
                sumEverCategory = 0;
                for (var j = 0; j < indexOfAxis.length; j++) {
                    sumEverCategory += this.options.data[i].series[indexOfAxis[j]].value;
                }
                if (maxData < sumEverCategory) maxData = sumEverCategory;
            }

            return maxData;
        }
    }, {
        key: "step",
        value: function step() {
            var right = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var maxData = this.maxData(right);
            var step = this.calculatorStep(maxData);
            return step;
        }
    }, {
        key: "calculatorStep",
        value: function calculatorStep(sMax) {
            var m = 0;
            var a = [1.0, 2.0, 5.0, 10.0];
            var x = sMax / 9.52;
            var z = Math.floor(Math.log(x)/Math.log(10));
            for (var i = 0; i < a.length; i++) {
                a[i] = a[i] * Math.pow(10, z);
                if (x <= a[i]) {
                    m = a[i];
                    break;
                }
            }
            return m;
        }
    }, {
        key: "stepHeight",
        value: function stepHeight() {
            var right = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var heightChart = this.chart.h;
            var step = this.step(right);
            var maxValAxis = this.maxValAxis(right);

            var khoang = maxValAxis / step;
            var stepHeight = heightChart / khoang;
            return stepHeight;
        }
    }, {
        key: "cacl_y",
        value: function cacl_y(val) {
            var right = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var y_val = this.chart.h + this.chart.y - this.h_val(val, right);
            return y_val;
        }
    }, {
        key: "h_val",
        value: function h_val(val) {
            var right = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var step = this.step(right);
            var stepHeight = this.stepHeight(right);

            var h = Math.floor(val / step) * stepHeight + stepHeight / step * (val - Math.floor(val / step) * step);
            return h;
        }
    }]);

    return AreaChartTemplate2;
}();

var AreaChartTemplate3 = function () {
    function AreaChartTemplate3(chart) {
        _classCallCheck(this, AreaChartTemplate3);

        this.options = chart.options;
        this.data = this.options["data"];
        this.gridConfig = this.options["gridLine"];
        this.title = this.options["title"];
        this.axes = this.options["axes"];
        this.axisTitle = this.options["axisTitle"];
        this.seriesOption = this.options["seriesOption"];
        this.frame = this.options["frame"];
        this.chart = this.options.frame[1];
        return this;
    }

    _createClass(AreaChartTemplate3, [{
        key: "draw",
        value: function draw(ctx) {                
            this.drawGrid(ctx);
            this.seriesName(ctx);
            this.displayLabelPrimaryHorizontal(ctx);
            this.drawAreaTemplate(ctx);
           
        }
    }, {
        key: "yCalcAcordingTemplate",
        value: function yCalcAcordingTemplate(ctx) {
            /* Liet ke cac Seri co option PrimaryAxis */
            let index, arr, arrayValue ;
            let sum;
            let dataSeri = [];
            let valToDraw= [];
            let color;
            /* Co the toi uu, rut gon bot doan nay, gop PrimaryAxis va SecondaryAxis vao */
            for(let j=0; j < 2; j++){
                index= 0, arr=[], arrayValue =[];
                dataSeri = [];
                sum=[];
                for(let i =0; i < this.arrOptionAxis()[j].length; i++){
                    index = this.arrOptionAxis()[j][i];
                    arr = this.getDataAcordingIndexSeri(index);
                    if(i == 0){
                        sum = arr;
                    }else{
                        arrayValue = new ArrayValue(arr);
                        sum = new ArrayValue(sum);
                        sum = sum.sumSingleIteration(arrayValue);
                    }
                    dataSeri.push(sum);
                }

                valToDraw.push(dataSeri.reverse());
            }

            return valToDraw;
        }
    }, {
        key: "drawArea",
        value: function drawArea(ctx, color, points, points2) {
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.moveTo(points[0][0], points[0][1]);
            for (var i = 1; i < points.length; i++) {
                ctx.lineTo(points[i][0], points[i][1], color);
            }

            if(points2){
                ctx.lineTo(points[points.length - 1][0], points2[points2.length -1][1]);
                for (var j = points2.length-1; j >= 0; j--) {
                    ctx.lineTo(points2[j][0], points2[j][1], color);
                }
                ctx.lineTo(points2[0][0], points[0][1]);
            }else{
                ctx.lineTo(points[points.length - 1][0], this.chart.h + this.chart.y);
                ctx.lineTo(points[0][0], this.chart.h + this.chart.y);
                ctx.lineTo(points[0][0], points[0][1]);
            }
            // ctx.lineTo(points[0][0], this.chart.h + this.chart.y);
            // ctx.lineTo(points[0][0], points[0][1]);
            ctx.fill();
            ctx.closePath();
        }
    }, {
        key: "drawAreaTemplate",
        value: function drawAreaTemplate(ctx) {
            let xAcordingCategory = this.xAcordingCategory();
            let yCalcAcordingTemplate = this.yCalcAcordingTemplate(ctx);
            console.log(xAcordingCategory);
            console.log(yCalcAcordingTemplate);
            
            let arr = [];
            let points = [], points2 = [], arr1 = [], currentSeri, color;
            let isSecondary = false;
            for(let j = 0; j < 2; j++){
                arr = [];
                points = [], points2 = [], arr1 = [];
                if(j == 1){
                    isSecondary = true;
                }
                for(let i= 0; i < yCalcAcordingTemplate[j].length ; i++){
                    currentSeri = this.indexToDraw()[j][i];
                    console.log(currentSeri);
                    color = this.seriesOption[currentSeri].color;
                    arr = yCalcAcordingTemplate[j][i];
                    // arr = arr.map(x => this.cacl_y(100* x/ yCalcAcordingTemplate[j][0][i], isSecondary));
                    arr = arr.map((x, index) => this.cacl_y(100* x/ yCalcAcordingTemplate[j][0][index], isSecondary));
                    // arr = arr.map((x, index) => 100* x/ yCalcAcordingTemplate[j][0][index], isSecondary);
                    points = xAcordingCategory.map(function(e, i) {
                      return [e, arr[i]];
                    });
                    if(i == yCalcAcordingTemplate[j].length - 1){
                        this.drawArea(ctx, color, points);
                    }else{
                        arr1= yCalcAcordingTemplate[j][i+1];
                        arr1 = arr1.map((x, index) => this.cacl_y(100* x/ yCalcAcordingTemplate[j][0][index], isSecondary));
                        // arr1 = arr1.map((x, index) =>  100* x/ yCalcAcordingTemplate[j][0][index], isSecondary);
                        points2 = xAcordingCategory.map(function(e, i) {
                          return [e, arr1[i]];
                        });
                        this.drawArea(ctx, color, points, points2);
                    }
                }
            }

        }

        /* Seri thu nao co option Primary Axis, Secondary Axis */

    }, {
        key: "displayLabelPrimaryHorizontal",
        value: function displayLabelPrimaryHorizontal(ctx){
            ctx.textBaseline="bottom"; 
            ctx.textAlign="center"; 
            ctx.font = "15px Arial";
            ctx.fillStyle = "black";
            let xAcordingCategory = this.xAcordingCategory();
            for(let j=0; j < 5; j++){
                ctx.fillText(this.options.data[j].date, xAcordingCategory[j], this.cacl_y(0, true) + 34);
            }
            var _point20 = new Point(0, this.cacl_y(0, true) + 34);
            var _point19 = new Point(300, this.cacl_y(0, true) + 34);
            var line = new Line(_point19, _point20, "#d9d9d9");
            line.draw(ctx);
        }
    }, {
        key: "minX",
        value: function minX() {
            return this.chart.x;
        }
    }, {
        key: "minY",
        value: function minY() {
            return this.chart.y;
        }
    }, {
        key: "maxValAxis",
        value: function maxValAxis() {
            var right = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var maxData = this.maxData(right);
            var step = this.calculatorStep(maxData);
            var maxRecent = this.maxRecent(maxData, step);

            if ((maxData - (maxRecent - step)) / step > 0.75) {
                maxRecent = maxRecent + step;
            }
            return maxRecent;
        }
    }, {
        key: "maxRecent",
        value: function maxRecent(maxData, step) {
            return Math.ceil(maxData / step) * step;
        }
    }, {
        key: "drawLine",
        value: function drawLine(dataLines, ctx) {
            for (var k = 0; k < dataLines.length; k++) {
                dataLines[k].draw(ctx);
            }
        }
    }, {
        key: "drawText",
        value: function drawText(dataTexts, ctx) {
            for (var i = 0; i < dataTexts.length; i++) {
                dataTexts[i].draw(ctx);
            }
        }
    }, {
        key: "drawGrid",
        value: function drawGrid(ctx) {

            var minX = this.minX();
            var minY = this.minY();
            var maxX = minX + this.chart.w;
            var maxY = minY + this.chart.h;
            

            var dataGrids = [];
            var dataTexts = [];
            
            var stepHeightLeft = this.stepHeight();
            var stepHeightRight = this.stepHeight(true);
            var maxValAxisLeft = 100;
            var stepLeft = 10;
            var maxValAxisRight = 100;
            var stepRight = 10;
            var i = 0;
            var y = minY;

            var primaryMajorHorizontal = this.gridConfig.primaryMajorHorizontal;
            var primaryMinorHorizontal = this.gridConfig.primaryMinorHorizontal;
            var primaryMinorVertical = this.gridConfig.primaryMinorVertical;
            var primaryMajorVertical = this.gridConfig.primaryMajorVertical;

            for (var j = 0; j <= maxValAxisLeft; j += stepLeft) {
                var text = maxValAxisLeft - stepLeft * i;

                var point = new Point(minX - 10, y);
                GenerateText(dataTexts, "text" + y, text, point, "Helvetica", 12, "black", "end");
                i++;
                y += stepHeightLeft;
            }

            y = minY;
            if (primaryMajorHorizontal && !primaryMinorHorizontal) {
                for (var _j = 0; _j <= maxValAxisLeft; _j += stepLeft) {
                    var point1 = new Point(minX, y);
                    var point2 = new Point(maxX, y);

                    GenerateLine(dataGrids, point1, point2, "#d9d9d9", 1);

                    y += stepHeightLeft;
                }
            } else if (primaryMajorHorizontal && primaryMinorHorizontal) {

                for (var _j2 = 0; _j2 <= maxValAxisLeft; _j2 += stepLeft) {
                    if (_j2 != maxValAxisLeft) {
                        for (var m = 0; m < 5; m++) {
                            var _point = new Point(minX, y + stepHeightLeft / 5 * m);
                            var _point2 = new Point(maxX, y + stepHeightLeft / 5 * m);
                            var colorLine = void 0;
                            if (m == 0) {
                                colorLine = "#d9d9d9";
                            } else {
                                colorLine = "#f2f2f2";
                            }
                            GenerateLine(dataGrids, _point, _point2, colorLine, 1);
                        }
                    } else {
                        var _point3 = new Point(minX, y);
                        var _point4 = new Point(maxX, y);
                        var _colorLine = "#d9d9d9";
                        GenerateLine(dataGrids, _point3, _point4, _colorLine, 1);
                    }
                    y += stepHeightLeft;
                }
            } else if (!primaryMajorHorizontal && primaryMinorHorizontal) {
                for (var _j3 = 0; _j3 <= maxValAxisLeft; _j3 += stepLeft) {
                    if (_j3 != maxValAxisLeft) {
                        for (var _m = 0; _m < 5; _m++) {
                            var _point5 = new Point(minX, y + stepHeightLeft / 5 * _m);
                            var _point6 = new Point(maxX, y + stepHeightLeft / 5 * _m);
                            GenerateLine(dataGrids, _point5, _point6, "#f2f2f2", 1);
                        }
                    } else {
                        var _point7 = new Point(minX, y);
                        var _point8 = new Point(maxX, y);
                        var _colorLine2 = "#d9d9d9";
                        GenerateLine(dataGrids, _point7, _point8, _colorLine2, 1);
                    }
                    y += stepHeightLeft;
                }
            }

            y = minY;
            i = 0;
            for (var _j4 = 0; _j4 <= maxValAxisRight; _j4 += stepRight) {
                var _text = maxValAxisRight - stepRight * i;

                var _point9 = new Point(maxX + 20, y);
                GenerateText(dataTexts, "text" + y, _text, _point9, "Helvetica", 12, "black", "left");
                i++;
                y += stepHeightRight;
            }
            this.drawTextPercent(dataTexts, ctx);
            this.drawLine(dataGrids, ctx);

            // 
            var numCategory = this.numCategory();

            let avgWidth;
            
            if(this.options.dataTable.display){
              avgWidth = this.avgWidth();
            }else{
              avgWidth = this.chart.w / (this.numCategory() - 1);
            }

            if (primaryMajorVertical && !primaryMinorVertical) {
                for (var _i2 = 0; _i2 <= numCategory; _i2++) {
                    var x = avgWidth * _i2 + this.chart.x;
                    var y1 = minY;
                    var y2 = minY + this.frame[1].h;
                    var _point19 = new Point(x, y1);
                    var _point20 = new Point(x, y2);
                    var line = new Line(_point19, _point20, "#d9d9d9");
                    line.draw(ctx);
                }
            } else if (!primaryMajorVertical && primaryMinorVertical) {
                for (var _i3 = 0; _i3 <= numCategory; _i3++) {
                    var _x33 = avgWidth * _i3 + this.chart.x;
                    var _y = minY;
                    var _y2 = minY + this.frame[1].h;
                    for (var _j9 = 0; _j9 < 2; _j9++) {
                        var _point21 = new Point(_x33 + avgWidth / 2 * _j9, _y);
                        var _point22 = new Point(_x33 + avgWidth / 2 * _j9, _y2);
                        var _line = new Line(_point21, _point22, "#f2f2f2");
                        _line.draw(ctx);
                    }
                }
            } else if (primaryMajorVertical && primaryMinorVertical) {
                for (var _i4 = 0; _i4 <= numCategory; _i4++) {
                    var _x34 = avgWidth * _i4 + this.chart.x;
                    var _y3 = minY;
                    var _y4 = minY + this.frame[1].h;
                    for (var _j10 = 0; _j10 < 2; _j10++) {
                        var _point23 = new Point(_x34 + avgWidth / 2 * _j10, _y3);
                        var _point24 = new Point(_x34 + avgWidth / 2 * _j10, _y4);
                        if (_j10 == 0) {
                            var _line2 = new Line(_point23, _point24, "#d9d9d9");
                            _line2.draw(ctx);
                        } else {
                            var _line3 = new Line(_point23, _point24, "#f2f2f2");
                            // --> Note: Xem lai cai nay`, du mot duong line Text Right Axis 
                            // _line3.draw(ctx); 
                        }
                    }
                }
            }
        }
    }, {
        key: "drawTextPercent",
        value: function drawTextPercent(dataTexts, ctx) {
            for (var i = 0; i < dataTexts.length; i++) {
                dataTexts[i].draw(ctx, true);
            }
        }
    }, {
        key: "numCategory",
        value: function numCategory() {
            return this.options.data.length;
        }
    }, {
        key: "numSeri",
        value: function numSeri() {
            return this.options.seriesOption.length;
        }
    }, {
        key: "avgWidth",
        value: function avgWidth() {
            return this.chart.w / this.numCategory();
        }
    }, {
        key: "xAcordingCategory",
        value: function xAcordingCategory(){
          var xAcordingCategory = [];
          var numCategory = this.numCategory();
          var numSeri = this.numSeri();
          var minX = this.minX();

          // let secondAxis = this.chart.secondAxis;
          var margin = 0;
          
          let x;
          for (var i = 0; i < numCategory; i++) {
            if(!this.options.dataTable.display){
              let avgWidth = this.chart.w / (this.numCategory() - 1);
              margin = i * avgWidth;
              x = minX + margin;
            }else{
              let avgWidth = this.avgWidth();
              margin = avgWidth / 2 + i * avgWidth;
              x = minX + margin;
            }
            xAcordingCategory.push(x);
          }
          return xAcordingCategory;
        }
    }, {
        key: "arrOptionAxis",
        value: function arrOptionAxis() {
            var seriOption = [];
            var indexOfPrimaryAxis = [];
            var indexOfSecondAxis = [];
            for (var i = 0; i < this.seriesOption.length; i++) {
                if (this.seriesOption[i]["seriOption"] == 2) {
                    indexOfSecondAxis.push(i);
                } else {
                    indexOfPrimaryAxis.push(i);
                }
            }
            seriOption.push(indexOfPrimaryAxis);
            seriOption.push(indexOfSecondAxis);
            return seriOption;
        }
    }, {
        // Thu tu ve hinh cac series
        key: "indexToDraw",
        value: function indexToDraw(){
            let arrOptionAxis = this.arrOptionAxis();
            let arrIndexToDraw  = [];
            arrIndexToDraw.push(arrOptionAxis[0].reverse());
            arrIndexToDraw.push(arrOptionAxis[1].reverse());
            return arrIndexToDraw;
        }
    }, {
        // Thu tu thuc hien cac series de ve series name
        key: "indexSeriNumber",
        value: function indexSeriNumber(){
            let arrOptionAxis = this.arrOptionAxis();
            let seriAcording = (arrOptionAxis[0]).concat(arrOptionAxis[1]);
            return seriAcording;
        }
    },{
        key: "seriesName",
        value: function seriesName(ctx) {
            let seriAcording = this.indexSeriNumber();

            for(let i = 0; i <  this.options.seriesOption.length; i++){
                let index = seriAcording[i];
                if(this.options.seriesOption[index].legend){
                    let point3 = new Point(this.options.seriesOption[index].legend.x, this.cacl_y(0, true) + 60);
                    let rect = new Rect(1, point3, 6, 6, this.options.seriesOption[index].color, true);
                    rect.draw(ctx);
                    ctx.textBaseline="middle";  
                    // let point4 = new Point(10, this.cacl_y(0, true) + 60 + 3 );
                    let point4 = new Point(this.options.seriesOption[index].legend.x + 10, 
                        this.options.seriesOption[index].legend.y + 6/2);
                    let text = new Text(1, this.options.seriesOption[index].name, point4, 
                        this.options.seriesOption[index].legend.fontsize, 16, "black");
                    text.draw(ctx);
                } 
            }
        }
    }, {
        key: "getDataAcordingIndexSeri",
        value: function getDataAcordingIndexSeri(index=0) {
            var dataSeri = [];
            for (var i = 0; i < this.options["data"].length; i++) {
                dataSeri.push(this.options["data"][i]["series"][index].value);
            }
            return dataSeri;
        }
    }, {
        key: "maxData",
        value: function maxData() {

            var right = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var indexOfAxis = [];
            var arrOptionAxis = this.arrOptionAxis();
            if (right) {
                indexOfAxis = arrOptionAxis[1];
            } else {
                indexOfAxis = arrOptionAxis[0];
            }

            var numCategory = this.numCategory();
            var maxData = 0;

            var sumEverCategory = void 0;
            for (var i = 0; i < numCategory; i++) {
                sumEverCategory = 0;
                for (var j = 0; j < indexOfAxis.length; j++) {
                    sumEverCategory += this.options.data[i].series[indexOfAxis[j]].value;
                }
                if (maxData < sumEverCategory) maxData = sumEverCategory;
            }

            return maxData;
        }
    }, {
        key: "step",
        value: function step() {
            var right = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var maxData = this.maxData(right);
            var step = this.calculatorStep(maxData);
            return step;
        }
    }, {
        key: "calculatorStep",
        value: function calculatorStep(sMax) {
            var m = 0;
            var a = [1.0, 2.0, 5.0, 10.0];
            var x = sMax / 9.52;
            var z = Math.floor(Math.log(x)/Math.log(10));
            for (var i = 0; i < a.length; i++) {
                a[i] = a[i] * Math.pow(10, z);
                if (x <= a[i]) {
                    m = a[i];
                    break;
                }
            }
            return m;
        }
    }, {
        key: "stepHeight",
        value: function stepHeight() {
            var right = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var heightChart = this.chart.h;
            var step = 10;
            var maxValAxis = 100;

            var khoang = maxValAxis / step;
            var stepHeight = heightChart / khoang;
            return stepHeight;
        }
    }, {
        key: "cacl_y",
        value: function cacl_y(val) {
            var right = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var y_val = this.chart.h + this.chart.y - this.h_val(val, right);
            return y_val;
        }
    }, {
        key: "h_val",
        value: function h_val(val) {
            var right = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var step = 10;
            var stepHeight = this.stepHeight(right);

            var h = Math.floor(val / step) * stepHeight + stepHeight / step * (val - Math.floor(val / step) * step);
            return h;
        }
    }]);

    return AreaChartTemplate3;
}();

var Point = function () {
    function Point(x, y, color) {
        _classCallCheck(this, Point);

        this.x = x;
        this.y = y;
        this.color = color || "black";
        return this;
    }

    _createClass(Point, [{
        key: "distance",
        value: function distance(point1) {
            return Math.sqrt(Math.pow(this.x - point1.x, 2) + Math.pow(this.y - point1.y, 2));
        }
    }]);

    return Point;
}();

var Line = function () {
    function Line(point1, point2, color, lineWidth) {
        _classCallCheck(this, Line);

        this.point1 = point1;
        this.point2 = point2;
        this.color = color || "black";
        this.lineWidth = lineWidth || 1;
        return this;
    }

    _createClass(Line, [{
        key: "draw",
        value: function draw(ctx) {
            ctx.beginPath();
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.lineWidth;
            ctx.moveTo(this.point1.x, this.point1.y);
            ctx.lineTo(this.point2.x, this.point2.y);
            ctx.stroke();
        }
    }]);

    return Line;
}();

var Arc = function () {
    function Arc(center, radius, startAngle, endAngle, color, fill) {
        _classCallCheck(this, Arc);

        this.center = center;
        this.radius = radius || 3;
        this.startAngle = startAngle || 0;
        this.endAngle = endAngle || 2 * Math.PI;
        this.color = color || this.center.color || "black";
        this.fill = fill || true;
        return this;
    }

    _createClass(Arc, [{
        key: "draw",
        value: function draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.center.x, this.center.y, this.radius, this.startAngle, this.endAngle);
            if (this.fill) {
                ctx.fillStyle = this.color;
                ctx.fill();
            } else {
                ctx.strokeStyle = this.color;
                ctx.stroke();
            }
        }
    }]);

    return Arc;
}();

var Rect = function () {
    function Rect(id, point, w, h, color, fill) {
        _classCallCheck(this, Rect);

        this.id = id;
        this.point = point;
        this.w = w;
        this.h = h;
        this.color = color;
        this.fill = fill;
        return this;
    }

    _createClass(Rect, [{
        key: "draw",
        value: function draw(ctx) {
            ctx.beginPath();
            if (this.fill) {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.point.x, this.point.y, this.w, this.h);
                ctx.stroke();
            } else {
                ctx.strokeStyle = this.color;
                ctx.strokeRect(this.point.x, this.point.y, this.w, this.h);
            }
            ctx.closePath();
        }
    }]);

    return Rect;
}();

var Text = function () {
    function Text(id, text, point, font, size, color, textAlign) {
        _classCallCheck(this, Text);

        this.id = id;
        this.point = point;
        this.text = text;
        this.font = font;
        this.size = size;
        this.color = color;
        this.textAlign = textAlign || "start";
        return this;
    }

    _createClass(Text, [{
        key: "draw",
        value: function draw(ctx) {
            var isPercent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var textAlign = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "start";

            ctx.beginPath();
            ctx.textAlign = this.textAlign;
            ctx.fillStyle = this.color;
            ctx.font = this.size + "px " + this.font;
            if (isPercent) {
                var text = this.text + "%";
            } else {
                var text = this.text;
            }
            ctx.fillText(text, this.point.x, this.point.y);
            ctx.closePath();
        }
    }]);

    return Text;
}();

var Canvas = function () {
    function Canvas(id) {
        var w_canvas = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 800;
        var h_canvas = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 600;
        var top_canvas = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        var left_canvas = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

        _classCallCheck(this, Canvas);

        this.id = id;
        this.w_canvas = w_canvas;
        this.h_canvas = h_canvas;
        this.top_canvas = top_canvas;
        this.left_canvas = left_canvas;
    }

    _createClass(Canvas, [{
        key: "genCanvas",
        value: function genCanvas() {
            var canv = document.createElement("canvas");
            var ctx = canv.getContext("2d");
            canv.id = this.id;
            canv.width = this.w_canvas;
            canv.height = this.h_canvas;
            canv.style.position = "absolute";
            canv.style.top = this.top_canvas + "px";
            canv.style.left = this.left_canvas + "%";
            canv.style.border = '1px solid #000';
            document.body.appendChild(canv);
            return ctx;
        }
    }]);

    return Canvas;
}();

var Axes = function Axes() {
    var primaryHorizontal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var primaryVertical = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, Axes);

    this.primaryHorizontal = primanyHorizontal;
    this.primaryVertical = primaryVertical;
};

var GridLine = function GridLine() {
    var primaryMajorHorizontal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var primaryMajorVertical = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var primaryMinorHorizontal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var primaryMinorVertical = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    _classCallCheck(this, GridLine);

    this.primaryMajorHorizontal = primaryMajorHorizontal;
    this.primaryMajorVertical = primaryMajorVertical;
    this.primaryMinorVertical = primaryMinorVertical;
    this.primaryMinorHorizontal = primaryMinorHorizontal;
};

var DataLable = function DataLable() {
    var center = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var insideEnd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var insideBase = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var outsideEnd = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var dataCallout = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    _classCallCheck(this, DataLable);

    this.center = center;
    this.insideBase = insideBase;
    this.insideEnd = insideEnd;
    this.outsideEnd = outsideEnd;
    this.dataCallout = dataCallout;
};

var DataTable = function () {
    function DataTable(horizontal, vertical, outline, showLegendKey, tableKey) {
        _classCallCheck(this, DataTable);

        this.horizontal = horizontal;
        this.vertical = vertical;
        this.outline = outline;
        this.showLegendKey = showLegendKey;
        this.tableKey = tableKey;
    }

    _createClass(DataTable, [{
        key: "DataTable",
        value: function DataTable() {
            vertical = true;
            horizontal = true;
            outline = true;
            showLegendKey = true;
            tableKey = true;
        }
    }]);

    return DataTable;
}();

var SeriOption = function SeriOption() {
    var primaryAxis = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var secondaryAxis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var gapWidth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var serisOverlap = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

    _classCallCheck(this, SeriOption);

    this.primaryAxis = primaryAxis;
    this.secondaryAxis = secondaryAxis;
    this.gapWidth = gapWidth;
    this.serisOverlap = serisOverlap;
};

var Seri = function () {
    function Seri(value, name, w, h, seriOverlap, gapWidth, gapWidthChangeOverlap, point, dataLable, isCheckLeft, isCheckRight, isSecondary) {
        _classCallCheck(this, Seri);

        this.value = value;
        this.name = name;
        this.w = w;
        this.h = h;
        this.serisOverlap = serisOverlap;
        this.gapWidth = gapWidth;
        this.gapWidthChangeOverlap = gapWidthChangeOverlap;
        this.point = point;
        this.dataLable = dataLable;
        this.isCheckLeft = isCheckLeft;
        this.isCheckRight = isCheckRight;
        this.isSecondary = isSecondary;
    }

    _createClass(Seri, [{
        key: "Seri",
        value: function Seri() {
            DataLable = new DataLable();
            isCheckLeft = true;
            isSecondary = false;
        }
    }]);

    return Seri;
}();

var Chart = function () {
    function Chart(w_canvas, h_canvas, top_canvas, left_canvas, location_chart, w_chart, h_chart, gridOption, color, 
        category_name, typeChart, data, seriOption) {
        var displayDataTable = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : false;
        var location_legend = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : {};
        var w_legend = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : 0;
        var h_legend = arguments.length > 16 && arguments[16] !== undefined ? arguments[16] : 0;
        var dataTable = arguments.length > 17 && arguments[17] !== undefined ? arguments[17] : new DataTable();

        _classCallCheck(this, Chart);

        this.w_canvas = w_canvas;
        this.h_canvas = h_canvas;
        this.top_canvas = top_canvas;
        this.left_canvas = left_canvas;
        this.location_chart = location_chart;
        this.w_chart = w_chart;
        this.h_chart = h_chart;
        this.gridOption = gridOption;
        this.color = color;
        this.category_name = category_name;
        this.location_legend = location_legend;
        this.w_legend = w_legend;
        this.h_legend = h_legend;
        this.displayDataTable = displayDataTable;
        this.typeChart = typeChart;
        this.data = data;
        this.seriOption = seriOption;
        this.gapWidth = seriOption["gapWidth"];
        this.type_horizontal = dataTable.horizontal;
        this.type_outline = dataTable.outline;
        this.type_vertical = dataTable.vertical;
        this.secondAxis = seriOption["secondaryAxis"];
        return this;
    }

    // constructor(options){
    //     this.w_canvas = options.w_canvas;
    //     this.h_canvas = options.h_canvas;
    //     this.top_canvas = options.top_canvas;
    //     this.left_canvas = options.left_canvas;
    //     this.location_chart = options.location_chart;
    //     this.w_chart = options.w_chart;
    //     this.h_chart = options.h_chart;
    //     this.gridOption = options.gridOption;
    //     this.color = options.color;
    //     this.category_name = options.category_name;
    //     this.location_legend = options.location_legend;
    //     this.w_legend = options.w_legend;
    //     this.h_legend = options.h_legend;
    //     this.displayDataTable = options.displayDataTable;
    //     this.typeChart = options.typeChart;
    //     this.data = options.data;
    //     this.gapWidth = options.gapWidth;
    //     this.type_horizontal = options.dataTable.horizontal;
    //     this.type_outline = options.dataTable.outline;
    //     this.type_vertical = options.dataTable.vertical;
    //     this.secondAxis = options.secondAxis;
    //     return (this);
    // }

    _createClass(Chart, [{
        key: "draw",
        value: function draw() {
            //id 
            var d = new Date();
            var n = d.getTime();
            var canv = new Canvas('can' + n, this.w_canvas, this.h_canvas, this.top_canvas, this.left_canvas);
            var ctx = canv.genCanvas();
            if (this.typeChart == "columnChartTemplate1") {
                var barChart = new BarChart(this);
                barChart.draw(ctx);
            } else if (this.typeChart == "lineChart_Template1") {
                var lineChart = new LineChart(this, true);
                lineChart.draw(ctx);
                // lineChart.lines();
            } else if (this.typeChart == "lineChart_Template2") {
                var _lineChart = new LineChart(this, false);
                _lineChart.draw(ctx);
            } else if (this.typeChart == "lineChart_Template4") {
                var _lineChart2 = new LineChart(this, false);
                _lineChart2.draw(ctx);
            } else if (this.typeChart == "lineChart_Template5") {
                var _lineChart3 = new PercentChart(this, 10, true);
                _lineChart3.draw(ctx);
            } else if (this.typeChart == "lineChart_Template3") {
                var _lineChart4 = new PercentChart(this, 20, false);
                _lineChart4.draw(ctx);
            } else if (this.typeChart == "PieChart") {
                var pieChart = new PieChart(this);
                pieChart.draw(ctx);
            }
        }
    }, {
        key: "avgWidth",
        value: function avgWidth() {
            return this.w_chart / this.numCategory();
        }
    }, {
        key: "minX",
        value: function minX() {
            return this.location_chart.x;
        }
    }, {
        key: "minY",
        value: function minY() {
            return this.location_chart.y;
        }
    }, {
        key: "drawGrid",
        value: function drawGrid(ctx) {
            var minX = this.minX();
            var minY = this.minY();
            var maxX = minX + this.w_chart;
            var maxY = minY + this.h_chart;
            var stepHeightLeft = this.stepHeight();
            var stepHeightRight = this.stepHeight(true);

            var dataGrids = [];
            var dataTexts = [];
            var maxValAxisLeft = this.maxValAxis();
            var stepLeft = this.step();
            var maxValAxisRight = this.maxValAxis(this.typeChart, true);
            var stepRight = this.step(true);
            var i = 0;
            var y = minY;

            var primaryMajorHorizontal = this.gridOption.primaryMajorHorizontal;
            var primaryMinorHorizontal = this.gridOption.primaryMinorHorizontal;
            var primaryMinorVertical = this.gridOption.primaryMinorVertical;
            var primaryMajorVertical = this.gridOption.primaryMajorVertical;

            for (var j = 0; j <= maxValAxisLeft; j += stepLeft) {
                var text = maxValAxisLeft - stepLeft * i;

                var point = new Point(minX - 10, y);
                GenerateText(dataTexts, "text" + y, text, point, "Helvetica", 12, "black", "end");
                i++;
                y += stepHeightLeft;
            }

            y = minY;
            if (primaryMajorHorizontal && !primaryMinorHorizontal) {

                for (var _j5 = 0; _j5 <= maxValAxisLeft; _j5 += stepLeft) {
                    var point1 = new Point(minX, y);
                    var point2 = new Point(maxX, y);

                    GenerateLine(dataGrids, point1, point2, "#d9d9d9", 1);

                    y += stepHeightLeft;
                }
            } else if (primaryMajorHorizontal && primaryMinorHorizontal) {

                for (var _j6 = 0; _j6 <= maxValAxisLeft; _j6 += stepLeft) {
                    if (_j6 != maxValAxisLeft) {
                        for (var m = 0; m < 5; m++) {
                            var _point10 = new Point(minX, y + stepHeightLeft / 5 * m);
                            var _point11 = new Point(maxX, y + stepHeightLeft / 5 * m);
                            var colorLine = void 0;
                            if (m == 0) {
                                colorLine = "#d9d9d9";
                            } else {
                                colorLine = "#f2f2f2";
                            }
                            GenerateLine(dataGrids, _point10, _point11, colorLine, 1);
                        }
                    } else {
                        var _point12 = new Point(minX, y);
                        var _point13 = new Point(maxX, y);
                        var _colorLine3 = "#d9d9d9";
                        GenerateLine(dataGrids, _point12, _point13, _colorLine3, 1);
                    }
                    y += stepHeightLeft;
                }
            } else if (!primaryMajorHorizontal && primaryMinorHorizontal) {
                for (var _j7 = 0; _j7 <= maxValAxisLeft; _j7 += stepLeft) {
                    if (_j7 != maxValAxisLeft) {
                        for (var _m2 = 0; _m2 < 5; _m2++) {
                            var _point14 = new Point(minX, y + stepHeightLeft / 5 * _m2);
                            var _point15 = new Point(maxX, y + stepHeightLeft / 5 * _m2);
                            GenerateLine(dataGrids, _point14, _point15, "#f2f2f2", 1);
                        }
                    } else {
                        var _point16 = new Point(minX, y);
                        var _point17 = new Point(maxX, y);
                        var _colorLine4 = "#d9d9d9";
                        GenerateLine(dataGrids, _point16, _point17, _colorLine4, 1);
                    }
                    y += stepHeightLeft;
                }
            }

            y = minY;
            i = 0;
            for (var _j8 = 0; _j8 <= maxValAxisRight; _j8 += stepRight) {
                var _text2 = maxValAxisRight - stepRight * i;

                var _point18 = new Point(maxX + 10, y);
                GenerateText(dataTexts, "text" + y, _text2, _point18, "Helvetica", 12, "black", "end");
                i++;
                y += stepHeightRight;
            }

            this.drawText(dataTexts, ctx);
            this.drawLine(dataGrids, ctx);

            var numCategory = this.numCategory();

            if (primaryMajorVertical && !primaryMinorVertical) {
                for (var _i2 = 0; _i2 <= numCategory; _i2++) {
                    var x = this.avgWidth() * _i2 + this.location_chart.x;
                    var y1 = minY;
                    var y2 = minY + this.h_chart;
                    var _point19 = new Point(x, y1);
                    var _point20 = new Point(x, y2);
                    var line = new Line(_point19, _point20, "#d9d9d9");
                    line.draw(ctx);
                }
            } else if (!primaryMajorVertical && primaryMinorVertical) {
                for (var _i3 = 0; _i3 <= numCategory; _i3++) {
                    var _x33 = this.avgWidth() * _i3 + this.location_chart.x;
                    var _y = minY;
                    var _y2 = minY + this.h_chart;
                    for (var _j9 = 0; _j9 < 2; _j9++) {
                        var _point21 = new Point(_x33 + this.avgWidth() / 2 * _j9, _y);
                        var _point22 = new Point(_x33 + this.avgWidth() / 2 * _j9, _y2);
                        var _line = new Line(_point21, _point22, "#f2f2f2");
                        _line.draw(ctx);
                    }
                }
            } else if (primaryMajorVertical && primaryMinorVertical) {
                for (var _i4 = 0; _i4 <= numCategory; _i4++) {
                    var _x34 = this.avgWidth() * _i4 + this.location_chart.x;
                    var _y3 = minY;
                    var _y4 = minY + this.h_chart;
                    for (var _j10 = 0; _j10 < 2; _j10++) {
                        var _point23 = new Point(_x34 + this.avgWidth() / 2 * _j10, _y3);
                        var _point24 = new Point(_x34 + this.avgWidth() / 2 * _j10, _y4);
                        if (_j10 == 0) {
                            var _line2 = new Line(_point23, _point24, "#d9d9d9");
                            _line2.draw(ctx);
                        } else {
                            var _line3 = new Line(_point23, _point24, "#f2f2f2");
                            _line3.draw(ctx);
                        }
                    }
                }
            }
        }
    }, {
        key: "arrOptionSecondAxis",
        value: function arrOptionSecondAxis() {
            return this.seriOption["secondaryAxis"];
        }
    }, {
        key: "secondAxisOrderNum",
        value: function secondAxisOrderNum() {
            var arrOptionSecondAxis = this.arrOptionSecondAxis();
            var arr = [];
            for (var i = 0; i < arrOptionSecondAxis.length; i++) {
                if (arrOptionSecondAxis[i]) arr.push(i);
            }
            return arr;
        }
    }, {
        key: "primaryAxisOrderNum",
        value: function primaryAxisOrderNum() {
            var arrOptionSecondAxis = this.arrOptionSecondAxis();
            var arr = [];
            for (var i = 0; i < arrOptionSecondAxis.length; i++) {
                if (arrOptionSecondAxis[i] == false) arr.push(i);
            }
            return arr;
        }
    }, {
        key: "dataPrimaryAxis",
        value: function dataPrimaryAxis() {
            // bi lap nhieu ne
            var data = this.data;
            var numSeri = this.numSeri();
            var numCategory = this.numCategory();
            var needPrimaryAxis = this.primaryAxisOrderNum();
            var needValue = [];
            for (var i = 0; i < numCategory; i++) {
                var valNeedEverCat = [];
                for (var j = 0; j < needPrimaryAxis.length; j++) {
                    valNeedEverCat.push(data[i][needPrimaryAxis[j]]);
                }
                needValue.push(valNeedEverCat);
            }

            var dataPrimaryAxis = [];
            for (var _i5 = 0; _i5 < numCategory; _i5++) {
                dataPrimaryAxis.push(needValue[_i5]);
            }
            return dataPrimaryAxis;
        }
    }, {
        key: "dataSecondAxis",
        value: function dataSecondAxis() {
            var data = this.data;
            var numSeri = this.numSeri();
            var numCategory = this.numCategory();
            var needSecondAxis = this.secondAxisOrderNum();
            var needValue = [];
            for (var i = 0; i < numCategory; i++) {
                var valNeedEverCat = [];
                for (var j = 0; j < needSecondAxis.length; j++) {
                    valNeedEverCat.push(data[i][needSecondAxis[j]]);
                }
                needValue.push(valNeedEverCat);
            }

            var dataSecondAxis = [];
            for (var _i6 = 0; _i6 < numCategory; _i6++) {
                dataSecondAxis.push(needValue[_i6]);
            }
            return dataSecondAxis;
        }
    }, {
        key: "stepHeight",
        value: function stepHeight() {
            var right = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var heightChart = this.h_chart;
            var step = this.step(right);
            var maxValAxis = this.maxValAxis(this.typeChart, right);

            var khoang = maxValAxis / step;
            var stepHeight = heightChart / khoang;
            return stepHeight;
        }
    }, {
        key: "numSeri",
        value: function numSeri() {
            return this.data[0].length;
        }
    }, {
        key: "numCategory",
        value: function numCategory() {
            return this.data.length;
        }
    }, {
        key: "maxDataTemplate2",
        value: function maxDataTemplate2() {
            var data = this.data;
            var numSeri = this.numSeri();
            var numCategory = this.numCategory();
            var maxVal = 0;
            var sumEverCategory = void 0;
            for (var i = 0; i < numCategory; i++) {
                sumEverCategory = 0;
                for (var j = 0; j < numSeri; j++) {
                    sumEverCategory += data[i][j];
                }
                if (maxVal < sumEverCategory) maxVal = sumEverCategory;
            }
            return maxVal;
        }
    }, {
        key: "maxDataLeftTemplate1",
        value: function maxDataLeftTemplate1() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.dataPrimaryAxis();
            var axisOrderNum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.primaryAxisOrderNum();

            var numSeri = this.numSeri();
            var numCategory = this.numCategory();
            var maxVal = 0;

            for (var i = 0; i < numCategory; i++) {
                for (var j = 0; j < axisOrderNum.length; j++) {
                    if (maxVal < data[i][j]) maxVal = data[i][j];
                }
            }
            return maxVal;
        }
    }, {
        key: "maxData",
        value: function maxData() {
            var right = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (this.typeChart == "lineChart_Template4" || this.typeChart == "lineChart_Template1" || this.typeChart == "columnChartTemplate1") {
                if (right) {
                    var maxData = this.maxDataLeftTemplate1(this.dataSecondAxis(), this.secondAxisOrderNum());
                } else {
                    var maxData = this.maxDataLeftTemplate1();
                }
            } else {
                if (right) {
                    var maxData = this.maxDataTemplate2(this.dataSecondAxis(), this.secondAxisOrderNum());
                } else {
                    var maxData = this.maxDataTemplate2();
                }
            }
            return maxData;
        }
    }, {
        key: "maxValAxis",
        value: function maxValAxis(typeChart) {
            var right = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var maxData = this.maxData(right);
            var step = this.calculatorStep(maxData);
            var maxRecent = this.maxRecent(maxData, step);

            if ((maxData - (maxRecent - step)) / step > 0.75) {
                maxRecent = maxRecent + step;
            }
            return maxRecent;
        }
    }, {
        key: "maxRecent",
        value: function maxRecent(maxData, step) {
            return Math.ceil(maxData / step) * step;
        }
    }, {
        key: "step",
        value: function step() {
            var right = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var maxData = this.maxData(right);
            var step = this.calculatorStep(maxData);
            return step;
        }
    }, {
        key: "calculatorStep",
        value: function calculatorStep(sMax) {
            var m = 0;
            var a = [1.0, 2.0, 5.0, 10.0];
            var x = sMax / 9.52;
            var z = Math.floor(Math.log(x,10));
            for (var i = 0; i < a.length; i++) {
                a[i] = a[i] * Math.pow(10, z);
                if (x <= a[i]) {
                    m = a[i];
                    break;
                }
            }
            return m;
        }
    }, {
        key: "drawLine",
        value: function drawLine(dataLines, ctx) {
            for (var k = 0; k < dataLines.length; k++) {
                dataLines[k].draw(ctx);
            }
        }
    }, {
        key: "drawText",
        value: function drawText(dataTexts, ctx) {
            for (var i = 0; i < dataTexts.length; i++) {
                dataTexts[i].draw(ctx);
            }
        }
    }, {
        key: "drawTextPercent",
        value: function drawTextPercent(dataTexts, ctx) {
            for (var i = 0; i < dataTexts.length; i++) {
                dataTexts[i].draw(ctx, true);
            }
        }
    }, {
        key: "cacl_y",
        value: function cacl_y(val) {
            var right = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var y_val = this.h_chart + this.location_chart.y - this.h_val(val, right);
            return y_val;
        }
    }, {
        key: "h_val",
        value: function h_val(val) {
            var right = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var step = this.step(right);
            var stepHeight = this.stepHeight(right);

            var h = Math.floor(val / step) * stepHeight + stepHeight / step * (val - Math.floor(val / step) * step);
            return h;
        }
    }, {
        key: "drawLegend",
        value: function drawLegend(ctx) {
            var location_legend = new Point(16, 225);
            var w_legend = this.w_legend;
            var h_legend = this.h_legend;
            var color = "green";
            var fill = false;

            var numCategory = this.numCategory();

            if (this.displayDataTable) {
                this.fillDataTable(ctx);
                this.gridLegend(ctx, this.type_horizontal, this.type_vertical, this.type_outline);
            }
        }
    }, {
        key: "heightSizeLegend",
        value: function heightSizeLegend() {
            var h_legend = 74;
            return h_legend / (this.numSeri() + 1);
        }
    }, {
        key: "gridLegend",
        value: function gridLegend(ctx, type_horizontal, type_vertical, type_outline) {
            var location_legend = this.location_legend;
            var w_legend = this.w_legend;
            var h_legend = this.h_legend;

            var h_size_legend = this.heightSizeLegend();
            var color = "blue";
            var fill = false;

            if (type_outline) {
                var x = location_legend.x;
                var y = location_legend.y + h_size_legend;
                var startPoint = new Point(x, y);
                var h = h_legend - h_size_legend;

                var rectLegend = new Rect("legend", startPoint, w_legend, h, color, fill);
                rectLegend.draw(ctx);

                var numCategory = this.numCategory();
                x = this.location_chart.x;
                var y1 = location_legend.y;
                var y2 = location_legend.y + h_legend;

                var point1 = new Point(x, y1);
                var point2 = new Point(x, y2);

                var line = new Line(point1, point2);
                line.draw(ctx);

                var x2 = x + this.w_chart;
                var point3 = new Point(x2, y1);
                line = new Line(point1, point3);
                line.draw(ctx);

                var x3 = x2;
                var y3 = y1 + h_size_legend;
                var point4 = new Point(x3, y3);
                line = new Line(point3, point4);
                line.draw(ctx);
            }

            if (type_vertical) {
                var _numCategory = this.numCategory();
                for (var i = 1; i < _numCategory; i++) {
                    var _x43 = this.avgWidth() * i + this.location_chart.x;
                    var _y5 = location_legend.y;
                    var _y6 = location_legend.y + h_legend;
                    var _point25 = new Point(_x43, _y5);
                    var _point26 = new Point(_x43, _y6);
                    var _line4 = new Line(_point25, _point26);
                    _line4.draw(ctx);
                }
            }

            if (type_horizontal) {
                var numSeri = this.numSeri();
                for (var _i7 = 1; _i7 < numSeri; _i7++) {
                    var x1 = location_legend.x;
                    var _y7 = location_legend.y + (_i7 + 1) * h_size_legend;
                    var _x44 = location_legend.x + w_legend;
                    var _point27 = new Point(x1, _y7);
                    var _point28 = new Point(_x44, _y7);
                    var _line5 = new Line(_point27, _point28);
                    _line5.draw(ctx);
                }
            }
        }
    }, {
        key: "fillDataTable",
        value: function fillDataTable(ctx) {
            var numCategory = this.numCategory();
            var numSeri = this.numSeri();
            var minX = this.location_chart.x;
            var dataTextsData = [];
            var location_legend = this.location_legend;
            var h_size_legend = this.heightSizeLegend();
            var w_legend = this.w_legend;
            var data = this.data;
            var w_Avg = this.avgWidth();
            var fontSize = 13.3;

            for (var i = 1; i <= numSeri; i++) {
                var x = 100;
                for (var j = 1; j <= numCategory; j++) {
                    var y1 = location_legend.y + i * h_size_legend;
                    var y = this.cal_y_vertical(y1, 13.3, h_size_legend);
                    var text = data[j - 1][i - 1];
                    var _x45 = minX + (j - 1) * w_Avg;
                    _x45 = this.cal_x_center(ctx, text, _x45, w_Avg, fontSize);

                    var point = new Point(_x45, y);
                    GenerateText(dataTextsData, "text" + y, data[j - 1][i - 1], point, "Century Gothic", 13.3, "black", "start");
                }
            }

            this.drawText(dataTextsData, ctx);
        }
    }, {
        key: "cal_y_vertical",
        value: function cal_y_vertical(y_textbox, fontsize, h_textbox) {
            var y = y_textbox + (h_textbox - fontsize) / 2 + fontsize;
            return y;
        }
    }, {
        key: "cal_x_center",
        value: function cal_x_center(ctx, text, x, w, fontSize) {
            var result_x = x + (w - ctx.measureText(text).width * fontSize / 10) / 2;
            return result_x;
        }
    }]);

    return Chart;
}();

var BarChart = function () {
    function BarChart(chart) {
        _classCallCheck(this, BarChart);

        // this.location_canvas = location_canvas;
        this.chart = chart;
        this.location_chart = chart.location_chart;
        this.w_chart = chart.w_chart;
        this.h_chart = chart.h_chart;
        this.data = chart.data;
        this.gapWidth = chart.gapWidth;
        this.color = chart.color;
        this.category_name = chart.category_name;
        this.location_legend = chart.location_legend;
        this.displayDataTable = chart.displayDataTable;
        this.w_legend = chart.w_legend;
        this.h_legend = chart.h_legend;
        this.type_horizontal = chart.type_horizontal;
        this.type_outline = chart.type_outline;
        this.type_vertical = chart.type_vertical;
        return this;
    }

    _createClass(BarChart, [{
        key: "draw",
        value: function draw(ctx) {
            this.textCategoriesName(ctx);
            this.chart.drawGrid(ctx);
            // this.drawColumn(ctx);
            this.chart.drawLegend(ctx);

            var rects = this.rectsColumn();
            var objs = this.arrGSap(rects);

            for (var i = 0; i < objs.length; i++) {
                TweenLite.to(objs[i], 1, { h: rects[i].h * -1, ease: Quad.easeInOut, onUpdate: function onUpdate() {
                        onEnterFrame(objs, ctx);
                    } });
            }
        }
    }, {
        key: "drawColumn",
        value: function drawColumn(ctx) {
            var rects = this.rectsColumn();

            for (var m = 0; m < rects.length; m++) {
                rects[m].draw(ctx);
            }
        }

        /*rectsColumnPrimaryAxis(){
            var fill = true;
            var rects = [];
            var numSeri = this.chart.numSeri();
            var numCategory = this.chart.numCategory();
            var x;
             var avgWidth = this.chart.avgWidth();
             for (var j= 0; j < numCategory; j++) {
                var bd = avgWidth * j + this.location_chart.x ;
                bd = bd + this.marginGap();
                for(var i= 0; i < numSeri; i++){
                    var rec = [];
                    var val = this.data[j][i];
                    var h = this.chart.h_val(val);
                    var y_val = this.chart.cacl_y(val);
                    var w = this.width_gap();
                    var color = this.color[i];
                     x = bd +  i * w;
                    
                    var p1 = new Point(x, y_val);
                    var rec = new Rect("rect", p1, w, h, color, fill);
                    rects.push(rec);
                }
            }
            return rects;
        }*/

    }, {
        key: "drawRects",
        value: function drawRects() {
            var numObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.chart.numSeri();
            var obj = arguments[1];
            var gapWidth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            var fill = true;
            var rects = [];
            var numSeri = numObj;
            var numCategory = this.chart.numCategory();
            var x = void 0;
            var secondAxis = this.chart.secondAxis;
            // console.log(secondAxis[obj[0]]);
            var avgWidth = this.chart.avgWidth();

            for (var j = 0; j < numCategory; j++) {
                var bd = avgWidth * j + this.location_chart.x;
                bd = bd + this.marginGap(numObj, gapWidth);
                for (var i = 0; i < numSeri; i++) {
                    var rec = [];
                    var val = this.data[j][obj[i]];
                    var h = this.chart.h_val(val, secondAxis[obj[i]]);
                    var y_val = this.chart.cacl_y(val, secondAxis[obj[i]]);
                    var w = this.width_gap(numObj, gapWidth);
                    var color = this.color[obj[i]];

                    x = bd + i * w;

                    var p1 = new Point(x, y_val);
                    rec = new Rect("rect", p1, w, h, color, fill);
                    rects.push(rec);
                }
            }
            return rects;
        }
    }, {
        key: "rectsColumn",
        value: function rectsColumn() {
            //Dem

            var objPrimaryAxis = this.chart.primaryAxisOrderNum();
            var objSecondAxis = this.chart.secondAxisOrderNum();

            //gapWidth
            var gapWidthPrimaryAxis = this.chart.gapWidth[0];
            var gapWidthSecondAxis = this.chart.gapWidth[1];

            var rectAcordingPrimaryAxis = this.drawRects(objPrimaryAxis.length, objPrimaryAxis, gapWidthPrimaryAxis);
            var rectAcordingSecondAxis = this.drawRects(objSecondAxis.length, objSecondAxis, gapWidthSecondAxis);
            //rect
            //return rectAcordingPrimaryAxis;
            return rectAcordingPrimaryAxis.uniqueMerge(rectAcordingSecondAxis);
        }
    }, {
        key: "arrGSap",
        value: function arrGSap(rects) {
            var objs = [];
            for (var dem = 0; dem < rects.length; dem++) {
                var b = { x: rects[dem].point.x, y: this.h_chart + this.location_chart.y, w: rects[dem].w, h: 0, fill: rects[dem].color };
                objs.push(b);
            }

            return objs;
        }
    }, {
        key: "width_gap",
        value: function width_gap() {
            var numObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.chart.numSeri();
            var gapWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            var w_col = this.w_chart / (this.chart.numCategory() * (numObj + gapWidth / 100));
            return w_col;
        }
    }, {
        key: "marginGap",
        value: function marginGap() {
            var numObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.chart.numSeri();
            var gapWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            return gapWidth / 100 * this.width_gap(numObj, gapWidth) / 2;
        }
    }, {
        key: "textLegend",
        value: function textLegend(ctx) {
            this.textCategoriesName(ctx);
        }
    }, {
        key: "textCategoriesName",
        value: function textCategoriesName(ctx) {
            var numCategory = this.chart.numCategory();
            var numSeri = this.chart.numSeri();
            var fontsize = 12;
            var minX = this.location_chart.x;
            var maxY = this.location_chart.y + this.h_chart;
            var w_col = this.width_gap();
            var avgWidth = this.chart.avgWidth();
            var marginGap = this.marginGap();
            var h_legend = this.chart.heightSizeLegend();

            var dataTexts = [];
            for (var i = 0; i < numCategory; i++) {
                var text = this.category_name[i];
                var x = minX + avgWidth * i + marginGap + (w_col * this.chart.numSeri - ctx.measureText(text).width * fontsize / 10) / 2;

                // fontsize = 12
                var y = this.chart.cal_y_vertical(maxY, 12, h_legend);
                var point = new Point(x, y);
                GenerateText(dataTexts, "text" + y, text, point, "Century Gothic", 12, "black", "start");
            }

            this.chart.drawText(dataTexts, ctx);
        }
    }]);

    return BarChart;
}();

var LineChart = function () {
    function LineChart(chart) {
        var isDrawNut = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        _classCallCheck(this, LineChart);

        this.chart = chart;
        this.location_chart = chart.location_chart;
        this.w_chart = chart.w_chart;
        this.h_chart = chart.h_chart;
        this.data = chart.data;
        this.gapWidth = chart.gapWidth;
        this.color = chart.color;
        this.category_name = chart.category_name;
        this.location_legend = chart.location_legend;
        this.displayDataTable = chart.displayDataTable;
        this.w_legend = chart.w_legend;
        this.h_legend = chart.h_legend;
        this.type_horizontal = chart.type_horizontal;
        this.type_outline = chart.type_outline;
        this.type_vertical = chart.type_vertical;
        this.isDrawNut = isDrawNut;
        this.typeChart = chart.typeChart;
    }

    _createClass(LineChart, [{
        key: "draw",
        value: function draw(ctx) {
            this.chart.drawGrid(ctx);

            this.chart.drawLegend(ctx);

            if (this.isDrawNut) {
                this.drawPoint(ctx);
            }
            var typeChart = this.typeChart;
            if (typeChart == "lineChart_Template1" || typeChart == "lineChart_Template4") {
                this.drawLineTemplate1(ctx);
            } else if (typeChart == "lineChart_Template2") {
                this.drawLineTemplate2(ctx);
            }
        }
    }, {
        key: "drawLineTemplate2",
        value: function drawLineTemplate2(ctx) {
            var points = this.pointsTemplate2();
            var dataTotalCat = [];
            var dataCat = [];
            var numSeri = this.chart.numSeri();
            var numCategory = this.chart.numCategory();

            for (var j = 0; j < numSeri; j++) {
                dataCat = [];
                for (var i = j; i <= j + (numCategory - 1) * numSeri; i += numSeri) {
                    dataCat.push(points[i]);
                }
                dataTotalCat.push(dataCat);
            }

            // console.log(dataTotalCat[0]);

            var lines = [];
            for (var _j11 = 0; _j11 < dataTotalCat.length; _j11++) {
                for (var _i8 = 0; _i8 < dataTotalCat[_j11].length - 1; _i8++) {
                    var point1 = new Point(dataTotalCat[_j11][_i8][0], dataTotalCat[_j11][_i8][1]);
                    var point2 = new Point(dataTotalCat[_j11][_i8 + 1][0], dataTotalCat[_j11][_i8 + 1][1]);
                    var color = this.color[_j11 % this.color.length];
                    var lineWidth = 3;
                    GenerateLine(lines, point1, point2, color, lineWidth);
                }
            }
            this.chart.drawLine(lines, ctx);
        }
    }, {
        key: "pointsTemplate2",
        value: function pointsTemplate2() {
            var points = [];
            var numCategory = this.chart.numCategory();
            var numSeri = this.chart.numSeri();
            var minX = this.chart.minX();
            var avgWidth = this.chart.avgWidth();
            var secondAxis = this.chart.secondAxis;
            var margin = 0;

            for (var i = 0; i < numCategory; i++) {
                margin = avgWidth / 2 + i * avgWidth;
                for (var j = 0; j < numSeri; j++) {
                    var pointsOfSeri = [];
                    var x = void 0,
                        y = void 0;
                    x = minX + margin;
                    var val = 0;
                    for (var m = j; m < numSeri; m++) {
                        val += this.data[i][m];
                    }
                    var y_val = this.chart.cacl_y(val);

                    pointsOfSeri.push(x, y_val);
                    points.push(pointsOfSeri);
                }
            }
            return points;
        }
    }, {
        key: "drawLineTemplate1",
        value: function drawLineTemplate1(ctx) {
            var points = this.pointsTemplate1();
            var dataTotalCat = [];
            var dataCat = [];
            var numSeri = this.chart.numSeri();
            var numCategory = this.chart.numCategory();

            for (var j = 0; j < numSeri; j++) {
                dataCat = [];
                for (var i = j; i <= j + (numCategory - 1) * numSeri; i += numSeri) {
                    dataCat.push(points[i]);
                }
                dataTotalCat.push(dataCat);
            }

            // console.log(dataTotalCat[0]);

            var lines = [];
            for (var _j12 = 0; _j12 < dataTotalCat.length; _j12++) {
                for (var _i9 = 0; _i9 < dataTotalCat[_j12].length - 1; _i9++) {
                    var point1 = new Point(dataTotalCat[_j12][_i9][0], dataTotalCat[_j12][_i9][1]);
                    var point2 = new Point(dataTotalCat[_j12][_i9 + 1][0], dataTotalCat[_j12][_i9 + 1][1]);
                    var color = this.color[_j12 % this.color.length];
                    var lineWidth = 3;
                    GenerateLine(lines, point1, point2, color, lineWidth);
                }
            }
            this.chart.drawLine(lines, ctx);
        }
    }, {
        key: "drawPoint",
        value: function drawPoint(ctx) {
            var points = this.pointsTemplate1();
            for (var i = 0; i < points.length; i++) {
                var point = new Point(points[i][0], points[i][1], this.color[i % this.color.length]);
                var arc = new Arc(point);
                arc.draw(ctx);
            }
        }
    }, {
        key: "pointsTemplate1",
        value: function pointsTemplate1() {
            var points = [];
            var numCategory = this.chart.numCategory();
            var numSeri = this.chart.numSeri();
            var minX = this.chart.minX();
            var avgWidth = this.chart.avgWidth();
            var secondAxis = this.chart.secondAxis;
            var margin = 0;

            for (var i = 0; i < numCategory; i++) {
                margin = avgWidth / 2 + i * avgWidth;
                for (var j = 0; j < numSeri; j++) {
                    var pointsOfSeri = [];
                    var x = void 0,
                        y = void 0;
                    x = minX + margin;
                    var val = this.data[i][j];
                    var y_val = this.chart.cacl_y(val, secondAxis[j]);

                    pointsOfSeri.push(x, y_val);
                    points.push(pointsOfSeri);
                }
            }
            return points;
        }
    }, {
        key: "drawPoints",
        value: function drawPoints() {}
    }]);

    return LineChart;
}();

var PercentChart = function () {
    function PercentChart(chart) {
        var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
        var isDrawNut = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        _classCallCheck(this, PercentChart);

        this.chart = chart;
        this.step = step;
        this.location_chart = chart.location_chart;
        this.w_chart = chart.w_chart;
        this.h_chart = chart.h_chart;
        this.data = chart.data;
        this.gapWidth = chart.gapWidth;
        this.color = chart.color;
        this.category_name = chart.category_name;
        this.location_legend = chart.location_legend;
        this.displayDataTable = chart.displayDataTable;
        this.w_legend = chart.w_legend;
        this.h_legend = chart.h_legend;
        this.type_horizontal = chart.type_horizontal;
        this.type_outline = chart.type_outline;
        this.type_vertical = chart.type_vertical;
        this.isDrawNut = isDrawNut;
        this.typeChart = chart.typeChart;
    }

    _createClass(PercentChart, [{
        key: "draw",
        value: function draw(ctx) {
            this.textCategoriesName(ctx);
            this.drawGrid(ctx);

            this.chart.drawLegend(ctx);

            if (this.isDrawNut) {
                this.drawPoint(ctx);
            }
            var typeChart = this.typeChart;
            this.drawLineTemplate2(ctx);
        }
    }, {
        key: "drawLineTemplate2",
        value: function drawLineTemplate2(ctx) {
            var points = this.pointsTemplate2();
            var dataTotalCat = [];
            var dataCat = [];
            var numSeri = this.chart.numSeri();
            var numCategory = this.chart.numCategory();

            for (var j = 0; j < numSeri; j++) {
                dataCat = [];
                for (var i = j; i <= j + (numCategory - 1) * numSeri; i += numSeri) {
                    dataCat.push(points[i]);
                }
                dataTotalCat.push(dataCat);
            }

            // console.log(dataTotalCat[0]);

            var lines = [];
            for (var _j13 = 0; _j13 < dataTotalCat.length; _j13++) {
                for (var _i10 = 0; _i10 < dataTotalCat[_j13].length - 1; _i10++) {
                    var point1 = new Point(dataTotalCat[_j13][_i10][0], dataTotalCat[_j13][_i10][1]);
                    var point2 = new Point(dataTotalCat[_j13][_i10 + 1][0], dataTotalCat[_j13][_i10 + 1][1]);
                    var color = this.color[_j13 % this.color.length];
                    var lineWidth = 3;
                    GenerateLine(lines, point1, point2, color, lineWidth);
                }
            }
            this.chart.drawLine(lines, ctx);
        }
    }, {
        key: "pointsTemplate2",
        value: function pointsTemplate2() {
            var points = [];
            var numCategory = this.chart.numCategory();
            var numSeri = this.chart.numSeri();
            var minX = this.chart.minX();
            var avgWidth = this.chart.avgWidth();
            var margin = 0;
            var sumCategory = [];
            for (var i = 0; i < numCategory; i++) {
                var sumEverCategory = 0;
                for (var j = 0; j < numSeri; j++) {
                    sumEverCategory += this.data[i][j];
                }
                sumCategory.push(sumEverCategory);
            }
            // console.log(sumCategory);
            for (var _i11 = 0; _i11 < numCategory; _i11++) {
                margin = avgWidth / 2 + _i11 * avgWidth;
                for (var _j14 = 0; _j14 < numSeri; _j14++) {
                    var pointsOfSeri = [];
                    var x = void 0,
                        y = void 0;
                    x = minX + margin;
                    var val = 0;
                    for (var m = _j14; m < numSeri; m++) {
                        val += this.data[_i11][m];
                    }
                    var y_val = this.chart.location_chart.y + (1 - val / sumCategory[_i11]) * this.chart.h_chart;

                    pointsOfSeri.push(x, y_val);
                    points.push(pointsOfSeri);
                }
            }
            return points;
        }
    }, {
        key: "drawPoint",
        value: function drawPoint(ctx) {
            var points = this.pointsTemplate2();
            for (var i = 0; i < points.length; i++) {
                var point = new Point(points[i][0], points[i][1], this.color[i % this.color.length]);
                var arc = new Arc(point);
                arc.draw(ctx);
            }
        }
    }, {
        key: "cacl_y",
        value: function cacl_y(val) {
            var y_val = this.chart.h_chart + this.chart.location_chart.y - this.h_val(val);
            return y_val;
        }
    }, {
        key: "h_val",
        value: function h_val(val) {
            var step = this.step;
            var stepHeight = this.stepHeight();

            var h = Math.floor(val / step) * stepHeight + stepHeight / step * (val - Math.floor(val / step) * step);
            return h;
        }
    }, {
        key: "drawGrid",
        value: function drawGrid(ctx) {
            var minX = this.chart.minX();
            var minY = this.chart.minY();
            var maxX = minX + this.chart.w_chart;
            var maxY = minY + this.chart.h_chart;
            var stepHeightLeft = this.stepHeight();
            var stepHeightRight = this.stepHeight(true);

            var dataGrids = [];
            var dataTexts = [];
            var maxValAxisLeft = 100;
            var stepLeft = this.step;
            var maxValAxisRight = 100;
            var stepRight = this.step;
            var i = 0;
            var y = minY;

            var primaryMajorHorizontal = this.chart.gridOption.primaryMajorHorizontal;
            var primaryMinorHorizontal = this.chart.gridOption.primaryMinorHorizontal;
            var primaryMinorVertical = this.chart.gridOption.primaryMinorVertical;
            var primaryMajorVertical = this.chart.gridOption.primaryMajorVertical;

            for (var j = 0; j <= maxValAxisLeft; j += stepLeft) {
                var text = maxValAxisLeft - stepLeft * i;

                var point = new Point(minX - 10, y);
                GenerateText(dataTexts, "text" + y, text, point, "Helvetica", 12, "black", "end");
                i++;
                y += stepHeightLeft;
            }

            y = minY;
            if (primaryMajorHorizontal && !primaryMinorHorizontal) {

                for (var _j15 = 0; _j15 <= maxValAxisLeft; _j15 += stepLeft) {
                    var point1 = new Point(minX, y);
                    var point2 = new Point(maxX, y);

                    GenerateLine(dataGrids, point1, point2, "#d9d9d9", 1);

                    y += stepHeightLeft;
                }
            } else if (primaryMajorHorizontal && primaryMinorHorizontal) {

                for (var _j16 = 0; _j16 <= maxValAxisLeft; _j16 += stepLeft) {
                    if (_j16 != maxValAxisLeft) {
                        for (var m = 0; m < 5; m++) {
                            var _point29 = new Point(minX, y + stepHeightLeft / 5 * m);
                            var _point30 = new Point(maxX, y + stepHeightLeft / 5 * m);
                            var colorLine = void 0;
                            if (m == 0) {
                                colorLine = "#d9d9d9";
                            } else {
                                colorLine = "#f2f2f2";
                            }
                            GenerateLine(dataGrids, _point29, _point30, colorLine, 1);
                        }
                    } else {
                        var _point31 = new Point(minX, y);
                        var _point32 = new Point(maxX, y);
                        var _colorLine5 = "#d9d9d9";
                        GenerateLine(dataGrids, _point31, _point32, _colorLine5, 1);
                    }
                    y += stepHeightLeft;
                }
            } else if (!primaryMajorHorizontal && primaryMinorHorizontal) {
                for (var _j17 = 0; _j17 <= maxValAxisLeft; _j17 += stepLeft) {
                    if (_j17 != maxValAxisLeft) {
                        for (var _m3 = 0; _m3 < 5; _m3++) {
                            var _point33 = new Point(minX, y + stepHeightLeft / 5 * _m3);
                            var _point34 = new Point(maxX, y + stepHeightLeft / 5 * _m3);
                            GenerateLine(dataGrids, _point33, _point34, "#f2f2f2", 1);
                        }
                    } else {
                        var _point35 = new Point(minX, y);
                        var _point36 = new Point(maxX, y);
                        var _colorLine6 = "#d9d9d9";
                        GenerateLine(dataGrids, _point35, _point36, _colorLine6, 1);
                    }

                    y += stepHeightLeft;
                }
            }

            y = minY;
            i = 0;
            for (var _j18 = 0; _j18 <= maxValAxisRight; _j18 += stepRight) {
                var _text3 = maxValAxisRight - stepRight * i;

                var _point37 = new Point(maxX + 10, y);
                GenerateText(dataTexts, "text" + y, _text3, _point37, "Helvetica", 12, "black", "end");
                i++;
                y += stepHeightRight;
            }

            this.chart.drawTextPercent(dataTexts, ctx);
            this.chart.drawLine(dataGrids, ctx);

            var numCategory = this.chart.numCategory();

            if (primaryMajorVertical && !primaryMinorVertical) {
                for (var _i12 = 0; _i12 <= numCategory; _i12++) {
                    var x = this.chart.avgWidth() * _i12 + this.location_chart.x;
                    var y1 = minY;
                    var y2 = minY + this.h_chart;
                    var _point38 = new Point(x, y1);
                    var _point39 = new Point(x, y2);
                    var line = new Line(_point38, _point39, "#d9d9d9");
                    line.draw(ctx);
                }
            } else if (!primaryMajorVertical && primaryMinorVertical) {
                for (var _i13 = 0; _i13 <= numCategory; _i13++) {
                    var _x55 = this.avgWidth() * _i13 + this.location_chart.x;
                    var _y8 = minY;
                    var _y9 = minY + this.h_chart;
                    for (var _j19 = 0; _j19 < 2; _j19++) {
                        var _point40 = new Point(_x55 + this.avgWidth() / 2 * _j19, _y8);
                        var _point41 = new Point(_x55 + this.avgWidth() / 2 * _j19, _y9);
                        var _line6 = new Line(_point40, _point41, "#f2f2f2");
                        _line6.draw(ctx);
                    }
                }
            } else if (primaryMajorVertical && primaryMinorVertical) {
                for (var _i14 = 0; _i14 <= numCategory; _i14++) {
                    var _x56 = this.chart.avgWidth() * _i14 + this.location_chart.x;
                    var _y10 = minY;
                    var _y11 = minY + this.h_chart;
                    for (var _j20 = 0; _j20 < 2; _j20++) {
                        var _point42 = new Point(_x56 + this.chart.avgWidth() / 2 * _j20, _y10);
                        var _point43 = new Point(_x56 + this.chart.avgWidth() / 2 * _j20, _y11);
                        if (_j20 == 0) {
                            var _line7 = new Line(_point42, _point43, "#d9d9d9");
                            _line7.draw(ctx);
                        } else {
                            var _line8 = new Line(_point42, _point43, "#f2f2f2");
                            _line8.draw(ctx);
                        }
                    }
                }
            }
        }
    }, {
        key: "stepHeight",
        value: function stepHeight() {
            var heightChart = this.chart.h_chart;
            var step = this.step;
            var maxValAxis = 100;

            var khoang = maxValAxis / step;
            var stepHeight = heightChart / khoang;
            return stepHeight;
        }
    }, {
        key: "textCategoriesName",
        value: function textCategoriesName(ctx) {
            var numCategory = this.chart.numCategory();
            var numSeri = this.chart.numSeri();
            var fontsize = 12;
            var minX = this.location_chart.x;
            var maxY = this.location_chart.y + this.h_chart;
            var avgWidth = this.chart.avgWidth();
            var h_legend = this.chart.heightSizeLegend();

            var dataTexts = [];
            for (var i = 0; i < numCategory; i++) {
                var text = this.category_name[i];
                var x = minX + avgWidth * i + (avgWidth - ctx.measureText(text).width * fontsize / 10) / 2;

                // fontsize = 12
                var y = this.chart.cal_y_vertical(maxY, 12, h_legend);
                var point = new Point(x, y);
                GenerateText(dataTexts, "text" + y, text, point, "Century Gothic", 12, "black", "start");
            }

            this.chart.drawText(dataTexts, ctx);
        }
    }]);

    return PercentChart;
}();

function CalculatorStep(sMax) {
    var m = 0;
    var a = [1.0, 2.0, 5.0, 10.0];
    var x = sMax / 9.52;
    var z = Math.floor(Math.log(x)/Math.log(10));
    for (var i = 0; i < a.length; i++) {
        a[i] = a[i] * Math.pow(10, z);
        if (x <= a[i]) {
            m = a[i];
            break;
        }
    }
    return m;
}

function GenerateLine(dataLines, point1, point2) {
    var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "black";
    var lineWidth = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

    dataLines.push(new Line(point1, point2, color, lineWidth));
}

function GenerateText(dataTexts, id, text, point, font, size, color, textAlign) {
    dataTexts.push(new Text(id, text, point, font, size, color, textAlign));
}

function drawBar(obj, ctx) {
    ctx.beginPath();
    ctx.rect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = obj.fill;
    ctx.fill();
}

function onEnterFrame(objs, ctx) {
    for (var i = 0; i < objs.length; i++) {
        drawBar(objs[i], ctx);
    }
}

// function veBieuDo(
//     id, 
//     data = [ [2, 2.4, 4.3], [2, 4.4, 2.5], [3, 1.8, 3.5], [5, 2.8, 4.5]],
//     category_name = ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"], 
//     color = ["#6aa4d9","#ed7d31", "#a5a5a5"], 
//     typeChart = "columnChartTemplate1", 
//     w_canvas= 920, 
//     h_canvas= 427, 
//     top_canvas= 100, 
//     left_canvas= 25, 
//     location_chart = new Point(75,43), 
//     w_chart = 821, 
//     h_chart = 282,
//     gridOption = [true, false, false, false],
//     gapWidth = [0,0], 
//     secondAxis = [true, false, false],
//     displayDataTable = false, 
//     location_legend, 
//     w_legend, 
//     h_legend, 
//     dataTable
//     ){   
//     // var chart = new Chart(w_canvas, h_canvas, top_canvas, left_canvas, location_chart, 
//     //     w_chart, h_chart, color, category_name, typeChart, data, gapWidth, 
//     //     displayDataTable, location_legend, w_legend, h_legend, type_horizontal, type_outline, type_vertical);
//     // chart.draw();

//     // let abc_123 = 10;
//     let chartId = 'chart_'+id;
//     eval(
//         'let ' + chartId 
//         +' = new Chart('+
//                     w_canvas+', '+
//                     h_canvas+', '+
//                     top_canvas+', '+
//                     left_canvas+', '+
//                     JSON.stringify(location_chart)+', '+
//                     w_chart+', '+
//                     h_chart+', '+
//                     JSON.stringify(gridOption)+', '+
//                     JSON.stringify(color)+', '+
//                     JSON.stringify(category_name)+
//                     ', "'+typeChart+'", '+ 
//                     JSON.stringify(data)+', '+
//                     JSON.stringify(gapWidth)+', '+
//                     JSON.stringify(secondAxis)+', '+
//                     displayDataTable+', '+
//                     JSON.stringify(location_legend)+', '+
//                     w_legend+', '+
//                     h_legend+', '+
//                     JSON.stringify(dataTable)+
//                     ');'
//                     + chartId+'.draw();');

// }


function veBieuDo(id, options) {
    // var chart = new Chart(w_canvas, h_canvas, top_canvas, left_canvas, location_chart, 
    //     w_chart, h_chart, color, category_name, typeChart, data, gapWidth, 
    //     displayDataTable, location_legend, w_legend, h_legend, type_horizontal, type_outline, type_vertical);
    // chart.draw();

    // let abc_123 = 10;
    var chartId = 'chart_' + id;
    eval('let ' + chartId + ' = new Chart(' + options.w_canvas + ', ' + options.h_canvas + ', ' + options.top_canvas + ', ' + options.left_canvas + ', ' + JSON.stringify(options.location_chart) + ', ' + options.w_chart + ', ' + options.h_chart + ', ' + JSON.stringify(options.gridOption) + ', ' + JSON.stringify(options.color) + ', ' + JSON.stringify(options.category_name) + ', "' + options.typeChart + '", ' + JSON.stringify(options.data) + ', ' + JSON.stringify(options.seriOption) + ', ' + options.displayDataTable + ', ' + JSON.stringify(options.location_legend) + ', ' + options.w_legend + ', ' + options.h_legend + ', ' + JSON.stringify(options.dataTable) + '); console.log(' + chartId + ');' + chartId + '.draw();');
}

window.onload = function () {
    var p1 = new Point(75, 43);
    var w_chart = 821;
    var h_chart = 282;
    // let color = "green";
    var fill = false;

    // location_canvas, w_canvas, h_canvas, location_chart, w_chart, h_chart, data
    // var data =[ [4.3, 2.4, 2, 3.2], [2.5, 4.4, 2, 2.1], [3.2, 1.8, 3, 4.3], [4.5, 5.1, 5.2, 1], [4.5, 5.1, 5.2, 1]];
    var data = [[2, 2.4, 4.3], [2, 4.4, 2.5], [3, 1.8, 3.5], [5, 2.8, 4.5]];
    var category_name = ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"];
    var color = ["#6aa4d9", "#ed7d31", "#a5a5a5"];
    var location_canvas = p1;
    var w_canvas = 920;
    var h_canvas = 427;
    var location_chart = p1;
    var location_legend = new Point(16, 325);
    var w_legend = 880;
    var h_legend = 74;
    var gapWidth = [0, 500];
    // var typeChart = "columnChartTemplate1";
    // var typeChart = "lineChart_Template2";
    var typeChart = "lineChart_Template1";
    var top_canvas = 100;
    var left_canvas = 35;
    var type_horizontal = true;
    var type_outline = true;
    var type_vertical = true;
    var dataTable = new DataTable(type_horizontal, type_vertical, type_outline);
    // var secondAxis = [false, false,true];

    var displayDataTable = true;
    var gridOption = new GridLine(true, true, true, true);

    // var chart = new Chart(w_canvas, h_canvas, top_canvas, left_canvas, location_chart, 
    //     w_chart, h_chart, gridOption, color, category_name, typeChart, data);
    // chart.draw();


    var top_canvas1 = 600;
    var left_canvas1 = 25;
    var p2 = new Point(75, 43);
    var location_chart1 = p2;
    var secondAxis = [false, false, true];
    var data1 = [[12.3, 1.4, 2], [3.5, 14.4, 20], [3.2, 18, 13], [4.5, 5.1, 5.2], [4.5, 5.1, 5.2]];
    var typeChart1 = "columnChartTemplate1";

    var seriOption = new SeriOption(true, secondAxis, gapWidth);

    var optionsBieuDoCot = _defineProperty({
        "w_canvas": w_canvas,
        "h_canvas": h_canvas,
        "top_canvas": top_canvas1,
        "left_canvas": left_canvas1,
        "location_chart": location_chart1,
        "w_chart": 821,
        "h_chart": 300,
        "gridOption": gridOption,
        "color": color,
        "category_name": category_name,
        "location_legend": location_legend,
        "w_legend": w_legend,
        "h_legend": h_legend,
        "displayDataTable": false,
        "typeChart": typeChart1,
        "data": data1,
        "dataTable": dataTable,
        "seriOption": seriOption
    }, "displayDataTable", false);
    // var chart1 = new Chart(w_canvas, h_canvas, top_canvas1, left_canvas1, location_chart1, 
    //     w_chart, h_chart, color, category_name, typeChart1  , data1, gapWidth, secondAxis,
    //     displayDataTable, location_legend, w_legend, h_legend, type_horizontal, type_outline, type_vertical);
    // chart1.draw();
    // veBieuDo(1, data,
    // category_name, color, typeChart1, w_canvas, h_canvas, top_canvas1, left_canvas1, location_chart1, w_chart, h_chart, gridOption,
    // gapWidth, secondAxis, displayDataTable = false);

    // veBieuDo(1, optionsBieuDoCot);
    
    var typeChart2 = "lineChart_Template5";
    var top_canvas2 = 1100;
    var left_canvas2 = 25;
    var type_horizontal = true;
    var type_outline = true;
    var type_vertical = true;
    var p3 = new Point(75, 43);
    var location_chart2 = p3;
    var data2 = [[4.3, 2.4, 2], [2.5, 4.4, 2], [3.5, 1.8, 3], [4.5, 2.8, 5]];
    var displayDataTable = true;

    var options = _defineProperty({
        "w_canvas": 920,
        "h_canvas": 427,
        "top_canvas": 1100,
        "left_canvas": 25,
        "location_chart": p3,
        "w_chart": 821,
        "h_chart": 300,
        "gridOption": gridOption,
        "color": color,
        "category_name": category_name,
        "location_legend": location_legend,
        "w_legend": w_legend,
        "h_legend": h_legend,
        "displayDataTable": false,
        "typeChart": typeChart2,
        "data": data2,
        "dataTable": dataTable,
        "seriOption": seriOption
    }, "displayDataTable", true);

    
    // veBieuDo(2, options);

   /* var typeChart3 = "lineChart_Template1";
    var top_canvas3 = 1600;
    var left_canvas3 = 25;
    var type_horizontal = true;
    var type_outline = true;
    var type_vertical = true;
    var p3 = new Point(75, 43);
    var location_chart2 = p3;
    var displayDataTable = true;

    var options1 = {
        "w_canvas": 920,
        "h_canvas": 427,
        "top_canvas": top_canvas3,
        "left_canvas": left_canvas2,
        "location_chart":  location_chart2,
        "w_chart":  821,
        "h_chart": 300,
        "gridOption": gridOption,
        "color": color,
        "category_name": category_name,
        "location_legend": location_legend,
        "w_legend": w_legend,
        "h_legend": h_legend,
        "displayDataTable": false,
        "typeChart": typeChart2,
        "data": data,
        "dataTable": dataTable,
        "seriOption": seriOption,
        "displayDataTable": false
    };
    
    veBieuDo(3, options1);*/

    /*var myVinyls = {
        "Classical music": 8.2,
        "Alternative rock": 3.2,
        "Pop": 1.4,
        "Jazz": 1.2
    };
     var points = {
        "Classical music": [[513, 316], [513, 159]],
        "Alternative rock": [[360, 320], [281, 452]],
        "Pop": [[378, 242], [232,180]],
        "Za": [[416, 221], [334, 84]]
    };
     var nameCategory = ["Classical music", "Alternative rock", "Pop", "Za"];
     var myDougnutChart = new PieChart(
        {
            data:myVinyls,
            points: points,
            colors:["#fde23e","#f16e23", "#57d9ff","#937e88"],
            nameCategory: nameCategory,
            doughnutHoleSize:0.8
        }
    );
    myDougnutChart.draw();*/

    var areaChart = new AreaChart({
        "title": {
            "text": "Monthly Downloads",
            "fontSize": 25,
            "frame": {
                "x": 136,
                "y": 10,
                "w": 119,
                "h": 27
            }
        },
        "type": "AreaChartTemplate1",
        "axes": {
            "axes": [{
                "horizontal": true,
                "fontFamily": "Arial",
                "fontsize": 13
            }, {
                "vertical": true,
                "fontFamily": "Calibri",
                "fontsize": 12
            }]
        },
        "axisTitle": {
            "axisTitles": [{
                "horizontal": true,
                "x": 10,
                "y": 20,
                "w": 200,
                "h": 100
            }, {
                "vertical": true,
                "x": 10,
                "y": 300,
                "w": 300,
                "h": 100
            }]
        },
        "dataTable": {
          "display": true
        },
        "gridLine": {
            "primaryMajorHorizontal": true,
            "primaryMinorHorizontal": true,
            "primaryMajorVertical": false,
            "primaryMinorVertical": false
        },
        "legend": {
            "legend": "right",
            "x": 175,
            "y": 131,
            "w": 170,
            "h": 27
        },
        "dataLable": "show",
        "seriesOption": [{
            "name": "Series 1",
            "seriOption": 1,
            "color": "#5b9bd5",
            "dataLable":true,
            "legend": {
                "x":140,
                "y":310,
                "font": "Arial",
                "size":20
            }
        }, {
            "name": "Series 2",
            "seriOption": 2,
            "color": "#ed7d31",
            "dataLable":true,
            "legend": {
                "x":240,
                "y":310,
                "font": "Arial",
                "size":20
            }
        }, {
            "name": "Series 3",
            "seriOption": 2,
            "color": "#a5a5a5",
            "dataLable":false,
            "legend": {
                "x":340,
                "y":310,
                "w":30,
                "h":20,
                "font": "Arial",
                "size":20
            }
        }],
        "data": [{
            "date": "1/5/2002",
            "series": [{
                "name": "Seri 1",
                "value": 32
            }, {
                "name": "seri 2",
                "value": 12
            },{
                "name": "seri 3",
                "value": 3
            }]
        }, {
            "date": "1/6/2002",
            "series": [{
                "name": "seri 1",
                "value": 32
            }, {
                "name": "seri 2",
                "value": 12
            },{
                "name": "seri 3",
                "value": 3
            }]
        }, {
            "date": "1/7/2002",
            "series": [{
                "name": "seri 1",
                "value": 28
            }, {
                "name": "seri 2",
                "value": 12
            },{
                "name": "seri 3",
                "value": 7
            }]

        }, {
            "date": "1/8/2002",
            "series": [{
                "name": "seri 1",
                "value": 12
            }, {
                "name": "seri 2",
                "value": 21
            },{
                "name": "seri 3",
                "value": 9
            }]

        }, {
            "date": "1/9/2002",
            "series": [{
                "name": "seri 1",
                "value": 15
            }, {
                "name": "seri 2",
                "value": 28
            },{
                "name": "seri 3",
                "value": 11
            }]

        }],
        "frame": [{
            "name": "Frame Canvas",
            "w": 517,
            "h": 407,
            "top": 19,
            "left": 30
        }, {
            "name": "Frame chart",
            "w": 405,
            "h": 187,
            "x": 54,
            "y": 63
        }
        ]
    });

    areaChart.draw();
    // debugger


    // Object.keys(optionsArea["data"][0])
    // Object.values(optionsArea["data"][0])
};