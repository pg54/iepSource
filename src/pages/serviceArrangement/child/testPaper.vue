<template>
    <div class="testPaper">
        <div class="toolBox">
            <div class="blockItem" style="width: 140px">
                <span>名称:</span>
                <el-input v-model="form.patient" style="width: 100px" disabled></el-input>
            </div>
            <div class="blockItem" style="width: 140px">
                <span>性别:</span>
                <el-select v-model="form.sex"  style="width: 100px" disabled>
                    <el-option
                            v-for="(item, index) in sexOptions"
                            :key="item.value"
                            :label=item.label
                            :value=item.value>
                    </el-option>
                </el-select>
            </div>
            <div class="blockItem" style="width: 280px">
                <span>出生日期:</span>
                <el-date-picker type="date" placeholder="" v-model="form.date1" style="width: 200px" disabled></el-date-picker>
            </div>
            <div class="blockItem" style="width: 280px">
                <span>诊断日期:</span>
                <el-time-picker type="fixed-time" placeholder="" v-model="form.date2" style="width: 200px" disabled></el-time-picker>

            </div>
            <div class="blockItem" style="width: 160px">
                <span>诊断人:</span>
                <el-input v-model="form.patient" style="width: 100px" disabled></el-input>
            </div>

        </div>
        <div class="formBox">
                <div class="tabs">
                    <div class="tabs-chose">
                        <li v-for="(paper, index) in testPaperContentData.Papers"
                            :class="{active : currentTab === index }"
                            @click="currentTab = index">
                            <p style="font-size: 16px">{{paper.Name}}</p>
                        </li>
                    </div>
                        <div class="tab-content" v-for="(paper, paperIndex) in testPaperContentData.Papers">
                            <div class="secondLevel">
                                <div v-for="(section, sectionIndex) in paper.Sections">
                                    <li class="chaptTitle"
                                        :class="{secondActive : secondTab === sectionIndex }"
                                        @click="secondTab = sectionIndex">{{section.Name}}</li>
                                    <div v-show="secondTab === sectionIndex" class="questionsBox">
                                        <div v-for="(question, questionIndex) in section.Questions" class="questiones">
                                            <p class="questionDescrib">题{{questionIndex+1}}:  {{ question.Description}}</p>
                                            <div v-for="(option, optionIndex) in question.Options">
                                                <input  class="radioclass " type="radio" :value="option.Sequence" :id="question.ID*(optionIndex+1001)"
                                                            :name="question.Description"
                                                            v-model="testPaperFormData.Papers[paperIndex].Sections[sectionIndex].Questions[questionIndex].Result"  >
                                                <label :for="question.ID*(optionIndex+1001)" class="simbleBox"></label>
                                                <label >{{ option.Name }}</label>
                                            </div>
                                            <br>
                                        </div>
                                        <div class="submitBox">
                                            <el-button type="primary" @click="submitTestContent(section)">完成</el-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
        </div>

    </div>
