import {TableRow, TableCell, IconButton} from '@mui/material';
import {Delete} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import {Fee} from "../../../assets/interfaces.tsx";
import {useState} from "react";
import UpdateFeeInput from "./UpdateFeeInput.tsx";

interface Props {
    fee: Fee;
    deleteFee: (fee: Fee) => void;
    updateFee: (fee: Fee, description: string, price: number) => void;
}

function FeeRow({fee, deleteFee, updateFee}: Props) {
    const [isEditable, setIsEditable] = useState(false);

    const priceFormatted = fee.price.toFixed(2);

    const handleUpdateButtonClick = (showEditInput: boolean) => {
        setIsEditable(showEditInput);
    }

    const handleSaveItem = (fee: Fee, description: string, price: number) => {
        updateFee(fee, description, price);
        handleUpdateButtonClick(false);
    }

    return (
        <>
        {!isEditable ?
        <TableRow
            key={fee.description}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
            style={{width: '100px'}}
        >
            <TableCell>{fee.description}</TableCell>
            <TableCell component="th" scope="row">${priceFormatted}</TableCell>
            <TableCell align="right">
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <IconButton onClick={() => handleUpdateButtonClick(true)}>
                        <EditIcon aria-label="update-fee"/>
                    </IconButton>
                    <IconButton onClick={() => deleteFee(fee)}>
                        <Delete aria-label="delete-fee"/>
                    </IconButton>
                </div>
            </TableCell>
        </TableRow> :

        <UpdateFeeInput
            fee={fee}
            onSave={handleSaveItem}
            onCancel={() => handleUpdateButtonClick(false)}
        />
        }
        </>
    )
}

export default FeeRow;