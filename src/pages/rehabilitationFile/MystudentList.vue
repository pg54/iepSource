<template>
    <div>
        <div class="toolBox">
            <input class="onc-input" v-model="filttGroup" placeholder="请输入患者姓名" @keyup.13="getGroupName($event)">
            <el-button @click="addUser()">
                <Icon type="person-add"></Icon>&nbsp;新增患者
            </el-button>
            <el-button @click="modifyGroupNameForm">
                <Icon type="edit"></Icon>&nbsp;修改组名
            </el-button>
            <el-button @click="dialogFormVisible = true">
                <Icon type="plus-round"></Icon>&nbsp;新增分组
            </el-button>
            <el-button @click="deleteGroup()">
                <Icon type="trash-a"></Icon>&nbsp;删除分组
            </el-button>
        </div>

        <!--患者列表-->
        <ul class="studentList" rel="studentList" id="studentList">
            <li v-for="(item, index) in groupData" class="studentBox">
                <div class="studentInfo">
                    <div class="baseInfo">
                        <div class="patientLogo">
                            <img :src="item.Logo" v-show="item.Logo?true:false" alt="logo">
                            <img src="../../assets/images/student/头像.png" v-show="item.Logo?false:true" alt="logo">
                        </div>
                        <div class="nameLevel">
                            <span> {{ item.Name }}</span>
                        </div>
                        <div>
                            <span>{{ (item.Sex === 1) ? '男' : '女' }}</span>
                            <span>{{ calculationAge(item.BirthDate) }}岁</span>
                        </div>
                    </div>
                    <div class="skills">
                        <p>身份证号:</p>
                        <p>
                            <span></span>
                            <span>{{ item.IDCard }}</span>
                        </p>
                        <p>
                            <span>临床表现:</span>
                            <span v-if="item.Comments && item.Comments.length < 5">{{item.Comments}}</span>
                            <el-tooltip v-if="item.Comments && item.Comments.length >= 5" class="item" effect="light" :content="item.Comments" placement="top-start">
                                <span>{{item.Comments.substr(0,5) + '...'}} </span>
                            </el-tooltip>
                        </p>
                        <p>
                            <span>诊断结果:</span>
                            <span>{{item.DiagnosisName}}</span>
                        </p>
                    </div>
                </div>
                <div class="stuOperate">
                    <el-button @click="viewPatientDetails(item.ID, item.Name)">
                        <Icon type="edit"></Icon>&nbsp;查看
                    </el-button>
                    <el-button @click="movePatient(item.ID, item.Name)">
                        <Icon type="arrow-move"></Icon>&nbsp;移动
                    </el-button>
                    <el-button @click="deleteItem(item.ID)">
                        <Icon type="ios-trash"></Icon>&nbsp;删除
                    </el-button>
                </div>
            </li>
        </ul>


        <el-dialog title="修改分组名称" v-model="dialogModifyVisible" :close-on-click-modal="false" :show-close="false">
            <el-form :model="form">
                <el-form-item label="新组名">
                    <el-input v-model="newGroupName" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogModifyVisible = false">取 消</el-button>
                <el-button type="primary" @click="modifyGroupName()">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="新增分组" v-model="dialogFormVisible" :close-on-click-modal="false" :show-close="false">
            <el-form :model="form">
                <el-form-item label="请输入新的小组名称">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addNewGroup()">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="移动学生" v-model="dialogMoveTableVisible" :close-on-click-modal="false" :show-close="false">
            <span class="newGroup">患者</span>
            <el-input v-model="selectedPacientName" :disabled="true" style="width: 200px"></el-input>

            <span class="newGroup">新的小组</span>
            <el-select v-model="selectedGroup" filterable placeholder="请选择要移动的小组">
                <el-option v-for="item in parentData" :key="item.groupID" :label=item.groupName :value=item.groupID>
                </el-option>
            </el-select>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogMoveTableVisible = false">取 消</el-button>
                <el-button type="primary" class="transBtn" @click="movetoGroup()">确认</el-button>
            </div>

        </el-dialog>

        <el-dialog title="新增学生" v-model="isShowAddUserDialogFlag" size="small" :close-on-click-modal="false" :show-close="false">
            <div >
                <el-form label-width="100px" :model="userInfo" v-if="drStatus === 3"
                    style="padding-left:10px;margin:0px" :rules="rules" ref="ruleForm">
                    <el-row :gutter="24">
                        <el-col :span="12" class="content">
                            <el-form-item label="姓名" prop="Name">
                                <el-input v-model="userInfo.Name" placeholder="请填写姓名"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" class="content">
                            <el-form-item label="性别" prop="Sex">
                                <el-select v-model="userInfo.Sex" placeholder="请选择性别" style="width:100%">
                                    <el-option v-for="(item, index) in sexsArrary" :key="item.Key" :label=item.Value :value=item.Key>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="24">
                        <el-col :span="12" class="content">
                            <el-form-item label="用户名" prop="UserName" >
                                  <el-input placeholder="请填写用户名" v-model="userInfo.UserName">
                                        <template slot="prepend">{{ institutionCode }}</template>
                                    </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" class="content">
                            <el-form-item label="出生日期" prop="BirthDate">
                                <el-date-picker type="date" placeholder="选择日期" :picker-options="pickerOptions" v-model="userInfo.BirthDate"
                                    style="width:100%"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="24">
                        <el-col :span="12" class="content">
                            <el-form-item label="是否深圳户口">
                            <el-switch on-text="" off-text="" v-model="userInfo.IsSZHK"></el-switch>
                        </el-form-item>
                        </el-col>

                        <el-col :span="12" class="content">
                            <el-form-item label="是否需要试课">
                                <el-switch on-text="" off-text="" v-model="userInfo.IsTest"></el-switch>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="24">
                        <el-col :span="12" class="content">
                            <el-form-item label="是否需要评估">
                                <el-switch on-text="" off-text="" v-model="userInfo.IsEval"></el-switch>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="24">
                        <el-col :span="12" class="content">
                            <el-form-item label="患者状态">
                                <el-select v-model="userInfo.Status" placeholder="请选择" style="width:100%">
                                    <el-option v-for="(item, index) in patientStatus" :key="item.ID" :label=item.Name :value=item.ID>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="24">
                        <el-col :span="12" class="content">
                            <el-form-item label="原始机构">
                                <el-select v-model="userInfo.OriginalOrgName" filterable="" allow-create placeholder="请选择" style="width:100%" @change="orgChange">
                                    <el-option v-for="(item, index) in originalOrgs" :key="index" :label=item.value :value=item.value>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="24">
                        <el-col :span="12" class="content">
                            <el-form-item label="推荐人">
                                <el-select v-model="userInfo.RefereeType" placeholder="请选择" style="width:100%"  @change="referenceTypeChange">
                                    <el-option v-for="(item, index) in referencePersons" :key="item.ID" :label=item.Name :value=item.ID>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" class="content" v-show="userInfo.RefereeType">
                            <el-autocomplete class="inline-input" v-model="userInfo.RefereeName" :fetch-suggestions="refQuerySearch" placeholder="请输入老师名称"></el-autocomplete>
                        </el-col>
                    </el-row>



                    <el-row :gutter="24">
                        <el-col :span="12" class="content">
                            <el-form-item label="身份证号码" prop="IDCard">
                                <el-input v-model="userInfo.IDCard" placeholder="请填写身份证号码"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="24">
                        <el-col :span="12" class="content">
                            <el-form-item label="诊断结果">
                                <el-select v-model="userInfo.DiagnosisDeptID" placeholder="请选择" style="width:100%" @change="deptOnChange">
                                    <el-option v-for="(item, index) in diagnosisesDept" :key="item.ID" :label=item.Name :value=item.ID>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="">
                                <el-select v-model="userInfo.DiagnosisID" placeholder="请选择病种" style="width:100%">
                                    <el-option v-for="(item, index) in diagnosises" :key="item.ID" :label=item.Name :value=item.ID>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="24">
                        <el-col :span="23" class="content">
                            <el-form-item label="临床表现">
                                <el-input v-model="userInfo.Comments" placeholder="请填写临床表现"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="24">
                        <el-col :span="12" class="content">
                            <el-form-item label="诊断时间">
                                <el-date-picker type="date" placeholder="选择日期" v-model="userInfo.DiagnosisDate"
                                    style="width:100%">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <!--<el-row :gutter="24">-->
                    <!--<el-col :span="12" class="content">-->
                    <!--<el-form-item label="入学时间:">-->
                    <!--<el-date-picker type="date" placeholder="选择日期" v-model="userInfo.InDate"-->
                    <!--:picker-options="pickerOptions0"-->
                    <!--:editable="false"-->
                    <!--style="width:100%"></el-date-picker>-->
                    <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--</el-row>-->

                </el-form>
                <h3 v-else>您暂未通过审核，无添加患者权限，请联系工作人员</h3>

                <div style="float:right;margin-bottom:10px;margin-right:25px">
                    <el-button @click="cancel()">返回</el-button>
                    <el-button  v-if="drStatus === 3" type="primary" @click="submitUserInfo('ruleForm')">确认</el-button>
                </div>
            </div>
        </el-dialog>


    </div>
