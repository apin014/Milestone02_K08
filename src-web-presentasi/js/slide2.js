/* Desktop */
var slider_img2 = document.querySelector('.slider-img2');
var images2 = ['desktop_1.jpg','desktop_2.jpg','desktop_3.jpg']
var i2 = 0;

function prev2(){
    if(i2 <= 0) i2 = images2.length;
    i2--;
    return setImg2();
}

function next2(){
    if(i2 >= images2.length - 1) i2 = -1;
    i2++;
    return setImg2();
}

function setImg2(){
    return slider_img2.setAttribute('src','img/' + images2[i2]);
}