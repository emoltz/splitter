import {TableRow, TableCell} from '@mui/material';

interface Props {
    description: string;
    price: number;
}

function FeeRow({description, price}: Props) {
    return (
        <TableRow
            key={description}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
            style={{width: '100px'}}
        >
            <TableCell>{description}</TableCell>
            <TableCell component="th" scope="row">${price}</TableCell>
        </TableRow>
    )
}

export default FeeRow;