</template>
<script>
    import api from '../../api/index.js';
    export default {
        name: 'studentGroupList',
        components: {},
        props: ['groupData', 'groupID', 'groupName', 'groupIndex'],
        computed: {
            parentData: function () {
                return this.$store.state.mystudent.patientList;
            },
            institutionCode: function () {
                return this.$store.state.questionPaper.drProfile.InstitutionCode;
            },
            drStatus: function () {
                return this.$store.state.questionPaper.drProfile.Status;
            },
        },
        data() {
            var validateUserName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户名不能为空'))
                }
                setTimeout(() => {
                    var reg = /^[0-9a-zA-Z_]{2,}$/
                    if (!reg.test(value)) {
                        callback(new Error('用户名由数字、26个英文字母或者下划线组成'))
                    } else {
                        callback()
                    }
                })
            }
            // var validateIDCard = (rule, value, callback) => {
            //     if (!value) {
            //         return callback(new Error('身份证号不能为空'))
            //     }
            //     setTimeout(() => {
            //         var reg =
            //             /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
            //         if (!reg.test(value)) {
            //             callback(new Error('请填写患者的正确的身份证号'))
            //         } else {
            //             callback()
            //         }
            //     })
            // }
            return {
                form: {
                    name: ''
                },
                isShowAddUserDialogFlag: false,
                dialogFormVisible: false,
                dialogMoveTableVisible: false,
                dialogModifyVisible: false,
                selectedGroup: '',
                selectedPacient: '',
                selectedPacientName: '',
                newGroupName: this.groupName,
                userInfo: {
                    Name: '',
                    Sex: '',
                    UserName: '',
                    IDCard: '',
                    BirthDate: '',
                    DiagnosisDeptID: '', //病种科室
                    DiagnosisID: '', //病种ID
                    Comments: '', //诊断结果
                    DiagnosisDate: '', //诊断时间
                    IsSZHK: false,  //是否深圳户口
                    IsTest: false,  //是否需要试课
                    IsEval: false,  //是否需要评估
                    RefereeType: '',  //推荐人
                    RefereeName: '',  //推荐人姓名
                    OriginalOrgID: '',  //原始机构
                    OriginalOrgName: '',
                    Status: '',  //患者状态
                    //必须带上
                    PatientFrom: 2,
                    PatientSrc: 2,

                },
                currLogoUrl: '', //临时上传的头像地址
                sexsArrary: [{
                    "Key": 1,
                    "Value": "男"
                }, {
                    "Key": 2,
                    "Value": "女"
                }],
                diagnosisesDept: [], //病种数据,数据格式： 包含科室->对应多个病种
                diagnosises: [], //病种
                referencePersons: [],  //推荐人
                referenceData: [],  //一种推荐类别的推荐人
                patientStatus: [], //患者状态
                originalOrgs: [],  //机构
                changePatientList: false,
                rules: {
                    Name: [{
                        required: true,
                        message: '请输入患者姓名',
                        trigger: 'blur'
                    }],
                    Sex: [{
                        required: true,
                        type: 'number',
                        message: '请选择患者性别',
                        trigger: 'blur'
                    }],
                    UserName: [{
                        validator: validateUserName,
                        trigger: 'blur'
                    }],
                    BirthDate: [{
                        type: 'date',
                        required: true,
                        message: '请填写患者出生日期',
                        trigger: 'blur'
                    }],
                },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() - 8.64e7;
                    }
                },
                restaurants: [],
                filttGroup: []
            };
        },
        methods: {
            getGroupName(ev) {
                let v = this.filttGroup.trim();
                let obj = {value: v, groupIndex: this.groupIndex}
                this.$emit('search',obj);
            },
            orgChange(value) {
            },
            //推荐人姓名
             refQuerySearch(queryString, cb) {
                var restaurants = this.referenceData;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
                };
            },
            calculationAge(ageStr) {
                let strBirthday = ageStr.substr(0, 10);
                let age = this.ageTool(strBirthday);
                return age;
            },
            ageTool(str) {
                var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
                if (r == null) return false;
                var d = new Date(r[1], r[3] - 1, r[4]);
                if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
                    var Y = new Date().getFullYear();
                    return ((Y - r[1]) + "");
                }
                return ("输入的日期格式错误！");
            },
            modifyGroupNameForm() {
                this.dialogModifyVisible = true;
            },
            modifyGroupName() {
                this.dialogModifyVisible = false;
                var params = {
                    'Name': this.newGroupName,
                    'ID': this.groupID
                };
                api.createAndModifyPatientGroups(params).then(res => {
                    let fdCode = res.Code;
                    if (fdCode === 0) {
                        this.$message.success('成功')
                    } else if (fdCode === 1) {
                        this.$message.warning('名称为空')
                    } else if (fdCode === 2) {
                        this.$message.warning('名称重复')
                    }
                    this.refreshPatientList();
                });
            },
            movePatient(id, name) {
                this.dialogMoveTableVisible = true;
                this.selectedPacient = id;
                this.selectedPacientName = name;
            },
            movetoGroup() {
                var params = {
                    'PatientAgentID': this.selectedPacient,
                    'GroupID': this.selectedGroup
                };
                api.moveToGroup(params).then(res => {
                    this.dialogMoveTableVisible = false;
                    this.refreshPatientList();
                    let fdCode = res.Code;
                    if (fdCode === 0) {
                        this.$message.success('正常')
                    } else if (fdCode === 1) {
                        this.$message.warning('指定的用户组不存在')
                    } else if (fdCode === 2) {
                        this.$message.warning('用户组不属于当前医生')
                    }
                });
            },
            //添加患者分组
            addNewGroup() {
                this.dialogFormVisible = false;
                var obj = {
                    'Name': this.form.name,
                    'ID': ''
                };
                api.createAndModifyPatientGroups(obj).then(res => {
                    let fdCode = res.Code;
                    if (fdCode === 0) {
                        this.$message.success('成功')
                    } else if (fdCode === 1) {
                        this.$message.warning('名称为空')
                    } else if (fdCode === 2) {
                        this.$message.warning('名称重复')
                    }
                    this.refreshPatientList();
                });
            },
            refreshPatientList() {
                api.getDoctorPatientList().then(res => {
                    let arr = [];
                    var groupInfo = res.Data;
                    for (var i = 0, j = groupInfo.length; i < j; i++) {
                        var obj = {
                            'groupName': groupInfo[i].Name,
                            'groupID': groupInfo[i].ID,
                            'groupPatients': groupInfo[i].Agents
                        };
                        arr.push(obj);
                    }
                    this.$store.dispatch('addPatientList', arr);
                }).catch(err => {
                    this.$message.error(err);
                })
            },
            addUser() {
                this.isShowAddUserDialogFlag = true;
                this.requestDiagnosises();  
                this.requestRefrecePerson();
                this.requestPatientStatus();
                this.requestOriginalOrgs();
            },
            //新增患者
            submitUserInfo(formName) {
                let name = this.userInfo.UserName
                this.$refs[formName].validate((valid => {
                    if (valid) {
                        let _this = this;
                        _this.userInfo.GroupID = _this.groupID;
                        _this.userInfo.UserName = _this.institutionCode + name;
                        api.addPatient(_this.userInfo).then(res => {
                            if (res.Code == 0) {
                                _this.$message.success('添加成功');
                                _this.refreshPatientList();
                                _this.isShowAddUserDialogFlag = false;
                                document.getElementById('studentList').scrollTop = 0;
                                // _this.$refs.ruleForm.resetFields();
                                _this.resetForm()
                            } else {
                                _this.userInfo.UserName = name;
                                _this.$message.warning(res.Msg);
                            }
                        }).catch(err => {
                            _this.userInfo.UserName = name;
                            _this.$message.error('添加失败！');
                        });
                    } else {
                        this.$message.warning('请完善新增患者信息！')
                    }
                }));
            },
            cancel() {
                if (this.drStatus === 3) {
                    // this.$refs.ruleForm.resetFields();
                    this.resetForm()
                }
                this.isShowAddUserDialogFlag = false;
                
            },
            resetForm() {
                this.userInfo = {
                    Name: '',
                    Sex: '',
                    UserName: '',
                    IDCard: '',
                    BirthDate: '',
                    DiagnosisDeptID: '', //病种科室
                    DiagnosisID: '', //病种ID
                    Comments: '', //诊断结果
                    DiagnosisDate: '', //诊断时间
                    IsSZHK: false,  //是否深圳户口
                    IsTest: false,  //是否需要试课
                    IsEval: false,  //是否需要评估
                    RefereeType: '',  //推荐人
                    RefereeName: '',  //推荐人姓名
                    OriginalOrgID: '',  //原始机构
                    OriginalOrgName: '',
                    Status: '',  //患者状态
                    //必须带上
                    PatientFrom: 2,
                    PatientSrc: 2,
                }
            },
            requestPatientStatus() {
                let _this = this;
                api.getPatientStatus()
                    .then(res => {
                        _this.patientStatus = res.List;
                    }).catch(err => {
                        _this.$message.error(err.Msg);
                    });
            },
            requestOriginalOrgs() {
                let _this = this;
                var params = {
                    key: ''
                }
                api.getOriginalOrgs(params)
                    .then(res => {
                        let arr = res.Data;
                        arr.splice(0, 0, {value: ""})
                        _this.originalOrgs = arr;
                    }).catch(err => {
                        _this.$message.error(err.Msg);
                    });
            },
            requestRefrecePerson() {
                let _this = this;
                api.getReferecePersons()
                    .then(res => {
                        _this.referencePersons = res.List;
                    }).catch(err => {
                        _this.$message.error(err.Msg);
                    });
            },
            //请求病种数据
            requestDiagnosises() {
                let _this = this;
                api.requestDept().then(res => {
                    _this.diagnosisesDept = res.data.List;
                }).catch(err => {
                    _this.$message.error('病种数据请求失败,请稍后再试');
                });
            },
            //科室发生变化时，病种下拉列表刷新
            deptOnChange(id) {
                let _this = this;
                _this.diagnosises = [];
                for (let i = 0; i < _this.diagnosisesDept.length; i++) {
                    if (_this.diagnosisesDept[i].ID === id) {
                        _this.diagnosises = _this.diagnosisesDept[i].Diagnosises;
                        if (_this.diagnosises.length > 0) {
                            _this.userInfo.DiagnosisID = _this.diagnosises[0].ID;
                        } else {
                            _this.userInfo.DiagnosisID = '';
                        }
                        break;
                    }
                }
            },
            referenceTypeChange(id) {
                if (!id) return;  //select没有选中时会自动触发，暂未找到原因，通过判断id屏蔽掉。
                let _this = this;
                let params = {
                    typeId: id
                }
                api.getRefrences(params).then(res => {
                    if (res.Status) {
                        _this.referenceData = res.Data;
                    } else {
                        _this.$message.warning(res.Msg)
                    }
                })

            },
            deleteGroup() {
                this.$confirm('确认删除该分组吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.$confirm('该分组将被删除，确定吗？', '警告', {
                        type: 'error'
                    }).then(() => {
                        let params = {
                            ID: this.groupID
                        };
                        api.deletePatientGroup(params).then(res => {
                            if (res.Status) {
                                this.$message.success('成功')
                                this.refreshPatientList();
                                this.$parent.currentTab = 0;
                            } else {
                                this.$message.warning(res.Msg)
                            }
                        });
                    })
                });
            },
            deleteItem(patientID) {
                let params = {
                    ID: patientID
                }
                this.$confirm('确认删除该患者吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    api.removePatient(params)
                        .then(res => {
                            if (res.Status) {
                                this.$message.success('成功');
                                this.refreshPatientList();
                            } else if (fdCode === 1) {
                                this.$message.warning(res.Msg);
                            }
                        })
                        .catch(err => {
                            this.$message.error(err);
                        })
                })
            },
            //查看患者详情
            viewPatientDetails(id, name) {
                let patient = {
                    ID: id,
                    Name: name
                }
                this.$store.dispatch('setCurrentPatientInfo', patient);
                this.$router.push({
                    name: 'rehabilitationFile',
                    params: {
                        id: id
                    }
                });
                this.$store.dispatch('setShowPacientList', false);
            }
        },
        created() {
        },
        mounted() {
            
        }
    };

