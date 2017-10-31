<template>
    <div class="sidebar">
        <div class="logo"><img src="./img/adminlogo.png" alt=""></div>

        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo mt40" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import getAllOperater from '@/services/manage/yhgl/getAllOperate.js';
export default {
    data() {
        return {
            items:[]
        }
    }, created() {
        getAllOperater().then(res => {
            // console.log(JSON.stringify(res.data));
           // alert(JSON.stringify(res));
            this.items = res;
            //alert(JSON.stringify(itemsMenu));
        });
    }, computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    }
}
</script>

<style>
.logo {
    width: 100%;
    background: url(./img/logo-border.png) center bottom no-repeat;
    padding: 23px 0 20px;
}

.logo img {
    display: block;
    margin: 0 auto;
}

.el-menu,
.el-submenu .el-menu {
    background: #3388cb;
}

.mt40 {
    margin-top: 40px;
}

.el-submenu__title,
.el-menu-item {
    color: #fff;
    height: 45px;
    line-height: 45px;
}
.el-submenu .el-menu-item{
    height: 36px;
    line-height: 36px;
}
.el-submenu .el-menu-item:hover,
.el-submenu__title:hover {
    background-color: #4695d0;
}

.el-submenu .el-menu-item:hover:after,
.el-submenu__title:hover:after {
    content: "";
    position: absolute;
    right: -5px;
    top: -2px;
    display: block;
    width: 5px;
    height: 49px;
    background: url(./img/sidenav-bg.png) no-repeat;

}
.el-submenu .el-menu-item:hover:after{
    height: 40px;
    background: url(./img/sidenav-bg.png) no-repeat;
    background-size: 83%;
}
.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active,
.el-menu-item.is-active {
    color: #fff;
}
</style>
