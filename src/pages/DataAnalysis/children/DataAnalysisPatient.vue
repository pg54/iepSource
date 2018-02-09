<template>
    <div>
        <div class="block" style="margin: 10px 0;">
            <span class="demonstration" style="font-size: 18px;font-weight: bold;margin-right: 20px">患者数据分析</span>
            <span class="wrapper">
                <el-button :type="btnType[0]" @click.native='groupParesData'>康复档案各患者组占比</el-button>
                <el-button :type="btnType[1]" @click.native='sexParesData'>康复档案患者性别占比</el-button>
            </span>
        </div>
        <div class="chart-container">
            <div id="pieChart" style="width:100%; height:565px;"></div>
        </div>
    </div>
</template>
<script>
    import api from '../../../api/index.js'
    import Highcharts from 'highcharts/highcharts'
    export default {
        name: 'DataAnalysisPatient',
        data() {
            return {
                chartTitle: '',
                chartSeries: [],
                btnType: ['primary','default']
            }
        },
        computed: {
            groups: function () {
                return this.$store.state.mystudent.patientList;
            }
        },
        methods: {
            drawPieChart() {
                let _this = this;
                _this.pieChart = new Highcharts.Chart('pieChart', {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false
                    },
                    title: {
                        text: _this.chartTitle
                    },
                    tooltip: {
                        headerFormat: '{series.name}<br>',
                        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    series: _this.chartSeries

                })
            },
            groupParesData() {
                this.btnType = ['primary','default']
                this.chartTitle = '康复档案各患者组占比'
                let arr = this.groups.map((ele) => {return [ele.groupName, ele.groupPatients.length]})
                this.chartSeries = [{
                    type: 'pie',
                    data: arr
                }]
                this.drawPieChart()
            },
            sexParesData() {
                this.btnType = ['default','primary']
                let o = this.groups
                let a = []
                o.forEach(ele => {
                    let b =  a.concat(ele.groupPatients)
                    a = b
                });
                let male = a.filter(ele => ele.Sex === 1).length
                let female = a.filter(ele => ele.Sex === 0).length
                this.chartSeries = [{
                        type: 'pie',
                        data: [
                            ['男', male],
                            ['女', female]
                        ]
                    }]
                this.chartTitle = '康复档案患者性别占比'
                this.drawPieChart()
                
            },
        },
        created() {
            // this.chartTitle = '2014 某网站各浏览器浏览量占比';
            // this.chartSeries = [{
            //             type: 'pie',
            //             name: '浏览器访问量占比',
            //             data: [
            //                 ['Firefox', 45.0],
            //                 ['IE', 26.8],
            //                 ['Chrome', 12.8],
            //                 ['Safari', 8.5],
            //                 ['Opera', 6.2],
            //                 ['其他', 0.7]
            //             ]
            //         }]
        },
        mounted() {
            this.groupParesData()
        }
    }

</script>
<style scoped>
    .chart-container {
        width: 100%;
        height: 572px;
    }

</style>
