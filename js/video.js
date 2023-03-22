// function jiekou() {
//     var xmlhttp = new XMLHttpRequest(); //创建一个xml请求
//     xmlhttp.onreadystatechange = function() { //当XML请求成功时调用匿名函数
//         if (this.readyState == 4 && this.status == 200) {
//             myArr = JSON.parse(this.responseText);
//             for (var i = 0; i < myArr.jiekou.length; i++) { //循环遍历json文件
//                 var s = myArr.jiekou[i].url; //链接
//                 var q = myArr.jiekou[i].name; //名字
//                 var para = create1("option", s, q) //创建一个option标签并赋值
//                 var element = getid("jk"); //获取标签
//                 element.appendChild(para); //写入
//             }
//         }
//     };
//     xmlhttp.open("GET", "https://cdn.jsdelivr.net/gh/Codebglh/json/movie/jiekou.json", false); //false表示同步,ture表示异步
//     xmlhttp.send();
// }

// function getid(name) {
//     return document.getElementById(name) //获取标签
// }

// function create(lable_1, value_1) {
//     var data = document.createElement(lable_1); //创建标签
//     data.id = value_1; //赋值
//     return data;
// }

function bofang(url) { //创建一个dplayer
    const dp = new DPlayer({
        container: getid('dplayer'),
        video: {
            url: url,
            type: 'customHls',
            customType: {
                customHls: function (video, player) {
                    const hls = new Hls();
                    hls.loadSource(video.src);
                    hls.attachMedia(video);
                },
            },
        },

    });
}

function main() {
    let url = getid("url").value;
    bofang(url)
}