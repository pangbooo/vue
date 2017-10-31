<template>
    <ul class="yzlylb_slidebar">
        <li v-for="item in listdata" :key="item.uuid" :class="['yzlylb_slidebar_bg'+item.titleclass,{yzlylb_slidebar_bg:item.checked}]" @click="changeslidebar(item)"><router-link :to="item.link">{{item.text}}</router-link></li>
    </ul>
</template>

<script>
export default{
	name:'yzlylb_slidebar',
	props: {
      listdata: {
        type: Array,
        default(){
          return [];
        }
      }
    },
    data() {
        return {
		}
    },
    methods: {
        changeslidebar: function (item) {
            var uuid = item.uuid;
        }
    }
}
</script>

<style scoped>
/*  李文达 游在辽源列表-slidebar模块css  */
.yzlylb_slidebar{
    width: 90%;
}
.yzlylb_slidebar li {
    display: block;
    margin-bottom: 20px;
}
.yzlylb_slidebar a{
    position: relative;
    display: block;
    width:100%;
    height: 70px;
    line-height: 70px;
    box-sizing:border-box;
    background-color: ;
    border-radius: 5px;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    padding-left: 40%;
}
.yzlylb_slidebar li{
    border-radius: 5px;
    background-color:#3c95e5;
}
.yzlylb_slidebar li:hover,.yzlylb_slidebar .yzlylb_slidebar_bg{
    background-color: #fa8939;
}
.yzlylb_slidebar_bg1 a{
    background: url(../img/icon-slidebar1.png) 15% center no-repeat;
}
.yzlylb_slidebar_bg2 a{
    background: url(../img/icon-slidebar2.png) 15% center no-repeat;
}
.yzlylb_slidebar_bg3 a{
    background: url(../img/icon-slidebar3.png) 15% center no-repeat;
}
.yzlylb_slidebar_bg4 a{
    background: url(../img/icon-slidebar4.png) 15% center no-repeat;
}
.yzlylb_slidebar_bg1 a:hover,.yzlylb_slidebar_bg--h1 a{
    background: url(../img/icon-slidebar1.png) 15% center no-repeat;
}
.yzlylb_slidebar_bg2 a:hover,.yzlylb_slidebar_bg--h2 a{
    background: url(../img/icon-slidebar2.png) 15% center no-repeat;
}
.yzlylb_slidebar_bg3 a:hover,.yzlylb_slidebar_bg--h3 a{
    background: url(../img/icon-slidebar3.png) 15% center no-repeat;
}
.yzlylb_slidebar_bg4 a:hover,.yzlylb_slidebar_bg--h4 a{
    background: url(../img/icon-slidebar4.png) 15% center no-repeat;
}
.yzlylb_slidebar li:hover a::after,.yzlylb_slidebar_bg a::after{
    content: "";
    position: absolute;
    top: 50%;
    right:-15px;
    margin-top: -15px;
    width: 0;  
    height: 0;    
    border-top: 15px solid transparent;  
    border-left: 15px solid #fa8939;  
    border-bottom: 15px solid transparent;
}
</style>