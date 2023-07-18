import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Fee} from "../../../assets/interfaces.tsx";
import FeeRow from "./FeeRow.tsx";

interface Props {
    fees: Fee[];
}

function FeesList({fees} : Props) {

    return (
        <Table
            size="small"
            aria-label="tax, tip, and fees"
        >
            <TableHead>
                <TableRow
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                    <TableCell style={{width:"10px"}}>Fee</TableCell>
                    <TableCell component="th" scope="row">Amount</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {fees.map((fee, index) => (
                    <FeeRow
                        key={index}
                        description={fee.description}
                        price={fee.price}
                    />
                ))}
            </TableBody>
        </Table>
    );
}

export default FeesList;