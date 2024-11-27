const track = document.getElementById("image-track");



const handleOnDown = e => {
    if (track.contains(e.target)){
        track.dataset.mouseDownAt = e.clientX;
    }
};

const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;

}

const handleOnMove = e => {
    if(track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth * 1.5 ;

    const percentage = (mouseDelta / maxDelta) * -100 ,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -75);
    if(Number.isNaN(nextPercentage)){
        return;
    }
    track.dataset.percentage = nextPercentage;

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    for(const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${60 + nextPercentage}% center`
        }, { duration: 1200, fill: "forwards" });
    }
}

/* -- Had to add extra lines for touch events -- */

track.onmousedown = e => handleOnDown(e);

track.ontouchstart = e => handleOnDown(e.touches[0]);

track.onmouseup = e => handleOnUp(e);

track.ontouchend = e => handleOnUp(e.touches[0]);

track.onmousemove = e => handleOnMove(e);

track.ontouchmove = e => handleOnMove(e.touches[0]);