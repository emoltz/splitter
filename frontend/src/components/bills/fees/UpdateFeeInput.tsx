import {Input} from "@nextui-org/react";
import {Button, TableCell, TableRow} from "@mui/material";
import {useState} from "react";
import {Fee} from "../../../assets/interfaces.tsx";

interface Props {
    fee: Fee;
    onSave: (fee: Fee, description: string, price: number) => void;
    onCancel: () => void;
}

export default function UpdateFeeInput({fee, onSave, onCancel}: Props) {
    const [description, setDescription] = useState<string>(fee.description);
    const [price, setPrice] = useState<number>(fee.price);

    const handleSaveClick = () => {
        onSave(fee, description, price);
    }

    return (
        <TableRow
            key={fee.description}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
            style={{width: '100px'}}
        >
            <TableCell>
                <Input
                    aria-label={"update-description"}
                    value={description}
                    clearable
                    onChange={(e: any) => setDescription(e.target.value)}
                    style={{ width: 'auto' }}
                />
            </TableCell>
            <TableCell component="th" scope="row">
                <Input
                    aria-label={"update-price"}
                    labelLeft={"$"}
                    value={price}
                    clearable
                    onChange={(e: any) => setPrice(e.target.value)}
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
    );
}