document.addEventListener('DOMContentLoaded', function(){
    console.log("loaded!");

    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    document.getElementById("clock").textContent = `${hours}:${minutes}`
}); 