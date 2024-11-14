document.addEventListener("DOMContentLoaded", function(){
    var typedElements = document.querySelectorAll(".typed-content");
    var typedTexts = new Array;
    typedElements.forEach(element => {
        let texts = element.querySelectorAll("p");
        let textArray = new Array;
        texts.forEach(text => {
            textArray.push(text.outerHTML)
        })
        typedTexts.push(textArray);
        texts.forEach(element => {
            element.remove();
        });
        console.log(typedTexts)
    })
    function sequentialType(i) {
        var typed = new Typed(typedElements[i].querySelector(".typed-target"), {
            strings: typedTexts[i],
            typeSpeed: 1,
            onComplete: function() {
                // console.log(document.querySelector(".typed-cursor"));
                document.querySelector(".typed-cursor").remove();
                if(typedElements[i++] != undefined) {
                    // let cursor = document.querySelectorAll(".typed-cursor")
                    sequentialType(i++);
                }
            }
            // function(){
            //     let cursor = element.querySelector('.typed-cursor');
            //     cursor.style.width = '100px';
            // }
        })
    }
    sequentialType(0)
});