</template>
<script>
    import { getTestPaperContent, sendTestPaper } from '../../../api/api';
    export default {
        name: 'testPaper',
        data() {
            return {
                questionAnswers: [],
                testPaperContentData: [],
                testPaperFormData: [],
                updateData: [],
                currentTab: 0,
                secondTab: 0,
                selectedGroup: this.$store.state.mystudent.patientList,
                selectedPacientIDS: '',
                selectedGroupPacientes: [],
                patientAgents: [],
                testID: '',
                patientID: '',
                sexOptions: [
                    {label: '男', value: 1},
                    {label: '女', value: 0}
                ],
                form : {
                    patient: '',
                    sex: '',
                    date1: '',
                    date2: '',
                },
                notChosed: false
            };
        },
        props: ['course_id', 'patiend_id', 'examID'],
        methods: {
            requesTestPaperData() {
                let paperPackageID = this.course_id;
                this.setPatientInfo(this.patiend_id);
                this.testID = this.examID;
                getTestPaperContent(paperPackageID).then(res => {
                    this.form.testDate = res.CreatedOn;
                    this.testPaperFormData = Object.assign({},res);
                    this.testPaperContentData = res;
                });
            },
          setPatientInfo(paticentID) {
            let originData = this.$store.state.mystudent.patientList;
            for (let i=0;i<originData.length;i++) {
              if (originData[i].groupPatients.length) {
                for (let k=0;k<originData[i].groupPatients.length;k++) {
                  if (originData[i].groupPatients[k].ID === paticentID) {
                    this.form.patient = originData[i].groupPatients[k].Name;
                    this.form.sex = originData[i].groupPatients[k].Sex;
                    this.form.date1 = originData[i].groupPatients[k].BirthDate;
                    this.form.date2 = new Date();
                  }
                }
              }
            }
          },
          submitTestContent(obj) {
            let qustionAnswers = [];
            let originData = this.testPaperFormData.Papers;
            for(let i=0;i<originData.length;i++) {   //试卷

              for (let j = 0; j < originData[i].Sections.length; j++) {  //章节
                  if (obj === originData[i].Sections[j]) {
                      for (let k = 0; k < originData[i].Sections[j].Questions.length; k++) {  //问题

                          if (originData[i].Sections[j].Questions[k].Result) {
                              let unitForm = {
                                  QuestionID: originData[i].Sections[j].Questions[k].ID,
                                  Result: originData[i].Sections[j].Questions[k].Result
                              };
                              qustionAnswers.push(unitForm);
                          }
                      }
                  }
              }
            }
            sendTestPaper(this.testID, qustionAnswers).then(res => {
                if(res.Code === 0) {
                    this.$message.success('正常');
                } else if(res.Code === 1){
                    this.$message.wraning('指定的评估不存在');
                } else if(res.Code === 2) {
                    this.$message.wraning('指定的评估不属于当前用户');
                } else if(res.Code === 3) {
                    this.$message.wraning('请指定患者');
                } else if (res.Code === 4) {
                    this.$message.wraning('指定的患者不属于当前医生');
                } else {
                    this.$message.error(res.Msg);
                }
            });
          },
        },
        created() {
            this.requesTestPaperData();
        }
    };
</script>
<style scoped>
    .testPaper {position: absolute;width: 1185px;top: 0;left: 0;height: 583px;z-index: 10;}
    .toolBox {width: 1220px;margin: 0 auto;height: 66px;}
    .blockItem {display: inline-block;height: 60px;line-height: 60px;margin-right: 20px}
    .formBox {position: relative;width: 100%;height: 517px;border-top: 1px solid #cccccc}
    .tabs {position: absolute;width: 1180px;height: 517px;top: 0;left: 0;}
    .submitBox{width: 100%;height: 60px;display: flex;align-items: center;justify-content: flex-end;margin-bottom: 10px}
    .tabs-chose {position: absolute;width: 94px;height: 517px;border-right: 1px solid #EFEFEF;}
    .secondLevel {position: absolute;width: 106px;height: 517px;left: 94px;top: 0}
    .questionsBox {position: absolute;width: 900px;height: 517px;left: 106px;top: 0;overflow-y: scroll;border-left: 1px solid #cccccc}
    .questiones {padding-left: 68px}
    .tab-content {
        width: 1000px;
        margin: 30px auto;
    }
    .tabs-chose li{
        width: 94px;
        height: 60px;
        /*background-color: RGBA(238, 239, 240, 1.00);*/
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .tabs-chose .active {
        /*background-color: #ffffff;*/
        color: #31BBFC;
    }
    .chaptTitle {
        width: 106px;
        height: 40px;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
     .secondActive {
        background-color: #ffffff;
        color: RGBA(32, 160, 255, 1.00);
    }
    .optionsSpace {width: 100%;height: 20px}
    .testWrap {width: 100px}
    .questionDescrib {font-size: 16px;margin-top: 24px;margin-bottom: 12px}
    .radioclass {
        display: inline-block;
        width: 18px;
        height: 18px;
        opacity: 0;
        cursor: pointer;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
        filter: alpha(opacity=0);
    }
    .simbleBox {
        display: inline-block;
        width: 18px;
        height: 18px;
        background-image: url("../../../assets/images/serviceToolImg/默认选框.png");
    }
    input[type=radio]:checked + label {
        background-image: url("../../../assets/images/serviceToolImg/选中选框.png");
    }
</style>
