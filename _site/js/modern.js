document.addEventListener("DOMContentLoaded", function() {

    const resetTab = "translateX(calc(-100% + 42px))";

    const tabs = document.getElementsByClassName("page-edge");
    for(let i = 0; i < tabs.length; i++) {
        // tabs[i].style.setProperty("height", "calc((100dvh/"+tabs.length+") - (30px - "+10/tabs.length+"px))");
        tabs[i].addEventListener("click", function() {
            if(tabs[i].closest(".page-tab").classList.contains("open")) {
                tabs[i].closest(".page-tab").classList.toggle("open")
            } else {
                for(let j = 1; j < tabs.length; j++) {
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
    const pages = document.getElementsByClassName("page-tab");
    for(let i = pages.length; i > 0; i--) {
        pages[i-1].style.zIndex = i;
    }

});