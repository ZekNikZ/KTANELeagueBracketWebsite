import React, { useReducer } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';

import Autocomplete from '@material-ui/lab/Autocomplete';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles<Theme, SelectorProps>({
    root: {
        width: '100%',
    },
    topRow: {
        display: 'grid',
        gridTemplateColumns: 'auto 100px',
    },
    inputBox: {},
    addButton: {
        margin: '5px',
        marginLeft: '10px',
    },
    itemList: {
        marginTop: '10px',
        display: 'grid',
        gridTemplateColumns: 'auto',
    },
    footer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px',
    },
    item: {
        display: 'grid',
        gridTemplateColumns: '42px auto',
    },
});

const initialState = { selectedItems: [], selectedOption: null, highlightedCount: 0 };

function reducer(state, action) {
    switch (action.type) {
        case 'add-item':
            if (state.selectedOption !== null) {
                return {
                    ...state,
                    selectedItems: [...state.selectedItems, { value: state.selectedOption, highlighted: false }],
                    selectedOption: null,
                };
            }
            return state;
        case 'add-item-distinct':
            if (state.selectedOption !== null) {
                if (
                    _.some(
                        state.selectedItems,
                        (value) => action.pred(value.value) === action.pred(state.selectedOption)
                    )
                ) {
                    return { ...state, selectedOption: null };
                }
                return {
                    ...state,
                    selectedItems: [...state.selectedItems, { value: state.selectedOption, highlighted: false }],
                    selectedOption: null,
                };
            }
            return state;
        case 'remove-items':
            return {
                ...state,
                selectedItems: state.selectedItems.filter((item) => !item.highlighted),
                highlightedCount: 0,
            };
        case 'select-option':
            return { ...state, selectedOption: action.value };
        case 'clear-option':
            return { ...state, selectedOption: null };
        case 'set-highlight':
            return {
                ...state,
                selectedItems: state.selectedItems.map((item, i) =>
                    i === action.index ? { ...item, highlighted: action.value } : item
                ),
                highlightedCount: state.highlightedCount + (action.value ? 1 : -1),
            };
        default:
            throw new Error();
    }
}

export const Selector: React.FC<SelectorProps> = (props: SelectorProps) => {
    const classes = useStyles(props);

    const [state, dispatch] = useReducer(reducer, initialState);

    function addSelectedOption() {
        if (props.distinct && props.distinctKey) {
            dispatch({ type: 'add-item-distinct', pred: props.distinctKey });
        } else {
            dispatch({ type: 'add-item' });
        }
    }

    function removeSelectedOptions() {
        dispatch({ type: 'remove-items' });
    }

    return (
        <Paper className={`${classes.root} ${props.className}`}>
            <Box p={1}>
                <div className={classes.topRow}>
                    <Autocomplete
                        value={state.selectedOption}
                        options={props.options}
                        groupBy={props.groupBy}
                        getOptionLabel={props.getOptionLabel}
                        className={classes.inputBox}
                        renderInput={(params) => <TextField {...params} label={props.label} variant="outlined" />}
                        onChange={(event, value, reason) => {
                            if (reason === 'select-option') {
                                dispatch({ type: 'select-option', value });
                            } else if (reason === 'clear') {
                                dispatch({ type: 'clear-option' });
                            }
                        }}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                addSelectedOption();
                                (event.target as HTMLInputElement).blur();
                            }
                        }}
                    />
                    <Button
                        className={classes.addButton}
                        color="primary"
                        variant="contained"
                        disabled={!state.selectedOption}
                        onClick={addSelectedOption}
                    >
                        Add
                    </Button>
                </div>
                <div className={classes.itemList}>
                    {(props.sort && props.sortComparator
                        ? state.selectedItems.sort((a, b) => props.sortComparator(a.value, b.value))
                        : state.selectedItems
                    ).map((item, i) => (
                        <div key={i} className={classes.item}>
                            <Checkbox
                                checked={item.highlighted}
                                onChange={(event) =>
                                    dispatch({ type: 'set-highlight', value: event.target.checked, index: i })
                                }
                            />
                            {props.itemRenderer(item.value, item.highlighted)}
                        </div>
                    ))}
                </div>
                <div className={classes.footer}>
                    <Button
                        className={classes.removeButton}
                        color="secondary"
                        variant="contained"
                        disabled={state.highlightedCount === 0}
                        onClick={removeSelectedOptions}
                    >
                        Remove Selected
                    </Button>
                </div>
            </Box>
        </Paper>
    );
};

export default Selector;

export interface SelectorProps {
    label: string;
    itemRenderer: (option, selected: boolean) => React.ReactNode;
    options?: unknown[];
    groupBy?: (option) => string;
    getOptionLabel?: (option) => string;
    onChange?: (newSelectedItems: [], reason: 'add' | 'remove') => void;
    className?: string;
    distinct?: boolean;
    distinctKey?: (item) => string | number;
    sort?: boolean;
    sortComparator?: (a, b) => number;
}
