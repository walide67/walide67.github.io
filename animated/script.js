
var sectionHistory = [];
const screenWidth  = window.screen.width;
const screenHeight = window.screen.height;
var stopSvg = document.getElementById('stop');
var playSvg = document.getElementById('play');
var restartSvg = document.getElementById('restart');
var restartStatus = false;

var glope = VANTA.GLOBE({
  el: "body",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00
})

var config = {
    minSize: 35,
    maxSize: 150,
    textSizeUnit: 'rem',
    domSizeUnit: 'px',
    fontSizeRatio: 0.5,
    sizeRatio: 5,
    bgColor: "#2b6da7ff",
    lightColor: '0xff0040',
    playTimeout: 200
}

if(screenWidth < 650){
    var lastScrollTop = 0;
    config.minSize = 0.5
    config.maxSize = 70
    config.maxSize = 70
    config.playTimeout = 400
    document.querySelector('.action-btn .options').style.display = 'none';
    document.querySelector('.copyright').style.width = '90%';
    document.addEventListener("scroll", function(event){ // or window.addEventListener("scroll"....
        var st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
            onWheel(event, false);
        } else if (st < lastScrollTop) {
            onWheel(event, true);
        }
        lastScrollTop = st <= 0 ? 0 : st;
     }, false);
}
var playInterval = null;
    document.addEventListener('wheel', onWheel, {passive: false})
    document.addEventListener('keydown', function(event){
        if(event.key === "ArrowUp" || event.key === "ArrowDown"){
            onWheel(event)
        }
    })
    document.addEventListener('keyup', function(event){
        if (event.code === "Space") {
            togglePlayStop(event)
        }
    })
    var playStopBtn = document.getElementById('playStopBtn');
    playStopBtn.addEventListener('click', togglePlayStop);

function togglePlayStop(event){
    if(playInterval === null){
        playSvg.style.display = 'none';
        stopSvg.style.display = 'flex';
        playInterval = setInterval(function(){
            onWheel(event, true)
        }, config.playTimeout);
    }else{
        if(restartStatus){
            restart();
            clearInterval(playInterval);
            playSvg.style.display = 'none';
            restartSvg.style.display = 'none';
            stopSvg.style.display = 'flex';
            playInterval = setInterval(function(){
                onWheel(event, true)
            }, config.playTimeout); 
        }else{

            clearInterval(playInterval);
            playInterval = null;
            stopSvg.style.display = 'none';
            playSvg.style.display = 'flex';  
        }   
    } 
}


function onWheel(event, isUp = false){
    if (event.type === "wheel"){
        isUp = event.wheelDelta > 0;
    }

    if (event.type === "keydown"){
        isUp = event.key === "ArrowUp";
    }
    let activeDom = document.getElementsByClassName('active')[0];
    if(isUp){
        increase(activeDom)
        if(getStylePropertyValue(activeDom.querySelector(".text"), 'font-size') > config.maxSize){
            if(activeDom.nextElementSibling !== null){
                activeDom.classList.remove('active');
                activeDom = activeDom.nextElementSibling;
                activeDom.classList.add('active');
                restartStatus = false;
            }else{
                playSvg.style.display = 'none';
                stopSvg.style.display = 'none';
                restartSvg.style.display = 'flex';
                restartStatus = true;
                decrease(activeDom);
            }
            
        }
    }else{
        decrease(activeDom);
        if(getStylePropertyValue(activeDom.querySelector(".text"), 'font-size') < config.minSize){
            if(activeDom.previousElementSibling !== null){
                activeDom.classList.remove('active');
                activeDom = activeDom.previousElementSibling;
                activeDom.classList.add('active');
                restartStatus = false;
            }else{
                playSvg.style.display = 'flex';
                stopSvg.style.display = 'none';
                restartSvg.style.display = 'none';
                restartStatus = true;
                increase(activeDom)
            }
        }
    }

}

