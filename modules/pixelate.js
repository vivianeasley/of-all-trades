
  //const baseColors = ["#000000","#0000a3","#0037d1","#4b4cff","#91a4f0","#4cffff","#acffff","#00a3a3","#004746","#0c380c","#007701","#4cff4d","#c5ffc5","#dfdfdf","#cacaca","#a3a3a3","#707070","#4c4c4c","#292929","#773800","#dc6a00","#ffa300","#fe4746","#c20000","#770000","#762979","#cc29cc","#ff4cfe","#ff9dff","#efbbbb","#fff28c","#ffffff"];
  
   const baseColors = ["#242424","#005555","#008888","#55bbbb","#cccccc","#cc9999","#bb5555","#aa0000","#770077","#aa00aa","#cc22cc","#cc88aa","#cccc88","#55cc55","#00aa00","#008800"];
  
  //const baseColors = ["#000000","#554555","#a8a8a8","#ffffff","#a80000","#fe0000","#a85500","#fe7600","#fea876","#a8a800","#ffff04","#04a800","#06ff04","#04a8a8","#06ffff","#0076ff","#0000a8","#0000ff","#7600ff","#a800a8","#fe00ff","#fe0076"]
  
  function getRGBPallete () {
      const colorsArr = [];
      for (let colorIndex = 0; colorIndex < baseColors.length; colorIndex++) {
          const color = hexToRgb(baseColors[colorIndex])
          colorsArr.push(color);
      }
      
      return colorsArr;
  
      function hexToRgb(hex) {
          var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
          hex = hex.replace(shorthandRegex, function(m, r, g, b) {
          return r + r + g + g + b + b;
          });
      
          var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          return result ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16)
           ] : null;
      }
  }
  
  function distance(a, b) {
      return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2));
  }
  
  function getClosest(colors, rgb){
      return new Promise((resolve)=>{
      var lowest = Number.POSITIVE_INFINITY;
      var tmp;
      let index = 0;
      colors.forEach( (el, i) => {
          tmp = distance(rgb, el);
          if (tmp < lowest) {
              lowest = tmp;
              index = i;
          };
          
      })
      resolve(baseColors[index])
      })
  }
  
  export async function getImage (emojiArr, isTexture) {
    const rgbPallete = getRGBPallete();
    const canvasNodeStart = document.querySelector('#start');
    const canvasNodeEnd = document.querySelector('#final');
    const ctxStart = canvasNodeStart.getContext("2d", { willReadFrequently: true });
    const ctxEnd = canvasNodeEnd.getContext("2d");
  
    const arr = [];
    const width = isTexture ? 100 : 36;
    const height = isTexture ? 100 : 44;
    canvasNodeStart.width = width;
    canvasNodeStart.height = height;
    canvasNodeEnd.width = width;
    canvasNodeEnd.height = height;
  
    if (isTexture) {
        ctxStart.font="800px Arial";
        ctxStart.fillText(emojiArr[0], -150,20);
    } else {
        ctxStart.fillStyle = "#000";
        ctxStart.fillRect(0, 0, width, height);
        ctxStart.font="30px Arial";
        for (let emojiIndex = 0; emojiIndex < emojiArr.length; emojiIndex++) {
            ctxStart.fillText(emojiArr[emojiIndex], 2,40);
            
        }

    }

    let x = 0;
    let y = 0;
    while (x <= width &&
    y < height) {
        const colorData = ctxStart.getImageData(x, y, 1, 1).data;
        if (!arr[y]) arr[y] = [];
        arr[y].push([colorData[0], colorData[1], colorData[2],]);
        x++;
        if (x > width) {
        x = 0;
        y++;
        }
    }
  
    for (let yCoor = 0; yCoor < arr.length; yCoor++) {
        for (let xCoor = 0; xCoor < arr[yCoor].length; xCoor++) {
            
            const currentColor = await getClosest(rgbPallete, arr[yCoor][xCoor]);
            ctxEnd.fillStyle = arr[yCoor][xCoor].join(", ") === "0, 0, 0" ? "#00000000" : currentColor;
            ctxEnd.fillRect( xCoor, yCoor, 1, 1 );
        }
    }
    const dataUrl = canvasNodeEnd.toDataURL('image/png');
    return  dataUrl;
  }
  

  
  
  
  
    