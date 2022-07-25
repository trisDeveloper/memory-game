// start the game button
document.querySelector('.control-button').onclick = () => {
    let yourname = prompt('write your name');
    if (yourname == "" || yourname == null) {
        document.querySelector(".name span").innerHTML = 'unknow';
    } else {
        document.querySelector(".name span").innerHTML = yourname;
    }
    document.querySelector('.control-button').remove();
}
let duration = 1000 ;
let memoryblocks = document.querySelector('.memory-game-blocks');
let blocks = Array.from(memoryblocks.children);
let orderarange =  [...Array(blocks.length).keys()];

shuffle(orderarange);

blocks.forEach((block, index) => {

        block.style.order = orderarange[index];

        block.addEventListener('click', function () {
            flipblock(block);
        });

    }
);
//flip the block in rotating
function flipblock(selectedBlock) {
    selectedBlock.classList.add('rotating');

    let  allflippedblocks = blocks.filter(flippedblock => flippedblock.classList.contains('rotating'));

    if (allflippedblocks.length === 2) {
        stopclicking();
        checkmatchedblocks(allflippedblocks[0], allflippedblocks[1]);
    }
}
//shuffle the orderarange array
function shuffle(array) {
    let current = array.length,
        temp,
        random; 
    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
        
    }
    return array
};
function stopclicking() {
    memoryblocks.classList.add('noclick');
    setTimeout(() => {
        memoryblocks.classList.remove('noclick'); 
    }, duration);
}
function checkmatchedblocks(firstblock , secondblock) {
    let tries = document.querySelector(".tries span");
    if (firstblock.dataset.pic === secondblock.dataset.pic) {
        firstblock.classList.remove('rotating');
        secondblock.classList.remove('rotating');

        firstblock.classList.add('matched');
        secondblock.classList.add('matched');
        document.getElementById('success').play();

    } else {
        tries.innerHTML = parseInt(tries.innerHTML) + 1 ;
        setTimeout(() => {
            firstblock.classList.remove('rotating');
            secondblock.classList.remove('rotating');
        }, duration);
        document.getElementById('fail').play();

    }
}









