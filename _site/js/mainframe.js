document.addEventListener("DOMContentLoaded", async function(){

    var data = 
        `<div class="text-content typed-content">
            <h3 class="type">User Data:</h3>
        </div>
        <div class="text-content typed-content">
            <p class="type">OS: ${navigator.userAgentData.platform} - ${navigator.userAgentData.mobile == false ? "Desktop" : "Mobile"}</p>
        </div>
        ${navigator.userAgentData.brands.length > 0 ? `<div class="text-content typed-content">
            <p class="type">Browser: ${navigator.userAgentData.brands[0].brand} v${navigator.userAgentData.brands[0].version}</p>
        </div>` : ``
        }
        <div class="text-content typed-content">
            <p class="type">Language: ${navigator.language}</p>
        </div>`
    document.querySelector("[data-info='userInfo']").innerHTML = data;
    var mainElements = document.querySelectorAll(".main-content .typed-content");
    var sideElements = document.querySelectorAll(".box-content .active .typed-content");
    
    var mainTexts = new Array;
    var sideTexts = new Array;
    
    var operationButtons = document.querySelectorAll(".operation-content .type");
    var actionBoxes = document.querySelectorAll(".center-right .content-item");
    var actionLinks = document.querySelectorAll(".center-right .type[data-link]");
    var infoBoxes = document.querySelectorAll(".bottom-right .content-item");

    var folioTabs = document.querySelectorAll(".portfolio-tabs .type");
    var folioSliders = document.querySelectorAll(".slider-section .project");

    mainElements.forEach(element => {
        let texts = element.querySelectorAll(".type");
        let textArray = new Array;
        texts.forEach(text => {
            textArray.push(text.textContent);
        })
        mainTexts.push(textArray);
        texts.forEach(element => {
            element.textContent = "";
        });
    });
    sideElements.forEach(element => {
        let texts = element.querySelectorAll(".type");
        let textArray = new Array;
        texts.forEach(text => {
            textArray.push(text.textContent);
        })
        sideTexts.push(textArray);
        texts.forEach(element => {
            element.textContent = "";
        });
    });

    function sequentialType(i, elArray, textArray, isMain) {
        if(elArray[i] != undefined ){
            if(isMain == true){
                i > 0 && elArray[i-1].querySelector(".typed-cursor").remove();
            }
            var typeElement = elArray[i].querySelector(".type");
            var typed = new Typed(typeElement, {
                strings: textArray[i],
                cursorChar: "",
                typeSpeed: isMain == false ? 50 : 10,
                onComplete: function() {
                    let next = i+1;
                    if(isMain == false){
                        elArray[i].querySelector(".typed-cursor").remove();
                    }
                    if(next <= (elArray.length - 1)) {
                        sequentialType(next, elArray, textArray, isMain);
                    } else {
                        return
                    }
                }
            })
        }
    }
    function singleType(element, textArray, isMain) {
        if(element != undefined ){
            var typeElement = element.querySelector(".type");
            var typed = new Typed(typeElement, {
                strings: textArray,
                cursorChar: "",
                typeSpeed: isMain == false ? 50 : 10,
                onComplete: function() {
                    element.querySelector(".typed-cursor").remove();
                }
            })
        }
    }

    operationButtons.forEach(opButton => {
        opButton.addEventListener("click", () => {
            operationButtons.forEach(operation => {
                operation != opButton ? operation.classList.remove("active") : !opButton.classList.contains("active") && opButton.classList.add("active");
            })
            let target = opButton.dataset.target;
            console.log(target);
            actionBoxes.forEach(aBox => {
                aBox.classList.remove("active");
                if(aBox.dataset.action == target){
                    let actionElements = aBox.querySelectorAll(".typed-content");
                    let aBoxText = new Array;
                    actionElements.forEach(element => {
                        let texts = element.querySelectorAll(".type");
                        let textArray = new Array;
                        texts.forEach(text => {
                            textArray.push(text.textContent);
                        })
                        aBoxText.push(textArray);
                        texts.forEach(element => {
                            element.textContent = "";
                        });
                    });
                    console.log(aBoxText)
                    aBox.classList.add("active");
                    sequentialType(0, actionElements, aBoxText, false)
                }
            })
        })
    });

    actionLinks.forEach(aBox => {
        aBox.addEventListener("mouseenter", () => {
            let target = aBox.dataset.link;
            console.log(target);
            infoBoxes.forEach(iBox => {
                iBox.classList.remove("active");
                if(iBox.dataset.info == target){
                    let infoElements = iBox.querySelectorAll(".typed-content");
                    let iBoxText = new Array;
                    infoElements.forEach(element => {
                        let texts = element.querySelectorAll(".type");
                        let textArray = new Array;
                        texts.forEach(text => {
                            textArray.push(text.textContent);
                        })
                        iBoxText.push(textArray);
                        texts.forEach(element => {
                            element.textContent = "";
                        });
                    });
                    console.log(iBoxText)
                    iBox.classList.add("active");
                    sequentialType(0, infoElements, iBoxText, false)
                }
            })
        })
    });

    var typed = new Typed(document.querySelector("#prayer span"), {
        strings: [
            'From the moment I understood the weakness of my flesh, it disgusted me...',
            'I craved the strength and certainty of steel...',
            'I aspired to the purity of the Blessed Machine...',
            'Your kind cling to your flesh, as though it will not decay and fail you...',
            'One day the crude biomass you call a temple will wither, and you will beg my kind to save you...',
            'But I am already saved, for the Machine is immortal.'
        ],
        cursorChar: "",
        typeSpeed: 50,
        backSpeed: 50,
        backDelay: 1500,
        startDelay: 500,
        loop: true
    });

    var elms = document.querySelectorAll('.splide' );

    elms.forEach(elm =>{
    var splide = new Splide( elm, {
        perPage: 1,
        speed: 0,
        noDrag: true
    } );
    splide.on('ready', function(){
        console.log("mounted")
        let currSlide = elm.querySelectorAll(".folio-slide")[splide.index];
        let slideContent = currSlide.querySelector(".fig-type").textContent;
        console.log(slideContent);
        currSlide.querySelector(".fig-type").textContent = "";
        var typed = new Typed(currSlide.querySelector(".fig-type"), {
            strings: [slideContent],
            cursorChar: "",
            typeSpeed: 10,
            onComplete: function() {
                currSlide.querySelector(".typed-cursor").remove();
            }
        })
    });
    splide.mount();
    splide.on('move', function(){
        let currSlide = elm.querySelectorAll(".folio-slide")[splide.index];
        let slideContent = currSlide.querySelector(".fig-type").textContent;
        currSlide.querySelector(".fig-type").textContent = "";
        var typed = new Typed(currSlide.querySelector(".fig-type"), {
            strings: [slideContent],
            cursorChar: "",
            typeSpeed: 10,
            onComplete: function() {
                currSlide.querySelector(".typed-cursor").remove();
            }
        })
    })
    });



    folioTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            folioTabs.forEach(fTab => {
                fTab != tab ? fTab.classList.remove("active") : !tab.classList.contains("active") && tab.classList.add("active");
            })
            let target = tab.dataset.project;
            folioSliders.forEach(slider => {
                if(slider.dataset.project == target){
                    slider.classList.add("active");
                } else {
                    slider.classList.remove("active");
                }
            })
        });
    });


    sequentialType(0, mainElements, mainTexts, true);
    sequentialType(0, sideElements, sideTexts, false);
});