// import Input from '../../ui/Input'

import {Input} from "@nextui-org/react";


export default function BillItemInput(): React.JSX.Element {
    return (
        <div className={"grid grid-cols-1 md:grid-cols-3 md:gap-3 border rounded-lg p-3 gap-3"}>
            <Input
                clearable
                placeholder={"Name"}
            />
            <div className={"flex gap-3 justify-between"}>
                <Input
                    type={"number"}
                    placeholder={"Price"}
                    labelLeft={"$"}
                />
                <Input
                    type={"number"}
                    placeholder={"Quantity"}
                    width={"100px"}
                />
            </div>
            <Input
                placeholder={"Person (coming soon)"}
                disabled
            />
        </div>
    )
}