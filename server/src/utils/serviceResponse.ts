import { ServiceResponse } from "../interfaces/user.interfaces";

const buildServiceResponse = <T>(
    error: boolean,
    statusCode: number,
    message?: string,
    data?: T,
): ServiceResponse<T> => {
    return {
        error,
        statusCode,
        message: message,
        data: data,
    };
};

export default buildServiceResponse;
