import {Modal,} from '@nextui-org/react';
import {Button, TextField, Typography} from '@mui/material';
import {bill} from "../../assets/interfaces.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {getItemsByBillId, createItem} from "../../api/billService.tsx";

interface Props {
    bill: bill;
    setVisible: (visible: boolean) => void;
    bindings: any;
    isMobile: boolean;
}

function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt: string) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}


export default function BillDetail({bill, setVisible, bindings, isMobile}: Props) {

    const [items, setItems] = useState(bill.items || []);
    const [newItem, setNewItem] = useState({id: 0, description: '', price: 0, quantity: 0, person: {id: 0, name: ''}});

    useEffect(() => {
        getItemsByBillId(bill.id)
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching items: ', error);
            })
    }, [bill.id]);


    const handleItemChange = (key: keyof typeof newItem, value: string | number) => {
        setNewItem({...newItem, [key]: value});
    }

    const handleAddNewItem = () => {
        createItem({
            ...newItem,
            bill: {id: bill.id}
        })
            .then(response => {
                setItems(prevItems => [...prevItems, response.data]);
                // reset new item
                setNewItem({id: 0, description: '', price: 0, quantity: 0, person: {id: 0, name: ''}});
            })
            .catch(error => {
                console.error('Error adding item: ', error);
            })
    }


    const handleModalClose = () => {
        setVisible(false);
    }

    const dateFormatted = new Date(bill.date).toLocaleDateString('en-us', {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    const titleFormatted = toTitleCase(bill.title)


    return (
        <Modal
            scroll
            width={"800px"}
            fullScreen={isMobile}
            closeButton
            aria-labelledby={"modal-title"}
            aria-describedby={"modal-description"}
            {...bindings}
        >
            <Modal.Header>
                <Typography
                    id={"modal-title"}
                    variant={"h2"}
                >
                    {titleFormatted}
                    <Typography
                        variant={"h6"}
                    >
                        {dateFormatted}
                    </Typography>
                </Typography>
            </Modal.Header>
            <Modal.Body>
                {items.map((item, index) => (
                    <div key={index}>
                        {item.description}
                        <div>

                            ${item.price}
                        </div>

                    </div>

                ))}
                <div>
                    <TextField
                        label="Description"
                        value={newItem.description}
                        onChange={(event) => handleItemChange('description', event.target.value)}
                    />
                    <TextField
                        label="Price"
                        value={newItem.price}
                        onChange={(event) => handleItemChange('price', Number(event.target.value))}
                    />
                    <TextField
                        label="Quantity"
                        value={newItem.quantity}
                        onChange={(event) => handleItemChange('quantity', Number(event.target.value))}
                    />
                </div>
                <Button onClick={handleAddNewItem}>Add Item</Button>
            </Modal.Body>
            <Modal.Footer>

                <Button
                    variant={"contained"}
                    color={"success"}
                    onClick={handleModalClose}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}