/*
* @Author: leo
* @Date:   2017-07-28 09:10:22
* @Last Modified by:   leo
* @Last Modified time: 2017-07-28 11:16:38
*/
(function(window, undefined) {
	var file_Nums = 0;
	window.pagenum = 0;
	var _pagenum_m = 0;
	var _userid ="1074";
	var _useraccount ="ceshi2";
	var canpublish=false;
	//var beginAutoSave=true;
	var beginAutoSave=true;
	var newstypeset =false;
	var newsposition = 'news';
	var govaudit = 'govaudit';
	var govpend = 'govpend';

	if(newsposition == "govaddnews" ||newsposition ==govaudit ||newsposition ==govpend)
	{
	    beginAutoSave = false;
	}
	var newstagary = new Array();


	//处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
	function banBackSpace(e){
	    var ev = e || window.event;
	    var obj = ev.target || ev.srcElement;
	    if(obj.id=='wbtitle'){statisticsnums('wbtitle','wbtitlelength')}
	    var t = obj.type || obj.getAttribute('type');

	    var vReadOnly = obj.readOnly;
	    var vDisabled = obj.disabled;
	    //处理undefined值情况
	    vReadOnly = (vReadOnly == undefined) ? false : vReadOnly;
	    vDisabled = (vDisabled == undefined) ? true : vDisabled;
	    //当敲Backspace键时，事件源类型为密码或单行、多行文本的，
	    //并且readOnly属性为true或disabled属性为true的，则退格键失效
	    var flag1= ev.keyCode == 8 && (t=="password" || t=="text" || t=="textarea")&& (vReadOnly==true || vDisabled==true);
	    //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
	    var flag2= ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea" ;

	    if(flag2 || flag1)return false;
	}
	function addnextspecialnews()
	{
	    location.href="/system/site/column/news/addnews.jsp?newsposition="+newsposition+"&wbspecialid=0&wbspecialtypeid=0&treeid=1019&wbcontentid=50516"
	        +"&backurl=%2Fsystem%2Fsite%2Fspecial%2Fspecial.jsp%3Fwbspecialid%3D0%26treeid%3D1019%26wbcontentid%3D50516";
	}
	function add2Special(owner,wbnewsid)
	{
	    if(!wbnewsid||wbnewsid<1) 
	    {
	        top.showAlert(window,"请先保存文章。");
	        return;
	    }
	     top.showDialog(window,{
	        'title': '加入专题', 
	        'arguments':new Array(window),
	        'url':"/system/site/special/selectspecial/selectspecial.jsp?owner="+owner+"&wbnewsid="+wbnewsid,
	        'arguments':new Array(window),
	        'width': '600',
	        'height': '460' 
	   });
	    //window.showModalDialog("/system/site/special/selectspecial/selectspecial.jsp?owner="+owner+"&wbnewsid="+wbnewsid,"window","help:no;status:no;dialogWidth:600px;dialogHeight:460px");
	}

	function newstoPagepicNews()
	{
	    var massage = "";
	    if(_hasMobilContent){
	        massage = "该文章包含独立的移动版内容，转换为组图后移动版正文会被丢弃，";
	    }
	    top.showConfirm(window,massage+"您确定要将文章转化为组图文章吗？",function(r){
	        if(r){
	            var detailform = document.getElementById('detailform');
	            detailform.enctype.value="";
	            detailform.action="addnews.jsp?actiontype=topagenews&wbcontentid=50516&wbnewsid=0&rid=2122jqtzw8&treeid=1019&pendingnewsauth=0&wbspecialid=0&wbspecialtypeid=0&newsposition=news&owner=1378599958&backurl=newscontent.jsp";
	            detailform.submit();
	        }
	    });
	}
	function showWordSample()
	{
	    top.showDialog(window,{
	        'title': '一键导入', 
	        'arguments':new Array(window),
	        'url': "/system/site/column/news/wordsample.htm",
	        'arguments':new Array(window),
	        'width': '460',
	        'height': '120' 
	   });
		//showModalDialog("newstransmit/wordsample.htm","window","help:no;status:no;scroll:no;dialogWidth:460px;dialogHeight:120px");
	}
	//一键导入
	function showAutoImport()
	{
	     top.showDialog(window,{
	        'title': '一键导入', 
	        'url': "/system/site/column/news/wordsampledown_auto.jsp",
	        'arguments':new Array(window),
	        'callbackFun':function(returnVal)
	            {
	                if(returnVal){
	                    setTimeout(ueditroImportWord,1);
	                }
	            },
	        'width': '400',
	        'height': '150'
	   });
	}
	function checkTitleRepeat(treeid,owner,obj)
	{
		var bea = false;
		var info = '';
		var line = 0;
		var width = 0;
		var heigth = 0;
		var maxcount = 30;
		DWREngine.setAsync(false);
		TitleCheckDWR.titleRepeatCheck(document.getElementById("wbnewsid").value,treeid,owner,obj.value,function(data){
		if(data>0){
			bea = true;
			line++;
		}
		});
		var targetcolums = "";
	    try
	    {
	        targetcolums = document.getElementById('deliverinfo').contentWindow.getselectvalues();
	    }
	    catch(e)
	    {
	    }
		TitleCheckDWR.targetTitleRepeatCheck(document.getElementById("wbnewsid").value,targetcolums,owner,obj.value,function(data){
			var json = eval('(' + data + ')');
			if(json.result>0){
				if(line>0||json.result>1)
				{
					heigth++;
					width = 16;
					info += '<span>当前标题与以下栏目文章标题重复：</span>';
					if(line>0)
					{
						heigth++;
						info += '<span>'+line+'.当前栏目。</span>';
					}
					for(var i = 0;i<json.message.length;i++)
					{
						bea = true;
						line++;
						heigth++;
						info += '<span>'+(line)+'.'+json.message[i]+'。</span>';
						if((json.message[i].length+3)>width)
						{
							width = json.message[i].length+3;
							if(width>maxcount){
								heigth++;
								width = maxcount;
							}
						}
					}
				}else{
					bea = true;
					heigth++;
					info = '<span>当前标题与'+json.message[0]+'文章标题重复！</span>';
					if((json.message[0].length+12)>width)
					{
						width = json.message[0].length+12;
						if(width>maxcount){
							heigth++;
							width = maxcount;
						}
					}
				}
				
			}else{
				if(line>0)
				{
					heigth++;
					width = 16;
					info = '本栏目已存在相同标题的文章！';
				}
			}
		});
		DWREngine.setAsync(true);
		var left = getLeft(obj)+obj.offsetWidth+2;
		var top = getTop(obj);
		if(bea)
		{
			//showRepeatInfo(info);
			hiddenTip('savenewsdiv');
			showTip('savenewsdiv','提示',info,5,true,"center");
		}
	}
	//获取元素的纵坐标
	function getTop(e){
		var offset=e.offsetTop;
		if(e.offsetParent!=null) offset+=getTop(e.offsetParent);
			return offset;
	}
	//获取元素的横坐标
	function getLeft(e){
		var offset=e.offsetLeft;
		if(e.offsetParent!=null) offset+=getLeft(e.offsetParent);
			return offset;
	}
	var subpages = new Array();
	var subpages_m = new Array();//手机版分页数据

	var wbcontenttitle = "";
	//正文的分页标题
	window.wbfirstpagetitle = "";
	var attachtablehtml = '';

	var wbextendhtml = "";


	var ueditor;
	function onloadfunction()
	{
		ueditor = new baidu.editor.ui.Editor();
		ueditor.render("webbereditor");
		ueditor.addListener("firstpageready",function(){setTimeout("init()",10);})
		//Firefox、Opera
	    document.onkeypress=banBackSpace;
	    //IE、Chrome
	    document.onkeydown=banBackSpace;
		window.onresize = function(){
			resize();
		}
	}
	window.getTitlePageHTML =  function getTitlePageHTML()
	{
		var html = '<table>'+
						'<tr>'+
							'<td width=40><span class="titlenamespan"><font color="ff6600">* </font>标　　题</span></td>'+
							'<td colspan=2 width="100%"><input type="text" name="wbtitle" class="title" id="wbtitle" style="height:26px;" oninput="statistickeyword();statisticsnums(\'wbtitle\',\'wbtitlelength\')"  onpropertychange="statistickeyword();statisticsnums(\'wbtitle\',\'wbtitlelength\')" onblur="checkTitleRepeat(\'1019\',\'1378599958\',this)" value="" style="" maxlength=255  ><span class="cccfontcolor" id="wbtitlelength">0字</span><img src="/static/images/ico_08.gif"  align="absmiddle" id="bold" onclick="setBold()" class="bottonup"><img src="/static/images/ico_07.gif" align="absmiddle" id="italic" onclick="setItalic()" class="bottonup"><img src="/static/images/ico_06.gif" align="absmiddle" id="fontcolor" onclick="setColor()" class="bottonup"><img src="/static/images/ico_05.gif" style="margin-left:5px" align="absmiddle" onclick="canelTitleStyle()" title="取消标题所有样式"></td>'+
						'</tr>'+
						'<tr>'+
							'<td>&nbsp</td>'+
							'<td colspan=2><input type="checkbox" '+(wbcontenttitle==""?'':'checked')+' style="vertical-align:middle;" onclick="settittleshow(this,\'contenttitletr\',\'wbcontenttitle\')" id="showcontenttitlecheckbox"><label for="showcontenttitlecheckbox" class="titleforcheckbox cccfontcolor">内容标题</label><input type="checkbox" id="showshorttitlecheckbox"  onclick="settittleshow(this,\'shorttitletr\',\'wbshorttitle\')" style="vertical-align:middle;"><label for="showshorttitlecheckbox" class="titleforcheckbox cccfontcolor">短标题</label><input type="checkbox" id="showsubtitlecheckbox"   onclick="settittleshow(this,\'subtitletr\',\'wbsubtitle\')" style="vertical-align:middle;"><label for="showsubtitlecheckbox" class="titleforcheckbox cccfontcolor">副标题</label><input type="checkbox" id="showforwardtitlecheckbox" onclick="settittleshow(this,\'forwardtitletr\',\'wbforwardtitle\')"  style="vertical-align:middle;"><label for="showforwardtitlecheckbox" class="titleforcheckbox cccfontcolor">引题</label></td>'+
						'</tr>'+
						'<tr id="contenttitletr">'+
							'<td><span class="titlenamespan">　内容标题</span></td>'+
							'<td colspan=2><textarea style="display:none" id="wbcontenttitle" name="wbcontenttitle">'+wbcontenttitle+'</textarea><iframe  id="contentwebberedit" name="contentwebberedit"  src="contenttitleeditor.html" align=left frameborder="0" scrolling="no"  ></iframe></td>'+
						'</tr>'+
						'<tr id="shorttitletr" style="display:none" >'+
							'<td><span class="titlenamespan ">　短 标 题</span></td>'+
							'<td colspan=2><input type="text" name="wbshorttitle" class="input_css title" id="wbshorttitle"  value="" style="width:87.6%" maxlength=255  ></td>'+
						'</tr>'+
						'<tr id="subtitletr" style="display:none" >'+
							'<td><span class="titlenamespan">　副 标 题</span></td>'+
							'<td colspan=2><input type="text" name="wbsubtitle" class="input_css title" style="width:87.6%" id="wbsubtitle" value="" maxlength=255 ></td>'+
						'</tr >'+
						'<tr id="forwardtitletr" style="display:none" >'+
							'<td><span class="titlenamespan">　引　　题</span></td>'+
							'<td colspan=2><input type="text" name="wbforwardtitle" class="input_css title" id="wbforwardtitle" value="" style="width:87.6%" maxlength=255  ></td>'+
						'</tr>'+
						'<tr>'+
							'<td><span class="titlenamespan" >　作　　者</span></td>'+
							'<td colspan=2><input type="text" name="wbauthor" class="input_css title" id="wbauthor" style="width:10%;" value=""  maxlength=100  ><span class="titlenamespan" style="margin-left:10px;vertical-align:middle;line-height:25px;">编　辑</span><input type=text name="wbeditor" id="wbeditor" maxlength=100 class="input_css title"  style="width:10%;" value="测试用户2" ><span style="margin-left:10px;vertical-align:middle;line-height:25px;" class="titlenamespan">来　源</span><input type=text name="wbsourcename" id="wbsourcename" maxlength=30 class="input_css title" style="width:10%;" value=""><span class="cccfontcolor" style="margin-left:10px;cursor:pointer;line-height:25px;" onclick="selectSource();">【<span class="titlespanforhover">选择来源</span>】</span></td>'+
						'</tr>'+
						'<tr style="display:none" class="title-for-hide">'+
							'<td><span class="titlenamespan" >　跳转链接</span></td>'+
							'<td width="70%"><input type=text name="wblinkurl" id="wblinkurl" maxlength=255 class="input_css title"  style="width:70%" disabled  value=""><input type="checkbox" id="selectwblinkurlcheckbox"  style="vertical-align:middle"><span style="vertical-align:middle;cursor:pointer"  id="selectwblinurlspan" class="cccfontcolor"> 【<span id="linkurladdspan" >添加</span>】</span></td>'+
							'<td width="100%" rowspan=5 ><div   style="width:177px;height:200px;"><div id="titlepicwrapper" style="width:177px;height:177px;background-image:url(/system/images/no_qdt.png)"><div id="titlepicpreviewwrapper"><table width="100%" height="100%"><tr><td align="center" valign="middle"><img id="titlepicpreview" style="display:none" src="/system/resource/images/loading.gif" onload="titlepiconload(this);"></td></tr></table></div></div><div style="font-size:14px;text-align:center;font-weight:bold;margin-top:5px"><span class="titlenamespan">标题图</span><span style="font-size:12px;color:rgb(0,0,255);text-decoration:underline;cursor:pointer;" id="pictitleoption" onclick="showtitlepicoption()">设置</span></div><input type=text name="wbpicurl" id="wbpicurl" class="editText"  style="display:none;width:150px;color:gray;cursor:default" value="" readonly></div></td>'+

						'</tr >'+
						'<tr  style="display:none" class="title-for-hide">'+
							'<td><span class="titlenamespan">　标　　签</span></td>'+
							'<td><input type="text" name="wbnewstagname" id="wbnewstagname" class="input_css" style="width:70%;color:#ccc"  title="标签是文章的另一种分类,系统可以按照标签提取文章;在文章标签管理中维护"   readonly="readonly" value="请在右侧选择" ><span onclick="selectnewstag();" style="cursor:pointer" class="cccfontcolor">【<span class="titlespanforhover">选择标签</span>】</span></td>'+
						'</tr>'+
						
						'<tr  style="display:none" class="title-for-hide">'+
							'<td><span class="titlenamespan"><font color="ff6600">* </font>关 键 字</span></td>'+
							'<td><input type=text name="wbkeyword" id="wbkeyword" readonly  value="" class="input_css title" style="color:#ccc;width:70%" title="即关键字，可以通过关键字获取相关文章，也可以通过关键字进行搜索;可以获取标题中的词组作为关键字，也可手动填写"  maxlength=255 ><input style="vertical-align:middle" type="checkbox" checked id="autofillkeywordcheckbox" onclick="setautofillkeyword(this)"><label for="autofillkeywordcheckbox" style="vertical-align:middle" class="cccfontcolor">自动提取</label></td>'+
						'</tr>'+
						'<tr style="display:none" class="title-for-hide"> '+
						
							'<td><span class="titlenamespan" ><font color="ff6600">* </font>内容摘要</span></td>'+
							'<td><textarea  name="wbsummary" id="wbsummary" readonly class="title"  style="color:#ccc;width:425px;height:80px;border:#d2eec6 1px solid;font-size:12px;" ></textarea><input style="vertical-align:middle" type="checkbox" checked onclick="setautofillsummary(this)" id="autofillsummarycheckbox"><label for="autofillsummarycheckbox" style="vertical-align:middle" class="cccfontcolor">自动提取</label></td>'+
						'</tr>'+
						'<tr style="display:none" class="title-for-hide">'+
							'<td><span class="titlenamespan">　标题视频</span></td>'+
							'<td><input type=text name="wbvideourl" id="wbvideourl" class="input_css"  style="width:70%;color:#ccc" value="请在右侧选择" readonly><span style="cursor:pointer" id="titlevideooption" onclick="showtitlevideoopt()"   class="cccfontcolor">【<span class="titlespanforhover">选择视频</span>】</span></td>'+
						'</tr>';
		if(wbextendhtml!="")
		{
		    html +=     '<tr>'+
		                    '<td><span class="titlenamespan">　扩展字段</span></td>'+
		                    '<td colspan=2><table id="extable" border=0 cellpadding=0 cellspacing=2 style="margin-left:-2px">'+wbextendhtml+'</table></td>'+
		                '</tr>';
		}
		html +=				'<tr height="0px" id=trForHeight><td><td></tr><tr>'+
							'<td vAlign="top"><span style="line-height:20px;" class="titlenamespan">　附件管理</span></td>'+
							'<td colspan=2><table width="100%" style="margin-left:-3px;"><tr> <td style="font-size:14px">当前附件 <span id="filenums">0</span> 个&nbsp&nbsp<span style="cursor:pointer;color:#ff8000" onclick="openUeditorAttachment()">【点击上传】</span>&nbsp&nbsp<span  style="cursor:pointer;color:#ff8000" onclick="selectattach(0,1378599958)">【云文件库】</span></td></tr> <tr><td><div style="width:100%;height:100%;overflow:auto;margin-left:-7px;"><table width=100% height=100% cellpadding=2 cellspacing=2 border=0 id="filelist" ></table></div> </td></tr></table></td>'+
						'</tr>'+
				   '</table>';
		return html;
	}
})(window);