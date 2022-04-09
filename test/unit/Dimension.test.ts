import Dimension from "../../src/domain/entity/Dimension";

describe('Dimension', () => {
    
    it('Should create the items dimensions', async () => {
        const dimension = new Dimension(100, 30, 10);
        const volume = dimension.getVolume();
        expect(volume).toBe(0.03);
    });

    it("should return exception if the dimensions is negative", () => {
        expect(() => new Dimension(100, -30, 10)).toThrow(new Error("Invalid dimensions"));
    });

});