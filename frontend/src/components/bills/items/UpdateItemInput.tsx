import {Button, TableCell, TableRow} from "@mui/material";
import {Item} from "../../../assets/interfaces.tsx"
import {useState} from "react";
import {Input} from "@nextui-org/react";

interface Props {
    number: number;
    item: Item;
    onSave: (item: Item, name: string, price: number, quantity: number) => void;
    onCancel: () => void;
}

export default function UpdateItemInput({number, item, onSave, onCancel} : Props) {
    const [description, setDescription] = useState<string>(item.description);
    const [price, setPrice] = useState<number>(item.price);
    const [quantity, setQuantity] = useState<number>(item.quantity);

    const handleSaveClick = () => {
        onSave(item, description, price, quantity);
    }

    return (
        <TableRow
            key={item.description}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
            style={{width: '100px'}}
        >
            <TableCell>
                {number + 1}
            </TableCell>
            <TableCell>
                <Input
                    aria-label={"update-description"}
                    value={description}
                    clearable
                    onChange={(e: any) => setDescription(e.target.value)}
                    style={{ width: 'auto' }}
                />
            </TableCell>
            <TableCell align="left">
                <Input
                    aria-label={"update-price"}
                    value={price}
                    type={"number"}
                    labelLeft={"$"}
                    onChange={(e: any) => setPrice(e.target.value)}
                    style={{ width: 'auto' }}
                />
            </TableCell>
            <TableCell align="center">
                <Input
                    aria-label={"update-quantity"}
                    value={quantity}
                    type={"number"}
                    onChange={(e: any) => setQuantity(e.target.value)}
                    style={{ width: 'auto' }}
                />
            </TableCell>
            <TableCell align="right">
                <Button
                    color={"success"}
                    onClick={handleSaveClick}
                >
                    Save
                </Button>
                <Button
                    color={"warning"}
                    onClick={onCancel}
                >
                    Cancel
                </Button>
            </TableCell>
        </TableRow>

    )
}