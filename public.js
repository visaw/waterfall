var wrap = document.getElementsByClassName("wrap")[0];
var boxes = wrap.getElementsByClassName("box");
var colsNum, boxWidth, minHeight, index, maxHeight, boxLen;
var heightArray = [];

var data = [
    {
        src: "images/1.png"
    }, {
        src: "images/2.png"
    }, {
        src: "images/3.png"
    }, {
        src: "images/4.png"
    }, {
        src: "images/5.png"
    }, {
        src: "images/6.png"
    },{
        src: "images/7.png"
    }, {
        src: "images/8.png"
    }, {
        src: "images/9.png"
    }, {
        src: "images/10.png"
    }, {
        src: "images/11.png"
    },{
        src: "images/12.png"
    }, {
        src: "images/13.png"
    }, {
        src: "images/14.png"
    }, {
        src: "images/15.png"
    }, {
        src: "images/16.png"
    },{
        src: "images/17.png"
    }, {
        src: "images/18.png"
    }
];

//获取列数
function getColsNum() {
    //盒宽
    boxWidth = boxes[0].clientWidth;
    //窗体宽
    var windowWidth = document.body.clientWidth;
    //列数
    colsNum = Math.floor(windowWidth / boxWidth);
}

//排列瀑布流
function setPosition() {
    boxLen = boxes.length;
    for (var i = 0; i < boxLen; i++) {
        if (i < colsNum) {
            boxes[i].style.top = 0;
            boxes[i].style.left = boxWidth * i + "px";
            heightArray[i] = boxes[i].clientHeight;
            wrap.style.width = boxWidth * colsNum + "px";
        } else {
            setAppend(i);
        }
     }
}

function setAppend(boxIndex) {
    minHeight = Math.min.apply(null, heightArray);
    for (var j = 0; j < heightArray.length; j++) {
        if (minHeight === heightArray[j]) {
            index = j;
        }
    }
    boxes[boxIndex].style.top = minHeight + "px";
    boxes[boxIndex].style.left = boxWidth * index + "px";
    heightArray[index] += boxes[boxIndex].clientHeight;
}

window.onload = function() {
    getColsNum();
    setPosition();

    window.onscroll = function() {
        maxHeight = Math.max.apply(null, heightArray);
        var documentH = document.documentElement.clientHeight;
        var scrollH = document.documentElement.scrollTop || document.body.scrollTop;
        if (maxHeight <= (documentH + scrollH)) {
            for (var i = 0; i < data.length; i++) {
                var box = document.createElement("div");
                box.className = "box";
                var link = document.createElement("a");
                link.href = "#";
                var img = document.createElement("img");
                img.src = data[i].src;
                link.appendChild(img);
                box.appendChild(link);
                wrap.appendChild(box);
                boxLen++;
                setAppend(boxLen - 1);
            }
        }
    };
};