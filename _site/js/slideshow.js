const angle =   '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xml:space="preserve">'
                    +'<style type="text/css">.st0{fill:none;}</style>'
                    +'<path d="M9,18l7-6L9,6V18z"/>'
                    +'<rect class="st0" width="24" height="24"/>'
                    +'<rect class="st0" width="24" height="24"/>'
                +'</svg>';
document.addEventListener("DOMContentLoaded", function() {
    if(document.querySelectorAll(".slideshow").length > 0) {
        console.log("slkides exists");
        let slideshows = document.querySelectorAll(".slideshow");
        for (let i = 0; i < slideshows.length; i++) {
            var wrapper = document.createElement('div');
            var navs = document.createElement('div');
            navs.innerHTML = '<'
            wrapper.classList.add("slideshow-container")
            slideshows[i].parentNode.insertBefore(wrapper, slideshows[i]);
            wrapper.appendChild(slideshows[i]);
        }
    } else {
        console.log("no slides");
    }
})