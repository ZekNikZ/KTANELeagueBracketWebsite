import React, { useEffect, useState } from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import { getModuleDataAsync } from '../ktane/modules/modules';
import ModuleCard from '../components/ktane/modules/ModuleCard';

function comparatorFunction(a, b) {
    const val = -b.firstLetter.localeCompare(a.firstLetter);

    if (val === 0) {
        return -b.sortKey.localeCompare(a.sortKey);
    }

    return val;
}

const Home: React.FC = () => {
    // const [options, setOptions] = useState<{ firstLetter: string; name: string; sortKey: string }[]>([]);

    // useEffect(() => {
    //     async function fetchModuleData() {
    //         const moduleData = await getModuleDataAsync();
    //         setOptions(
    //             moduleData.map((module) => {
    //                 const firstLetter = module.SortKey[0].toUpperCase();
    //                 return {
    //                     firstLetter: /[0-9]/.test(firstLetter)
    //                         ? '0-9'
    //                         : /[a-zA-Z]/.test(firstLetter)
    //                             ? firstLetter
    //                             : '@',
    //                     name: module.Name,
    //                     sortKey: module.SortKey,
    //                 };
    //             })
    //         );
    //     }

    //     fetchModuleData();
    // }, []);

    return (
        <div>
            {/* <Autocomplete
                options={options.sort(comparatorFunction)}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Module" variant="outlined" />}
            /> */}
            <div style={{ display: 'grid', width: '100%', gridTemplateColumns: 'repeat(2, 50%)' }}>
                <ModuleCard moduleId="booleanVennModule" dark />
                <ModuleCard moduleId="punctuationMarks" />
                <ModuleCard moduleId="X01" />
                <ModuleCard moduleId="LEGOModule" />
                <ModuleCard moduleId="RubiksCubeModule" />
            </div>
        </div>
    );
};

export default Home;
