describe ("RatedResort", function(){
    let ratedResort1 = new RatedResort("Val Thorens", 0, 0, 0);
    let ratedResort2 = new RatedResort("St Anton", 4, 3, 0);

    describe("calculateNewRating function", function(){
        it("should return Error if vote is not a number", function(){
            expect(ratedResort1.calculateNewRating("cheese")).toEqual("Error");
        });
        it("should return Error if vote is not from 1 to 5", function(){
            expect(ratedResort1.calculateNewRating(0)).toEqual("Error");
        });
        it("should return Error if vote is not from 1 to 5", function(){
            expect(ratedResort1.calculateNewRating(7)).toEqual("Error");
        })
        it("should update rating to 1, nrOfVote 1 and lastVote 1", function() {
            ratedResort1.calculateNewRating(1);
            expect(ratedResort1.rating).toEqual(1);
            expect(ratedResort1.nrOfVotes).toEqual(1);
            expect(ratedResort1.lastVote).toEqual(1);
        });
        it("should update rating to 2, nrOfVote 2 and lastVote 3", function() {
            ratedResort1.calculateNewRating(3);
            expect(ratedResort1.rating).toEqual(2);
            expect(ratedResort1.nrOfVotes).toEqual(2);
            expect(ratedResort1.lastVote).toEqual(3);
        });
        it("should update rating to 3.5, nrOfVote 4 and lastVote 2", function() {
            ratedResort2.calculateNewRating(2);
            expect(ratedResort2.rating).toEqual(3.5);
            expect(ratedResort2.nrOfVotes).toEqual(4);
            expect(ratedResort2.lastVote).toEqual(2);
        });
    });
})