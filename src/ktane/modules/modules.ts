import { useEffect, useState } from 'react';
import axios from 'axios';

import type { ModuleData, ModuleID } from '../../types/ModuleData';
import { MODULE_DATA_URL } from './constants';
import useAsync from '../../util/hooks/useAsync';

let MODULE_DATA: ModuleData[] = [];
let MODULE_DATA_MAP: { [key: string]: ModuleData } = {};
let loaded = false;
export async function loadModuleData(): Promise<void> {
    if (!loaded) {
        console.log('Loading module data...');

        // Load data
        const data = (await axios.get(MODULE_DATA_URL)).data.KtaneModules;

        // Module data
        MODULE_DATA = data.filter(
            (m: ModuleData) => m.Type === 'Regular' || m.Type === 'Needy'
        );

        // Module ID => data map
        MODULE_DATA_MAP = MODULE_DATA.reduce(
            (acc, module) => ((acc[module.ModuleID] = module), acc),
            {}
        );

        loaded = true;
    }
}

export async function getModuleDataAsync(): Promise<ModuleData[]> {
    await loadModuleData();

    return MODULE_DATA;
}

let BOSS_MODULES;
export async function isBossModule(key: ModuleID): Promise<boolean> {
    if (BOSS_MODULES === undefined) {
        BOSS_MODULES = (await getModuleDataAsync())
            .filter((module) => module.IsFullBoss || module.IsSemiBoss)
            .reduce(
                (acc, module) => ({
                    [module.ModuleID]: module.IsFullBoss ? 'full' : 'semi',
                    ...acc,
                }),
                {}
            );
    }

    return key in BOSS_MODULES;
}

export function useModuleData(moduleId: ModuleID): ModuleData | null {
    const [moduleData, setModuleData] = useState(null);

    useAsync(loadModuleData, () => {
        setModuleData(MODULE_DATA_MAP[moduleId] || null);
    });

    useEffect(() => {
        setModuleData(MODULE_DATA_MAP[moduleId] || null);
    }, [moduleId]);

    return moduleData;
}
