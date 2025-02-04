import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

const login = (next: NavigationGuardNext, isAuth: boolean): void =>
  isAuth ? next() : next({ name: 'home' })
const entered = (next: NavigationGuardNext, isAuth: boolean): void =>
  isAuth ? next({ name: 'note' }) : next()

const middlewares = {
  login,
  entered,
}

export const useMiddleware = (
  to: RouteLocationNormalized,
  next: NavigationGuardNext,
  isAuth: boolean,
): void => {
  const middleware: keyof typeof middlewares = to?.meta?.middleware as keyof typeof middlewares

  if (middleware && middleware in middlewares) {
    return middlewares[middleware](next, isAuth)
  }

  next()
}
