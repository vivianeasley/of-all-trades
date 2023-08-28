export const perlinish = (canvasNode)=>{
    const PE = {};
    const shapes = ['▮','▬','▰','▲','▴','▶','▸','►','▼','▾','◀','◂','◄','◆','◖','◗','◢','◣','◤','◥','◼'];
    const ctx = canvasNode.getContext("2d", { willReadFrequently: true });

    PE.generate = async ()=>{
        const arr = [];
        const width = 200;
        const height = 200;
        canvasNode.width = width;
        canvasNode.height = height;
        ctx.filter = 'blur(5px)';
        ctx.font = '16px Arial';

        let i = 0;
        while (i < 200) {
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            ctx.fillText(shape, (Math.random()*width), (Math.random()*height));
            i++;
        }

        let x = 0;
        let y = 0;
        while (x <= width &&
        y < height) {
            const colorData = await getColorData(x, y);
            if (!arr[y]) arr[y] = [];
            arr[y].push(colorData[3]);
            x++;
            if (x > width) {
            x = 0;
            y++;
            }
        }
        return arr;
    }

    function getColorData (x, y) {
        return new Promise((resolve)=>{
            resolve(ctx.getImageData(x, y, 1, 1).data);
        })
    }

    return PE;
}