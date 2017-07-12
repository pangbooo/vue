var vm = new Vue({
    el : '#app',
    data : {
        totalMoney : 0,
        productList : [],
        checkAllFlag : false,
        delFlag : false,
        curItem : null
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
                //_this.totalMoney = res.data.result.totalMoney;
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
            this.calcTotalPrice();
        },
        selectProduct : function(item){
            if( typeof item.checked == 'undefined'){
                //Vue.set(item,'checked',true)//全局注册
                this.$set(item,'checked',true); //局部注册
            }else {
                item.checked = !item.checked
            }
            this.calcTotalPrice();
        },
        checkAll : function(flag){
            this.checkAllFlag = flag;
            var _this = this;
            this.productList.forEach(function (value, index) {
                if(typeof value.checked == 'undefined'){
                    _this.$set(value,'checked',flag)
                }else {
                    value.checked = flag
                }
            });
            this.calcTotalPrice();
        },
        calcTotalPrice: function () {
            var _this = this;
            _this.totalMoney = 0;
            this.productList.forEach(function (item,index) {
                if(item.checked){
                    _this.totalMoney += item.productPrice * item.productQuantity
                }
            })
        },
        delProduct : function(item){
            this.curItem = item;
            this.delFlag = true;
        },
        confirmDel : function(){
            var index = this.productList.indexOf(this.curItem);
            this.productList.splice(index,1);
            this.delFlag = false;
            this.calcTotalPrice();
        }
    }
});

//全局过滤器
Vue.filter('money', function (value,type) {
    return '￥' + value.toFixed(2) + type
});