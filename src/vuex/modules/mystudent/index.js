/**
 * Created by pangang on 2017/4/23.
 */
import actions from './actions';
import mutations from './mutations';
export default {
  state: {
    patientList: [],//医生患者组列表

    currentPatientInfo:'',//当前正在操作的患者ID
      isfullFuction: true, //默认显示所有功能,
      cpepTestID: '',
      patientDeptObj: ''

  },

  actions: actions,

  mutations: mutations,

  getters: {
    filterDoned: function() {
      return 1;
    },
    filterNoDoned: function() {
      return 0;
    }
  }
};
