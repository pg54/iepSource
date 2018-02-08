<template>
<div class="paperform-form">
    <el-row :gutter="20" v-show="setContent">
            <el-col :span="4" :offset="20">
                <el-button id="createImg" type="info" @click.native="test">确认图表</el-button>
            </el-col>
        </el-row>
    <div class="cpepTemplate">
        <p v-if="isResultPage" style="font-size: 12px;position: absolute;right: 0;top: 10px;"><span>编号：</span><span class="headTitle"></span></p>
        <p style="font-size: 20px; font-weight: bold;text-align: center">孤独症儿童自理能力测评（家长问卷）</p>
        <p style="font-size: 14px; font-weight: bold;text-align: left;margin: 16px 0 2px 0;" v-if="isResultPage">
                姓名：<span class="headTitle"></span>
                性别：<span class="headTitle"></span>
                年龄：<span class="headTitle"></span>
            </p>
        <table class="tg">
            <tr>
                <th class="tg-031e" colspan="2" rowspan="3">年龄</th>
                <th class="tg-s6z2" colspan="4" rowspan="3">发展部分</th>
                <th class="tg-s6z2" colspan="12" rowspan="3">发展项目</th>
                <th class="tg-s6z2" colspan="6">评定</th>
            </tr>
            <tr>
                <td class="tg-031e" colspan="2" rowspan="2">独立
                    <br>完成</td>
                <td class="tg-031e" colspan="2" rowspan="2">协助
                    <br>完成</td>
                <td class="tg-031e" colspan="2" rowspan="2">不能
                    <br>完成</td>
            </tr>
            <tr>
            </tr>
            <template v-for="(unit, indexU) in cpepData">

                    <template v-for="(type, indexT) in unit.TypeList">

                        <template v-if="indexT === 0">

                            <template v-for="(question, indexQ) in type.QuestionList">

                                <template v-if="indexQ === 0">
                                    <tr>
                                        <td class="tg-031e" colspan="2" :rowspan="unit.TypeList.reduce(function(sum,ele){return sum + ele.QuestionList.length},0)">{{ unit.Name }}</td>
                                        <td class="tg-031e" colspan="4" :rowspan="unit.TypeList[indexT].QuestionList.length">{{ type.Name }}</td>
                                        <td class="tg-031e" colspan="12" :class='{selected: question.Result}'>{{ question.Name }}</td>
                                        <template v-for="item in question.OptionList">
                                            <td class="tg-031e" colspan="2" :class='{selected: question.Result}'>
                                                <span class="optionBox">
                                                    <input  type="radio" :value="item.Option" :id="item.ID" class="radioclass" 
                                                    v-model="question.Result" :disabled="isResultPage || question.Unselect"
                                                    @change='checkChange($event)'
                                                    @click="changeCheckStatus($event,indexU, indexT, indexQ)">
                                                    <label :for="item.ID" class="simbleBox"></label>
                                                </span>
                                            </td>
                                        </template>
                                    </tr>
                                </template>
                                <template v-if="indexQ > 0">
                                    <tr>
                                        <td class="tg-031e" colspan="12" :class='{selected: question.Result}'>{{ question.Name }}</td>
                                        <template v-for="item in question.OptionList">
                                                <td class="tg-031e" colspan="2" :class='{selected: question.Result}'>
                                                    <span class="optionBox">
                                                        <input  type="radio" :value="item.Option" :id="item.ID" class="radioclass" 
                                                        v-model="question.Result" :disabled="isResultPage || question.Unselect"
                                                        @change='checkChange($event)'
                                                        @click="changeCheckStatus($event,indexU, indexT, indexQ)">
                                                        <label :for="item.ID" class="simbleBox"></label>
                                                    </span>
                                                </td>
                                            </template>
                                    </tr>
                                </template>
                            </template>
                        </template>
                        <template v-if="indexT > 0">
                            <template v-for="(question1, indexQ1) in type.QuestionList">
                                <template v-if="indexQ1 === 0">
                                    <tr>
                                        <td class="tg-031e" colspan="4" :rowspan="unit.TypeList[indexT].QuestionList.length">{{ type.Name }}</td>
                                        <td class="tg-031e" colspan="12" :class='{selected: question1.Result}'>{{ question1.Name }}</td>
                                        <template v-for="item in question1.OptionList">
                                                <td class="tg-031e" colspan="2" :class='{selected: question1.Result}'>
                                                    <span class="optionBox">
                                                        <input  type="radio" :value="item.Option" :id="item.ID" class="radioclass" 
                                                        v-model="question1.Result" :disabled="isResultPage || question1.Unselect"
                                                        @change='checkChange($event)'
                                                        @click="changeCheckStatus($event,indexU, indexT, indexQ1)">
                                                        <label :for="item.ID" class="simbleBox"></label>
                                                    </span>
                                                </td>
                                            </template>
                                    </tr>
                                </template>
                                <template v-if="indexQ1 > 0">
                                    <tr>
                                        <td class="tg-031e" colspan="12" :class='{selected: question1.Result}'>{{ question1.Name }}</td>
                                            <template v-for="item in question1.OptionList">
                                                <td class="tg-031e" colspan="2" :class='{selected: question1.Result}'>
                                                    <span class="optionBox">
                                                        <input  type="radio" :value="item.Option" :id="item.ID" class="radioclass" 
                                                        v-model="question1.Result" :disabled="isResultPage || question1.Unselect"
                                                        @change='checkChange($event)'
                                                        @click="changeCheckStatus($event,indexU, indexT, indexQ1)">
                                                        <label :for="item.ID" class="simbleBox"></label>
                                                    </span>
                                                </td>
                                            </template>
                                    </tr>
                                </template>
                            </template>
                        </template>
                    </template>
            </template>
        </table>

        <div class="submitBox" v-if="!isResultPage" v-bind:class="{narrowSubmitBox : narrow}">
            <el-button type="primary" @click.native="submitResultContent">提交测试</el-button>
        </div>
    </div>
