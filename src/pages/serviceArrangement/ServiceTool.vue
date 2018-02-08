<template>
    <div class="main">
        <div class="pageNavbar">
            <span style="color: black">当前位置&nbsp;&nbsp;>&nbsp;&nbsp;</span>
            <span @click="backroute">{{ tabs[currentTab] }}&nbsp;&nbsp;>&nbsp;&nbsp;</span>
            <!--评测管理 -->
            <span v-if=" currentTab === 5 && testStatuses[1] ">开始评测</span>
            <span v-if=" currentTab === 5 && !testStatuses[0] && !testStatuses[1]" @click="gobackTestList">评估列表&nbsp;&nbsp;>&nbsp;&nbsp;</span>
            <span v-show=" currentTab === 5 && testStatuses[3] ">
                <i style="color: rgba(49, 187, 252, 1)">{{ chosedPatient}}</i>的评估结果&nbsp;&nbsp;>&nbsp;&nbsp;</span>
            <span v-show=" currentTab === 5 && testStatuses[4] ">
                <span style="color: rgba(49, 187, 252, 1)">{{ chosedPatient}}</span>的评估报告&nbsp;&nbsp;>&nbsp;&nbsp;</span>
            <!--CPEP评估-->
            <span v-if=" currentTab === 2 && CPEPVisible[1] ">开始评测</span>
            <span v-if=" currentTab === 2 && !CPEPVisible[0] && !CPEPVisible[1]" @click="gobackCPEPList">评估列表&nbsp;&nbsp;>&nbsp;&nbsp;</span>
            <span v-show=" currentTab === 2 && CPEPVisible[3] ">
                <i style="color: rgba(49, 187, 252, 1)">{{ chosedPatient}}</i>的评估结果&nbsp;&nbsp;>&nbsp;&nbsp;</span>
            <span v-show=" currentTab === 2 && CPEPVisible[4] ">
                <span style="color: rgba(49, 187, 252, 1)">{{ chosedPatient}}</span>的评估报告&nbsp;&nbsp;>&nbsp;&nbsp;</span>

            <!-- <span v-if=" currentTab === 2 && !CPEPVisible[0] && !CPEPVisible[2] && !cpepSratus">开始评测</span> -->
            <!-- <span v-if=" currentTab === 2 && !CPEPVisible[0] && !CPEPVisible[2] && cpepSratus">评测详情</span>
            <span v-if=" currentTab === 2 && !CPEPVisible[0] && !CPEPVisible[1] ">已评测列表</span> -->

            <span v-if=" currentTab === 6 && testStatuses[1] ">开始评测</span>
            <span v-if=" currentTab === 6 && !entranceStatuses[0] && !entranceStatuses[1]" @click="gobackEntranceList">评估列表&nbsp;&nbsp;>&nbsp;&nbsp;</span>
            <span v-show=" currentTab === 6 && entranceStatuses[3] ">
                <span style="color: rgba(49, 187, 252, 1)">{{ chosedPatient}}</span>的评估结果&nbsp;&nbsp;>&nbsp;&nbsp;</span>
            <span v-show=" currentTab === 6 && entranceStatuses[4] ">
                <span style="color: rgba(49, 187, 252, 1)">{{ chosedPatient}}</span>的评估报告&nbsp;&nbsp;>&nbsp;&nbsp;</span>
        </div>
        <div class="tabs" v-show="tabsShow">
            <div class="tabs-chose" id='tabsTarget'>
                <li v-for="(tab, index) in tabs" :class="{active : currentTab === index }" @click="currentTab = index;CPEPVisible = [true,false,false];choseCPEPvisible = false;testStatuses = [true,false,false,false,false];">{{tab}}
                </li>
            </div>
            <div class="tabs-content">
                <!--动态-->
                <div v-show="currentTab === 0" class="tab-content">
                    <ServiceDyma></ServiceDyma>
                </div>
                <!--咨询管理-->
                <div v-show="currentTab === 1" class="tab-content">
                    <div class="center-content">
                        <div class="toolBox">
                            <el-button @click="toAddPaper(21)">
                                <Icon type="plus-round"></Icon>添加表格
                            </el-button>
                        </div>
                        <el-card class="cardBox colorHeader" :body-style="{ padding: '0px'}">
                            <div class="tableWrap">
                                <el-table :data="consultData" style="width: 100%">
                                    <el-table-column type="index" width="60">
                                    </el-table-column>

                                    <el-table-column prop="Name" label="名称" width="180">
                                    </el-table-column>
                                    <el-table-column prop="TotalCount" label="已发送个数" width="180">
                                    </el-table-column>
                                    <el-table-column prop="FinishedCount" label="已完成个数">
                                    </el-table-column>
                                    <el-table-column prop="CreatedOn" label="创建时间">
                                    </el-table-column>

                                    <el-table-column label="操作">
                                        <template scope="scope">
                                            <el-button size="mini" :plain="true" type="info" @click="checkPaper(scope.$index, scope.row)">查看填写结果</el-button>
                                            <el-button size="mini" :plain="true" type="warning" @click="sendtoPaticent(scope.$index, scope.row)">发放</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-card>
                    </div>
                </div>
                <!--评测管理-->
                <div v-show="currentTab === 5" class="tab-content testManager">
                    <div v-if="testStatuses[0]">
                        <div class="toolBox">
                            <el-button @click="addTestPaper">
                                <Icon type="plus-round"></Icon>新建评估表
                            </el-button>
                        </div>
                        <el-card class="cardBox colorHeader" :body-style="{ padding: '0px'}">
                            <div class="tableWrap" style="height: 480px">
                                <el-table :data="testPaperListData" style="width: 100%">
                                    <el-table-column type="index" width="70">
                                    </el-table-column>

                                    <el-table-column prop="Name" label="评测表名称" width="160">
                                    </el-table-column>

                                    <el-table-column prop="PackageName" label="课程包名称">
                                    </el-table-column>

                                    <el-table-column prop="CreatedOn" label="创建时间">
                                    </el-table-column>

                                    <el-table-column label="操作">
                                        <template scope="scope">
                                            <el-button size="mini" :plain="true" type="info" @click="startTest(scope.$index, scope.row)">开始新评测</el-button>
                                            <el-button size="mini" :plain="true" type="warning" @click="checkTestPaticent(scope.$index, scope.row)">已评测患者</el-button>
                                            <el-button size="mini" :plain="true" type="danger" @click="deleteExam(scope.$index, scope.row, false)">删除</el-button>
                                        </template>
                                    </el-table-column>

                                </el-table>
                            </div>
                            <el-pagination layout="prev, pager, next" @current-change="testPaperListChange" :page-size="10" :total="testPaperTotal" style="float:right;"></el-pagination>
                        </el-card>
                    </div>
                    <div v-if="testStatuses[1]" class="moveLeft">
                        <!--<TestPaper :course_id="paperCourseID" :patiend_id="paperPatientID" :examID="paperExamID"></TestPaper>-->
                        <TestResult :paticentID="resultPaticentID" :testID="resultTestID" :isComplete="completeTest"></TestResult>
                    </div>
                    <div v-if="testStatuses[2]" class="testStudent" style="z-index: 100">
                        <el-card class="newCardBox colorHeader" :body-style="{ padding: '0px'}">
                            <div class="tableWrap">
                                <el-table :data="testedPatientListData" style="width: 100%">
                                    <el-table-column type="index" width="80">
                                    </el-table-column>

                                    <el-table-column prop="ExamName" label="评测名称">
                                    </el-table-column>

                                    <el-table-column prop="Name" label="姓名">
                                    </el-table-column>

                                    <el-table-column label="操作" width="300">
                                        <template scope="scope">
                                            <el-button v-if="!scope.row.Status" size="mini" :plain="true" type="info" @click="checkPacientTestDetail(scope.$index, scope.row, false, false)">继续评测</el-button>
                                            <el-button v-if="!scope.row.Status" size="mini" :plain="true" type="info" @click="toDeleteExamPatient(scope.$index, scope.row, false)">删除</el-button>
                                            <el-button v-if="scope.row.Status" size="mini" :plain="true" type="info" @click="checkPacientTestresult(scope.$index, scope.row, true, false)">分析表</el-button>
                                            <el-button v-if="scope.row.Status" size="mini" :plain="true" type="info" @click="checkPacientTestReport(scope.$index, scope.row, false)">评估报告</el-button>
                                        </template>
                                    </el-table-column>

                                </el-table>

                            </div>
                            <el-pagination layout="prev, pager, next" @current-change="testedPatientListNextPage" :page-size="10" :total="testedPatientListTotal"
                                style="float:right;"></el-pagination>
                        </el-card>
                    </div>
                    <div v-if="testStatuses[3]" class="moveLeft">
                        <TestResult :paticentID="resultPaticentID" :testID="resultTestID" :isComplete="completeTest"></TestResult>
                    </div>
                    <div v-if="testStatuses[4]" class="moveLeft">
                        <TestReport :testID="reportID" :paticentID="reportPaticentID"></TestReport>
                    </div>
                </div>

                <!--训练管理-->
                <div v-show="currentTab === 3">
                    <div class="center-content">
                        <div class="toolBox">
                            <el-button @click="toAddPaper(41)">
                                <Icon type="plus-round"></Icon>添加表格
                            </el-button>
                        </div>
                        <el-card class="cardBox colorHeader " :body-style="{ padding: '0px'}">
                            <div class="tableWrap">
                                <el-table :data="trainingData" style="width: 100%">
                                    <el-table-column type="index" width="70">
                                    </el-table-column>

                                    <el-table-column prop="Name" label="名称" width="180">
                                    </el-table-column>
                                    <el-table-column prop="TotalCount" label="已发送个数" width="180">
                                    </el-table-column>
                                    <el-table-column prop="FinishedCount" label="已完成个数">
                                    </el-table-column>
                                    <el-table-column prop="CreatedOn" label="创建时间">
                                    </el-table-column>

                                    <el-table-column label="操作">
                                        <template scope="scope">
                                            <el-button size="mini" :plain="true" type="info" @click="checkPaper(scope.$index, scope.row)">查看填写结果</el-button>
                                            <el-button size="mini" :plain="true" type="warning" @click="sendtoPaticent(scope.$index, scope.row)">发放</el-button>
                                        </template>
                                    </el-table-column>

                                </el-table>
                            </div>
                        </el-card>
                    </div>
                </div>

                <!--随访中心-->
                <div v-show="currentTab === 4">
                    <vueTab :tabtitles="['反馈表','复查表','关心提醒']" :current-page="1">
                        <div class="tab-content-container">
                            <div class="center-content">
                                <div class="toolBox">
                                    <el-button @click="toAddPaper(11)">
                                        <Icon type="plus-round"></Icon>添加表格
                                    </el-button>
                                </div>
                                <el-card class="cardBox colorHeader shortLength" :body-style="{ padding: '0px'}">
                                    <div class="tableWrap" style="overflow-y: scroll">
                                        <el-table :data="feedbackData" style="width: 100%">
                                            <el-table-column type="index" width="70">
                                            </el-table-column>

                                            <el-table-column prop="Name" label="名称" width="180">
                                            </el-table-column>
                                            <el-table-column prop="TotalCount" label="已发送个数" width="180">
                                            </el-table-column>
                                            <el-table-column prop="FinishedCount" label="已完成个数">
                                            </el-table-column>
                                            <el-table-column prop="CreatedOn" label="创建时间">
                                            </el-table-column>

                                            <el-table-column label="操作">
                                                <template scope="scope">
                                                    <el-button size="mini" :plain="true" type="info" @click="checkPaper(scope.$index, scope.row)">查看填写结果</el-button>
                                                    <el-button size="mini" :plain="true" type="warning" @click="sendtoPaticent(scope.$index, scope.row)">发放</el-button>
                                                </template>
                                            </el-table-column>

                                        </el-table>
                                    </div>
                                </el-card>
                            </div>
                        </div>
                        <div class="tab-content-container">
                            <div class="center-content">

                                <div class="toolBox">
                                    <el-button @click="toAddPaper(12)">
                                        <Icon type="plus-round"></Icon>添加表格
                                    </el-button>

                                </div>
                                <el-card class="cardBox colorHeader shortLength" :body-style="{ padding: '0px'}">
                                    <div class="tableWrap">
                                        <el-table :data="reviewData" style="width: 100%">
                                            <el-table-column type="index" width="50">
                                            </el-table-column>

                                            <el-table-column prop="Name" label="名称" width="180">
                                            </el-table-column>
                                            <el-table-column prop="TotalCount" label="已发送个数" width="180">
                                            </el-table-column>
                                            <el-table-column prop="FinishedCount" label="已完成个数">
                                            </el-table-column>
                                            <el-table-column prop="CreatedOn" label="创建时间">
                                            </el-table-column>

                                            <el-table-column label="操作">
                                                <template scope="scope">
                                                    <el-button size="mini" :plain="true" type="info" @click="checkPaper(scope.$index, scope.row)">查看填写结果</el-button>
                                                    <el-button size="mini" :plain="true" type="warning" @click="sendtoPaticent(scope.$index, scope.row)">发放</el-button>
                                                </template>
                                            </el-table-column>

                                        </el-table>
                                    </div>
                                </el-card>
                            </div>
                        </div>
                        <div class="tab-content-container">
                            <div class="center-content">

                                <div class="toolBox">
                                    <el-button @click="toAddPaper(13)">
                                        <Icon type="plus-round"></Icon>添加表格
                                    </el-button>
                                </div>
                                <el-card class="cardBox colorHeader shortLength" :body-style="{ padding: '0px'}">
                                    <div class="tableWrap">
                                        <el-table :data="remindData" style="width: 100%">
                                            <el-table-column type="index" width="80">
                                            </el-table-column>

                                            <el-table-column prop="Name" label="名称" width="180">
                                            </el-table-column>
                                            <el-table-column prop="TotalCount" label="已发送个数" width="180">
                                            </el-table-column>
                                            <el-table-column prop="FinishedCount" label="已完成个数">
                                            </el-table-column>
                                            <el-table-column prop="CreatedOn" label="创建时间">
                                            </el-table-column>

                                            <el-table-column label="操作">
                                                <template scope="scope">
                                                    <el-button size="mini" :plain="true" type="info" @click="checkPaper(scope.$index, scope.row)">查看填写结果</el-button>
                                                    <el-button size="mini" :plain="true" type="warning" @click="sendtoPaticent(scope.$index, scope.row)">发放</el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </el-card>
                            </div>
                        </div>
                    </vueTab>
                </div>
                <!--CPEP-->
                <div v-show="currentTab === 2">
                    <div class="cpepContentWrap">
                        <div class="center-content">
                            <div v-if="CPEPVisible[0]">
                                <el-card class="cardBox colorHeader" :body-style="{ padding: '0px'}">
                                    <div class="tableWrap" style="height: 480px">
                                        <el-table :data="CPEPPapersdata" style="width: 100%">

                                            <el-table-column prop="Name" label="名称">
                                            </el-table-column>

                                            <el-table-column label="操作">
                                                <template scope="scope">
                                                    <el-button size="mini" :plain="true" type="info" @click="startCPEPTest(scope.row.ID, scope.$index + 1)">开始测试</el-button>
                                                    <el-button size="mini" :plain="true" type="warning" @click="checkTestedMembers(scope.row.ID, scope.$index + 1)">已评测患者</el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                    <el-pagination layout="prev, pager, next" @current-change="testPaperListChange" :page-size="10" :total="testPaperTotal" style="float:right;"></el-pagination>
                                </el-card>
                            </div>
                            <div v-if="CPEPVisible[1]" class="moveLeft">
                                <div class="cpepWrap cpep_scrollbar" v-if="cpepPaperType === 1">
                                    <div style="width: 750px; margin: 0 auto">
                                        <serviceCPEP v-on:backToserviceTool="backroute" :cpepData="cpepSdata" :cpepPaperID='postCPEPPaperID' :pacientID="choseToTestPatient"
                                        :isResultPage="cpepSratus" :isFirstTimeTest="cpepFirstTest" :cpepMemberID="cpMemberID"></serviceCPEP>
                                    </div>
                                </div>
                                <div class="cpepWrap cpep_scrollbar" v-if="cpepPaperType === 2">
                                    <CPEPFeeling v-on:backToserviceTool="backroute" :cpepData="cpepSdata" :cpepPaperID='postCPEPPaperID' :pacientID="choseToTestPatient"
                                        :isResultPage="cpepSratus" :isFirstTimeTest="cpepFirstTest" :cpepMemberID="cpMemberID"></CPEPFeeling>
                                </div>
                                <div class="cpepWrap cpep_scrollbar" v-if="cpepPaperType === 3">
                                    <CPEPselfCare v-on:backToserviceTool="backroute" :cpepData="cpepSdata" :cpepPaperID='postCPEPPaperID' :pacientID="choseToTestPatient"
                                        :isResultPage="cpepSratus" :isFirstTimeTest="cpepFirstTest" :cpepMemberID="cpMemberID" :setContent='false'></CPEPselfCare>
                                </div>
                            </div>
                            <div v-if="CPEPVisible[2]" class="testStudent" style="z-index: 100">
                                <el-card class="cardBox colorHeader" :body-style="{ padding: '0px'}">
                                    <div class="tableWrap">
                                        <el-table :data="cpepMemdbersData.Records" style="width: 100%">
                                            <el-table-column type="index" width="60">
                                            </el-table-column>

                                            <el-table-column prop="PatientAgentName" label="名称" width="180">
                                            </el-table-column>

                                            <el-table-column prop="ModifiedOn" label="修改时间">
                                            </el-table-column>

                                            <el-table-column prop="CreatedOn" label="创建时间">
                                            </el-table-column>

                                            <el-table-column label="操作">
                                                <template scope="scope">
                                                    <el-button v-if="scope.row.Status === 0" size="mini" :plain="true" type="info" @click="continueCPEPTest(scope.$index, scope.row)">继续评测</el-button>
                                                    <el-button v-if="scope.row.Status != 0" size="mini" :plain="true" type="info" @click="checkCPEPResult(scope.$index, scope.row)">查看填写结果</el-button>
                                                    <el-button v-if="scope.row.Status != 0 && cpepPaperType != 3" size="mini" :plain="true" type="info" @click="checkCPEPReport(scope.$index, scope.row)">分析图表</el-button>
                                                    <el-button size="mini" :plain="true" type="danger" @click="deleteCPEP(scope.$index, scope.row)">删除</el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </el-card>
                            </div>
                            <div v-if="CPEPVisible[3]" class="moveLeft">
                                <div class="cpepWrap cpep_scrollbar" v-if="cpepPaperType === 1">
                                    <serviceCPEP v-on:backToserviceTool="backroute" :cpepData="cpepSdata" :cpepPaperID='postCPEPPaperID' :pacientID="choseToTestPatient"
                                        :isResultPage="cpepSratus" :isFirstTimeTest="cpepFirstTest" :cpepMemberID="cpMemberID"></serviceCPEP>
                                </div>
                                <div class="cpepWrap cpep_scrollbar" v-if="cpepPaperType === 2">
                                        <CPEPFeeling v-on:backToserviceTool="backroute" :cpepData="cpepSdata" :cpepPaperID='postCPEPPaperID' :pacientID="choseToTestPatient"
                                        :isResultPage="cpepSratus" :isFirstTimeTest="cpepFirstTest" :cpepMemberID="cpMemberID"></CPEPFeeling>
                                </div>
                                <div class="cpepWrap cpep_scrollbar" v-if="cpepPaperType === 3">
                                    <CPEPselfCare v-on:backToserviceTool="backroute" :cpepData="cpepSdata" :cpepPaperID='postCPEPPaperID' :pacientID="choseToTestPatient"
                                        :isResultPage="cpepSratus" :isFirstTimeTest="cpepFirstTest" :cpepMemberID="cpMemberID" :setContent='false'></CPEPselfCare>
                                </div>
                            </div>
                            <div v-if="CPEPVisible[4]" class="moveLeft">
                                <div class="cpepWrap cpep_scrollbar" v-if="cpepPaperType === 1">
                                    <CPEPPaper :cpepChartData="cpepDevResult" :setContent='false'></CPEPPaper>
                                </div>
                                <div class="cpepWrap cpep_scrollbar" v-if="cpepPaperType === 2">
                                    <div style="width:715px;margin: 0 auto;">
                                        <cpepFeelingChart :cpepData="cpepFeelingdata" :isResultPage="true" :setContent='false'></cpepFeelingChart>
                                    </div>
                                </div>
                                <div class="cpepWrap cpep_scrollbar" v-if="cpepPaperType === 3">
                                    <p style="text-align: center">自理能力分析</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 入学评测 -->
                <div v-show="currentTab === 6" class="tab-content testManager">
                    <div v-if="entranceStatuses[0]">
                        <div class="toolBox">
                            <el-button @click="addEntrancePaper">
                                <Icon type="plus-round"></Icon>新建评估表
                            </el-button>
                        </div>
                        <el-card class="cardBox colorHeader" :body-style="{ padding: '0px'}">
                            <div class="tableWrap" style="height: 480px">
                                <el-table :data="entranceListData" style="width: 100%">
                                    <el-table-column type="index" width="70">
                                    </el-table-column>

                                    <el-table-column prop="Name" label="名称" width="160">
                                    </el-table-column>

                                    <el-table-column prop="PackageName" label="课程包名称">
                                    </el-table-column>

                                    <el-table-column prop="CreatedOn" label="创建时间">
                                    </el-table-column>

                                    <el-table-column label="操作">
                                        <template scope="scope">
                                            <el-button size="mini" :plain="true" type="info" @click="startNewEnterance(scope.$index, scope.row)">开始新评测</el-button>
                                            <el-button size="mini" :plain="true" type="warning" @click="checkEntrancePaticent(scope.$index, scope.row)">已评测患者</el-button>
                                            <el-button size="mini" :plain="true" type="danger" @click="deleteExam(scope.$index, scope.row, true)">删除</el-button>
                                        </template>
                                    </el-table-column>

                                </el-table>
                            </div>
                            <el-pagination layout="prev, pager, next" @current-change="testPaperListChange" :page-size="10" :total="testPaperTotal" style="float:right;"></el-pagination>
                        </el-card>
                    </div>
                    <div v-if="entranceStatuses[1]" class="moveLeft">
                        <!--<TestPaper :course_id="paperCourseID" :patiend_id="paperPatientID" :examID="paperExamID"></TestPaper>-->
                        <TestResult :paticentID="resultPaticentID" :testID="resultTestID" :isComplete="completeTest"></TestResult>
                    </div>
                    <div v-if="entranceStatuses[2]" class="testStudent" style="z-index: 100">
                        <el-card class="newCardBox colorHeader" :body-style="{ padding: '0px'}">
                            <div class="tableWrap">
                                <el-table :data="entranceedPatientListData" style="width: 100%">
                                    <el-table-column type="index" width="80">
                                    </el-table-column>

                                    <el-table-column prop="ExamName" label="评测名称">
                                    </el-table-column>

                                    <el-table-column prop="Name" label="姓名">
                                    </el-table-column>

                                    <el-table-column label="操作" width="300">
                                        <template scope="scope">
                                            <el-button v-if="!scope.row.Status" size="mini" :plain="true" type="info" @click="checkPacientTestDetail(scope.$index, scope.row, false, true)">继续评测</el-button>
                                            <el-button v-if="!scope.row.Status" size="mini" :plain="true" type="info" @click="toDeleteExamPatient(scope.$index, scope.row, true)">删除</el-button>
                                            <el-button v-if="scope.row.Status" size="mini" :plain="true" type="info" @click="checkPacientTestresult(scope.$index, scope.row, true, true)">分析表</el-button>
                                            <el-button v-if="scope.row.Status" size="mini" :plain="true" type="info" @click="checkPacientTestReport(scope.$index, scope.row, true)">评估报告</el-button>
                                        </template>
                                    </el-table-column>

                                </el-table>

                            </div>
                            <el-pagination layout="prev, pager, next" @current-change="entrancedPatientListNextPage" :page-size="10" :total="entranceedPatientListTotal"
                                style="float:right;"></el-pagination>
                        </el-card>
                    </div>
                    <div v-if="entranceStatuses[3]" class="moveLeft">
                        <TestResult :paticentID="resultPaticentID" :testID="resultTestID" :isComplete="completeTest"></TestResult>
                    </div>
                    <div v-if="entranceStatuses[4]" class="moveLeft">
                        <TestReport :testID="reportID" :paticentID="reportPaticentID"></TestReport>
                    </div>
                </div>
            </div>
        </div>
        <router-view :key="key"></router-view>

        <el-dialog title="发送问卷" v-model="sendToPaticentVisible" :close-on-click-modal="false" @close="resetPatientList" :show-close="false">
            <el-select v-model="selectedPacientIDS" placeholder="请选择小组" @change="filterPacient">
                <el-option v-for="(item, index) in selectedGroup" :key="item.groupName" :label=item.groupName :value=index>
                </el-option>
            </el-select>

            <el-select v-model="pacientsIDS" placeholder="请选择患者" ref="pacientesSelecter">
                <el-option v-for="(item, index) in selectedGroupPacientes" :key="item.Name" :label=item.Name :value=item.ID>
                </el-option>
            </el-select>

            <div slot="footer" class="dialog-footer">
                <el-button @click.native="sendToPaticentVisible = false">返回</el-button>
                <el-button type="primary" class="transBtn" @click="sendToPacientSubmit()">发送</el-button>
            </div>
        </el-dialog>

        <el-dialog title="选择患者" v-model="choseToTestVisible" :close-on-click-modal="false" @close="resetChosePatientTest" :show-close="false">

            <el-select v-model="selectedPacientIDS" placeholder="请选择小组" @change="filterPacient">
                <el-option v-for="(item, index) in selectedGroup" :key="item.groupName" :label=item.groupName :value=index>
                </el-option>
            </el-select>

            <el-select v-model="choseToTestPatient" filterable placeholder="请选择患者">
                <el-option v-for="(item, index) in selectedGroupPacientes" :key="item.Name" :label=item.Name :value=item.ID>
                </el-option>
            </el-select>

            <div slot="footer" class="dialog-footer">
                <el-button @click.native="choseToTestVisible = false">返回</el-button>
                <el-button type="primary" class="testPaper" @click="choseToTestSubmit(false)">评测开始</el-button>
            </div>

        </el-dialog>


        <el-dialog title="入学评测选择患者" v-model="choseToEntranceTestVisible" :close-on-click-modal="false" @close="resetChosePatientTest"
            :show-close="false">

            <el-select v-model="selectedPacientIDS" placeholder="请选择小组" @change="filterPacient">
                <el-option v-for="(item, index) in selectedGroup" :key="item.groupName" :label=item.groupName :value=index>
                </el-option>
            </el-select>

            <el-select v-model="choseToTestPatient" placeholder="请选择患者">
                <el-option v-for="(item, index) in selectedGroupPacientes" :key="item.Name" :label=item.Name :value=item.ID>
                </el-option>
            </el-select>

            <div slot="footer" class="dialog-footer">
                <el-button @click.native="choseToEntranceTestVisible = false">返回</el-button>
                <el-button type="primary" class="testPaper" @click="choseToEntranceTestSubmit(false)">评测开始</el-button>
            </div>
        </el-dialog>


        <el-dialog title="已发送问卷" v-model="replyPatientListVisible" :close-on-click-modal="false">
            <el-table :data="editedPaperData" style="width: 100%">
                <el-table-column type="index">
                </el-table-column>

                <el-table-column prop="PatientName" label="姓名">
                </el-table-column>

                <el-table-column prop="Status" label="状态">
                    <template scope="scope">
                        <span>{{scope.row.Status?'已完成':'未完成'}}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="PaperName" label="表名">
                </el-table-column>

                <el-table-column prop="CreatedOn" label="创建时间" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button size="mini" :plain="true" type="info" @click="previewEditedForm(scope.$index, scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination layout="prev, pager, next" @current-change="reslutCurrentChange" :page-size="10" :total="resultTotal" style="float:right;"></el-pagination>

        </el-dialog>

        <el-dialog v-model="previewFormVisible" :close-on-click-modal="false" :show-close="false">
            <div class="paperContent">
                <QuestionPaper></QuestionPaper>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="previewFormVisible = false">返回</el-button>
            </div>
        </el-dialog>

        <el-dialog title="模板列表" v-model="createQuestionnaireVisible" :close-on-click-modal="false" :show-close="false">

            <el-table :data="paperTmeplateData" style="width: 100%">
                <el-table-column type="index" width="50">
                </el-table-column>

                <el-table-column prop="Name" label="名称" width="180">
                </el-table-column>

                <el-table-column prop="Comments" label="内容" width="180">
                </el-table-column>

                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button size="mini" :plain="true" type="info" @click="addForm(scope.$index, scope.row)">添加</el-button>
                        <el-button size="mini" :plain="true" type="warning" @click="previewForm(scope.$index, scope.row)">查看</el-button>
                    </template>
                </el-table-column>

            </el-table>

            <div slot="footer" class="dialog-footer">
                <el-button @click.native="createQuestionnaireVisible = false">返回</el-button>
            </div>
        </el-dialog>

        <el-dialog title="新建评估表" v-model="addTestPaperVisible" :close-on-click-modal="false" @close="testPaperCancel">
            <div class="addTestFormWrap">
                <el-form ref="addTestform" :rules="addTestRules" :model="testFormData" label-width="120px">
                    <el-form-item label="名称" prop='Name'>
                        <el-input v-model="testFormData.Name" type="mini" style="width: 100%"></el-input>
                    </el-form-item>
                    <el-form-item label="添加课程" prop='CourseIds'>
                        <div class="block">
                            <el-cascader style='width: 100%' change-on-select size="medium" expand-trigger="hover" :options="courseData" v-model="testFormData.CourseIds"
                                @change="handleChange">
                            </el-cascader>
                        </div>
                    </el-form-item>

                    <el-form-item label="已选中课程" v-show="multipleCourses.length">
                        <el-tag class="tag" v-for="(item, index) in multipleCourses" :key="index" type="primary">
                            {{item}}
                        </el-tag>
                    </el-form-item>
                </el-form>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button @click.native="testPaperCancel">返回</el-button>
                <el-button type="primary" @click.native="submitTestPaper">确认</el-button>
            </div>
        </el-dialog>

        <el-dialog title="" v-model="testPaperContentVisible" :close-on-click-modal="false" :show-close="false">
            <el-form>
                <div v-for="paper in testPaperContentData.Papers">
                    <h2>试卷名: {{paper.Name}}</h2>
                    <div v-for="section in paper.Sections">
                        <h3>章节: {{section.Name}}</h3>
                        <div v-for="question in section.Questions">
                            <p>{{ question.Description}}</p>
                            <p>{{ question.ID}}</p>
                            <el-radio-group v-model="questionAnswers.Result">
                                <el-radio v-for="option in question.Options" :key="option.Sequence" :label="option.Sequence">{{option.Name}}</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </div>
            </el-form>
        </el-dialog>

        <el-dialog title="选择患者" v-model="choseCPEPvisible" :close-on-click-modal="false" :show-close="false">

            <el-select v-model="selectedPacientIDS" placeholder="请选择小组" @change="filterPacient">
                <el-option v-for="(item, index) in selectedGroup" :key="item.groupID" :label=item.groupName :value=index>
                </el-option>
            </el-select>


            <el-select v-model="choseToTestPatient" filterable placeholder="请选择患者">
                <el-option v-for="(item, index) in selectedGroupPacientes" :key="item.PatientID" :label=item.Name :value=item.ID>
                </el-option>
            </el-select>

            <div slot="footer" class="dialog-footer">
                <el-button @click.native="choseCPEPvisible = false">返回</el-button>
                <el-button type="primary" class="testPaper" @click="choseToCPEP">开始评测</el-button>
            </div>
        </el-dialog>

        <el-dialog title="入学评测" v-model="addEntranceTestVisible" :close-on-click-modal="false" @close="entrancePaperCancel">
            <div class="addTestFormWrap">
                <el-form ref="addTestform" :model="entranceFormData" label-width="100px">
                    <el-form-item label="名称">
                        <el-input v-model="entranceFormData.Name" type="mini" style="width: 100%"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="课程包">
                        <el-select v-model="entranceFormData.PaperPackageID" placeholder="请选择课程包" style="width: 100%">
                            <el-option v-for="o in entrancePackageData" :label="o.Name" :value="o.ID"></el-option>
                        </el-select>
                    </el-form-item> -->
                </el-form>
            </div>
            <!-- <div class="addTestsubmit">
                <el-button @click.native="submitEntrancePaper">确认</el-button>
            </div> -->

            <div slot="footer" class="dialog-footer">
                <el-button @click.native="entrancePaperCancel">返回</el-button>
                <el-button @click.native="submitEntrancePaper" type="primary">确认</el-button>
            </div>

        </el-dialog>

    </div>
