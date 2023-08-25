
export const setUpKeys = (keys) => {
    const keyEventArr = [];
    function checkKeyArr () {
        if (keyEventArr.length === 0) return;
        if (keyEventArr.length === 1) keys[keyEventArr[0]]();
        // if (keyEventArr.length === 2 &&
        //     keys[keyEventArr[0]+"-"+keyEventArr[1]]) keys[keyEventArr[0]+"-"+keyEventArr[1]]();
        // if (keyEventArr.length === 2 &&
        //     keys[keyEventArr[1]+"-"+keyEventArr[0]]) keys[keyEventArr[1]+"-"+keyEventArr[0]]();
        
    }

    function handleKeyDown (e) {
        e.preventDefault();
        if (keys[e.key] && !keyEventArr.includes(e.key)) {
            keyEventArr.push(e.key);
            checkKeyArr();
        }
    }

    function handleKeyUp (e) {
        e.preventDefault();
        if (keys[e.key] && keyEventArr.includes(e.key)) {
            keyEventArr.splice(keyEventArr.indexOf(e.key), 1);
            checkKeyArr();
        }
    }

    function attach() {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
    }

    attach();

}


// src.addEventListener(
//     "touchstart",
//     (e) => {
//       // Cache the client X/Y coordinates
//       clientX = e.touches[0].clientX;
//       clientY = e.touches[0].clientY;
//     },
//     false,
//   );