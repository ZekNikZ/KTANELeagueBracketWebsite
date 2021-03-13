import React, { useEffect, useState } from 'react';

import ModuleCard from '../components/ktane/modules/ModuleCard';
import { ModuleData } from '../types/ModuleData';
import Selector from '../components/selector/Selector';
import { getModuleDataAsync } from '../ktane/modules/modules';

function comparatorFunction(a, b) {
    const val = -b.firstLetter.localeCompare(a.firstLetter);

    if (val === 0) {
        return -b.SortKey.localeCompare(a.SortKey);
    }

    return val;
}

const Home: React.FC = () => {
    const [options, setOptions] = useState<(ModuleData & { firstLetter: string })[]>([]);

    useEffect(() => {
        async function fetchModuleData() {
            const moduleData = await getModuleDataAsync();
            setOptions(
                moduleData.map((module) => {
                    const firstLetter = module.SortKey[0].toUpperCase();
                    return {
                        ...module,
                        firstLetter: /[0-9]/.test(firstLetter)
                            ? '0-9'
                            : /[a-zA-Z]/.test(firstLetter)
                                ? firstLetter
                                : '@',
                    };
                })
            );
        }

        fetchModuleData();
    }, []);

    return (
        <div>
            <Selector
                distinct
                sort
                distinctKey={(option: ModuleData) => option.ModuleID}
                sortComparator={(a: ModuleData, b: ModuleData) => a.Name.localeCompare(b.Name)}
                options={options.sort(comparatorFunction)}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.Name}
                itemRenderer={(option: ModuleData) => {
                    return <ModuleCard moduleId={option.ModuleID} />;
                }}
                label="Module name"
            />
            <div style={{ display: 'grid', width: '600px', gridTemplateColumns: 'repeat(2, 50%)' }}>
                <ModuleCard moduleId="TheSequencyclopedia" dark />
                <ModuleCard moduleId="needlesslyComplicatedButton" />
                <ModuleCard moduleId="tams" vetoedByNum="5/7" />
                <ModuleCard
                    moduleId="RockPaperScissorsLizardSpockModule"
                    dark
                    againstName="ZekNikZ"
                    againstLink="https://google.com"
                />
                <ModuleCard moduleId="ForgetsUltimateShowdownModule" againstName="Team ______" />
                <ModuleCard moduleId="SpriteClubBettingSimulation" />
                <ModuleCard moduleId="booleanVennModule" />
                <ModuleCard moduleId="Wires" />
            </div>
        </div>
    );
};

export default Home;