</template>
<script>
    import QuestionPaper from '../../components/QuestionPaper.vue';
    import TestPaper from './child/testPaper.vue';
    import TestResult from '../../components/resultPaper.vue';
    import TestReport from '../../components/reportPaper.vue';
    import ServiceDyma from './MyServiceDyma/MyServiceDyma.vue';
    import vueTab from '../../components/vue-tab.vue';
    import serviceCPEP from '../../components/serviceCPEP.vue';
    import CPEPFeeling from '../../components/CPEPFeeling.vue';
    import CPEPselfCare from '../../components/CPEPselfCare.vue';
    import cpepFeelingChart from '../../components/printCPEPFeelingChart.vue';
    import CPEPPaper from '../../components/printerCPEP.vue';
    import api from '../../api/index.js';
    export default {
        name: 'ServiceTool',
        components: {
            ServiceDyma,
            QuestionPaper,
            vueTab,
            TestPaper,
            TestResult,
            TestReport,
            serviceCPEP,
            CPEPFeeling,
            CPEPselfCare,
            cpepFeelingChart,
            CPEPPaper
        },
        computed: {
            key() {
                if (this.$router.currentRoute.path == '/serviceTool') {
                    this.tabsShow = true;
                    this.jumptoIepPlan();
                }
                return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date();
            },
            selectedGroup: function () {
                return this.$store.state.mystudent.patientList // 患者小组数组;
            }
        },
        data() {
            return {
                currentTab: 2,
                tabs: ['动态', '咨询管理', '评估', '训练管理', '随访中心', '评测管理', '入学评测'],
                zxPage: 1,
                pcPage: 1,
                xlPage: 1,
                fkbPage: 1,
                fcPage: 1,
                gxPage: 1,
                resultPage: 1,
                resultTotal: 1,
                studentListVisible: true,
                createQuestionnaireVisible: false,
                replyPatientListVisible: false,
                sendToPaticentVisible: false,
                previewFormVisible: false,
                addTestPaperVisible: false,
                testPaperContentVisible: false,
                testedPatientListVisible: false,
                reportAndResult: false,
                consultData: [], // 咨询管理
                paperConsultURL: '',
                testPaperListData: [], // 评测管理
                CPEPPapersdata: [],
                testPaperTotal: 1,
                cpepTestLoading: false,
                testPaperCurrentPage: 1,
                paperEvaluationURL: '',
                trainingData: [], // 训练管理
                paperTrainingURL: '',
                feedbackData: [], // 反馈表
                paperFeedbackURL: '',
                reviewData: [], // 负责复评
                paperReviewURL: '',
                remindData: [], // 关心提醒,
                paperRemindURL: '',
                testPaperContentData: [], // 评测内容data
                paperTmeplateData: [],
                testPaperData: [],
                editedPaperData: [],
                patientOptions: [],
                activeName: 2,
                sendListID: '',
                selectedGroupPacientes: [], // 小组中患者数组
                pacientsIDS: [],
                selectedPacientIDS: '',
                tabsShow: true,
                paperID: '',
                testFormData: {
                    Name: '',
                    CourseIds: []
                },
                addTestRules: {
                    Name: [{
                        required: true,
                        message: '请填写评估表名称',
                        trigger: 'blur'
                    }],
                    CourseIds: [{
                        type: 'array',
                        required: true,
                        message: '请至少选择一个课程',
                        trigger: 'change'
                    }]
                },
                multipleCourseIDs: [],
                multipleCourses: [],
                questionAnswers: [{
                    QuestionID: '',
                    Result: ''
                }],
                courseData: [],
                testedPatientListData: [],
                examID: '',
                examPatientID: '',
                testedPatientListTotal: 1,
                testedPatientCurrentPage: 1,
                choseToTestVisible: false,
                choseCPEPvisible: false, //CPEP
                choseToTestPatient: '',
                paperPackageID: '',
                testID: '',
                testStatuses: [true, false, false, false, false],
                resultPaticentID: '', //结果
                resultTestID: '', //结果
                reportPaticentID: '', //报告
                reportID: '', //报告
                paperCourseID: '', //答题页面
                paperPatientID: '', //答题页面
                paperExamID: '', //答题页面-试卷ID,
                completeTest: false,
                chosedPatient: '', //选中的患者
                consfirmDeleteExamMsg: '',
                cpepSdata: [],
                cpepPid: '',
                CPEPVisible: [true, false, false, false, false],
                cpepMemdbersData: '',
                cpepSratus: false,
                addEntranceTestVisible: false, //入学评测
                choseToEntranceTestVisible: false,
                entranceStatuses: [true, false, false, false, false],
                entrancePackageData: [],
                entranceFormData: {
                    Name: '',
                    PaperPackageID: ''
                },
                entranceListData: [], //入学评测列表数据源
                entrancePaperTotal: 1,
                entrancePaperCurrentPage: 1,
                entranceedPatientListData: [],
                entranceedPatientListTotal: 1,
                entrancedPatientCurrentPage: 1,
                cpMemberID: '',
                cpepFirstTest: true,
                cpepPaperID: '',
                cpepPaperType: 1,
                postCPEPPaperID: '',
                cpepFeelingdata: [],
                cpepDevResult: []
            };
        },
        watch: {
            '$route': 'init'
        },
        methods: {
            init() {
                this.studentListVisible = true;
                this.createQuestionnaireVisible = false;
                this.replyPatientListVisible = false;
                this.sendToPaticentVisible = false;
                this.previewFormVisible = false;
                this.addTestPaperVisible = false;
                this.testPaperContentVisible = false;
                this.testedPatientListVisible = false;
                this.tabsShow = true;
                this.choseToTestVisible = false;
                this.requestInitData();
            },
            backroute() {
                this.getTestList(1);
                this.testStatuses = [true, false, false, false, false];
                this.getentranceList(1);
                this.entranceStatuses = [true, false, false, false, false];
                this.CPEPVisible = [true, false, false];
                this.cpepSratus = false;
            },
            gobackTestList() {
                this.testStatuses = [false, false, true, false, false];
                this.requestTestPaticent(this.testedPatientCurrentPage);
            },
            gobackCPEPList() {
                this.testStatuses = [false, false, true, false, false];
                this.requestMembers();
                // this.requestTestPaticent(this.testedPatientCurrentPage);
            },
            gobackEntranceList() {
                this.entranceStatuses = [false, false, true, false, false];
                this.requestEntrancePaticent(this.entrancedPatientCurrentPage);
            },
            formatStatus: function (row, column) {
                let status = row.Status;
                let statusResult;
                switch (status) {
                    case 0:
                        statusResult = '未完成';
                        break;
                    case 1:
                        statusResult = '已完成';
                        break;
                };
                return statusResult;
            },
            getCheckBoxContents() {
                api.getIEPCourses().then(res => {
                    this.courseData = this.cascaderFormater(res.data.Data);
                });
            },
            cascaderFormater(data) {
                for (let i = 0, j = data.length; i < j; i++) { //这里的i最大为99，潜在bug
                    data[i].ID = String(i + 1);
                    for (let k = 0, g = data[i].Children.length; k < g; k++) {
                        if (data[i].Children[k].ID === 0) { //接口返回的ID都是0，后面可能有变化，潜在bug
                            data[i].Children[k].ID = String(100 * (i + 1) + k)
                        }
                    }
                }
                return JSON.parse(JSON.stringify(data).replace(/ID/g, "value").replace(/Name/g, "label").replace(
                    /Children/g, "children"));
            },
            jumptoIepPlan() { // route变化触发
                this.$router.push('/serviceTool');
            },
            checkPacientTestDetail(index, row, isComplete, isEntrance) {
                if (isEntrance) {
                    this.entranceStatuses = [false, false, false, true, false];
                } else {
                    this.testStatuses = [false, false, false, true, false];
                }
                this.resultPaticentID = row.PatientAgentID;
                this.resultTestID = row.ID;
                this.completeTest = isComplete;
                this.chosedPatient = row.Name;
            },
            checkPacientTestresult(index, row, isComplete, isEntrance) {
                if (isEntrance) {
                    this.entranceStatuses = [false, false, false, true, false];
                } else {
                    this.testStatuses = [false, false, false, true, false];
                }
                this.resultPaticentID = row.PatientAgentID;
                this.resultTestID = row.ID;
                this.completeTest = isComplete;
                this.chosedPatient = row.Name;
            },
            checkPacientTestReport(index, row, isEntrance) {
                this.reportID = row.ID;
                this.reportPaticentID = row.PatientAgentID;
                this.chosedPatient = row.Name;
                if (isEntrance) {
                    this.entranceStatuses = [false, false, false, false, true];
                } else {
                    this.testStatuses = [false, false, false, false, true];
                }
                api.getPacientTestReport(this.reportID).then(res => {
                    this.rourseData = res;
                    this.userInfo = res.PatientAgentDetails
                })
            },
            handleClick() {},
            addTestPaper() {
                this.addTestPaperVisible = true;
                api.requestCourseList().then(res => {
                    this.testPaperData = res.List;
                });
            },
            addEntrancePaper() {
                this.addEntranceTestVisible = true;
                api.getEntrancePackage().then(res => {
                    if (res.statusText === 'OK') {
                        this.entrancePackageData = res.data.List;
                    }
                })
            },
            submitTestPaper() {
                this.testFormData.CourseIds = this.multipleCourseIDs;
                this.$refs['addTestform'].validate((valid) => {
                    if (valid) {
                        let params = this.testFormData;
                        api.addTestPaper(params).then(res => {
                            if (res.Code === 0) {
                                this.$message.success('成功');
                                this.addTestPaperVisible = false;
                                this.getTestList(this.testedPatientCurrentPage);
                            } else {
                                this.$message.err('失败');
                            }
                        });
                    } else {
                        return false;
                    }
                })
            },
            submitEntrancePaper() {
                this.entranceFormData.PaperPackageID = this.entrancePackageData[0].ID
                let params = this.entranceFormData;
                api.addTestPaper(params).then(res => {
                    if (res.Code === 0) {
                        this.$message.success('成功');
                        this.addEntranceTestVisible = false;
                        this.getentranceList(this.entrancePaperCurrentPage);
                    } else {
                        this.$message.warning(res.Msg);
                    }
                });
            },
            resetChosePatientTest() {
                this.selectedPacientIDS = [];
                this.choseToTestPatient = '';
            },
            resetPatientList() {
                this.selectedPacientIDS = [];
                this.pacientsIDS = [];
            },
            testPaperCancel() {
                this.testFormData = {
                    Name: '',
                    CourseIds: []
                };
                this.multipleCourses = [];
                this.multipleCourseIDs = [];
                this.addTestPaperVisible = false;
            },
            entrancePaperCancel() {
                this.addEntranceTestVisible = false;
                this.entranceFormData = {
                    Name: '',
                    PaperPackageID: ''
                };
            },
            testPaperListChange(currentPage) {
                this.testPaperCurrentPage = currentPage;
                this.getTestList(this.testPaperCurrentPage);
            },
            startTest(index, row) {
                this.paperPackageID = row.PaperPackageID;
                this.testID = row.ID;
                // this.showTestStart = true;
                this.choseToTestVisible = true;
            },
            startNewEnterance(index, row) {
                this.paperPackageID = row.PaperPackageID;
                this.testID = row.ID;
                this.choseToEntranceTestVisible = true;
            },
            choseToTestSubmit(isComplete) {
                let params = {
                    ExamID: this.testID,
                    PatientAgentID: this.choseToTestPatient
                };
                api.chosePatientToTest(params).then(res => {
                    if (res.Code === 0) {
                        this.choseToTestVisible = false;
                        this.testStatuses = [false, true, false, false, false];
                        this.resultPaticentID = this.choseToTestPatient;
                        this.resultTestID = res.Msg;
                        this.completeTest = isComplete;
                    }
                });
            },
            choseToEntranceTestSubmit(isComplete) {
                let params = {
                    ExamID: this.testID,
                    PatientAgentID: this.choseToTestPatient
                };
                api.chosePatientToTest(params).then(res => {
                    if (res.Code === 0) {
                        this.choseToEntranceTestVisible = false;
                        this.entranceStatuses = [false, true, false, false, false];
                        this.resultPaticentID = this.choseToTestPatient;
                        this.resultTestID = res.Msg;
                        this.completeTest = isComplete;
                    } else {
                        this.$message.warning('网络异常');
                    }
                });
            },
            startCPEPTest(id, type) {
                this.cpepPaperID = id;
                this.postCPEPPaperID = id;
                this.cpepPaperType = type;
                this.choseCPEPvisible = true;
            },
            checkTestedMembers(id, type) {
                this.cpepPaperID = id;
                this.postCPEPPaperID = id;
                this.cpepPaperType = type;
                this.requestMembers();
            },
            requestMembers() {
                let params = {
                    Type: this.cpepPaperType
                }
                api.getCPEPMember(params).then(res => {
                    this.cpepMemdbersData = res.data.Data
                    this.CPEPVisible = [false, false, true, false, false]
                })
            },
            continueCPEPTest(index, row) {
                this.cpepTestLoading = true;
                let params = {
                    TestID: row.ID,
                    PaperID: this.cpepPaperID
                }
                api.getCPEP(params).then(res => {
                    if (res.data.Status === true) { //只有CPEP自理返回带Result字段
                        if (this.cpepPaperType === 3) {
                            this.cpepSdata = res.data.Data.Results;
                        } else {
                            this.cpepSdata = res.data.Data;
                        }
                        this.cpepFirstTest = false;
                        this.cpepSratus = false;
                        this.cpMemberID = row.ID;
                        this.CPEPVisible = [false, false, false, true, false];
                        this.cpepTestLoading = false;
                    }
                })
            },
            checkCPEPResult(index, row) {
                this.cpepTestLoading = true;
                let params = {
                    testId: row.ID,
                    PatientAgentID: row.PatientAgentID,
                    Type: this.cpepPaperType
                };
                api.getCPEPReport(params).then(res => {
                    if (this.cpepPaperType === 1) {
                        this.cpepSdata = res.data.Data.TestResult;
                    } else {
                        this.cpepSdata = res.data.Data.Results;
                    }
                    this.cpepSratus = true
                    this.chosedPatient = row.PatientAgentName
                    this.CPEPVisible = [false, false, false, true, false]
                    this.cpepTestLoading = false
                })
            },
            checkCPEPReport(index, row) {
                // row.PatientAgentID
                api.getPatientAgentDetails(row.PatientAgentID)
                    .then((res) => {
                        let o = res.data;
                        this.saveCurrentPatientInfo(o);
                    }).catch((err) => 
                        {this.$message.error(err.Msg)})
                // pg54
                let type = this.cpepPaperType;
                let params = {
                    testId: row.ID,
                    // PatientAgentID: row.PatientAgentID,
                    Type: type //感觉统合type是2
                };
                api.getCPEPReport(params).then(res => {
                    if (type === 2) {
                        this.cpepFeelingdata = res.data.Data.AnalysisData;
                    } else if (type === 1) {
                        this.cpepDevResult = res.data.Data;
                    }
                    this.chosedPatient = row.PatientAgentName
                    this.CPEPVisible = [false, false, false, false, true]
                })

            },
            deleteCPEP(index, row) {
                let _this = this;
                _this.$confirm(`确认删除该评测记录,`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error'
                }).then(() => {
                    let params = {
                        testId: row.ID
                    };
                    api.deleteCPEP(params)
                        .then(res => {
                            let r = res.data;
                            if (r.Status) {
                                _this.$message({
                                    type: 'success',
                                    message: r.Msg
                                });
                                _this.requestMembers();
                            } else {
                                _this.$message({
                                    type: 'warning',
                                    message: r.Msg
                                });
                            }
                        })
                        .catch(err => {
                            _this.$message.error(err.Msg)
                        })
                }).catch(() => {
                    _this.$message({
                        type: 'info',
                        message: '已取消提交'
                    });
                });
            },
            choseToCPEP() {
                this.cpepTestLoading = true;
                let id = this.cpepPaperID
                let params = {
                    PaperID: id
                }
                api.getCPEP(params).then(res => {
                    if (res.data.Status === true) {
                        if (this.cpepPaperType === 3) {
                            this.cpepSdata = res.data.Data.Results;
                        } else {
                            this.cpepSdata = res.data.Data;
                        }
                        this.cpepFirstTest = true;
                        this.choseCPEPvisible = false;
                        this.CPEPVisible = [false, true, false, false, false];
                        this.cpepTestLoading = false;
                    }
                })
            },
            checkTestPaticent(index, row) {
                this.examID = row.ID;
                this.requestTestPaticent(1);
            },
            checkEntrancePaticent(index, row) {
                this.examID = row.ID;
                this.requestEntrancePaticent(1);

            },
            requestEntrancePaticent(pageIndex) {
                let params = {
                    ExamID: this.examID,
                    PageIndex: pageIndex,
                    PageSize: 10,
                    PackageType: '2'
                };
                api.requestTestMembers(params).then(res => {
                    this.entranceedPatientListData = res.Records;
                    this.entranceedPatientListTotal = res.Total;
                    //                this.studentListVisible = false;
                });
                this.entranceStatuses = [false, false, true, false, false];
            },
            requestTestPaticent(pageIndex) {
                let params = {
                    ExamID: this.examID,
                    PageIndex: pageIndex,
                    PageSize: 10
                };
                api.requestTestMembers(params).then(res => {
                    this.testedPatientListData = res.Records;
                    this.testedPatientListTotal = res.Total;
                    //                this.studentListVisible = false;
                });
                this.testStatuses = [false, false, true, false, false];
            },
            testedPatientListClose() {
                this.testedPatientListData = '';
            },
            testedPatientListNextPage(currentPage) {
                this.testedPatientCurrentPage = currentPage;
                this.requestTestPaticent(this.testedPatientCurrentPage);
            },
            entrancedPatientListNextPage(currentPage) {
                this.entrancedPatientCurrentPage = currentPage;
                this.requestTestPaticent(this.entrancedPatientCurrentPage);
            },
            previewEditedForm(index, row) {
                var resultID = row.ID;
                api.getPaperResult(resultID).then(res => {
                    this.$store.dispatch('addPaper', res.data);
                    this.previewFormVisible = true;
                });
            },
            toDeleteExamPatient(index, row, isEntrance) {
                this.examPatientID = row.ID
                let params = {
                    ID: this.examPatientID
                };
                api.deleteExamPatient(params).then(res => {
                    if (res.Code === 3) {
                        this.consfirmDeleteExamMsg = res.Msg;
                        this.$confirm('关联数据会被删除, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.confirmDeleteExamPatient(isEntrance);
                        });
                    } else if (res.Code === 0) {
                        this.$message.success('删除成功');
                        if (isEntrance) {
                            this.requestEntrancePaticent(this.entrancedPatientCurrentPage);
                        } else {
                            this.requestTestPaticent(this.testedPatientCurrentPage);
                        }

                    } else if (res.Code === 1) {
                        this.$message.warning('指定评估不存在');
                    } else if (res.Code === 2) {
                        this.$message.warning('指定评估不属于当前医生');
                    }
                });
            },
            confirmDeleteExamPatient(isEntrance) {
                let params = {
                    ID: this.examPatientID,
                    key: this.consfirmDeleteExamMsg
                };
                api.deleteExamPatient(params).then(res => {
                    if (res.Code === 0) {
                        this.$message.success('删除成功');
                        if (isEntrance) {
                            this.requestEntrancePaticent(this.entrancedPatientCurrentPage);
                        } else {
                            this.requestTestPaticent(this.testedPatientCurrentPage);
                        }
                    } else if (res.Code === 1) {
                        this.$message.warning('指定评估不存在');
                    } else if (res.Code === 2) {
                        this.$message.warning('指定评估不属于当前医生');
                    }
                });

            },
            deleteExam(index, row, isEntrance) {
                this.examID = row.ID;
                var params = {
                    ID: this.examID
                };
                api.deleteExam(params).then(res => {
                    if (res.Code === 3) {
                        this.consfirmDeleteExamMsg = res.Msg;
                        this.$confirm('关联数据会被删除, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.confirmDeleteExam();
                        });
                    } else if (res.Code === 0) {
                        this.$message.warning('删除成功');
                        if (isEntrance) {
                            this.getentranceList(this.entrancePaperCurrentPage);
                        } else {
                            this.getTestList(this.testedPatientCurrentPage);
                        }

                    } else if (res.Code === 1) {
                        this.$message.warning('指定评估不存在');
                    } else if (res.Code === 2) {
                        this.$message.warning('指定评估不属于当前医生');
                    }
                });
            },
            confirmDeleteExam() {
                let params = {
                    ID: this.examID,
                    key: this.consfirmDeleteExamMsg
                };
                api.deleteExam(params).then(res => {
                    if (res.Code === 0) {
                        this.requestInitData();
                        this.$message.success('删除成功');
                    } else if (res.Code === 1) {
                        this.$message.warning('指定评估不存在');
                    } else if (res.Code === 2) {
                        this.$message.warning('指定评估不属于当前医生');
                    }
                });
            },
            previewForm(index, row) {
                var resultID = row.ID;
                api.paperDetails(resultID).then(res => {
                    this.$store.dispatch('addPaper', res.data);
                    this.previewFormVisible = true;
                });
            },
            addForm(index, row) {
                var id = row.ID;
                api.addPapertoDr(id).then(res => {
                    var code = res.Code;
                    switch (code) {
                        case 0:
                            this.$message.success('添加成功');
                            break;
                        case 1:
                            this.$message.warning('指定的表单不存在');
                            break;
                        case 2:
                            this.$message.error('已添加');
                            break;
                    }
                    this.createQuestionnaireVisible = false;
                    this.requestInitData();
                });
            },
            toAddPaper(value) {
                this.createQuestionnaireVisible = true;
                api.filterPaperTmeplate(value).then(res => {
                    this.paperTmeplateData = res.data.List;
                });
            },
            handleChange() {
                var x = this.testFormData.CourseIds;
                let len = x.length
                if (len > 0) {
                    let id = x[len - 1]
                    var name = this.recursionData(id);
                    if (typeof (name) == "undefined") return
                    if (this.multipleCourses.indexOf(name) === -1) {
                        this.multipleCourses.push(name)
                        this.multipleCourseIDs.push(id)
                    }
                }
            },
            recursionData(id) {
                let data = this.courseData;
                for (let i = 0, j = data.length; i < j; i++) {
                    for (let k = 0, g = data[i].children.length; k < g; k++) {
                        let two = data[i].children[k]
                        if (two.value === id && two.Type === 2) {
                            return two.label
                        } else {
                            if (two.children) {
                                for (let o = 0, p = data[i].children[k].children.length; o < p; o++) {
                                    let three = data[i].children[k].children[o]
                                    if (three.value === id && three.Type === 2) {
                                        return three.label
                                    }
                                }
                            }
                        }
                    }
                }
            },
            reslutCurrentChange(val) {
                this.resultPage = val;
                this.getDrPaperSendList(this.sendListID, this.resultPage);
            },
            checkPaper(index, row) {
                this.replyPatientListVisible = true;
                this.sendListID = row.ID;
                var id = row.ID;
                this.getDrPaperSendList(id, this.resultPage);
            },
            getDrPaperSendList(id, index) {
                api.getDrPaperSendOut(id, index, 10).then(res => {
                    this.resultTotal = res.data.Total;
                    this.editedPaperData = res.data.Records;
                });
            },
            filterPacient(val) {
                if (this.choseToTestVisible) { //bug,两个选择病人的callback，我用choseToTestVisible区分
                    this.selectedGroupPacientes = this.selectedGroup[val].groupPatients;
                }
                if (this.sendToPaticentVisible) { //bug,两个选择病人的callback，我用choseToTestVisible区分
                    this.selectedGroupPacientes = this.selectedGroup[val].groupPatients;
                }
                if (this.CPEPVisible[0]) { //bug,两个选择病人的callback，我用choseToTestVisible区分
                    this.selectedGroupPacientes = this.selectedGroup[val].groupPatients;
                }
            },
            sendtoPaticent(index, row) {
                this.paperID = row.ID;
                this.sendToPaticentVisible = true;
            },
            sendToPacientSubmit() {
                var params = {
                    PaperID: this.paperID,
                    Patients: [this.pacientsIDS]
                };
                api.sendPaperToPatient(params).then(res => {
                    let code = res.Code;
                    switch (code) {
                        case 0:
                            this.$message.success('发送成功');
                            this.requestInitData();
                            break;
                        case 1:
                            this.$message.warning('指定的问卷不存在');
                            break;
                    }
                    this.sendToPaticentVisible = false;
                });
            },
            getPaperData(type, data) {
                var _this = this;
                api.getDrPaperSummary(type).then(res => {
                    _this.paperURL = type;
                    data = res.data.List;
                });
            },
            getTestList(pageIndex) {
                let params = {
                    PageIndex: pageIndex,
                    PageSize: 10
                };
                api.requestTestList(params).then(res => {
                    this.testPaperListData = res.Records;
                    this.testPaperTotal = res.Total;
                });
            },
            getentranceList(pageIndex) {
                let params = {
                    PageIndex: pageIndex,
                    PageSize: 10,
                    PackageType: '2'
                };
                api.requestTestList(params).then(res => {
                    this.entranceListData = res.Records;
                    this.entrancePaperTotal = res.Total;
                });
            },
            requestInitData() {
                api.getGuduPapers().then(res => {
                    this.CPEPPapersdata = res.data.Data
                })
                this.getTestList(1); // 评测管理
                this.getentranceList(1); // 入学评测
                this.getCheckBoxContents(); //获取课程list
                api.getDrPaperSummary(21).then(res => {
                    this.paperURL = 21;
                    this.consultData = res.data.List;
                });
                api.getDrPaperSummary(41).then(res => {
                    this.paperURL = 41;
                    this.trainingData = res.data.List;
                });
                api.getDrPaperSummary(11).then(res => {
                    this.paperURL = 11;
                    this.feedbackData = res.data.List;
                });
                api.getDrPaperSummary(12).then(res => {
                    this.paperURL = 12;
                    this.reviewData = res.data.List;
                });
                api.getDrPaperSummary(13).then(res => {
                    this.paperURL = 13;
                    this.remindData = res.data.List;
                });
            },
        },
        mounted() {
            let parent = document.getElementsByClassName('tabs-chose')[0]
            let childs = parent.childNodes
            parent.removeChild(childs[0])
            parent.removeChild(childs[0])
            parent.removeChild(childs[1])
            parent.removeChild(childs[1])
            parent.removeChild(childs[2])
        },
        created() {
            this.requestInitData();
        }
    };

