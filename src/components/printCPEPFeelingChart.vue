<template>
    <div class="paperform-form">
        <el-row :gutter="20" v-show="setContent">
            <el-col :span="4" :offset="20">
                <el-button id="createImg" type="info" @click.native="test">确认图表</el-button>
            </el-col>
        </el-row>
        <div id='canvasArea'>
            <p style="font-size: 24px; font-weight: bold;text-align: center">感觉统合评定量表</p>
            <div style="border: 1px solid #cccccc;padding: 10px;">
                <p>儿童信息</p>
                <p class="infolist">
                    <span class="listdetail">姓名：{{ patientName }}</span>
                    <span class="listdetail">年龄：{{ patientBirthday }}</span>
                </p>
                <p class="infolist">
                    <span class="listdetail">详细地址：</span>
                    <span class="listdetail">上学情况：</span>
                </p>
                <p class="infolist">
                    <span class="listdetail">评估人：</span>
                    <span class="listdetail">评估时间：</span>
                </p>
            </div>
            <div id="canvasWrap" style="border: 1px solid #cccccc;padding: 10px;">
                <p>感觉统合评定量表-历史记录</p>
                <div id="chartLine" style="width:100%; height:265px;"></div>
            </div>
            <div style="border: 1px solid #cccccc;padding: 10px;">
                <p>评定结果：</p>
                <p class="infolist">
                    <span class="listdetail">功能区</span>
                    <span class="listdetail">总得分</span>
                    <span class="listdetail">标准分</span>
                    <span class="listdetail">评价</span>
                </p>
                <template v-for="ele in cpepData">
                    <p class="infolist">
                        <span class="listdetail">{{ ele.Name }}</span>
                        <span class="listdetail">{{ ele.RealScore }}</span>
                        <span class="listdetail">{{ ele.StandardScore }}</span>
                        <span class="listdetail">{{ ele.Level }}</span>
                    </p>
                </template>
            </div>
            <div style="border: 1px solid #cccccc;padding: 10px;">
                <p>评定结果：</p>
                <p class="infolist">
                    <span class="listdetail longlist">评估机构：深圳市一新儿童康复服务有限公司</span>
                    <span class="listdetail longlist">评估时间：</span>
                </p>
                <p class="infolist">
                    <span class="listdetail longlist">家长签名：</span>
                    <span class="listdetail longlist">评估师签名：</span>
                </p>
            </div>
            
        </div>
    </div>
</template>


<script>
    import api from '../api/index.js';
    import html2canvas from 'html2canvas';
    import dom2img from 'dom-to-image';
    import Highcharts from 'highcharts/highcharts';
    export default {
        name: 'CPEPFeeling',
        props: ['cpepData', 'isResultPage', 'setContent'],
        data() {
            return {
                frstMaterialType: '',
                selectedChoses: [],
                numberIndex: 1,
                resultData: [],
                narrow: false,
                copyData: [],
                cpeploading: false,
                checkedChanged: false,
            }
        },
        computed: {
            patientName: function () {
                return this.$store.state.mystudent.currentPatientInfo.Name;
            },
            patientSex: function () {
                return this.$store.state.mystudent.currentPatientInfo.Sex;
            },
            patientBirthday: function () {
                return this.$store.state.mystudent.currentPatientInfo.BirthDate.split(' ')[0];
            },
            totalQuestion: function () {
                return this.cpepData.length;
            },
            categoriesData: function () {
                let a = this.cpepData.map(ele => ele.Name)
                return a
            },
            seriesData: function () {
                let a = this.cpepData.map(ele => ele.StandardScore)
                return [{name: '本次评估', data: a}]
            }
                
        },
        methods: {
            calcData(arr) {
                return arr.map(function(ele){
                    let score = ele.sameArr.reduce(function(sum, ele) {
                        return sum + Number(ele.Result);
                    }, 0);
                    let sScore;
                    return {material: ele.material, totalScore: score}
                })
            },
            selectOption(id, option) {
                if (!this.checkInResultData(id)) {
                    let obj = {
                        Result: option,
                        QuestionID: id
                    }
                    this.resultData.push(obj)
                }
            },
            checkInResultData(id) {
                let arr = this.resultData
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].QuestionID === id) {
                        return true
                    } else {
                        return false
                    }
                }
            },
            setNowMaterialType(param) {
                if (param.MaterialType === this.frstMaterialType) {
                    return true
                } else {
                    this.frstMaterialType = param.MaterialType;
                    return false;
                }
            },
            //取消选中
            checkChange(ev, number) {
                //checked状态
                this.checkedChanged = true;
            },
            changeCheckStatus(ev, number, indexU, indexE) {
                let _this = this
                window.setTimeout(() => {
                    if (!_this.checkedChanged) {
                        //未checked状态
                        ev.target.checked = false
                        _this.copyData[indexU].sameArr[indexE].Result = ''
                    }
                    _this.checkedChanged = false
                }, 0)
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
                        categories: this.categoriesData
                    },
                    yAxis: {
                        title: {
                            text: '分数'
                        }
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: true          // 开启数据标签
                            },
                            enableMouseTracking: false // 关闭鼠标跟踪，对应的提示框、点击事件会失效
                        }
                    },
                    series: this.seriesData
                });
            },
            createdLastImg() {
                    let _this = this;
                    var p = document.getElementsByClassName("paperform-form")[0]
                    var c = document.getElementById('canvasArea');
                    let i = p.children[1].tagName;
                    if (i === 'IMG') {
                        _this.$message.warning('图表已经生成')
                    } else {
                        dom2img.toPng(c, { quality: 1 })
                            .then(function (dataUrl) {
                                p.removeChild(c);
                                var img = new Image();
                                img.src = dataUrl;
                                p.appendChild(img);
                                _this.$message.success('图表生成成功')
                            })
                            .catch(function (error) {
                                console.error('oops, something went wrong!', error);
                            });
                    }
            },
            test() {
                this.createdLastImg();
            }
        },
        created() {
        },
        beforeUpdate() {
        },
        updated() {
            this.drawLineChart();
        },
        beforeMount() {
        },
        mounted() {
            this.drawLineChart();
            
        },
        beforeDestroy() {}
    }
