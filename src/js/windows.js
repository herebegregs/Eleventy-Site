document.addEventListener('DOMContentLoaded', function(){
    function formatTime(number) {
        return number < 10 ? '0' + number : number;
    }

    let now = new Date();
    let hours = formatTime(now.getHours());
    let minutes = formatTime(now.getMinutes());

    document.getElementById("clock").textContent = `${hours}:${minutes}`

    document.getElementById("start-button").addEventListener("click", function() {
        document.getElementById("task-bar").classList.toggle("start-open");
    })

    //open windows
    let activeWindows = document.querySelectorAll(".window.open");

    let openers = document.querySelectorAll("#start-menu button[data-target]");
    for(let i = 0; i < openers.length; i++) {
        let target = openers[i].dataset.target;
        openers[i].addEventListener("click", function() {
            activeWindows = document.querySelectorAll(".window.open");
            if(activeWindows.length > 0){
                let lastTop = activeWindows[activeWindows.length -1].offsetTop;
                let lastLeft = activeWindows[activeWindows.length -1].offsetLeft;
                document.getElementById(target).style.top = (lastTop + 40) + "px";
                document.getElementById(target).style.left = (lastLeft + 40) + "px";
                activateWindow(document.getElementById(target));
            }
            document.getElementById(target).classList.add("open");
            document.getElementById('task-bar').classList.remove("start-open");
        })
    }
    //desktop icons

    let icons = document.querySelectorAll(".desktop button[data-target]");
    for(let i = 0; i < icons.length; i++) {
        let target = icons[i].dataset.target;
        icons[i].addEventListener("click", function() {
            activeWindows = document.querySelectorAll(".window.open");
            if(!icons[i].classList.contains("active")){
                icons[i].classList.toggle("active")
            } else {
                if(activeWindows.length > 0){
                    let lastTop = activeWindows[activeWindows.length -1].offsetTop;
                    let lastLeft = activeWindows[activeWindows.length -1].offsetLeft;
                    document.getElementById(target).style.top = (lastTop + 40) + "px";
                    document.getElementById(target).style.left = (lastLeft + 40) + "px";
                    document.getElementById(target).style.left = (lastLeft + 40) + "px";
                    activateWindow(document.getElementById(target));
                }
                document.getElementById(target).classList.add("open");
                icons[i].classList.remove("active")
            }
        })
    }
    
    //close windows
    let windowClosers = document.querySelectorAll(".window-close");
    for(let i = 0; i < windowClosers.length; i++) {
        windowClosers[i].addEventListener("click", function() {
            this.closest(".window").classList.remove("open")
        })
    }

    //draggable windows
    let draggableWindows = document.getElementsByClassName("window");

    for(let i = 0; i < draggableWindows.length; i++) {
        dragElement(draggableWindows[i])
    }

    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        elmnt.querySelector(".title-bar").onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    function activateWindow(window) {
        for(let i = 0; i < draggableWindows.length; i++) {
            draggableWindows[i].style.zIndex = 1;
        };
        window.style.zIndex = 5;
    }

    //window on top
    for(let i = 0; i < draggableWindows.length; i++) {
        draggableWindows[i].addEventListener("click", function() {
            activateWindow(draggableWindows[i]);
        })
    }

    function deactivateDetails(element) {
        for(let i = 0; i < explorerIcons.length; i++) {
            let window = element.closest(".window-content");
            let detailPane = window.querySelector(".details.open");
            explorerIcons[i].classList.remove("active");
            detailPane && detailPane.classList.remove("open");
            window.classList.remove("details-open")
        }
    }
    //explorer icons

    let explorerIcons = document.querySelectorAll(".explorer-pane .explorer-icon[data-details]");
    for(let i = 0; i < explorerIcons.length; i++) {
        let target = explorerIcons[i].dataset.details;
        explorerIcons[i].addEventListener("click", function(e) {
            // activeWindows = document.querySelectorAll(".window.open");
            if(!explorerIcons[i].classList.contains("active")){
                e.preventDefault();
                deactivateDetails(explorerIcons[i]);
                explorerIcons[i].classList.toggle("active");
                document.querySelector(".details[data-details="+target+"]").classList.add("open");
                explorerIcons[i].closest(".window-content").classList.add("details-open");
            } else {
                explorerIcons[i].classList.remove("active");
            }
        })
    }

    let explorerPanes = document.querySelectorAll(".explorer-pane");
    for(let i = 0; i < explorerPanes.length; i++) {
        explorerPanes[i].addEventListener("click", function(e) {
            if(e.target === e.currentTarget){
                deactivateDetails(explorerPanes[i]);
            }
        })
    }
    document.querySelectorAll('.splide').forEach(el => {
        new Splide( '.splide' ).mount();
      })


}); 