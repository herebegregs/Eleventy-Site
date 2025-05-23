document.addEventListener('DOMContentLoaded', function(){
    function formatTime(number) {
        return number < 10 ? '0' + number : number;
    }

    let now = new Date();
    let hours = formatTime(now.getHours());
    let minutes = formatTime(now.getMinutes());

    document.getElementById("clock").textContent = `${hours}:${minutes}`

    document.getElementById("start-button").addEventListener("click", function(event) {
        document.getElementById("task-bar").classList.toggle("start-open");
        event.stopImmediatePropagation();
        document.addEventListener("click", function(e) {
            if(e.target != document.querySelector("#start-menu")){
                document.getElementById("task-bar").classList.remove("start-open");
                document.removeEventListener("click", function(){});
            }
        })
    })

    //open windows
    let activeWindows = document.querySelectorAll(".window.open");

    let openers = document.querySelectorAll("#start-menu button[data-target]");
    for(let i = 0; i < openers.length; i++) {
        let target = openers[i].dataset.target;
        openers[i].addEventListener("click", function() {
            activeWindows = document.querySelectorAll(".window.open");
            if(activeWindows.length > 0){
                if(window.innerWidth > 768){
                    let lastTop = activeWindows[activeWindows.length -1].offsetTop;
                    let lastLeft = activeWindows[activeWindows.length -1].offsetLeft;
                    document.getElementById(target).style.top = (lastTop + 40) + "px";
                    document.getElementById(target).style.left = (lastLeft + 40) + "px";
                }
                activateWindow(document.getElementById(target));
            }
            document.getElementById(target).classList.add("open");
            document.getElementById('task-bar').classList.remove("start-open");
        })
    }
    //desktop icons

    function deactivateDeskIcons() {
        icons.forEach(icon => {
            icon.classList.remove("active");
        })
    }

    let icons = document.querySelectorAll(".desktop button[data-target]");
    for(let i = 0; i < icons.length; i++) {
        let target = icons[i].dataset.target;
        icons[i].addEventListener("click", function() {
            icons.forEach(icon => {
                if(icon == this){
                    this.classList.add("active")
                } else {
                    icon.classList.remove("active");
                }
            })
        })
        icons[i].addEventListener("dblclick", function() {
            activeWindows = document.querySelectorAll(".window.open");
            if(activeWindows.length > 0){
                let lastTop = activeWindows[activeWindows.length -1].offsetTop;
                let lastLeft = activeWindows[activeWindows.length -1].offsetLeft;
                document.getElementById(target).style.top = (lastTop + 40) + "px";
                document.getElementById(target).style.left = (lastLeft + 40) + "px";
                document.getElementById(target).style.left = (lastLeft + 40) + "px";
                activateWindow(document.getElementById(target));
            }
            document.getElementById(target).classList.add("open");
        });
    }

    document.addEventListener("click", function(e){
        if(!e.target.classList.contains("desktop-icon")){
            deactivateDeskIcons();
        }
    })
    
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
            activateWindow(elmnt)
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

    function deactivateDetails(element, fullClose) {
        for(let i = 0; i < explorerIcons.length; i++) {
            let window = element.closest(".window-content");
            let detailPane = window.querySelector(".details.open");
            if(fullClose === true){
                window.classList.remove("details-open");
            }
            explorerIcons[i].classList.remove("active");
            detailPane && detailPane.classList.remove("open");
        }
    }
    //explorer icons

    let explorerIcons = document.querySelectorAll(".explorer-pane .explorer-icon[data-details]");
    for(let i = 0; i < explorerIcons.length; i++) {
        let target = explorerIcons[i].dataset.details;
        explorerIcons[i].addEventListener("click", function(e) {
            e.preventDefault();
            if(!this.classList.contains("active")){
                let window = explorerIcons[i].closest(".window-content");
                deactivateDetails(this, false);
                this.classList.toggle("active");
                document.querySelector(".details[data-details="+target+"]").classList.add("open");
                // setTimeout(()=>{window.classList.add("details-open")}, 200);
                !window.classList.contains("details-open") && setTimeout(()=>{window.classList.add("details-open")}, 200);

            } else {
                explorerIcons[i].classList.remove("active");
            }
        });
        explorerIcons[i].addEventListener("dblclick", function(e) {
            window.location = explorerIcons[i].href
        });
    }

    let explorerPanes = document.querySelectorAll(".explorer-pane");
    explorerPanes.forEach(pane =>{
        pane.addEventListener("click", function(e) {
            if(!e.target.classList.contains("explorer-icon")){
                deactivateDetails(pane, true);
            }
        })
    });

    document.querySelectorAll(".collapser").forEach(collapser => {
        collapser.addEventListener("click", function(e) {
            collapser.classList.toggle("active");
            let activeProject = collapser.closest("li[data-project").dataset.project;
            document.querySelector("ul[data-project="+activeProject+"]").classList.toggle("collapsed");
        });
    });
    
    const helpProjects = document.querySelectorAll("#help-window .project");
    const fileDisplays = document.querySelectorAll(".display-details li");
    const fileList = document.querySelectorAll(".file")
    
    fileList.forEach(file => {
        file.addEventListener("click", function(e) {
            fileList.forEach(otherfile => {
                if(otherfile != file) {
                    otherfile.classList.remove("selected")
                } else {
                    otherfile.classList.add("selected")
                }
            });
            if(!document.querySelector("#help-window").classList.contains("open") && window.innerWidth > 768){
                let portfolioTop = document.querySelector("#portfolio-window").offsetTop;
                let portfolioWidth = document.querySelector("#portfolio-window").offsetWidth;
                document.querySelector("#help-window").style.top = (portfolioTop + 40) + "px";
                document.querySelector("#help-window").style.left = (portfolioWidth + 120) + "px";
                document.querySelector("#help-window").classList.add("open");
            }
            let targetTopic = file.dataset.target;
            let targetProject = file.closest("ul").dataset.project;
            fileDisplays.forEach(display => {
                if(display.dataset.target === targetTopic) {
                    display.classList.add("active")
                } else {
                    display.classList.remove("active")
                }
            });
            helpProjects.forEach(project => {
                if(project.dataset.project ===  targetProject) {
                    let projectTopics = project.querySelectorAll(".help-topic");
                    projectTopics.forEach(topic => {
                        if(topic.dataset.topic === targetTopic) {
                            topic.classList.add("active")
                        } else {
                            topic.classList.remove("active")
                        }
                    })
                    project.classList.add("active");

                } else {
                    project.classList.remove("active");
                }
            })
        })
    })
}); 