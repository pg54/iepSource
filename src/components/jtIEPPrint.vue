<template>
    <div id="planpaper">
        <div class="paperform-content">
            <div id="paperform-form1">
                <DIV style="LINE-HEIGHT: 30px;font-size: 22px" class=size16 align=center>
                    <STRONG>
                        <font color="#20a0ff">
                            {{ paperTitle }}
                        </font>
                    </STRONG>
                </DIV>
            </div>
            <div id="paperform-form2">
                <table class="tg">
                    <tr>
                        <th class="tg-s6z2" colspan="2" rowspan="2"><div style="display: inline-block;width: 4rem;">儿童姓名</div></th>
                        <th class="tg-s6z2" colspan="3" rowspan="2">
                            <SPAN id=rpt_Pro_Order_List_ctl00_lbl_eShop_Name>
                                <b>{{ '' }}</b>
                            </SPAN>
                        </th>
                        <th class="tg-s6z2" colspan="2" rowspan="2">性别</th>
                        <th class="tg-s6z2" colspan="3" rowspan="2">
                            <SPAN>{{ '' }}</SPAN>
                        </th>
                        <th class="tg-s6z2" colspan="3" rowspan="2">出生日期</th>
                        <th class="tg-s6z2" colspan="5" rowspan="2">
                            <SPAN>{{ '' }}</SPAN>
                        </th>
                        <th class="tg-s6z2" colspan="3" rowspan="2"><div style="display: inline-block;width: 2rem;">组别</div></th>
                        <th class="tg-s6z2" colspan="3" rowspan="2"></th>
                    </tr>
                    <tr>
                    </tr>
                    <tr>
                        <td class="tg-s6z2" colspan="2">计划人</td>
                        <td class="tg-s6z2" colspan="8"></td>
                        <td class="tg-s6z2" colspan="3"><div style="display: inline-block;width: 4rem;">实施<br>起止日期</div></td>
                        <td class="tg-s6z2" colspan="11"></td>
                    </tr>
                    <template v-if="paperData.length === 0">
                        <td class="tg-s6z2" colspan="24">未安排计划</td>
                    </template>
                    <template v-else>
                        <tr>
                            <th class="tg-s6z2" colspan="2" rowspan="2">主题</th>
                            <th class="tg-s6z2" colspan="2" rowspan="2">课程名称</th>
                            <th class="tg-s6z2" colspan="8" rowspan="2">长期目标</th>
                            <th class="tg-s6z2" colspan="8" rowspan="2">短期目标</th>
                            <th class="tg-s6z2" colspan="4">评鉴结果</th>
                        </tr>
                        <tr>
                            <td class="tg-s6z2">3</td>
                            <td class="tg-s6z2">2</td>
                            <td class="tg-s6z2">1</td>
                            <td class="tg-s6z2">0</td>
                        </tr>
                        <template v-for="(ele, index) in paperData">
                            <template v-if='index === 0'>
                                <tr>
                                    <td class="tg-s6z2" colspan="2" :rowspan="paperData.length">
                                        <template v-for='el in verticalTitle'>
                                            {{ el }}
                                            <br>
                                        </template>
                                    </td>
                                    <td class="tg-yw4l" colspan="2">{{ ele.Name }}</td>
                                    <td class="tg-yw4l" colspan="8">{{ ele.TeachTarget }}</td>
                                    <td class="tg-yw4l" colspan="8">{{ ele.TeachContent }}</td>
                                    <template v-if="ele.History && ele.History.length > 0">
                                        <td class="tg-031e" v-for="item in ele.History">
                                            {{item.Count}}
                                        </td>
                                    </template>
                                    <template v-else>
                                        <td class="tg-031e" v-for="item in ['','','','']">
                                            {{item}}
                                        </td>
                                    </template>
                                </tr>
                            </template>
                            <template v-if='index > 0'>
                                <tr>
                                    <td class="tg-yw4l" colspan="2">{{ ele.Name }}</td>
                                    <td class="tg-yw4l" colspan="8">{{ ele.TeachTarget }}</td>
                                    <td class="tg-yw4l" colspan="8">{{ ele.TeachContent }}</td>
                                    <template v-if="ele.History && ele.History.length > 0">
                                        <td class="tg-031e" v-for="item in ele.History">
                                            {{item.Count}}
                                        </td>
                                    </template>
                                    <template v-else>
                                        <td class="tg-031e" v-for="item in ['','','','']">
                                            {{item}}
                                        </td>
                                    </template>
                                </tr>
                            </template>
                        </template>
                    </template>
                    <tr>
                        <td class="tg-s6z2" colspan="2">
                            <div style="display: inline-block;height: 4rem;line-height: 4rem;">周总结</div>
                        </td>
                        <td class="tg-s6z2" colspan="22" style="text-align: left">{{ teacherComment }}</td>
                    </tr>
                </table>
            </div>
        </div>
        <!-- <el-row :gutter="20" id="teacherComment" style="margin: 5px;border: 2px solid #118dee;border-radius: 4px;padding: 8px;box-sizing: border-box">
            <el-col :span="20">
                <el-row>
                    <p style="margin-bottom: 6px;font: 16px border">请填写教师评价</p>
                </el-row>
                <el-row>
                    <el-input type="textarea" :rows="4" placeholder="模板：该儿童七大发展功能中，知觉、粗大动作的发展相对其他功能发展区域发展较好；模仿、知觉、精细动作、粗大动作、手眼协调 呈现发展空间；其中：认知表现、口语认知发展空间狭窄或发展相对（严重）滞后。在病理分析中，可呈现语言病理问题严重 程度突出；情感、人际关系、物品喜好、感知模式问题趋于中度水平。"
                        v-model="teacherComment">
                    </el-input>
                </el-row>
            </el-col>
            <el-col :span="4">
                <el-row>
                    <p style="height: 84px;">&nbsp;</p>
                </el-row>
                <el-row>
                    <el-button id="createImg" type="info" :disabled="!teacherComment" @click.native="test">确认图表</el-button>
                </el-row>
            </el-col>
        </el-row> -->
    </div>
