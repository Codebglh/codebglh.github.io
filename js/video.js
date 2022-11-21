function jiekou() {
    var xmlhttp = new XMLHttpRequest(); //创建一个xml请求
    xmlhttp.onreadystatechange = function() { //当XML请求成功时调用匿名函数
        if (this.readyState == 4 && this.status == 200) {
            myArr = JSON.parse(this.responseText);
            for (var i = 0; i < myArr.jiekou.length; i++) { //循环遍历json文件
                var s = myArr.jiekou[i].url; //链接
                var q = myArr.jiekou[i].name; //名字
                var para = create1("option", s, q) //创建一个option标签并赋值
                var element = getid("jk"); //获取标签
                element.appendChild(para); //写入
            }
        }
    };
    xmlhttp.open("GET", "https://cdn.jsdelivr.net/gh/Codebglh/json/movie/jiekou.json", false);
    xmlhttp.send();
}

function getid(name) {
    return document.getElementById(name) //获取标签
}

function create(lable_1, value_1) {
    var a = document.createElement(lable_1); //创建标签
    a.id = value_1; //赋值
    return a;
}

function create1(name_1, value_1, value_2) {
    var a = document.createElement(name_1);
    a.value = value_1; //创建标签
    a.innerHTML = value_2; //赋值
    return a
}

function jiexi(url) {
    var jxApi = getid("jk"); //获取选择按钮
    var jxurl = getid("jk").selectedIndex; //获取选中的
    var jkv = jxApi.options[jxurl].value; //获取选择接口链接
    getid("iframe_a").src = jkv + url //拼接并发送
}

function bofang(url) { //创建一个dplayer
    const dp = new DPlayer({
        container: getid('dplayer'),
        video: {
            url: url,
            type: 'customHls',
            customType: {
                customHls: function(video, player) {
                    const hls = new Hls();
                    hls.loadSource(video.src);
                    hls.attachMedia(video);
                },
            },
        },

    });
}

function delete_table(name) { //删除标签
    if (getid(name)) { //获取id如果能获取则删除
        var a = getid("box")
        var para = getid(name);
        a.removeChild(para);
    } else { //不能则返回
        return;
    }


}

function main() {
    let url = getid("url_1").value
    var ss = RegExp(/m3u8/g) //正则
    var hh = getid("box");
    if (url.match(ss)) { //匹配正则
        //执行m3u8格式的程序
        delete_table("iframe_a")
        if (getid("dplayer")) {
            bofang(url)
        } else {
            var a = create("div", "dplayer");
            hh.appendChild(a);
            bofang(url)
        }
    } else {
        //执行解析
        delete_table("dplayer")
        if (getid("iframe_a")) {
            jiexi(url);
        } else {
            var a = create("iframe", "iframe_a");
            hh.appendChild(a);
            jiexi(url);
        }
    }
}