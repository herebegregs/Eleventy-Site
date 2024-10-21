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
    let mainMenu = document.querySelector("#modern-menu .page-content");
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
});