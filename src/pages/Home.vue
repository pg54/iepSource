<template>
    <div id="appMain" class="appWrap" v-loading="homeLoading" element-loading-text="拼命加载中">
        <Navbar></Navbar>
        <div style="height: 60px;z-index: 100;position:absolute;top: 94px;color: red;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item v-for="(item, index) in xpath" :key="item.text">
                    <span @click="linkJump(index)">{{ item.text }}</span>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main">
            <router-view key="key"></router-view>
        </div>
        <div id='footer' class="clearfix">
            <span class="linkTitle">其它网站</span>
            <a target='_blank' href="http://www.onenewcare.com/">一新康复</a>
            <a target='_blank' href="http://112.74.115.13:8082/">一新儿童康复中心</a>
            <span class="versionNumber">版本号v1.0.0</span>
        </div>
    </div>
</template>
<script>
    import Navbar from '../components/Navbar.vue';
    import api from '../api/index.js';
    export default {
        name: 'home',
        components: {
            Navbar
        },
        computed: {
            key() {
                return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
            },
            xpath: function () {
                let pathStr = this.$route.path
                let pathArr = pathStr.split('/')
                pathArr.splice(0, 1)
                let len = pathArr.length
                let newArr = pathArr.map(function (ele, index) {
                    let obj = {
                        text: ele,
                        disabled: index === (len - 1)
                    }
                    return obj
                })
                return newArr
            },
        },
        data() {
            return {
                homeLoading: false
            }
        },
        methods: {
            linkJump(index) {
                let xpath = this.xpath.map(ele => ele.text)
                let pathStr = '/' + xpath.slice(0, index + 1).join('/').trim()
                // 记录对应的path的状态，状态有两个，列表弹窗，对应的页数，其实就是这个挺难做的，每个path对应的具体网络请求的都不同。每个页面单独弄一个history，
                // vuex中每个path对应一个history，后面再弄
                this.$router.push(pathStr);
            }
        },
        created() {
            api.drProfile().then(res => {
                this.$store.dispatch('addUserProfile', res.data);
                api.getDoctorPatientList().then(res => {
                    let arr = [];
                    var groupInfo = res.Data;
                    for (var i = 0, j = groupInfo.length; i < j; i++) {
                        var obj = {
                            'groupName': groupInfo[i].Name,
                            'groupID': groupInfo[i].ID,
                            'groupPatients': groupInfo[i].Agents
                        };
                        arr.push(obj);
                    }
                    this.$store.dispatch('addPatientList', arr);
                    this.homeLoading = false;
                    this.$router.push({
                        path: this.$router.path
                    });
                }).catch(err => {
                    console.log('患者组网络请求有问题');
                })
            }).catch(err => {
                console.log('home医生信息网络请求有问题');
            })
        }
    };

</script>
<style scoped>
    .appWrap {
        position: absolute;
        left: 0;
        top: 0;
        width: 1280px;
        height: 760px;
        border: 1px solid #efefef;


        overflow: hidden;
    }

    .main {
        position: absolute;
        left: 0;
        top: 94px;
        width: 1280px;
        height: 626px;
    }

    #footer {
        position: absolute;
        left: 0;
        top: 720px;
        width: 1280px;
        height: 40px;
    }

    #footer a {
        height: 40px;
        line-height: 40px;
        margin: 0 10px;
        font-size: 18px;
    }

    .linkTitle {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        margin: 0 10px;
        font-size: 18px;
    }

    .versionNumber {
        float: right;
        height: 40px;
        line-height: 40px;
        margin: 0 10px;
        font-size: 14px;
    }

    .clearfix:after {
        display: block;
        content: '';
        clear: both;
        height: 0;
        width: 0;
        visibility: hidden;
    }

</style>
