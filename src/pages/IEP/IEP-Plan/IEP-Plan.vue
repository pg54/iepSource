<template>
    <div>
        <div id="sidebar">
            <ul slot="links" class="links">
                <li>
                    <router-link class='link' to="/iep/iepPlan/iepPlanjt">
                        <p>集体计划</p>
                    </router-link>
                </li>
                <li>
                    <router-link class='link' to="/iep/iepPlan/iepPlanPerson">
                        <p>个人计划</p>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="iepPlanContent">
            <router-view></router-view>
        </div>
        
        <!-- <TeachSchedule :isIEP="true" :patientID="chosedPatientID"></TeachSchedule> -->
    </div>
</template>
<script>
    import TeachSchedule from '../../../components/teachSchedule.vue'
    export default {
        name: 'iepPlan',
        components: {
            TeachSchedule
        },
        data() {
            return {
                chosedPatientID: ''
            }
        },
        computed: {},
        methods: {},
        created: function () {

        }
    };

</script>
<style scoped>
.iepPlanContent {
    position: absolute;
    left: 95px;
    height: 626px;
    top: 0;
    width: calc(100% - 95px)
}
#sidebar {
    position: absolute;
    left: 0;
    top: 42px;
    width: 95px;
    height: 583px;
    overflow-y: scroll;
    background-color: #EFEFEF;
    border-right: 1px solid #EFEFEF;
}
.links {
    width: 94px;
    height: 626px;
    background-color: #EFEFEF
}

.link {
    display: flex;
    width: 94px;
    height: 70px;
    font-size: 14px;
    color: #333333;
    align-items: center;
    justify-content: center
}

.link span {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 20px;
}

.router-link-active {
    background-color: RGBA(254, 255, 255, 1.00);
    color: RGBA(47, 189, 252, 1.00);
    border-left: 6px solid #31BBFC
}


</style>
