describe("calcNewRating function", function() {
        it("should return Error if tableRow contains anything but numbers or grade is not a number", function() {
            expect(calcNewRating({rating: "this", nrOfVotes: "is", myVote: 0}, "wrong")
            ).toEqual("Error");
        });
        it("should return Error if object tableRow is missing a value", function() {
            expect(calcNewRating({rating: 1, myVote: 0}, 5)
            ).toEqual("Error");
        });
        it("should return {rating: 0, nrOfVotes: 1, myVote: 0}", function() {
            expect(calcNewRating({rating: 0, nrOfVotes: 0, myVote: 0}, 0)
            ).toEqual({rating: 0, nrOfVotes: 1, myVote: 0});
        });
        it("should return {rating: 1, nrOfVotes: 1, myVote: 1}", function() {
            expect(calcNewRating({rating: 0, nrOfVotes: 0, myVote: 0}, 1)
            ).toEqual({rating: 1, nrOfVotes: 1, myVote: 1});
        });
        it("should return {rating: 4, nrOfVotes: 2, myVote: 5}", function() {
            expect(calcNewRating({rating: 3, nrOfVotes: 1, myVote: 0}, 5)
            ).toEqual({rating: 4, nrOfVotes: 2, myVote: 5});
        });
        it("should return {rating: 2.5, nrOfVotes: 2, myVote: 3}", function() {
            expect(calcNewRating({rating: 2, nrOfVotes: 1, myVote: 0}, 3)
            ).toEqual({rating: 2.5, nrOfVotes: 2, myVote: 3});
        });
        it("should return {rating: 4, nrOfVotes: 11, myVote: 4 }", function() {
            expect(calcNewRating({rating: 4, nrOfVotes: 10, myVote: 0}, 4)
            ).toEqual({rating: 4, nrOfVotes: 11, myVote: 4});
        });
        it("should return {rating: 2, nrOfVotes: 4, myVote: 5 }", function() {
            expect(calcNewRating({rating: 1, nrOfVotes: 3, myVote: 0}, 5)
            ).toEqual({rating: 2, nrOfVotes: 4, myVote: 5});
        });
    });