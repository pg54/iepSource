/**
 * Created by pangang on 2017/4/26.
 */
import * as types from '../../mutation_type';
import {
    requestArticle,
    drTeachingPlan,
    getPlanDetail,
    getPlanItemDetail,
    getCourseDetails
} from '../../../api/api';

export default {
    [types.RECORD_QUESTIONSDATA](state, groupInfo) {
        state.questionsData = groupInfo;
    },
    [types.RECORD_DRPROFILE](state, userProfile) {
        state.drProfile = userProfile;
    },
    [types.HAS_EDITED](state) {
        state.hasEdited = true;
    },
    [types.NO_EDITED](state) {
        state.hasEdited = false;
    },
    [types.SET_PAPERID](state, paperID) {
        state.paperID = paperID;
    },
    [types.GET_COMPANY_NEWS_REC](state) {
        var params = {
            'CategoryType': 4,
            'IsRecommend': 1
        };
        requestArticle(params).then(res => {
            //console.log('公司新闻推荐');
            state.companyNewsDataRec = res;
        });
    },
    [types.GET_COMPANY_NEWS_ALL](state, pageIndex) {
        var params = {
            'CategoryType': 4,
            'IsRecommend': 0,
            'PageIndex': pageIndex,
            'PageSize': 10
        };
        requestArticle(params).then(res => {
            //console.log('公司新闻全部');
            state.companyNewsDataAll = res;
        });
    },
    [types.GET_INDUSTRY_NEWS_REC](state) {
        var params = {
            'CategoryType': 5,
            'IsRecommend': 1
        };
        requestArticle(params).then(res => {
            //console.log('行业新闻推荐');
            state.industryNewsDataRec = res;
        });
    },
    [types.GET_INDUSTRY_NEWS_ALL](state, pageIndex) {
        var params = {
            'CategoryType': 5,
            'IsRecommend': 0,
            'PageIndex': pageIndex,
            'PageSize': 10
        };
        requestArticle(params).then(res => {
            //console.log('行业新闻全部');
            state.industryNewsDataAll = res;
        });
    },
    [types.GET_PLATFORM_NEWS_REC](state) {
        var params = {
            'CategoryType': 6,
            'IsRecommend': 1
        };
        requestArticle(params).then(res => {
            //console.log('平台新闻推荐');
            state.platformNewsDataRec = res;
        });
    },
    [types.GET_PLATFORM_NEWS_ALL](state) {
        var params = {
            'CategoryType': 6,
            'IsRecommend': 0
        };
        requestArticle(params).then(res => {
            //console.log('平台新闻全部');
            state.platformNewsDataAll = res;
        });
    },
    [types.GET_EDU_REC](state) {
        var params = {
            'CategoryType': 1,
            'IsRecommend': 1
        };
        requestArticle(params).then(res => {
            //console.log('患教中心推荐');
            state.eduDataRec = res;
        });
    },
    [types.GET_EDU_ALL](state, pageIndex) {
        var params = {
            'CategoryType': 1,
            'IsRecommend': 0,
            'PageIndex': pageIndex,
            'PageSize': 10
        };
        requestArticle(params).then(res => {
            //console.log('患教中心全部');
            state.eduDataAll = res;
        });
    },
    [types.GET_ARTICLE_REC](state) {
        var params = {
            'CategoryType': 2,
            'IsRecommend': 1
        };
        requestArticle(params).then(res => {
            //console.log('医生文章推荐');
            state.articleDataRec = res;
        });
    },
    [types.GET_ARTICLE_ALL](state, pageIndex) {
        var params = {
            'CategoryType': 2,
            'IsRecommend': 0,
            'PageIndex': pageIndex,
            'PageSize': 10
        };
        requestArticle(params).then(res => {
            //console.log('医生文章全部');
            state.articleDataAll = res;
        });
    },
    [types.GET_TRAINING_REC](state) {
        var params = {
            'CategoryType': 3,
            'IsRecommend': 1
        };
        requestArticle(params).then(res => {
            //console.log('培训活动推荐');
            state.trainingDataRec = res;
        });
    },
    [types.GET_TRAINING_ALL](state, pageIndex) {
        var params = {
            'CategoryType': 3,
            'IsRecommend': 0,
            'PageIndex': pageIndex,
            'PageSize': 10
        };
        requestArticle(params).then(res => {
            //console.log('培训活动全部');
            state.trainingDataAll = res;
        });
    },
    [types.CHANGE_ADD_FORM_VISIBLE](state) {
        //console.log('表单弹窗出现');
        state.addFormVisble = true;
    },
    [types.CHANGE_ADD_FORM_INVISIBLE](state) {
        //console.log('表单弹窗消失');
        state.addFormVisble = false;
    },
    [types.IS_MODIFY_FORM](state) {
        //console.log('是修改');
        state.isModify = true;
    },
    [types.NOT_MODIFY_FORM](state) {
        //console.log('不是修改');
        state.isModify = false;
    },
    [types.SET_FORM_CONTENT](state, formContent) {
        //console.log('设置form内容')
        state.formContent = formContent;
    },
    [types.GET_COLLECTIVE_PLAN](state, pageIndex) {
        var params = {
            'pageIndex': pageIndex,
            'pageSize': 5,
            'planType': 0
        };
        drTeachingPlan(params).then(res => {
            //console.log('集体计划');
            state.drIepPlanCollective = res.data;
        });
    },
    [types.GET_PERSONONAL_PLAN](state, pageIndex) {
        var params = {
            'pageIndex': pageIndex,
            'pageSize': 5,
            'planType': 1
        };
        drTeachingPlan(params).then(res => {
            //console.log('个人计划');
            state.drIepPlanpersonal = res.data;
        });
    },
    [types.PLAN_FORM_VISIBLE](state) {
        //console.log('计划表单弹窗出现');
        state.planFormVisibilty = true;
    },
    [types.PLAN_FORM_INVISIBLE](state) {
        //console.log('计划表单弹窗消失');
        state.planFormVisibilty = false;
    },
    [types.PLAN_FORM_PERSONOAL](state) {
        //console.log('个人');
        state.isPersonoal = true;
    },
    [types.PLAN_FORM_NOTPERSONOAL](state) {
        //console.log('集体');
        state.isPersonoal = false;
    },
    [types.SET_PLAN_DETAILS](state, planDetails) {
        getPlanDetail(planDetails).then(res => {
            //console.log('列表');
            state.planDetails = res;
        });
    },
    [types.SET_PLAN_ITEM_DETAILS](state, itemId) {
        getPlanItemDetail(itemId).then(res => {
            //console.log('单元计划的课程');
            state.planItemDetails = res;
        });
    },
    [types.SET_COURSE_DETAILS](state, courseID) {
        var params = {
            lineID: courseID
        };
        getCourseDetails(params).then(res => {
            //console.log('课程详情');
            state.courseDetails = res;
        });
    },
    [types.SET_LINEID](state, lineID) {
        state.lineID = lineID;
    },
    [types.SET_IEPPLAN_STATUS](state, showTabsContent) {
        //console.log('切换方法被调用');
        state.showTeachingPlanTabsContent = showTabsContent;
    },
    [types.SET_IEPPLAN_ITEM_STATUS](state, showPlanWrap) {
        state.showPlanWrap = showPlanWrap;
    },
    [types.SET_IEPPLAN_COURSE_STATUS](state, showPlanItemContent) {
        state.showPlanItemContent = showPlanItemContent;
    },
    [types.SET_IEPPLAN_CHAPT_STATUS](state, showCourseContent) {
        state.showCourseContent = showCourseContent;
    },
    [types.SET_SHOW_PACIENT_LIST](state, showList) {
        state.showPacientList = showList;
    },
    [types.SET_SHOW_NEWS_VISIBLE](state, isShow) {
        state.showGeneralNews = isShow;
    },
    [types.GENERAL_NEWS_STATUS](state, status) {
        state.generalNewsStatus = status;
    },
    [types.NEWS_IFRAMESTATUS_STATUS](state, status) {
        state.newsIframeStatus = status;
    },
    [types.SET_IS_REPRINT](state, status) {
        state.isReprint = status
    }


    //设置面包屑
    // [types.SET_BREADCRUMB_UPDATE](state, newCrumb) {
    //   state.breadcrumbList = newCrumb;
    // }


};
