export default class OrderCode {

    readonly value: string;

    constructor(date: Date, sequence: number) {
        this.value = this.generateCode(date, sequence);
    }

    generateCode(date: Date, sequence: number) {
        const year = date.getFullYear();
        const completeTheSequence = (new String(sequence)).padStart(8, "0");
        return `${year}${completeTheSequence}`;
    }

}