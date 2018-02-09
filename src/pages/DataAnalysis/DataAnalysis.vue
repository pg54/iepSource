<template>
    <div class="dataAnalysisBox">
        <div id="sidebar">
            <ul slot="links" class="links">
                <li>
                    <router-link class='link' to="/dataAnalysis/dataAnalysisPatient">
                        <p>康复档案分析</p>
                    </router-link>
                </li>
                <li>
                    <router-link class='link' to="/dataAnalysis/dataAnalysisHistory">
                        <p>评测历史</p>
                    </router-link>
                </li>
                <li>
                    <router-link class='link' to="/dataAnalysis/dataAnalysisCompare">
                        <p>评测对比</p>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="contentOne">
            <div class="tab-content">
                <div class="center-content">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import api from '../../api/index.js'
    import Highcharts from 'highcharts/highcharts'
    export default {
        name: 'dataAnalysis',
        methods: {

        },
        created() {
        },
        mounted: function () {
        },
        updated: function () {
        }
    };

</script>
<style scoped>
    .dataAnalysisBox {
        position: relative;

    }
    .contentOne {
        width: 1186px;
        height: 626px;
        position: absolute;
        left: 94px;
    }
    .center-content {
        width: 100%;
        height: 626px;
        padding: 5px 20px;
    }

    #sidebar {
        position: absolute;
        left: 0;
        top: 0;
        width: 95px;
        height: 626px;
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
        justify-content: center;
        font-size: 12px;
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
