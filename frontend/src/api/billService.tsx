import axios from "axios";
import configLoader from "../config/configLoader.ts";
// import {Item} from "../assets/interfaces.tsx";

const apiBaseUrl = configLoader.apiUrl;
const endpoint = "bill";
const itemsEndpoint = "items";

export const getBills = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
        return await axios.get(apiBaseUrl + endpoint);
    } catch (e) {
        throw(e);
    }
}

export const saveBill = async (bill: NewBillRequest) => {
    // eslint-disable-next-line no-useless-catch
    try {
        return await axios.post(apiBaseUrl + endpoint, bill)
    } catch (e) {
        throw e;
    }
}

export const archiveBill = async (billId: number) => {
    // eslint-disable-next-line no-useless-catch
    try{
        return await axios.put(apiBaseUrl + endpoint + "/" + billId + "/archive");
    }
    catch (e) {
        throw e;
    }
}

export class NewBillRequest {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private title: string;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private date: string;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private total: number
    constructor(
        title: string,
        date: string
    ) {
        this.title = title;
        this.date = date;
        this.total = 0;
    }
}

export const getItemsByBillId = async (billId: number) => {
    // eslint-disable-next-line no-useless-catch
    try {
        return await axios.get(`${apiBaseUrl}${itemsEndpoint}/bill/${billId}`);
    } catch (e) {
        throw(e);
    }
}

export const createItem = async (item: any) => {
    // eslint-disable-next-line no-useless-catch
    try {
        return await axios.post(`${apiBaseUrl}${itemsEndpoint}`, item);
    } catch (e) {
        throw e;
    }
}
