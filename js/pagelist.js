/**
 * Created by liufeifeng on 12/28/17.
 * 封装H5分页方法。
 * 使用方法：window.Rui.pageList({mdname:,data:{}},function(){},function(){});
 */
window.Rui = window.Rui || {};
window.Rui.pageList =(function(){
    var pageNo = 2, //查询页数
        flag = true;
    return function(obj,successback,errback){
        var type = obj.type ? obj.type : 'post';
        var data = obj.data?$.extend({pageNo:pageNo, pageSize:5},obj.data):{pageNo:pageNo, pageSize:5};

        if(flag){
            flag = false;
            $.ajax({
                url: obj.mdname,
                data: data,
                type: type,
                dataType: 'json',
                success:function (res) {
                    if($.isFunction(successback)){
                        successback(res);
                    };
                    if(res.success){
                        pageNo++;
                    }
                    flag = true;
                },
                error:function (err) {
                    if($.isFunction(errback)){
                        errback(err);
                    }
                    flag = true;
                }
            });
        }
    };

})();