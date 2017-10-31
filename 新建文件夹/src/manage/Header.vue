<template>
    <div class="header">
        <div class="crumbs">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item>
                    <i class="el-icon-menu"></i>&nbsp;{{getBigtitle}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{getChildtitle}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../static/img/img.jpg"> {{username}}
                    <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <div class="msg-warp">
                <img src="./img/icon-msg.png" alt="">
                <span class="msg-number">2</span>
            </div>
            <div class="exit" @click="exit">
                <img src="./img/icon-exit.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            name: ' ',
            bigtitle: '',
            childtitle: ''
        }
    }, created() {
        this.bigtitle = this.$route.meta.bigtitle;
        this.childtitle = this.$route.meta.childtitle;
    },
    computed: {
        username() {
            let username = localStorage.getItem('idt_App_businessName');
            return username ? username : this.name;
        },
        getBigtitle() {
            return this.$store.getters.breadcrumnb_bigtitle
        },
        getChildtitle() {
            return this.$store.getters.breadcrumnb_childtitle
        }
    },
    methods: {
        handleCommand(command) {
            if (command == 'loginout') {
                localStorage.removeItem('idt_App_businessName');
                localStorage.removeItem('idt_App_token');
                this.$router.push('/login');
            }
        },
        exit() {
            localStorage.removeItem('idt_App_businessName');
            localStorage.removeItem('idt_App_token');
            this.$router.push('/login');
        }
    }
}
</script>
<style scoped>
.header {
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    line-height: 70px;
    color: #fff;
    box-shadow: 1px 0px 16px #d1dbe5;
}

.header .logo {
    float: left;
    width: 250px;
    text-align: center;
}

.user-info {
    float: right;
    padding-right: 30px;
    font-size: 16px;
    color: #000;
}

.user-info .el-dropdown-link {
    position: relative;
    display: inline-block;
    padding-left: 50px;
    color: #999999;
    cursor: pointer;
    vertical-align: middle;
}

.user-info .user-logo {
    position: absolute;
    left: 0;
    top: 15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.el-dropdown-menu__item {
    text-align: center;
}

.el-breadcrumb {
    line-height: 70px;
}

.crumbs {
    margin-left: 32px;
    margin-bottom: 0;
    float: left;
}

.el-dropdown {
    float: left;
    margin-right: 10px;
}

.msg-warp,
.exit {
    float: left;
    display: block;
    width: 30px;
    height: 30px;
    position: relative;
    margin-top: 20px;
    cursor: pointer;
    margin-left: 10px;
}

.msg-warp:hover,
.exit:hover {
    box-shadow: 0 0 3px #ccc;
}

.msg-warp img {
    display: block;
    width: 14px;
    height: 18px;
    margin: 6px auto;
}

.msg-number {
    position: absolute;
    top: -2px;
    right: 2px;
    display: block;
    width: 16px;
    height: 16px;
    background-color: #ff0000;
    color: #fff;
    text-align: center;
    line-height: 16px;
    font-size: 12px;
    border-radius: 50%;
}

.exit img {
    display: block;
    width: 16px;
    height: 16px;
    margin: 7px auto;
}
</style>
