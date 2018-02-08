webpackJsonp([6,7],{228:function(n,t,e){"use strict";function a(n){return n&&n.__esModule?n:{default:n}}Object.defineProperty(t,"__esModule",{value:!0});var s=e(2),i=a(s),r=e(97),o=a(r);t.default={name:"dataAnalysis",computed:{groups:function(){return this.$store.state.mystudent.patientList}},watch:{patientID:function(){if(0===this.selectPatientList.length)this.reflexName(this.patientID);else{var n=this.patientID,t=this.selectPatientList.map(function(n){return n.ID});t.indexOf(n)===-1?this.reflexName(this.patientID):this.$message.warning("重复选择")}},courseID:function(){var n=this.courseID,t=this;t.packageData.map(function(e){e.Courses.map(function(e){e.ID===n&&(t.courseName=e.Name)})})}},data:function(){return{tabData:["评测历史","评测对比"],currentTab:0,groupValue:0,patientIDs:[],patientID:null,packageData:[],courseData:[],packageID:null,courseID:null,xData:[],titleData:[],seriesData:[],cpXData:[],cpTitleData:[],cpSeriesData:[],selectPatientList:[],testPaperListData:[],testPaperID:null,currentPatientID:null,courseName:null}},methods:{toggleTab:function(n){this.currentTab=n,this.resetData(),this.getPacientList(0)},reflexName:function(n){var t=this;t.groups.map(function(n){n.groupPatients.map(function(n){if(n.ID===t.patientID){var e={ID:n.ID,Name:n.Name};t.selectPatientList.push(e)}})})},handleClose:function(n){this.selectPatientList.splice(this.selectPatientList.indexOf(n),1)},resetData:function(){this.groupValue=0,this.patientID=null,this.courseData=[],this.packageID=null,this.courseID=null,this.courseName=null,this.testPaperID=null,this.selectPatientList=[]},drawLineChart:function(){this.lineChart=new o.default.Chart("chartLine",{credits:{text:"onenewcare.com"},chart:{type:"line"},title:{text:""},xAxis:{categories:this.xData},yAxis:{title:{text:"分数"}},plotOptions:{line:{dataLabels:{enabled:!0},enableMouseTracking:!1}},series:this.seriesData})},drawHistogramChart:function(){this.HistogramChart=new o.default.Chart("chartHistogram",{credits:{text:"onenewcare.com"},chart:{type:"column"},title:{text:""},xAxis:{categories:this.cpXData,crosshair:!0},yAxis:{min:0,title:{text:"分数"}},tooltip:{headerFormat:'<span style="font-size:10px">{point.key}</span><table>',pointFormat:'<tr><td style="color:{series.color};padding:0">{series.name}: </td><td style="padding:0"><b>{point.y:.1f} 分</b></td></tr>',footerFormat:"</table>",shared:!0,useHTML:!0},plotOptions:{column:{pointPadding:.2,borderWidth:0}},series:this.cpSeriesData})},drawCharts:function(){this.seriesData=[{name:"初始状态",data:[]}],this.xData=["课程名称"],this.drawLineChart(),this.cpSeriesData=[{name:"初始状态",data:[]}],this.cpXData=["课程名称"],this.drawHistogramChart()},getPacientList:function(n){this.patientIDs=this.groups[n].groupPatients},toSelectCourse:function(){this.courseID=null;for(var n=this.packageData,t=0;t<n.length;t++)n[t].ID===this.packageID&&(this.courseData=n[t].Courses)},refreshEcharts:function(){var n=this,t={PatientAgentID:this.patientID,PackageID:this.packageID,CourseID:this.courseID};i.default.echartPackage(t).then(function(t){0===t.data.List.length?n.$message.warning("该患者未完成评测"):(n.dataReset(),n.dataProcessing(t.data.List))}).catch(function(t){n.$message.error("网络错误，请重试")})},dataReset:function(){this.xData=[],this.titleData=[],this.seriesData=[],this.cpXData=[],this.cpSeriesData=[]},dataProcessing:function(n){var t=[];n[0].History.forEach(function(n,e){var a="第"+String(e+1)+"次评测";t.push(a)}),this.titleData=t;var e=[];n.map(function(n){e.push(n.Name)}),this.xData=e;for(var a=this.titleData.length,s=[],i=function(t){var e={name:"第"+String(t+1)+"次评测",data:[]};n.map(function(n){var a=n.History[t].Score;e.data.push(a)}),s.push(e)},r=0;r<a;r++)i(r);this.seriesData=s,this.drawLineChart()},parseHistogramData:function(n){for(var t=n[0].ExamData.map(function(n){return n.Name}),e=n.map(function(n){return n.PatientAgentID}),a=this.selectPatientList,s=0;s<a.length;s++)for(var i=0;i<e.length;i++)e[s]===a[i].ID&&(e[s]=a[i].Name);for(var r=[],o=function(t){var a={name:e[t],data:[]};n[t].ExamData.map(function(n){var t=n.History[0].Score;a.data.push(t)}),r.push(a)},l=0;l<n.length;l++)o(l);this.cpSeriesData=r,this.cpXData=t,this.drawHistogramChart()},submitCompate:function(){var n=this,t=this.selectPatientList.map(function(n){return n.ID}),e={ExamID:this.testPaperID,PackageID:this.packageID,CourseID:this.courseID,PatientAgentIDs:t};i.default.comparePatient(e).then(function(t){var e=t.data.List,a=void 0;e.map(function(n){if(0===n.ExamData.length)return void(a=!0)}),a?n.$message.warning("患者未完成评测"):(n.dataReset(),n.parseHistogramData(e))}).catch(function(t){n.$message.error("网络错误，请重试")})}},created:function(){var n=this;i.default.requestCourseList().then(function(t){n.packageData=t.List});var t={PageIndex:1,PageSize:100};i.default.requestTestList(t).then(function(t){n.testPaperListData=t.Records}),this.getPacientList(0)},mounted:function(){this.drawCharts()},updated:function(){this.drawCharts()}}},357:function(n,t,e){t=n.exports=e(3)(),t.push([n.id,".dataAnalysisBox[data-v-44597e40]{width:100%;height:626px;position:absolute}.slidebarOne[data-v-44597e40]{width:94px;height:626px;position:absolute;border-right:1px solid #efefef;background-color:#eeeff0}.slidebarOne li[data-v-44597e40]{width:93px;height:40px;text-align:center;line-height:40px;cursor:pointer}.contentOne[data-v-44597e40]{width:1186px;height:626px;position:absolute;left:94px}.slidebarOne .active[data-v-44597e40]{color:#48c4fc;border-left:4px solid #48c4fc;background-color:#feffff}.center-content[data-v-44597e40]{width:100%;height:626px;padding:5px 20px}.chart-container[data-v-44597e40]{width:100%;height:572px}.el-row[data-v-44597e40]{margin-bottom:10px}.el-row[data-v-44597e40]:last-child{margin-bottom:0}.el-col[data-v-44597e40]{border-radius:4px}.grid-content[data-v-44597e40]{border-radius:4px;min-height:36px;line-height:36px}.row-bg[data-v-44597e40]{padding:10px 0;background-color:#f9fafc}.choseTitle[data-v-44597e40]{height:36px;line-height:36px;margin:0 5px;font-size:14px;font-weight:700}","",{version:3,sources:["C:/Users/Administrator/Desktop/iep0207/iep/src/pages/DataAnalysis/DataAnalysis.vue"],names:[],mappings:"AAgdA,kCACI,WAAY,AACZ,aAAc,AACd,iBAAkB,CACrB,AACD,8BACI,WAAY,AACZ,aAAc,AACd,kBAAmB,AACnB,+BAAgC,AAChC,wBAA0B,CAC7B,AACD,iCACI,WAAY,AACZ,YAAa,AACb,kBAAmB,AACnB,iBAAkB,AAClB,cAAgB,CACnB,AACD,6BACI,aAAc,AACd,aAAc,AACd,kBAAmB,AACnB,SAAW,CACd,AACD,sCACI,cAAe,AACf,8BAA+B,AAC/B,wBAA0B,CAC7B,AACD,iCACI,WAAY,AACZ,aAAc,AACd,gBAAkB,CACrB,AACD,kCACI,WAAY,AACZ,YAAc,CACjB,AACD,yBACI,kBAAoB,CACvB,AACD,oCACI,eAAiB,CACpB,AACD,yBACI,iBAAmB,CACtB,AAUD,+BACI,kBAAmB,AACnB,gBAAiB,AACjB,gBAAkB,CACrB,AACD,yBACI,eAAgB,AAChB,wBAA0B,CAC7B,AACD,6BACI,YAAa,AACb,iBAAkB,AAClB,aAAc,AACd,eAAgB,AAChB,eAAkB,CACrB",file:"DataAnalysis.vue",sourcesContent:["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/*@import '../../../src/assets/css/template/print.css';*/\n.dataAnalysisBox[data-v-44597e40] {\n    width: 100%;\n    height: 626px;\n    position: absolute\n}\n.slidebarOne[data-v-44597e40] {\n    width: 94px;\n    height: 626px;\n    position: absolute;\n    border-right: 1px solid #EFEFEF;\n    background-color: #EEEFF0;\n}\n.slidebarOne li[data-v-44597e40] {\n    width: 93px;\n    height: 40px;\n    text-align: center;\n    line-height: 40px;\n    cursor: pointer;\n}\n.contentOne[data-v-44597e40] {\n    width: 1186px;\n    height: 626px;\n    position: absolute;\n    left: 94px;\n}\n.slidebarOne .active[data-v-44597e40] {\n    color: #48C4FC;\n    border-left: 4px solid #48C4FC;\n    background-color: #FEFFFF;\n}\n.center-content[data-v-44597e40] {\n    width: 100%;\n    height: 626px;\n    padding: 5px 20px;\n}\n.chart-container[data-v-44597e40] {\n    width: 100%;\n    height: 572px;\n}\n.el-row[data-v-44597e40] {\n    margin-bottom: 10px;\n}\n.el-row[data-v-44597e40]:last-child {\n    margin-bottom: 0;\n}\n.el-col[data-v-44597e40] {\n    border-radius: 4px;\n}\n.bg-purple-dark[data-v-44597e40] {\n    /*background: #99a9bf;*/\n}\n.bg-purple[data-v-44597e40] {\n    /*background: #d3dce6;*/\n}\n.bg-purple-light[data-v-44597e40] {\n    /*background: #e5e9f2;*/\n}\n.grid-content[data-v-44597e40] {\n    border-radius: 4px;\n    min-height: 36px;\n    line-height: 36px;\n}\n.row-bg[data-v-44597e40] {\n    padding: 10px 0;\n    background-color: #f9fafc;\n}\n.choseTitle[data-v-44597e40] {\n    height: 36px;\n    line-height: 36px;\n    margin: 0 5px;\n    font-size: 14px;\n    font-weight: bold;\n}\n"],sourceRoot:""}])},430:function(n,t,e){var a=e(357);"string"==typeof a&&(a=[[n.id,a,""]]);e(4)(a,{});a.locals&&(n.exports=a.locals)},534:function(n,t,e){e(430);var a=e(1)(e(228),e(615),"data-v-44597e40",null);n.exports=a.exports},615:function(n,t){n.exports={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"dataAnalysisBox"},[e("div",{staticClass:"slidebarOne"},n._l(n.tabData,function(t,a){return e("li",{staticClass:"pacientLink",class:{active:n.currentTab===a},on:{click:function(t){n.toggleTab(a)}}},[n._v("\n            "+n._s(t)+"\n        ")])})),n._v(" "),e("div",{staticClass:"contentOne"},[e("div",{directives:[{name:"show",rawName:"v-show",value:0===n.currentTab,expression:"currentTab === 0"}],staticClass:"tab-content"},[e("div",{staticClass:"center-content"},[e("el-row",{attrs:{gutter:20}},[e("el-col",{attrs:{span:5}},[e("div",{staticClass:"grid-content bg-purple"},[e("el-select",{attrs:{placeholder:"请选择患者组"},on:{change:n.getPacientList},model:{value:n.groupValue,callback:function(t){n.groupValue=t},expression:"groupValue"}},n._l(n.groups,function(n,t){return e("el-option",{key:n.groupName,attrs:{label:n.groupName,value:t}})}))],1)]),n._v(" "),e("el-col",{attrs:{span:5}},[e("el-select",{attrs:{placeholder:"请选择患者"},model:{value:n.patientID,callback:function(t){n.patientID=t},expression:"patientID"}},n._l(n.patientIDs,function(n,t){return e("el-option",{key:n.ID,attrs:{label:n.Name,value:n.ID}})}))],1),n._v(" "),e("el-col",{attrs:{span:5}},[e("div",{staticClass:"grid-content bg-purple"},[e("el-select",{attrs:{placeholder:"请选择课程包"},on:{change:n.toSelectCourse},model:{value:n.packageID,callback:function(t){n.packageID=t},expression:"packageID"}},n._l(n.packageData,function(n,t){return e("el-option",{attrs:{label:n.Name,value:n.ID}})}))],1)]),n._v(" "),e("el-col",{attrs:{span:5}},[e("div",{staticClass:"grid-content bg-purple"},[e("el-select",{attrs:{placeholder:"请选择课程"},model:{value:n.courseID,callback:function(t){n.courseID=t},expression:"courseID"}},n._l(n.courseData,function(n,t){return e("el-option",{attrs:{label:n.Name,value:n.ID}})}))],1)]),n._v(" "),e("el-col",{attrs:{span:4}},[e("div",{staticClass:"grid-content bg-purple"},[e("el-button",{on:{click:n.refreshEcharts}},[n._v("确定")])],1)])],1),n._v(" "),n._m(0)],1)]),n._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:1===n.currentTab,expression:"currentTab === 1"}],staticClass:"tab-content"},[e("div",{staticClass:"center-content"},[e("el-row",{attrs:{gutter:20}},[e("el-col",{attrs:{span:3}},[e("p",{staticClass:"choseTitle"},[n._v("请添加对比患者：")])]),n._v(" "),e("el-col",{attrs:{span:5}},[e("div",{staticClass:"grid-content bg-purple"},[e("el-select",{attrs:{placeholder:"请选择患者组"},on:{change:n.getPacientList},model:{value:n.groupValue,callback:function(t){n.groupValue=t},expression:"groupValue"}},n._l(n.groups,function(n,t){return e("el-option",{key:n.groupName,attrs:{label:n.groupName,value:t}})}))],1)]),n._v(" "),e("el-col",{attrs:{span:5}},[e("el-select",{attrs:{placeholder:"请选择患者"},model:{value:n.patientID,callback:function(t){n.patientID=t},expression:"patientID"}},n._l(n.patientIDs,function(n,t){return e("el-option",{key:n.ID,attrs:{label:n.Name,value:n.ID}})}))],1)],1),n._v(" "),e("el-row",[e("el-col",{attrs:{span:3}},[e("p",{staticClass:"choseTitle"},[n._v("请选择比较课程：")])]),n._v(" "),e("el-col",{attrs:{span:5}},[e("div",{staticClass:"grid-content bg-purple"},[e("el-select",{attrs:{placeholder:"请选择评估表"},on:{change:n.toSelectCourse},model:{value:n.testPaperID,callback:function(t){n.testPaperID=t},expression:"testPaperID"}},n._l(n.testPaperListData,function(n,t){return e("el-option",{attrs:{label:n.Name,value:n.ID}})}))],1)]),n._v(" "),e("el-col",{attrs:{span:5}},[e("div",{staticClass:"grid-content bg-purple"},[e("el-select",{attrs:{placeholder:"请选择课程包"},on:{change:n.toSelectCourse},model:{value:n.packageID,callback:function(t){n.packageID=t},expression:"packageID"}},n._l(n.packageData,function(n,t){return e("el-option",{attrs:{label:n.Name,value:n.ID}})}))],1)]),n._v(" "),e("el-col",{attrs:{span:5}},[e("div",{staticClass:"grid-content bg-purple"},[e("el-select",{attrs:{placeholder:"请选择课程"},model:{value:n.courseID,callback:function(t){n.courseID=t},expression:"courseID"}},n._l(n.courseData,function(n,t){return e("el-option",{attrs:{label:n.Name,value:n.ID}})}))],1)])],1),n._v(" "),e("el-row",{staticStyle:{background:"rgba(238, 239, 240, 1)"}},[e("el-col",{attrs:{span:13}},[e("span",{staticClass:"choseTitle"},[n._v("对比患者：")]),n._v(" "),n._l(n.selectPatientList,function(t,a){return e("el-tag",{staticStyle:{margin:"6px 2px"},attrs:{closable:!0,type:"primary"},on:{close:function(e){n.handleClose(t)}}},[n._v(n._s(t.Name))])})],2),n._v(" "),e("el-col",{attrs:{span:7}},[e("span",{staticClass:"choseTitle"},[n._v("已选课程：")]),n._v(" "),e("el-tag",{directives:[{name:"show",rawName:"v-show",value:null!==n.courseName&&n.courseName.length>0,expression:"courseName !== null && courseName.length > 0"}],staticStyle:{margin:"6px 2px"},attrs:{type:"warning"}},[n._v(n._s(n.courseName))])],1),n._v(" "),e("el-col",{attrs:{span:4}},[e("div",{staticClass:"grid-content bg-purple"},[e("el-button",{staticStyle:{"margin-left":"100px"},attrs:{size:"mini"},on:{click:n.submitCompate}},[n._v("确定")])],1)])],1),n._v(" "),e("div",{staticStyle:{width:"100%",height:"485px"},attrs:{id:"chartHistogram"}})],1)])])])},staticRenderFns:[function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"chart-container"},[e("div",{staticStyle:{width:"100%",height:"565px"},attrs:{id:"chartLine"}})])}]}}});
//# sourceMappingURL=6.4e76d5f0f0921d69b4c3.js.map