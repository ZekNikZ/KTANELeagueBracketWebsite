import { Theme, makeStyles } from '@material-ui/core/styles';
import React from 'react';

import Button from '@material-ui/core/Button';

import type { ModuleID } from '../../../types/ModuleData';
import ModuleIcon from './ModuleIcon';
import { useModuleData } from '../../../ktane/modules/modules';

const useStyles = makeStyles<Theme, ModuleCardProps>({
    card: {
        border: '1px solid gray',
        backgroundColor: ({ theme }) => (theme === 'dark' ? '#343a40' : '#f8f9fa'),
        '&:hover': {
            backgroundColor: ({ theme }) => (theme === 'dark' ? '#1d2124' : '#dae0e5'),
        },
        padding: '2px',
        textAlign: 'left',
        justifyContent: 'start',
    },
    moduleIcon: {
        marginRight: '4px',
    },
});

export const ModuleCard: React.FC<ModuleCardProps> = (props: ModuleCardProps) => {
    const classes = useStyles(props);

    const moduleData = useModuleData(props.moduleId);

    return (
        <Button className={`${classes.card} ${props.className}`}>
            <ModuleIcon moduleId={props.moduleId} className={classes.moduleIcon} />
            {moduleData?.Name || 'Loading...'}
        </Button>
    );
};

export default ModuleCard;

export interface ModuleCardProps {
    theme?: 'light' | 'dark';
    moduleId: ModuleID;
    onClick?: 'manual';
    className?: string;
}
