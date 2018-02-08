import * as types from '../../mutation_type';

export default {
  [types.SET_IEP_PLAN_ID](state, id) {
    state.iepPlanID = id;
  },
}