document.addEventListener("DOMContentLoaded", function() {

    const resetTab = "translateX(calc(-100% + 42px))";

    const tabs = document.getElementsByClassName("page-edge");
    for(let i = 0; i < tabs.length; i++) {
        // tabs[i].style.setProperty("height", "calc((100dvh/"+tabs.length+") - (30px - "+10/tabs.length+"px))");
        tabs[i].addEventListener("click", function() {
            if(tabs[i].closest(".page-tab").classList.contains("open")) {
                tabs[i].closest(".page-tab").classList.toggle("open")
            } else {
                for(let j = 0; j < tabs.length; j++) {
                    tabs[j].closest(".page-tab").classList.remove("open");
                }
                tabs[i].closest(".page-tab").classList.toggle("open");
            }
        })
    }
    for(let i = 1; i < tabs.length; i++) {
        let prevTab = tabs[i-1].getBoundingClientRect();
        tabs[i].style.top = prevTab.bottom+"px";
    }
    let mainMenu = document.querySelector("[data-tab='links'] .page-content");
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
        rotateX(${settings.axis === "x" ? 0 : tiltY}deg)
        rotateY(${settings.axis === "y" ? 0 : tiltX}deg)
        translateY(${settings.axis === "y" ? 0 : tiltY}px)
        scale(${settings.scale})
    `;
    }

    elWrap.addEventListener("pointermove", tilt);
});