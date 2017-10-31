/*
 * @文档描述: 网站浮动按钮
 * @参数: {show:Boolean} true 展开  false 收起
 * @作者: 孔祥超 
 * @创建时间: 2017-09-27 09:40:33 
 * @Last Modified by: 孔祥超
 * @Last Modified time: 2017-10-09 15:20:47
 */
<template>
    <div class="floatbar">
        <transition name="el-zoom-in-center">
            <div id="ball" class="floatbar__ball" v-show="!open" @click="open=true;"><i class="el-icon-menu"></i></div>
        </transition>
        <transition name="el-zoom-in-center">
            <div id="floatbar" class="floatbar__wrap" v-show="open">
                <ul>
                    <li v-for="nav in navData" :key="nav.id" :class="'floatbar__menu__' + nav.icon" @click="linkTo(nav.path)">
                        <span>{{nav.title}}</span>
                    </li>
                    <li class="floatbar__menu__qrcord">
                        <span>扫一扫</span>
                        <div class="floatbar__left floatbar__ewm">
                            <i></i>
                            <p class="floatbar__menu__qrcord--p01">扫一扫<br>扫码赠送神秘大礼</p>
                            <p class="floatbar__menu__qrcord--p02">全国免费服务热线<br>
                                <b>4000-000-0000</b>
                            </p>
                        </div>
                    </li>
                    <li class="floatbar__menu__return">
                        <span @click="gotoTop">返回顶部</span>
                    </li>
                    <li class="floatbar__menu__close">
                        <span @click="open=false" class="floatbar__icon--close">收起 <i class=" el-icon-d-arrow-right"></i></span>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            open: true,
            navData: [
                { id: 'zx', title: '我要咨询', path: '/zxts/wyzx/index.html', icon: 'icon1', child: '' },
                { id: 'jy', title: '我要建议', path: '/zxts/jydj/index.html', icon: 'icon2', child: '' },
                { id: 'ts', title: '我要投诉', path: '/zxts/wyts/index.html', icon: 'icon3', child: '' }
            ]
        }
    },
    created() {
        this.open = this.show;
    },
    mounted() {
        let self = this;
        $(function(){
            let bwidth = $(document).width();
            if (bwidth - 200 < 1260) {
                self.open = false;
                $('.floatbar__menu__close').hide();
                $('#ball').mouseover(function() {
                    self.open = true;
                });
                $('#floatbar').mouseleave(function() {
                    self.open = false
                });
            }
        })
    },
    methods: {
        linkTo(path) {
            window.open(path,'_self');
        },
        gotoTop(acceleration, stime) {
            acceleration = acceleration || 0.1;
            stime = stime || 10;
            var x1 = 0;
            var y1 = 0;
            var x2 = 0;
            var y2 = 0;
            var x3 = 0;
            var y3 = 0;
            if (document.documentElement) {
                x1 = document.documentElement.scrollLeft || 0;
                y1 = document.documentElement.scrollTop || 0;
            }
            if (document.body) {
                x2 = document.body.scrollLeft || 0;
                y2 = document.body.scrollTop || 0;
            }
            var x3 = window.scrollX || 0;
            var y3 = window.scrollY || 0;
            var x = Math.max(x1, Math.max(x2, x3));
            var y = Math.max(y1, Math.max(y2, y3));
            var speeding = 1 + acceleration;
            window.scrollTo(Math.floor(x / speeding), Math.floor(y / speeding));
            if (x > 0 || y > 0) {
                var run = this.gotoTop(acceleration, stime);
                window.setTimeout(run, stime);
            }
        }
    }
}
</script>

<style scoped>
/*
css belong to floatbar.vue
*/
.floatbar {
    position: fixed;
    top: calc(50% - 150px);
    right: 20px;
    height: 300px;
    z-index: 999;
}
.floatbar__ball {
    font-size: 16px;
    position: absolute;
    top: calc(50% - 25px);
    right: -30px;
    width: 50px;
    height: 50px;
    background-color: #48576a;
    line-height: 50px;
    text-align: center;
    color: #fff;
    border-radius: 50%;
    transition: all .3s ease-out 0s;
    animation-name: ripple;
    /*动画属性名，也就是我们前面keyframes定义的动画名*/
    animation-duration: 2s;
    /*动画持续时间*/
    animation-timing-function: ease;
    /*动画频率，和transition-timing-function是一样的*/
    animation-delay: 0s;
    /*动画延迟时间*/
    animation-iteration-count: infinite;
    /*定义循环资料，infinite为无限次*/
    animation-direction: alternate;
    /*定义动画方式*/
    box-shadow: 0 0 10px rgba(0, 0, 0, .3) inset;
    cursor: pointer;
}
.floatbar__icon--close {
    animation-name: moveing;
    animation-duration: 1s;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
}
@keyframes ripple {
    0% {
        opacity: 0.5;
        width: 50px;
        height: 50px;
        line-height: 50px;
        /* font-size: 14px; */
    }
    100% {
        opacity: 0.8;
        width: 60px;
        height: 60px;
        line-height: 60px;
        /* font-size: 18px; */
    }
}

@keyframes moveing {
    0% {
        opacity: 0.3;
    }
    100% {
        opacity: 1;
    }
}
.floatbar__ball:hover {
    right: -20px;
    background-color: #1d90e6;
}

.floatbar__wrap {
    position: fixed;
    right: 20px;
    top: 30%;
    transition: all .3s ease-out 0s
    
}
.floatbar__wrap ul li {
    position: relative;
    width: 80px;
    height: 80px;
    background-color: rgba(0, 0, 0, 0.5);
    border-bottom: solid 1px #555666;
    text-align: center;
    background-repeat: no-repeat;
    background-position: center 20%;
    cursor: pointer;
}

.floatbar__wrap ul li:hover {
    background-color: #1d90e6;
    border-bottom: solid 1px #20a0ff;
}

.floatbar__wrap ul li:hover .floatbar__left {
    display: block;
}

.floatbar__menu__icon1 {
    background-image: url(img/zx-icon.png);
}
.floatbar__menu__icon2 {
    background-image: url(img/jy-icon.png);
}

.floatbar__menu__icon3 {
    background-image: url(img/ts-icon.png);
}

.floatbar__menu__qrcord {
    background-image: url(img/erweima.png);
}

.floatbar__menu__return {
    background-image: url(img/fanhui.png);
}

.floatbar__wrap li.floatbar__menu__close {
    height: 40px;
    line-height: 40px;
}

.floatbar__wrap li span {
    color: #fff;
    display: block;
    padding-top: 54px;
}

.floatbar__wrap li.floatbar__menu__close span {
    padding-top: 0
}

.floatbar__left {
    position: absolute;
    left: -160px;
    top: 0px;
    width: 160px;
    height: 80px;
    background-color: #50bfff;
    border-bottom: solid 1px #50bfff;
    display: none;
}

.floatbar__left a {
    color: #fff;
    line-height: 80px;
}

.floatbar__ewm {
    height: 260px;
    top: -180px;
}

.floatbar__ewm i {
    background-image: url(img/erweima.png);
    display: block;
    width: 145px;
    height: 145px;
    margin: auto;
    margin-top: 7px;
}

.floatbar__ewm p {
    color: #fff;
    margin-top: 5px;
}

.floatbar__ewm .floatbar__menu__qrcord--p01 {
    font-size: 12px;
    line-height: 20px;
}

.floatbar__ewm .floatbar__menu__qrcord--p02 {
    font-size: 18px;
}
</style>
