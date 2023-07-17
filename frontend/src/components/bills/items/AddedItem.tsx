import {TableRow, TableCell} from '@mui/material';

interface Props {
  description: string;
  price: number | string;
  quantity: number;
  number: number;
}

export default function AddedItem({description, price, quantity, number}: Props) {
  return (
    <TableRow
      key={description}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {number + 1}
      </TableCell>
      <TableCell>{description}</TableCell>
      <TableCell align="right">${price}</TableCell>
      <TableCell align="right">{quantity}</TableCell>
    </TableRow>
  )
}
