const header = $('#header');
const wrapper = $('#wrapper');
const myWorld = $('#myWorld');
const equal = $('#equal');
const code = $('#code');
const colon = $('#colon');
const progList = $('#prog-list');
const libList = $('#lib-list');
const fireList = $('#fire-list')
 
const margin = `${header.outerHeight() + 10}px`;
setTimeout(() => wrapper.css('marginTop', margin), 100);

// Smooth Scrolling
$(document).ready(function(){
    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();
        var target = this.hash;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop':  ($target.offset().top - header.outerHeight())
        }, 900, 'swing');
    });
});

const showHeroText = (element, content, delay) => {
    if (content === "") 
        return;
    let currText = element.text();
    element.text(currText + content[0]);
    content = content.slice(1);
    setTimeout(() => showHeroText(element, content, delay), delay);
}

setTimeout(() => showHeroText(myWorld, "myWorld", 500),100);
setTimeout(() => showHeroText(equal, " = ", 500), 4100);
setTimeout(() => showHeroText(code, "code", 500), 5900);
setTimeout(() => colon.text(';'), 8100)

const removeFocus = () => {
    progList.slideUp();
    libList.slideUp();
    fireList.slideUp();
    $('#prog').removeClass('active');
    $('#lib').removeClass('active');
    $('#fire').removeClass('active');
}

removeFocus();

$('#prog').on('click', () => {
    removeFocus();
    if (!progList.is(':visible')) {
        $('#prog').addClass('active');
        progList.slideDown();
    }
});
$('#lib').on('click', () => {
    removeFocus();
    if (!libList.is(':visible')) {
        $('#lib').addClass('active');
        libList.slideDown();
    }
});
$('#fire').on('click', () => {
    removeFocus();
    if (!fireList.is(':visible')) {
        $('#fire').addClass('active');
        fireList.slideDown();
    }
});