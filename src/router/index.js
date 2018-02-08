/**
 * Created by pangang on 2017/4/7.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../pages/Login.vue';
import Print from '../pages/Print.vue';
import PhysicalPrinter from '../pages/PhysicalPrinter.vue';
import AutismPrinter from '../pages/AutismPrinter.vue';
import HearingPrinter from '../pages/HearingPrinter.vue';
import MentalPrinter from '../pages/MentalPrinter.vue';
import Home from '../pages/Home.vue';

import AuthManage from '../pages/AuthManage/AuthManage.vue';
import CoopGroup from '../pages/CoopGroup/CoopGroup.vue';
import ServiceReview from '../pages/ServiceReview/ServiceReview.vue';

// import DynamicConsultation from '../pages/DymamicConsultation/DymamicConsultation.vue';
const DynamicConsultation = r => require.ensure([], () => r(require('../pages/DymamicConsultation/DymamicConsultation.vue')), 'group-a')
// import DymaEdu from '../pages/DymamicConsultation/child/DymaEdu.vue';
const DymaEdu = r => require.ensure([], () => r(require('../pages/DymamicConsultation/child/DymaEdu.vue')), 'group-a')
// import DymaNews from '../pages/DymamicConsultation/child/DymaNews.vue';
const DymaNews = r => require.ensure([], () => r(require('../pages/DymamicConsultation/child/DymaNews.vue')), 'group-a')
// import DymaArticle from '../pages/DymamicConsultation/child/DymaArticle.vue';
const DymaArticle = r => require.ensure([], () => r(require('../pages/DymamicConsultation/child/DymaArticle.vue')), 'group-a')
// import DymaTraining from '../pages/DymamicConsultation/child/DymaTraining.vue';
const DymaTraining = r => require.ensure([], () => r(require('../pages/DymamicConsultation/child/DymaTraining.vue')), 'group-a')


// import InformCoope from '../pages/InformCooperation/NoticeCoope.vue';
const InformCoope = r => require.ensure([], () => r(require('../pages/InformCooperation/NoticeCoope.vue')), 'group-b')

import studentFile from '../pages/rehabilitationFile/MyStudentFile.vue';
// const studentFile = r => require.ensure([], () => r(require('../pages/rehabilitationFile/MyStudentFile.vue')), 'group-c')
import RehabilitationFile from '../pages/rehabilitationFile/rehabilitationFile.vue';
// const RehabilitationFile = r => require.ensure([], () => r(require('../pages/rehabilitationFile/rehabilitationFile.vue')), 'group-c')
import RFAnalysis from '../pages/rehabilitationFile/RF-Analysis/RF-Analysis.vue';
// const RFAnalysis = r => require.ensure([], () => r(require('../pages/rehabilitationFile/RF-Analysis/RF-Analysis.vue')), 'group-c')
import RFEntrance from '../pages/rehabilitationFile/RF-Entrance/RF-Entrance.vue';

import RFAssessment from '../pages/rehabilitationFile/RF-Assessment/RF-Assessment.vue';
// const RFAssessment = r => require.ensure([], () => r(require('../pages/rehabilitationFile/RF-Assessment/RF-Assessment.vue')), 'group-c')
import RFRegister from '../pages/rehabilitationFile/RF-Register/RF-Register.vue';
// const RFRegister = r => require.ensure([], () => r(require('../pages/rehabilitationFile/RF-Register/RF-Register.vue')), 'group-c')
import RFPlan from '../pages/rehabilitationFile/RF-Plan/RF-Plan.vue';
// const RFPlan = r => require.ensure([], () => r(require('../pages/rehabilitationFile/RF-Plan/RF-Plan.vue')), 'group-c')
import RFRecord from '../pages/rehabilitationFile/RF-Record/RF-Record.vue';
// const RFRecord = r => require.ensure([], () => r(require('../pages/rehabilitationFile/RF-Record/RF-Record.vue')), 'group-c')
import RFTrack from '../pages/rehabilitationFile/RF-Track/RF-Track.vue';
// const RFTrack = r => require.ensure([], () => r(require('../pages/rehabilitationFile/RF-Track/RF-Track.vue')), 'group-c')
import RFAttachment from '../pages/rehabilitationFile/RF-Attachment/RF-Attachment.vue';
// const RFAttachment = r => require.ensure([], () => r(require('../pages/rehabilitationFile/RF-Attachment/RF-Attachment.vue')), 'group-c')

// import studentTrack from '../pages/MyStudentTrack/MyStudentTrack.vue';
const studentTrack = r => require.ensure([], () => r(require('../pages/MyStudentTrack/MyStudentTrack.vue')), 'group-d')

// import ServiceManage from '../pages/myService/child/MyServiceManage.vue';
const ServiceManage = r => require.ensure([], () => r(require('../pages/myService/child/MyServiceManage.vue')), 'group-e')
// import MyService from '../pages/myService/MyService.vue';
const MyService = r => require.ensure([], () => r(require('../pages/myService/MyService.vue')), 'group-e')
// import ServiceFile from '../pages/myService/MyServiceFile.vue';
const ServiceFile = r => require.ensure([], () => r(require('../pages/myService/MyServiceFile.vue')), 'group-e')
// import ServiceAgency from '../pages/myService/MyServiceAgency.vue';
const ServiceAgency = r => require.ensure([], () => r(require('../pages/myService/MyServiceAgency.vue')), 'group-e')

// import ServiceTool from '../pages/ServiceArrangement/ServiceTool.vue';
const ServiceTool = r => require.ensure([], () => r(require('../pages/ServiceArrangement/ServiceTool.vue')), 'group-f')

const ServiceArrangement = r => require.ensure([], () => r(require('../pages/ServiceArrangement/serviceArrangement.vue')), 'group-f')

// import TestPaper from '../pages/ServiceArrangement/child/testPaper.vue';
const TestPaper = r => require.ensure([], () => r(require('../pages/ServiceArrangement/child/testPaper.vue')), 'group-f')
// import TestSult from '../pages/ServiceArrangement/child/testResult.vue';
const TestSult = r => require.ensure([], () => r(require('../pages/ServiceArrangement/child/testResult.vue')), 'group-f')
// import testReport from '../pages/ServiceArrangement/child/testReport.vue';
const testReport = r => require.ensure([], () => r(require('../pages/ServiceArrangement/child/testReport.vue')), 'group-f')

const Consultancy = r => require.ensure([], () => r(require('../pages/ServiceArrangement/consultancy/consultancy.vue')), 'group-f')
const SendQuestionnaire = r => require.ensure([], () => r(require('../pages/ServiceArrangement/consultancy/sendQuestionnaire/sendQuestionnaire.vue')), 'group-f')
const TemplateList = r => require.ensure([], () => r(require('../pages/ServiceArrangement/consultancy/templateList/templateList.vue')), 'group-f')
const ServiceDynamics = r => require.ensure([], () => r(require('../pages/ServiceArrangement/serviceDynamics/serviceDynamics.vue')), 'group-f')

const CPEP = r => require.ensure([], () => r(require('../pages/ServiceArrangement/CPEP/cpep.vue')), 'group-f')
const TestedCPEP = r => require.ensure([], () => r(require('../pages/ServiceArrangement/CPEP/testedCPEP/testedCPEP.vue')), 'group-f')
const StartCPEP = r => require.ensure([], () => r(require('../pages/ServiceArrangement/CPEP/startCPEP/startCPEP.vue')), 'group-f')

// import IEP from '../pages/IEP/IEP.vue';
const IEP = r => require.ensure([], () => r(require('../pages/IEP/IEP.vue')), 'group-g')
// import IEPBasicInfo from '../pages/IEP/IEP-BasicInfo.vue';
const IEPBasicInfo = r => require.ensure([], () => r(require('../pages/IEP/IEP-BasicInfo.vue')), 'group-g')
// import IEPaAnalysis from '../pages/IEP/IEP-Analysis.vue';
const IEPaAnalysis = r => require.ensure([], () => r(require('../pages/IEP/IEP-Analysis.vue')), 'group-g')
// import IEPPlan from '../pages/IEP/IEP-Plan.vue';

// import IEPSchedule from '../pages/IEP/IEP-Schedule/IEP-Schedule.vue';
const IEPSchedule = r => require.ensure([], () => r(require('../pages/IEP/IEP-Schedule/IEP-Schedule.vue')), 'group-g')
// import IEPlibrary from '../pages/IEP/IEP-library.vue';
const IEPlibrary = r => require.ensure([], () => r(require('../pages/IEP/IEP-library.vue')), 'group-g')
// import IEPStudy from '../pages/IEP/IEP-study.vue';
const IEPStudy = r => require.ensure([], () => r(require('../pages/IEP/IEP-study.vue')), 'group-g')
// import IEPSummary from '../pages/IEP/IEP-Summary.vue';
const IEPSummary = r => require.ensure([], () => r(require('../pages/IEP/IEP-Summary.vue')), 'group-g')
// import IEPRecord from '../pages/IEP/IEP-Record.vue';
const IEPRecord = r => require.ensure([], () => r(require('../pages/IEP/IEP-Record.vue')), 'group-g')
// import IEPFeedback from '../pages/IEP/IEP-Feedback.vue';
const IEPFeedback = r => require.ensure([], () => r(require('../pages/IEP/IEP-Feedback.vue')), 'group-g')

// import DataAnalysis from '../pages/DataAnalysis/DataAnalysis.vue';
const DataAnalysis = r => require.ensure([], () => r(require('../pages/DataAnalysis/DataAnalysis.vue')), 'group-h')

// const EchartsAnalysis = r => require.ensure([], () => r(require('../pages/DataAnalysis/echartsAnalysis.vue')), 'group-i')
// import highChart from '../pages/DataAnalysis/hightChartAnalysis.vue';
// const highChart = r => require.ensure([], () => r(require('../pages/DataAnalysis/hightChartAnalysis.vue')), 'group-h')
// const IEPPlan = r => require.ensure([], () => r(require('../pages/IEP/IEP-Plan/IEP-Plan.vue')), 'group-g')
import IEPPlan from '../pages/IEP/IEP-Plan/IEP-Plan.vue';
import IEPPlanjt from '../pages/IEP/IEP-Plan/iepPlanjt/IEPPlanjt.vue';
import IEPPlanjtList from '../pages/IEP/IEP-Plan/iepPlanjt/iepPlanjtList/IEPPlanjtList.vue';
import IEPPlanjtItem from '../pages/IEP/IEP-Plan/iepPlanjt/iepPlanjtList/iepPlanjtItem/IEPPlanjtItem.vue';
import IEPPlanjtItemDetail from '../pages/IEP/IEP-Plan/iepPlanjt/iepPlanjtList/iepPlanjtItem/children/IEPPlanjtItemDetail.vue';
import IEPPlanjtItemEdit from '../pages/IEP/IEP-Plan/iepPlanjt/iepPlanjtList/iepPlanjtItem/children/IEPPlanjtItemEdit.vue';
import IEPPlanjtItemPaper from '../pages/IEP/IEP-Plan/iepPlanjt/iepPlanjtList/iepPlanjtItem/children/IEPPlanjtItemPaper.vue';

import IEPPlanPerson from '../pages/IEP/IEP-Plan/iepPlanPerson/IEPPlanPerson.vue';


// import DynamicTracking from '../pages/InformCooperation/DymamicTracking.vue';
// import NoticeReminder from '../pages/InformCooperation/NoticeReminder.vue';


Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/print',
            name: 'print',
            component: Print
        },
        {
            path: '/physicalPrinter',
            name: 'physicalPrinter',
            component: PhysicalPrinter
        },
        {
            path: '/autismPrinter',
            name: 'autismPrinter',
            component: AutismPrinter
        },
        {
            path: '/hearingPrinter',
            name: 'hearingPrinter',
            component: HearingPrinter
        },
        {
            path: '/mentalPrinter',
            name: 'mentalPrinter',
            component: MentalPrinter
        },
        {
            path: '/',
            name: 'home',
            component: Home,
            children: [
                {
                    path: 'dynamicConsultation',
                    component: DynamicConsultation,
                    name: 'dynamicConsultation',
                    children: [
                        { path: 'dymaNews', component: DymaNews, name: 'dymaNews' },
                        { path: 'dymaEdu', component: DymaEdu, name: 'dymaEdu' },
                        { path: 'dymaArticle', component: DymaArticle, name: 'dymaArticle' },
                        { path: 'dymaTraining', component: DymaTraining, name: 'dymaTraining' }
                    ]
                }
            ]
        },
        {
            path: '/',
            name: 'home',
            component: Home,
            children: [
            ]
        },
        {
            path: '/',
            name: 'home',
            component: Home,
            children: [
                {
                    path: 'informCoope',
                    component: InformCoope,
                    name: 'informCoope'
                    // children: [
                    //   { path: 'dynamicTracking', component: DynamicTracking, name: 'dynamicTracking' },
                    //   { path: 'noticeReminder', component: NoticeReminder, name: 'noticeReminder' }
                    // ]
                }
            ]
        },
        {
            path: '/',
            name: 'home',
            component: Home,
            children: [
                {
                    path: 'studentTrack',
                    component: studentTrack,
                    name: 'studentTrack'
                }
            ]
        },
        {
            path: '/',
            name: 'home',
            component: Home,
            children: [
                {
                    path: 'iep',
                    component: IEP,
                    name: 'iep',
                    children: [
                        { path: 'iepBasicInfo', component: IEPBasicInfo, name: 'iepBasicInfo' },
                        { path: 'iepAnalysis', component: IEPaAnalysis, name: 'iepAnalysis' },
                        // { path: 'iepPlan', component: IEPPlan, name: 'iepPlan' },
                        {
                          path: 'iepPlan',
                          component: IEPPlan,
                          name: 'iepPlan',
                        //   children: [
                        //     { path: 'iepPlanDetail', component: IEPPlanDetail, name: 'iepPlanDeatail' },
                        //     { path: 'planItemDetail', component: PlanItemDetail, name: 'planItemDetail' },
                        //     { path: 'iepCourse', component: IEPCourse, name: 'iepCourse' }
                        //   ]
                            children: [
                                {
                                    path: '',
                                    redirect: 'iepPlanjt'
                                },
                                {
                                    path: 'iepPlanjt', 
                                    component: IEPPlanjt,
                                    name: 'iepPlanjt',
                                    children: [
                                        {
                                            path: 'iepPlanjtList', 
                                            component: IEPPlanjtList,
                                            name: 'iepPlanjtList',
                                            children: [
                                                {
                                                    path: 'iepPlanjtItem', 
                                                    component: IEPPlanjtItem,
                                                    name: 'iepPlanjtItem',
                                                    children: [
                                                        {path: 'iepPlanjtItemDetail', component: IEPPlanjtItemDetail, name: 'iepPlanjtItemDetail'},
                                                        {path: 'iepPlanjtItemEdit', component: IEPPlanjtItemEdit, name: 'iepPlanjtItemEdit'},
                                                        {path: 'iepPlanjtItemPaper', component: IEPPlanjtItemPaper, name: 'iepPlanjtItemPaper'},
                                                    ]
                                                }
                                            ]
                                        }
                                    ]

                                },
                                {path: 'iepPlanPerson', component: IEPPlanPerson, name: 'iepPlanPerson'},
                            ]
                        },
                        { path: 'iepSchedule', component: IEPSchedule, name: 'iepSchedule' },
                        { path: 'ieplibrary', component: IEPlibrary, name: 'ieplibrary' },
                        { path: 'iepStudy', component: IEPStudy, name: 'iepStudy' },
                        { path: 'iepSummary', component: IEPSummary, name: 'iepSummary' },
                        { path: 'iepRecord', component: IEPRecord, name: 'iepRecord' },
                        { path: 'iepFeedback', component: IEPFeedback, name: 'iepFeedback' }
                    ]
                }
            ]
        },
        {
            path: '/',
            name: 'home',
            component: Home,
            children: [
                {
                    path: 'myService',
                    component: MyService,
                    name: 'myService',
                    children: [
                        { path: 'serviceManage', component: ServiceManage, name: 'serviceManage' },
                        { path: 'serviceFile', component: ServiceFile, name: 'serviceFile' },
                        { path: 'serviceAgency', component: ServiceAgency, name: 'serviceAgency' }
                    ]
                }
            ]
        },
        {
            path: '/',
            name: 'home',
            component: Home,
            children: [
                {
                    path: 'studentFile',
                    component: studentFile,
                    name: 'studentFile',
                    children: [
                        {
                            path: 'rehabilitationFile',
                            component: RehabilitationFile,
                            name: 'rehabilitationFile',
                            children: [
                                { path: 'rFAnalysis', component: RFAnalysis, name: 'rFAnalysis' },
                                { path: 'rFEntrance', component: RFEntrance, name: 'rFEntrance' },
                                { path: 'rFAssessment', component: RFAssessment, name: 'rFAssessment' },
                                { path: 'rFRegister', component: RFRegister, name: 'rFRegister' },
                                { path: 'rFPlan', component: RFPlan, name: 'rFPlan' },
                                { path: 'rFRecord', component: RFRecord, name: 'rFRecord' },
                                { path: 'rFTrack', component: RFTrack, name: 'rFTrack' },
                                { path: 'rFAttachment', component: RFAttachment, name: 'rFAttachment' },
                            ]
                        }
                    ]
                }
            ]
        },
        {
            path: '/',
            name: 'home',
            component: Home,
            children: [
                {
                    path: 'serviceTool',
                    component: ServiceTool,
                    name: 'serviceTool',
                    children: [
                        { path: 'testPaper/:id/course/:course_id/patientID/:patiend_id', component: TestPaper, name: 'testPaper' },
                        { path: 'testResult/:testID/patientID/:patiend_id', component: TestSult, name: 'testSult' },
                        {
                            path: 'consultancy', component: Consultancy, name: 'consultancy',
                            children:
                                [
                                    { path: 'sendQuestionnaire', component: SendQuestionnaire, name: 'sendQuestionnaire',},
                                    { path: 'templateList', component: TemplateList, name: 'templateList',}
                                ]
                        },
                        { path: 'serviceDynamics', component: ServiceDynamics, name: 'serviceDynamics' },
                        {
                            path: 'cpep', component: CPEP, name: 'cpep',
                            children:
                                [
                                    { path: 'testedCPEP', component: TestedCPEP, name: 'testedCPEP',},
                                    { path: 'startCPEP', component: StartCPEP, name: 'startCPEP',}
                                ]
                        }
                    ]
                }
            ]
        },
        {
            path: '/',
            name: 'home',
            component: Home,
            children: [
                { path: 'coopGroup', component: CoopGroup, name: 'coopGroup' }
            ]
        },
        {
            path: '/',
            name: 'home',
            component: Home,
            children: [
                { path: 'dataAnalysis', component: DataAnalysis, name: 'dataAnalysis' }
                // { path: 'echartsAnalysis', component: EchartsAnalysis, name: 'echartsAnalysis' }
            ]
        },
        {
            path: '/',
            name: 'home',
            component: Home,
            children: [
                { path: 'serviceReview', component: ServiceReview, name: 'serviceReview' }
            ]
        },
        {
            path: '/',
            name: 'home',
            component: Home,
            children: [
                { path: 'authManage', component: AuthManage, name: 'authManage' }
            ]
        }
    ]
});
