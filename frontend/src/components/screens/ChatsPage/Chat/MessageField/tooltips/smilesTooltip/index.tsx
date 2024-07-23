import { Tooltip } from "react-tooltip";
import { ImageIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import { smilesTooltipData } from "@/data";

import classes from './index.module.scss';

type TSmilesTooltipProps = {
    setMessage: Dispatch<SetStateAction<string>>;
}

const SmilesTooltip = ({ setMessage }: TSmilesTooltipProps) => {
    return <>
        <Tooltip id="smilesTooltip" openOnClick clickable place='top' positionStrategy="fixed">
            <ul className={classes.smileTooltip}>
                {smilesTooltipData.map((smile) => (
                    <li key={smile.id} onClick={() => setMessage(old => old + smile.smile)}>{smile.smile}</li>
                ))}
            </ul>
        </Tooltip>
        <ImageIcon data-tooltip-id="smilesTooltip" style={{ cursor: 'pointer' }} />
    </>
}

export default SmilesTooltip
