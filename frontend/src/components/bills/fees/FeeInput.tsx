import {Input} from "@nextui-org/react";
import {Button} from "@mui/material";
import {useState} from "react";

interface FeeInputProps {
    onSave: (description: string, price: number) => void;
    onCancel: () => void;
}

export default function FeeInput({onSave, onCancel}: FeeInputProps) {
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(0.0);

    const handleSaveClick = () => {
        onSave(description, price);
    }

    return (
        <div className={"border"}>
            <div className={"grid grid-cols-1 md:grid-cols-3 md:gap-3  rounded-lg p-3 gap-3"}>
                <Input
                    clearable
                    placeholder={"Description"}
                    onChange={(e: any) => setDescription(e.target.value)}
                />
                <div className={"flex gap-3 justify-between"}>
                    <Input
                        type={"number"}
                        placeholder={"Amount"}
                        labelLeft={"$"}
                        onChange={(e: any) => setPrice(parseFloat(e.target.value))}
                    />
                </div>
            </div>
            <div className={"text-center"}>
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
            </div>
        </div>
    );
}