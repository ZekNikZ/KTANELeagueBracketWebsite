import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { MODULE_ICON_URL } from '../../../ktane/modules/constants';
import { ModuleID } from '../../../types/ModuleData';
import { useModuleData } from '../../../ktane/modules/modules';

const useStyles = makeStyles({
    modIcon: {
        width: '32px',
        height: '32px',
        imageRendering: 'pixelated',
    },
});

export const ModuleCard: React.FC<ModuleCardProps> = (props: ModuleCardProps) => {
    const classes = useStyles();

    const moduleData = useModuleData(props.moduleId);
    const moduleName = moduleData ? encodeURIComponent(moduleData.FileName || moduleData.Name) : 'blank';

    return (
        <img
            className={`${classes.modIcon} ${props.className}`}
            src={MODULE_ICON_URL.replaceAll('{moduleName}', moduleName)}
        />
    );
};

export default ModuleCard;

export interface ModuleCardProps {
    moduleId: ModuleID;
    className?: string;
}
