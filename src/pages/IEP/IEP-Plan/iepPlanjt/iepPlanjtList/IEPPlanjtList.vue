<template>
    <div>
        <div v-if=" 'iepPlanjtList' === lastPath">
            <div class="tabsWrap">
                <vueTab :tabtitles="vueTabArr" :current-page="1">
                    <div class="tab-content-container">
                        <div class="center-content">
                            <div class="contentBox">
                                <div v-for="(item, index) in planDetailsData.TremPlans" class="item">
                                    <div class="titleBox">
                                        <span class="titleBoxContent">{{ item.Name}}</span>
                                    </div>
                                    <div class="planItemContent">
                                        <div class="planItemContentLeft">
                                            <span>教学名称: {{ planDetailsData.Title }}</span>
                                        </div>

                                        <div class="planItemContentRight">
                                            <el-button @click="goPlanLineDetails(item, vueTabArr[0])" :plain="true" type="info">查看{{ vueTabArr[0] }}详情</el-button>
                                            <el-button @click="editMouthPlan(item)" :plain="true" type="warning">编辑月计划</el-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tab-content-container">
                        <div class="center-content">
                            <div class="contentBox">
                                <div v-for="(item, index) in planDetailsData.MonthPlans" class="item">
                                    <div class="titleBox">
                                        <span class="titleBoxContent">{{ item.Name}}</span>
                                        <el-button style="float: right" :type="item.Status?'success':'warning'">{{ item.Status?'完成':'未完成'}}</el-button>
                                    </div>
                                    <div class="planItemContent">
                                        <div class="planItemContentLeft">
                                            <span>教学名称: {{ planDetailsData.Title }}</span>
                                        </div>
                                        <div class="planItemContentRight">
                                            <el-button @click="goPlanLineDetails(item, vueTabArr[1])" :plain="true" type="info">查看{{ vueTabArr[1] }}详情</el-button>
                                            <el-button @click="editWeekPlan(item)" :plain="true" type="warning">编辑周计划</el-button>
                                            <el-button @click="traningPaper(item, vueTabArr[1], planDetailsData.Title)">{{ vueTabArr[1] }}训练表</el-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tab-content-container">
                        <div class="center-content">
                            <div class="contentBox">
                                <div v-for="(item, index) in planDetailsData.WeekPlans" class="item">

                                    <div class="titleBox">
                                        <span class="titleBoxContent">{{ item.Name}}</span>
                                        <el-button style="float: right" :type="item.Status?'success':'warning'">{{ item.Status?'完成':'未完成'}}</el-button>
                                    </div>
                                    <div class="planItemContent">
                                        <div class="planItemContentLeft">
                                            <span>教学名称: {{ planDetailsData.Title }}</span>
                                        </div>
                                        <div class="planItemContentRight">
                                            <el-button @click="goPlanLineDetails(item, vueTabArr[2])" :plain="true" type="info">查看{{ vueTabArr[2] }}详情</el-button>
                                            <el-button @click="traningPaper(item, vueTabArr[2], planDetailsData.Title)">{{ vueTabArr[2] }}训练表</el-button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </vueTab>
            </div>

        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import vueTab from '../../../../../components/vue-tab.vue'
import api from '../../../../../api/index.js'
    export default {
        name: 'IEPPlanjtList',
        components: {},
        data() {
            return {
                vueTabArr: ['学期计划', '月计划', '周计划'],
                planDetailsData: '', //教学计划详情Data
                mouthSequence: [],
                weekSequence: [],
                defaultMouthSequence: []
            }
        },
        computed: {
            lastPath: function () {
                let pathStr = this.$route.path
                let pathArr = pathStr.split('/')
                pathArr.splice(0, 1)  //第一个元素是'',要去掉
                let len = pathArr.length
                return pathArr[len - 1]
            },
        },
        methods: {
            goPlanLineDetails(item, title) {
                if (item.Status) {
                    this.requestPlanItemDetails(item, title)
                } else {
                    this.$message.warning('请先编辑' + title);
                }
            },
            //获取教学计划详情，包含学期、月、周计划信息
            requestPlanDetails(id) {
                api.getPlanDetail(id).then(res => {
                    this.planDetailsData = res;
                    this.mouthSequence = res.MonthPlans; //保存月计划名称与ID的对应关系，编辑月计划时使用
                    this.weekSequence = res.WeekPlans; ////保存月计划名称与ID的对应关系，编辑周计划时使用
                    for (let i = 0; i < this.mouthSequence.length; i++) {
                        this.defaultMouthSequence[i] = this.mouthSequence[i].Name;
                    }
                });
            },
        },
        created() {
            this.requestPlanDetails(this.$store.state.iep.iepPlanID)

        }

    };

</script>
<style scoped>
    .tabsWrap {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 583px;
    }


</style>
