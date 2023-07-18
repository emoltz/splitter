import {TableRow, TableCell} from '@mui/material';

interface Props {
    description: string;
    price: number | string;
    quantity: number;
    number: number;
}

export default function AddedItem({description, price, quantity, number}: Props) {

    const priceFormatted = typeof price !== "string" ? price.toFixed(2) : price


    return (
        <TableRow
            key={description}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
            style={{width: '100px'}}
        >
            <TableCell>
                {number + 1}
            </TableCell>
            <TableCell component="th" scope="row">{description}</TableCell>
            <TableCell align="left">${priceFormatted}</TableCell>
            <TableCell align="center">{quantity}</TableCell>
        </TableRow>
    )
}
