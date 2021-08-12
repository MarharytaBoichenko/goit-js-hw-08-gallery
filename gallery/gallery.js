function BigImg(bi_action,bi_url,lang)
{
	msg_prev = "предыдущая";
	msg_next = "следующая";
	msg_close = "закрыть";

	if(lang == "en")
	{
		msg_prev = "prev";
		msg_next = "next";
		msg_close = "close";
	}

	if(bi_action == "open")
	{
		document.getElementById("big_img").style.visibility = "visible";
		if(typeof(arr_images) != "undefined")
		{
			bi_prev = "";
			bi_next = "";
			bi_select = "";
			for(i=0;i<arr_images.length;i++)
			{
				if(bi_select != "" && bi_next == "") bi_next = "<a href=javascript:BigImg('open','"+arr_images[i]+"','"+lang+"');>"+msg_next+" ></a>";
				if(arr_images[i] == bi_url) bi_select = arr_images[i];
				if(bi_select == "") bi_prev = "<a href=javascript:BigImg('open','"+arr_images[i]+"','"+lang+"');>< "+msg_prev+"</a> ";
			}
			document.getElementById("here_img").innerHTML = "<img src='"+bi_url+"' border=0 OnClick=BigImg('close');><br><div class='nav_l'>"+bi_prev+bi_next+"</div><div class='nav_r'><a href=javascript:BigImg('close');>"+msg_close+"</a></div>";
		}
		else
		{
			document.getElementById("here_img").innerHTML = "<img src="+bi_url+" border=0 OnClick=BigImg('close');><br><div class='nav_r'><a href=javascript:BigImg('close');>"+msg_close+"</a></div>";
		}
	}
	else
	{
		document.getElementById("here_img").innerHTML = "";
		document.getElementById("big_img").style.visibility = "hidden";
	}
}
