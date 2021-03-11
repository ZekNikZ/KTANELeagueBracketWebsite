import { Theme, makeStyles } from '@material-ui/core/styles';
import React from 'react';

import Button from '@material-ui/core/Button';

import { MANUAL_LINK_URL } from '../../../ktane/modules/constants';
import type { ModuleID } from '../../../types/ModuleData';
import ModuleIcon from './ModuleIcon';
import { useModuleData } from '../../../ktane/modules/modules';

const useStyles = makeStyles<Theme, ModuleCardProps>({
    card: {
        border: '1px solid gray',
        backgroundColor: ({ dark }) => (dark ? '#343a40' : '#f8f9fa'),
        '&:hover': {
            backgroundColor: ({ dark }) => (dark ? '#1d2124' : '#dae0e5'),
        },
        padding: '2px',
        textAlign: 'left',
        justifyContent: 'start',
        color: ({ dark }) => (dark ? 'white' : 'inherit'),
        height: '38px',
    },
    moduleIcon: {
        marginRight: '4px',
    },
});

export const ModuleCard: React.FC<ModuleCardProps> = (props: ModuleCardProps) => {
    const classes = useStyles(props);

    const moduleData = useModuleData(props.moduleId);

    return (
        <Button
            className={`${classes.card} ${props.className}`}
            onClick={(event) => props.onClick && props.onClick(event, moduleData)}
            href={
                !props.disableManualLink && moduleData
                    ? MANUAL_LINK_URL.replaceAll('{moduleName}', moduleData?.FileName || moduleData?.Name)
                    : undefined
            }
        >
            <ModuleIcon moduleId={props.moduleId} className={classes.moduleIcon} />
            {moduleData?.Name || 'Loading...'}
        </Button>
    );
};

export default ModuleCard;

export interface ModuleCardProps {
    moduleId: ModuleID;
    dark?: boolean;
    onClick?: (MouseEvent, ModuleData) => void;
    disableManualLink?: boolean;
    className?: string;
    selected?: boolean;
}
