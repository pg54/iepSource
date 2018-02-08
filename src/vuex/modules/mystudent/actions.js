/**
 * Created by pangang on 2017/4/23.
 */
import * as types from '../../mutation_type';

export default {
  addPatientList({ commit }, arr) {
    commit(types.RECORD_GROUPINFO, arr);
  },
    setCPEPtestID({ commit }, cpTestID) {
        commit(types.SET_CPEP_TESTID, cpTestID);
    },

  emptyPatientList({ commit }) {
    commit(types.EMPTY_GROUPINFO);
  },

  setCurrentPatientInfo({ commit }, id) {
    commit(types.SET_CURRENT_PATIENTINFO, id);
  },
    setNotFullFuction({ commit }, full) {
        commit(types.SET_FULL_FUCTION, full);
    },
    setCurrentPatientDept({ commit}, obj) {
        commit(types.SET_CURRENT_PATIENTINFO_DEPT, obj)
    }

};
