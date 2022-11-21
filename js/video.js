function jiekou() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myArr = JSON.parse(this.responseText);
            for (var i = 0; i < myArr.jiekou.length; i++) {
                var s = myArr.jiekou[i].url;
                var q = myArr.jiekou[i].name;
                var para = create1("option", s, q)
                var element = getid("jk");
                element.appendChild(para);
            }
        }
    };
    xmlhttp.open("GET", "https://cdn.jsdelivr.net/gh/Codebglh/json/movie/jiekou.json", false);
    xmlhttp.send();
}

function getid(name) {
    return document.getElementById(name)
}

function create(lable_1, value_1) {
    var a = document.createElement(lable_1);
    a.id = value_1;
    return a;
}

function create1(name_1, value_1, value_2) {
    var a = document.createElement(name_1);
    a.value = value_1;
    a.innerHTML = value_2;
    return a
}

function jiexi(url) {
    var jxApi = document.getElementById("jk"); //获取选择按钮
    var jxurl = document.getElementById("jk").selectedIndex; //获取选中的
    var jkv = jxApi.options[jxurl].value; //获取选择接口链接
    document.getElementById("iframe_a").src = jkv + url
}

function bofang(url) {
    const dp = new DPlayer({
        container: document.getElementById('dplayer'),
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

function delete_table(name) {
    if (getid(name)) {
        var a = getid("box")
        var para = getid(name);
        a.removeChild(para);
    } else {
        return;
    }


}

function main() {
    let url = getid("url_1").value
    var ss = RegExp(/m3u8/g)
    var hh = getid("box");
    if (url.match(ss)) {
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