</script>
<style scoped>
    .infolist {
        width: 94%;margin: 0 auto;display: flex;justify-content: space-between;
    }
    .listdetail {
        display: inline-block;
        width: 120px;
        text-align: right;
        margin-right: 60px;
    }
    .longlist {
        width: 260px;
        text-align: left;
    }
    .tg {
        border-collapse: collapse;
        border-spacing: 0;
    }

    .tg td {
        font-family: Arial, sans-serif;
        font-size: 14px;
        padding: 10px 5px;
        border-style: solid;
        border-width: 1px;
        overflow: hidden;
        word-break: normal;
    }

    .tg th {
        font-family: Arial, sans-serif;
        font-size: 14px;
        font-weight: normal;
        padding: 10px 5px;
        border-style: solid;
        border-width: 1px;
        overflow: hidden;
        word-break: normal;
    }

    .tg .tg-baqh {
        text-align: center;
        vertical-align: middle
    }

    .tg .tg-yw4l {
        text-align: left;
        vertical-align: top
    }

    .tg .tg-031e {
        text-align: left;
    }

    .tg .tg-8d8j {
        text-align: center;
        vertical-align: bottom
    }

    .leftAlign {
        text-align: left
    }

    .cpepTemplate {
        position: relative;
        width: 80%;
        margin: 10px auto
    }

    /* .onc-loading {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: hsla(0,0%,100%,.9);
        z-index: 1;
    }

    .onc-spin {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 50px;
        height: 50px;
        transform: translate(-50%,-50%)

    } */

    .bondText {
        font-weight: bold
    }

    .optionBox {
        position: relative;
        margin-bottom: 6px;
    }

    .radioclass {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        width: 18px;
        height: 18px;
        opacity: 0;
        cursor: pointer;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
        filter: alpha(opacity=0);
    }

    .simbleBox {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        width: 18px;
        height: 18px;
        cursor: pointer;
        background-image: url("../assets/images/serviceToolImg/默认选框.png");
    }

    .clickLabel {
        margin-left: 30px;
        display: inline-block;
        cursor: pointer;
        width: calc(100% - 60px);
    }

    input[type=radio]:checked+label {
        background-image: url("../assets/images/serviceToolImg/选中选框.png");
    }

    .submitBox {
        width: 100px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 20px;
        position: fixed;
        top: 685px;
        left: calc(50% + 510px);
    }

    .narrowSubmitBox {
        top: 90%;
    }

</style>
