import { UploadAsset } from "@/components/ui";
import { mediaTooltipData } from "@/data";
import { Tooltip } from "react-tooltip";
import classes from './index.module.scss';
import { Dispatch, SetStateAction } from "react";
import { IAssets } from "@/types/assets.types";
import { PaperclipIcon } from "lucide-react";

type TMediaTooltipProps = {
    setUploadAssets: Dispatch<SetStateAction<IAssets[]>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const MediaTooltip = ({ setUploadAssets, setIsLoading}: TMediaTooltipProps) => {
    return <>
        <Tooltip id="mediaTooltip" openOnClick clickable place='top' positionStrategy="fixed">
            <ul className={classes.mediaTooltip}>
                {mediaTooltipData.map((media, id) => (
                    <li key={id}>
                        <UploadAsset
                            show
                            setUploadAssets={(value) => {
                                setUploadAssets((old) => [...old, ...value]);
                            }}
                            classNames={classes.mediaTooltip_item}
                            setIsLoading={setIsLoading}
                            accept={media.accept}
                        >
                            {media.icon}
                            <span>{media.text}</span>
                        </UploadAsset>
                    </li>
                ))}
            </ul>
        </Tooltip>
        <PaperclipIcon data-tooltip-id="mediaTooltip" style={{ cursor: 'pointer' }}/>
    </>
}

export default MediaTooltip
