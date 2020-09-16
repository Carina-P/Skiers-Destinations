describe ("RatedResort", function(){
    let ratedResort0 = new RatedResort("Val Thorens", 0, 0, 0);
    let ratedResort1 = new RatedResort("Val Thorens", 0, 0, 0);
    let ratedResort2 = new RatedResort("St Anton", 1, 1, 0);
    let ratedResort3 = new RatedResort("Val Thorens", 4, 3, 0);
    let ratedResort4 = new RatedResort("Val Thorens", 4, 3, 4);

    describe("calculateNewRating function", function(){
        it("should return Error if vote is not a number", function(){
            expect(ratedResort0.calculateNewRating("cheese")).toEqual("Error");
        });
        it("should return Error if vote is not from 1 to 5", function(){
            expect(ratedResort0.calculateNewRating(0)).toEqual("Error");
        });
        it("should return Error if vote is not from 1 to 5", function(){
            expect(ratedResort0.calculateNewRating(7)).toEqual("Error");
        })
        it("should update rating to 1, nrOfVote 1 and lastVote 1", function() {
            ratedResort1.calculateNewRating(1);
            expect(ratedResort1.rating).toEqual(1);
            expect(ratedResort1.nrOfVotes).toEqual(1);
            expect(ratedResort1.lastVote).toEqual(1);
        });
        it("should update rating to 2, nrOfVote 2 and lastVote 3", function() {
            ratedResort2.calculateNewRating(3);
            expect(ratedResort2.rating).toEqual(2);
            expect(ratedResort2.nrOfVotes).toEqual(2);
            expect(ratedResort2.lastVote).toEqual(3);
        });
        it("should update rating to 3.5, nrOfVote 4 and lastVote 2", function() {
            ratedResort3.calculateNewRating(2);
            expect(ratedResort3.rating).toEqual(3.5);
            expect(ratedResort3.nrOfVotes).toEqual(4);
            expect(ratedResort3.lastVote).toEqual(2);
        });
    });

    describe("starsToHTML function", function(){
        it("should return Error if grade is not a number", function(){
            expect(ratedResort0.starsToHTML("olive")).toEqual("Error");
        });
        it("should return Error if grade is not from 1 to 5", function(){
            expect(ratedResort0.starsToHTML(9)).toEqual("Error");
        });
        it("should return Error if vote is not from 1 to 5", function(){
            expect(ratedResort0.starsToHTML(-1)).toEqual("Error");
        })
        it("should return Error if vote is undefined", function(){
            expect(ratedResort0.starsToHTML(undefined)).toEqual("Error");
        })
    });

    describe("noVoteHTML function", function(){
        it("should return Error if id is not a string", function(){
            expect(ratedResort0.noVoteHTML(3.2)).toEqual("Error");
        });
        it("should return Error if vote is undefined", function(){
            expect(ratedResort0.noVoteHTML(undefined)).toEqual("Error");
        })
    });

    describe("rowToHTML function", function(){
        it("should return Error if rowIndex is not a number", function(){
            expect(ratedResort0.rowToHTML("olive", true)).toEqual("Error");
        });
        it("should return Error if rowIndex is undefined", function(){
            expect(ratedResort0.rowToHTML(undefined, true)).toEqual("Error");
        });
        it("should return Error if smallViewport is not boolean", function(){
            expect(ratedResort0.rowToHTML(1, "onion")).toEqual("Error");
        });
        it("should return Error if smallViewport is undefined", function(){
            expect(ratedResort0.rowToHTML(1, undefined)).toEqual("Error");
        });
    });
    describe("hasVoted function", function(){
        it("should return false if lastVote is not in inteval 1-5", 
        function(){
            expect(ratedResort0.hasVoted()).toEqual(false);
        });
        it("should return true if lastVote is between in inteval 1-5", 
        function(){
            expect(ratedResort4.hasVoted()).toEqual(true);
        });
    });
})