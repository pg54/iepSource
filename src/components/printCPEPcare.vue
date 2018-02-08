<template>
    <div class="cpepTemplate">
        <table class="tg" v-loading.fullscreen.lock="cpeploading">
            <thead>
                <tr>
                    <th class="tg-baqh" colspan="4">任务项目</th>
                    <th class="tg-baqh" colspan="7">实施方法</th>
                    <th class="tg-baqh" colspan="7">评分</th>
                </tr>
            </thead>
            <template v-for="(unit, indexU) in submitData">
                <tr>
                    <td class="tg-yw4l leftAlign bondText" colspan="24" style="font-size: 18px; text-align: center;">{{unit.material}}</td>
                </tr>
                <template v-for="(ele, indexE) in unit.sameArr">
                    <tr>
                        <td class="tg-yw4l" colspan="4">{{ele.Number}}:{{ele.Name}}</td>
                        <td class="tg-yw4l" colspan="7">{{ ele.Description}}</td>
                        <td class="tg-yw4l" colspan="7">
                            <p v-for="item in ele.Options" class="optionBox">
                                <input  type="radio" :value="item.Option" :id="item.ID" class="radioclass" 
                                v-model="ele.Result" :disabled="isResultPage || ele.Unselect"
                                @change='checkChange($event,ele.Number)'
                                @click="changeCheckStatus($event, ele.Number,indexU, indexE)">
                                <label :for="item.ID" class="simbleBox"></label>
                                <label :for="item.ID" class="clickLabel">
                                    <span>{{item.Option}}:&nbsp;&nbsp;{{item.Description}}</span>
                                </label>
                            </p>
                        </td>
                    </tr>
                </template>
            </template>
        </table>
        <div class="submitBox" v-if="!isResultPage" v-bind:class="{narrowSubmitBox : narrow}">
            <el-button type="primary" @click.native="submitResultContent">提交测试</el-button>
        </div>
    </div>
</template>

<script>
    import api from '../api/index.js';
    export default {
        name: 'CPEPselfCare',
        props: ['cpepData', 'isResultPage'],
        data() {
            return {
                frstMaterialType: '',
                selectedChoses: [],
                numberIndex: 1,
                resultData: [],
                narrow: false,
                copyData: [],
                interval: null,
                cpeploading: false,
                checkedChanged: false,
            }
        },
        computed: {
            submitData: function () {
                let arr = this.cpepData.map(function (ele) {
                    return ele.MaterialType;
                }).filter(function (element, index, arr) {
                    return arr.indexOf(element) === index;
                }).map(function (ele) {
                    let sameMaterial = []
                    let obj = {
                        material: ele,
                        sameArr: sameMaterial
                    }
                    return obj
                });
                this.cpepData.forEach(function (ele) {
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i].material === ele.MaterialType) {
                            arr[i].sameArr.push(ele)
                        }
                    }
                })
                return arr
            },
            totalQuestion: function () {
                return this.cpepData.length;
            },
            resultPaperID: function () {
                return this.cpepPaperID
            }
        },
        methods: {
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
            submitResultContent() {
                this.resultData = [];
                this.getChosedQuestion(this.copyData)
                let nowNumber = this.resultData.length;
                let lastNumber = this.totalQuestion - nowNumber;
                if (lastNumber === 0) {
                    this.cpeploading = true;
                    this.postQuestionResult()
                } else {
                    this.$confirm(`剩余${lastNumber}道问题未选择，如点击确认，未选择问题将默认提交,`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.cpeploading = true;
                        this.postQuestionResult()
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交'
                        });
                    });
                }
            },
            postQuestionResult() {
                let params;
                if (this.isFirstTimeTest) {
                     params = {
                        PatientAgentID: this.pacientID,
                        PaperID: this.resultPaperID,
                        Result: this.resultData,
                    }
                } else {
                     params = {
                         MemberID: this.cpepMemberID,
                         PaperID: this.resultPaperID,
                         Result: this.resultData,
                    }
                }
                api.postCPEPResult(params).then(res => {
                    if (res.data.Status) {
                        this.cpeploading = false;
                        this.$message.success(res.data.Msg)
                    } else {
                        this.$message.error(res.data.Msg)
                    }
                })
            },
            getChosedQuestion(arr) {
                for (let ele in arr) {
                    for (let item in arr[ele].sameArr) {
                        if ( arr[ele].sameArr[item].Result ) {
                            this.resultData.push({
                                Result: arr[ele].sameArr[item].Result,
                                QuestionID: arr[ele].sameArr[item].ID
                            })
                        }
                    }
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
        },
        created() {
            if (window.innerHeight < 768) {
                this.narrow = true;
            } else {
                this.narrow = false;
            }
        },
        mounted() {
            window.onresize = () => {
                return (() => {
                    if (window.innerHeight < 768) {
                        this.narrow = true;
                    } else {
                        this.narrow = false;
                    }
                })()
            }
        },
        beforeDestroy() {
        }
    }

</script>
<style scoped>
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
        vertical-align: middle;
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
        font-size: 20px;
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
