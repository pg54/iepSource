/**
 * Created by pangang on 2017/4/26.
 */
import * as types from '../../mutation_type';
export default {
  addPaper({ commit }, groupInfo) {
    commit(types.RECORD_QUESTIONSDATA, groupInfo);
  },
  addUserProfile({ commit }, userProfile) {
    commit(types.RECORD_DRPROFILE, userProfile);
  },
  hasEditedAction({ commit }) {
    commit(types.HAS_EDITED);
  },
  noEditedAction({ commit }) {
    commit(types.NO_EDITED);
  },
  setPaperID({ commit }, paperID) {
    commit(types.SET_PAPERID, paperID);
  },
  getCompanyNewsDataRec({ commit }) {
    commit(types.GET_COMPANY_NEWS_REC);
  },
  getCompanyNewsDataAll({ commit }, pageIndex) {
    commit(types.GET_COMPANY_NEWS_ALL);
  },
  getIndustryNewsDataRec({ commit }) {
    commit(types.GET_INDUSTRY_NEWS_REC);
  },
  getIndustryNewsDataAll({ commit }, pageIndex) {
    commit(types.GET_INDUSTRY_NEWS_ALL);
  },
  getPlatformNewsDataRec({ commit }) {
    commit(types.GET_PLATFORM_NEWS_REC);
  },
  getPlatformNewsDataAll({ commit }) {
    commit(types.GET_PLATFORM_NEWS_ALL);
  },
  getEduDataRec({ commit }) {
    commit(types.GET_EDU_REC);
  },
  getEduDataAll({ commit }, pageIndex) {
    commit(types.GET_EDU_ALL, pageIndex);
  },
  getArticleDataRec({ commit }) {
    commit(types.GET_ARTICLE_REC);
  },
  getArticleDataAll({ commit }, pageIndex) {
    commit(types.GET_ARTICLE_ALL, pageIndex);
  },
  getTrainingDataRec({ commit }) {
    commit(types.GET_TRAINING_REC);
  },
  getTrainingDataAll({ commit }, pageSize) {
    commit(types.GET_TRAINING_ALL, pageSize);
  },
  addFormVisible({ commit }) {
    commit(types.CHANGE_ADD_FORM_VISIBLE);
  },
  addFormInvisible({ commit }) {
    commit(types.CHANGE_ADD_FORM_INVISIBLE);
  },
  isModify({ commit }) {
    commit(types.IS_MODIFY_FORM);
  },
  notModify({ commit }) {
    commit(types.NOT_MODIFY_FORM);
  },
  setFormContent({ commit }, formContent) {
    commit(types.SET_FORM_CONTENT, formContent);
  },
  getCollectivePlan({ commit }, pageIndex) {
    commit(types.GET_COLLECTIVE_PLAN, pageIndex);
  },
  getPersononalPlan({ commit }, pageIndex) {
    commit(types.GET_PERSONONAL_PLAN, pageIndex);
  },
  planFormVisible({ commit }) {
    commit(types.PLAN_FORM_VISIBLE);
  },
  planFormINVisible({ commit }) {
    commit(types.PLAN_FORM_INVISIBLE);
  },
  planFormPersonoal({ commit }) {
    commit(types.PLAN_FORM_PERSONOAL);
  },
  planFormNotPersonoal({ commit }) {
    commit(types.PLAN_FORM_NOTPERSONOAL);
  },
  setPlanDetails({ commit }, planDetails) {
    commit(types.SET_PLAN_DETAILS, planDetails);
  },
  setPlanItemDetails({ commit }, itemId) {
    commit(types.SET_PLAN_ITEM_DETAILS, itemId);
  },
  getCourseDetails({ commit }, courseID) {
    commit(types.SET_COURSE_DETAILS, courseID);
  },
  getLineID({ commit }, lineID) {
    commit(types.SET_LINEID, lineID);
  },
  setIepPlanStatus({ commit }, showTabsContent) {
    commit(types.SET_IEPPLAN_STATUS, showTabsContent);
  },
  setIepPlanItemStatus({ commit }, showPlanWrap) {
    commit(types.SET_IEPPLAN_ITEM_STATUS, showPlanWrap);
  },
  setIepPlanCourseStatus({ commit }, showPlanItemContent) {
    commit(types.SET_IEPPLAN_COURSE_STATUS, showPlanItemContent);
  },
  setIepPlanChaptStatus({ commit }, showCourseContent) {
    commit(types.SET_IEPPLAN_CHAPT_STATUS, showCourseContent);
  },
  setShowPacientList({ commit }, showList) {
    commit(types.SET_SHOW_PACIENT_LIST, showList);
  },
  setShowNewVisible({ commit }, isShow) {
    commit(types.SET_SHOW_NEWS_VISIBLE, isShow);
  },
    showGeneralNews({ commit }, status) {
        commit(types.GENERAL_NEWS_STATUS, status);
    },
    showNewsIframe({ commit }, status) {
        commit(types.NEWS_IFRAMESTATUS_STATUS, status);
    },
    setIReprint({ commit }, status) {
      commit(types.SET_IS_REPRINT, status);
  },

  //设置面包屑
  // setBreadcrumbUpdate({ commit }, newCrumb) {
  //   commit(types.SET_BREADCRUMB_UPDATE, newCrumb);
  // }

};