</script>

<style scoped>
    .main {
        position: absolute;
        left: 0;
        top: 0;


    }

    .pageTrack {
        position: absolute;
        width: 100%;
        height: 40px
    }

    .tabs {
        position: absolute;
        top: 42px;
        left: 0;
        width: 100%;
        height: 583px;
        z-index: 5;
    }

    .tabs-chose {
        position: absolute;
        width: 95px;
        height: 583px;
        background-color: #EEEFF0;
        border-right: 1px solid #EFEFEF;
        box-sizing: border-box;
    }

    .tabs-content {
        position: absolute;
        left: 95px;
        top: 0;
        width: 1185px;
        height: 100%;
    }

    .tabs-chose li {
        width: 94px;
        height: 60px;
        background-color: #EEEFF0;
        display: flex;
        cursor: pointer;
        align-items: center;
        justify-content: center;
    }

    .tabs-chose .active {
        background-color: #ffffff;
        color: RGBA(47, 189, 252, 1.00);
        border-left: 6px solid #31BBFC;
    }

    .center-content {
        width: 1125px;
        margin: 0 auto;
    }

    .testManager {
        width: 1125px;
        margin: 0 auto;
    }

    .moveLeft {
        margin-left: -30px;
    }

    .toolBox {
        display: flex;
        justify-content: flex-end;
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .paticentLogo {
        width: 60px;
        height: 60px;
        border-radius: 30px
    }

    .paperContent {
        width: 100%;
        max-height: 600px;
        overflow-y: hidden
    }

    .addTestFormWrap {
        width: 100%;
    }

    .addTestsubmit {
        width: 550px;
        text-align: center;
        margin: 0 auto
    }

    .colorHeader {
        border-top: 4px solid RGBA(49, 187, 252, 1.00)
    }

    .cardBox {
        width: 100%;
        height: 530px;
        margin-top: 10px;
    }

    .newCardBox {
        width: 100%;
        height: 570px;
        margin-top: 10px;
    }

    .tableWrap {
        width: 100%;
        height: 530px;
    }

    .pageNavbar {
        position: absolute;
        left: 0;
        top: 0;
        width: 1280px;
        height: 42px;
        border-bottom: 1px solid #cccccc;
    }

    .heightMaxBox {
        height: 540px;
    }

    .pageNavbar span {
        font-size: 16px;
        cursor: pointer;
        line-height: 42px;
    }

    .pageNavbar span:hover {
        color: rgb(66, 171, 216);
    }

    .shortLength {
        height: 494px
    }

    .longTest {
        height: 560px
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
        width: 100%;
    }

    .onc-input:focus {
        border: 1px solid rgba(32, 160, 255, 1);
    }

    .courseCheckBox {
        width: 200px;
        height: 40px;
        line-height: 40px;
    }

    .courseCheckBox:nth-child(1) {
        margin-left: 15px
    }

    .cpepWrap {
        width: 100%;
        height: 583px;
        overflow-y: scroll;
    }

    .cpepContentWrap {
        width: 100%;
        height: 583px;
        overflow-y: scroll;
    }

    /*自定义滚动条*/

    .cpep_scrollbar::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        background-color: #F5F5F5;
    }

    /*定义滚动条轨道 内阴影+圆角*/

    .cpep_scrollbar::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        background-color: #F5F5F5;
    }

    /*定义滑块 内阴影+圆角*/

    .cpep_scrollbar::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: #20a0ff;
    }

    .onc-box {
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
        line-height: 1;
        outline: 0;
        padding: 3px 10px;
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        width: 100%;
    }

    .tag {
        margin-right: 20px
    }

</style>
