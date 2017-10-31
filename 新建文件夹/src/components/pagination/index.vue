<template>
    <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30,50,100]" :page-size="pageSize" layout=" prev, pager, next, jumper,sizes,total" :total="totalPage">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    props: {
        currentPage: {
            type:Number
        }, 
        totalPage: {
            type:Number
        },  
        pageSize: {
            type:Number
        }
    },
    methods: {
        handleSizeChange(val) {
            this.$emit("size-change",val)
        },
        handleCurrentChange(val) {
            this.$emit("current-change",val)
        }
    }
}
</script>

<style scoped>
    .pagePos{
        text-align: right;
        padding: 10px 0 20px 0;
    }
</style>