</script>
<style scoped>
    .clearfix {
        clear: both;
        content: '';
        width: 0;
        display: block;
        visibility: hidden
    }

    .studentList {
        width: 1080px;
        height: 503px;
        margin: 0 auto;
        overflow: scroll;
        padding-top: 10px;
    }

    .studentList li {
        float: left;
        width: 300px;
        height: 200px;
        -webkit-box-shadow: 0 0 6px rgba(0, 0, 0, 0.14);
        -moz-box-shadow: 0 0 6px rgba(0, 0, 0, 0.14);
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.14);
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        margin-right: 25px;
        margin-left: 30px;
        margin-bottom: 30px;
        font-size: 16px;
        color: #333333;
    }

    .studentInfo {
        width: 100%;
        height: 130px;
        position: relative;
    }

    .studentInfo>div {
        display: inline-block
    }

    .baseInfo {
        width: 118px;
        display: flex;
        align-content: center
    }

    .baseInfo>div {
        text-align: center
    }

    .studentInfo .skills {
        width: 170px
    }

    .stuOperate {
        width: 100%;
        height: 70px;
        padding-top: 25px;
        padding-left: 20px
    }

    .stuOperate button {
        display: inline-block;
        height: 30px;
        padding: 0px 15px;
    }

    .patientLogo {
        /*width: 54px;
        height: 54px;*/
        /*margin-left: 22px;*/
        /*margin-top: 13px;*/
        align-content: center;
        justify-content: center;
        margin-top: 20px;
    }

    .patientLogo img {
        display: inline-block;
        width: 54px;
        height: 54px;
        -webkit-border-radius: 27px;
        -moz-border-radius: 27px;
        border: 2px solid #57CAFB;
    }

    .toolBox {
        width: 1080px;
        height: 80px;
        margin: 0 auto;
        padding-left: 30px;
        display: flex;
        align-items: center;
    }

    .selectTitle {
        display: inline-block;
        font-size: 18px;
        margin-right: 15px
    }

    .selectTitle:nth-child(2) {
        margin-left: 15px;
        margin-right: 0
    }

    .toolBox>span {
        display: inline-block;
        width: 96px;
        height: 38px
    }

    .skillLeft {
        display: inline-block;
        width: 50px;
    }

    .skilllist .skillLeft {
        vertical-align: top
    }

    .skillRight {
        display: inline-block;
        width: 40px;
    }

    .skillRight>span {
        display: inline-block;
        width: 40px
    }

    .longLength {
        width: 80px
    }

    .stuHubby .skillLeft {
        vertical-align: top
    }

    .transEnd {
        width: 100px;
        display: inline-block;
        vertical-align: top
    }

    .transStart {
        width: 300px;
        display: inline-block;
        vertical-align: top
    }

    .transBtn {
        display: block;
        float: right;
    }

    .newGroup {
        font-size: 16px;
        margin-left: 15px;
        margin-right: 10px
    }

    .selecedBox {
        display: block;
        margin-left: 275px
    }

    .el-form-item {
        margin-bottom: 28px;
    }

    .institutionBox {
        display: flex;
        flex-direction: row;
        padding-left: 24px;
        padding-right: 12px;
    }

    .institutionBox span {
        width: 90px;
        line-height: 1;
        padding: 11px 12px 11px 0;
    }


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
        width: 200px;
        margin-right: 15px;
    }

    .onc-input:focus {
        border: 1px solid rgba(32, 160, 255, 1);
    }

</style>
