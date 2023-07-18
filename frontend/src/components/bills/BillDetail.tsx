import {Modal} from '@nextui-org/react';
import {Button, Typography} from '@mui/material';
import {bill, Fee} from "../../assets/interfaces";
import {useEffect, useState} from "react";
import {getItemsByBillId, createItem, NewItemRequest} from "../../api/billService.js";
import BillItemInput from './items/BillItem';
import AddedItem from './items/AddedItem';
import FeesList from "./fees/FeesList.tsx";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FeeInput from "./fees/FeeInput.tsx";

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
    const [fees, setFees] = useState<Fee[]>(
        [
            {description: "Tax", price: 0.0},
            {description: "Tip", price: 0.0}
        ]
    )
    const [showItemInput, setShowItemInput] = useState<boolean>(false);
    const [showFeeInput, setShowFeeInput] = useState<boolean>(false);
    const handleCancelItemInput = () => {
        setShowItemInput(false);
    }

    const handleCancelFeeInput = () => {
        setShowFeeInput(false);
    }

    useEffect(() => {
        getItemsByBillId(bill.id)
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching items: ', error);
            })
    }, [bill.id]);

    const handleAddNewItem = (name: string, price: any, quantity: any) => {
        createItem(
            // Pass newItem here
            new NewItemRequest(name, price, quantity, bill.id),
            bill.id
        )
            .then(response => {
                setItems(prevItems => [...prevItems, response.data]);
                // After adding the item, reset the newItem state
                // setNewItem({id: 0, description: '', price: 0, quantity: 0, person: {id: 0, name: ''}});
                setShowItemInput(false); // hide the input after adding the item
            })
            .catch(error => {
                console.error('Error adding item: ', error);
            })
    }

    const handleAddNewFee = (description: string, price: number) => {
        //NEEDS TO BE IMPLEMENTED
        const newFee: Fee = {description: description, price: price};
        setFees(prevFees => [...prevFees, newFee]);
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

                    >
                        {dateFormatted}
                    </Typography>
                </Typography>
            </Modal.Header>
            <Modal.Body>
                <TableContainer component={Paper}>
                    <Table
                        size="small"
                        aria-label="receipt items"
                    >
                        <TableHead>
                            <TableRow
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell style={{width:"10px"}}>No.</TableCell>
                                <TableCell component="th" scope="row">Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell style={{width:"10px"}}>Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item, index) => (
                                <AddedItem
                                    key={index}
                                    number={index}
                                    description={item.description}
                                    price={item.price}
                                    quantity={item.quantity}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div>
                    {showItemInput &&
                        <BillItemInput
                            onSave={handleAddNewItem}
                            onCancel={handleCancelItemInput}
                        />
                    }
                </div>
                <div className={"text-center"}>

                    <Button onClick={() => setShowItemInput(true)}>Add Item</Button>
                </div>
                <TableContainer component={Paper}>
                    <FeesList fees={fees} />
                </TableContainer>
                <div>
                    {showFeeInput &&
                        <FeeInput
                            onSave={handleAddNewFee}
                            onCancel={handleCancelFeeInput}
                        />
                    }
                </div>
                <div className={"text-center"}>
                    <Button onClick={() => setShowFeeInput(true)}>Add Fee</Button>
                </div>

            </Modal.Body>
            <Modal.Footer>

                <Button
                    variant={"contained"}
                    color={"error"}
                    onClick={handleModalClose}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}