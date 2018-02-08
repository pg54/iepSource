export default{
    install(Vue,options)
    {
      Vue.prototype.saveCurrentPatientInfo = function (o) {
        let obj = {
            ID: o.PatientAgentID,
            Name: o.Name,
            Sex: o.Sex,
            BirthDate: o.BirthDate,
            DeptID: o.DeptID,
            DeptName: o.DeptName,
            DiagnosisID: o.DiagnosisID,
            DiagnosisName: o.DiagnosisName
        }
        this.$store.dispatch('setCurrentPatientInfo', obj);
    
    }
    }
  }