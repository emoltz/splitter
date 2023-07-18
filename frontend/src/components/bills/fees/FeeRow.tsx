import {TableRow, TableCell, IconButton} from '@mui/material';
import {Delete} from "@mui/icons-material";

interface Props {
    id: number;
    description: string;
    price: number;
    deleteFee: (feeId: number) => void;
}

function FeeRow({id, description, price, deleteFee}: Props) {

    const priceFormatted = price.toFixed(2);

    return (
        <TableRow
            key={description}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
            style={{width: '100px'}}
        >
            <TableCell>{description}</TableCell>
            <TableCell component="th" scope="row">${priceFormatted}</TableCell>
            <TableCell align="right">
                <IconButton onClick={() => deleteFee(id)} >
                    <Delete aria-label="delete-fee" />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default FeeRow;