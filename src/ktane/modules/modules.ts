import type { ModuleData, ModuleID } from '../../types/ModuleData';
import axios from 'axios';

import { MODULE_DATA_URL } from './constants';

let MODULE_DATA: ModuleData[];
export async function getModuleData(): Promise<ModuleData[]> {
    if (MODULE_DATA === undefined) {
        console.log('Loading module data...');
        MODULE_DATA = (await axios.get(MODULE_DATA_URL)).data;
    }

    return MODULE_DATA;
}

let BOSS_MODULES;
export async function isBossModule(key: ModuleID): Promise<boolean> {
    if (BOSS_MODULES === undefined) {
        BOSS_MODULES = (await getModuleData())
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
