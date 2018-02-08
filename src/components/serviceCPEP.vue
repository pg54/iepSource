<template>
    <div class="cpepTemplate">
        <table class="tg" v-loading.fullscreen.lock="cpeploading">
            <thead>
                <tr>
                    <th class="tg-baqh" colspan="4">任务项目</th>
                    <th class="tg-baqh" colspan="3">材料</th>
                    <th class="tg-baqh" colspan="7">实施方法</th>
                    <th class="tg-baqh" colspan="3">领域</th>
                    <th class="tg-baqh" colspan="7">评分</th>
                </tr>
            </thead>
            <template v-for="(unit, indexU) in copyData">
                <tr>
                    <td class="tg-yw4l leftAlign bondText" colspan="24">{{unit.material}}</td>
                </tr>
                <template v-for="(ele, indexE) in unit.sameArr">
                    <tr>
                        <td class="tg-yw4l" colspan="4" :class='{selected: ele.Result}'>{{ele.Number}}:{{ele.Name}}:{{indexU}}:{{indexE}}</td>
                        <td class="tg-yw4l" colspan="3" :class='{selected: ele.Result}'>{{ ele.Material}}</td>
                        <td class="tg-yw4l" colspan="7" :class='{selected: ele.Result}'>{{ ele.Description}}</td>
                        <td class="tg-yw4l" colspan="3" :class='{selected: ele.Result}'>{{ ele.Domain}}</td>
                        <td class="tg-yw4l" colspan="7" :class='{selected: ele.Result}'>
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
        name: 'serviceCPEP',
        props: ['cpepData', 'pacientID', 'isResultPage', 'isFirstTimeTest', 'cpepMemberID', 'cpepPaperID'],
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
                    this.postQuestionResult()
                } else {
                    this.$confirm(`剩余${lastNumber}道问题未选择，如点击确认，未选择问题将默认提交,`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
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
                this.handlerAssociateInput(number, ev.target.value, ev.target.checked)
                this.checkedChanged = true;
            },
            changeCheckStatus(ev, number, indexU, indexE) {
                let _this = this
                window.setTimeout(() => {
                    if (!_this.checkedChanged) {
                        //未checked状态
                        ev.target.checked = false
                        _this.copyData[indexU].sameArr[indexE].Result = ''
                        _this.handlerAssociateInput(number, ev.target.value, ev.target.checked)
                    }
                    _this.checkedChanged = false
                }, 0)
            },
            handlerAssociateInput(number, value, checked) {
                let associateInputs = {
                    '31': [{'indexU': 23,'indexE': 1},{'indexU': 23,'indexE': 2},{'indexU': 23,'indexE': 3},{'indexU': 23,'indexE': 4},{'indexU': 23,'indexE': 5},{'indexU': 23,'indexE': 6},{'indexU': 24,'indexE': 3},{'indexU': 24,'indexE': 4},{'indexU': 24,'indexE': 5}],
                    '32': [{'indexU': 23,'indexE': 3},{'indexU': 23,'indexE': 4},{'indexU': 23,'indexE': 5},{'indexU': 24,'indexE': 3},{'indexU': 24,'indexE': 4}],
                    '49C': [{'indexU': 32,'indexE': 0},{'indexU': 32,'indexE': 1}],
                    '65':  [{'indexU':  41,'indexE': 2},{'indexU': 41,'indexE': 3},{'indexU': 41,'indexE': 4}],
                    '66':  [{'indexU': 41,'indexE': 3},{'indexU': 41,'indexE': 4}],
                    '67':  [{'indexU': 41,'indexE': 4}],
                    '70A': [{'indexU':  42,'indexE': 1},{'indexU': 42,'indexE': 2},{'indexU': 42,'indexE': 3},{'indexU': 42,'indexE': 4}],
                    '70B': [{'indexU': 42,'indexE': 2},{'indexU': 42,'indexE': 3},{'indexU': 42,'indexE': 4}],
                }
                let targets = ['31','32','49C','65','66','67','70A','70B']
                if (targets.indexOf(number) !== -1) {
                    this.setAssociateInput(associateInputs, number, value, checked)
                } 
            },
            setAssociateInput(associateInputs, target, value, checked) {
                if (value === 'F') {
                    if (checked) {
                        this.associateInput(associateInputs, target)
                    } else {
                        this.associateInputCancel(associateInputs, target)
                    }
                } else if (value === 'E') {
                    if (target === '70A' || target === '70B') {
                        if (checked) {
                            this.associateInput(associateInputs, target)
                        } else {
                            this.associateInputCancel(associateInputs, target)
                        }
                    } else {
                        this.associateInputCancel(associateInputs, target)
                    }
                } else if (value === 'P'){
                    this.associateInputCancel(associateInputs, target)
                }
            },
            associateInput(associateInputs, target) {
                associateInputs[target].map(ele => {this.copyData[ele.indexU].sameArr[ele.indexE].Result = 'F';this.copyData[ele.indexU].sameArr[ele.indexE].Unselect = true})
                this.associateNotify(target)
            },
            associateInputCancel(associateInputs, target) {
                associateInputs[target].map(ele => {this.copyData[ele.indexU].sameArr[ele.indexE].Result = '';this.copyData[ele.indexU].sameArr[ele.indexE].Unselect = false})
            },
            associateNotify(target) {
                switch (target){
                    case '31':
                        this.$notify({
                            title: '提示',
                            message: '题31选F时，题32、33、34、35、36、37、39、40只能选F',
                            type: 'success'
                        });
                        break;
                    case '32':
                        this.$notify({
                            title: '提示',
                            message: '题32选F时，题34、35、36、39、40只能选F',
                            type: 'success'
                        });
                        break;
                    case '49C':
                        this.$notify({
                            title: '提示',
                            message: '题49C选F时，题53A、53B只能选F',
                            type: 'success'
                        });
                        break;
                    case '65':
                        this.$notify({
                            title: '提示',
                            message: '题65选F时，题66、67、68只能选F',
                            type: 'success'
                        });
                        break;
                    case '66':
                        this.$notify({
                            title: '提示',
                            message: '题66选F时，题67、68只能选F',
                            type: 'success'
                        });
                        break;
                    case '67':
                        this.$notify({
                            title: '提示',
                            message: '题67选F时，题68只能选F',
                            type: 'success'
                        });
                        break;
                    case '70A':
                        this.$notify({
                            title: '提示',
                            message: '题70A选E或F时，题70B、70C、70D只能选F',
                            type: 'success'
                        });
                        break;
                    case '70B':
                        this.$notify({
                            title: '提示',
                            message: '题70A选E或F时，题70B、70C、70D只能选F',
                            type: 'success'
                        });
                        break;
                        
                }

            }
        },
        created() {
            if (window.innerHeight < 768) {
                this.narrow = true;
            } else {
                this.narrow = false;
            }
            this.copyData = JSON.parse(JSON.stringify(this.submitData))
            let _this = this;
            this.interval = setInterval(function() {
                api.drProfile().then(res => {
                })
            },30 * 1000)

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

    .tg .tg-baqh {
        text-align: center;
        vertical-align: middle
    }

    .tg .tg-yw4l {
        text-align: left;
        vertical-align: top
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

    .selected {
        background: #c8eeff;
    }


</style>
