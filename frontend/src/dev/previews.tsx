// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import BillsList from "../components/bills/BillsList.tsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/bills/BillsList">
                <BillsList/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;