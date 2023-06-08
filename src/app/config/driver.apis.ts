import { environment } from "src/environments/environment"

export const layers = {
    storeLayers: environment.serverUrl + 'layers',
    getLayers: environment.serverUrl + 'layers'

  }
  
  export const APIS = {
    ...layers
  }