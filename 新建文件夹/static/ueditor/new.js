(function(window, undefined) {
    function doadd(o)
    {
        var filepath = o.value;

        //判断是否重复
        var selectfiles = getItemArray("selectfile");
        for(i = 0; i < selectfiles.length; i++)
        {
            var selectfile = selectfiles[i];

            if(selectfile == o)
                continue;
            if(selectfile.value == filepath)
            {
                top.showAlert(window,"文件重复");
                o.outerHTML = o.outerHTML;
                return;
            }
        }

        var index = filepath.lastIndexOf("\\");
        var filename=filepath.substr(index + 1);

        var index = filename.lastIndexOf(".");
        var filetitle = filename.substring(0, index);


        //判断是否重复
        var filenames= getItemArray("filename");
        var count = 0;
        for(i = 0; i < filenames.length; i++)
        {
            if(filenames[i].value == filename)
            {
                top.showAlert(window,"文件名重复");
                o.outerHTML = o.outerHTML;
                return;
            }
        }

        //判断是否和已上传的文件重复
        var cnfilenames= getItemArray("cnname");
        var count = 0;
        for(i = 0; i < cnfilenames.length; i++)
        {
            if(cnfilenames[i].value == filename)
            {
                top.showAlert(window,"文件名重复");
                o.outerHTML = o.outerHTML;
                return;
            }
        }

        var s = o.parentNode;
        o = s.removeChild(o);
        s.innerHTML = o.outerHTML;


        var tb = document.getElementById("filelist")
        var tr = tb.insertRow(-1);

        tr.id="filenum"+file_Nums;
        var td1 = tr.insertCell(-1);

       // td1.noWrap = true;
        var isup="";
        var isdown="";
        td1.innerHTML = "<input type='hidden' name='newfileorder' value='"+tr.rowIndex+"'>"+
                        "<img src='/system/images/attach.gif'  align='absmiddle'>"+filename +
                        "<input type='hidden' name='filename' value='" + filename + "'>"+
                        "<img src='/system/images/up.gif'  align='absmiddle' title='上移'  style='cursor:pointer'  onclick=\"upAttach(this.parentNode.parentNode)\">"+
                        "<img src='/system/images/down.gif'  align='absmiddle' title='下移'  style='cursor:pointer' onclick=\"downAttach(this.parentNode.parentNode)\">"+
                        "<img src='/system/images/cross1.gif'  align='absmiddle' title='删除' onclick=\"removeAttachment(this,'','filenum'+"+file_Nums+")\" style='cursor:pointer'>";
        o.className="filehide";
        o = td1.appendChild(o);
        //tr.scrollIntoView(false);
        file_Nums++;
        $("#filenums").html(file_Nums);
        freshAttachOrder();
    }

    function downAttach(o)
    {
        var tr = o.parentNode.parentNode.parentNode;
        var tb = document.getElementById("filelist");
        if(tr.rowIndex + 1 == tb.rows.length)
            return;
        tb.moveRow(tr.rowIndex, tr.rowIndex + 1);
        freshAttachOrder();
        o.style.color = "#9a9a9c";
        o.parentNode.style.display = "none";
    }

    function upAttach(o)
    {
        var tr = o.parentNode.parentNode.parentNode;
        if(tr.rowIndex == 0)
        {
            return;
        }
        var tb = document.getElementById("filelist");
        tb.moveRow(tr.rowIndex, tr.rowIndex-1);
        freshAttachOrder();
        o.style.color = "#9a9a9c";
        o.parentNode.style.display = "none";
    }

    function on_upattach_mouseover(o)
    {
        if(o.parentNode.parentNode.parentNode.rowIndex == 0)
        {
            return;
        }
        o.style.color = "#000000";
    }

    function on_downattach_mouseover(o)
    {
        var tb = document.getElementById("filelist");
        if(o.parentNode.parentNode.parentNode.rowIndex + 1 == tb.rows.length)
        {
            return;
        }
        o.style.color = "#000000";
    }
    function freshAttachOrder()
    {
        var tb = document.getElementById("filelist");
        if(tb.rows.length>0)
        {
            for(var i=0;i<tb.rows.length;i++)
            {
                if(tb.rows[i].cells[0])
                {
                    tb.rows[i].cells[0].children[0].value=i;
                }   
            }
        }
    }

    function removeAttachment(o,newsfileid,randomname)
    {
        top.showConfirm(window,"删除附件列表及正文中的附件",function(r){
            if(r)
            {
                var tr = o.parentNode.parentNode.parentNode;
                try{
                    tr.removeNode(true);
                }catch(e){
                    $(tr).remove();
                }
                var delfile= $('#deldownload');
                if(newsfileid=="")
                {
                    removeContentAttach(randomname);
                }
                else
                {
                   delfile.val(delfile.val()+newsfileid+";");
                   //对于本地上传的附件，把他从adddownload中删掉
                   var adddownload = $("#adddownload").val();
                   var ids = adddownload.split(";");
                   var temp = "";
                   for(var i=0;i<ids.length;++i)
                   {
                        if(ids[i]!=newsfileid)
                        {
                            temp += ids[i]+";";
                        }
                   }
                   $("#adddownload").val(temp);

                   removeContentAttach(randomname);
                }
                file_Nums--;
                $("#filenums").html(file_Nums);
            }
        });
        
    }

    function getElementsByClassName(oParent, sClass)
    {
            var aEle=oParent.getElementsByTagName('*');
            var aResult=[];
            var re=new RegExp('\\b'+sClass+'\\b', 'i');
            var i=0;
            
            for(i=0;i<aEle.length;i++)
            {
                    if(re.test(aEle[i].className))
                    {
                            aResult.push(aEle[i]);
                    }
            }
            
            return aResult;
    }

    //删除正文中的附件
    function removeContentAttach(randomname,ismobile)
    {
            var htmlElement = getElementsByClassName(document,"mainiframe");//document.getElementsByName("ueditor_subcontent");//getIFrameDOM("baidu_editor_0");
            for(var x=0;x<htmlElement.length;x++)
            {
                var doc = htmlElement[x].contentWindow.document;
                //获取正文中所有span 
                var attachs = doc.getElementsByTagName("span");
                for(var i=attachs.length-1;i>=0;i--)
                {
                	var spanObj = attachs[i];
                	if(spanObj.getAttribute("retain") =="true" && spanObj.id==randomname)
                	{
                		/*var childs = spanObj.childNodes;
                    	//获取span的每一个子
                    	for(var j=childs.length-1;j>=0;j--)
                        {
                    		var tmpObj = childs[j];
                    		if(!!tmpObj)
                    		{
                    			//如果子节点是img 或者 a 并且是附件链接的样式   删除
                        		if(tmpObj.nodeName.toUpperCase() =="A" && (tmpObj.href=="javascript:;" || tmpObj.href.indexOf("/system/_content/download.jsp") != -1))
                        		{
                        			spanObj.removeChild(tmpObj);
                        		}else if(tmpObj.nodeName.toUpperCase()=="IMG" && tmpObj.src.indexOf("/system/resource/images/fileTypeImages") != -1)
                        		{
                        			spanObj.removeChild(tmpObj);
                        		}
                    		}
                        }*/
                        //Wzq 20150708 直接删除span自身和子
                        try{
                            spanObj.removeNode(true);
                        }catch(e){
                            $(spanObj).remove();
                        }
                	}
                }
        }
    }

    function removeNewsfile(o,wbnewsfileid,v,type)
    {
    	if(type=="media")
    	{
    		var tr = o.parentNode.parentNode;
    		var tb = tr.parentNode;
    	    tb.removeChild(tr);

    	    var delfile= $('#deletenewsmediafiles');
    	    if(wbnewsfileid=="todo")
    	    {
    	    	var s = removeFromCommaJoinedText(v,$("#newsmediafiles").val());
    	    	$("#newsmediafiles").val(s);

    	    	var name = getRandomName(v.split("|")[0]);
    	    	var newsfile = getIFrameDOM("baidu_editor_0").getElementById(name);
    	        if(newsfile)
    	        {
    	     	   var parent = newsfile.parentNode;
    	     	   parent.removeChild(newsfile);
    	        }
    	    }
    	    else
    	    {
    	       delfile.val(delfile.val()+wbnewsfileid+";");
    	       var name = getRandomName(v);
    	       var newsfile = getIFrameDOM("baidu_editor_0").getElementById(name);
    	       if(newsfile)
    	       {
    	    	   var parent = newsfile.parentNode;
    	     	   parent.removeChild(newsfile);
    	       }

    	    }
    	    media_Nums--;
    	    $("#videonums").html(media_Nums);

    	}
    	else if(type=="image")
    	{
    		var tr = o.parentNode.parentNode;
    		var tb = tr.parentNode;
    	    tb.removeChild(tr);

    	    var delfile= $('#deletenewsimgfiles');
    	    if(wbnewsfileid=="todo")
    	    {
    	    	var s = removeFromCommaJoinedText(v,$("#newsimgfiles").val());
    	    	$("#newsimgfiles").val(s);

    	    	var name = getRandomName(v.split("|")[0]);
    	    	var newsfile = getIFrameDOM("baidu_editor_0").getElementById(name);
    	        if(newsfile)
    	        {
    	        	var parent = newsfile.parentNode;
    	        	var PN = newsfile.parentNode.parentNode.parentNode.parentNode;
    	     	   	if(PN.tagName.toLowerCase() =="table")
    	     	   	{
    	     	   		var PPN = PN.parentNode;
    	     	   		PPN.removeChild(PN);
    	     		}else
    	     		{
    		     	   	parent.removeChild(newsfile);
    	     		}
    	        }
    	    }
    	    else
    	    {
    	       delfile.val(delfile.val()+wbnewsfileid+";");
    	       var name = getRandomName(v);
    	       var newsfile = getIFrameDOM("baidu_editor_0").getElementById(name);
    	       if(newsfile)
    	       {
    	    	   	var parent = newsfile.parentNode;
    	    	   	var PN = newsfile.parentNode.parentNode.parentNode.parentNode;
    	     	   	if(PN.tagName.toLowerCase() =="table")
    	     	   	{
    	     	   		var PPN = PN.parentNode;
    	     	   		PPN.removeChild(PN);
    	     		}else
    	     		{
    		     	   	parent.removeChild(newsfile);
    	     		}
    	       }

    	    }
    	    image_Nums--;
    	    $("#picnums").html(image_Nums);
    	}

    }

    function getRandomName(str)
    {
    	var s1 = str.split("/");
    	var s2 = s1[s1.length-1];
    	var s3 = s2.split(".");
    	var s4 = s3[0];
    	return s4;
    }
    //从container中删除；分割的value部分
    function removeFromCommaJoinedText(value, container)
    {
        if (value.length == 0)
            return '';


        container = container.replace(/^;/, '').replace(/;$/, '');

        if (container == value)
        {
            return '';
        }

        var sArray = container.split(';');
        for (var i = sArray.length - 1; i >= 0; --i)
        {
            if (sArray[i] == value)
                sArray[i] = undefined;
        }

        var result = sArray.join(';');
        //因为undefined会连接成;;所以要将;;换成;
        result = result.replace(/;;/,';');

        return result;
    }

    function selectattach(wbnewsid)
    {
        	var owner=$("#owner").val();
        	if($("#ownername").val()=="")
        	{
        	    top.showAlert(window,"请选择文章发布位置！");
        	    return;
        	}
        	var urls ="/system/userfiles/selectfile.jsp?issharelib=1&owner="+owner+"&newsid="+wbnewsid;
           top.showDialog(window,{
                'title': '选择文件', 
                'url': urls,
                'arguments':new Array(window),
                'callbackFun':function(arr)
                    {
                        	if(arr)
                        	{
                                var files=arr.split(";");
                                for(var i=0;i<files.length;i++)
                                {
                                    if(files[i]=="")
                                    {
                                        continue;
                                    }
                                    var temp=files[i].split("|");
                            	       var tb = document.getElementById("filelist");
                                    var tr = tb.insertRow(-1);
                                    tr.id="filenum"+file_Nums;
                                    var td1 = tr.insertCell(-1);
                                    var temp1 = temp[0].split("/");
                                	   var temp2 = temp1[temp1.length-1].split(".");
                                	   var randomname = getrandomname(temp2[0]);//文件名，用于删除操作
                                    td1.innerHTML = "<input type='hidden' name='libfileorder' value='" + tr.rowIndex + "'>"+
                                                "<img src='/system/images/attach.gif' style='cursor:default'  align='absmiddle'><span  style='font-size:12px'>"+temp[1] +temp[2]+"</span>"+
                                                "<input type='hidden' name='libfilename' value='" + temp[1] + "'>"+
                                                "<input type='hidden' name='libfilepath' value='" + temp[0] + "'>"+
                                                "<input type='hidden' name='libfileext' value='" + temp[2] + "'>"+
                    							"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
                    							"<span style='display:none;'>"+
                    							"<span  align='absmiddle' title='删除' onclick=\"removeAttachment(this,'','"+randomname+"')\" style='cursor:pointer;color:#9a9a9c' onmouseover='this.style.color=\"#cc0001\"' onmouseout='this.style.color=\"#9a9a9c\"'>删除</span>&nbsp&nbsp"+
                    							"<span  align='absmiddle' title='插入正文' style='cursor:pointer;color:#9a9a9c' onmouseover='this.style.color=\"#019a01\"' onmouseout='this.style.color=\"#9a9a9c\"'  onclick='insertAttachmentBBCode(\""+temp[2]+"\",\""+temp[1]+temp[2]+"\",\""+temp[0]+"\")'>插入正文</span>&nbsp&nbsp"+
                    							"<span align='absmiddle' title='上移' style='cursor:pointer;color:#9a9a9c' onmouseover='on_upattach_mouseover(this)' onmouseout='this.style.color=\"#9a9a9c\"' onclick='upAttach(this)'>↑</span>&nbsp&nbsp"+
                    							"<span  align='absmiddle' title='下移' style='cursor:pointer;color:#9a9a9c' onmouseover='on_downattach_mouseover(this)' onmouseout='this.style.color=\"#9a9a9c\"' onclick='downAttach(this)'>↓</span>"+
                    							"</span>";
                        			    td1.onmouseover= function () {
                                           this.lastChild.style.display = "";
                                    };
                                    td1.onmouseout= function () {
                                          this.lastChild.style.display = "none";
                                    };
                                    file_Nums++;
                                }
                                $("#filenums").html(file_Nums);
                                freshAttachOrder();
                        	}
                    },
                'width': '840',
                'height': '540' 
           });     	
        
    }
    //从附件的文件库路径得到随机名
    function getrandomname(originalpath)
    {
        var a1 = originalpath.split(".");
        var s1 = a1[0];
        var a2 = s1.split("/");
        var s2 = a2[a2.length-1];
        return s2;
    }

    function selectpicurl(wbnewsid)
    {
    	var owner=document.getElementById("owner").value;
    	var urls ="/system/userfiles/selectfile.jsp?filetype=image&issharelib=1&owner="+owner+"&newsid="+wbnewsid;
    	top.showDialog(window,{
                'title': '选择图片', 
                'url': urls,
                'arguments':new Array(window),
                'callbackFun':function(arr)
                    {
                          if(arr)
                        	{
                                var temp=arr.split("|");
                                var picSrc = temp[0];
                                document.getElementById("wbpicurl").value=picSrc;
                                if(picSrc!="")
                                {
                                    new VsbPreloadImg(picSrc,"titlepicpreview", ontitle_imgload);     
                                }
                        	}
                    },
                'width': '840',
                'height': '540' 
           });
    }


    function myReplace(sourcestr,oldstr,newstr)
    {
        var temp=sourcestr.split(oldstr);
        var laststr="";
        if(temp.length==2)
        {
            laststr=temp[0]+newstr+temp[1];
            return laststr;
        }
        return sourcestr
    }

    //标题图预加载
    function ontitle_imgload(img, imgid)
    {
    	img.showImg(document.getElementById(imgid), 150, 150, false, false);
    	document.getElementById("titlepicpreviewwrapper").style.backgroundColor="#ffffff";   
    	document.getElementById(imgid).style.display="";  
    }

    function titlepiconload(img)
    {
        img.onload="";
        var db_imgSrc = document.getElementById("wbpicurl").value;
        if("" != db_imgSrc)
        {
            if(db_imgSrc.indexOf("/_mediafile")!=-1)
            {
                //将串中的$ {ownername}替换为正确的ownerName
                db_imgSrc = myReplace(db_imgSrc,"$"+"{ownername}",document.getElementById("ownername").value);
            }else if(db_imgSrc.indexOf("/_vsl/")!=-1)
            {
                db_imgSrc
            }
            else if(db_imgSrc.indexOf("/system/_owners/")== 0)//替换为正确的ownerName
            {
                db_imgSrc = "/system/_owners/"+document.getElementById("ownername").value+"/_webprj"+db_imgSrc.substring(db_imgSrc.indexOf("_webprj")+"_webprj".length,db_imgSrc.length);
            }
             else if(db_imgSrc.indexOf("/system/_owners/")!= 0){// /images/.....的情况
                db_imgSrc = "/system/_owners/"+document.getElementById("ownername").value+"/_webprj"+ db_imgSrc;
            }
            new VsbPreloadImg(db_imgSrc, "titlepicpreview", ontitle_imgload);  
        }
    }

    var timeOutID=undefined;
    function load(formatid,treeid,wbnewsid,owner)
    {
        setTimeout("loadedit('"+formatid+"','"+formatid+"')",10);
        NewsDwr.getNewsPreOrNextPage(newsposition,document.getElementById("wbnewsid").value,document.getElementById("owner").value,setButtonClick);
    }

    function setButtonClick(data)
    {
        if(document.getElementById("vsb_prepageurl"))
        {
            document.getElementById("vsb_prepageurl").setAttribute("frontnewsid",data.frontnewsid);
            document.getElementById("vsb_prepageurl").setAttribute("frontisdiagrams",data.frontisdiagrams);
            document.getElementById("vsb_prepageurl").setAttribute("prepageurl",data.prepageurl);
            document.getElementById("vsb_prepageurl").disabled = (data.frontnewsid=="");
            
        }
        if(document.getElementById("vsb_nextpageurl"))
        {
            document.getElementById("vsb_nextpageurl").setAttribute("backnewsid",data.backnewsid);
            document.getElementById("vsb_nextpageurl").setAttribute("backisdiagrams",data.backisdiagrams);
            document.getElementById("vsb_nextpageurl").setAttribute("nextpageurl",data.nextpageurl);
            document.getElementById("vsb_nextpageurl").disabled = (data.backnewsid=="");
        }
    }
    function loadedit(formatid)
    {
        if($("#cssfile").val()!="")
        {
        	setcssfile($("#cssfile").val());
            if(formatid>1)
            {
                setcontentid($("#wbformat").val());
            }
        }
    }
    function getAttrFromCookie(key)
    {
        var value_c;
        var arrCookie = document.cookie.split(";"); 
        for(var i = 0;i < arrCookie.length; i++){ 
            var arr = arrCookie[i].split("="); 
            //找到名称为userId的cookie，并返回它的值 
            if(key == arr[0]){ 
                value_c = arr[1];
                break; 
            } 
        }
        return  value_c;
    }
    function noremind()
    {
        hiddenTip("div_openTip");
        //记录cookie
        document.cookie="noremind=1"; 
    }
    function setContenttitle()
    {
        var contentEditor = document.getElementById("contentwebberedit").contentWindow.editor1;
        var str = contentEditor.getContent();
        var tempspan=document.createElement("SPAN");
        tempspan.innerHTML=str;
        str =  (typeof tempspan.textContent == "string") ?  tempspan.textContent : tempspan.innerText;
        str=trim(str);
        if(str == "")
        {
            document.getElementById("wbcontenttitle").value="";
        }else
        {
            document.getElementById("wbcontenttitle").value=contentEditor.getContent();
        }

    }

    function setSaveTimer(treeid)
    {
        //清除之前的setTimeout任务
        if(timeOutID!=undefined)
        {
            clearTimeout(timeOutID);
        }
        var vsbAutoSaveMin = ueditor.options['vsbAutoSaveMin'] || 1;
        timeOutID=setTimeout("saveNews("+treeid+")",1000*60*vsbAutoSaveMin);
    }
    //显示提示信息

    var _timer;
    function showTip(divid,ttitle,content,time,isShowTime,text_align){
    	if(content.length>80)
        {
            //content = content.substr(0,80)+"......";
        }
    	
        var divObj = $("#"+divid);
        //先清空
        divObj.find("#msgContent").html('');
        
        divObj.find("#messageTitle").html(ttitle);
        if(isShowTime)
        {
            divObj.find("#msgContent").html(content+"("+time+")");
        }else{
             divObj.find("#msgContent").html(content);
        }
        divObj.css("left",(document.body.clientWidth-300-250)/2+"px");
        if(text_align)
        {
        	$("#msgContent").css("text-align",text_align);
        }
        divObj.show();
    	var divHeight = divObj.height();
    	$("#savenewsdiv2").height(divHeight);
        if(isShowTime){
            _timer = setInterval(
            function(){
                divObj.find("#msgContent").html(content+"("+(--time)+")");
                if(time==0){
                    clearInterval(_timer);
                    divObj.hide();
                }
            }
            ,1000);
        }
    }
    //隐藏提示信息
    function hiddenTip(divid){
        clearInterval(_timer);
        $('#'+divid).hide();
    }

    function saveNews(treeid)
    {
        if(jsEditorAudit=="false" || ueditor.queryCommandState( 'source' )==1) //源码模式不自动保存草稿
            return ;
        if(!isAutoSave())
        {
            setSaveTimer(treeid);
            return;
        }
    	showTip('savenewsdiv','提示','正在自动保存为草稿...',5,false);

        //暂存、提交、发布按钮这是设为不能使用，避免重复操作
        var savbtnstatus=false;//document.getElementById("tempsavebutton").disabled;
        var subbtnstatus=false;//document.getElementById("sub_button").disabled;
        var pubbtnstatus=false;//document.getElementById("pub_button").disabled;
        var entrystatus=false;

        var obj=document.getElementById("taudit_button");
        if(obj)
        {
            subbtnstatus=obj.disabled;
            obj.disabled=true;
        }

        obj=document.getElementById("tempsavebutton");
        if(obj)
        {
        		savbtnstatus=obj.disabled;
                obj.disabled=true;
        }

        obj=document.getElementById("pub_button");
        if(obj)
        {
        		pubbtnstatus=obj.disabled;
            obj.disabled=true;
    		}

    		obj=document.getElementById("entry_button");
        if(obj)
        {
        		entrystatus=obj.disabled;
            obj.disabled=true;
    		}
        setTimeout("displaybar("+subbtnstatus+","+savbtnstatus+","+pubbtnstatus+","+entrystatus+")",1000*1);
        //curpage ==1 表示为正文  >1表示分页
            var newsobj={wbnewsid:document.getElementById("wbnewsid").value,
                        wbsysuserid:document.getElementById("wbsysuserid").value,
                        wbusername:document.getElementById("wbusername").value,
                        wbtreeid:treeid,
                        wbcontentid:document.getElementById("wbcontentid").value,
                        owner:document.getElementById("owner").value,
                        wbtitle:document.getElementById("wbtitle").value,
                        wbcontent:getUeditorContent(0, true),
                        wbmobilecontent:( isMultiStatediv() && _hasMobilContent )?getUeditorContent(0, true,true):"",
                        wbtitlestyle:document.getElementById("wbtitlestyle").value,
                        wblinkurl:document.getElementById("wblinkurl").value,
                        wbpicurl:document.getElementById("wbpicurl").value,
                        wbvideourl:document.getElementById("wbvideourl").value,
                        wbauthor:document.getElementById("wbauthor").value,
                        wbkeyword:document.getElementById("wbkeyword").value,
                        wbsummary:document.getElementById("wbsummary").value,
                        wbsubtitle:document.getElementById("wbsubtitle").value,
                        wbformat:document.getElementById("wbformat").value,
                        wbweight:document.getElementById("wbweight").value,
                        wbeditor:document.getElementById("wbeditor").value,
                        wbautokeyword:document.getElementById("wbautokeyword").value,
                        wbautosummary:document.getElementById("wbautosummary").value,
                        wbautomobilecontent:document.getElementById("wbautomobilecontent").value,
                        wbmobileformat:document.getElementById("wbmobileformat").value,
                        wbtitlebold:document.getElementById("wbtitlebold").value}
            var subpages= document.getElementsByName("ueditor_subcontent");
            var subpages_m;
            if(isMultiStatediv() && _hasMobilContent)
            {
                subpages_m= document.getElementsByName("ueditor_subcontent_m");    
            }
            var subtitle=document.getElementsByName("wbpagetitle");
            var pagesContent=new Array();
            var pagesContent_m=new Array();
            var pagesTitle=new Array();
            var pagesTitle_m=new Array();
            if(subpages)
            {
                for(var i=1;i<subpages.length;i++)
                {
                    pagesContent[i-1]=getUeditorContent(i, true);
                    if(!isMobileStyle)
                    {
                        pagesTitle[i-1]=subtitle[i].value;    
                    }else{
                        pagesTitle[i-1]="";    
                    }
                }
            }
            if(subpages_m && subpages_m.length>0)
            {
                for(var i=1;i<subpages_m.length;i++)
                {
                    pagesContent_m[i-1]=getUeditorContent(i, true,true);
                    pagesTitle_m[i-1] = "";
                }
            }
            //如果文章状态为-5（草稿），则自动保存文章

            if(document.getElementById("wbauditing").value=="-5")
            {

                if(!checklogin()){
                    return;
                }
                DWREngine.setAsync(false);
                NewsDwr.saveToNews(newsobj,document.getElementById("wbspecialid").value,document.getElementById("wbspecialtypeid").value,function(data){document.getElementById("wbnewsid").value=data[0];document.getElementById("wbuuid").value=data[1];});
                DWREngine.setAsync(true);
                
                //保存分页
                if(subpages)
                {
                    DWREngine.setAsync(false);
                    NewsDwr.saveToNewsPage(pagesContent,pagesTitle,document.getElementById("owner").value,document.getElementById("wbnewsid").value);
                    DWREngine.setAsync(true);
                }
                if(subpages_m && subpages_m.length>0)
                {
                    DWREngine.setAsync(false);
                    NewsDwr.saveToNewsPageMobil(pagesContent_m,pagesTitle_m,document.getElementById("owner").value,document.getElementById("wbnewsid").value);
                    DWREngine.setAsync(true);
                }
                
                //更新当前文章 附件、图片、视频的 wbnewsfile表的wbnewsid
                //草稿的时候，wbnewsfile的wbnewsid=-2,这是不对的
                DWREngine.setAsync(false);
                NewsDwr.updateNewsFilesID(document.getElementById("wbnewsid").value,document.getElementById("owner").value,document.getElementById("adddownload").value);
                //保存从文件库选择的附件
                var attachs=document.getElementsByName("libfilepath");
                var attachsName=document.getElementsByName("libfilename");
                var attachext =document.getElementsByName("libfileext");
                if(attachs)
                {
                    var attjson="[";
                    for(var i=0;i<attachs.length;i++)
                    {
                        //top.showAlert(window,attachs[i].value);  
                        attjson+="{"  
                        var tempattfile="\"path\":\""+attachs[i].value+"\",";
                        var tempattname="\"name\":\""+attachsName[i].value+"\",";
                        var tempattext="\"ext\":\""+attachext[i].value+"\"";
                        attjson=attjson+tempattfile+tempattname+tempattext+"}";
                        if(i<(attachs.length-1))
                        {
                            attjson+=",";
                        }
                    }
                    attjson+="]";
                    NewsDwr.updateNewsFilesJson(document.getElementById("wbnewsid").value,document.getElementById("owner").value,_useraccount,getUeditorContent(0, true),attjson,function(data)
                           {
                                //将修改后的链接放置到页面及编辑器上
                                if(length>0)
                                {
                                    var olddoc = ueditor.document;
                                    for(var i=0;i<data.length-1;i++)
                                    {
                                        var iframes = document.getElementsByName("ueditor_subcontent");
                                        var doc = iframes[i].contentWindow.document;
                                        ueditorswitchtodoc(doc);    
                                        ueditor.setContent(data[i]);
                                    }
                                    ueditorswitchtodoc(olddoc);
                                    //更新附件列表html
                                    $("#filelist").html(data[data.length-1]);
                                    fixHeight();
                                } 
                           });
                }
                DWREngine.setAsync(true);
            }
            //保存为草稿
            newsobj=null;
            newsobj={wbnewsid:document.getElementById("wbnewsid").value,
                    wbsysuserid:document.getElementById("wbsysuserid").value,
                    wbusername:document.getElementById("wbusername").value,
                    wbtreeid:document.getElementById("treeid").value,
                    wbcontentid:document.getElementById("wbcontentid").value,
                    owner:document.getElementById("owner").value,
                    wbtitle:document.getElementById("wbtitle").value,
                    wbcontent:getUeditorContent(0, true),
                    wbmobilecontent:( isMultiStatediv() && _hasMobilContent )?getUeditorContent(0, true,true):"",
                    wbtitlestyle:document.getElementById("wbtitlestyle").value,
                    wblinkurl:document.getElementById("wblinkurl").value,
                    wbpicurl:document.getElementById("wbpicurl").value,
                    wbvideourl:document.getElementById("wbvideourl").value,
                    wbauthor:document.getElementById("wbauthor").value,
                    wbkeyword:document.getElementById("wbkeyword").value,
                    wbsummary:document.getElementById("wbsummary").value,
                    wbsubtitle:document.getElementById("wbsubtitle").value,
                    wbauditing:document.getElementById("wbauditing").value,
                    wbformat:document.getElementById("wbformat").value,
                    wbweight:document.getElementById("wbweight").value,
                    wbuuid:document.getElementById("wbuuid").value,
                    wbautokeyword:document.getElementById("wbautokeyword").value,
                    wbautosummary:document.getElementById("wbautosummary").value,
                    wbautomobilecontent:document.getElementById("wbautomobilecontent").value,
                    wbmobileformat:document.getElementById("wbmobileformat").value,
                    wbeditor:document.getElementById("wbeditor").value}
            var myhistorynewsid=0;
            if(!checklogin()){
                return;
            }
            DWREngine.setAsync(false);
            NewsDwr.saveToDraft(newsobj,function(data){document.getElementById("temphistory").value=data});
            DWREngine.setAsync(true);
            if(subpages)
            {
                DWREngine.setAsync(false);
                NewsDwr.saveToNewsPageDraft(pagesContent,pagesTitle,document.getElementById("owner").value,document.getElementById("temphistory").value);
                DWREngine.setAsync(true);
            }
            if(subpages_m && subpages_m.length>0)
            {
                DWREngine.setAsync(false);
                NewsDwr.saveToNewsPageMobilDraft(pagesContent_m,pagesTitle_m,document.getElementById("owner").value,document.getElementById("temphistory").value);
                DWREngine.setAsync(true);
            }
            //如果不是新增文章，保存草稿记录
            setSaveTimer(treeid);
    }

    function checklogin()
    {
        var returnValue = true;
        $.ajax({url:"checklogin.jsp",
                dataType:'text',
                async:false,
                success:function(msg){
                    if(msg==0)
                    {
                        window.location.href='/system/auth/needlogin.htm';
                        returnValue =  false;
                    }
                }
        });
        return returnValue;
    }

    function displaybar(subbtnstatus,savbtnstatus,pubbtnstatus,entrystatus)
    {
        hiddenTip('savenewsdiv');
        //暂存、提交、发布按钮这是设为能使用
        var tempsavebutton = document.getElementById("tempsavebutton");
        var taudit_button = document.getElementById("taudit_button");
        var pub_button = document.getElementById("pub_button");
        var entry_button = document.getElementById("entry_button");
        if(tempsavebutton)
        {
            if(savbtnstatus){
                tempsavebutton.disabled=savbtnstatus;
            }else{
                tempsavebutton.removeAttribute("disabled");
            }
        }
        if(taudit_button)
        {
            if(subbtnstatus){
                taudit_button.disabled=subbtnstatus;
            }else{
                taudit_button.removeAttribute("disabled");
            }
        }
        if(pub_button)
        {
            if(pubbtnstatus){
                pub_button.disabled=pubbtnstatus;
            }else{
                pub_button.removeAttribute("disabled");
            }
        }
        if(entry_button)
        {
            if(entrystatus){
                entry_button.disabled=entrystatus;
            }else{
                entry_button.removeAttribute("disabled");
            }
        }
    }

    function isAutoSave()
    {
        if(beginAutoSave==false)
        {
            return false;
        }
        //当前为手机版的话  直接返回true
        if(!_isPCEditor)
        {
            return true;
        }
        //新增文章时有标题或正文时，自动保存
        if(document.getElementById("wbauditing").value=="-5")
        {
    		var doc = document.getElementsByName("ueditor_subcontent")[0].contentWindow.document;
        	var content =(typeof  doc.body.textContent == "string") ?   doc.body.textContent : doc.body.innerText;
            var hasMedia=false;
            var hasPic=false;
        	//判断正文中是否有视频
            $("#mediaurls").val("");
            var htmlElement = document.getElementsByName("ueditor_subcontent");//getIFrameDOM("baidu_editor_0");
            for(var i=0;i<htmlElement.length;++i)
            {
                var doc = htmlElement[i].contentWindow.document;
                parseMedia(doc,"/system/_owners/"+document.getElementById("ownername").value+"/_webprj");
               
            }
             var htmlElement_m= document.getElementsByName("ueditor_subcontent_m");//getIFrameDOM("baidu_editor_0");
             for(var i=0;i<htmlElement_m.length;++i)
            {
                var doc = htmlElement_m[i].contentWindow.document;
                parseMedia(doc,"/system/_owners/"+document.getElementById("ownername").value+"/_webprj");
               
            }
        
            if($("#mediaurls").val()!="")
            {
                hasMedia=true;
            }
        	
        	
        	//判断正文中是否有图片
            var obj=document.getElementById("picurls");
            var hobj=document.getElementById("httppicurls");
            obj.value="";
            hobj.value="";
            
            var iframes = document.getElementsByName("ueditor_subcontent");
            var aReturn = [];
            for(var i=0;i<iframes.length;++i)
            {
                var doc = iframes[i].contentWindow.document;
                var imgs = doc.getElementsByTagName("IMG");
                for(var j =0;j<imgs.length;++j)
                {
                    if(imgs[j].src.indexOf("/system/resource/images/fileTypeImages/") == -1)//去掉附件的前导图
                    {
                        aReturn.push(imgs[j]);
                    }
                    
                }
            }
            var str="";
        
            //本地服务器格式
            var serverPath="http://"+document.getElementById("hostname").value;
            if(beginWith(window.location.href,"https://"))
            {
                   serverPath="https://"+document.getElementById("hostname").value; 
            }
            if(document.getElementById("portnumber").value!="80")
            {
                serverPath=serverPath+":"+document.getElementById("portnumber").value;
            }
            serverPath=serverPath.toLowerCase();
        
            for(var i=0;i<aReturn.length;i++)
            {
                var temp=aReturn[i].getAttribute("src");
        
                //判断是否是本地服务器文件
                //var ok= beginWith(temp,serverPath);
                if(beginWith(temp,serverPath+"/_mediafile"))
                {
                    obj.value=obj.value+temp.substring(serverPath.length,temp.length)+";";
                }else if(beginWith(temp,serverPath))
                {
                    var serverImage=serverPath+"/system/_owners/"+document.getElementById("ownername").value+"/_webprj";
                    obj.value=obj.value+temp.substring(serverImage.length,temp.length)+";";
                }else
                {
                    hobj.value=hobj.value+temp+";";
                }
            }    	
        	if(obj.value!=""||hobj.value!="")
            {
                hasPic=true;
            }
        	
        	
    		if(content!=""||hasMedia||hasPic)
            {
                document.getElementById("wbcontent").value = doc.body.innerHTML;
                return true;
            }
            
            if(document.getElementById("wbtitle").value!="")
            {
                return true;
            }

            return false;
        }else
        {
            document.getElementById("wbcontent").value = ueditor.getContent();
            //非新增文章时，正文、标题有改动时自动保存
            //分页也要判断一下
            //编辑器有内容变化时，beginAutoSave自动置为true
            return true;
        }

    }

    function initTitleStyle()
    {
        var styleText=$("#wbtitlestyle").val();
        if(styleText)
        {
        	var a=styleText.split(";");
            if(a.length>0)
            {
                var i;
                for(i=0;i<a.length;i++)
                {
                    if(a[i]!="")
                    {
                        if(beginWith(a[i],"color"))
                        {
                            $("#fontcolor").attr("class","bottondown");
                            $("#wbtitlecolor").val(a[i]);
                            var color = a[i].split(":")[1];
                            $("#wbtitle").css("color",color);
                            $("#bgcolor").css("background-color",color);
                        }else if(beginWith(a[i],"#"))
                        {
                            $("#fontcolor").attr("class","bottondown");
                            $("#wbtitlecolor").val("color:"+a[i]);
                            $("#wbtitle").css("color",a[i]);
                            $("#bgcolor").css("background-color",a[i]);
                        }
                        else if(beginWith(a[i],"font-weight"))
                        {
                            $("#bold").attr("class","bottondown");
                            $("#wbtitlebold").val("font-weight:bold");
                            $("#wbtitle").css("font-weight","bold");

                        }else if(beginWith(a[i],"font-style"))
                        {
                            $("#italic").attr("class","bottondown");
                            $("#wbtitleitalic").val("font-style:italic");
                            $("#wbtitle").css("font-style","italic");
                        }
                    }
                }
            }
        }

    }

    //设置颜色
    function setColor()
    {
        var cn=$("#fontcolor").attr("class");
        if(cn=="bottonup" || cn == "bottonup edui-default")
        {
            top.showDialog(window,{
            	    "title":"选择颜色",
            		"url":"/system/site/element/colorselect.htm",
            		"arguments":$("#wbtitlecolor").val(),
            		"callbackFun":function(rv)
            		{
            			if(rv != undefined && rv != null)
            			{
        			           $("#wbtitlecolor").val(rv+"");
                            if($("#wbtitlecolor").val()!="")
                            {
                                $("#fontcolor").attr("class","bottondown");
                                $("#wbtitlecolor").val("color:"+$("#wbtitlecolor").val());
                            }
                            appTitleStyle();
            			}
            		},
            		"width":300,
        		    "height":215
    	    });
        }else
        {
            top.showDialog(window,{
            	    "title":"选择颜色",
            		"url":"/system/site/element/colorselect.htm",
            		"arguments":$("#wbtitlecolor").val().split(":")[1],
            		"callbackFun":function(rv)
            		{
            			if(rv != undefined && rv != null)
            			{
            			    $("#wbtitlecolor").val(rv+"");
                          if(beginWith($("#wbtitlecolor").val(),"#"))
                          {
                          	$("#wbtitlecolor").val("color:"+$("#wbtitlecolor").val());
                          }
                          appTitleStyle();
            			}
            		},
            		"width":300,
        		    "height":215
    	        });
        }
    }

    function setBold()
    {

        var cn=$("#bold").attr("class");
        if(cn=="bottonup" || cn == "bottonup edui-default")
        {
            $("#bold").attr("class","bottondown");
            $("#wbtitlebold").val("font-weight:bold");
        }else
        {
            $("#bold").attr("class","bottonup");
            $("#wbtitlebold").val("");
        }
        appTitleStyle();
    }

    function setItalic()
    {
        var cn=$("#italic").attr("class");
        if(cn=="bottonup"||cn == "bottonup edui-default")
        {
            $("#italic").attr("class","bottondown");
            $("#wbtitleitalic").val("font-style:italic");
        }else
        {
            $("#italic").attr("class","bottonup");
            $("#wbtitleitalic").val("");
        }
        appTitleStyle();
    }

    function appTitleStyle()
    {
        var str="";
        if($("#wbtitlebold").val()!="")
        {
            str+=$("#wbtitlebold").val()+";";
        	$("#wbtitle").css("font-weight","bold");
        }else{
        	$("#wbtitle").css("font-weight","");
        }

        if($("#wbtitlecolor").val()!="")
        {
            str+=$("#wbtitlecolor").val()+";";
            var color = $("#wbtitlecolor").val().split(":")[1];
            $("#wbtitle").css("color",color);
        }else{
        	$("#wbtitle").css("color","#000000");
        }

        if($("#wbtitleitalic").val()!="")
        {
            str+=$("#wbtitleitalic").val()+";";
            $("#wbtitle").css("font-style","italic");
        }else{
        	$("#wbtitle").css("font-style","");
        }
        $("#wbtitlestyle").val(str);

    }

    function canelTitleStyle()
    {
        $("#fontcolor").attr("class","bottonup");
        $("#bold").attr("class","bottonup");
        $("#italic").attr("class","bottonup");
        $("#wbtitlecolor").val("");
        $("#wbtitlebold").val("");
        $("#wbtitleitalic").val("");
        $("#bgcolor").css("background-color","rgb(0,0,0)");
        appTitleStyle();

    }

    function selText(ob,selectName)
    {
        var o=$(selectName);
        var obj=$(ob);

        obj.value=o.options[o.selectedIndex].text;
        o.style.display="none";
    }


    //设置编辑器宽度（宽屏模式）
    function setEditorWidth(w)
    {
        var oldw;
        oldw=GetCookie('editorWidth');
        if(!isinteger(oldw))
        {
            oldw=600;
        }
        var w=webberedit.setFixWidth(w,oldw);
        if(w==oldw)
        {
            document.getElementById('editorwidth').value=oldw;
            return;
        }
        document.getElementById('editorwidth').value=w;
        SetCookie('editorWidth',w);
    }

    function startStatusCheck()
    {
       var rid=document.getElementById('rid').value;
       updater = new Ajax.PeriodicalUpdater('status','/system/site/column/news/uploadstate.jsp?rid='+rid,{asynchronous:true, frequency:1, method: 'get', onFailure: reportError});
    }
     function reportError(request)
    {
    }

    function showsavemask()
    {
        $("#savemaskiframe")[0].contentWindow.document.body.style.backgroundColor = "black";
        $("#savemask").css("display","block");
    }

    function setsavemastinfo(info)
    {
       $("#auditgifinfo").html(info);
    }

    function hidesavemask()
    {
        $("#savemask").css("display","none");
    }

    function movesavegif (speed){
        var background_style = "url(/system/ueditor/themes/default/images/show_img_f.png) repeat-x";
        var nobackground_style = "#999999";
        var tds = $("#tr_row").find("td");
        var first_index = 0;var last_index = 0;
        var timer = setInterval(
         	function(){
         		if(first_index==0 && last_index<3)
          		{
          			last_index++;
          			for(var i=first_index; i<=last_index;i++)
        	  		{
        	  			tds[i].style.background=background_style;
        	  		}
          		}else if (last_index>=3 && last_index<tds.length-1){
          			first_index++;
          			last_index++;
          			for(var i=first_index; i<=last_index;i++)
        	  		{
        	  			tds[i].style.background=background_style;
        	  		}
        	  		tds[first_index-1].style.background=nobackground_style;
          		}else if(last_index == tds.length-1 && first_index < tds.length-1){
          			first_index++;
          			for(var i=first_index; i<=last_index;i++)
        	  		{
        	  			tds[i].style.background=background_style;
        	  		}
        	  		tds[first_index-1].style.background=nobackground_style;
          		}else if(first_index==tds.length-1){
          			tds[first_index].style.background=nobackground_style;
          			first_index=0;last_index=0;
          		}
         	}, speed);
    }

    function initsavegif (flag){
    	var nobackground_style = "#F2F2F2";
    	if(flag)
    		nobackground_style = "#999999";
        var tds = $("#tr_row").find("td");
    	for(var i=0; i<tds.length;i++)
    	{
    		tds[i].style.background=nobackground_style;
    	}
    }

    function insertDb( vsl, ext, showname, owner, wbnewsid, type)
    {
        NewsDwr.insertNewsFile(vsl,ext,showname,owner,wbnewsid,1,function(data){ document.getElementById("picdownload").value += data+";";} );
    }

    function uploadWordImg()
    {
        //先上传
        getHelper();
        if (!_word_img_list.length || Helper == undefined)
        {
            return;
        }

        //判断是否能上传新的文件
        if(document.getElementById("allowdiscsize").value<=0)
        {
            alert("你可用的磁盘空间已满，word中包含的图片将不会被保存！");
        }
        //添加文件
        for(var i=0;i<_word_img_list.length;i++){
            if(_word_img_list[i]){
                Helper.AddFile(_word_img_list[i]);
            }
        }
        //清空_word_img_list
        _word_img_list=[];
        //上传
        var uploadUrl=   document.getElementById("uploadurl").value;
        var uploadParams=document.getElementById("uploadparams").value;
        uploadParams='{"params":"'+uploadParams+'"}';
        Helper.SetMarkArrayCallback(intoMarktoDB);
        Helper.SetErrorCallback(function(){});
        Helper.SetStateCallback(function(){},function(){},function(params,errorinfo){
            //上传结束回调
            var json = eval("("+params+")");
            var markarray = json.markarray;
            var htmlElement = getElementsByClassName(document,"mainiframe");
            for(var x=0;x<htmlElement.length;x++)
            {
                var doc = htmlElement[x].contentWindow.document;
                var images = baidu.editor.dom.domUtils.getElementsByTagName(doc,"img");
                ueditor.fireEvent('saveScene');
                for (var i = 0,img; img = images[i++];) {
                    var src = img.getAttribute("word_img");
                    if (!src) continue;
                    for (var j = 0,imgobj; imgobj = markarray[j++];) {
                        if (src.indexOf(imgobj.filename.replace(" ","")) != -1) {
                            var imgurl = "/_vsl/" +imgobj.mark;
                            //替换本地路径
                            img.src = imgurl;
                            img.setAttribute("_src", imgurl);  //同时修改"_src"属性
                            baidu.editor.dom.domUtils.removeAttributes(img, ["word_img","style"]);
                            ueditor.fireEvent("selectionchange");
                            //保存文件到文件库
                            DWREngine.setAsync(false);
                            //dwr 保存文章附件
                            insertDb(imgurl,imgobj.fileext,imgobj.filename,parent.document.getElementById("owner").value,parent.document.getElementById("wbnewsid").value,1);
                            DWREngine.setAsync(true);
                            break;
                        }
                    }
                }
                ueditor.fireEvent('saveScene');
            }
        });
        var requesturl="/system/storage/plugin/findmark.jsp";
        //上传
        Helper.UploadSelectFileForCloud(document.location.hostname, document.location.port, requesturl, document.charset, uploadParams);
    }

    function dosave(op)
    {
    	if(ueditor.queryCommandState("source")==1)
    	{
    		top.showAlert(window,"源码编辑状态不可提交！")
    		return;
    	}    
        
        setContenttitle();
        if( document.getElementById("wbcontenttitle").value.length>1000)
        {
            hidesavemask();
            top.showAlert(window,"内容标题最大内容不得超过1000字符！");
            return;
        }
        //检测标题
        var obj=document.getElementById("wbtitle");
        if(ltrim(obj.value)=="")
        {
            hidesavemask();
            obj.focus();
            top.showAlert(window,"请输入标题！");
            return;
        }
        //检测点击次数；	
        var isNAN= /^[0-9]*$/;
        obj =document.getElementById("wbshowtimes");
        if(!isNAN.test(obj.value)||obj.value > 100000000)
        {
            hidesavemask();
            top.showAlert(window,"请输入正确的点击次数（0-100,000,000）!");
            obj.focus();
            return ;
        }

        //检测关键字
        obj=document.getElementById("wbkeyword");
        if(ltrim(obj.value)=="")
        {
            if(!document.getElementById("autofillkeywordcheckbox").checked)
            {
                hidesavemask();
                setExpandEditor(true, false);
                obj.focus();
                top.showAlert(window,"请输入关键字或选择自动提取。");
                return ;
            }
        }
        if(ltrim(obj.value).length>255)
        {
            hidesavemask();
            setExpandEditor(true, false);
            obj.focus();
            top.showAlert(window,"关键字长度不能超过255！");
            return;
        }

        //检测发布日期
        obj = document.getElementById("newdate");
        if(ltrim(obj.value)=="")
        {
            hidesavemask();
            if(obj.style.display != "none")
            {
                obj.focus();
            }
            top.showAlert(window,"请输入发布日期！");
            return;
        }                         

        //检测转向链接
        if(document.getElementById("selectwblinkurlcheckbox").checked)
        {
            if($("#wblinkurl").val()=="")
            {
                hidesavemask();
                setExpandEditor(true, false);
                $("#wblinkurl")[0].focus();
                top.showAlert(window,"请输入或选择转向链接！");
                return;
            }
            obj=document.getElementById("wbsummary");
            if(obj.value.length > 1000)
            {
               hidesavemask();
               setExpandEditor(true, false);
               obj.focus();
               top.showAlert(window,"摘要长度不能超过1000！")
               return;
            }
        }
        else
        {
            //判断资料来源
            obj = document.getElementById("wbsourcename");
            if(ltrim(obj.value)!="")
            {
               /* if(!/^[\u0080-\ufffd\-\w\'\.\s]+$/.test(obj.value))
                {
                    hidesavemask();
                    top.showAlert(window,"资料来源只可以文字、字母、数字、空格、'、.、-与_组成");
                    if(obj.style.display != "none")
                    {
                        obj.focus();
                    }
                    return;
                }*/
                var re = /[&<>\r\n\"\']+/;
                if(obj.value.match(re))
                {
                    hidesavemask();
                    top.showAlert(window,"资料来源中不能包含<、>、&、\"、'、换行符等字符。");
                    if(obj.style.display != "none")
                    {
                        obj.focus();
                    }
                    return;
                }
            }
            
            //检测内容
            if(getUeditorContentLength(0)==0)
            {
                hidesavemask();
    			if(pagenum == 0)
    			{
                    top.showAlert(window,"请输入正文！");
                }
                else
                {
                    top.showAlert(window,"请输入第1页的内容！");
                }
                if(!_isPCEditor)
                {
                    changeEditor();
                }
                focuspage(0, true);
                return;
            }
    	    //检测手机版内容  有手机版  
    	    if(_hasMobilContent)
    	    {
    	        if(getUeditorContentLength(0,true)==0)
                {
                    hidesavemask();
        			if(_pagenum_m == 0)
        			{
                        top.showAlert(window,"请输入手机版正文！");
                    }
                    else
                    {
                        top.showAlert(window,"请输入手机版第1页的内容！");
                    }
                    //切换到手机版
                    if(_isPCEditor)
                    {
                        changeEditor();
                    }
                    focuspage(0, true);
                    return;
                }
    	    }

    		//摘要
    		obj=document.getElementById("wbsummary");
            if(ltrim(obj.value)=="")
            {
                if(document.getElementById("autofillsummarycheckbox").checked)
                {
    			    getSummaryNoAlert(200);
                }
                else
                {
                    hidesavemask();
                    setExpandEditor(true, false);
                    obj.focus();
                    top.showAlert(window,"请输入摘要或选择自动提取。");
                    return false;
                }
            }
            else if(obj.value.length > 1000)
            {
                hidesavemask();
                setExpandEditor(true, false);
                obj.focus();
                top.showAlert(window,"摘要长度不能超过1000！")
                return;
            }

    	    var pages = document.getElementsByName("ueditor_subcontent");
    		//检测分页是否没有内容
    		for(var i = 1; i < pages.length; i++)
    		{
    			if(getUeditorContentLength(i) == 0)
    			{
    			    if(!_isPCEditor)
                    {
                        changeEditor();
                    }
    			    focuspage(i, true);
    			    hidesavemask();
    				top.showAlert(window,"请输入第" + (i+1) + "页的内容\r\n\r\n如果无需此分页则请删除")
    				return;
    			}
    		}
    		//检测手机版分页是否有内容
    		var pages_m = document.getElementsByName("ueditor_subcontent_m");
    		for(var i = 1; i < pages_m.length; i++)
    		{
    			if(getUeditorContentLength(i,true) == 0)
    			{
    			    if(_isPCEditor)
                    {
                        changeEditor();
                    }
    			    focuspage(i, true);
    			    hidesavemask();
    				top.showAlert(window,"请输入手机版第" + (i+1) + "页的内容\r\n\r\n如果无需此分页则请删除")
    				return;
    			}
    		}
    	}

         //弹出确认信息
        var targetcolums = document.getElementById('deliverinfo').contentWindow.getselectvalues();
        if(op=="save")
        {
            top.showConfirm(window,"暂时保存这条文章吗?\r\n\r\n文章发布后才可被浏览",function(r){
                if(r){
                    submitnews(op,targetcolums,pages);
                }
            }); 
        }
        else if(op=="deptsubmit")
        {
            top.showConfirm(window,"提交这条文章吗?\r\n\r\n文章审核通过后可被浏览",function(r){
                if(r){
                    submitnews(op,targetcolums,pages);
                }
            }); 
        }
        else if(op=="submit")
        {
            if(document.getElementById("auditperson")&&document.getElementById("auditperson").value=="0")
            {
                top.showAlert(window,"请选择审核人！");
                return;
            }
            top.showConfirm(window,"提交这条文章吗?\r\n\r\n文章审核通过后可被浏览",function(r){
                if(r){
                    submitnews(op,targetcolums,pages);
                }
            }); 
        }
        else if(op=="publish")
        {
            if(targetcolums)
            {
                top.showConfirm(window,"文章发布时将同时投递至其他地方，确认发布吗？",function(r){
                    if(r){
                        submitnews(op,targetcolums,pages);
                    }
                }); 
            }
            else if(!targetcolums)
            {
                top.showConfirm(window,"发布这条文章？",function(r){
                    if(r){
                        submitnews(op,targetcolums,pages);
                    }
                }); 
            }
        }else if(op=="audit"){
            top.showConfirm(window,"保存修改？",function(r){
                if(r){
                    submitnews(op,targetcolums,pages);
                }
            });
        }
    }

    function submitnews(op,targetcolums,pages)
    {
        //自动提取关键字 如果手动输入后又给勾选了自动提取，视为放弃手动输入内容
        if(document.getElementById("autofillkeywordcheckbox").checked)
        {
            DWREngine.setAsync(false);
    		GBKAnalyzer.parserGBKPhrase(document.getElementById("wbtitle").value,callparserGBKPhrase);
            DWREngine.setAsync(true);
        }

        //显示保存动画
        initsavegif();
        showsavemask();
    	setsavemastinfo("正在检查内容...");
        setTimeout(function()
            {
                dosavecheck1(op, targetcolums);
            },10);
    }

    function dosavecheck1(op, targetcolums)
    {   
        var pages = document.getElementsByName("ueditor_subcontent");
        if(document.getElementById("sensitivewordcheck").checked)
        {
    		//检测敏感字 显示敏感字检查提示
    		setsavemastinfo("正在检测敏感字，请稍候...");
            setTimeout(
                function()
                {
                    dosavecheck2(op, targetcolums, pages);
                },
                10);
        }
        else
        {
            dosavecheck2(op, targetcolums, pages);
        }
    }

    function dosavecheck2(op, targetcolums, pages)
    {   
        //标题敏感字
        if(document.getElementById("sensitivewordcheck").checked)
    	{	    
    		obj=document.getElementById("wbtitle");
    		var returnstr=checkSensitiveWords(obj.value,"标题中含有敏感字，要修改标题吗？","修改","不修改");
    		if(returnstr!="")
    		{
    		     hidesavemask();
    			 obj.focus();
    			 return;
    		}
        }     
        
        //没有转向链接
        if(!document.getElementById("selectwblinkurlcheckbox").checked)
        {
    		if(document.getElementById("sensitivewordcheck").checked)
    		{	
    			//正文
                returnstr=checkSensitiveWords(getUeditorContent(0),"" + (pages.length==1?"文章正文":"分页 1") + "中含有敏感字，需要标记出来修改吗？","标记","不修改");    
    			if(returnstr!="")
    			{
    			    hidesavemask();
    			    //如果当前不在普通版，切换编辑器到普通版
    			    if(!_isPCEditor)
    			    {
    			        changeEditor();
    			    }
    			    focuspage(0, false);
    				ueditor.setContent(returnstr);
    				gotoPage(1);
    				fixHeight();
    				return;
    			}
    			
    			//分页
    			for(var i = 1; i < pages.length; i++)
    			{
    				var returnstr= checkSensitiveWords(getUeditorContent(i),"分页 "+(i + 1)+" 中含有敏感字，需要标记出来修改吗？","标记","不修改");
    				if(returnstr!="")
    				{
    				    hidesavemask();
    				    //如果当前不在普通版，切换编辑器到普通版
    				    if(!_isPCEditor)
        			    {
        			        changeEditor();
        			    }
    				    focuspage(i, false);
    					ueditor.setContent(returnstr);
    					gotoPage(i + 1);
    					fixHeight();
    					return;
    				}
    			}
    			var pages_m;
    			//是否需要检测手机版内容 非自动获取的时候检测
    			if( _hasMobilContent)
    			{
    			    pages_m = document.getElementsByName("ueditor_subcontent_m");
    			   //正文
                    returnstr=checkSensitiveWords(getUeditorContent(0,undefined,true),"" + (pages_m.length==1?"手机版文章正文":"分页 1") + "中含有敏感字，需要标记出来修改吗？","标记","不修改");    
        			if(returnstr!="")
        			{
        			    hidesavemask();
        			    //如果当前不在手机版，切换编辑器到手机版
        			    if(_isPCEditor)
        			    {
        			        changeEditor();
        			    }
        			    focuspage(0, false);
        				ueditor.setContent(returnstr);
        				gotoPage(1);
        				fixHeight();
        				return;
        			}
        			
        			//分页
        			for(var i = 1; i < pages_m.length; i++)
        			{
        				var returnstr= checkSensitiveWords(getUeditorContent(i,undefined,true),"手机版分页 "+(i + 1)+" 中含有敏感字，需要标记出来修改吗？","标记","不修改");
        				if(returnstr!="")
        				{
        				    hidesavemask();
        				    //如果当前不在手机版，切换编辑器到手机版
            			    if(_isPCEditor)
            			    {
            			        changeEditor();
            			    }
        				    focuspage(i, false);
        					ueditor.setContent(returnstr);
        					gotoPage(i + 1);
        					fixHeight();
        					return;
        				}
        			}
    			}
    		}
    		//获取文章内容
            //正文
             preparecontent(0, $("#wbcontent")[0]);
            var pages = document.getElementsByName("ueditor_subcontent"); 
            //分页 其实这里包含了第一页
        	   var subcontents = document.getElementsByName("wbsubcontent");
            for(var i = 1; i < pages.length; i++)
            {
        		preparecontent(i, subcontents[i]);
            }
            //非自动获取的情况下   获取手机版内容
            if(_hasMobilContent)
            {
                 preparecontent(0, $("#wbcontent_m")[0],true);
                //分页
            	   var subcontents_m = document.getElementsByName("wbsubcontent_m");
                for(var i = 1; i < pages_m.length; i++)
                {
            		    preparecontent(i, subcontents_m[i],true);
                }
            }
            //检测图片等
            var ishaveimg = false;
            for(var i=0;i<pages.length;++i)
            {
                var imgs = pages[i].contentWindow.document.getElementsByTagName("IMG");
                for(var j =0;j<imgs.length;++j)
                {
                    if( !isRealImg(imgs[j]) ) continue;
                    if(imgs[j].src.indexOf("/system/resource/images/fileTypeImages/") == -1)//去掉附件的前导图
                    {
                        ishaveimg = true;
                        break;
                    }
                }
                if(ishaveimg)
                    break;
            }    
            document.getElementById("wbishaveimg").value = ishaveimg?"1":"";
            
            //视频	
            var ishavevideo = false;
            for(var i=0;i<pages.length;++i)
            {
                var imgs = pages[i].contentWindow.document.getElementsByTagName("img");
                for(var j =0;j<imgs.length;++j)
                {
                    if(isRealVideo(imgs[j]))
                    {
                         ishavevideo = true;
                         break;   
                    }
                }
                if(ishavevideo)
                    break;
            }
             
            //移动版     不处理 
            /*if(_hasMobilContent)
            {
                var pages_m = document.getElementsByName("ueditor_subcontent_m"); 
                  for(var i=0;i<pages_m.length;++i)
                {
                    var embedels = pages_m[i].contentWindow.document.getElementsByTagName("embed");
                    for(var j =0;j<embedels.length;++j)
                    {
                        if(embedels[j].src.indexOf("/system/resource/swf/FlexPaperViewer") == -1 && embedels[j].getAttribute("vsbaudio")==null && embedels[j].src.indexOf("/system/resource/swf") != -1 || embedels[j].getAttribute("console")=="Clip1")
                        {
                            ishavevideo = true;
                            break;
                        }
                    }
                    if(ishavevideo)
                        break;
                }
            }*/         
            document.getElementById("wbishavevideo").value = ishavevideo?"1":"";
            //设置分页标题
        	var pagetitles = document.getElementsByName("wbpagetitle");
        	for(var i=0;i<pagetitles.length;i++)
        	{
        		if(pagetitles[i].value=="点此输入当前页标题")
        		{
        			pagetitles[i].value="";
        		}
        	}	
        }
        
        //取消自动保存
        if(beginAutoSave==true)
        {
            beginAutoSave=false;
        }

    	if(op == "save" || op=="audit")
    	{
    		setsavemastinfo("正在保存文章")
    	}
    	else if(op=="submit"||op=="deptsubmit")
    	{
    		setsavemastinfo("正在提交审核")
    	}
    	else
    	{
    		setsavemastinfo("正在发布文章")
    	}
    	movesavegif(150);
       
        
        if($("#wbtopdate").val()=="不设置则立即置顶")
        {
            $("#wbtopdate").val("");
        }
        if($("#wbgotopdate").val()=="不设置则一直置顶")
        {
            $("#wbgotopdate").val("");
        }
        if($("#wbfirststartdate").val()=="不设置则立即头条")
        {
            $("#wbfirststartdate").val("");
        }
        if($("#wbfirstenddate").val()=="不设置则一直头条")
        {
            $("#wbfirstenddate").val("");
        }
        
        if(document.getElementById("wbpicurl").value == "可以从正文包含的图片中进行选择")
        {
            document.getElementById("wbpicurl").value = "";
        }
        if(document.getElementById("wbvideourl").value == "请在右侧选择")
        {
            document.getElementById("wbvideourl").value = "";
        }
    	if(document.getElementById("wbnewstagname").value == "请在右侧选择")
    	{
    	    document.getElementById("wbnewstagname").value = "";
    	}
    	
        // 文章将要投递到的栏目
        document.getElementById("targetcolumns").value = targetcolums;
        document.getElementById("wbrelationnewsid").value =  document.getElementById('relationnewsframeid').contentWindow._set_relationnews_values();
        document.getElementById("doaction").value=op;
        detailform.submit();
    }

    //Wzq 跳过视频 音频的占位图和锚点标识图片
    function isRealImg(imgObj)
    {
        var imgClass = imgObj.getAttribute("class");
        var isImg = true;
        var list = ueditor.options['vsbFilterClass'] || [];
        if (list.length){
             for(var i = 0, ci; ci = list[i] ,i < list.length; i++)
             {
                if(imgClass && imgClass.indexOf(ci) != -1 )
                {
                    isImg = false;
                    break;
                }
             }
        }
        return isImg;
    }
    //Wzq提取编辑器视频时，要获取图片占位符
    function isRealVideo(imgObj)
    {
        var imgClass = imgObj.getAttribute("class");
        var isVideo = false;
        var list = ueditor.options['vsbVideoClass'] || [];
        if (list.length){
             for(var i = 0, ci; ci = list[i] ,i < list.length; i++)
             {
                if(imgClass && imgClass.indexOf(ci) != -1 )
                {
                    isVideo = true;
                    break;
                }
             }
        }
        return isVideo;
    }

    function preparecontent(subpageindex, obj,isMobil)
    {
        var content;
        //手机版
        if(!!isMobil)
        {
            content = getUeditorContent(subpageindex,undefined,isMobil);
        }else{
             content = getUeditorContent(subpageindex);
        }
    	content = content.replace(new RegExp("NAME=\"AllowFullScreenInteractive\" VALUE=\"\"","gm"), "name=\"AllowFullScreenInteractive\" value=\"true\"");
    	if(content.indexOf("<ol class=") != -1||content.indexOf("<ul class=") != -1)
    	{
    	    //这有问题
    	    // content = content + '<link rel="stylesheet" type="text/css" href="/system/resource/style/ueditor/olul.css" />';
    	}
    	obj.value = content;
    	return content;
    }

    function getUeditorContentLength(subpageindex,isMobil)
    {
    	var doc;
    	//获取手机版内容
    	if(!!isMobil)
    	{
    	    doc = document.getElementsByName("ueditor_subcontent_m")[subpageindex].contentWindow.document;
    	}else{
    	     doc = document.getElementsByName("ueditor_subcontent")[subpageindex].contentWindow.document;
    	}
    	var olddoc = ueditorswitchtodoc(doc);
    	var conlen = ueditor.getContentLength();
    	ueditorswitchtodoc(olddoc);
    	
    	return conlen;
    }

    function getUeditorContent(subpageindex, keepsensitiveword,isMobil)
    {
    	var doc;
    	//获取手机版内容
    	if(!!isMobil)
    	{
    	    doc = document.getElementsByName("ueditor_subcontent_m")[subpageindex].contentWindow.document;
    	}else{
    	     doc = document.getElementsByName("ueditor_subcontent")[subpageindex].contentWindow.document;
    	}
    	if(!keepsensitiveword)
    	{
        	//去除敏感字标示
        	$(doc).find("[sensitiveword=true]").each(function(){
                this.removeNode(false);
            });
        }

    	var olddoc = ueditorswitchtodoc(doc);
    	var content = ueditor.getContent();
        //获取内容的时候不替换了
    	/*var list = ueditor.options['wordImportFilterStr'] || [];
         if (list.length){
             for(var i = 0, ci; ci = list[i] ,i < list.length; i++)
             {
                        content = content.replace(ci.source , ci.target);
             }
        }*/
        content = content.replace( /currentColor/gi,'#000000');
    	return content;
    }



    //临时把doc设置到对应分页，获取信息，然后可以回到当前分页
    function ueditorswitchtodoc(doc)
    {
        var olddoc = ueditor.document;
        if(olddoc === doc)
            return olddoc;
    	ueditor.document = doc;
        if(doc.defaultView)
        {
            ueditor.window = doc.defaultView
        }else{
            ueditor.window = doc.parentWindow
        }
    	ueditor.iframe = ueditor.window.frameElement;
    	ueditor.body = doc.body;
    	doc.body.contentEditable = true;
    	return olddoc;
    }

    var checkSensitiveTempDiv = null;
    function checkSensitiveWords(content,showmsg,op1,op2)
    {
        if(checkSensitiveTempDiv == null)
            checkSensitiveTempDiv = document.createElement("DIV");
       checkSensitiveTempDiv.innerHTML=content;
       if(sensitiveWordsInit('vsb_sensitivewords',checkSensitiveTempDiv))
       {
           var title=URLEncode(showmsg);
           var option1=URLEncode(op1);
           var option2=URLEncode(op2);

           var isok=showMyConfirm("",title,option1,option2,"/system/images/2006_pic/pic!.gif","","");
           if(isok)
           {
              return checkSensitiveTempDiv.innerHTML;
           }
           else
           {
              return "";
           }
       }
       return "";
    }

    function SetCookie(sName,sValue)
    {
        var d = new Date();
        var year=d.getYear();
        d.setYear((year<1900?(1900+year):year) + 10);
        document.cookie = sName+"=" + escape(sValue) + ";path=/;expires=" + d.toUTCString();
    }

    function GetCookie(sName)
    {
        var res="";
        var aCookie = document.cookie.split(";");
        for(var i=0; i < aCookie.length; i++)
        {
            var aCrumb = aCookie[i].split("=");
            if(trim(sName)==trim(aCrumb[0]))
            {
                res=unescape(aCrumb[1]);
            }
        }

        return   res;
    }

    function editorwidthChange(o)
    {
        if(isinteger(o.value))
        {
            setEditorWidth(o.value)

            if(document.getElementById("editorwidth") == o){}
                //$("editorwidth2").value = o.value;
            else
                document.getElementById("editorwidth").value = o.value;
        }
        else
        {
            top.showAlert(window,"编辑器宽度只能填写数字！");
            o.value=webberedit.getFixWidth();
            o.focus()
        }
    }

    function setTop(obj)
    {
        if(obj.checked)
        {
            document.getElementById("wbtop").value="1";
    		$(".toptime").css("display","");
        }
        else
        {
            document.getElementById("wbtop").value="0";
    		$(".toptime").css("display","none");
        }
    }

    function setFirst(obj,value)
    {
    	if(obj.checked)
    	{
    		document.getElementById("wbfirst").value=value;
    		$(".firsttime").css("display","");
    	}else
    	{
    		document.getElementById("wbfirst").value="0";
    		$(".firsttime").css("display","none");
    	}
    }

    function setComment(obj)
    {
        if(obj.checked)
        {
            document.getElementById("wbiscomment").value="1";
        }
        else
        {
           document.getElementById("wbiscomment").value="0";
        }
    }
    function setCopyenable(obj)
    {
        if(obj.checked)
        {
            document.getElementById("wbcopyenable").value="1";
        }
        else
        {
           document.getElementById("wbcopyenable").value="0";
        }
    }
    function selectSource()
    {
        if(document.getElementById("ownername").value=="")
        {
            top.showAlert(window,"请选择文章发布位置！");
            return;
        }
        top.showDialog(window,{
            'title': '选择来源', 
            'url': "/system/site/column/news/selectsource.jsp?owner="+document.getElementById("owner").value,
            'arguments':new Array(window),
            'callbackFun':function(thevalue)
                {
                    if("noResource"==thevalue)
                    {
                        document.getElementById("wbsourcename").focus();
                    }
                    else if(thevalue)
                    {
                        document.getElementById("wbsourcename").value =  thevalue;
                    }
                },
            'width': '500',
            'height': '200' 
        });
    }

    //当前选择的栏目数据

    function selectColumn(thevalue)
    {
        if(thevalue)
        {
            var temp=thevalue.split("@");
            var treeid=temp[2];
            document.getElementById("treeid").value=treeid;
            document.getElementById("wbcontentid").value=temp[1];
            var owner=temp[0];
            document.getElementById("owner").value=owner;
            getShowName();

            //判断磁盘空间是否已满
            _setOwneradminDiscRemainSpace();
            

            //设置敏感字
            PortalUtil.getSensitiveWords(document.getElementById("owner").value,setSensitivewords);
            getIpSelectHTML(document.getElementById("wbnewsid").value);
            curownerclumn=thevalue;
        }
    }

    function setSensitivewords(data)
    {
        document.getElementById("vsb_sensitivewords").innerHTML = data;
    }

    function goNextPage()
    {
        if(curownerclumn=="")
        {
            top.showAlert(window,"请选择文章发布位置！");
            return;
        }
        $("selectcolumntable").style.display="none";

        //如果未显示投递页面，下一步时显示，如果已经显示，不能再刷新页面
        if(!$("deliverinfo").src||$("deliverinfo").src=="about:blank")
            $("deliverinfo").src="/system/site/column/news/multicolmanage.jsp?owner="+$("owner").value+"&contentid="+$("wbcontentid").value+"&showinfoid=0";
        //转移frame的父node
        //multicolpos   deliverinfo
        $("multicolpos").children(0).swapNode($("deliverinfo"));
        $("maintable").style.display="";
    }

    function setAuditHTML(data)
    {
        if(data)
            document.getElementById("audithtml").innerHTML=data;
        else
            document.getElementById("audithtml").innerHTML="";
    }


    function setPubButton(data)
    {
        if(data==true)
            document.getElementById("pub_button").disabled=false;
        else
            document.getElementById("pub_button").disabled=true;
       if(canpublish)
       		document.getElementById("pub_button").disabled=false;
    }

    function setSubButton(data)
    {
        if(data==true)
            document.getElementById("sub_button").disabled=false;
        else
            document.getElementById("sub_button").disabled=true;
    }

    function writeShowName(data)
    {
          var temp=data.split(",");
          if(temp.length<4)
            return;
          if(temp[0])
          {
            //$("treename").value=temp[0];
            //$("treename").style.fontStyle="normal";
          }else
          if(temp[1])
          {
            $("wbcontentid").value=temp[1];
          }
          if(temp[2])
          {
            $("ownername").value=temp[2];
          }
          if(temp[3])
          {
            $("sitename").innerHTML=temp[3];
            $("sitename").style.fontStyle="normal";
          }
    }

    function getShowName()
    {
            if(document.getElementById("treeid").value=="0"&&document.getElementById("owner").value=="0")
            {
                return;
            }

           setSaveTimer(document.getElementById("treeid").value);
    }

    function setColumnShowName(data)
    {
          var temp=data.split(",");
          if(temp.length<4)
            return;
          if(temp[0])
          {
          }else
          if(temp[1])
          {
            document.getElementById("wbcontentid").value=temp[1];
          }
          if(temp[2])
          {
            document.getElementById("ownername").value=temp[2];
          }
          if(temp[3]&&temp[0])
          {
          	var len = temp[3].length+temp[0].length;
            document.getElementById("sitename").innerHTML=temp[3]+">>"+temp[0];
            document.getElementById("sitename").style.fontStyle="normal";
          }
    }


    function showHistory1(newsid,auditing,owner,contentid)
    {
          top.showDialog(window,{
                'title': '更改记录',
                'url': "/system/site/column/news/newshistory.jsp?jsauth="+jsEditorAudit+"&isdraft=0&newsid="+newsid+"&auditing="+auditing+"&randnum="+Math.random()+"&treeid="+document.getElementById("treeid").value,
                'arguments':new Array(window),
                'callbackFun':function(thevalue)
                {
                    if(thevalue)
                    {
                    	  var obj = window.opener.document.getElementById("randnum");
                    	  top.showAlert(window,obj.value);
                        if(obj && document.getElementById("randnum").value == obj.value)
                        {
                        		window.opener.location.reload();
                        		window.close();
                          }
                      }
                },
                'width': '500',
                'height': '200' 
           });
    }

    function selectEditorWidth()
    {
        top.showDialog(window,{
            'title': '文章历史', 
            'url':"/system/site/column/news/editorwidth.htm",
            'arguments':new Array(window),
            'callbackFun':function(thevalue)
            {
                 if(thevalue)
                {
                    document.getElementById("editorwidth").value =  thevalue;
                    setEditorWidth(thevalue);
                }
            },
            'width': '350',
            'height': '160' 
       });
    }

    function addnew(treeid,contentid)
    {
        window.location.href = "addnews.jsp?newsposition="+newsposition+"&treeid="+treeid+"&wbcontentid="+contentid;
    }

    //解析编辑器中的图片
    function parseImg()
    {
        var obj=document.getElementById("picurls");
        var hobj=document.getElementById("httppicurls");
        obj.value="";
        hobj.value="";
        
        var iframes = document.getElementsByName("ueditor_subcontent");
        var aReturn = [];
        for(var i=0;i<iframes.length;++i)
        {
            var doc = iframes[i].contentWindow.document;
            var imgs = doc.getElementsByTagName("IMG");
            for(var j =0;j<imgs.length;++j)
            {
                if(imgs[j].src.indexOf("/system/resource/images/fileTypeImages/") == -1)//去掉附件的前导图 
                {
                    aReturn.push(imgs[j]);
                }
                
            }
        }
        var str="";

        //本地服务器格式
        var serverPath="http://"+document.getElementById("hostname").value;
        if(beginWith(window.location.href,"https://"))
        {
               serverPath="https://"+document.getElementById("hostname").value; 
        }
        if(document.getElementById("portnumber").value!="80")
        {
            serverPath=serverPath+":"+document.getElementById("portnumber").value;
        }
        serverPath=serverPath.toLowerCase();
        for(var i=0;i<aReturn.length;i++)
        {
            if( !isRealImg(aReturn[i]) ) continue;
            var temp=aReturn[i].getAttribute("src");
            //判断是否是本地服务器文件
            //var ok= beginWith(temp,serverPath);
            if(beginWith(temp,serverPath+"/_mediafile"))
            {
                obj.value=obj.value+temp.substring(serverPath.length,temp.length)+";";
            }else if(beginWith(temp,serverPath+"/_vsl"))
            {
                obj.value=obj.value+temp.substring(serverPath.length,temp.length)+";";
            }else if(beginWith(temp,serverPath))
            {
                var serverImage=serverPath+"/system/_owners/"+document.getElementById("ownername").value+"/_webprj";
                obj.value=obj.value+temp.substring(serverImage.length,temp.length)+";";
            }else
            {
                hobj.value=hobj.value+temp+";";
            }
        }
        if(obj.value==""&&hobj.value=="")
        {
            top.showAlert(window,"正文中没有图片,请先在正文中添加！");
        }else
        {
            top.showDialog(window,{
                'title': '从正文中选择图片', 
                'url': "/system/site/column/news/titleimage.jsp",
                'arguments':new Array(window),
                'callbackFun':function(thevalue)
                {
                    if(thevalue)
                    {
                        if(thevalue==0)
                        {
                            document.getElementById("wbpicurl").value = "";
                            document.getElementById('titlepicpreview').style.display='none';
                            //去掉背景色
                            document.getElementById("titlepicpreviewwrapper").style.backgroundColor="";
                        }else
                        {
                            document.getElementById("wbpicurl").value =  thevalue;
                            //编辑器显示处理
                            if(thevalue.indexOf("/_mediafile")!=-1)
                            {
                                //将串中的$ {ownername}替换为正确的ownerName
                                thevalue = myReplace(thevalue,"$"+"{ownername}",document.getElementById("ownername").value);
                            }else if(thevalue.indexOf("/_vsl")!=-1)
                            {
                                thevalue=thevalue;
                            }else if(thevalue.indexOf("http://")!=-1 || thevalue.indexOf("https://") != -1)  //网络图片
                            {
                                thevalue=thevalue;
                            }
                            else
                            {
                                thevalue = "/system/_owners/"+document.getElementById("ownername").value+"/_webprj"+ thevalue;
                            } 
                            new VsbPreloadImg(thevalue,"titlepicpreview", ontitle_imgload);     
                        }
                    } 
                },
                'width': '450',
                'height': '500'
           });
        }
    }

    function canceltitlcpic()
    {
         document.getElementById("wbpicurl").value = "";
    	 document.getElementById("titlepicpreview").style.display = "none";
        //去掉背景色
        document.getElementById("titlepicpreviewwrapper").style.backgroundColor="";
    }

    function canceltitlcmedia()
    {
         document.getElementById("wbvideourl").value = "请在右侧选择";
    }

    function parseVideo()
    {
        $("#mediaurls").val("");
        var htmlElement = document.getElementsByName("ueditor_subcontent");//getIFrameDOM("baidu_editor_0");
        for(var i=0;i<htmlElement.length;++i)
        {
            var doc = htmlElement[i].contentWindow.document;
            parseMedia(doc,"/system/_owners/"+document.getElementById("ownername").value+"/_webprj");
           
        }
        if($("#mediaurls").val()=="")
        {
            top.showAlert(window,"正文中没有视频,请先在正文中添加！(.swf文件不能作为标题视频)");
        }else{
            top.showDialog(window,{
                'title': '从正文中选择视频', 
                'url': "/system/site/column/news/titlevideo.jsp",
                'arguments':new Array(window),
                'callbackFun':function(thevalue)
                    {
                        if( !!thevalue ){
                            if(thevalue == "0")
                            {
                                document.getElementById("wbvideourl").value = "可以从正文包含的视频中进行选择";
                            }else
                            {
                                document.getElementById("wbvideourl").value =  thevalue;
                            }
                        }
                    },
                'width': '600',
                'height': '500' 
           });
        }
    }

    function selectvideourl(wbnewsid,owner)
    {
        	var urls ="/system/userfiles/selectfile.jsp?filetype=movie&issharelib=1&owner="+owner+"&newsid="+wbnewsid;
        	top.showDialog(window,{
                'title': '选择链接', 
                'url': urls,
                'arguments':new Array(window),
                'callbackFun':function(arr)
                    {
                        	if(arr)
                        	{
                                var temp=arr.split("|");
                                var ext = temp[2];
                                var filePath = temp[0];
                                 if(filePath.indexOf("/_vsl/")!=-1)
                                {
                                      filePath  =   filePath+"?e="+ext;
                                 }
                        	    document.getElementById("wbvideourl").value=filePath;
                        	}
                    },
                'width': '840',
                'height': '540' 
           });
    }

    //获取媒体连接
    function parseMedia(obj,ownerpath)
    {
        var mobj=document.getElementById("mediaurls");

        //取embed通用视频连接: wmv,avi,mepg,rm...
        var urls=new Array();
        var count=0;
        //本地服务器格式
        var serverPath="http://"+$("#hostname").val();
         if(beginWith(window.location.href,"https://"))
        {
               serverPath="https://"+$("#hostname").val();
        }
        if($("#portnumber").val()!="80")
        {
            serverPath=serverPath+":"+$("#portnumber").val();
        }
        serverPath=serverPath.toLowerCase();
        var items=obj.getElementsByTagName("img");
        
        for(var i=0;items&&i<items.length;i++)
        {
            //先过滤  只留下真正的视频
            if( !isRealVideo(items[i]) ){
                continue;
            }
            var realVideoUrl = items[i].getAttribute("vsburl");
            if(IsExt(realVideoUrl,"swf|swf"))//过滤Flash
            {
                    continue;
            }
            //直接取src获取到的连接地址可能会带有http....
            if(beginWith(realVideoUrl,serverPath+ownerpath))
            {
                //如果是serverPath+ownerpath 开头的  去掉
                 urls[count++]= deletePrefixString(realVideoUrl,serverPath+ownerpath);
            }else if(beginWith(realVideoUrl,serverPath))//serverPath  开头的
            {
                urls[count++]= deletePrefixString(realVideoUrl,serverPath);
            }else if(beginWith(realVideoUrl,ownerpath))//ownerpath  开头的
            {
                urls[count++]= deletePrefixString(realVideoUrl,ownerpath);
            }else{
                urls[count++]=realVideoUrl;
            }
        }
        for(var i=0;i<urls.length;i++)
        {
            mobj.value += urls[i]+";";
        }
    }

    function   endWith(s1,s2)  
    {  
          if(s1.length<s2.length)  
            return   false;  
          if(s1==s2)  
            return   true;  
          if(s1.substring(s1.length-s2.length)==s2)  
              return   true;  
          return   false;  
    }

    //解析flv播放器中的flv文件连接
    function getFlvUrl(_url)
    {
        var temp=_url.split("&");
        if(temp&&temp.length>0)
        {
            if(temp[0])
            {
                return temp[0];
            }
        }
        return;
    }


    function getKeyWord()
    {
        top.showDialog(window,{
                'title': '选择关键字', 
                'url': '/system/site/column/news/selectkeyword.jsp',
                'arguments':new Array(window),
                'callbackFun':function(arr)
                    {
                        	
                    },
                'width': '400',
                'height': '320' 
           });
    }
    function callparserGBKPhrase(data)
    {
        $("#wbkeyword").val("");
        for(var i = 0; i < data.length; i++)
        {
            var temp=$("#wbkeyword").val() + data[i];
            if(temp.length <255)
            {
              $("#wbkeyword").val($("#wbkeyword").val()+data[i]+" ");
            }else
            {
               return;
            }
        }
    }

    //取摘要
    function getSummary(len)
    {
    	var doc = getIFrameDOM("baidu_editor_0");
        var str = (typeof  doc.body.textContent == "string") ?   doc.body.textContent : doc.body.innerText;
    	if(str.length == 0)
        {
            top.showAlert(window,"请先填写正文!");
            return;
        }
    	if(str.length > 0 && !str.match(/^[a-zA-Z0-9\u4e00-\u9fa5]+$/g))
    	{
    		str = str.substring(0,str.length-1);
    		if(str.length == 0)
    		{
    			top.showAlert(window,"请先填写正文！");
    			return;
    		}
    	}
    	$("#wbsummary").val(filterEnterStr(fixstringlen(str, len * 2)));
    }
    //取摘要，不带alert提示
    function getSummaryNoAlert(len)
    {
    	var doc = getIFrameDOM("baidu_editor_0");
        var str = (typeof doc.body.textContent == "string") ?  doc.body.textContent : doc.body.innerText;
    	if(str.length == 0)
        {
            return;
        }
    	if(str.length > 0 && !str.match(/^[a-zA-Z0-9\u4e00-\u9fa5]+$/g))
    	{
    		str = str.substring(0,str.length-1);
    		if(str.length == 0)
    		{
    			return;
    		}
    	}
    	$("#wbsummary").val(filterEnterStr(fixstringlen(str, len * 2)));
    }
    //过滤字符串中的回车换行
    function filterEnterStr(strHtml)
    {
        strHtml=strHtml.replace(/[\r\n]/g,"");
        return strHtml;
    }
    function getFlexFlashTemplate(swfPath,swfWidth,swfHeight,initViewMode,fitMode,printandcopy)
    {
    			var src = "/system/resource/swf/FlexPaperViewer.swf";
    			var html = '<embed width="'+swfWidth+'" height=' + swfHeight + ' type="application/x-shockwave-flash" src="' +src+ '" FlashVars="SwfFile=' + swfPath + '&amp;Scale=0.6&amp;key=cbd65a4d4530487cc02$6103f82513859c4feeb&amp;ZoomTransition=easeOut&amp;ZoomTime=0.5&amp;ZoomInterval=0.2&amp;' + fitMode + '&amp;MinZoomSize=0.2&amp;MaxZoomSize=5&amp;InitViewMode=' + initViewMode + '&amp;ViewModeToolsVisible=true&amp;ZoomToolsVisible=true&amp;NavToolsVisible=true&amp;CursorToolsVisible=true&amp;SearchToolsVisible=true&amp;localeChain=zh_CN'+printandcopy+'" WMode="Opaque" Play="0" Loop="-1" Quality="High" SAlign="LT" Menu="-1" Base="" AllowScriptAccess="always" Scale="NoScale" DeviceFont="0" EmbedMovie="0" BGColor="" SWRemote="" SeamlessTabbing="1" Profile="0" ProfilePort="0" AllowNetworking="all" AllowFullScreen="true" AllowFullScreenInteractive="true" IsDependent="0" />';
    			return html;
    }

    //解析编辑器中的图片
    function parseImportWordImg()
    {
        var obj=$("#wordpicurls");
        obj.val("");
        var htmlElement = ueditor.document;
        var aReturn=htmlElement.getElementsByTagName("IMG");
        var str="";

        //本地服务器格式
        var serverPath="http://"+$("#hostname").val();
        if(beginWith(window.location.href,"https://"))
        {
               serverPath="https://"+$("#hostname").val();
        }
        if($("#portnumber").val()!="80")
        {
            serverPath=serverPath+":"+$("#portnumber").val();
        }
        serverPath=serverPath.toLowerCase();
        var beginpix=serverPath+"/system/_owners/"+$("#ownername").val()+"/_webprj";
        for(var i=0;i<aReturn.length;i++)
        {
            if( !isRealImg(aReturn[i]) ) continue;
            var temp=aReturn[i].getAttribute("src");
            //判断是否是本地服务器文件
            //var ok= beginWith(temp,serverPath);
            obj.val(obj.val()+temp.substring(beginpix.length,temp.length)+";");
        }
    }
    function _setOwneradminDiscRemainSpace()
    {
    	var re;
    	if(document.getElementById("owner")&&document.getElementById("wbaccount")&&document.getElementById("allowdiscsize"))
    	{
    		re = clearTimeout(re);
    		SiteMonitor.getAdminRemainSize(document.getElementById("owner").value,document.getElementById("wbaccount").value, function (data){
    			document.getElementById("allowdiscsize").value = data;
    			_discmonitorchageelementstate();
    		});
    	}else
    	{
    		re = setTimeout("_setOwneradminDiscRemainSpace()",1000);
    	}
    }
    function _discmonitorchageelementstate()
    {
    	var data = document.getElementById("allowdiscsize").value;
    	if(data<=0)
        {
            document.getElementById("_importword2pdf1").disabled=true;
            document.getElementById("_importword2pdf1").href="#";

            document.getElementById("_selectlocalfile").innerHTML="";
        }else
        {
        	var towner = document.getElementById("owner").value;
        	var townername = document.getElementById("ownername").value
        	var timgrelativepath = document.getElementById("wbrelativepath").value;
            document.getElementById("_importword2pdf1").disabled=false;
            document.getElementById("_importword2pdf1").href="javascript:importword2pdf('"+towner+"', '/system/_owners/"+townername+"/_webprj"+timgrelativepath+"')";
            document.getElementById("_selectlocalfile").innerHTML="<span style=\"color:blue;text-decoration:underline;cursor:pointer\">本机</span><span><input type=\"file\" name=\"selectfile\" id=\"selectfile\" style=\"position:relative;left:-70px;filter:alpha(opacity=0);width:0px;cursor:pointer\"  hidefocus onChange=\"doadd(this)\"></span>";
        }
    }

    function importwordfull(owner, path)
    {
        //上传文件
        getHelper();
        if(Helper == undefined)
        	return;

        //判断是否能上传新的文件
        if(document.getElementById("allowdiscsize").value<=0)
        {
            top.showAlert(window,"你可用的磁盘空间已满，word中包含的图片将不会被保存！");

        }
    	
    	var charset = document.characterSet ? document.characterSet : document.charset;
        
        try
        {
            if(ueditor.getContent() != "")
            {
                top.showConfirm(window,"警告！导入文档会覆盖当前分页的内容，您确定要导入吗？",function(r){
                    if(r){
                        setTimeout(function(){
                            var uploadUrl=   document.getElementById("uploadurl").value;
                            var uploadParams=document.getElementById("uploadparams").value;
                            uploadParams='{"params":"'+uploadParams+'"}'
                            Helper.SetMarkArrayCallback(intoMarktoDB);
                            Helper.SetImportFinishCallback(callImportSwf,callImportPdf,callImportWord);
                            Helper.ImportWord2News(document.location.hostname, document.location.port, uploadUrl, charset, path,uploadParams);
                            if(Helper.Result == 5)
                            {
                                top.showDialog(window,{"title":"网站群管理平台-扩展插件",
                                    "url":"/system/site/VSBIEHelper/protectedmode.jsp",
                                    "arguments":new Array(window),
                                    "width":640,
                                    "height":480});
                            }
                        },10);
                    }
                }); 
            }else{
                var uploadUrl=   document.getElementById("uploadurl").value;
                var uploadParams=document.getElementById("uploadparams").value;
                uploadParams='{"params":"'+uploadParams+'"}'
                Helper.SetMarkArrayCallback(intoMarktoDB);
                Helper.SetImportFinishCallback(callImportSwf,callImportPdf,callImportWord);
                Helper.ImportWord2News(document.location.hostname, document.location.port, uploadUrl, charset, path,uploadParams);
                if(Helper.Result == 5)
                {
            	        //OpenPopWin("/system/site/VSBIEHelper/protectedmode.jsp", 640, 480, 0, 0, ",scrollbars=yes", "vsbiehelper");
    					top.showDialog(window,{"title":"网站群管理平台-扩展插件",
    								"url":"/system/site/VSBIEHelper/protectedmode.jsp",
    								"arguments":new Array(window),
    								"width":640,
    								"height":480});
                }
            }
        }
        catch(e)
        {
            top.showAlert(window,"请关闭并重新打开浏览器后再试");
            return;
        }
    }

    function newsInForback(data,owner)
    {
    	ueditor.setContent(data.content);

    	//parseImportWordImg();
    	$("#checkworddiv").css("display","none");
    	if((data.title!=""&&$("#wbtitle").val() != "")||(data.keyword!=""&&$("#wbkeyword").val() != "")||(data.summary!=""&&$("#wbsummary").val() != "")||(data.time!=""&&$("#newdate").val() != "")){
    		$("#wordtitle").val(data.title);
    		$("#wordkeyword").val(data.keyword);
    		$("#wordsummary").val(data.summary);
    		$("#wordtime").val(data.time);
            top.showDialog(window,{"title":"选择导入信息",
                "url":"/system/site/column/news/selectimportinfo.jsp",
                "arguments":window,
                "width":700,
                "height":275,
                'callbackFun':function(rt)
                {
                    if(newstypeset)
                    {
                        top.showConfirm(window,"您是否要对导入的word文件进行一键排版操作？",function(r){
                            if(r){
                                typeSet();
                            }
                        });
                    }
                }
            });
    		//showModalDialog('/system/site/column/news/selectimportinfo.jsp', window, "dialogWidth:700px;dialogHeight:325px;help:no;scroll:no;status:no");
    	}else if(data.title.length>255||data.keyword.length>255||data.summary.length>1024){
    		$("#wordtitle").val(data.title);
    		$("#wordkeyword").val(data.keyword);
    		$("#wordsummary").val(data.summary);
    		$("#wordtime").val(data.time);
            top.showDialog(window,{"title":"选择导入信息",
                "url":"/system/site/column/news/selectimportinfo.jsp",
                "arguments":window,
                "width":700,
                "height":225,
                'callbackFun':function(rt)
                {
                    if(newstypeset)
                    {
                        top.showConfirm(window,"您是否要对导入的word文件进行一键排版操作？",function(r){
                            if(r){
                                typeSet();
                            }
                        });
                    }
                }
            });
    		//showModalDialog('/system/site/column/news/selectimportinfo.jsp', window, "dialogWidth:700px;dialogHeight:325px;help:no;scroll:no;status:no");
    	}else{
    		if(ltrim(data.title)!=""){
    			$("#wbtitle").val(data.title);
    		}
    		if(ltrim(data.keyword).length>0){
    			$("#wbkeyword").val(data.keyword);
    		}
    		if(ltrim(data.summary).length>0){
    			$("#wbsummary").val(data.summary);
    		}
    		if(ltrim(data.time)!=""){
    			$("#wordtime").val(data.time);
    		}
    	}
        _statisticsnumstime('wbtitle','wbtitlelength');
        _statisticsnumstime('wbsummary','wbsummarylength');
    }

    /**
    清除字符串中间的空格，只留一个空格。用于处理导入关键子不规范问题。
    */
    function clsbanlk(str){
    	str = str.replace(new RegExp('　',"gm"),' ');
    	var strs = str.split(' ');
    	var temp = '';
    	for(var i = 0;i<strs.length;i++){
    		if(trim(strs[i]) != ''){
    			temp += trim(strs[i])+' ';
    		}
    	}
    	return rtrim(temp);
    }


    //注册回调函数：
    //SetMarkArrayCallback(funName)
    //回调函数：
    //funName(markArrayJson)

    //markArrayJson = { "markarray":[ "mark":"","mark":"","mark":"" ] }
    //word==1 flash==2 pdf==3 
    function intoMarktoDB(data,errorinfo,appType)
    {
          if(errorinfo=="")
          {
              var owner=document.getElementById("owner").value;
              NewsDwr.createStoragesitefile(data,owner,"news");
              
              if(appType==1)
              {
                  var newsid=document.getElementById("wbnewsid").value;                     
                  NewsDwr.insertNewsFiles(data,owner,newsid,1,function(data)
                  {
                    if(data&&newsid=="0")
                    {
                        for(var i=0;i<data.length;i++)
                        {
                            document.getElementById("picdownload").value+=data[i]+";";                     
                        }    
                    }
                  });
                  
              }
          }  
    }        
    function importword2pdf(owner, path)
    {
        //上传文件
        getHelper();
        if(Helper == undefined)
        	return;
    	var charset = document.characterSet ? document.characterSet : document.charset;
        Helper.SetImportFinishCallback(callImportSwf,callImportPdf,callImportWord);
        Helper.SetMarkArrayCallback(intoMarktoDB);
        var requesturl="/system/storage/plugin/findmark.jsp";
        Helper.ImportWord2Pdf(document.location.hostname, document.location.port, requesturl, charset, path,true);
        
        if(Helper.Result == 5) //保护模式
        {
    		//OpenPopWin("/system/site/VSBIEHelper/protectedmode.jsp", 640, 480, 0, 0, ",scrollbars=yes", "vsbiehelper");
    		top.showDialog(window,{"title":"网站群管理平台-扩展插件",
    					"url":"/system/site/VSBIEHelper/protectedmode.jsp",
    					"arguments":new Array(window),
    					"width":640,
    					"height":480});
        }
        else if(Helper.Result == 3) //需要安装office addin
        {
    		//OpenPopWin("/system/site/VSBIEHelper/needpdfaddin.jsp", 640, 480, 0, 0, ",scrollbars=yes", "vsbiehelper");
    		top.showDialog(window,{"title":"网站群管理平台-扩展插件",
    					"url":"/system/site/VSBIEHelper/needpdfaddin.jsp",
    					"arguments":new Array(window),
    					"width":640,
    					"height":480});
        }
    }

     var pdfshowtemplate = "<iframe  width=\"widthvalue\" height=\"heightvalue\" src=\"pdfvalue\" style=\"border:1px solid #DDDDDD\"></iframe>" +
        "<ul>如果您无法在线浏览此 PDF 文件，则可以" +
        "<li>下载免费小巧的 <a href=\"http://www.foxitsoftware.cn/\" target=\"_blank\" style=\"color:blue\">福昕(Foxit) PDF 阅读器</a>,安装后即可在线浏览  或</li>" +
        "<li>下载免费的 <a href=\"http://www.adobe.com/products/reader.html\" target=\"_blank\" style=\"color:blue\">Adobe Reader PDF 阅读器</a>,安装后即可在线浏览  或</li>" +
        "<li>下载此 <a href=\"pdfvalue\" target=\"_blank\" style=\"color:blue\">PDF 文件</a></li></ul>";
    function callImportPdf(content,result,errorinfo)
    {
        if(errorinfo!="")
        {
            top.showAlert(window,errorinfo);
            return;
        }
        
        if(content=="")
        {
            top.showAlert(window,"转换的pdf文件为空！");
            return;
        }
    	
    	if(!top.VsbBrowser.ie)
    	{
    		var base64 = new Base64();
    		content = base64.decode(content);
    	}
    	
        var pdfpath = content + "?e=.pdf";
        var pdfshow = pdfshowtemplate.replace(/pdfvalue/gi, pdfpath).replace(/widthvalue/gi, "100%").replace(/heightvalue/gi, "600");
        ueditor.execCommand("insertHTML",pdfshow);
        var beginpix="/system/_owners/"+document.getElementById("ownername").value+"/_webprj";
        document.getElementById("wordotherurls").value+=pdfpath+";";
    }

    function importword2flash(owner, fullpath, sitepath)
    {
        //上传文件
        getHelper();
        if(Helper == undefined)
        	return;
        Helper.SetImportFinishCallback(callImportSwf,callImportPdf,callImportWord);
        Helper.SetMarkArrayCallback(intoMarktoDB);
        var requesturl="/system/storage/plugin/findmark.jsp";
    	var charset = document.characterSet ? document.characterSet : document.charset;
        Helper.ImportWord2Flash(document.location.hostname, document.location.port, requesturl, charset, fullpath,true);
        if(Helper.Result == 5) //保护模式
        {
    		//OpenPopWin("/system/site/VSBIEHelper/protectedmode.jsp", 640, 480, 0, 0, ",scrollbars=yes", "vsbiehelper");
    		top.showDialog(window,{"title":"网站群管理平台-扩展插件",
    				"url":"/system/site/VSBIEHelper/protectedmode.jsp",
    				"arguments":new Array(window),
    				"width":640,
    				"height":480});
        }
        else if(Helper.Result == 3) //需要安装flashpaper
        {
    		//OpenPopWin("/system/site/VSBIEHelper/needpdfaddin.jsp", 640, 480, 0, 0, ",scrollbars=yes", "vsbiehelper");//新版转flash需要安装office addin
    		top.showDialog(window,{"title":"网站群管理平台-扩展插件",
    				"url":"/system/site/VSBIEHelper/needpdfaddin.jsp",
    				"arguments":new Array(window),
    				"width":640,
    				"height":480});
        }
        //不可撤销
    	ueditor.undoManger.reset();
    }

    function callImportWord(content,result,errorinfo)
    {
        if(errorinfo!="")
        {
            top.showAlert(window,errorinfo);
            return;
        }
        var helper_content = content;
    	
    	if(!top.VsbBrowser.ie)
    	{
    		var base64 = new Base64();
    		helper_content = base64.decode(content);
    	}

        //word导入   使用UE规则过滤
        helper_content = helper_content.replace(/[\t\r\n]+/g,' ').replace( /<!--[\s\S]*?-->/ig, "" )
            .replace(/<\/?div[^>]*>/g,'')
            //去掉多余的属性
            .replace( /v:\w+=(["']?)[^'"]+\1/g, '' )
            .replace( /<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|xml|meta|link|\w+:\w+)(?=[\s\/>]))[^>]*>/gi, "" )
            .replace( /<p [^>]*class="?MsoHeading"?[^>]*>(.*?)<\/p>/gi, "<p><strong>$1</strong></p>" )
            //去掉多余的属性
            .replace( /\s+(class|lang|align)\s*=\s*(['"]?)([\w-]+)\2/ig, function(str,name,marks,val){
                //保留list的标示
                return name == 'class' && val == 'MsoListParagraph' ? str : ''
            })
            //清除多余的font/span不能匹配&nbsp;有可能是空格
            .replace( /<(font|span)[^>]*>(\s*)<\/\1>/gi, function(a,b,c){
                return c.replace(/[\t\r\n ]+/g,' ')
            });
        //根据配置文件过滤掉导入的word时需要过滤的属性   配置在ueditor.config.js
        var list = ueditor.options['wordImportFilterStr'] || [];
        if (list.length){
            for(var i = 0, ci; ci = list[i] ,i < list.length; i++)
            {
                helper_content = helper_content.replace(ci.source , ci.target);
            }
        }
        if(result == 1)
        {
            var regex_title = new RegExp("<p [^>]*><span [^>]*>(标|&#26631;)(题|&#39064;)(:|：|&#65306;|&#58;)[\\s\\S]*?</span>").test(helper_content);
            var regex_content = false;
            if(regex_title)
            {
        	    regex_content= new RegExp("<p [^>]*><span [^>]*>(((正|&#27491;)(文|&#25991;))|((内|&#20869;)(容|&#23481;)))(：|:|&#65306;|&#58;)[\\s\\S]*?</span>").test(helper_content);
            }
            
    		if(regex_title&&regex_content)
    		{
        	    $("#checkworddiv").css("display","");
        	    DWREngine.setAsync(false); 
    		    WordImportDWR.handleHTML(helper_content,function(data){
    		            newsInForback(data,$("#owner").val());
                });
                DWREngine.setAsync(true); 
            }
            else
            {
                //wps将 内容里的<![if !supportLists]>  <![endif]>    去掉
                var p = new RegExp("(<!\\[if)( )(!supportLists)(\\]>)",["g"]);
                var p2 = new RegExp("(<!\\[endif)(\\]>)",["g"]);
                ueditor.fireEvent('saveScene');//Wzq为了触发undo redo   保存现场
                ueditor.setContent(helper_content.replace(p,'' ).replace(p2,'').replace(/&nbsp;/g,' '));
                ueditor.fireEvent('saveScene');//Wzq为了触发undo redo   保存现场
                //parseImportWordImg();
                if(newstypeset)
                {
                    top.showConfirm(window,"您是否要对导入的word文件进行一键排版操作？",function(r){
                        if(r){
                            typeSet();
                        }
                    });
                }
            }
            fixHeight();
        }
    }

    function callImportSwf(content,result,errorinfo)
    {
           if(errorinfo!="")
           {
               top.showAlert(window,errorinfo);
               return;
           }
    	
    	if(!top.VsbBrowser.ie)
    	{
    		var base64 = new Base64();
    		content = base64.decode(content);
    	}
    	
            top.showDialog(window,{
                'title': '设置FlaxPaper参数', 
                'url': '/system/site/column/news/selectflexpaperopt.html',
                'arguments':new Array(window),
                'callbackFun':function(str)
                    {
                       if(str&&str!="")
                       {
                           var temp = str.split("$");
                           var flashpath =  content + "?e=.swf";
                           var flashshow = "";
                           if(result==6)
                           {
                                flashshow=getFlexFlashTemplate(flashpath,temp[1],temp[2],"PowerPoint","FitPageOnLoad=true",temp[0]);
                           }else
                               flashshow =getFlexFlashTemplate(flashpath,temp[1],temp[2],"Portrait","FitWidthOnLoad=true",temp[0]);
                
                           ueditor.execCommand("insertHTML",flashshow+"<br/>");
                           document.getElementById("wordflashurls").value+=flashpath+";";
                       }
                    },
                'width': '400',
                'height': '150' 
           });
          
    }

    function fixsize()
    {
        //$("webberedit").height="100%";
    }

    var curpage = 1;

    /*获取上一页*/
    function getPreviousSibling(pagecontainer)
    {
        var tmpPage  = pagecontainer[0].previousSibling;
        if(_isPCEditor)
        {
            while(tmpPage.getAttribute("name") != 'pccontainer')
            {
                tmpPage  = tmpPage.previousSibling;
                if(tmpPage.getAttribute("name") == 'pccontainer')
                {
                    return tmpPage;
                }
            }
        }else{
             while(tmpPage.getAttribute("name") != 'mobilcontainer')
            {
                tmpPage  = tmpPage.previousSibling;
                if(tmpPage.getAttribute("name") == 'mobilcontainer')
                {
                    return tmpPage;
                }
            }
        }
        return tmpPage;
    }

    function upsubpage(o)
    {
        top.showConfirm(window,"上移此页？",function(r){
            if(r)
            {
               	var pagecontainer = $(o.parentNode.parentNode.parentNode);
               	var prePageContainer =  getPreviousSibling(pagecontainer);
               	//手机版没有分页标题
               	if(_isPCEditor)
              	{
                   	var title = pagecontainer.find("input");
                    	var targettitle = $(prePageContainer).find("input");
                    	var temptitle = $(title).val();
                    	$(title).val($(targettitle).val());
                    	$(targettitle).val(temptitle);
                	}
                	
                	var content = pagecontainer.find("iframe").contents().find("body");
                	var targetcontent = $(prePageContainer).find("iframe").contents().find("body");
                	var tempcontent = $(content).html();
                	$(content).html($(targetcontent).html());
                	$(targetcontent).html(tempcontent);
                	
                	var index =  getPageIndex(pagecontainer);
                	gotoPage(index);
                	fixHeight();
                	if(UE.browser.ie && UE.browser.version == 6)
                	{
                		ueditor.fireEvent("contentChange");
                	}
            }
        });
    }

    /*获取当前是第几页*/
    function getPageIndex(Jobj)
    {
        var pages  = new Array();
        var index = 0;
        if(!_isPCEditor)
        {
             pages = getEditorPages("mobilcontainer");
        }else{
             pages = getEditorPages("pccontainer");
        }
        return $(pages).index(Jobj);
    }

    /*获取下一页*/
    function getNextSibling(pagecontainer)
    {
        var tmpPage  = pagecontainer[0].nextSibling;
        if(_isPCEditor)
        {
            while(tmpPage.getAttribute("name") != 'pccontainer')
            {
                tmpPage  = tmpPage.nextSibling;
                if(tmpPage.getAttribute("name") == 'pccontainer')
                {
                    return tmpPage;
                }
            }
        }else{
             while(tmpPage.getAttribute("name") != 'mobilcontainer')
            {
                tmpPage  = tmpPage.nextSibling;
                if(tmpPage.getAttribute("name") == 'mobilcontainer')
                {
                    return tmpPage;
                }
            }
        }
        return tmpPage;
    }
    function downsubpage(o)
    {
        var pagecontainer = $(o.parentNode.parentNode.parentNode);
    	var index = getPageIndex(pagecontainer);
    	if(_isPCEditor)
    	{
    	    if(index == pagenum)
            	{
            		top.showAlert(window,"最后一页不能下移");
            		return;
            	}
    	}else{
    	    if(index == _pagenum_m)
            	{
            		top.showAlert(window,"最后一页不能下移");
            		return;
            	}
    	}
        var nextPage  =getNextSibling(pagecontainer);
        top.showConfirm(window,"下移此页？",function(){
            //手机版没有分页标题
            	if(_isPCEditor)
            	{
            	    var title = pagecontainer.find("input");
                    	var targettitle = $(nextPage).find("input");
                    	var temptitle = $(title).val();
                    	$(title).val($(targettitle).val());
                    	$(targettitle).val(temptitle);
            	}
            	var content = pagecontainer.find("iframe").contents().find("body");
            	var targetcontent = $(nextPage).find("iframe").contents().find("body");
            	var tempcontent = $(content).html();
            	$(content).html($(targetcontent).html());
            	$(targetcontent).html(tempcontent);
            
            	gotoPage(index+2);
            	fixHeight();
            	if(UE.browser.ie && UE.browser.version == 6)
            	{
            		ueditor.fireEvent("contentChange");
            	}
        });
    }

    function showpreview(id)
    {
        if(id==0)
        {
            top.showAlert(window,"请先保存文章(暂存，提交审核，发布均可)！");
            return;
        }
        var owner=document.getElementById("owner").value;
        var ownername=document.getElementById("ownername").value;
        var treeid=document.getElementById("treeid").value;
        var win = window;
        WinOpenPopWin(win, "/system/portal/news/preview.jsp?wbnewsid="+id+"&owner="+owner+"&ownername="+ownername, 760, 540, "","", "scrollbars=yes,status=yes,resizable=yes", "newspreview");
        
    }
    function showpreviewmobile(id,isPAD)
    {
    	if(id==0)
        {
            top.showAlert(window,"请先保存文章(暂存，提交审核，发布均可)！");
            return;
        }
    	var owner=document.getElementById("owner").value;
        	var ownername=document.getElementById("ownername").value;
    	showMobilePreview("/system/portal/news/preview.jsp?wbnewsid="+id+"&owner="+owner+"&ownername="+ownername,isPAD);
    }

    function showMobilePreview(url,isPAD)
    {
        var jsessionid = $("#sessionid").val;
        var urlBegin = beginWith(window.location.href,"https://")?"https://":"http://";
    		 try{
    		if(top.VsbBrowser.ie)
            {
    			if(!!isPAD)
    			{
    				document.getElementById("simulator").Launch(urlBegin+$('#hostname').val()+":"+$('#portnumber').val()+"/system/site/dreamweaver/re_url.jsp;jsessionid="+$('#sessionid').val()+"?url="+encodeURIComponent(url),1);    
    			}else{
    				document.getElementById("simulator").Launch(urlBegin+$('#hostname').val()+":"+$('#portnumber').val()+"/system/site/dreamweaver/re_url.jsp;jsessionid="+$('#sessionid').val()+"?url="+encodeURIComponent(url));
    			}
    		}
    		else if(top.VsbBrowser.edge != undefined)
    		{
    			top.showAlert("此功能不支持 Microsoft Edge 浏览器, \r\n您可以换用 IE, 360, 搜狗,  QQ, Chrome, Firefox 等浏览器");
    			return undefined;
    		}
    		else if(navigator.userAgent.toLowerCase().indexOf("x64") > -1)
    		{
    			top.showAlert(win, "此功能不支持您当前使用的 64 位浏览器, \r\n请换用 32 位版本的浏览器" );
    			return undefined;
    		}
    		else if(top.VsbBrowser.chrome >= 45)
    		{		
    			top.showAlert("此功能不支持 Chrome 45及以上版本(45以下版本可正常使用),\r\n您可以换用 IE, 360, 搜狗, QQ, Firefox 等浏览器");
    			return undefined;
    		}
    		else
    		{
    			var ret;
    			if(!!isPAD)
    			{
    				ret = document.getElementById("npsimulator").Launch("http://"+$('#hostname').val()+":"+$('#portnumber').val()+"/system/site/dreamweaver/re_url.jsp;jsessionid="+$('#sessionid').val()+"?url="+encodeURIComponent(url),1);    
    			}else{
    				ret = document.getElementById("npsimulator").Launch("http://"+$('#hostname').val()+":"+$('#portnumber').val()+"/system/site/dreamweaver/re_url.jsp;jsessionid="+$('#sessionid').val()+"?url="+encodeURIComponent(url));
    			}
    			if(ret == 0)
    			{
    				var jsonstr = "{'title': '网站群管理平台扩展插件', 'url': '/system/site/VSBIEHelper/neednpapi.jsp','width': " + 640 + ",'height': " + 480 + " }";
    				top.showDialog(window,jsonstr);
    			}
    		}
            
        }catch(e){
            //WinOpenPopWin(window, "/system/site/VSBEmulator/need.jsp", 640, 480, "","", "scrollbars=yes,status=yes,resizable=yes", "提示");
    		var jsonstr = "{'title': '网站群管理平台扩展插件', 'url': '/system/site/VSBIEHelper/neednpapi.jsp','width': " + 640 + ",'height': " + 480 + " }";
    		top.showDialog(window,jsonstr);
        }
            
    }

    function gonext(id,isdiagrams,position,other,owner)
    {
        if(isdiagrams==true)
        {
            try
            {
                if(newsposition=="add" || newsposition=="list" || newsposition=="pendinglist" || newsposition=="draft" || newsposition=="audit")
                    opener.location.href="/system/portal/news/pagepic/addpagepicnews.jsp?wbnewsid="+id+"&owner="+owner; 
                else
                    opener.location.href="/system/site/column/news/pagepic/addpagepicnews.jsp?wbnewsid="+id;

            }catch(e)
            {
                top.showAlert(window,"下一条是组图文章，请您重新打开组图文章的编辑。")
            }
            window.close();
        }else
        {
            window.location.href="addnews.jsp?newsposition="+position+"&wbnewsid="+id+other;
        }
        
    }

    //一键排版
    function typeSet()
    {
        var owner=$("#owner").val();
        if(beginAutoSave)
        {
            saveNews(document.getElementById("treeid").value);
        }
        else
        {
            if(newsposition != "govaddnews")
            {
                beginAutoSave=true;
                saveNews(document.getElementById("treeid").value);
                beginAutoSave=false;
            }
        }
        top.showDialog(window,{
                'title': '一键排版', 
                'url': "/system/site/column/news/newnewsformatlist.jsp?owner="+owner+"&editorType="+(_isPCEditor?"pc":"mobile"),
                'arguments':new Array(window),
                'callbackFun':function(thevalue)
                    {
                         if(thevalue)
                        {
                        	setcontentid();
                        	setcssfile();
                        	DWREngine.setAsync(false); 
                        	
                        	var pages  = _isPCEditor?document.getElementsByName("ueditor_subcontent"):document.getElementsByName("ueditor_subcontent_m");
                            var pagecontents = new Array();
                            for(var i=0;i<pages.length;i++)
                            {
                                if(_isPCEditor)
                        	    {
                        	        pagecontents[i] = getUeditorContent(i);
                        	    }else{
                        	        pagecontents[i] = getUeditorContent(i,false,true);
                        	    }
                            }
                        	NewsDwr.formatPages(pagecontents,$("#wbformat").val(),owner,formatContent);
                        	DWREngine.setAsync(true);
                    	    fixHeight();
                        }
                    },
                'width': '700',
                'height': '630' 
           });
    }

    function formatContent(datas)
    {
       	//保存当前正文版本
    	setcssfile($("#cssfile").val());
        var olddoc = ueditor.document;
        for(var i=0;i<datas.length;i++)
        {
            var iframes = _isPCEditor ? document.getElementsByName("ueditor_subcontent"):document.getElementsByName("ueditor_subcontent_m");
            var doc = iframes[i].contentWindow.document;
            ueditorswitchtodoc(doc);    
            ueditor.setContent(datas[i]);

            //解决一键排版后插入的图片出现边框的问题
        	$(doc).find("[ue_style]").each(function(){
                this.style.cssText = this.getAttribute("ue_style");
            });        
        	$(doc).find("[ue_class]").each(function(){
                this.className = this.getAttribute("ue_class");
            });        
        }
        ueditorswitchtodoc(olddoc);
        fixHeight();
    }

    function selectPicTitle(mediaid)
    {
        var urls="/system/site/selectimg/selectimage.jsp?resourceid=0&mediaid="+mediaid+"&relativepath="+replaces($("wbrelativepath").value,'|')+"&type=image";
        var arr = showModalDialog(urls, window, "dialogWidth:640px;dialogHeight:480px;help:no;scroll:no;status:no");

        if(arr)
            $("wbpictitle").value=arr;
    }

    function replaces(str,chars)
    {
         var temp=str.split("/");
         var res="";
         for(var i=0;i<temp.length;i++)
         {
            res=res+temp[i];
            if(i!=(temp.length-1))
               res=res+chars;
         }
         return res;
    }

    function showTips(event,obj,imgUrl)
    {
            if(obj.value=="")
            {
                return;
            }
            var o=document.getElementById("vsb_hotword_tip");
            o.innerHTML="Loading...";
            o.style.display="";
            o.style.filter="Alpha(Opacity=40)"
            o.style.position="absolute";
            var l=tgetAbsLeft(obj);
            var t=tgetAbsTop(obj);
            o.style.left=l+obj.offsetWidth;
            o.style.top=t+obj.offsetHeight ;
            o.innerHTML="<img src='"+imgUrl+obj.value+"'>"
            o.style.filter="Alpha(Opacity=90)"
            o.style.position="absolute";
            o.style.left=l+16;
            o.style.top=t+16 ;
    }

    function  tgetAbsTop(e)
    {
          var   t=e.offsetTop;
          while(e=e.offsetParent)
              t += e.offsetTop;
          return t ;
    }

    function  tgetAbsLeft(e)
    {
          var   t=e.offsetLeft;
          while(e=e.offsetParent)
              t += e.offsetLeft;
          return t;
    }


    var isclosehotword=0;
    function setCloseHotwordFlag(flag)
    {
        isclosehotword=flag;
    }
    function picPreview(ev,obj,imagePath)
    {
        setCloseHotwordFlag(1);
        var imageName = obj.value;
        if(imagePath && imageName && imageName!="" && imagePath!="")
        {

            var isrc="";
            if(beginWith(imageName,"/_mediafile"))
            {
                isrc =  imageName;
            }else
            {
                isrc =  imagePath + imageName;
            }

            var image=new Image();
            image.src=isrc;

            var bw = 160;
            var bh = 120;

            var real_width = bw;
            var real_height = bh;

            var w = image.width;
            var h = image.height;
            var sw,sh;

            if ((w>bw)||(h>bh))
            {
                var nw = bw/w;
                var nh = bh/h;
                if (nw>nh)
                {
                    sh = bh;
                    sw = w*nh;
                }else
                {
                    sw = bw;
                    sh = h*nw;
                }
            }else
            {
                sw = w;
                sh = h;
            }


            real_width=sw;
            real_height=sh;

            var qk="【<a href=\"javascript:;\" style='color:blue;text-decoration:underline' onclick=\"javascript:$('wbpictitle').value='';$('tooltip').style.display='none'\" >清空</a>】";
            var cx="【<a href=\"javascript:;\" style='color:blue;text-decoration:underline' onclick=\"selectPicTitle('<%=mediaid%>')\" >重新选择</a>】";
            var divinnerHTML="<table width=160 border=0 style='background-color:#F5F5E0'><tr><td></td></tr><tr><td align=center>";
            divinnerHTML+="<img src=\""+isrc+"\" width=\""+real_width+"\" height=\""+real_height+" onmouseover=\"setCloseHotwordFlag(1);$('tooltip').style.display='none'\" onmouseout=\"setCloseHotwordFlag(0)\"></img>";
            divinnerHTML+="</td></tr>";
            divinnerHTML+="<tr><td>"+qk+"&nbsp;"+cx+"</td></tr></table>";

            tooltip(divinnerHTML);
            getmouseposition(ev);
        }

    }


    function newelement(newid)
    {
        if(document.createElement)
        {
            var el = document.createElement('div');
            el.id = newid;

            el.style.display = 'none';
            el.style.position = 'absolute';

            el.innerHTML = ' ';
            document.body.appendChild(el);
        }
    }

    function getmouseposition(e)
    {
        if(document.getElementById)
        {
            var offsetx = 30; //距离鼠标左右位置 正向右 负向左
            var offsety =  0; //距离鼠标上下位置 正向下 负向上
            var ie5 = (document.getElementById && document.all);
            var ns6 = (document.getElementById && !document.all);
            var ua = navigator.userAgent.toLowerCase();
            var isapple = (ua.indexOf('applewebkit') != -1 ? 1 : 0);
            var iebody=(document.compatMode &&
            document.compatMode != 'BackCompat') ?
            document.documentElement : document.body;
            pagex = (isapple == 1 ? 0:(ie5)?iebody.scrollLeft:window.pageXOffset);
            pagey = (isapple == 1 ? 0:(ie5)?iebody.scrollTop:window.pageYOffset);
            mousex = (ie5)?event.x:(ns6)?clientX = e.clientX:false;
            mousey = (ie5)?event.y:(ns6)?clientY = e.clientY:false;

            var lixlpixel_tooltip = document.getElementById('tooltip');
            lixlpixel_tooltip.style.left =(mousex+pagex+offsetx) + 'px';
            lixlpixel_tooltip.style.top =(mousey+pagey+offsety) + 'px';
        }
    }

    function tooltip(tip)
    {
        if(!document.getElementById('tooltip')) newelement('tooltip');
        var lixlpixel_tooltip = document.getElementById('tooltip');
        lixlpixel_tooltip.innerHTML = tip;
        lixlpixel_tooltip.style.display = 'block';
        lixlpixel_tooltip.style.filter="Alpha(Opacity=90)"
        lixlpixel_tooltip.style.position="absolute";
        //document.onmousemove = getmouseposition;
        lixlpixel_tooltip.onmouseover=function(){isclosehotword=1;setTimeout("eventHandler()",250);};
        lixlpixel_tooltip.onmouseout=function(){isclosehotword=0;setTimeout("eventHandler()",250);};
    }

    function eventHandler()
    {
        var o=document.getElementById("tooltip");
        if(!o)
        {
            return;
        }

        if(isclosehotword==0)
        {
            o.style.display="none";
        }
    }

    function exit()
    {
        setCloseHotwordFlag(0);
        setTimeout("eventHandler()",250);

        //document.getElementById('tooltip').style.display = 'none';
    }


    function Attachment()
    {
            var mt = document.getElementById("sitepublislist");
            var mf = document.detailform.sitepublishvalue.value;
            var rown=mt.rows.length;

            for (var i=(parseInt(rown)-1);mt && i>=1;i--)
            {
                   var isdel = mt.rows[i].getAttribute("att");
                   if(isdel!= undefined && isdel=="del")
                   {
                        mt.deleteRow(i);
                    }
            }
            var realsitepublishvalue= getItemArray("realsitepublishvalue");
            if(mf!= undefined && mf!="" )
            {
                   var columns = mf.split("$");
                   for(var j=0;columns && j<columns.length;j++)
                   {
                        var isAdd = true;
                        var values = columns[j].split("#");
                        var owners= values[0];
                        var contents = values[1];
                        var o = owners.split("^");
                        var c = contents.split("^");

                        for(var count = 0; count < realsitepublishvalue.length; count++)
                        {
                            if(realsitepublishvalue[count].value == c[0])
                            {
                                isAdd = false;
                                break;
                            }

                        }
                        if(isAdd)
                        {
                            myrow=mt.insertRow(-1);
                            myrow.className="listContent";
                            myrow.setAttribute("att","del");
                            c1=myrow.insertCell();
                            c1.width="30";
                            c1.height="20";
                            c1.innerHTML="<input type='checkbox'  name='realsitepublishvalue' value='"+c[0]+"' checked>";
                            c2=myrow.insertCell();
                            c2.width="30%";
                            c2.height="20";
                            c2.innerHTML=o[1]+"  <span style='color:ff8000'>(新增)</span>";
                            c3=myrow.insertCell();
                            c3.width="60%";
                            c3.height="20";
                            c3.innerHTML=c[1];
                        }
                   }
            }
    }
    function sitepublish(treeid,contentid,newsid)
    {
       var returnValue = window.showModalDialog("/system/site/column/sitepublish.jsp?treeid="+treeid+"&contentid="+contentid+"&wbnewsid="+newsid,"window","help:no;status:no;scroll:no;dialogWidth:450px;dialogHeight:400px");
       if(returnValue != undefined)
       {
                document.detailform.sitepublishvalue.value = returnValue;
                Attachment();
          }

    }

    function textAreaLengthLimit(textareaobj,l)
    {
         var temp=textareaobj.value;
         var count=0;
         for(i = 0; i < temp.length; i++)
         {
            var size = temp.charCodeAt(i) > 255 ? 2 : 1;
            count += size;
         }

         if(count>l*2)
         {
             top.showAlert(window,"您输入的字符长度超过"+l+",点确定系统会自动截取");
         }
         textareaobj.value=fixstringlen(textareaobj.value, l * 2);
    }

    function lookauditinfo(keyid,isJBPM)
    {
        var owner =document.getElementById("owner").value;
        if(isJBPM)
        {
            top.showDialog(window,{
                'title': '审核记录', 
                'url': '/system/portal/news/showauditinfo.jsp?uuid='+keyid+'&owner='+owner,
                'width': '640',
                'height': '300' 
           });
        }else
        {
             top.showDialog(window,{
                'title': '审核记录', 
                'url': '/system/_content/shenhe/showmodolnote.jsp?newsid='+keyid,
                'width': '260',
                'height': '190' 
           });
        }
    }
    function lookauditinfo_2(pid,keyid,isJBPM)
    {
        var owner =document.getElementById("owner").value;
        if(isJBPM)
        {
             top.showDialog(window,{
                'title': '审核记录', 
                'url':'/system/portal/news/showauditinfo.jsp?uuid='+keyid+'&pid='+pid+'&owner='+owner,
                'width': '640',
                'height': '300' 
           });
        }else
        {
             top.showDialog(window,{
                'title': '审核记录', 
                'url': '/system/_content/shenhe/showmodolnote.jsp?newsid='+keyid+'&pid='+pid,
                'width': '260',
                'height': '190' 
           });
        }
    }
    function activateTab1()
    {

        //document.getElementById("tab1").style.display="";
        //document.getElementById("tab0").style.display="none";

    }
    function imageManager(wbnewsid,owner)
    {
        if(wbnewsid<1)
        {
            top.showAlert(window,"请先保存文章!");
            return;
        }
        var returnValue = window.showModalDialog("/system/site/column/news/newsfilemanager.jsp?owner="+document.getElementById("owner").value+"&newsid="+wbnewsid,"window","help:no;status:no;dialogWidth:800px;dialogHeight:460px");
        if(returnValue != null)
        {
        }
    }

    function doNewsVote(owner,wbnewsid)
    {
         top.showDialog(window,{
                'title': '管理投票', 
                'url': "/system/site/column/news/vote/index.jsp?owner="+document.getElementById("owner").value+"&wbnewsid="+wbnewsid,
                'arguments':new Array(window),
                'width': '600',
                'height': '460' 
           });
    }

    function addlimit(wbnewsid)
    { 
        var owner=document.getElementById("owner").value;
         top.showDialog(window,{
                'title': '选择用户', 
                'url': "/system/site/column/news/selectlimituser.jsp?owner="+owner+"&newsid="+wbnewsid+"&limitrole="+document.getElementById("limitrole").value+"&limituser="+document.getElementById("limituser").value,
                'arguments':new Array(window),
                'callbackFun':function(returnValue)
                    {
                       if(returnValue)
                        {
                            if(returnValue=="clear")
                            {
                                document.getElementById("rolesid").innerHTML="";
                                document.getElementById("usersid").innerHTML="";
                                document.getElementById('limitrole').value="";
                                document.getElementById('limituser').value="";
                                return;
                            }
                            var rolesstr="";
                            var usersstr="";
                            //解析显示模式
                            var usersarray=returnValue.split("$");
                            document.getElementById('limitrole').value="";
                            document.getElementById('limituser').value="";
                            for(var i=0;i<usersarray.length;i++)
                            {
                                var s=usersarray[i].split(":");
                                if(s[0]=="roles")
                                {
                                    rolesstr+=s[2]+";";
                                    document.getElementById('limitrole').value+=s[2]+";";
                                }
                                else if(s[0]=="users")
                                {
                                    s=usersarray[i].split(":");
                                    usersstr+=s[2]+";";
                                    document.getElementById('limituser').value+=s[2]+";";
                                }
                            }
                            if(rolesstr!="")
                            {
                                document.getElementById("rolesid").innerHTML="指定角色："+rolesstr;
                            }
                            if(usersstr!="")
                            {
                                document.getElementById("usersid").innerHTML="指定会员："+usersstr;
                            }
                        }
                    },
                'width': '400',
                'height': '460' 
           });
    }

    function clicklimit(obj)
    {
           if(obj.checked)
           {
                  //判断文章是不是有投递
            var contentDiv;
            try{
                contentDiv =  document.getElementById("deliverinfo").contentWindow.document.getElementById("containerdiv");     
            }catch(e){}
           if(!!contentDiv){
                var hasOtherSite = false;
                var children = contentDiv.getElementsByTagName("table");
                for(var i=0; i<children.length;i++){
                    var tabObj = children[i];
                    if(tabObj.getAttribute("name")=="otherowner"){
                        hasOtherSite = true;
                        break;
                    }
                }
                if(hasOtherSite)
                {
                    top.showConfirm(window,"本文已经设置投递到其他站点，其他站点的访问控制可能会丢失，确定要添加访问控制？",function(r){
                        if(r)
                        {
                            document.getElementById("visitbutton").removeAttribute("disabled");
    		               $("#visitbutton").css("background-image","url(/system/images/btn_tjfwcy.gif)"); 
                        }
                    });
                }else{
                    document.getElementById("visitbutton").removeAttribute("disabled");
                    $("#visitbutton").css("background-image","url(/system/images/btn_tjfwcy.gif)"); 
                }
           }
       }else
       {
            document.getElementById("visitbutton").disabled=true;
    		$("#visitbutton").css("background-image","url(/system/images/btn_tjfwcy_n.gif)");
            document.getElementById("rolesid").innerHTML="";
            document.getElementById("usersid").innerHTML="";
            document.getElementById('limitrole').value="";
            document.getElementById('limituser').value="";
    	}
    }

    function getIpSelectHTML(newsid)
    {
        PortalUtil.getIpSelectHTML(newsid,document.getElementById("owner").value,function (data)
        {
            document.getElementById("_ipselect").innerHTML=data;
        })
    }
    function selectnewstag()
    {
         var owidth  = 830;
        //修改chrome 不同版本下打开宽度不一样的问题
        if(VsbBrowser.chrome && VsbBrowser.chrome==37)
        {
            owidth = 840;
        }
         top.showDialog(window,{
                'title': '选择标签', 
                'url': "/system/site/column/news/newstag/selecttag.jsp?owner="+document.getElementById("owner").value+"&newsid="+document.getElementById("wbnewsid").value,
                'arguments':new Array(window),
                'callbackFun':function(returnValue)
                    {
                        if(returnValue != null&&returnValue!=undefined)
                        {
                            document.getElementById('wbnewstagid').value = "";
                            document.getElementById('wbnewstagname').value = "";
                            var _temp_name = "";
                            var _temp_tagid = "";
                            for(var i=0;i<returnValue.length;i++)
                            {
                                 var tagname = returnValue[i]["tagname"];
                                 var tagid = returnValue[i]["value"];
                                 _temp_name+=tagname+"  ";
                                 _temp_tagid+=tagid+";";
                            }
                            document.getElementById('wbnewstagid').value = _temp_tagid;
                            document.getElementById('wbnewstagname').value = _temp_name;
                            newstagary = returnValue;
                        }
                                    },
                'width': owidth,
                'height': '500' 
           });
        
    }

    function refreshPage(thevalue,newsid)
    {
        if(thevalue)
        {
            if(thevalue[0])
            {
                   if(thevalue[1])
                   {
                        window.location.href="/system/portal/news/pagepic/addpagepicnews.jsp?wbnewsid="+newsid+"&owner="+document.getElementById("owner").value+"&wbcontentid="+document.getElementById("wbcontentid").value+"&postion="+document.getElementById("postion").value;
                    }else
                    {
                        window.location.href="/system/portal/news/addnews.jsp?wbnewsid="+newsid+"&owner="+document.getElementById("owner").value+"&wbcontentid="+document.getElementById("wbcontentid").value+"&postion="+document.getElementById("postion").value;
                    }
            }
        }
    }
    var childmod=false;
    function setChildMode(modeBoolean)
    {
        childmod=modeBoolean;
    }
    var isstatisticsnumsprocessing=false;
    function statisticsnums(obj,showobj)
    {
        if(!isstatisticsnumsprocessing)
        {
            isstatisticsnumsprocessing=true;
            setTimeout("_statisticsnumstime('"+obj+"','"+showobj+"')",300);
        }

    }
    function _statisticsnumstime(obj,showobj)
    {
        $("#"+showobj).html($("#"+obj).val().length+"字");
        isstatisticsnumsprocessing = false;
    }

    var getkeywordtimer;
    function statistickeyword()
    {
    	if(getkeywordtimer)
    	{
    		clearTimeout(getkeywordtimer)
    	}
    	getkeywordtimer= setTimeout("getKeywords()",500);
    }

    function getKeywords()
    {
    	if(!document.getElementById("autofillkeywordcheckbox").checked)
    	{
    		return;
    	}
    	var str = document.getElementById("wbtitle").value;
        if(str == "")
        {
           // document.getElementById("wbtitle").focus();
            return;
        }
        GBKAnalyzer.parserGBKPhrase(document.getElementById("wbtitle").value,callparserGBKPhrase);

    }

    function showauditlist(newsid)
    {
    	SetupModalWin("showauditinfo.jsp?newsid="+newsid,'640px','300px',0,0,'')
    }

    function setcontentid(id)
    {
    	var iframes ;
    	var id;
    	if(!_isPCEditor)
    	{
    	    iframes = document.getElementsByName("ueditor_subcontent_m");
    	    id = $("#wbmobileformat").val();
    	}else{
    	    iframes = document.getElementsByName("ueditor_subcontent");
    	    id = $("#wbformat").val();
    	}
    	for(var i=0;i<iframes.length;i++)
        {
    		$(iframes[i].contentWindow.document.body).attr("id","vsb_content_"+id);
    	}
    }

    function setcssfile(css1)
    {
    	var iframes ;
    	var css1;
    	if(!_isPCEditor)
    	{
    	    iframes = document.getElementsByName("ueditor_subcontent_m");
    	     css1 = $("#mobilecssfile").val();
    	}else{
    	    iframes = document.getElementsByName("ueditor_subcontent");
    	     css1 = $("#cssfile").val();
    	}
    	for(var i=0;i<iframes.length;i++)
    	{
    		try
    		{
    			var doc = iframes[i].contentDocument||iframes[i].document;
    			var csslink = doc.getElementById("thecss");
    			csslink.href = css1;
    		}catch(e)
    		{
    			var csslink = iframes[i].contentWindow.document.getElementById("thecss");
    			csslink.href = css1;
    		}
    	}
    }

    function moreTitle()
    {
    	var ismoretitle = $("#ismoretitle").val();
    	if(ismoretitle=="no")
    	{
    		$("#ismoretitle").val("yes");
    		$("#forwardtitletr").css("display","");
    		$("#subtitletr").css("display","");
    		$("#keywordtr").css("display","");
            $("#tagtr").css("display","");
    		$("#summarytr").css("display","");
    		$("#contenttiletr").css("display","");
    	}else{
    		$("#ismoretitle").val("no");
    		if($("#wbforwardtitle").val()=="")
    		{
    			$("#forwardtitletr").css("display","none");
    		}
    		if($("#wbsubtitle").val()=="")
    		{
    			$("#subtitletr").css("display","none");
    		}
    		if($("#wbkeyword").val()=="")
    		{
    			$("#keywordtr").css("display","none");
    		}
            if($("#tagtr").val()=="")
            {
                $("#tagtr").css("display","none");
            }
    		if($("#wbsummary").val()=="")
    		{
    			$("#summarytr").css("display","none");
    		}
    		//if(getSmallEditor()=="")
    		//{
    			$("#contenttiletr").css("display","none");
    		//}

    	}

    }
    var _fixHeightTimer;
    function fixHeight()
    {
        clearTimeout(_fixHeightTimer)
        _fixHeightTimer = setTimeout(function(){
            var minHeight = 400;
            var headerHeight = 100;
            var footerHeight = 80;

            var subpageiframes = document.getElementsByName("ueditor_subcontent");
            if(!_isPCEditor)
            {
                subpageiframes =  document.getElementsByName("ueditor_subcontent_m");
            }

            for(var i=0;i<subpageiframes.length;i++)
            {
                var iframe = subpageiframes[i];
                var doc = iframe.contentWindow.document||iframe.document||iframe.contentDocument;
                //var h = Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight);
                var h = doc.body.scrollHeight;
                if((UE.browser.ie && UE.browser.ie9above)|| UE.browser.gecko)
                {
                    subpageiframes[i].style.height = minHeight+"px";
                    h = doc.documentElement.scrollHeight;
                }else if(UE.browser.webkit){
                    subpageiframes[i].style.height = minHeight+"px";
                    h = doc.body.scrollHeight;
                }

                if(h<minHeight)
                {
                    subpageiframes[i].style.height = minHeight+"px";
                    subpageiframes[i].parentNode.style.height = minHeight+"px";
                    subpageiframes[i].parentNode.parentNode.style.height = (headerHeight+footerHeight+minHeight)+"px";
                }else{
                    subpageiframes[i].style.height = h+"px";
                    subpageiframes[i].parentNode.style.height = h+"px";
                    subpageiframes[i].parentNode.parentNode.style.height = (headerHeight+footerHeight+h)+"px";
                }
            }
        },100);
    }
    function hideButton()
    {
    	var btns = ['deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols','print', 'searchreplace','superscript', 'subscript', 'cleardoc', 'anchor',  'insertframe','insertcode','pdf','swf'];

    	if($("#hidebutton").val()=="yes")
    	{
    		$("#hidebutton").val("no");

    		$(".edui-for-more>div").css("background-color","");
    		$(".edui-for-more").css("border","1px solid #f4f6f7");
    		for(var i=0;i<btns.length;i++)
    		{
    			$(".edui-for-"+btns[i]+">div").css("display","none");
    		}
    	}else{
    		$("#hidebutton").val("yes");
    		$(".edui-for-more>div").css("background-color","#fff5d4");
    		$(".edui-for-more").css("border","1px solid #dcac6c");
    		for(var i=0;i<btns.length;i++)
    		{
    			$(".edui-for-"+btns[i]+">div").css("display","");
    		}
    	}

    }

    function ueditroImportWord()
    {
    	importwordfull($("#owner").val(), '/system/_owners/'+$("#ownername").val()+'/_webprj'+$("#wbrelativepath").val());
    }
    function ueditorImportWord2Flash()
    {
        importword2flash($("#owner").val(), '/system/_owners/'+$("#ownername").val()+'/_webprj'+$("#wbrelativepath").val(), $("#wbrelativepath").val())
    }
    function ueditorImportWord2PDF()
    {
    	importword2pdf($("#owner").val(), '/system/_owners/'+$("#ownername").val()+'/_webprj'+$("#wbrelativepath").val());
    }
    function getIFrameDOM(id) {
        return document.getElementById(id).contentDocument || document.frames[id].document||document.getElementById(id).contentWindow.document;
    	//return document.frames[id].document;
    }


    function ueditorInsertPage(title,id,order)
    {
                var containerStyle =  isMobileStyle?"mobilecontainer":"pagecontainer";
                if(order)
    	    	{
    	    		order = order-0;//转int
    	    	}
    	    	$("#contentholder").append("<div class=\""+containerStyle+"\" name=\"pccontainer\"></div>");
    	    	$("."+containerStyle+":last").append('<div style="float:left;width:100%;height:100px">'+
                                                    '<div class="headerwithbg" style="height:100px;background-color:white;width:100%;float:left">'+
    													'<div class="closesubpage" title="删除分页" onmouseover="sethover(this)" onmouseout="clearhover(this)" onclick="deletePage(this,'+(id?id:0)+')"><img src="/system/images/ico_scby.gif">删除本页</div>'+
    													'<div class="upaddsubpage" title="向上合并" onmouseover="sethover(this)" onmouseout="clearhover(this)" onclick="addtoprevsubpage(this.parentNode.parentNode.parentNode,'+(id?id:0)+')"><img src="/system/images/ico_xshb.gif">向上合并</div>'+
    													'<div class="upmovesubpage" title="上移此页" onmouseover="sethover(this)" onmouseout="clearhover(this)" onclick="upsubpage(this)"><img src="/system/images/ico_xsyd.gif">向上移动</div>'+
                                                        '<img src="/system/images/northwest.png" style="float:left;width:30px;margin-top:70px;margin-left:50px">'+													
    													'<div class="ueditor-header-pagenum">当前第<span class="ueditor-pageheader-index" name="pc">1</span>页&nbsp&nbsp共<span class="ueditor-pageheader-total">1</span>页</div>'+
    													'<div class="ueditor-page-header" ><div class="page-header-wrapper"><input style="display:'+(isMobileStyle?"none":"")+';" type="text" name="wbpagetitle" class="title" onfocus="clearsubpagetitle(this)" onblur="setsubpagetitle(this)" maxlength=255 value="'+(title!=''?title:'点此输入当前页标题')+'"><textarea  style="display:none" name="wbsubcontent"></textarea><INPUT type="hidden"  name=wbnewspageid value="'+(id?id:0)+'"></div></div>'+
                                                    '</div>'+
                                                '</div>');
                $("."+containerStyle+":last").append('<div class="edui-editor-iframeholder" style="height:400px"><iframe id="subpage_'+(order?order:pagenum)+'" name="ueditor_subcontent" style="height:100%" class="mainiframe" scrolling="no" frameborder="0"></iframe></div>');
    	        $("."+containerStyle+":last").append('<div style="float:left;width:100%;height:80px;">'+
                                                    '<div class="footerwithbg" style="height:80px;background-color:white;width:100%;float:left">'+
    													'<div class="ueditor-insertpage" onmouseover="sethover(this)" onmouseout="clearhover(this)" onclick="appendueditorpage(this.parentNode.parentNode.parentNode)"><img src="/system/images/ico_tjfy.gif">添加分页</div>'+
    													'<div class="downaddsubpage" title="向下合并" onmouseover="sethover(this)" onmouseout="clearhover(this)" onclick="addtonextsubpage(this.parentNode.parentNode.parentNode,'+(id?id:0)+')"><img src="/system/images/ico_xxhb.gif">向下合并</div>'+
    													'<div class="downmovesubpage" title="下移此页" onmouseover="sethover(this)" onmouseout="clearhover(this)" onclick="downsubpage(this)"><img src="/system/images/ico_xxyd.gif">向下移动</div>'+
                                                        //'<img src="/system/images/southeast.png" style="float:right;width:30px;margin-top:0px;margin-right:-210px">'+
                                                        '<img src="/system/images/southwest.png" style="float:left;width:30px;margin-top:0px;margin-left:50px">'+
                                                    '</div>'+
                                                '</div>');
    }

    function ueditorInsertMobilPage(title,id,order)
    {
                if(order)
    	    	{
    	    		order = order-0;//转int
    	    	}
    	    	$("#contentholder").append("<div class=\"mobilecontainer\" name=\"mobilcontainer\" style=\"display:none\"></div>");
    	    	$(".mobilecontainer:last").append('<div style="float:left;width:100%;height:100px">'+
                                                    '<div class="headerwithbg" style="height:100px;background-color:white;width:100%;float:left">'+
    													'<div class="closesubpage" title="删除分页" onmouseover="sethover(this)" onmouseout="clearhover(this)" onclick="deletePage(this,'+(id?id:0)+')"><img src="/system/images/ico_scby.gif">删除本页</div>'+
    													'<div class="upaddsubpage" title="向上合并" onmouseover="sethover(this)" onmouseout="clearhover(this)" onclick="addtoprevsubpage(this.parentNode.parentNode.parentNode,'+(id?id:0)+')"><img src="/system/images/ico_xshb.gif">向上合并</div>'+
    													'<div class="upmovesubpage" title="上移此页" onmouseover="sethover(this)" onmouseout="clearhover(this)" onclick="upsubpage(this)"><img src="/system/images/ico_xsyd.gif">向上移动</div>'+
                                                        '<img src="/system/images/northwest.png" style="float:left;width:30px;margin-top:70px;margin-left:50px">'+
    													'<div class="ueditor-header-pagenum">当前第<span class="ueditor-pageheader-index" name="mobil">1</span>页&nbsp&nbsp共<span class="ueditor-pageheader-total">1</span>页</div>'+
    													'<div class="ueditor-page-header"><div class="page-header-wrapper"><!--input type="text" name="wbpagetitle" class="title" onfocus="clearsubpagetitle(this)" onblur="setsubpagetitle(this)" maxlength=255 value="'+(title!=''?title:'点此输入当前页标题')+'" --><textarea  style="display:none" name="wbsubcontent_m"></textarea><INPUT type="hidden"  name=wbnewspageid_m value="'+(id?id:0)+'"></div></div>'+
                                                    '</div>'+
                                                '</div>');
                $(".mobilecontainer:last").append('<div class="edui-editor-iframeholder" style="height:400px"><iframe id="subpage_'+(order?order:pagenum)+'" name="ueditor_subcontent_m" style="height:100%" class="mainiframe" scrolling="no" frameborder="0"></iframe></div>');
    	        $(".mobilecontainer:last").append('<div style="float:left;width:100%;height:80px;">'+
                                                    '<div class="footerwithbg" style="height:80px;background-color:white;width:100%;float:left">'+
    													'<div class="ueditor-insertpage" onmouseover="sethover(this)" onmouseout="clearhover(this)" onclick="createmobilappendpage(this.parentNode.parentNode.parentNode)"><img src="/system/images/ico_tjfy.gif">添加分页</div>'+
    													'<div class="downaddsubpage" title="向下合并" onmouseover="sethover(this)" onmouseout="clearhover(this)" onclick="addtonextsubpage(this.parentNode.parentNode.parentNode,'+(id?id:0)+')"><img src="/system/images/ico_xxhb.gif">向下合并</div>'+
    													'<div class="downmovesubpage" title="下移此页" onmouseover="sethover(this)" onmouseout="clearhover(this)" onclick="downsubpage(this)"><img src="/system/images/ico_xxyd.gif">向下移动</div>'+
                                                        '<img src="/system/images/southwest.png" style="float:left;width:30px;margin-top:0px;margin-left:50px">'+
                                                    '</div>'+
                                                '</div>');
    }

    function setupSubPage(doc,content,ismobile) {
        var browserver = $.browser.version;
        var wbformatid = document.getElementById("wbformat").value;
        var cssfilepath = document.getElementById("cssfile").value;
        if(ismobile)
        {
            wbformatid = document.getElementById("wbmobileformat").value;
            cssfilepath = document.getElementById("mobilecssfile").value;
        }
        browserver = browserver-0;
        var useBodyAsViewport = $.browser.ie && browserver < 9;
        doc.open();
        doc.write( '<!DOCTYPE html>' +
            '<html xmlns="http://www.w3.org/1999/xhtml"' + (!useBodyAsViewport? ' class="view"' : '')  + '><head>' +
            '<link id="thecss" rel="stylesheet" type="text/css" href="" />'+
            '<style id="editorinitialstyle" type="text/css">' +
    		'.anchorclass{background: url(\'/system/resource/images/anchor.gif\') no-repeat scroll left center transparent;border: 1px dotted #0000FF;cursor: auto;display: inline-block;height: 16px;width: 15px;}'+
            //这些默认属性不能够让用户改变
            //选中的td上的样式
            '.selectTdClass{background-color:#3399FF !important;}' +
            'table.noBorderTable td{border:0px dashed #ddd !important}'+
            //插入的表格的默认样式
            'table{clear:both;margin-bottom:10px;border-collapse:collapse;word-break:break-all;}' +
    		'td{border:1px solid #ddd}'+
            //分页符的样式
            '.pagebreak{display:none;clear:both !important;cursor:default !important;width: 100% !important;margin:0;}' +
            //锚点的样式,注意这里背景图的路径
             //设置四周的留边
            '.view{padding:0;/*word-wrap:break-word;*/word-break:break-all;cursor:text;height:100%;}\n' +
            //设置默认字体和字号
            'body{margin-left:80px;margin-right:80px;margin-bottom:0px;margin-top:0px;font-family:"宋体";font-size:14px;/*word-wrap:break-word;*/word-break:break-all;cursor:text}' +
            //针对li的处理
            'li{clear:both}' +
            //设置段落间距
            'p{margin:5px 0;}'+
            '</style>'+
            '<link href="/system/resource/style/ueditor/olul.css" type="text/css" rel="stylesheet" />'+
            (cssfilepath=="" ?'':'<link rel="stylesheet" type="text/css" href="'+ cssfilepath + '"/>'+
            '<link id="thecss" rel="stylesheet" type="text/css" href="' + cssfilepath + '"/>')+
    		'</head><body id="vsb_content_'+wbformatid+'" style="height:380px"  onkeydown="parent.fixHeight()" onclick="parent.fixHeight()" onpropertychange="parent.fixHeight()" ' + (useBodyAsViewport ? ' class="view"' : '')  + '><p></p></body></html>');
    	    doc.close();
    	    ueditor.document = doc;
    	    ueditor.window = doc.defaultView || doc.parentWindow;
    	    ueditor.iframe = ueditor.window.frameElement;
    	    ueditor.body = doc.body;
    	    doc.body.contentEditable = true;
    	    ueditor.selection = new baidu.editor.dom.Selection(doc);
    	    ueditor._initEvents();
    	    //为了分页也能初始化各种插件功能，比如粘贴选项
    	    ueditor.fireEvent("ready");
    		if(content)
    		{
    			ueditor.setContent(content);
    		}
    }


    function focusEditor(doc,docwindow,dociframe)
    {
        //防止重入
        if(doc == ueditor.document)
            return;
        ueditor.document = doc;
        ueditor.window = docwindow;
        ueditor.iframe = dociframe;
        ueditor.body = doc.body;
        doc.body.contentEditable = true;
        ueditor.selection = new baidu.editor.dom.Selection(doc);
        ueditor.fireEvent('wordcount');

        var index =  $("iframe[name='ueditor_subcontent']").index(dociframe) ;
        if(!_isPCEditor){
            index = $("iframe[name='ueditor_subcontent_m']").index(dociframe) ;
        }
        onfocuspage(index);
    }
    //注册分页获取光标后编辑器可编辑区的切换
    function addEditorListener(doc)
    {
        var docwindow = doc.defaultView || doc.parentWindow;
        var dociframe = docwindow.frameElement;
        if(doc.body.attachEvent){
            doc.body.attachEvent("onfocus", function(){/*先获取光标所在的分页*/focusEditor(doc,docwindow,dociframe);});
        }else{
            doc.body.addEventListener("focus", function(){/*先获取光标所在的分页的doc*/focusEditor(doc,docwindow,dociframe);}, false);
        }
    }

    function setFirstPage2Editor()
    {
        var doc = getIFrameDOM("baidu_editor_0");
    	ueditor.document = doc;
        ueditor.window = doc.defaultView || doc.parentWindow;
        ueditor.iframe = ueditor.window.frameElement;
        ueditor.body = doc.body;
        doc.body.contentEditable = true;
        ueditor.selection = new baidu.editor.dom.Selection(doc);
    }

    //删除分页
    function deletePage(o,delid,isDeleteAll)
    {
    	var pagecontainer ;
    	if(!isDeleteAll)
    	{
            top.showConfirm(window,"删除此分页？",function(r){
                if(r){
                    pagecontainer = o.parentNode.parentNode.parentNode;
                    var contentholder = pagecontainer.parentNode;

                    //清空内容, 以免flash出现 __flash__removeCallback 错误
                    var iframe = $(pagecontainer).find(".mainiframe")[0];
                    var doc= iframe.contentWindow.document||iframe.document||iframe.contentDocument;
                    var olddoc = ueditorswitchtodoc(doc);
                    ueditor.setContent("");
                    ueditorswitchtodoc(olddoc);

                    contentholder.removeChild(pagecontainer);

                    if(delid!=0)
                    {
                        $("#delpage").val($("#delpage").val()+delid+";");
                    }
                    if(isDeleteAll){
                        _pagenum_m--;
                        $("#ueditortotalpagenum").html(pagenum+1);
                        if(currentulpos*5>pagenum)
                        {
                            currentulpos--;
                        }
                    }else{
                        if(_isPCEditor)
                        {
                            pagenum--;
                            $("#ueditortotalpagenum").html(pagenum+1);

                            if(pagenum==0&&$("#wbfirstpagetitle").val()=="点此输入当前页标题")
                            {
                                $("#wbfirstpagetitle").val("");
                            }
                            if(currentulpos*5>pagenum)
                            {
                                currentulpos--;
                            }
                        }else{
                            _pagenum_m--;
                            $("#ueditortotalpagenum").html(_pagenum_m+1);
                            if(currentulpos*5>_pagenum_m)
                            {
                                currentulpos--;
                            }
                        }
                    }

                    updateheaderpagenum();
                    updatepagelist();
                    fixHeight();
                    if(!isDeleteAll)
                    {
                        calcurrentpage();
                    }
                }
            });
        }else{
            pagecontainer = o;
            var contentholder = pagecontainer.parentNode;

            //清空内容, 以免flash出现 __flash__removeCallback 错误
            var iframe = $(pagecontainer).find(".mainiframe")[0];
            var doc= iframe.contentWindow.document||iframe.document||iframe.contentDocument;
           /* var olddoc = ueditorswitchtodoc(doc);chrome下ueditorswitchtodoc会出错    这里先直接innerhtml=“”试试
            ueditor.setContent("");
            ueditorswitchtodoc(olddoc);*/
            doc.body.innerHTML = "";

            contentholder.removeChild(pagecontainer);

            if(delid!=0)
            {
                $("#delpage").val($("#delpage").val()+delid+";");
            }
            if(isDeleteAll){
                _pagenum_m--;
                $("#ueditortotalpagenum").html(pagenum+1);
                if(currentulpos*5>pagenum)
                {
                    currentulpos--;
                }
            }else{
                if(_isPCEditor)
                {
                    pagenum--;
                    $("#ueditortotalpagenum").html(pagenum+1);

                    if(pagenum==0&&$("#wbfirstpagetitle").val()=="点此输入当前页标题")
                    {
                        $("#wbfirstpagetitle").val("");
                    }
                    if(currentulpos*5>pagenum)
                    {
                        currentulpos--;
                    }
                }else{
                    _pagenum_m--;
                    $("#ueditortotalpagenum").html(_pagenum_m+1);
                    if(currentulpos*5>_pagenum_m)
                    {
                        currentulpos--;
                    }
                }
            }

            updateheaderpagenum();
            updatepagelist();
            fixHeight();
            if(!isDeleteAll)
            {
                calcurrentpage();
            }
        }
    }

    function initSubpages()
    {
    	for(var i=0;i<pagenum;i++)
    	{
    		ueditorInsertPage(subpages[i].title,subpages[i].id,subpages[i].order);
    		var iframe = document.getElementById("contentholder").lastChild.firstChild.nextSibling.firstChild;
    		var doc= iframe.contentWindow.document||iframe.document||iframe.contentDocument;
    		setupSubPage(doc,subpages[i].content);
    		addEditorListener(doc);
    	}
    }
    function initMobilSubpages()
    {
    	for(var i=0;i<_pagenum_m;i++)
    	{
    		ueditorInsertMobilPage(subpages_m[i].title,subpages_m[i].id,subpages_m[i].order);
    		var iframe = document.getElementById("contentholder").lastChild.firstChild.nextSibling.firstChild;
    		var doc= iframe.contentWindow.document||iframe.document||iframe.contentDocument;
    		setupSubPage(doc,subpages_m[i].content,true);
    		addEditorListener(doc);
    	}
    }

    //当前页编号， base 0, 就是说 第一页编号是0 
    var currentpage = -1;

    //是否使用手机版编辑器的样式    单纯的手机版  逻辑上其实是走的普通版   但是表现是手机版   用此变量做区分
    var isMobileStyle = false;
    function init()
    {
         isMobileStyle =  ($("#firmtype").val()=="multi" && !_isPCEditor);
         _hasMobilContent= $("#wbautomobilecontent").val()==0;
        //ie7, ie9下 window卸载时去除flash会出问题
        if(UE.browser.ie && (UE.browser.version == 9 || (UE.browser.version == 7 && !document.documentMode)))
        {
            window.onbeforeunload = function ()
            {  
            	var iframes = document.getElementsByName("ueditor_subcontent");
            	for(var i = 0; i < iframes.length; i++)
            	{
                    iframes[i].contentWindow["__flash__removeCallback"] = function (instance, name) {
                        try {
                            if (instance) {
                                instance[name] = null;
                            }
                        } catch (flashEx) {}
                    };      		
        	    }
            }
        }
    	$("#showhideswitch").bind("click", switchExpandEditor);
        //统计字数  针对编辑文章的情况
        statisticsnums('wbtitle','wbtitlelength');
    	var isexpandtitle = $.cookie('ueditorexpandtitle');
    	if(isexpandtitle == "1")
    	{
    	    setExpandEditor(true, false);
    	}
    	//Wzq如果是空的话  setContent后编辑器里面会多一个空P
    	if($("#wbcontent").val() !="")
    	{
    	    ueditor.setContent($("#wbcontent").val());    
         }
        
    	hideButton();
        
    	//$("#wbsummarylength").html($("#wbsummary").val().length+"字");
    	
    	//标题的粗体，斜体，颜色
    	initTitleStyle();
    	//分页
    	initSubpages();
    	initMobilPages();
    	$("#ueditortotalpagenum").html(pagenum+1);
    	//一键排版的id和css
    	setcontentid($("#wbformat").val());
        setcssfile($("#cssfile").val());
    	getShowName();
        setTimeout(resize,1000);
    	updateheaderpagenum();
    	ueditor.addListener('contentchange', fixHeight);
    	ueditor.addListener('keyup', fixHeight);
    	ueditor.addListener('mouseup', fixHeight);


    	//创建工具条遮罩
        initToobarMask();
        //titlediv 下的所有input 都具有屏蔽工具栏的属性
        $("#titlediv :input").bind("focus", disableToolbar);
        $("#titlediv :input").bind("blur", enableToolbar);
        $("input[name=wbpagetitle]").bind("focus", disableToolbar);
        $("input[name=wbpagetitle]").bind("blur", enableToolbar);
    	
    	$("#filelist").html(attachtablehtml);
    	
    	$("#selectwblinkurlcheckbox").click(function(){
    		if($(this).attr("checked"))
    		{
    		    $(".pagecontainer").css("display","none");
    		    $(".mobilecontainer").css("display","none");
                $("#nocontenttip").css("display","");	
                $("#editorstatediv").css("display","none");
    		    $(".sidebar").css("display","none");
    		    $("#rightbottombar").css("display","none");
    		    $("#wblinkurl").removeAttr("disabled");
    		    $("#linkurladdspan").attr("onclick","");
    		    $("#linkurladdspan").click(selectlinkurl);
    		    $("#linkurladdspan").addClass("titlespanforhover");
    		    $("#wbsummary").width($("#wbkeyword").width());
    		}else{
    		    if(_isPCEditor){
            		    $(".pagecontainer").css("display","");
    		    }else{
    		        $(".mobilecontainer").css("display","");
    		    }
                $("#nocontenttip").css("display","none");
                var firmtype = $("#firmtype").val();
                if("multi" == firmtype)
                {
                    //隐藏切换工具条
                    $("#editorstatediv").show();
                    $("#edui1_title").css("margin-bottom","10px");
                }
    		    $(".sidebar").css("display","");
    	        $("#rightbottombar").css("display","");
    	        $("#wblinkurl").attr("disabled","true");
    	        $("#linkurladdspan").attr("onclick","");
    	        $("#linkurladdspan").unbind("click");
    	        $("#wblinkurl").val("");
    	        $("#linkurladdspan").removeClass("titlespanforhover");
    	        $("#wbsummary").width($("#wbkeyword").width());
    		}
    	});
    	ueditor.addListener("contentchange",ueditorgetsummary);
    	if($.browser.msie && ($.browser.version == "6.0") && !$.support.style)
    	{	
    		$(".main").width(document.documentElement.offsetWidth-$(".side").width()-10);
    	}
    	initEditorByFirmType();
    	changeButtonState();
    	if($("#wblinkurl").val()!="")
         {
             $(".pagecontainer").css("display","none");	
             $(".mobilecontainer").css("display","none");	
             $("#nocontenttip").css("display","");
             $("#editorstatediv").css("display","none");
    	     $(".sidebar").css("display","none");
    	     $("#rightbottombar").css("display","none");
    	     $("#wblinkurl").removeAttr("disabled");
    	     $("#linkurladdspan").attr("onclick","");
    	     $("#linkurladdspan").click(selectlinkurl);
    		 $("#linkurladdspan").addClass("titlespanforhover");
    		 $("#wbsummary").width($("#wbkeyword").width());
    		 $(".title-for-hide").css("display","");
             $(this).css("background-image","url(/system/images/ico_shousuo.png)");
             $("#wbsummary").width($("#wbkeyword").width());
             $.cookie('ueditorhidetitle','1');//这个不知道是干什么的  ,估计是后来cookie的key变了  这里没改
             $.cookie('ueditorexpandtitle','1');
         }
        //setTimeout(function(){focuspage(0, true);},500);
        focuspage(0, true);
        try
        {
            top.dialogFocus()
        }catch(e){}
        fixHeight();
        setTimeout(fixHeight,1000);
    }
    var currentExpandEditor = false;
    function switchExpandEditor()
    {
        setExpandEditor(!currentExpandEditor, true);
    }

    function selectlinkurl(){
         top.showDialog(window,{
                'title': '选择链接', 
                'url': "/system/site/selectfile/selectfile.jsp?&type=url",
                'arguments':new Array(window),
                'callbackFun':function(url)
                    {
                        if(url){
                    		$("#wblinkurl").val(url);
                    	}
                        $("#wbauthor").focus();
                    },
                'width': '640',
                'height': '500' 
           });    
    }

    function setExpandEditor(isexpand, savecookie)
    {
        if(currentExpandEditor == isexpand)
            return;

        if(isexpand)
        {
    		$(".title-for-hide").css("display","");
    		$("#showhideswitch").css("background-image","url(/system/images/ico_shousuo.png)");
    		$("#wbsummary").width($("#wbkeyword").width());
    		if(savecookie)
    		    $.cookie('ueditorexpandtitle','1');
        }
        else
        {
    		$(".title-for-hide").css("display","none");
    		$("#showhideswitch").css("background-image","url(/system/images/ico_zhankai.png)");
    		document.getElementById("contentdiv").scrollTop = 0;
    		if(savecookie)
        		$.cookie('ueditorexpandtitle','0');
        }

        currentExpandEditor = isexpand;      
    }



    function ueditorgetsummary()
    {
        if(ueditor.iframe.id == "baidu_editor_0"&&document.getElementById("autofillsummarycheckbox").checked)
        {
            getSummaryNoAlert(200);
        }
    }

    function initActiveXDisplay()
    {
        if(!$.browser.msie)
        {
            return;
        }
        $("#activeximgwrapper").click(function(){
             $("#activexcontent").show("slow");
        });
        $("#activexcontent").mouseleave(function(){
            $("#activexcontent").hide("slow");
        });

    }
    function initPagenumList()
    {
    	$("#ueditorpagenums").toggle(function(){$("#pagenumslist").css("display","block");},function(){$("#pagenumslist").css("display","none");});
    	$("#pagenumslist").mouseleave(function(){$("#pagenumslist").css("display","none")});
    }
    function initColorPicker()
    {

        $('#fontcolor').ColorPicker({
            color: $("#wbtitlecolor").val().split(":")[1],
            onShow: function (colpkr) {
                $(colpkr).fadeIn(500);
                return false;
            },
            onHide: function (colpkr) {
                $(colpkr).fadeOut(500);
                return false;
            },
            onChange: function (hsb, hex, rgb) {
                $("#wbtitlecolor").val("color:#"+hex);
                var cn=$("#fontcolor").attr("class");
                if(cn=="bottonup")
                {
                    if($("#wbtitlecolor").val()!="")
                    {
                        $("#fontcolor").attr("class","bottondown");
                    }
                }
                appTitleStyle();
            }
        });
    }

    function selectsubpage(o)
    {
    	var container = document.getElementById("contentholder");
    	if(o.style.backgroundColor == "")
    	{
    		var select  = document.createElement("select");
    		select.id = "subpageselect";
    		for(var i=0;i<pagenum+1;i++)
    		{
    			var option = new Option("第"+(i+1)+"页",i);
    			option.onclick=function(){gotoPage(this.value)};
    			select.options[i] = option;
    		}
    		container.appendChild(select);
    		o.style.backgroundColor = "grey";
    		o.style.border = "1px solid #999999";
    	}else if(o.style.backgroundColor == "grey")
    	{
    		var select = document.getElementById("subpageselect");
    		container.removeChild(select);
    		o.style.backgroundColor = "";
    		o.style.border = "";
    	}

    }




    $.fn.panel = function(){
        var close = this.children('div:first-child');
        var body = this.next();

        this.toggle(function(){
            close.attr('class','panel-top-right-left');
            body.show();
        },function(){
            close.attr("class","panel-top-right");
            body.hide();
        });
    }

    $.fn.panel2 = function(){
        var close = this.children('div:first-child');
        var body = this.next();

        this.toggle(function(){
    		close.attr("class","panel-top-right");
            body.slideDown();
            
        },function(){
            close.attr('class','panel-top-right-left');
            body.slideUp();
        });
    }

    var extitlemaxwidth = -1;

    function resize()
    {
        var h = 0,w = 0;
        if($.browser.msie||$.browser.mozilla)
        {
            h = document.documentElement.clientHeight;
            w = document.documentElement.clientWidth;
        }else
        {
            h = document.body.clientHeight;
            w = document.body.clientWidth;
        }
        $("#contentdiv").height(h-$("#edui1_bottombar").height()-$("#edui1_toolbarbox").height()-$(".top").height());
        //如果窗口整体宽度小于1015     会出现横向滚动条 这时 contentdiv高度就要减少一个滚动条的高度   16px
        if( w < 1015 )
        {
            $("#contentdiv").height(h-$("#edui1_bottombar").height()-$("#edui1_toolbarbox").height()-$(".top").height()-15);
        }else{
            $("#contentdiv").height(h-$("#edui1_bottombar").height()-$("#edui1_toolbarbox").height()-$(".top").height());
        }
        //Wzq  非IE contentdiv没有修复高度之前如果点击源码  会出现源码背景没有高度的bug   所以这里 判断下  如果已经有了背景div重新算高度   同理还有textarea
        var  holder = $("#contentdiv")[0];
        var sourceEditorBgDiv = document.getElementById("sourceEditorBgDiv");
        if(sourceEditorBgDiv)
        {
            sourceEditorBgDiv.style.cssText = 'width:82%;height:' + (holder.clientHeight-20) + 'px;background-color:#fff;margin-left:' + ((holder.clientWidth*9/100) - (18/2)) + 'px;moz-box-shadow: 4px 4px 10px #292929;-webkit-box-shadow: 4px 4px 10px #292929;box-shadow:4px 4px 10px #292929;';
        }
        var sourceEditorTextarea = document.getElementById("sourceEditorTextarea");
        if(sourceEditorTextarea)
        {
            sourceEditorTextarea.style.cssText = 'position:absolute;top:' + (holder.offsetTop + 20) + 'px;width:80%;height:' + (holder.clientHeight-40) + 'px;padding:10px ' + (holder.clientWidth/10) + 'px 10px ' + (holder.clientWidth/10) + 'px;background:transparent;border-style:none';
        }

        //添加判断  有滚动条的情况下才+15px
        if($("#contentdiv")[0].scrollHeight>$("#contentdiv")[0].clientHeight||$("#contentdiv")[0].offsetHeight>$("#contentdiv")[0].clientHeight)
        {
            $("#rightbottombar").css("right",(($("#contentholder").width()-$("#edui1_title").width())/2-60)/2+15);
        } else{
            $("#rightbottombar").css("right",(($("#contentholder").width()-$("#edui1_title").width())/2-60)/2);
        }

        
        $(".sidebar").css("left",(($("#contentholder").width()-$("#edui1_title").width())/2-71)/2);

        $("#wbsummary").width($("#wbkeyword").width());//ie6下某些情况textarea被撑大，所以写成固定宽度，与关键字等宽
        $("#extable").width($("#wbtitle").width() + 10);
        
        //设置扩展字段区域宽度
        var extitles = $(".ueexftdtitle");
        if(extitles != null && extitles.length != 0)
        {
            //计算最长的 扩展字段标题长度
            if(extitlemaxwidth == -1)
            {
                for(var i = 0; i < extitles.length; i++)
                {
                    if(extitles[i].scrollWidth > extitlemaxwidth)
                        extitlemaxwidth = extitles[i].scrollWidth;
                }
            }
            //第一阶段宽度, 对齐 wbsourcename
            var exwidth1 = $("#wbsourcename").width() + $("#wbsourcename").attr("offsetLeft");
            
            //第二阶段宽度, 对齐 wbtitle
            var exwidth2 = $("#wbtitle").width(); 
            
            //按第一阶段设置宽度
            var uetwidth = (exwidth1-352)/2 - 12;
            var uewidth = exwidth1 + 7;
            
            //宽度不够，则按第二阶段设置
            if(uetwidth < extitlemaxwidth)
            {
                uetwidth = (exwidth2-352)/2 - 12;
                uewidth = exwidth2 + 8;
            }
            
            //最低宽度 50
            if(uetwidth < 50)
                uetwidth = 50;
                
            //设置宽度
            $(".ueexftdtitle").width(uetwidth);
            $("#extable").width(uewidth);
        }  
        //设置编辑器切换div
        changeToolBarState();
    }



    function showHistory(isdraft,iscg)
    {
          var newsid=document.getElementById("wbnewsid").value;
          var auditing=document.getElementById("wbauditing").value;
          var owner=document.getElementById("owner").value;
          var treeid=document.getElementById("treeid").value;
           var title = iscg?"文章草稿历史":"更改记录";
           top.showDialog(window,{
                'title': title,
                'url': "/system/site/column/news/newshistory.jsp?owner="+owner+"&jsauth="+jsEditorAudit+"&newsposition="+newsposition+"&isdraft="+isdraft+"&newsid="+newsid+"&auditing="+auditing+"&randnum="+Math.random()+"&treeid="+document.getElementById("treeid").value,
                'arguments':new Array(window),
                'callbackFun':function(thevalue)
                    {
                          if(thevalue)
                          {
                                if(thevalue[0])
                                {
                                       if(thevalue[1])
                                       {
                                            window.location.href="/system/site/column/news/pagepic/addpagepicnews.jsp?wbnewsid="+newsid+"&wbspecialid="+document.getElementById("wbspecialid").value+"&wbspecialtypeid="+document.getElementById("wbspecialtypeid").value+"&backurl="+document.getElementById("backurl").value;
                                        }else
                                        {
                                            window.location.replace("/system/site/column/news/addnews.jsp?newsposition="+newsposition+"&wbnewsid="+newsid+"&wbspecialid="+document.getElementById("wbspecialid").value+"&wbspecialtypeid="+document.getElementById("wbspecialtypeid").value+"&backurl="+document.getElementById("backurl").value+"&wbcontentid="+document.getElementById("wbcontentid").value+"&owner="+owner+"&treeid="+treeid+"&isrestore=1");
                                        }
                                }
                          }
                    },
                'width': '500',
                'height': '200' 
           });
    	
    }
    function sltChange(obj)
    {
    	eval(obj.previousSibling.uniqueID+'.t.value=obj.value')
    	obj.previousSibling.previousSibling.value = obj.value;
    	obj.value = "";
    }
    function ifrmHTML(objid)
    {
    	return '<BODY style="margin: 0px;" onload="document.getElementById(\'t\').value=parent.document.getElementById(\'' + objid + '\').value"><input type="text" id="t" style="border: none;height:100%;width:100%;font-size: 12px;" onchange="parent.document.getElementById(\'' + objid + '\').value=this.value;"></body>'
    }

    function govdosave(op,newsposition)
    {
        var targetcolums = "";
        try
        {
            targetcolums = document.getElementById('deliverinfo').contentWindow.getselectvalues();
        }catch(e){}
        
    	if(ueditor.queryCommandState("source")==1)
    	{
    		top.showAlert(window,"源码编辑状态不可提交！")
    		return;
    	}    
        initsavegif();
        
    	setsavemastinfo("正在检查内容...");
        setTimeout(
            function()
            {
                govdosavecheck1(op, targetcolums);
            },
            10);
    }

    function govdosavecheck1(op, targetcolums)
    {
        
        var obj;
        //检测索引号
        obj = document.getElementById("wbindexed");
        if(ltrim(obj.value)=="")
        {
            hidesavemask();
            obj.focus();
            top.showAlert(window,"请输入索引号！");
            return;
        }

        obj = document.getElementById("wbpubmod");
        if(ltrim(obj.value)=="")
        {
            hidesavemask();
            top.showAlert(window,"请输入公开方式！");
            return;
        }


        //检测公开日期
        obj = document.getElementById("newdate");
        if(ltrim(obj.value)=="")
        {
            hidesavemask();
            obj.focus();
            top.showAlert(window,"请输入公开日期！");
            return;
        }

        //检测标题
        obj=document.getElementById("wbtitle");
        if(ltrim(obj.value)=="")
        {
            hidesavemask();
            obj.focus();
            top.showAlert(window,"请输入标题！");
            return;
        }
        
        //检测关键字
        obj=document.getElementById("wbkeyword");
        if(ltrim(obj.value)=="")
        {
            if(!document.getElementById("autofillkeywordcheckbox").checked)
            {
                hidesavemask();
                setExpandEditor(true, false);
                obj.focus();
                top.showAlert(window,"请输入关键字或选择自动提取。");
                return false;
            }
        }

        if(ltrim(obj.value).length>255)
        {
            hidesavemask();
            setExpandEditor(true, false);
            obj.focus();
            top.showAlert(window,"关键字长度不能超过255！");
            return;
        }

    	var pages = document.getElementsByName("ueditor_subcontent");
        if(document.getElementById("selectwblinkurlcheckbox").checked)
        {
            if($("#wblinkurl").val()=="")
            {
                hidesavemask();
                setExpandEditor(true, false);
                $("#wblinkurl")[0].focus();
                top.showAlert(window,"请输入或选择转向链接！");
                return false;
            }
            obj=document.getElementById("wbsummary");
            if(obj.value.length > 1000)
            {
               hidesavemask();
               setExpandEditor(true, false);
               obj.focus();
               top.showAlert(window,"摘要长度不能超过1000！")
               return;
            }
        }
        else
        {
            //判断资料来源
            obj = document.getElementById("wbsourcename");
            if(ltrim(obj.value)!="")
            {
                /* if(!/^[\u0080-\ufffd\-\w\'\.\s]+$/.test(obj.value))
                 {
                 hidesavemask();
                 top.showAlert(window,"资料来源只可以文字、字母、数字、空格、'、.、-与_组成");
                 if(obj.style.display != "none")
                 {
                 obj.focus();
                 }
                 return;
                 }*/
                var re = /[&<>\r\n\"\']+/;
                if(obj.value.match(re))
                {
                    hidesavemask();
                    top.showAlert(window,"资料来源中不能包含<、>、&、\"、'、换行符等字符。");
                    if(obj.style.display != "none")
                    {
                        obj.focus();
                    }
                    return;
                }
            }
            
            //检测内容
            if(getUeditorContentLength(0)==0)
            {
                hidesavemask();
                focuspage(0, true);
    			
    			if(pagenum == 0)
    			{
                    top.showAlert(window,"请输入正文！");
                }
                else
                {
                    top.showAlert(window,"请输入第1页的内容！");
                }
                return;
            }
    		
    		//检测摘要
    		obj=document.getElementById("wbsummary");
            if(ltrim(obj.value)=="")
            {
                if(document.getElementById("autofillsummarycheckbox").checked)
                {
    			    getSummaryNoAlert(200);
                }
                else
                {
                    hidesavemask();
                    setExpandEditor(true, false);
                    obj.focus();
                    top.showAlert(window,"请输入摘要或选择自动提取。");
                    return false;
                }
            }
            else if(obj.value.length > 1000)
            {
                hidesavemask();
                setExpandEditor(true, false);
                obj.focus();
                top.showAlert(window,"摘要长度不能超过1000！")
                return;
            }

    		//检测分页是否没有内容
    		for(var i = 1; i < pages.length; i++)
    		{
    			if(getUeditorContentLength(i) == 0)
    			{
    			    focuspage(i, true);
    			    hidesavemask();
    				top.showAlert(window,"请输入第" + (i+1) + "页的内容\r\n\r\n如果无需此分页则请删除")
    				return;
    			}
    		}
        }
        
        //显示提示信息
        if(op=="save")
        {
            top.showConfirm(window,"暂时保存这条信息?\r\n\r\n信息发布后才可被浏览",function(r){
                    if(r){
                        govsubmitnews(op,targetcolums,pages);
                    }
                }); 
        }
        else if(op=="submit")
        {
            top.showConfirm(window,"提交这条信息吗?\r\n\r\n信息审核通过后可被浏览",function(r){
                    if(r){
                        govsubmitnews(op,targetcolums,pages);
                    }
                }); 
        }
        else if(op=="publish")
        {
            if(targetcolums)
    		{
        		     top.showConfirm(window,"文章发布时将同时投递至其他地方，确认发布吗？",function(r){
                    if(r){
                        govsubmitnews(op,targetcolums,pages);
                    }
                }); 
    	    }
    	    else if(!targetcolums)
    	    {
    	        top.showConfirm(window,"发布这条文章？",function(r){
                    if(r){
                        govsubmitnews(op,targetcolums,pages);
                    }
                });    
    	    }
        }
    }

    function govsubmitnews(op,targetcolums,pages)
    {
        //自动提取关键字
        if(document.getElementById("autofillkeywordcheckbox").checked)
        {
            DWREngine.setAsync(false);
    		GBKAnalyzer.parserGBKPhrase(document.getElementById("wbtitle").value,callparserGBKPhrase);
            DWREngine.setAsync(true);
        }
    	showsavemask();
    	//检测关键字选中并且没有转向链接
        if(document.getElementById("sensitivewordcheck").checked && !document.getElementById("selectwblinkurlcheckbox").checked)
        {
    		//检测敏感字 显示敏感字检查提示
    		setsavemastinfo("正在检测敏感字，请稍候...");
            setTimeout(function()
            {
                govdosavecheck2(op, targetcolums, pages);
            },10);
        }
        else
        {
            govdosavecheck2(op, targetcolums, pages);
        }     
    }

    function govdosavecheck2(op, targetcolums, pages)
    {   
        //标题敏感字
        if(document.getElementById("sensitivewordcheck").checked)
    	{	
    		obj=document.getElementById("wbtitle");
    		var returnstr=checkSensitiveWords(obj.value,"标题中含有敏感字，要修改标题吗？","修改","不修改");
    		if(returnstr!="")
    		{
    		     hidesavemask();
    			 obj.focus();
    			 return;
    		}
        } 
            
        if(!document.getElementById("selectwblinkurlcheckbox").checked)
        {
    		if(document.getElementById("sensitivewordcheck").checked)
    		{	
    			//正文
    			returnstr=checkSensitiveWords(getUeditorContent(0),"" + (pages.length==0?"文章正文":"分页 1 ") + "中含有敏感字，需要标记出来修改吗？","标记","不修改");
    			if(returnstr!="")
    			{
    			    hidesavemask();
                    //如果当前不在普通版，切换编辑器到普通版
                    if(!_isPCEditor)
                    {
                        changeEditor();
                    }
    			    focuspage(0, false);
    				ueditor.setContent(returnstr);
    				gotoPage(1);
    				fixHeight();
    				return;
    			}
    		
    		
    			//分页
    			for(var i = 1; i < pages.length; i++)
    			{
    				var returnstr= checkSensitiveWords(getUeditorContent(i),"分页 "+(i + 1)+" 中含有敏感字，需要标记出来修改吗？","标记","不修改");
    				if(returnstr!="")
    				{
    				    hidesavemask();
                        //如果当前不在普通版，切换编辑器到普通版
                        if(!_isPCEditor)
                        {
                            changeEditor();
                        }
    				    focuspage(i, false);
    					ueditor.setContent(returnstr);
    					gotoPage(i + 1);
    					fixHeight();
    					return;
    				}
    			}
                var pages_m;
                //是否需要检测手机版内容 非自动获取的时候检测
                if( _hasMobilContent)
                {
                    pages_m = document.getElementsByName("ueditor_subcontent_m");
                    //正文
                    returnstr=checkSensitiveWords(getUeditorContent(0,undefined,true),"" + (pages_m.length==1?"手机版文章正文":"分页 1") + "中含有敏感字，需要标记出来修改吗？","标记","不修改");
                    if(returnstr!="")
                    {
                        hidesavemask();
                        //如果当前不在手机版，切换编辑器到手机版
                        if(_isPCEditor)
                        {
                            changeEditor();
                        }
                        focuspage(0, false);
                        ueditor.setContent(returnstr);
                        gotoPage(1);
                        fixHeight();
                        return;
                    }

                    //分页
                    for(var i = 1; i < pages_m.length; i++)
                    {
                        var returnstr= checkSensitiveWords(getUeditorContent(i,undefined,true),"手机版分页 "+(i + 1)+" 中含有敏感字，需要标记出来修改吗？","标记","不修改");
                        if(returnstr!="")
                        {
                            hidesavemask();
                            //如果当前不在手机版，切换编辑器到手机版
                            if(_isPCEditor)
                            {
                                changeEditor();
                            }
                            focuspage(i, false);
                            ueditor.setContent(returnstr);
                            gotoPage(i + 1);
                            fixHeight();
                            return;
                        }
                    }
                }
    		}
        }
        
        //取消自动保存
        if(beginAutoSave==true)
        {
            beginAutoSave=false;
        }

    	//显示保存动画
    	if(op == "save" || op=="audit")
    	{
    		setsavemastinfo("正在保存文章")
    	}
    	else if(op=="submit"||op=="deptsubmit")
    	{
    		setsavemastinfo("正在提交审核")
    	}
    	else
    	{
    		setsavemastinfo("正在发布文章")
    	}
    	movesavegif(150);
       
        //获取文章内容
        //正文
        preparecontent(0, $("#wbcontent")[0]);
        //检测图片等
        var pages = document.getElementsByName("ueditor_subcontent");
        //分页
    	var subcontents = document.getElementsByName("wbsubcontent");
        for(var i = 1; i < pages.length; i++)
        {
    		preparecontent(i, subcontents[i]);
        }
        //非自动获取的情况下   获取手机版内容
        if(_hasMobilContent)
        {
            preparecontent(0, $("#wbcontent_m")[0],true);
            //分页
            var subcontents_m = document.getElementsByName("wbsubcontent_m");
            for(var i = 1; i < pages_m.length; i++)
            {
                preparecontent(i, subcontents_m[i],true);
            }
        }
        //图片
        var ishaveimg = false;
        for(var i=0;i<pages.length;++i)
        {
            var imgs = pages[i].contentWindow.document.getElementsByTagName("IMG");
            for(var j =0;j<imgs.length;++j)
            {
                if( !isRealImg(imgs[j]) ) continue;
                if(imgs[j].src.indexOf("/system/resource/images/fileTypeImages/") == -1)//去掉附件的前导图
                {
                    ishaveimg = true;
                    break;
                }
            }
            if(ishaveimg)
                break;
        }    
        document.getElementById("wbishaveimg").value = ishaveimg?"1":"";
        
        //视频	改用图片占位了   逻辑需要重写
        var ishavevideo = false;
         for(var i=0;i<pages.length;++i)
        {
            var imgs = pages[i].contentWindow.document.getElementsByTagName("img");
            for(var j =0;j<imgs.length;++j)
            {
                if(isRealVideo(imgs[i]))
                {
                     ishavevideo = true;
                     break;   
                }
            }
            if(ishavevideo)
                break;
        }
       /*
        for(var i=0;i<pages.length;++i)
        {
            var embedels = pages[i].contentWindow.document.getElementsByTagName("embed");
            for(var j =0;j<embedels.length;++j)
            {
                if(embedels[j].src.indexOf("/system/resource/swf/FlexPaperViewer") == -1 && embedels[j].getAttribute("vsbaudio")==null && embedels[j].src.indexOf("/system/resource/swf") != -1 || embedels[j].getAttribute("console")=="Clip1")
                {
                    ishavevideo = true;
                    break;
                }
            }
            if(ishavevideo)
                break;
        }
       */       
        document.getElementById("wbishavevideo").value = ishavevideo?"1":"";
        if($("#wbtopdate").val()=="不设置则立即置顶")
        {
            $("#wbtopdate").val("");
        }
        if($("#wbgotopdate").val()=="不设置则一直置顶")
        {
            $("#wbgotopdate").val("");
        }
        if($("#wbfirststartdate").val()=="不设置则立即头条")
        {
            $("#wbfirststartdate").val("");
        }
        if($("#wbfirstenddate").val()=="不设置则一直头条")
        {
            $("#wbfirstenddate").val("");
        }
        
        if(document.getElementById("wbpicurl").value == "可以从正文包含的图片中进行选择")
        {
            document.getElementById("wbpicurl").value = "";
        }
        if(document.getElementById("wbvideourl").value == "请在右侧选择")
        {
            document.getElementById("wbvideourl").value = "";
        }
    	if(document.getElementById("wbnewstagname").value == "请在右侧选择")
    	{
    	    document.getElementById("wbnewstagname").value = "";
    	}
    	//设置分页标题
    	var pagetitles = document.getElementsByName("wbpagetitle");
    	for(var i=0;i<pagetitles.length;i++)
    	{
    		if(pagetitles[i].value=="点此输入当前页标题")
    		{
    			pagetitles[i].value="";
    		}
    	}
    	
        // 文章将要投递到的栏目
        document.getElementById("targetcolumns").value = targetcolums;
        
        document.getElementById("doaction").value=op;

        document.getElementById("wbextable").value = "wbgovpubnewsex";
        detailform.action = "addnews.jsp?newsposition="+newsposition+"&actiontype=govsave&owner="+document.getElementById("owner").value;
        detailform.submit();
    }

    function ueditorShowMoreFuntion()
    {
    	var morefunctiondiv = document.getElementById("morefunction");
    	if(morefunctiondiv.style.display=="none")
    	{
    		morefunctiondiv.style.display="";
    	}
    	else if(morefunctiondiv.style.display=="")
    	{
    		morefunctiondiv.style.display="none";
    	}

    }

    function calcurrentpage()
    {

        var tempcurrentpage = 0;
    	var currentheight = document.getElementById("contentdiv").scrollTop;
    	var titleheight = $("#edui1_title").height();
    	var totalheight = 20+titleheight;
    	var subpagedivs = getEditorPages("pccontainer");
    	if(!_isPCEditor)
    	{
    	    subpagedivs = getEditorPages("mobilcontainer");
        }
    	for(var i=0;i<subpagedivs.length;i++)
    	{
    		totalheight += 20+$(subpagedivs[i]).height();
    		if(currentheight<totalheight)
    		{
    			tempcurrentpage = i;
    			break;
    		}
    	}
    	focuspage(tempcurrentpage, true);
    }

    function updatepagelist()
    {
    	$("#pagenumslist").html(getPageListHTML());
    }
    function openUeditorAttachment()
    {
    	ueditor.ui._dialogs["attachmentDialog"].render();
    	ueditor.ui._dialogs["attachmentDialog"].open();
    }
    var currentulpos = 0;
    window.getPageListHTML =  function getPageListHTML()
    {
        var tmpNum = _isPCEditor?pagenum:_pagenum_m;
    	var html = '';
    	html += '<div style="width:60px">'+
    				'<strong class="b1"></strong>'+
    				'<strong class="b2 d1"></strong>'+
    				'<strong class="b3 d1"></strong>'+
    				'<strong class="b4 d1"></strong>'+
    				'<div class="b d1 k">'+
    					'<ul>';
    					if(tmpNum<5)
    					{
    						for(var i=1;i<=tmpNum+1;i++)
    						{
    							html += '<li class="pagelist" '+(i==1?'style="border-top-width:0px"':'')+' onclick="gotoPage('+i+')">第'+i+'页</li>';
    						}
    					}
    					else if(tmpNum>=5)
    					{
    						for(var i=0;i<=6;i++)
    						{
    							if(i+5*currentulpos>tmpNum+1)
    							{
    								break;
    							}
    							if(i==0)
    							{
    								html += '<li class="pagelist" onclick="upmoveul()" style="border-top-width:0px;display:'+(currentulpos==0?'none;':';')+'"><img src="/system/images/ico_fy_3.gif"></li>';
    							}
    							else if(i>0&&i<6)
    							{

    								html += '<li class="pagelist" '+(i==1&&currentulpos==0?'style="border-top-width:0px"':'')+' onclick="gotoPage('+(i+5*currentulpos)+')">第'+(i+5*currentulpos)+'页</li>';
    							}
    							else if(i==6)
    							{

    								html += '<li class="pagelist" onclick="downmoveul()"><img src="/system/images/ico_fy_4.gif"></li>';
    							}
    						}
    					}
    	html +=			'</ul>'+
    				'</div>'+
    				'<strong class="b4b d1"></strong>'+
    				'<strong class="b3b d1"></strong>'+
    				'<strong class="b2b d1"></strong>'+
    				'<strong class="b1b"></strong>'+
    			'</div>';
    	return html;
    }
    function downmoveul()
    {
    	currentulpos++;
    	updatepagelist();
    }
    function upmoveul()
    {
    	currentulpos--;
    	updatepagelist();
    }
    //var pagemovestate = 0
    function gotoPage(pageid)
    {
    	var targetheight = 0;
    	targetheight += 20+$("#edui1_title").height()+20;
    	for(var i=1;i<pageid;i++)
    	{
    	    var tmpHeight = $(".pagecontainer:eq("+(i-1)+")").height()+20+2;//div[name='pccontainer']
    		targetheight += tmpHeight;
    	}
    	document.getElementById("contentdiv").scrollTop = targetheight;
    	
    	focuspage(pageid - 1, true);
    }

    //启动后，或跳转分页后要 focus 到页面
    function focuspage(tempcurrentpage, uefocus)
    {
    	var pages = document.getElementsByName("ueditor_subcontent");
    	if(!_isPCEditor)
    	{
    	    pages = document.getElementsByName("ueditor_subcontent_m");
        }
    	if(tempcurrentpage >= pages.length)
    	    return;
    	var doc = pages[tempcurrentpage].contentWindow.document;
    	ueditor.document = doc;
    	ueditor.window = doc.defaultView || doc.parentWindow;
    	ueditor.iframe = ueditor.window.frameElement;
    	ueditor.body = doc.body;
    	doc.body.contentEditable = true;
    	ueditor.selection = new baidu.editor.dom.Selection(doc);
        ueditor.fireEvent("wordcount");
    	if(uefocus)
    	   ueditor.focus();
    	onfocuspage(tempcurrentpage)
    }

    function onfocuspage(pageindex)
    {
    	currentpage = pageindex;
    	$("#ueditorcurrentpage").html(currentpage + 1);
    }


    function switchmobile()
    {
    	if($(".mobileeditor").css("display")=="none")
    	{
    		$(".main").css("display","none");
    		$(".side").css("display","none");
    		$(".mobileeditor").css("display","");
    		$("#switchmobileeditor").val("桌面版");

    	}else{
    		$(".main").css("display","");
    		$(".side").css("display","");
    		$(".mobileeditor").css("display","none");
    		$("#switchmobileeditor").val("手机版");
    	}
    } 

    function breakpage()
    {
        var range = ueditor.selection.getRange().trimBoundary(false);
        //2013-09-02 wzq  修改   当选中的为 图片 视频 flasf iframe 等对象时 从选中对象开始处分割
        var selectElmt = range.getCommonAncestor(true,false);
        var elmtName = selectElmt.nodeName.toUpperCase();
        var isInclude = elmtName=="IMG" || elmtName=="EMBED" || elmtName=="IFRAME" || elmtName=="PARAM" || elmtName=="OBJECT";
        if(isInclude)
        {
            
            //flash 分割后前一页会有一个flash的边框，源码是全文的，不知道为什么  所以flash 再次处理,选中不允许分割
            if(elmtName=="OBJECT")
            {
                top.showAlert(window,"光标当前位置不能分割页面，请重新选择！");
                return;
            }else{
                var node = selectElmt;
                //将Range开始位置设置到node节点内的最后   闭合选区
                range.setStartAtLast( node ).collapse(true);
            }
        }
        else
        {
            //var node = selectElmt;
            //将Range结束位置设置到选中的开始位置
            //range.setEnd(range.startContainer, range.startOffset);
            //Wzq    20150828  改为闭合选区而不是移动选区的位置，   移动个位置的话火狐下会有问题
            range.collapse(true);
        }
    	
    	//提前替换 iframe 的内容，以免脚本执行出错
    	var iframes = ueditor.body.getElementsByTagName("IFRAME");
    	var i;
    	for(i = 0; iframes != null && i < iframes.length; i++)
    	{
    	    iframes[i].setAttribute("_vsb_news_iframe_storesrc", iframes[i].src);
    	    iframes[i].src = "about:blank";
    	}
    	
    	ueditor.execCommand("pagebreak");
    	//不可撤销
    	ueditor.undoManger.reset();
    	var content = ueditor.getContent();
    	var contents = content.split("_ueditor_page_break_tag_");
    	
    	ueditor.setContent(contents[0]);
    	//恢复iframe
        iframes = ueditor.body.getElementsByTagName("IFRAME");
    	for(i = 0; iframes != null && i < iframes.length; i++)
    	{
    	    var oldsrc = iframes[i].getAttribute("_vsb_news_iframe_storesrc");
    	    if(oldsrc != null)
    	    {
    	        iframes[i].removeAttribute("_vsb_news_iframe_storesrc");
    	        iframes[i].src = oldsrc;
    	    }
    	}
    	//不可撤销
    	ueditor.undoManger.reset();
    		
    	var thispage = ueditor.iframe.parentNode.parentNode;
        var containerName = _isPCEditor?"pccontainer":"mobilcontainer";
        var iframeName =  _isPCEditor?"ueditor_subcontent":"ueditor_subcontent_m";
        var pageTitle =_isPCEditor && !isMobileStyle?'<input type="text" name="wbpagetitle" class="title" maxlength=255 onfocus="clearsubpagetitle(this)" onblur="setsubpagetitle(this)" value="点此输入当前页标题">':'';
        var methodName = _isPCEditor?"appendueditorpage":"createmobilappendpage";
        var contentName = _isPCEditor?"wbsubcontent":"wbsubcontent_m";
        var pageIdName =  _isPCEditor?"wbnewspageid":"wbnewspageid_m";
        var crtPageNumName = _isPCEditor?"pc":"mobil";
        var containerStyle = ($("#firmtype").val()=="multi" && !_isPCEditor)?"mobilecontainer":"pagecontainer";
    	try{
    		$(thispage).after('<div class="'+containerStyle+'" name="'+containerName+'">'+
    						'<div style="float:left;width:100%;height:100px">'+
                                '<div class="headerwithbg" style="height:100px;background-color:white;width:100%;float:left">'+
    									'<div class="closesubpage" title="删除分页" onmouseover="sethover(this)" onmouseout="clearhover(this)" onclick="deletePage(this,0)"><img src="/system/images/ico_scby.gif">删除本页</div>'+
    									'<div class="upaddsubpage" title="向上合并" onmouseover="sethover(this)" onmouseout="clearhover(this)" onclick="addtoprevsubpage(this.parentNode.parentNode.parentNode,0)"><img src="/system/images/ico_xshb.gif">向上合并</div>'+
    									'<div class="upmovesubpage" title="上移此页" onmouseover="sethover(this)" onmouseout="clearhover(this)" onclick="upsubpage(this)"><img src="/system/images/ico_xsyd.gif">向上移动</div>'+
                                        '<img src="/system/images/northwest.png" style="float:left;width:30px;margin-top:70px;margin-left:50px">'+
    									'<div class="ueditor-header-pagenum">当前第<span class="ueditor-pageheader-index" name="'+crtPageNumName+'">1</span>页&nbsp&nbsp共<span class="ueditor-pageheader-total">1</span>页</div>'+
    									'<div class="ueditor-page-header"><div class="page-header-wrapper">'+pageTitle+
    									'<textarea  style="display:none" name="'+contentName+'"></textarea><INPUT type="hidden"  name="'+pageIdName+'" value="0"></div></div>'+
                                '</div>'+
                            '</div>'+
    						'<div class="edui-editor-iframeholder" style="height:400px"><iframe  name="'+iframeName+'" style="height:100%" class="mainiframe" scrolling="no" frameborder="0"></iframe></div>'+
    						'<div style="float:left;width:100%;height:80px;">'+
                                '<div class="footerwithbg" style="height:80px;background-color:white;width:100%;float:left">'+
    								'<div class="ueditor-insertpage" onmouseover="sethover(this)" onmouseout="clearhover(this)" onclick="'+methodName+'(this.parentNode.parentNode.parentNode)"><img src="/system/images/ico_tjfy.gif">添加分页</div>'+
    								'<div class="downaddsubpage" title="向下合并" onmouseover="sethover(this)" onmouseout="clearhover(this)" onclick="addtonextsubpage(this.parentNode.parentNode.parentNode,0)"><img src="/system/images/ico_xxhb.gif">向下合并</div>'+
    								'<div class="downmovesubpage" title="下移此页" onmouseover="sethover(this)" onmouseout="clearhover(this)" onclick="downsubpage(this)"><img src="/system/images/ico_xxyd.gif">向下移动</div>'+
                                    //'<img src="/system/images/southeast.png" style="float:right;width:30px;margin-top:0px;margin-right:-210px">'+
                                    '<img src="/system/images/southwest.png" style="float:left;width:30px;margin-top:0px;margin-left:50px">'+
                                '</div>'+
                            '</div>'+
    					'</div>');

    		var iframe = thispage.nextSibling.firstChild.nextSibling.firstChild;
    		var doc= iframe.contentWindow.document||iframe.document||iframe.contentDocument;
    		_isPCEditor?setupSubPage(doc,contents[1]):setupSubPage(doc,contents[1],true);
    		addEditorListener(doc);
            
            $("input[name=wbpagetitle]").bind("focus", disableToolbar);
            $("input[name=wbpagetitle]").bind("blur", enableToolbar);

    		fixHeight();
    		if(_isPCEditor)
    		{
                if(pagenum==0&&$("#wbfirstpagetitle").val()=="")
        		{
        		    $("#wbfirstpagetitle").val("点此输入当前页标题");
        		}
        		pagenum++;
        		$("#ueditortotalpagenum").html(pagenum+1);
            }else{
                _pagenum_m++;
        		$("#ueditortotalpagenum").html(_pagenum_m+1);
            }
    		
    		updateheaderpagenum();
    		updatepagelist();
    		
    		//焦点进入下一分页
    		focuspage(currentpage + 1, true);
            
            //恢复iframe
            iframes = ueditor.body.getElementsByTagName("IFRAME");
        	for(i = 0; iframes != null && i < iframes.length; i++)
        	{
        	    var oldsrc = iframes[i].getAttribute("_vsb_news_iframe_storesrc");
        	    if(oldsrc != null)
        	    {
        	        iframes[i].removeAttribute("_vsb_news_iframe_storesrc");
        	        iframes[i].src = oldsrc;
        	    }
        	}		
        	//不可撤销
        	ueditor.undoManger.reset();
    	}catch(e)
    	{
        }
    }

    function getallueditorcontent(jointstr, keepsensitiveword)
    {
    	var content = ""
    	var pages;
    	if(_isPCEditor)
        {
            pages = document.getElementsByName("ueditor_subcontent");
        }else{
            pages = document.getElementsByName("ueditor_subcontent_m");
        }
        for(var i = 0; i < pages.length; i++)
        {
            if(i != 0 && jointstr)
                content += jointstr;
    		content +=_isPCEditor?getUeditorContent(i, keepsensitiveword):getUeditorContent(i, keepsensitiveword,true);
    	}
    	//Wzq拿到内容后按照出编辑器的规则格式化 
    	var root = UE.htmlparser(content);
         ueditor.filterInputRule(root);
         var html = root.toHtml();
    	return html;
    }

    function setautofillkeyword(checkbox)
    {
    	if(checkbox.checked)
    	{
    		$("#wbkeyword").css("color","#ccc");
    		$("#wbkeyword").attr("readonly","true");
    		$("#wbautokeyword").val(1);
    	}
    	else
    	{
    		$("#wbkeyword").css("color","rgb(0,0,0)");
    		$("#wbkeyword").removeAttr("readonly");
    		$("#wbautokeyword").val(0);
    	}
    }

    function setautofillsummary(checkbox)
    {
    	if(checkbox.checked)
    	{
    		$("#wbsummary").css("color","#ccc");
    		$("#wbsummary").attr("readonly","true");
    		$("#wbautosummary").val(1);
    	}
    	else
    	{
    		$("#wbsummary").css("color","rgb(0,0,0)");
    		$("#wbsummary").removeAttr("readonly");
    		$("#wbautosummary").val(0);
    	}
    }

    function clearsubpagetitle(o)
    {
    	if(o.value=="点此输入当前页标题")
    	{
    		o.value="";		
    	}
    	o.style.color = "#000000";
    }
    function setsubpagetitle(o)
    {
    	if(o.value=="")
    	{
    		o.value="点此输入当前页标题";
    	}
    	o.style.color = "#ccc";
    }

    function appendueditorpage(thispage)
    {
            var containerStyle =  isMobileStyle ?"mobilecontainer":"pagecontainer";
    		try{
    		$(thispage).after('<div class="'+containerStyle+'" name="pccontainer">'+
    						'<div style="float:left;width:100%;height:100px">'+
                                '<div class="headerwithbg" style="height:100px;background-color:white;width:100%;float:left">'+
    									'<div class="closesubpage" title="删除分页" onmouseover="sethover(this)" onmouseout="clearhover(this)" onclick="deletePage(this,0)"><img src="/system/images/ico_scby.gif">删除本页</div>'+
    									//'<div class="downmovesubpage" title="下移此页" onclick="downsubpage(this)"></div>'+
    									'<div class="upaddsubpage" title="向上合并" onmouseover="sethover(this)" onmouseout="clearhover(this)" onclick="addtoprevsubpage(this.parentNode.parentNode.parentNode,0)"><img src="/system/images/ico_xshb.gif">向上合并</div>'+
    									'<div class="upmovesubpage" title="上移此页" onmouseover="sethover(this)" onmouseout="clearhover(this)" onclick="upsubpage(this)"><img src="/system/images/ico_xsyd.gif">向上移动</div>'+
    									
                                        //'<img src="/system/images/northeast.png" style="float:right;width:30px;margin-top:70px;margin-right:-210px">'+
                                        '<img src="/system/images/northwest.png" style="float:left;width:30px;margin-top:70px;margin-left:50px">'+
    									'<div class="ueditor-header-pagenum">当前第<span class="ueditor-pageheader-index" name="pc">1</span>页&nbsp&nbsp共<span class="ueditor-pageheader-total">1</span>页</div>'+
    									'<div class="ueditor-page-header"><div class="page-header-wrapper"><input style="display:'+(isMobileStyle?"none":"")+';" type="text" name="wbpagetitle" class="title" maxlength=255 onfocus="clearsubpagetitle(this)" onblur="setsubpagetitle(this)" value="点此输入当前页标题"><textarea  style="display:none" name="wbsubcontent"></textarea><INPUT type="hidden"  name=wbnewspageid value="0"></div></div>'+
                                '</div>'+
                            '</div>'+
    						'<div class="edui-editor-iframeholder" style="height:400px"><iframe  name="ueditor_subcontent" style="height:100%" class="mainiframe" scrolling="no" frameborder="0"></iframe></div>'+
    						'<div style="float:left;width:100%;height:80px;">'+
                                '<div class="footerwithbg" style="height:80px;background-color:white;width:100%;float:left">'+
    								'<div class="ueditor-insertpage" onmouseover="sethover(this)" onmouseout="clearhover(this)" onclick="appendueditorpage(this.parentNode.parentNode.parentNode)"><img src="/system/images/ico_tjfy.gif">添加分页</div>'+
    								'<div class="downaddsubpage" title="向下合并" onmouseover="sethover(this)" onmouseout="clearhover(this)" onclick="addtonextsubpage(this.parentNode.parentNode.parentNode,0)"><img src="/system/images/ico_xxhb.gif">向下合并</div>'+
                                    '<div class="downmovesubpage" title="下移此页" onmouseover="sethover(this)" onmouseout="clearhover(this)" onclick="downsubpage(this)"><img src="/system/images/ico_xxyd.gif">向下移动</div>'+
    								//'<img src="/system/images/southeast.png" style="float:right;width:30px;margin-top:0px;margin-right:-210px">'+
                                    '<img src="/system/images/southwest.png" style="float:left;width:30px;margin-top:0px;margin-left:50px">'+
                                '</div>'+
                            '</div>'+
    					'</div>');

    		var iframe = thispage.nextSibling.firstChild.nextSibling.firstChild;

    		var doc= iframe.contentWindow.document||iframe.document||iframe.contentDocument;
            setupSubPage(doc);
            addEditorListener(doc);

            $("input[name=wbpagetitle]").bind("focus", disableToolbar);
            $("input[name=wbpagetitle]").bind("blur", enableToolbar);

    		fixHeight();
    		if(pagenum==0&&$("#wbfirstpagetitle").val()=="")
    		{
    		    $("#wbfirstpagetitle").val("点此输入当前页标题");
    		}
    		pagenum++;
    		$("#ueditortotalpagenum").html(pagenum+1);
    		
    		updateheaderpagenum();
    		updatepagelist();
    		
    		//焦点
    		ueditor.focus();
    		var iframe = ueditor.iframe;
    		var index = $("iframe[name='ueditor_subcontent']").index(ueditor.iframe);
    		onfocuspage(index);
    		
    	}catch(e)
    	{}
    }

    //向上合并分页，删除此页，并把此页的内容添加到上一页

    function addtoprevsubpage(o,delid)
    {
    	top.showConfirm(window,"向上合并此分页？",function(r){
            if(r){
                var prePageContainer =  getPreviousSibling($(o));
                try{
                    var doc = o.firstChild.nextSibling.firstChild.contentWindow.document;
                	   ueditor.document = doc;
                    ueditor.window = doc.defaultView || doc.parentWindow;
                    ueditor.iframe = ueditor.window.frameElement;
                    ueditor.body = doc.body;
                    ueditor.selection = new baidu.editor.dom.Selection(doc);
                      var content = ueditor.getContent();
                      //清空源分页，以免flash出现 __flash__removeCallback 错误
                      ueditor.setContent("");
                      var doc2 = prePageContainer.firstChild.nextSibling.firstChild.contentWindow.document;
                      ueditor.document = doc2;
                   ueditor.window = doc2.defaultView || doc2.parentWindow;
                   ueditor.iframe = ueditor.window.frameElement;
                   ueditor.body = doc2.body;
                   ueditor.selection = new baidu.editor.dom.Selection(doc2);
                   ueditor.setContent(content,true);
                   ueditor.focus(true);
                	 var contentholder = o.parentNode;
                	 contentholder.removeChild(o);
                	
                	if(delid!=0)
                	{
                		$("#delpage").val($("#delpage").val()+delid+";");
                	}
                	fixHeight();
                	
                	if(_isPCEditor)
                	{
                	    pagenum--;
                    	$("#ueditortotalpagenum").html(pagenum+1);
                    	
                    	if(pagenum==0&&$("#wbfirstpagetitle").val()=="点此输入当前页标题")
                    	{
                    		$("#wbfirstpagetitle").val("");
                    	}
                    	if(currentulpos*5>pagenum)
                    	{
                    	    currentulpos--;
                    	}    
                    }else{
                         _pagenum_m--;
                    	$("#ueditortotalpagenum").html(_pagenum_m+1);
                    	if(currentulpos*5>_pagenum_m)
                    	{
                    	    currentulpos--;
                    	}
                    }
                	
                	updateheaderpagenum();
                	updatepagelist();
                	var iframe = ueditor.iframe;
                	var index = _isPCEditor?$("iframe[name='ueditor_subcontent']").index(ueditor.iframe):$("iframe[name='ueditor_subcontent_m']").index(ueditor.iframe);
                	onfocuspage(index);
                	}catch(e){}    
            }
    	});
    }

    function addtonextsubpage(o,delid)
    {
    	var index = getPageIndex($(o));
    	if(_isPCEditor){
    	    
    	    if(index==pagenum)
            	{
            		top.showAlert(window,"最后一页不能向下合并");
            		return;
            	}    
        }else{
            if(index==_pagenum_m)
            	{
            		top.showAlert(window,"最后一页不能向下合并");
            		return;
            	}
        }
    	
    	var nextPageContainer =  getNextSibling($(o));
    	top.showConfirm(window,"向下合并此分页？",function(r){
    	    if(r)
    	    {
    	        try{
                    	var doc = o.firstChild.nextSibling.firstChild.contentWindow.document;
                    	ueditor.document = doc;
                      ueditor.window = doc.defaultView || doc.parentWindow;
                      ueditor.iframe = ueditor.window.frameElement;
                      ueditor.body = doc.body;
                      ueditor.selection = new baidu.editor.dom.Selection(doc);
                    	var content = ueditor.getContent();
                    	//清空源分页，以免flash出现 __flash__removeCallback 错误
                    	ueditor.setContent("");
                    	var doc2 = nextPageContainer.firstChild.nextSibling.firstChild.contentWindow.document;
                    	ueditor.document = doc2;
                      ueditor.window = doc2.defaultView || doc2.parentWindow;
                      ueditor.iframe = ueditor.window.frameElement;
                      ueditor.body = doc2.body;
                      ueditor.selection = new baidu.editor.dom.Selection(doc2);
                      ueditor.focus(false);
                      ueditor.execCommand("insertHTML",content);
                    	
                    	var contentholder = o.parentNode;
                    	contentholder.removeChild(o);
                    	
                    	if(delid!=0)
                    	{
                    		$("#delpage").val($("#delpage").val()+delid+";");
                    	}
                    	fixHeight();
                    	if(_isPCEditor)
                    	{
                    	    pagenum--;
                        	$("#ueditortotalpagenum").html(pagenum+1);
                        	
                        	if(pagenum==0&&$("#wbfirstpagetitle").val()=="点此输入当前页标题")
                        	{
                        		$("#wbfirstpagetitle").val("");
                        	}
                        	if(currentulpos*5>pagenum)
                        	{
                        	    currentulpos--;
                        	}    
                        }else{
                           _pagenum_m--;
                        	$("#ueditortotalpagenum").html(_pagenum_m+1);
                        	if(currentulpos*5>_pagenum_m)
                        	{
                        	    currentulpos--;
                        	}  
                        }
                    	updateheaderpagenum();
                    	updatepagelist();
                    
                    	var iframe = ueditor.iframe;
                    	var index = _isPCEditor?$("iframe[name='ueditor_subcontent']").index(ueditor.iframe):$("iframe[name='ueditor_subcontent_m']").index(ueditor.iframe);
                    	onfocuspage(index);
                    	}catch(e){}    
    	    }    
    	});
    }

    function settittleshow(o,trid,titleid)
    {
    	if(o.checked)
    	{
    		document.getElementById(trid).style.display = "";
    	}
    	else
    	{
    		document.getElementById(trid).style.display = "none";
    	        //清空内容
    	        if(titleid=="wbcontenttitle")
    	        {
    	            document.getElementById("contentwebberedit").contentWindow.editor1.setContent("");
    	            document.getElementById("wbcontenttitle").value="";
    	        }else
    	        {
    	            document.getElementById(titleid).value="";
    	        }
        }
    }

    var fileTypeMaps = {
        ".rar":"icon_rar.gif","..rar":"icon_rar.gif",
        ".zip":"icon_rar.gif","..zip":"icon_rar.gif",
        ".tar":"icon_rar.gif","..tar":"icon_rar.gif",
        ".7z":"icon_rar.gif","..7z":"icon_rar.gif",
        ".tar.gz":"icon_rar.gif","..tar.gz":"icon_rar.gif",
        ".gz":"icon_rar.gif",".gz":"icon_rar.gif",
        ".cab":"icon_rar.gif",".cab":"icon_rar.gif",
        ".doc":"icon_doc.gif","..doc":"icon_doc.gif",
        ".docx":"icon_doc.gif","..docx":"icon_doc.gif",
        ".pdf":"icon_pdf.gif","..pdf":"icon_pdf.gif",
        ".mp3":"icon_mp3.gif","..mp3":"icon_mp3.gif",
        ".xls":"icon_xls.gif","..xls":"icon_xls.gif",
        ".xlsx":"icon_xls.gif","..xlsx":"icon_xls.gif",
        ".chm":"icon_chm.gif","..chm":"icon_chm.gif",
        ".ppt":"icon_ppt.gif","..ppt":"icon_ppt.gif",
        ".pptx":"icon_ppt.gif","..pptx":"icon_ppt.gif",
        ".avi":"icon_mv.gif","..avi":"icon_mv.gif",
        ".rmvb":"icon_mv.gif","..rmvb":"icon_mv.gif",
        ".mp4":"icon_mv.gif","..mp4":"icon_mv.gif",
        ".mpg":"icon_mv.gif","..mpg":"icon_mv.gif",
        ".mpeg":"icon_mv.gif","..mpeg":"icon_mv.gif",
        ".mov":"icon_mv.gif","..mov":"icon_mv.gif",
        ".wmv":"icon_mv.gif","..wmv":"icon_mv.gif",
        ".flv":"icon_mv.gif","..flv":"icon_mv.gif",
        ".swf":"icon_mv.gif","..swf":"icon_mv.gif",
        ".asf":"icon_mv.gif","..asf":"icon_mv.gif",
        ".rm":"icon_mv.gif","..rm":"icon_mv.gif",
        ".exe":"icon_exe.gif","..exe":"icon_exe.gif",
        ".psd":"icon_psd.gif","..psd":"icon_psd.gif",
        ".txt":"icon_txt.gif","..txt":"icon_txt.gif",
        ".apk":"apk.gif","..apk":"apk.gif",
        ".bmp":"bmp.gif","..bmp":"bmp.gif",
        ".gif":"gif.gif","..gif":"gif.gif",
        ".jpg":"jpg.gif","..jpg":"jpg.gif",
        ".jpeg":"jpg.gif","..jpeg":"jpg.gif",
        ".png":"png.gif","..png":"png.gif",
        ".html":"ie.gif","..html":"ie.gif",
        ".htm":"ie.gif","..htm":"ie.gif",
        ".css":"css.gif","..css":"css.gif",
        ".ico":"ico.gif","..ico":"ico.gif",
        ".xml":"xml.gif","..xml":"xml.gif",
        ".js":"js.gif","..js":"js.gif"
    };
    function insertAttachment(id,type,filepath,original,wbnewsfileid)
    {
    	var imgsrc = "/system/resource/images/fileTypeImages/"+(fileTypeMaps["."+type.toLowerCase()]||"icon_default.png");
    	
    	var owner =document.getElementById("owner").value;
    	var downurl ="/system/_content/download.jsp?urltype=news.DownloadAttachUrl&owner="+owner+"&wbfileid="+wbnewsfileid;
        var str = "&nbsp;<span id='"+id+"' retain='true'><img src='"+ imgsrc + "' data_ue_src='"+imgsrc+"' border='0'/><a href='"+ downurl+"'>" + original.replace(/\${quote}/g,"\'") + "</a></span>";
        //var str = "&nbsp;<span id='"+id+"'><img src='"+ imgsrc + "' data_ue_src='"+imgsrc+"' border='0'/><a href='javascript:;' vsb_href='[attach]"+filepath+"[/attach]'>" + original+ "</a></span>";
    	ueditor.execCommand("insertHTML",str);
    }

    //从文件库选择的附件，插入bb码，保存时在后台替换
    function insertAttachmentBBCode(type,original,filepath)
    {
    	var imgsrc = "/system/resource/images/fileTypeImages/"+(fileTypeMaps[type.toLowerCase()]||"icon_default.png");
    	var temp1 = filepath.split("/");
    	var temp2 = temp1[temp1.length-1].split(".");
    	var randomname = temp2[0];//文件名，用于删除操作
        var str = "&nbsp;<span id='"+randomname+"' retain='true'><img src='"+ imgsrc + "' data_ue_src='"+imgsrc+"' border='0'/><a href='javascript:;' vsb_href='[attach]"+filepath+"[/attach]'>" + original+ "</a></span>";
    	ueditor.execCommand("insertHTML",str);
    }

    //打开关闭基本属性panel
    function switchoptionpanel()
    {
    	if($("#moreoption-body").css("display")=="none")
    	{
    	    $("#moreoption-body").css("display","");
    	    $("#other-body").css("display","none");
    	    $("#moreoption-top-icon").attr("class","panel-top-right");
    	    $("#other-top-icon").attr("class","panel-top-right-left");
    	}
    	else
    	{
    	    $("#moreoption-body").css("display","none");
    	    $("#other-body").css("display","");
    	    document.getElementById("relationnewsframeid").contentWindow.fixheight();
    	    $("#moreoption-top-icon").attr("class","panel-top-right-left");
    	    $("#other-top-icon").attr("class","panel-top-right");
    	}
    }

    //置灰编辑器工具条，
    //不能使用编辑器的disable()方法，编辑器来回 enable disable 一是反应慢，而是阻拦很多正常操作
    var toolbarbox = null; //原工具条
    var toolbarMask = null; //工具条遮罩
    var toolbarEnabled = true;

    function initToobarMask()
    {
        if(toolbarMask == null)
        {
            //创建编辑器工具条 disable 遮罩
            toolbarEnabled = !$("#selectwblinkurlcheckbox").attr("checked");
        	toolbarbox = ueditor.ui.getDom('toolbarbox');
        	toolbarMask = toolbarbox.ownerDocument.createElement("div");
        	toolbarMask.style.cssText = "position:absolute;display:" + (toolbarEnabled?"none":"") + ";width:" + toolbarbox.clientWidth + "px;height:" + toolbarbox.clientHeight + "px;z-index:10; opacity: 0.6;-ms-filter: 'alpha(opacity=60)';filter: alpha(opacity=60);background-color:white";
        	toolbarbox.parentNode.insertBefore(toolbarMask, toolbarbox);
        	toolbarbox.onresize = function (){
            	toolbarMask.style.width = toolbarbox.clientWidth + "px";
            	toolbarMask.style.height = toolbarbox.clientHeight + "px";
                };
        }
    }

    function disableToolbar()
    {
        if(toolbarEnabled)
        {
        	toolbarMask.style.display = "";
        	toolbarEnabled = false;
        }
    }

    function enableToolbar()
    {
        if(!toolbarEnabled && !$("#selectwblinkurlcheckbox").attr("checked"))
        {
        	toolbarMask.style.display = "none";
        	toolbarEnabled = true;
        }
    }

    function updateheaderpagenum()
    {
        
        var pageindex = $(".ueditor-pageheader-index");
        var pcarray  = new Array();
        var mobilearray  = new Array();
        for(var i = 0;i < pageindex.length;i++)
        {
            if(pageindex[i].getAttribute("name") == "mobil")
            {
                mobilearray.push(pageindex[i]);
            }else{
                pcarray.push(pageindex[i]);
            }
        } 
        if(_isPCEditor)
        {
            $(".ueditor-pageheader-total").html(pagenum+1);   
            for(var i = 0;i < pcarray.length;++i)
            {
                   $(pcarray[i]).html(i+1);    
            }
        }else{
            $(".ueditor-pageheader-total").html(_pagenum_m+1);   
            for(var i = 0;i < mobilearray.length;++i)
            {
                   $(mobilearray[i]).html(i+1);    
            }
        }
    }

    function sethover(o)
    {
        o.style.color = "#0000FF";
        $(o).addClass("hovercss");
    }

    function clearhover(o)
    {
        o.style.color = "#99999B";
        $(o).removeClass("hovercss");
    }

    function showtitlepicoption()
    {
        var pos  = getElementPos("pictitleoption");
        var div = document.getElementById("picktitleoptionnav");
       
        if(div)
        {
            div.style.left = (pos.x+30)+"px";
            div.style.top = pos.y+"px";
        }
        else
        {
            var div = document.createElement("div");
            div.setAttribute("id","picktitleoptionnav");
            div.setAttribute("style","display:block;");
            $(div).css("left",(pos.x+30)+"px");
            $(div).css("top",pos.y+"px");
            div.innerHTML = '<ul><li title="从正文中的图片选择" onmouseover="this.style.backgroundColor=\'#fff5d4\';this.style.border=\'1px solid #dcac6c\';" onmouseout="this.style.cssText=\'\'" onclick="parseImg();">从正文中的图片选择</li><li title="从云文件库选择" onmouseover="this.style.backgroundColor=\'#fff5d4\';this.style.border=\'1px solid #dcac6c\';" onmouseout="this.style.cssText=\'\'" onclick="selectpicurl('+$("#wbnewsid").val()+','+$("#owner").val()+');">从云文件库选择</li><li  title="取消标题图" onmouseover="this.style.backgroundColor=\'#fff5d4\';this.style.border=\'1px solid #dcac6c\';" onmouseout="this.style.cssText=\'\'" onclick="canceltitlcpic()" style="">取消标题图</li></ul>';
            document.body.appendChild(div);
            
            setTimeout(function(){
                $(document.body).mouseup(function(){
                    if(div.style.display == "block")
                    {
                        div.style.display = "none";
                    }
                });
            },300);
        }
       
            div.style.display = "block";
        
    }

    function hidetitlepicopt()
    {
        var div = document.getElementById("picktitleoptionnav");
        if(div)
        {
            div.style.display = "none";
        }
    }
    //获取坐标，兼容各个浏览器
    function getElementPos(elementId) {
        var ua = navigator.userAgent.toLowerCase();
        var isOpera = (ua.indexOf('opera') != -1);
        var isIE = (ua.indexOf('msie') != -1 && !isOpera); // not opera spoof
        var el = document.getElementById(elementId);
        if (el.parentNode === null || el.style.display == 'none') {
            return false;
        }
        var parent = null;
        var pos = [];
        var box;
        if (el.getBoundingClientRect) //IE
        {
            box = el.getBoundingClientRect();
            var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
            var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
            return {
                x: box.left + scrollLeft,
                y: box.top + scrollTop
            };
        } else if (document.getBoxObjectFor) // gecko    
        {
            box = document.getBoxObjectFor(el);
            var borderLeft = (el.style.borderLeftWidth) ? parseInt(el.style.borderLeftWidth) : 0;
            var borderTop = (el.style.borderTopWidth) ? parseInt(el.style.borderTopWidth) : 0;
            pos = [box.x - borderLeft, box.y - borderTop];
        } else // safari & opera    
        {
            pos = [el.offsetLeft, el.offsetTop];
            parent = el.offsetParent;
            if (parent != el) {
                while (parent) {
                    pos[0] += parent.offsetLeft;
                    pos[1] += parent.offsetTop;
                    parent = parent.offsetParent;
                }
            }
            if (ua.indexOf('opera') != -1 || (ua.indexOf('safari') != -1 && el.style.position == 'absolute')) {
                pos[0] -= document.body.offsetLeft;
                pos[1] -= document.body.offsetTop;
            }
        }
        if (el.parentNode) {
            parent = el.parentNode;
        } else {
            parent = null;
        }
        while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') { // account for any scrolled ancestors
            pos[0] -= parent.scrollLeft;
            pos[1] -= parent.scrollTop;
            if (parent.parentNode) {
                parent = parent.parentNode;
            } else {
                parent = null;
            }
        }
        return {
            x: pos[0],
            y: pos[1]
        };
    }

    function showRepeatInfo(info)
    {
        $("#repeattitleinfo").html(info);
        $("#repeattitleinfo").css("display","block");
        
        var color=['rgb(255,255,255)','rgb(255,0,0)'];
        nextcolor = 0;
        var timer = setInterval(function(){
            $("#repeattitleinfo").css("color",color[nextcolor++]); 
            nextcolor = nextcolor % color.length;
            },500);
            
        setTimeout(function(){
            clearInterval(timer);
            $("#repeattitleinfo").css("display","none");
            },5000);
    }

    function showtitlevideoopt()
    {
        var pos  = getElementPos("titlevideooption");
        var div = document.getElementById("titlevideooptionnav");
        
        if(div)
        {
            div.style.left = (pos.x+80)+"px";
            div.style.top = pos.y+"px";
        }
        else
        {
            var div = document.createElement("div");
            div.setAttribute("id","titlevideooptionnav");
            div.setAttribute("style","display:block;");
            $(div).css("left",(pos.x+80)+"px");
            $(div).css("top",pos.y+"px");
            div.innerHTML = '<ul><li title="从正文中的视频选择" onmouseover="this.style.backgroundColor=\'#fff5d4\';this.style.border=\'1px solid #dcac6c\';" onmouseout="this.style.cssText=\'\'"  onclick="parseVideo();">从正文中的视频选择</li><li title="从云文件库选择" onmouseover="this.style.backgroundColor=\'#fff5d4\';this.style.border=\'1px solid #dcac6c\';" onmouseout="this.style.cssText=\'\'" onclick="selectvideourl('+$("#wbnewsid").val()+','+$("#owner").val()+');">从云文件库选择</li><li  title="取消标题视频" onmouseover="this.style.backgroundColor=\'#fff5d4\';this.style.border=\'1px solid #dcac6c\';" onmouseout="this.style.cssText=\'\'" onclick="canceltitlcmedia()" style="">取消标题视频</li></ul>';
            document.body.appendChild(div);
            
            setTimeout(function(){
                $(document.body).mouseup(function(){
                    if(div.style.display == "block")
                    {
                        div.style.display = "none";
                    }
                });
            },300);
            
        }
         div.style.display = "block";
        
    }

    var relationnew_syncstr ="";
    function selectRelationNews()
    {
        relationnew_syncstr = document.getElementById("relationnewsframeid").contentWindow.getSyncStr();
        top.showDialog(window,{
                'title': '选择相关文章', 
                'url': "/system/site/column/news/relationnews_new.jsp?newsid="+(!!$("#wbnewsid").val()?$("#wbnewsid").val():0)+"&owner="+$("#owner").val(),
                'arguments':new Array(window),
                'callbackFun':function(arrays)
                    {
                         if(arrays && arrays[1] === "true")
                        {
                            document.getElementById("relationnewsframeid").contentWindow.sync(arrays[0]);
                        }
                    },
                'width': '700',
                'height': '260' 
           });     
    }

    function setfirstpagetitle(o)
    {
        if(pagenum!=0)
        {
            if(o.value=="")
        	{
        		o.value="点此输入当前页标题";
        	}
        }
        o.style.color = "#ccc";
    }

    function checkIsDateAndClean(id)
    {
       var obj = document.getElementById(id);
       var reg = /^\d{4}-(?:0\d|1[0-2])-(?:[0-2]\d|3[01])( (?:[01]\d|2[0-3])\:[0-5]\d\:[0-5]\d)?$/;
       if(!reg.test(obj.value))
       {
            obj.value='';
       }
    }
    function setWTime()
    {
       var zdksTimeObj = document.getElementById('wbtopdate');
       var ttksTimeObj = document.getElementById('tempwbfirstenddate');
       var reg = /^\d{4}-(?:0\d|1[0-2])-(?:[0-2]\d|3[01])( (?:[01]\d|2[0-3])\:[0-5]\d\:[0-5]\d)?$/;
       if(reg.test(zdksTimeObj.value) && reg.test(ttksTimeObj.value))
       {
           if(zdksTimeObj>ttksTimeObj)
           {
                WdatePicker({maxDate:'#F{$dp.$D(\'tempwbfirstenddate\')||$dp.$D(\'wbenddate\')}',dateFmt:'yyyy-MM-dd HH:mm:ss'})
           }else 
           {
               WdatePicker({maxDate:'#F{$dp.$D(\'wbtopdate\')||$dp.$D(\'wbenddate\')}',dateFmt:'yyyy-MM-dd HH:mm:ss'})
           }
       }else if(reg.test(zdksTimeObj.value) || reg.test(ttksTimeObj.value)){
            if(reg.test(zdksTimeObj.value)){WdatePicker({maxDate:'#F{$dp.$D(\'wbtopdate\')||$dp.$D(\'wbenddate\')}',dateFmt:'yyyy-MM-dd HH:mm:ss'})}
            if(reg.test(ttksTimeObj.value)){WdatePicker({maxDate:'#F{$dp.$D(\'tempwbfirstenddate\')||$dp.$D(\'wbenddate\')}',dateFmt:'yyyy-MM-dd HH:mm:ss'})}
       }else{
            WdatePicker({maxDate:'#F{$dp.$D(\'wbenddate\')}',dateFmt:'yyyy-MM-dd HH:mm:ss'})
       }
    }

    // Fix Flashes own cleanup code so if the SWF Movie was removed from the page
    // it doesn't display errors.
    window["__flash__removeCallback"] = function (instance, name) {
    	try {
    		if (instance) {
    			instance[name] = null;
    		}
    	} catch (flashEx) {
    	}
    };

    function doaudit(uuid,pid,tid,ismobilenews,pos)
    {
          var newsid=document.getElementById("wbnewsid").value;
           top.showDialog(window,{
                'title': '审核文章', 
                'url': "/system/site/column/news/auditinfowin.jsp?wbnewsid="+newsid+"&taskinstanceid="+tid+"&uuid="+uuid+"&pid="+pid+"&tid="+tid+"&ismobilenews=false",
                'arguments':new Array(window),
                'callbackFun':function(thevalue)
                    {
                          if(thevalue)
                          {
                                if(pos=="contentaudit")
                                    window.opener.location.href="/system/flow/auditlist.jsp";
                                else
                                    window.opener.location.href="/system/portal/news/auditjbpmlist.jsp";     
                                    window.close();
                          }
                    },
                'width': '560',
                'height': '250' 
           });
    }

    //生成手机版编辑器的第一页
    function createmobilfirstpage(thispage,noContent)
    {
            if(!thispage)
            {
                thispage = document.getElementById("nocontenttip");
            }
    		try{
    		$(thispage).after('<div class="mobilecontainer" name="mobilcontainer" style="display:none">'+
    						'<div style="float:left;width:100%;height:100px">'+
                                '<div class="headerwithbg" style="height:100px;background-color:white;width:100%;float:left">'+
                                        '<img src="/system/images/northwest.png" style="float:left;width:30px;margin-top:70px;margin-left:50px">'+
    									'<div class="ueditor-header-pagenum">当前第<span class="ueditor-pageheader-index" name="mobil">1</span>页&nbsp&nbsp共<span class="ueditor-pageheader-total">1</span>页</div>'+
    									'<div class="ueditor-page-header"><div class="page-header-wrapper"><!--input type="text" name="wbpagetitle" class="title" maxlength=255 onfocus="clearsubpagetitle(this)" onblur="setsubpagetitle(this)" value="" --><textarea style="display:none" name="wbsubcontent_m" id="wbcontent_m"></textarea><INPUT type="hidden"  name=wbnewspageid_m value="0"></div></div>'+
                                '</div>'+
                            '</div>'+
    						'<div class="edui-editor-iframeholder" style="height:400px"><iframe  name="ueditor_subcontent_m" style="height:100%;" class="mainiframe" scrolling="no" frameborder="0"></iframe>'+'</div>'+
    						'<div style="float:left;width:100%;height:80px;">'+
                                '<div class="footerwithbg" style="height:80px;background-color:white;width:100%;float:left">'+
    								'<div class="ueditor-insertpage" onmouseover="sethover(this)" onmouseout="clearhover(this)" onclick="createmobilappendpage(this.parentNode.parentNode.parentNode)"><img src="/system/images/ico_tjfy.gif">添加分页</div>'+
                                    '<img src="/system/images/southwest.png" style="float:left;width:30px;margin-top:0px;margin-left:50px">'+
                                '</div>'+
                            '</div>'+
    					'</div>');
            //初始化手机版的编辑器
    		var iframe = thispage.nextSibling.firstChild.nextSibling.firstChild;
    		var doc= iframe.contentWindow.document||iframe.document||iframe.contentDocument;
    		if(noContent)
    		{
                setupSubPage(doc,undefined,true);
             }else{
                 setupSubPage(doc,$("#wbcontent_m").val(),true);
            }
    		addEditorListener(doc);
    	}catch(e)
    	{}
    }

    //生成手机版分页
    function createmobilappendpage(thispage)
    {
            if(!thispage)
            {
                return;
            }
    		try{
    		$(thispage).after('<div class="mobilecontainer" name="mobilcontainer">'+
    						'<div style="float:left;width:100%;height:100px">'+
                                '<div class="headerwithbg" style="height:100px;background-color:white;width:100%;float:left">'+
    									'<div class="closesubpage" title="删除分页" onmouseover="sethover(this)" onmouseout="clearhover(this)" onclick="deletePage(this,0)"><img src="/system/images/ico_scby.gif">删除本页</div>'+
    									'<div class="upaddsubpage" title="向上合并" onmouseover="sethover(this)" onmouseout="clearhover(this)" onclick="addtoprevsubpage(this.parentNode.parentNode.parentNode,0)"><img src="/system/images/ico_xshb.gif">向上合并</div>'+
    									'<div class="upmovesubpage" title="上移此页" onmouseover="sethover(this)" onmouseout="clearhover(this)" onclick="upsubpage(this)"><img src="/system/images/ico_xsyd.gif">向上移动</div>'+
    									
                                        '<img src="/system/images/northwest.png" style="float:left;width:30px;margin-top:70px;margin-left:50px">'+
    									'<div class="ueditor-header-pagenum">当前第<span class="ueditor-pageheader-index" name="mobil">1</span>页&nbsp&nbsp共<span class="ueditor-pageheader-total">1</span>页</div>'+
    									'<div class="ueditor-page-header"><div class="page-header-wrapper"><!--input type="text" name="wbpagetitle" class="title" maxlength=255 onfocus="clearsubpagetitle(this)" onblur="setsubpagetitle(this)" value="点此输入当前页标题" --><textarea  style="display:none" name="wbsubcontent_m"></textarea><INPUT type="hidden"  name=wbnewspageid_m value="0"></div></div>'+
                                '</div>'+
                            '</div>'+
    						'<div class="edui-editor-iframeholder" style="height:400px"><iframe  name="ueditor_subcontent_m" style="height:100%" class="mainiframe" scrolling="no" frameborder="0"></iframe></div>'+
    						'<div style="float:left;width:100%;height:80px;">'+
                                '<div class="footerwithbg" style="height:80px;background-color:white;width:100%;float:left">'+
    								'<div class="ueditor-insertpage" onmouseover="sethover(this)" onmouseout="clearhover(this)" onclick="createmobilappendpage(this.parentNode.parentNode.parentNode)"><img src="/system/images/ico_tjfy.gif">添加分页</div>'+
    								'<div class="downaddsubpage" title="向下合并" onmouseover="sethover(this)" onmouseout="clearhover(this)" onclick="addtonextsubpage(this.parentNode.parentNode.parentNode,0)"><img src="/system/images/ico_xxhb.gif">向下合并</div>'+
                                    '<div class="downmovesubpage" title="下移此页" onmouseover="sethover(this)" onmouseout="clearhover(this)" onclick="downsubpage(this)"><img src="/system/images/ico_xxyd.gif">向下移动</div>'+
                                    '<img src="/system/images/southwest.png" style="float:left;width:30px;margin-top:0px;margin-left:50px">'+
                                '</div>'+
                            '</div>'+
    					'</div>');
            //初始化手机版的编辑器
    		var iframe = thispage.nextSibling.firstChild.nextSibling.firstChild;
    		var doc= iframe.contentWindow.document||iframe.document||iframe.contentDocument;
    		setupSubPage(doc,undefined,true);
    		addEditorListener(doc);
    		fixHeight();
        	 //更新分页页码相关信息	 
            _pagenum_m++;
        	 updateAllpageNum();
    		//焦点
    		ueditor.focus();
    		var iframe = ueditor.iframe;
    		var index = $("iframe[name='ueditor_subcontent_m']").index(ueditor.iframe);
    		onfocuspage(index);
    		
    	}catch(e)
    	{
            if(console){console.error(e);}
        }
    }

    //切换手机版编辑器
    //当前是哪个版本的编辑器
    var _isPCEditor = true;
    //有没有手机版  init的时候初始化
    var _hasMobilContent;
    var _editorChanged = false;
    var _rebulidMobil = false;
    /*
    *切换编辑器   创建手机版编辑器
    */
    function changeEditor()
    {
        var thispage = document.getElementById("nocontenttip");
    	//隐藏PC版  显示手机版分页一并切换
    	if(_isPCEditor)
    	{
    		//第一次切换并且是自动获取手机版的情况下  提示是否要导入普通版内容
            if(!_editorChanged && !_hasMobilContent)
            {
                top.showConfirm(window,"是否要创建独立的手机版正文？\r\n（创建时会默认导入普通版正文）",function(r){
                    if(r)
                    {   
                        //同步一键排版样式
                        $("#wbmobileformat").val($("#wbformat").val());
                        $("#mobilecssfile").val($("#cssfile").val());
                        //删除手机版
                        var mobilepages = getEditorPages("mobilcontainer");
                        for(var i = 0; i< mobilepages.length;i++)
                        {
                            deletePage(mobilepages[i],0,true);
                        }
                        //上面删除的时候  删除手机版正文也会使_pagenum_m--， 所以这里加回来
                        _pagenum_m++;
                        //重新生成首页
                        
                        createmobilfirstpage(document.getElementById("nocontenttip")); 
                        //重新生成分页
                        for(var i=0;i<pagenum;i++)
                        {
                            var brotherIndex = getEditorPagesNum('mobilcontainer') -1;
                            var brotherPage = getEditorPages('mobilcontainer')[brotherIndex];
                             createmobilappendpage(brotherPage); 
                        }
                        //同步内容
                        syncContents();    
                        
                         _hasMobilContent = true;
                         _editorChanged = !_editorChanged;
                         
                        var mobilepages = getEditorPages("mobilcontainer");
                        var pcpages = getEditorPages("pccontainer");
                        for(var i = 0; i< mobilepages.length;i++)
                        {
                            $(mobilepages[i]).show();
                        }
                        for(var i = 0; i< pcpages.length;i++)
                        {
                            $(pcpages[i]).hide();
                        }
                        $("#wbautomobilecontent").val(0);//手动保存手机版
                        _isPCEditor = false;
                        changeButtonState();
                        updateAllpageNum();
                        initEditorByFirmType();
                        //将焦点设置到第一页
                    	 focuspage(0, true);
                    	 isMobileStyle =  ($("#firmtype").val()=="multi" && !_isPCEditor);
                        fixHeight();
                    }else{
                        return;
                    }
                });
            }else{
                var mobilepages = getEditorPages("mobilcontainer");
                var pcpages = getEditorPages("pccontainer");
                for(var i = 0; i< mobilepages.length;i++)
                {
                    $(mobilepages[i]).show();
                }
                for(var i = 0; i< pcpages.length;i++)
                {
                    $(pcpages[i]).hide();
                }
                $("#wbautomobilecontent").val(0);//手动保存手机版
                 _isPCEditor = false;
                changeButtonState();
                updateAllpageNum();
                initEditorByFirmType();
                //将焦点设置到第一页
            	  focuspage(0, true);
            	  isMobileStyle =  ($("#firmtype").val()=="multi" && !_isPCEditor);
               fixHeight();    
            }
    	}else{
    	    var mobilepages = getEditorPages("mobilcontainer");
            var pcpages = getEditorPages("pccontainer");
    		for(var i = 0; i< mobilepages.length;i++)
            {
                $(mobilepages[i]).hide();
            }
            for(var i = 0; i< pcpages.length;i++)
            {
                $(pcpages[i]).show();
            }
            _isPCEditor = true;
            changeButtonState();
            updateAllpageNum();
            initEditorByFirmType();
            //将焦点设置到第一页
        	  focuspage(0, true);
        	  isMobileStyle =  ($("#firmtype").val()=="multi" && !_isPCEditor);
           fixHeight();  
    	}
        ueditor.undoManger.reset();
    }

    /*
    *更新所有的跟页码相关的数据
    */
    function updateAllpageNum()
    {
        if(!_isPCEditor)
        {
    		$("#ueditortotalpagenum").html(_pagenum_m+1);
        }else{
    		$("#ueditortotalpagenum").html(pagenum+1);
        }
        updateheaderpagenum();
        updatepagelist();    
    }

    /*编辑器加载的时候初始化手机版*/
    function initMobilPages()
    {
        //先生成首页 
        createmobilfirstpage(document.getElementById("nocontenttip"));
        //如果是编辑文章  初始化手机版分页
        if(($("#wbnewsid").val() > 0 && $("#wbauditing ").val() != -5 && !_rebulidMobil && _hasMobilContent) || ($("#wbnewsid").val() > 0 && $("#isrestore").val() == 1))  
        {
             //生成手机版分页
            initMobilSubpages();
        }
    }

    /*
    *导入普通版内容到PC版本
    */
    function syncContents()
    {
        DWREngine.setAsync(false); 
    	var pages = document.getElementsByName("ueditor_subcontent");
        var pages_m = document.getElementsByName("ueditor_subcontent_m");
        for(var i=0;i<pages.length;i++)
        {        
            NewsDwr.handleMobileNewsContent( getUeditorContent(i),function(datas){
                var olddoc = ueditor.document;
                var doc = pages_m[i].contentWindow.document || pages_m[i].document || pages_m[i].contentDocument;;
                ueditorswitchtodoc(doc);    
                ueditor.setContent(datas);
                ueditorswitchtodoc(olddoc);
                fixHeight();
            });
        }	
    	DWREngine.setAsync(true); 
    }

    /*
    *监控编辑器切换状态栏改变
    */
    var _isCurrentPositionDivFloat = false;//当前提示状态栏是否浮动
    function changeToolBarState()
    {
        try{
        	var contentDiv = $('#contentdiv');
        	var editorStateDiv = $('#editorstatediv');
        	//工具栏
        	var toolBarDiv = $('#edui1_toolbarboxouter');
        	var toolBarHeight = toolBarDiv.height();
        	//title区域
        	var titleDiv = $('#edui1_title');
            editorStateDiv.css("top",toolBarHeight+"px");
        	if(editorStateDiv && editorStateDiv.position().top <= toolBarHeight)
        	{
        		editorStateDiv.css('position','absolute');
        		editorStateDiv.css("background-color","#fff");
        		editorStateDiv.css("z-index","99999");
        		editorStateDiv.css("padding-bottom","10px");
        		editorStateDiv.css("padding-top","10px");
        		editorStateDiv.css("border","solid 1px #ccc");
        		//修复状态条浮动后宽度和margin不对的问题
        		editorStateDiv.css("width",titleDiv.width()+"px");
        		editorStateDiv.css("left",titleDiv.css("marginLeft"));		
        		editorStateDiv.css("margin-left","0px");	
        		editorStateDiv.css("border","solid 1px #ccc");
        		$("#pcbutton").css("margin-left","10px");
        		_isCurrentPositionDivFloat =  true;
        		changeButtonState();
        	}
            if(contentDiv.scrollTop()<= titleDiv.outerHeight(true))
        	{
        		editorStateDiv.css('position','static');
        		editorStateDiv.css("background-color","");
        		editorStateDiv.css("border","none");
        		editorStateDiv.css("padding","0px");
        		editorStateDiv.css("width","80%");
        		editorStateDiv.css("margin-left","10%");		
        		$("#pcbutton").css("margin-left","0px");
        		_isCurrentPositionDivFloat = false;
        		changeButtonState();
        	}
    	}catch(e){}
    }

    /*
    *根据编辑器切换工具条的位置和编辑器状态改变界面显示
    */
    function changeButtonState()
    {
        if($("#firmtype").val() != "multi")
        {
            return;    
        }
        
        if(_hasMobilContent){
            if(_isPCEditor)  //普通版
            {
                if(_isCurrentPositionDivFloat)
                {
                    $("#pcbutton").css("background","url(/system/editor/ueditor_news/themes/default/images/mobil/pc_l.gif)");
                    $("#pcbutton").unbind("click");
                    $("#pcbutton").css("cursor","default");
        		    $("#mobilbutton").css("background","url(/system/editor/ueditor_news/themes/default/images/mobil/m_h_s.gif)");
        		    $("#mobilbutton").bind("click",changeEditor);
                    $("#mobilbutton").css("cursor","pointer");
        		    $("#editorstate1").css("color","#B5AFB1");
        		    $("#editorstate1").html("手机版和普通版使用不同的正文");
        		    $("#editorstate3").html("　<a href='javascript:coerceSyncContent();' style='color:#666666'>导入正文至手机版</a>　|　<a href='javascript:deleteMobilPage();'  style='color:#666666'>删除手机版</a>");
        		    $("#editorstate2").html("当前正在编辑　普通版正文");
        		    $("#editorstateicon").css("margin-right","2px");
        		    $("#editorstateicon").css("background","url(/system/editor/ueditor_news/themes/default/images/mobil/pc_b_s.gif)");
                }else{
                    $("#pcbutton").css("background","url(/system/editor/ueditor_news/themes/default/images/mobil/pc_l.gif)");
                    $("#pcbutton").unbind("click");
                    $("#pcbutton").css("cursor","default");
        		    $("#mobilbutton").css("background","url(/system/editor/ueditor_news/themes/default/images/mobil/m_h.gif)");
        		    $("#mobilbutton").bind("click",changeEditor);
                    $("#mobilbutton").css("cursor","pointer");
        		    $("#editorstate1").css("color","#B5AFB1");
        		    $("#editorstate1").html("手机版和普通版使用不同的正文");
        		    $("#editorstate3").html("　<a href='javascript:coerceSyncContent();' style='color:#fff'>导入正文至手机版</a>　|　<a href='javascript:deleteMobilPage();' style='color:#fff'>删除手机版</a>");
        		    $("#editorstate2").html("当前正在编辑　普通版正文");
        		    $("#editorstateicon").css("margin-right","0px");
        		    $("#editorstateicon").css("background","url(/system/editor/ueditor_news/themes/default/images/mobil/pc_b.gif)");
                }
            }else{//手机版
                if(_isCurrentPositionDivFloat)
                {
                    $("#pcbutton").css("background","url(/system/editor/ueditor_news/themes/default/images/mobil/pc_h_s.gif)");
        		    $("#pcbutton").bind("click",changeEditor);
                    $("#pcbutton").css("cursor","pointer");
        		    $("#mobilbutton").css("background","url(/system/editor/ueditor_news/themes/default/images/mobil/m_l.gif)");
                    $("#mobilbutton").unbind("click");
                    $("#mobilbutton").css("cursor","default");
        		    $("#editorstate1").css("color","#B5AFB1");
        		    $("#editorstate1").html("手机版和普通版使用不同的正文");
        		    $("#editorstate3").html("　<a href='javascript:coerceSyncContent();' style='color:#666666'>从普通版导入正文</a>　|　<a href='javascript:deleteMobilPage();'   style='color:#666666'>删除手机版</a>");
        		    $("#editorstate2").html("当前正在编辑　手机版正文");
        		    $("#editorstateicon").css("margin-right","2px");
        		    $("#editorstateicon").css("background","url(/system/editor/ueditor_news/themes/default/images/mobil/m_b_s.gif)");
                }else{
        		    $("#pcbutton").css("background","url(/system/editor/ueditor_news/themes/default/images/mobil/pc_h.gif)");
        		    $("#pcbutton").bind("click",changeEditor);
                    $("#pcbutton").css("cursor","pointer");
        		    $("#mobilbutton").css("background","url(/system/editor/ueditor_news/themes/default/images/mobil/m_l.gif)");
                    $("#mobilbutton").unbind("click");
                    $("#mobilbutton").css("cursor","default");
        		    $("#editorstate1").css("color","#B5AFB1");
        		    $("#editorstate1").html("手机版和普通版使用不同的正文");
        		    $("#editorstate3").html("　<a href='javascript:coerceSyncContent();' style='color:#fff'>从普通版导入正文</a>　|　<a href='javascript:deleteMobilPage();'  style='color:#fff'>删除手机版</a>");
        		    $("#editorstate2").html("当前正在编辑　手机版正文");
        		    $("#editorstateicon").css("margin-right","0px");
        		    $("#editorstateicon").css("background","url(/system/editor/ueditor_news/themes/default/images/mobil/m_b.gif)");
                }
            }
        }else{
              if(_isCurrentPositionDivFloat)
                {
                    $("#pcbutton").css("background","url(/system/editor/ueditor_news/themes/default/images/mobil/pc_l.gif)");
                    $("#pcbutton").unbind("click");
                    $("#pcbutton").css("cursor","default");
        		    $("#mobilbutton").css("background","url(/system/editor/ueditor_news/themes/default/images/mobil/m_a_s.gif)");
        		    $("#mobilbutton").bind("click",changeEditor);
                    $("#mobilbutton").css("cursor","pointer");
        		    $("#editorstate1").css("color","#B5AFB1");
        		    $("#editorstate1").html("未创建手机版时，手机版正文默认来源于普通版正文");
        		    $("#editorstate3").html("");
        		    $("#editorstate2").html("当前正在编辑　普通版正文");
        		    $("#editorstateicon").css("margin-right","2px");
        		    $("#editorstateicon").css("background","url(/system/editor/ueditor_news/themes/default/images/mobil/pc_b_s.gif)");
                }else{
                    $("#pcbutton").css("background","url(/system/editor/ueditor_news/themes/default/images/mobil/pc_l.gif)");
                    $("#pcbutton").unbind("click");
                    $("#pcbutton").css("cursor","default");
        		    $("#mobilbutton").css("background","url(/system/editor/ueditor_news/themes/default/images/mobil/m_a.gif)");
        		    $("#mobilbutton").bind("click",changeEditor);
                    $("#mobilbutton").css("cursor","pointer");
        		    $("#editorstate1").css("color","#B5AFB1");
        		    $("#editorstate1").html("未创建手机版时，手机版正文默认来源于普通版正文");
        		    $("#editorstate3").html("");
        		    $("#editorstate2").html("当前正在编辑　普通版正文");
        		    $("#editorstateicon").css("margin-right","0px");
        		    $("#editorstateicon").css("background","url(/system/editor/ueditor_news/themes/default/images/mobil/pc_b.gif)");
                }
        }
        var windowWidth = $(window).width();
        if(windowWidth<1366)
        {
            if(_hasMobilContent)
            {
                $("#editorstate1").hide();    
            }
            $("#editorstate2").hide();
        }else{
            if(!_hasMobilContent)
            {   
                $("#editorstate1").show();  
            }
            $("#editorstate1").show();
            $("#editorstate2").show();
        }
    }

    /*
    *初始化编辑器时调用  根据网站类型决定切换条是否显示 某些功能是否显示
    */
    function initEditorByFirmType()
    {
        hiddenOrShowStatediv();
        hiddenOrShowTools();
    }

    /*
    *显示或者隐藏编辑器切换栏
    */
    function  hiddenOrShowStatediv()
    {
        var firmtype = $("#firmtype").val();
        if("multi" !=firmtype)
        {
            //隐藏切换工具条
            $("#editorstatediv").hide();
            $("#edui1_title").css("margin-bottom","20px");
        }else
        {
            //显示切换工具条
            $("#editorstatediv").show();
            $("#edui1_title").css("margin-bottom","10px");
        }
    }

    function  isMultiStatediv()
    {
        var firmtype = $("#firmtype").val();
         if("multi"==firmtype)
        {
            return true;
        }
        return false;
    }

    /*
    *根据当前编辑器显示或者隐藏某些功能  (word转PDF  word转flash  等) PC显示   mobil隐藏
    *手机版和多屏版的移动状态隐藏
    *pc版和多屏版的pc模式显示
    */
    function hiddenOrShowTools()
    {
          var firmtype = $("#firmtype").val();
            if("pc"==firmtype || ("multi"==firmtype && _isPCEditor))
            {
                 //显示功能
                 $("#Word2Flash").show();
                 $("#Word2PDF").show();
                baidu.editor.ui.buttons['swf'].setDisabled(false);
                baidu.editor.ui.buttons['pdf'].setDisabled(false);
            }else if("multi"==firmtype && !_isPCEditor)
            {
                //隐藏功能
                $("#Word2Flash").hide();
                $("#Word2PDF").hide();
                baidu.editor.ui.buttons['swf'].setDisabled(true);
                baidu.editor.ui.buttons['pdf'].setDisabled(true);
            }
    }
    /*获取编辑区域div    参数为类型  移动版或者普通版*/
    function getEditorPages(type)
    {
        var pages = new Array();
        var contentholder = document.getElementById("contentholder");
        if(UE.browser.ie && UE.browser.version < 8)
        {
            var alldiv = contentholder.children;
            for(var i = 0; i< alldiv.length;i++)
            {
                var divTmp = alldiv[i];
                if( divTmp.name == type)
                {
                   pages.push(alldiv[i]);
                }  
            }
        }else{
             $("div[name='"+type+"']").each(function(){
                pages.push(this);
            });
        }
        return pages;
    }

    /*获取移动版或者普通版的分页数*/
    function getEditorPagesNum(type)
    {
        return getEditorPages(type).length;
    }
    //删除手机版
    function  deleteMobilPage()
    {
        top.showConfirm(window,"是否删除手机版",function(r){
            if(r){
                var mobilepages = getEditorPages("mobilcontainer");
                for(var i = 0; i< mobilepages.length;i++)
                {
                    deletePage(mobilepages[i],0,true);
                } 
                //把手机版正文设置为空
                $("#wbcontent_m").val("");
                 //上面删除的时候  删除手机版正文也会使_pagenum_m--， 所以这里加回来
                 _pagenum_m++;
                 //自动保存手机版
                 $("#wbautomobilecontent").val(1);
                 _hasMobilContent = false;
                 _editorChanged = false;
                 _rebulidMobil = true;
                if(!_isPCEditor)
                {
                    changeEditor();    
                }else{
                    //如果当前在普通版  不用切换的
                	 changeButtonState();
                }
                //把手机版正文编辑器创建出来   因为删除手机版的时候删完了
                createmobilfirstpage(document.getElementById("nocontenttip")); 
            }
        });
        
    }
    //强制同步
    function coerceSyncContent()
    {
         top.showConfirm(window,"导入后现有手机版内容将会被覆盖，确认导入？",function(r){
            if(r){
                //删除旧的的手机版
                 var mobilepages = getEditorPages("mobilcontainer");
                 
                 _pagenum_m++;
                 for(var i = 0; i< mobilepages.length;i++)
                {
                    deletePage(mobilepages[i],0,true);
                }
                
                //重新生成
                 //同步一键排版样式
                $("#wbmobileformat").val($("#wbformat").val());
                $("#mobilecssfile").val($("#cssfile").val());
                //生成手机版首页 
                createmobilfirstpage(document.getElementById("nocontenttip")); 
                //生成手机版分页
                for(var i=0;i<pagenum;i++)
                {
                    var brotherIndex = getEditorPagesNum("mobilcontainer") -1;
                    var brotherPage = getEditorPages("mobilcontainer")[brotherIndex];
                    createmobilappendpage(brotherPage); 
                }
                _editorChanged = true;
                //同步内容
                syncContents();
                //如果当前是普通版 切换到手机版
                if(_isPCEditor) 
                {
                    changeEditor();  
                    //显示手机版
                }else{
                    var mobilepages = getEditorPages("mobilcontainer");
                    var pcpages = getEditorPages("pccontainer");
                    for(var i = 0; i< mobilepages.length;i++)
                    {
                        $(mobilepages[i]).show();
                    }
                    for(var i = 0; i< pcpages.length;i++)
                    {
                        $(pcpages[i]).hide();
                    }
                }
            }   
         });
    }
})(window);