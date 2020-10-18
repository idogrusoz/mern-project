import { tokenExtractor } from "../../utils/tokenExtractor";

describe("Token extractor nehaviour test", () => {
    it("extracts cookie", () => {
        const headers = {
            cookie: "other:token=othertkn access_token=token",
        };
        expect(tokenExtractor(headers)).toEqual("token");
    });
    it("returns empty string if there is no access token cookie", () => {
        const headers = {
            cookie: "other:token=othertkn non_access_token=token",
        };
        expect(tokenExtractor(headers)).toEqual("");
    });
    it("returns empty string if there are no cookies", () => {
        const headers = {};
        expect(tokenExtractor(headers)).toEqual("");
    });
});
