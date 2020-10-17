import { IncomingHttpHeaders } from "http";

export const tokenExtractor = (headers: IncomingHttpHeaders): string => {
    let token: string = "";
    if (headers["cookie"]) {
        const cookiesArray = headers["cookie"].split(" ");
        const accessToken: string = cookiesArray.filter((item: string) => {
            return item.startsWith("access_token");
        })[0];
        token = accessToken && accessToken.split("=")[1];
    }
    return token;
};
