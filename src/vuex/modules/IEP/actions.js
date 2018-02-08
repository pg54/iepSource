import * as types from '../../mutation_type';

export default {
  setIEPPlanID({ commit }, id) {
    commit(types.SET_IEP_PLAN_ID, id);
  },
}