function restart(){
    texts = document.querySelectorAll('.content p .text');
    smalls = document.querySelectorAll('.content p small');
    imgs = document.querySelectorAll('.content img');
    svgs = document.querySelectorAll('.content svg');
    for(const text of texts){
        text.style.fontSize = '2.1rem';
    }

    for(const small of smalls){
        small.style.fontSize = '0.8rem';
    }

    for(const image of imgs){
        image.style.width = "200px"
        image.style.height = "200px"
    }

    for(const svg of svgs){
        svg.style.width = "35px"
        svg.style.height = "35px"
    }
    //document.body.style.backgroundColor = config.bgColor;
    glope.setOptions({
        backgroundColor: config.bgColor,
        color: config.lightColor,
    })
    document.querySelector('.content .active').classList.remove('active');
    let fisrtP = document.querySelector('.content p');
    fisrtP.classList.add('active');
}

function increase(dom){
    for (const child of dom.children) {
        let tagName = child.tagName;
        if(tagName === 'P' || tagName === 'SPAN' || tagName === 'SMALL'){
            style = window.getComputedStyle(child, null).getPropertyValue('font-size');
            currentSize = parseFloat(style);
            child.style.fontSize = ((currentSize/16) + config.fontSizeRatio) + config.textSizeUnit;
        }else{
            width = window.getComputedStyle(child, null).getPropertyValue('width');
            height = window.getComputedStyle(child, null).getPropertyValue('height');
            currentWidth = parseFloat(width);
            currentHeight = parseFloat(height);
            child.style.width = (currentWidth + config.sizeRatio) + config.domSizeUnit;
            child.style.height = (currentHeight + config.sizeRatio) + config.domSizeUnit;
        }
    }
    if(dom.classList.contains("new-section")){
        if( sectionHistory.filter(section => section.name === dom.querySelector('.text').innerHTML).length === 0){
            let color = getDarkColor();
            let lightColor = getLightColor();
            sectionHistory.push({name :  dom.querySelector('.text').innerHTML, color: color, lightColor: lightColor })
            //document.body.style.backgroundColor = color;
            glope.setOptions({
                backgroundColor: color,
                color: lightColor
            })
        }
    }
}

function decrease(dom){
    for (const child of dom.children) {
        let tagName = child.tagName;
        if(tagName === 'P' || tagName === 'SPAN' || tagName === 'SMALL'){
            style = window.getComputedStyle(child, null).getPropertyValue('font-size');
            currentSize = parseFloat(style);
            child.style.fontSize = ((currentSize/16) - config.fontSizeRatio) + config.textSizeUnit;
        }else{
            width = window.getComputedStyle(child, null).getPropertyValue('width');
            height = window.getComputedStyle(child, null).getPropertyValue('height');
            currentWidth = parseFloat(width);
            currentHeight = parseFloat(height);
            child.style.width = (currentWidth - config.sizeRatio) + config.domSizeUnit;
            child.style.height = (currentHeight - config.sizeRatio) + config.domSizeUnit;
        } 
    }

    if(dom.classList.contains("new-section")){
        let section = sectionHistory.find(section => section.name === dom.querySelector('.text').innerHTML);
        if(sectionHistory.length > 0 &&  section !== undefined){
            sectionHistory = sectionHistory.filter(s => s.name !== section.name)
            //document.body.style.backgroundColor = sectionHistory.slice(-1)[0].color;
            glope.setOptions({
                backgroundColor: sectionHistory.slice(-1)[0].color,
                color: sectionHistory.slice(-1)[0].lightColor
            })
        }else if(sectionHistory.length === 0){
            //document.body.style.backgroundColor = config.bgColor;
            glope.setOptions({
                backgroundColor: config.bgColor,
                color: config.lightColor,
            })
        }
    }

}

function getStylePropertyValue(dom, property){
    style = window.getComputedStyle(dom, null).getPropertyValue(property);
    currentSize = parseFloat(style);
    return currentSize;
}

function getDarkColor() {
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += Math.floor(Math.random() * 10);
    }
    return color;
}

function getLightColor() {
  let color = '#';
  for (let i = 0; i < 6; i++) {
    // Limit to hex values that result in lighter colors (e.g., 8-F for each hex digit)
    const randomDigit = Math.floor(Math.random() * 8 + 8).toString(16); // 8-F in hex
    color += randomDigit;
  }
  return color;
}