</div>
    
</template>


<script>
    import api from '../api/index.js';
    import dom2img from 'dom-to-image';
    export default {
        name: 'CPEPselfCare',
        props: ['cpepData', 'pacientID', 'isResultPage', 'isFirstTimeTest', 'cpepMemberID', 'cpepPaperID', 'setContent'],
        data() {
            return {
                frstMaterialType: '',
                //difMaterialTypeEle: '',
                selectedChoses: [],
                numberIndex: 1,
                resultData: [],
                narrow: false,
                copyData: [],
                interval: null,
                cpeploading: false,
                checkedChanged: false,
                isFineshed: false
            }
        },
        computed: {
            totalQuestion: function () {
                return this.cpepData.reduce((sum, ele) => {return sum + ele.TypeList.reduce(function(sum,ele){return sum + ele.QuestionList.length},0)}, 0);
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
                this.resultData = [];  //已选中为空
                this.getChosedQuestion(this.cpepData)
                let nowNumber = this.resultData.length;
                let lastNumber = this.totalQuestion - nowNumber;
                if (lastNumber === 0) {
                    this.postQuestionResult()
                } else {
                    this.$confirm(`剩余${lastNumber}道问题未选择，如点击确认，未选择问题将默认提交,`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$confirm('是否已完成该儿童年龄内自理能力测评?', '提示', {
                            confirmButtonText: '已完成',
                            cancelButtonText: '未完成',
                            type: 'warning'
                        }).then(() => {
                            this.isFineshed = true;
                            this.postQuestionResult()
                            this.$message({
                                type: 'warning',
                                message: '已完成该儿童年龄内自理能力测评'
                            });
                        }).catch(() => {
                            this.isFineshed = false;
                            this.postQuestionResult()
                            this.$message({
                                type: 'warning',
                                message: '未完成该儿童年龄内自理能力测评'
                            });
                        })
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
                        IsFinish: this.isFineshed
                    }
                } else {
                    params = {
                        MemberID: this.cpepMemberID,
                        PaperID: this.resultPaperID,
                        Result: this.resultData,
                        IsFinish: this.isFineshed
                    }
                }
                this.cpeploading = true;
                api.postCPEPResult(params).then(res => {
                    if (res.data.Status) {
                        this.cpeploading = false;
                        this.$emit('backToserviceTool','back')
                        this.$message.success(res.data.Msg)
                    } else {
                        this.cpeploading = false;
                        this.$message.error(res.data.Msg)
                    }
                })
            },
            getChosedQuestion(arr) {
                for (let u in arr) {
                    for (let t in arr[u].TypeList) {
                        for (let item in arr[u].TypeList[t].QuestionList) {
                            let r = arr[u].TypeList[t].QuestionList[item]
                            if (r.Result) {
                                this.resultData.push({
                                    Result: r.Result,
                                    QuestionID: r.ID
                                })
                            }
                        }
                    }
                }
            },
            //取消选中
            checkChange(ev) {
                //checked状态
                this.checkedChanged = true;
            },
            changeCheckStatus(ev, indexU, indexT, indexQ) {
                let _this = this
                window.setTimeout(() => {
                    if (!_this.checkedChanged) {
                        //未checked状态
                        ev.target.checked = false
                        _this.cpepData[indexU].TypeList[indexT].QuestionList[indexQ].Result = ''
                    }
                    _this.checkedChanged = false
                }, 0)
            },
            createdLastImg() {
                let _this = this;
                var p = document.getElementsByClassName("paperform-form")[0]
                var c = document.getElementsByClassName('cpepTemplate')[0];
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
                this.createdLastImg()
            }
        },
        created() {
            if (window.innerHeight < 768) {
                this.narrow = true;
            } else {
                this.narrow = false;
            }
            let _this = this;
            this.interval = setInterval(function () {
                api.drProfile().then(res => {
                })
            }, 30 * 1000)

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
            clearInterval(this.interval)
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

    .tg .tg-s6z2 {
        text-align: center
    }


    .leftAlign {
        text-align: left
    }

    .cpepTemplate {
        position: relative;
    }
    .paperform-form {
        padding: 5px 27px;
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
        display: inline-block;
        position: relative;
        width: 20px;
        height: 20px;
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

    .headTitle {
        display: inline-block;
        width: 70px;
        border-bottom: 1px solid black;
        margin-right: 5px;
    }
    .selected {
        background: #c8eeff;
    }



</style>
