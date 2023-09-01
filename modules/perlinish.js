import {getRandomIntInclusive} from "./character"
export const perlinish = (canvasNode)=>{
    const PE = {};
    const ctx = canvasNode.getContext("2d", { willReadFrequently: true });
    const svg = document.querySelector("#perlin-svg");
    PE.generate = async ()=>{
        let i = 0;
        while (i < 100) {
            let newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
            const startingPointX = getRandomIntInclusive(-100, 1020)
            const startingPointY = getRandomIntInclusive(-100, 1020)
            newElement.setAttribute("d",`M${randPoint(startingPointX)} ${randPoint(startingPointY)} L${randPoint(startingPointX)} ${randPoint(startingPointY)} L${randPoint(startingPointX)} ${randPoint(startingPointY)} L${randPoint(startingPointX)} ${randPoint(startingPointY)} L${randPoint(startingPointX)} ${randPoint(startingPointY)} Z`);
            newElement.setAttribute("fill","#000");
            newElement.setAttribute("filter","url(#blur)");
            newElement.setAttribute("class","feature");
            newElement.setAttribute("opacity","0.4");
            svg.appendChild(newElement);
            i++;
        }
            // ////// For Debugging
            // let circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
            // circle.setAttribute("fill","#000");
            // circle.setAttribute("cx",500);
            // circle.setAttribute("cy",500);
            // circle.setAttribute("r",5);
            // svg.appendChild(circle);
            // /////
        await createImage();

        const features = document.querySelectorAll(".feature")
        for (let featureIndex = 0; featureIndex < features.length; featureIndex++) {
            features[featureIndex].remove();
            
        }
    }
    //410 607
    PE.getQaud = async (x, y)=>{
        let xCount = 0;
        let yCount = 0;
        let arr = []
        const width = 200;
        const height = 200;
        while (xCount <= width &&
            yCount < height) {
            const colorData = await getColorData(x+xCount, y+yCount);
            if (!arr[yCount]) arr[yCount] = [];
            arr[yCount].push(colorData[3]);
            xCount++;
            if (xCount > width) {
                xCount = 0;
                yCount++;
            }
        }
        return arr;
    }

    function randPoint (startingPoint) {
        return getRandomIntInclusive(1,200)+startingPoint
    }

    function createImage () {
        return new Promise((resolve)=>{
            var s = new XMLSerializer().serializeToString(svg);
            var encodedData = window.btoa(s);
            var img = new Image();
            img.onload = function() {
                ctx.drawImage(img, 0, 0);
                resolve();
            }
            img.src = "data:image/svg+xml;base64,"+encodedData;
        })
    }

    function getColorData (x, y) {
        return new Promise((resolve)=>{
            resolve(ctx.getImageData(x, y, 1, 1).data);
        })
    }

    return PE;
}