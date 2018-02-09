<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="3">
                <p class="choseTitle">请添加对比患者：</p>
            </el-col>
            <el-col :span="5">
                <div class="grid-content bg-purple">
                    <el-select v-model="groupValue" placeholder="请选择患者组" @change="getPacientList">
                        <el-option v-for="(item, index) in groups" :key="item.groupName" :label="item.groupName" :value="index">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="5">
                <el-select v-model="patientID" placeholder="请选择患者">
                    <el-option v-for="(item, index) in patientIDs" :key="item.ID" :label="item.Name" :value="item.ID">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="3">
                <p class="choseTitle">请选择比较课程：</p>
            </el-col>
            <el-col :span="5">
                <div class="grid-content bg-purple">
                    <el-select v-model="testPaperID" placeholder="请选择评估表" @change="toSelectCourse">
                        <el-option v-for="(o,index) in testPaperListData" :label="o.Name" :value="o.ID"></el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="grid-content bg-purple">
                    <el-select v-model="packageID" placeholder="请选择课程包" @change="toSelectCourse">
                        <el-option v-for="(o,index) in packageData" :label="o.Name" :value="o.ID"></el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="grid-content bg-purple">
                    <el-select v-model="courseID" placeholder="请选择课程">
                        <el-option v-for="(o,index) in courseData" :label="o.Name" :value="o.ID"></el-option>
                    </el-select>
                </div>
            </el-col>

        </el-row>

        <el-row style="background: rgba(238, 239, 240, 1)">
            <el-col :span="13">
                <span class="choseTitle">对比患者：</span>
                <el-tag :closable="true" v-for="(ele, index) in selectPatientList" type="primary" style="margin: 6px 2px" @close="handleClose(ele)">{{ ele.Name }}</el-tag>
            </el-col>
            <el-col :span="7">
                <span class="choseTitle">已选课程：</span>
                <el-tag v-show="courseName !== null && courseName.length > 0" style="margin: 6px 2px" type="warning">{{ courseName }}</el-tag>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <el-button @click="submitCompate" size="mini" style="margin-left: 100px">确定</el-button>
                </div>
            </el-col>
        </el-row>
        <div id="chartHistogram" style="width:100%; height:485px;"></div>
    </div>
