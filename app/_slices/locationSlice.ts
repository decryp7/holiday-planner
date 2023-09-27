import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'
import CurrentLocation from "@/app/_models/location";

// Define a type for the slice state
interface LocationState {
    location: CurrentLocation
}

// Define the initial state using that type
const initialState: LocationState = {
    location: undefined
}

export const locationSlice = createSlice({
    name: 'location',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        set: (state, action: PayloadAction<CurrentLocation>) => {
            state.location = action.payload;
        }
    }
})

export const { set } = locationSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLocation = (state: RootState) => state.location.location

export default locationSlice.reducer