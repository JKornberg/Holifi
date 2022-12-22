import { Timestamp } from "firebase/firestore"
import { AppUser } from "../classes/appUser"


export type LoadingUserType = {
  user: AppUser | null,
  isLoading: boolean
}


export type AuthContextType = {
  loadingUser: LoadingUserType,
  setLoadingUser: React.Dispatch<React.SetStateAction<LoadingUserType>>,
  login: (email: string, password: string) => Promise<any>
  signInWithGoogle: () => Promise<any>
  logout: () => Promise<any>
  register: (email: string, password: string, fname: string, lname: string) => Promise<any>
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (oobCode: string, password: string) => Promise<void>
}

export type FirebaseUserType = {
  uid: string,
  email: string,
  fname: string,
  lname: string,
}

export type FormatUserType = {
  uid: string
  email: string,
  provider: string,
  photoUrl: string | null,
  token: string,
  expirationTime: string,
  fname?: string,
  lname?: string,
  active?: boolean
}



export type FBTimestamp = {
  _seconds: number,
  _nanoseconds: number
}

export type ItemType = {
  id: string,
  date: FBTimestamp,
  contentUrl: string,
  tweetUrl: string,
  tweetText: string
}

export type QuoteType = {
  id: string,
  created: number,
  modified: number,
  email: string,
  status: string,
  shipment: string,
  name: string,
  parts: PartType[],
  company: string | null,
  thumbnail_data?: string, // For displaying the thumbnail of the first quote part

}

export type AdditionalFileType = {
  name: string,
  path: string
}

export type PartType = {
  dimensions: number[],
  unit: string,
  name: string,
  model_path: string,
  thumbnail_path: string,
  additional_files: AdditionalFileType[],
  notes: string,
  color: string,
  material: string,
  process: string,
  resolution: string,
  finish: string,
  thumbnail_data?: string
  loading?: boolean,
  quantity: number,
  cost: number,
  metricVolume: number,
  imperialVolume: number
}

export interface ProcessType {
  SLA: MaterialType[]
  SLS: MaterialType[]
}

export interface MaterialType {
  material: string,
  colors: string[],
  resolutions: string[]
}

interface VolumeWindowType {
  range: number[],
  lin_coef: number,
  const_coef: number
}

export interface ConfigurationType {
  finishes: string[],
  processes: ProcessType
  shipments: string[]
  units: string[],
  prices: {
    sls_windows: VolumeWindowType[],
    quantity_factors: {
      lower_cutoff: number,
      upper_cutoff: number,
      log_coef: number,
      lin_coef: number,
      const_coef: number
    }
    not_dyed_factor: number
  }

}