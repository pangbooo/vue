new Vue({
    el : '.container',
    data : {
        limitNum :3,
        addressList : [],
        currentIndex : 0,
        shippingMethod : 1
    },
    mounted : function(){
        this.$nextTick(function () {
            this.getAddressList();
        })
    },
    methods : {
        getAddressList : function(){
            var _this = this;
            this.$http.get('data/address.json').then(function (response) {
                var res = response.data;
                if(res.status == '0'){
                    _this.addressList = res.result;
                }
            })
        },
        loadMore : function(){
            this.limitNum = this.addressList.length
        },
        setDefault : function(addressId){
            this.addressList.forEach(function(item,index){
                if(item.addressId == addressId){
                    item.isDefault = true
                }else {
                    item.isDefault = false
                }
            })
        }
    },
    computed : {
        filterAddress : function(){
            return this.addressList.slice(0,this.limitNum)
        }
    }
});