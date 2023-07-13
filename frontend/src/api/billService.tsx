import axios from "axios";
import configLoader from "../config/configLoader.ts";
// import {Item} from "../assets/interfaces.tsx";

const apiBaseUrl = configLoader.apiUrl;

export const getBills = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
        return await axios.get(`${apiBaseUrl}/bill`);
    } catch (e) {
        throw(e);
    }
}

export const saveBill = async (bill: NewBillRequest) => {
    // eslint-disable-next-line no-useless-catch
    try {
        return await axios.post(`${apiBaseUrl}/bill`, bill)
    } catch (e) {
        throw e;
    }
}

export const archiveBill = async (billId: number) => {
    // eslint-disable-next-line no-useless-catch
    try{
        return await axios.put(`${apiBaseUrl}/bill/${billId}/archive`);
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

export class NewItemRequest {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private description: string;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private price: number;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private quantity: number;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private billId: number;

    constructor(
        description: string,
        price: number,
        quantity: number,
        billId: number,
    ) {
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.billId = billId;
    }
}

export const getItemsByBillId = async (billId: number) => {
    // eslint-disable-next-line no-useless-catch
    try {
        return await axios.get(`${apiBaseUrl}/bill/${billId}/item`);
    } catch (e) {
        throw(e);
    }
}

export const createItem = async (item: NewItemRequest, billId: number) => {
    // eslint-disable-next-line no-useless-catch
    try {
        return await axios.post(`${apiBaseUrl}/bill/${billId}/item`, item);
    } catch (e) {
        throw e;
    }
}

export const updateItem = async (itemId: number, item: NewItemRequest, billId: number) => {
    // eslint-disable-next-line no-useless-catch
    try {
        return await axios.put(`${apiBaseUrl}/bill/${billId}/item/${itemId}`, item);
    } catch (e) {
        throw e;
    }
}

export const deleteItem = async(itemId: number, billId: number) => {
    // eslint-disable-next-line no-useless-catch
    try {
        return await axios.delete(`${apiBaseUrl}/bill/${billId}/item/${itemId}`);
    } catch (e) {
        throw e;
    }
}
