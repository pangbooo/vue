var vm = new Vue({
    el : '#app',
    data : {
        totalMoney : 0,
        productList : [],
        checkAllFlag : false
    },
    filters : {
        formatMoney : function(value){
            return '￥' + value.toFixed(2)
        }
    },
    mounted : function () {
        this.cartView();
    },
    methods : {
        cartView  : function(){
            var _this = this;
            this.$http.get('data/cartData.json',{id:'123'}).then(function (res) {
                _this.productList = res.data.result.list;
                _this.totalMoney = res.data.result.totalMoney;
            })
        },
        changeMoney　: function(item,way){
            if(way>0){
                item.productQuantity++;
            }else {
                item.productQuantity--;
                if(item.productQuantity<1){
                    item.productQuantity = 1
                }
            }
        },
        selectProduct : function(item){
            if( typeof item.checked == 'undefined'){
                //Vue.set(item,'checked',true)//全局注册
                this.$set(item,'checked',true); //局部注册
            }else {
                item.checked = !item.checked
            }
        },
        checkAll : function(flag){
            this.checkAllFlag = flag;
            var _this = this;
            if(this.checkAllFlag){
                this.productList.forEach(function (value, index) {
                    if(value.checked == 'undefined'){
                        _this.$set(value,'checked',flag)
                    }else {
                        value.checked = flag
                    }

                })
            }
        }
    }
});

//全局过滤器
Vue.filter('money', function (value,type) {
    return '￥' + value.toFixed(2) + type
});