</template>

<script>
    import dom2img from 'dom-to-image';
    export default {
        name: 'jtIEPPrinter',
        props: ['paperData', 'paperTitle', 'verticalTitle'],
        data() {
            return {
                teacherComment: ''
            }
        },
        computed: {
            patientName: function () {
                return this.$store.state.mystudent.currentPatientInfo.Name;
            },
            patientSex: function () {
                return this.$store.state.mystudent.currentPatientInfo.Sex;
            },
            patientBirthday: function () {
                return this.$store.state.mystudent.currentPatientInfo.BirthDate ? this.$store.state.mystudent.currentPatientInfo
                    .BirthDate.split(' ')[0] : '';
            },
        },
        methods: {
            test() {
                this.createdLastImg();
            },
            createdLastImg() {
                let _this = this;
                let p = document.querySelector("#planpaper");
                let c = document.querySelector(".paperform-content") 
                let t = document.querySelector("#teacherComment")
                let i = p.children[0].tagName;
                if (i === 'IMG') {
                    _this.$message.warning('图表已经生成')
                } else {
                    dom2img.toPng(c, { quality: 1 })
                        .then(function (dataUrl) {
                            p.removeChild(c);
                            var img = new Image();
                            img.src = dataUrl;
                            p.insertBefore(img, t);
                            _this.$message.success('图表生成成功')
                        })
                        .catch(function (error) {
                            console.error('oops, something went wrong!', error);
                        });
                }
            },

        },
        created() {

        },
        beforeMount() {

        },
        mounted() {

        }
    }

</script>

<style>
    @media screen {
        .print-content {
            /*box-sizing: border-box;*/
        }

        .paperform-title {
            font-size: 22px;
            text-align: center
        }

        .paperform-subTitle {
            text-align: center;
        }

        .paperform-form {
            width: 100%;
        }

        /*1080*1920 页面展示时设置padding:2px 10px   打印时的设置  padding:10px 18px*/
        .tg {
            border-collapse: collapse;
            border-spacing: 0;
            width: 100%
        }
        .tg td {
            font-family: Arial, sans-serif;
            font-size: 12px;
            padding: 4px 8px;
            border-style: solid;
            border-width: 1px;
            overflow: hidden;
            word-break: normal;
        }
        .tg th {
            font-family: Arial, sans-serif;
            font-size: 12px;
            font-weight: normal;
            padding: 4px 8px;
            border-style: solid;
            border-width: 1px;
            overflow: hidden;
            word-break: normal;
        }
        .tg .tg-s6z2 {
            text-align: center;
            vertical-align: center
        }
        .tg .tg-031e {
            text-align: center;
            vertical-align: center
        }
        .tg .tg-baqh {
            text-align: center;
            vertical-align: center
        }
        .tg .tg-yw4l {
            text-align: center;
            vertical-align: center
        }
        .tg .tg-textleft {
            text-align: left;
            vertical-align: top
        }
    }

</style>
