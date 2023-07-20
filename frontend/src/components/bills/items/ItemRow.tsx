import {TableRow, TableCell, IconButton} from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import {Delete} from "@mui/icons-material";
import {Item} from "../../../assets/interfaces.tsx";

interface Props {
    item: Item;
    price: number | string;
    number: number;
    deleteItem: (item: Item) => void;
}

export default function ItemRow({item, price, number, deleteItem}: Props) {

    const priceFormatted = typeof price !== "string" ? price.toFixed(2) : price

    return (
        <TableRow
            key={item.description}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
            style={{width: '100px'}}
        >
            <TableCell>
                {number + 1}
            </TableCell>
            <TableCell component="th" scope="row">{item.description}</TableCell>
            <TableCell align="left">${priceFormatted}</TableCell>
            <TableCell align="center">{item.quantity}</TableCell>
            <TableCell align="right">
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <IconButton>
                        <EditIcon aria-label="update-item"/>
                    </IconButton>
                    <IconButton onClick={() => deleteItem(item)}>
                        <Delete aria-label="delete-item"/>
                    </IconButton>
                </div>
            </TableCell>
        </TableRow>
    )
}
