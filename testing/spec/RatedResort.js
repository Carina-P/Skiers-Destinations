describe ("RatedResort", function(){
    let ratedResort = new RatedResort("Val Thorens", 0, 0, 0);

    describe("calculateNewRating function", function(){
        it("should return Error if vote is not a number", function(){
            expect(ratedResort.calculateNewRating("cheese")).toEqual("Error");
        });
        it("should return Error if vote is not from 1 to 5", function(){
            expect(ratedResort.calculateNewRating(0)).toEqual("Error");
        });
        it("should return Error if vote is not from 1 to 5", function(){
            expect(ratedResort.calculateNewRating(7)).toEqual("Error");
        })
        it("should update rating to 1, nrOfVote 1 and lastVote 1", function() {
            ratedResort.calculateNewRating(1);
            expect(ratedResort.rating).toEqual(1);
            expect(ratedResort.nrOfVotes).toEqual(1);
            expect(ratedResort.lastVote).toEqual(1);
        });
       /* it("should update rating to 2, nrOfVote 2 and lastVote 3", function() {
            ratedResort.calculateNewRating(3);
            expect(ratedResort.rating).toEqual(2);
            expect(ratedResort.nrOfVotes).toEqual(2);
            expect(ratedResort.lastVote).toEqual(3);
        });
        it("should update rating to 3, nrOfVote 3 and lastVote 5", function() {
            ratedResort.calculateNewRating(5);
            expect(ratedResort.rating).toEqual(3);
            expect(ratedResort.nrOfVotes).toEqual(3);
            expect(ratedResort.lastVote).toEqual(5);
        });
        it("should update rating to 2.5, nrOfVote 4 and lastVote 1", function() {
            ratedResort.calculateNewRating(1);
            expect(ratedResort.rating).toEqual(2.5);
            expect(ratedResort.nrOfVotes).toEqual(4);
            expect(ratedResort.lastVote).toEqual(1);
        });*/
    });
})