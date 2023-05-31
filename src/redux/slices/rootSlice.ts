import { createSlice } from '@reduxjs/toolkit';

interface MarvelState {
    name: string;
    description: string;
    super_power: string;
    comics_appeared_in: number;
}

const initialState: MarvelState = {
    name: '',
    description: '',
    super_power: '',
    comics_appeared_in: 0
}

const rootSlice = createSlice({
    name: "root",
    initialState,
    reducers: {
        chooseName: (state, action) => { state.name = action.payload },
        chooseDescription: (state, action) => { state.description = action.payload },
        chooseSuperPower: (state, action) => { state.super_power = action.payload },
        chooseComicsAppearedIn: (state, action) => { state.comics_appeared_in = action.payload },
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
console.log(rootSlice)
export const {
    chooseName,
    chooseDescription,
    chooseSuperPower,
    chooseComicsAppearedIn
} = rootSlice.actions;