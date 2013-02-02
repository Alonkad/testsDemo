describe("trim", function () {
    describe("simple behavior", function () {
        it("should not modify an empty string", function () {
            expect("".wixTrim()).toBe("");
        });

        it("should remove the spaces in the beginning of a string", function () {
            expect("   space in the beginning".wixTrim()).toBe("space in the beginning");
        });

        it("should remove spaces at the end of a string", function () {
            expect("space at the end   ".wixTrim()).toBe("space at the end");
        });
    })
});