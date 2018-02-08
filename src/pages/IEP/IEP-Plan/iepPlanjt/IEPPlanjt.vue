<template>
    <div>
        <div v-if=" 'iepPlanjt' === lastPath">
            <div class="planCenter-content">
                <div class="toolBox">
                    <el-row type="flex" justify="space-between">
                        <el-col :span="10">
                            <el-row :gutter="35">
                                <el-col :span="16">
                                    <input class="onc-input" v-model="filttGroup" placeholder="输入分组名称、计划名称查询" @keyup.13="getGroupName">
                                </el-col>
                                <el-col :span="8">
                                    <el-button @click="getGroupName">搜索</el-button>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="2">
                            <el-button @click="addGroupPlan">新增计划</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div class="newsList">
                    <el-card class="cardBox colorHeader" :body-style="{ padding: '0px'}">
                        <div class="tableWrap">
                            <el-table :data="groupPlanData.Records" style="width: 100%">
                                <el-table-column type="index" width="80">
                                </el-table-column>

                                <el-table-column prop="GroupName" label="分组">
                                </el-table-column>

                                <el-table-column prop="Title" label="计划名称">
                                </el-table-column>

                                <el-table-column label="操作" align="center">
                                    <template scope="scope">
                                        <el-button size="small" :plain="true" type="info" @click="goPlanDetails(scope.row)">计划详情</el-button>
                                        <el-button size="small" :plain="true" type="warning" @click="modifyGroupPlan(scope.row)">修改计划</el-button>
                                        <el-button size="small" :plain="true" type="danger" @click="removePlan(scope.row.ID)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div style="float: right">
                            <el-pagination @current-change="requestGroupPlanData" layout="prev, pager, next" :total="groupPlanData.Total">
                            </el-pagination>
                        </div>
                    </el-card>
                </div>
            </div>

            <el-dialog :title="isModifyPlan? '修改计划':'新增计划'" v-model="addPlanDialogFlag" :show-close="false" :close-on-click-modal='false'
                @close='initPlanFormData' size="small">
                <el-form ref="form" :model="planFormData" label-width="100px">

                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="标题:">
                                <el-input v-model="planFormData.Title"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="时间:">
                                <el-date-picker style="width: 80%" type="date" placeholder="选择日期" v-model="planFormData.StartDate" :picker-options="pickerOptions0"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <div>
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="患者组:">
                                    <el-select style="width: 100%" v-model="planFormData.GroupID" placeholder="请选择小组">
                                        <el-option v-for="(item, index) in groupData" :key="item.GroupID" :label=item.groupName :value=item.groupID>
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>

                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="课程包:">
                                    <el-select v-model="planFormData.PaperPackageID" placeholder="请选择课程包" style="width:100%">
                                        <el-option v-for="o in packageData" :label="o.Name" :value="o.ID"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.native="planCancel()">返回</el-button>
                    <el-button type="primary" @click.native="planSubmit()">提交</el-button>
                </div>
            </el-dialog>
        </div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import api from '../../../../api/index.js'
    export default {
        name: 'IEPPlanjt',
        components: {

        },
        data() {
            return {
                groupPlanData: '', //集体计划ListData
                filttGroup: '',
                planFormData: {
                    ID: '',
                    Title: "",
                    Template: '',
                    Type: '',
                    StartDate: "",
                    newPackageName: '',
                    Courses: [],
                    GroupID: '',
                    StudentID: '',
                    PaperPackageID: ''
                },
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                isModifyPlan: false,
                addPlanDialogFlag: false,
                groupData: [],
                testPaperData: [],
                packageData: [],
            }
        },
        computed: {
            lastPath: function () {
                let pathStr = this.$route.path
                let pathArr = pathStr.split('/')
                pathArr.splice(0, 1)
                let len = pathArr.length
                return pathArr[len - 1]
            },
        },
        methods: {
            //获取集体计划列表
            requestGroupPlanData: function (pageIndex) {
                this.iepGroupRequest(pageIndex);
            },
            getGroupName() {
                this.iepGroupRequest(1);
            },
            iepGroupRequest(pageIndex) {
                var params = {
                    'pageIndex': pageIndex,
                    'pageSize': 10,
                    'planType': 0,
                    'KeyWord': this.filttGroup.trim()
                };
                api.drTeachingPlan(params).then(res => {
                    this.groupPlanData = res.data;
                });
            },
            addGroupPlan: function () {
                this.initPlanFormData();
                this.addPlanDialogFlag = true;
            },
            //删除计划
            removePlan(id) {
                this.$confirm('确认删除该个案吗, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params = {
                        ID: id
                    }
                    api.toremovePlan(params)
                        .then(res => {
                            if (res.Status) {
                                this.$message.success('删除成功');
                                this.requestGroupPlanData(1);
                            }
                        })
                        .catch(err => {
                            this.$message.error(err.Msg);
                        })
                }).catch(() => {
                    console.log('取消')
                })
            },
            getGroups() {
                api.getDoctorPatientList().then(res => {
                    var groupInfo = res.Data;
                    for (var i = 0, j = groupInfo.length; i < j; i++) {
                        var obj = {
                            'groupName': groupInfo[i].Name,
                            'groupID': groupInfo[i].ID,
                            'groupPatients': groupInfo[i].Agents
                        };
                        this.groupData.push(obj);
                    }
                });
            },
            getPackageList() {
                api.requestCourseList().then(res => {
                    this.testPaperData = res.List;
                    this.packageData = this.testPaperData.map(function (ele) {
                        return {
                            ID: ele.ID,
                            Name: ele.Name
                        }
                    })
                });
            },
            planCancel() {
                this.initPlanFormData();
                this.addPlanDialogFlag = false;
            },
            initPlanFormData() {
                this.planFormData = {
                    ID: '',
                    Title: "",
                    Template: '',
                    Type: '',
                    StartDate: "",
                    newPackageName: '',
                    Courses: [],
                    GroupID: '',
                    StudentID: '',
                    PaperPackageID: ''
                }
            },
            planSubmit() {
                this.planFormData.Template = 0;
                this.planFormData.Type = 0;
                if (this.planFormData.GroupID === "") {
                    this.$message.warning('请选择患者组!');
                    return;
                }
                if (this.planFormData.Title === "") {
                    this.$message.warning('请填写教学计划名称!');
                    return;
                }
                if (this.planFormData.StartDate === "") {
                    this.$message.warning('请填写教学计划开始时间!');
                    return;
                }
                if (this.planFormData.PaperPackageID === "") {
                    this.$message.warning('请选择课程包!');
                    return;
                }

                this.planFormData.Courses = this.getCourseArray(this.planFormData.PaperPackageID);
                var params = this.planFormData;

                // let isAdd = params.ID === '' ? true : false;
                api.modifyPlan(params).then(res => {
                    if (res.Status) {
                        if (params.Type == 1) {
                            this.$message.success('保存计划成功');
                        } else {
                            this.$message.success('保存计划成功!');
                        }
                        this.requestGroupPlanData(1);
                        //提交成功后，对新增计划的学期计划默认操作 暂不写
                    } else {
                        this.$message.error(res.Message);
                    }
                });
                this.planCancel();
            },
            //获取已选中课程
            getCourseArray(id) {
                let arr = this.testPaperData;
                for (var i = 0, j = arr.length; i < j; i++) {
                    if (arr[i].ID === id) {
                        let sourceData = arr[i].Courses
                        let reArr = []
                        for (let j = 0; j < sourceData.length; j++) {
                            reArr.push(sourceData[j].ID)
                        }
                        return reArr
                    }
                }
            },
            goPlanDetails(row) {
                let id = row.ID
                this.$store.dispatch('setIEPPlanID', id);
                this.$router.push({ path: `/iep/iepPlan/iepPlanjt/iepPlanList`})
            },
        },
        created() {
            this.requestGroupPlanData(1);
            this.getGroups();
            this.getPackageList();
        }
    };

</script>
<style scoped>
    .onc-input {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #bfcbd9;
        box-sizing: border-box;
        color: #1f2d3d;
        display: block;
        font-size: inherit;
        height: 36px;
        line-height: 1;
        outline: 0;
        padding: 3px 10px;
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        width: 100%;
    }

    .onc-input:focus {
        border: 1px solid rgba(32, 160, 255, 1);
    }

</style>
