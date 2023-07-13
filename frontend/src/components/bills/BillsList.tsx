import {useEffect, useState} from "react";
import {archiveBill, getBills} from "../../api/billService";
import NewBillForm from "../bills/NewBillForm";
import BillRow from "./BillRow";
import BillDetail from "../bills/BillDetail";
// MUI
import {Button, useMediaQuery, useTheme} from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {useModal} from "@nextui-org/react";
import {bill} from "../../assets/interfaces"
import "../../App.css";

function BillsList() {
    const [bills, setBills] = useState<bill[]>([]);
    const [formVisible, setFormVisible] = useState(false);
    const [selectedBill, setSelectedBill] = useState<bill>();
    const {setVisible, bindings} = useModal();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const fetchBills = () => {
        getBills().then(res => {
            setBills(res.data);
        })
    }

    useEffect(() => {
        fetchBills();
    }, [])

    const handleSubmitNewBill = () => {
        fetchBills();
        setFormVisible(false);
    };

    const deleteBill = (billId: number) => {
        archiveBill(billId).then(res => {
                console.log("Successful archive", res);
                fetchBills();
            }
        ).catch(err => {
            console.warn(err);
        });

    }

    const handleBillClick = (bill: bill) => {
        setSelectedBill(bill);
        setVisible(true);
    }

    return (
        <>
            <div className="d-flex">
                <h1>My Bills</h1> &nbsp;
                <div>

                    <Button
                        variant={"contained"}
                        className="btn btn-outline-primary btn-lg"
                        onClick={() => {
                            setFormVisible(true);
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="bi bi-plus"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                        </svg>
                        New
                    </Button>
                </div>

            </div>

            {formVisible && (
                <NewBillForm
                    onFormClose={() => {
                        setFormVisible(false);
                    }}
                    onSubmitNewBill={handleSubmitNewBill}
                />
            )}
            {bills.length === 0 &&
                <p>
                    No bills found.
                </p>
            }
            <ol className="list-group">
                {bills.map((bill) => {
                    return (
                        <div
                            onClick={() => handleBillClick(bill)}
                            key={bill.id}
                        >
                            <BillRow
                                bill={bill}
                                key={bill.id}
                                onDelete={deleteBill}
                            />

                        </div>

                    );
                })}
            </ol>
            {selectedBill && <BillDetail
                bill={selectedBill}
                setVisible={setVisible}
                bindings={bindings}
                isMobile={isMobile}
            />
            }
        </>
    );
}

export default BillsList;