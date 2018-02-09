<template>
    <div>
        <el-row :gutter="20">
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
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <el-button @click="refreshEcharts">确定</el-button>
                </div>
            </el-col>
        </el-row>

        <div class="chart-container">
            <div id="chartLine" style="width:100%; height:565px;"></div>
        </div>
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
                packageID: null, // 选中的packageID
                packageData: [], // package的数据源
                courseID: null, //选中的课程ID
                courseData: [], // 课程的数据源
                xData: [],
                titleData: [],
                seriesData: [],

            }
        },
        computed: {
            groups: function () {
                return this.$store.state.mystudent.patientList;
            }
        },
        watch: {
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
            refreshEcharts() {
                let params = {
                    PatientAgentID: this.patientID,
                    PackageID: this.packageID,
                    CourseID: this.courseID
                }
                api.echartPackage(params)
                    .then(res => {
                        if (res.data.List.length === 0) {
                            this.$message.warning('该患者未完成评测')
                        } else {
                            this.dataReset();
                            this.dataProcessing(res.data.List);
                        }
                    })
                    .catch(err => {
                        this.$message.error('网络错误，请重试')
                    })
            },
            drawCharts() {
                this.seriesData = [{
                    name: '初始状态',
                    data: []
                }];
                this.xData = ['课程名称'];
                this.drawLineChart();
            },
            drawLineChart() {
                this.lineChart = new Highcharts.Chart('chartLine', {
                    credits: {
                        text: 'onenewcare.com',
                    },
                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        categories: this.xData
                    },
                    yAxis: {
                        title: {
                            text: '分数'
                        }
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: true // 开启数据标签
                            },
                            enableMouseTracking: false // 关闭鼠标跟踪，对应的提示框、点击事件会失效
                        }
                    },
                    series: this.seriesData
                });
            },
            dataReset() {
                this.xData = [];
                this.titleData = [];
                this.seriesData = [];
            },
            dataProcessing(arr) {
                let titleArr = []
                arr[0].History.forEach(function (ele, index) {
                    let str = '第' + String(index + 1) + '次评测';
                    titleArr.push(str);
                })
                this.titleData = titleArr;

                let xData = [];
                arr.map(ele => {
                    xData.push(ele.Name)
                })
                this.xData = xData

                let length = this.titleData.length;
                let bigData = []

                for (let i = 0; i < length; i++) {
                    let obj = {
                        name: '第' + String(i + 1) + '次评测',
                        data: []
                    }
                    arr.map(function (ele) {
                        let score = ele.History[i].Score
                        obj.data.push(score)
                    })
                    bigData.push(obj)
                }
                this.seriesData = bigData;
                this.drawLineChart();
            },
        },
        created() {
            api.requestCourseList().then(res => {
                this.packageData = res.List;
            });
            this.getPacientList(0) //默认选中第一组患者
        },
        mounted: function () {
            // this.drawCharts()
        },
        updated: function () {
            // this.drawCharts()
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
