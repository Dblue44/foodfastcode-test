import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Client, ClientStore, Place} from "@shared/types";
import {fetchUserPlaceClients} from "./clientThunk";

const initialState: ClientStore = {
  clientsList: [],
  selectedClient: undefined,
  selectedPlace: undefined,
  loadingClients: false,
}

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    clearClients: (state) => {
      state.clientsList = []
    },
    setClientPlace: (state, action: PayloadAction<Place>) => {
      state.selectedPlace = action.payload
    },
    setClient: (state, action: PayloadAction<Client>) => {
      state.selectedClient = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPlaceClients.pending, (state) => {
        state.loadingClients = true
      })
      .addCase(fetchUserPlaceClients.fulfilled, (state, action) => {
        state.clientsList = [...action.payload.data]
        state.loadingClients = false
      })
      .addCase(fetchUserPlaceClients.rejected, (state) => {
        state.loadingClients = false
      })
  }
})

export const {clearClients, setClientPlace, setClient} = clientSlice.actions
export default clientSlice.reducer