document.addEventListener("DOMContentLoaded", function() {

    const resetTab = "translateX(calc(-100% + 42px))";

    const tabs = document.querySelectorAll("[data-tab]");
    const mobileTabs = document.querySelectorAll("[data-mobile]");
    console.log(tabs)
    const pages = document.querySelectorAll("[data-page]");
    tabs.forEach(tab =>{
        tab.addEventListener("click", function() {
            let target = tab.dataset.tab;
            console.log(target)
            pages.forEach(page => {
                console.log(page.classList)
                if(page.dataset.page === target) {
                    console.log("is open")
                    page.classList.toggle("open");
                } else {
                    page.classList.remove("open");
                }
            })
        });
    });
    mobileTabs.forEach(tab =>{
        tab.addEventListener("click", function() {
            let target = tab.dataset.mobile;
            console.log(target)
            pages.forEach(page => {
                console.log(page.classList)
                if(page.dataset.page === target) {
                    console.log("is open")
                    page.classList.toggle("open");
                } else {
                    page.classList.remove("open");
                }
            })
        });
    });

    let aligned = false;
    function alignTabs(){
        console.log("aligning")
        for(let i = 1; i < tabs.length; i++) {
            let prevTab = tabs[i-1].getBoundingClientRect();
            tabs[i].style.top = prevTab.bottom+"px";
        }
    }
    alignTabs();
    // window.addEventListener("resize", function(e){
    //     if(window.innerWidth > 1024 && aligned === false) {
    //         this.setTimeout(alignTabs(), 30000);
    //         aligned = true;
    //     }
    // })
    let mainMenu = document.querySelector("[data-page='links'] .page-content");
    let links = mainMenu.querySelectorAll("ul li[data-details]");
    let flyout = mainMenu.querySelector(".flyout");
    let flyoutDetails = mainMenu.querySelectorAll("[data-details");

    function closeFlyoutDetails() {
        flyout.classList.remove("open")
        for(let i = 0; i < flyoutDetails.length; i++) {
            flyoutDetails[i].classList.remove("active")
        }
    }
    var fadeOut;

    for(let i = 0; i < links.length; i++) {
        links[i].addEventListener("mouseenter", function() {
            clearTimeout(fadeOut)
            let target = links[i].dataset.details;
            closeFlyoutDetails();
            flyout.classList.add("open")
            flyout.querySelector("[data-details="+target+"]").classList.add("active")
        });
        links[i].addEventListener("mouseleave", function() {
            fadeOut = setTimeout(closeFlyoutDetails, 3000);
        })
    }


    const elWrap = document.querySelector(".backdrop");
    const elTilt = document.querySelector(".backdrop h1");
    const settings = {
        reverse: 0,        // Reverse tilt: 1, 0
        max: 15,           // Max tilt: 35
        perspective: 1000, // Parent perspective px: 1000
        scale: 1,          // Tilt element scale factor: 1.0
        axis: "",          // Limit axis. "y", "x"
    };

    elWrap.style.perspective = `${settings.perspective}px`;

    const tilt = (evt) => {
    const bcr = elWrap.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (evt.clientX - bcr.left) / bcr.width));
    const y = Math.min(1, Math.max(0, (evt.clientY - bcr.top) / bcr.height));
    const reverse = settings.reverse ? -1 : 1;
    const tiltX = reverse * (settings.max / 2 - x * settings.max);
    const tiltY = reverse * (y * settings.max - settings.max / 2);
    elTilt.style.transform = `
        rotateX(${settings.axis === "x" ? 0 : -tiltY}deg)
        rotateY(${settings.axis === "y" ? 0 : -tiltX}deg)
        translateY(${settings.axis === "y" ? 0 : tiltY}px)
        scale(${settings.scale})
    `;
    }

    elWrap.addEventListener("pointermove", tilt);

    var elms = document.querySelectorAll('.splide' );

    elms.forEach(elm =>{
    new Splide( elm ).mount();
    })

    const sliderButtons = document.querySelectorAll(".slider-display ul.project-list li");
    sliderButtons.forEach(button => {
        button.addEventListener("click", function(){
            let target = button.dataset.project;
            console.log("target", target)
            elms.forEach(elm => {
                console.log("remove all", elm.dataset.project)
                elm.classList.remove("active");
                if(elm.dataset.project === target) {
                    
                    elm.classList.add("active");
                }
            });
        })
    })
});