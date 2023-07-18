import axios from "axios";
import configLoader from "../config/configLoader";

const apiBaseUrl = configLoader.apiUrl;

export class NewFeeRequest {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private description: string;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private price: number;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private billId: number;

    constructor(
        description: string,
        price: number,
        billId: number,
    ) {
        this.description = description;
        this.price = price;
        this.billId = billId;
    }
}

export const getFeesByBillId = async (billId: number) => {
    // eslint-disable-next-line no-useless-catch
    try {
        return await axios.get(`${apiBaseUrl}/bill/${billId}/fee`);
    } catch (e) {
        throw(e);
    }
}

export const createFee = async (fee: NewFeeRequest, billId: number) => {
    // eslint-disable-next-line no-useless-catch
    try {
        return await axios.post(`${apiBaseUrl}/bill/${billId}/fee`, fee);
    } catch (e) {
        throw e;
    }
}

export const updateFee = async (feeId: number, fee: NewFeeRequest, billId: number) => {
    // eslint-disable-next-line no-useless-catch
    try {
        return await axios.put(`${apiBaseUrl}/bill/${billId}/fee/${feeId}`, fee);
    } catch (e) {
        throw e;
    }
}

export const deleteFee = async (feeId: number, billId: number) => {
    // eslint-disable-next-line no-useless-catch
    try {
        return await axios.delete(`${apiBaseUrl}/bill/${billId}/fee/${feeId}`);
    } catch (e) {
        throw e;
    }
}
