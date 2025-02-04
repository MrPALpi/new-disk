export interface ApiError {
  error: string
  statusCode: number
  message: string
}

export interface Action {
  status: boolean
  message?: string
}
