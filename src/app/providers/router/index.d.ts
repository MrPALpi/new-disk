import type { Component } from 'vue'

type LazyComponent = () => Promise<Component>
export interface Layout {
  name: string
  component: LazyComponent
}

export enum MiddlewareTypes {
  LOGIN = 'login',
  ENTERED = 'entered',
}
