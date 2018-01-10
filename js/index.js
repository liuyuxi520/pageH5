/**
 * Created by liufeifeng on 1/10/18.
 */
var loading = false;
//项目列表分页
$('.content').on('scroll',function () {
    var totalCount = $('#totalCount').val(),
        type = $('#type').val(),
        $this = $(this),
        listUl = $this.find('ul.list-product'),
        viewHei = $this.height(),
        scrollTop = $this.scrollTop(),//滚动高度
        $thisHei = $this.get(0).scrollHeight;//内容高度
    var paras = {
        mdname:'/get_itemList.json',
        data : {
            needCount: true,
            pageSize: 10,
            status: 0,
            type: type
        }
    };
    //初始化时，数据完全加载进来，则退出，不发ajax请求
    if(totalCount === (listUl.find('li').length)){
        return;
    }else{
        if(viewHei + scrollTop === $thisHei ){//页面滚动到底部，加载数据
            // 如果正在加载，则退出
            if(loading){
                return;
            }
            loading = true;
            window.Rui.pageList(paras,function(res){
                if(res.success){
                    if(res.list && res.list.length>0){
                        var html = '',
                            list =res.list;
                        for(var i = 0;i<list.length;i++){
                            html +='<li><a style="display:block" href="/product/detail.html?id='+list[i].id +'"><strong>'+list[i].name +'</strong>';
                            html +='<div class="row text-center"><div class="col-33 text-left"><div class="num color-danger"><span class="font26">'+tool.nfmoney(list[i].annualRate,'0',1) +'</span>%</div><p>预计年化收益</p></div>';
                            html +='<div class="col-33"><div class="num">'+list[i].timeLimit+'天</div><p>项目期限</p></div><div class="col-33">';
                            html +=list[i].status === 20 ?'<div class="button button-fill button-round button-warning">'+status['s'+list[i].status].text : '<div class="button button-fill button-round disabled">'+status['s'+list[i].status].text;
                            html +='</div><p>剩余 '+tool.nfmoney(res.list[i].surplusTenderAmount,-2,0)+'元</p></div></div></a></li>';
                        }
                        listUl.append(html);
                        if(res.totalCount === (listUl.find('li').length)){//数据加载完毕
                            listUl.append('<p style="text-align: center;width: 100%; padding-bottom: 6px">没有更多了</p>');
                            return;
                        }
                        loading = false;
                    }
                }else{
                    $.toast(res.resultMsg);
                }
            });
        }
    }

});