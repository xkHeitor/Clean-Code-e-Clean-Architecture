export default class Dimension {

    constructor(readonly width: number, readonly height: number, readonly length: number) {}

    getVolume(): number {
        const unitOfMeasure = 100;
        return (this.width/unitOfMeasure) * (this.height/unitOfMeasure) * (this.length/unitOfMeasure);
    }
    
}