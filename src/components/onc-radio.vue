<template>
    <div class="questionChoses">
        <input class="radioclass " type="radio" :disabled="isComplete" :value="option.Code" 
        :id="option.ID" 
        :name="question.ID"
        v-model="testPaperFormData.Papers[paperIndex].Sections[sectionIndex].Questions[questionIndex].Result" 
        @change="questionOptionChecked($event,'sth')"
        @click="changeClear($event)">
        <label :for="option.ID" class="simbleBox"></label>
        <label :for="option.ID" class="testLabel">{{ option.Code }}&nbsp;{{ option.Name }}</label>
    </div>
</template>
<script>
export default {
        name: 'oncRadio',
        props: ['option'],
        data() {
            return {
                changed: false
            }
        },
        methods: {
            changeClear(event) {
                let _this = this;
                setTimeout(() => {
                    if (!_this.changed) {
                        event.target.checked = false;
                    }
                    _this.changed = false;

                },0)
            },
            questionOptionChecked(event, str) {
                this.changed = true;
            },
        }
}
    
</script>

<style scoped>
    .questionChoses {
        display: flex;
        align-items: center;
        height: 28px;
        margin: 5px 0;
        z-index: 1000;
        cursor: pointer;
    }

    .questionChoses:hover {
        background-color: rgba(239, 239, 239, 1);
    }

    .radioclass {
        display: inline-block;
        width: 18px;
        height: 18px;
        opacity: 0;
        cursor: pointer;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
        filter: alpha(opacity=0);
    }

   .simbleBox {
        display: inline-block;
        width: 18px;
        height: 18px;
        margin-right: 5px;
        cursor: pointer;
        background-image: url("../assets/images/serviceToolImg/默认选框.png");
    }

    .testLabel {
        cursor: pointer;
        display: inline-block;
        width: calc(100% - 41px);
    }

    input[type=radio]:checked+label {
        background-image: url("../assets/images/serviceToolImg/选中选框.png");
    }


</style>

