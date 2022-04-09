export default class Dimension {

    constructor(readonly width: number, readonly height: number, readonly length: number) {
        if(width < 0 || height < 0 || length < 0) throw new Error("Invalid dimensions");
    }

    getVolume(): number {
        const unitOfMeasure = 100;
        return (this.width/unitOfMeasure) * (this.height/unitOfMeasure) * (this.length/unitOfMeasure);
    }
    
}