</template>
<script>
    import api from '../../../api/index.js'
    import Highcharts from 'highcharts/highcharts'
    export default {
        name: 'dataAnalysisHistory',
        data() {
            return {
                groupValue: '',
                patientID: null, // 选中的患者ID
                patientIDs: [],
                packageData: [], // package的数据源
                courseData: [], // 课程的数据源
                packageID: null, // 选中的packageID
                courseID: null, //选中的课程ID
                cpXData: [], //x轴数据
                cpTitleData: [], //线名
                cpSeriesData: [], //多条线的数据组
                selectPatientList: [], //选择要对比的患者对象 id name
                testPaperListData: [], //评估表的数据源
                testPaperID: null, // 评估表ID
                courseName: null

            }
        },
        watch: {
            patientID: function () {
                if (this.selectPatientList.length === 0) {
                    this.reflexName(this.patientID);
                } else {
                    let foo = this.patientID
                    let bar = this.selectPatientList.map(function (ele) {
                        return ele.ID;
                    });
                    if (bar.indexOf(foo) === -1) {
                        this.reflexName(this.patientID);
                    } else {
                        this.$message.warning('重复选择');
                    }
                }
            },
            courseID: function () {
                let cID = this.courseID
                let _this = this;
                _this.packageData.map(function (ele) {
                    ele.Courses.map(function (item) {
                        if (item.ID === cID) {
                            _this.courseName = item.Name;
                        }
                    })
                })
            }

        },
        computed: {
            groups: function () {
                return this.$store.state.mystudent.patientList;
            }
        },
        methods: {
            getPacientList(value) {
                this.patientIDs = this.groups[value].groupPatients;
            },
            toSelectCourse() {
                this.courseID = null; //清空选择的课程
                let arr = this.packageData;
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].ID === this.packageID) {
                        this.courseData = arr[i].Courses;
                    }
                }
            },
            reflexName(id) {
                let _this = this;
                _this.groups.map(function (ele) {
                    ele.groupPatients.map(function (item) {
                        if (item.ID === _this.patientID) {
                            let obj = {
                                ID: item.ID,
                                Name: item.Name
                            }
                            _this.selectPatientList.push(obj);
                        }
                    })
                })
            },
            handleClose(tag) {
                this.selectPatientList.splice(this.selectPatientList.indexOf(tag), 1);
            },
            drawHistogramChart() {
                this.HistogramChart = new Highcharts.Chart('chartHistogram', {
                    credits: {
                        text: 'onenewcare.com'
                    },
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        categories: this.cpXData,
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: '分数'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:.1f} 分</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    series: this.cpSeriesData
                });
            },
            dataReset() {
                this.titleData = [];
                this.cpXData = [];
                this.cpSeriesData = [];
            },
            parseHistogramData(histogramData) {
                let cpXdata = histogramData[0].ExamData.map(function (ele) {
                    return ele.Name
                })

                let cpTitleData = histogramData.map(function (ele) {
                    return ele.PatientAgentID
                })
                let arr = this.selectPatientList;
                for (let i = 0; i < arr.length; i++) {
                    for (let j = 0; j < cpTitleData.length; j++) {
                        if (cpTitleData[i] === arr[j].ID) {
                            cpTitleData[i] = arr[j].Name;
                        }
                    }
                }
                let cpSeriesData = []
                for (let i = 0; i < histogramData.length; i++) {
                    let obj = {
                        name: cpTitleData[i],
                        data: []
                    }
                    histogramData[i].ExamData.map(function (ele) {
                        let score = ele.History[0].Score
                        obj.data.push(score)
                    })
                    cpSeriesData.push(obj)
                }
                this.cpSeriesData = cpSeriesData;
                this.cpXData = cpXdata;
                this.drawHistogramChart();
            },
            submitCompate() {
                let selectPatientIDs = this.selectPatientList.map(function (ele) {
                    return ele.ID;
                })
                let params = {
                    ExamID: this.testPaperID,
                    PackageID: this.packageID,
                    CourseID: this.courseID,
                    PatientAgentIDs: selectPatientIDs
                }
                api.comparePatient(params)
                    .then(res => {
                        let resourseData = res.data.List;
                        //判断提示
                        let isEmplty;
                        resourseData.map(function (ele) {
                            if (ele.ExamData.length === 0) {
                                isEmplty = true;
                                return
                            }
                        })
                        if (isEmplty) {
                            this.$message.warning('患者未完成评测');
                        } else {
                            this.dataReset();
                            this.parseHistogramData(resourseData);
                        }
                    })
                    .catch(err => {
                        this.$message.error('网络错误，请重试')
                    })
            }
        },
        created() {
            api.requestCourseList().then(res => {
                this.packageData = res.List;
            });
            let params = {
                PageIndex: 1,
                PageSize: 100
            };
            api.requestTestList(params).then(res => {
                this.testPaperListData = res.Records
            });
            this.getPacientList(0) //默认选中第一组患者
        }
    }

</script>
<style scoped>
    .chart-container {
        width: 100%;
        height: 572px;
    }

    .el-row {
        margin-bottom: 10px;
    }

    .el-row:last-child {
        margin-bottom: 0;
    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        /*background: #99a9bf;*/
    }

    .bg-purple {
        /*background: #d3dce6;*/
    }

    .bg-purple-light {
        /*background: #e5e9f2;*/
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        line-height: 36px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

    .choseTitle {
        height: 36px;
        line-height: 36px;
        margin: 0 5px;
        font-size: 14px;
        font-weight: bold;
    }

</style>
