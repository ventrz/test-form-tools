export const minLength = (rule: number) => ({
  fn: (v = '') => v.length < rule,
  msg: `Minimum length is ${rule}`,
})

export const maxLength = (rule: number) => ({
  fn: (v = '') => v.length > rule,
  msg: `Maximum length is ${rule}`,
})

export const regExp = (rule: RegExp, msg: string) => ({
  fn: (v = '') => !new RegExp(rule).test(v),
  msg,
})

interface IValidator {
  fn: (v: string) => boolean
  msg: string
}

export const combineValidators = (...validators: IValidator[]) => (value: string) => {
  const collectedErrors = validators.reduce(
    (errors: string[], { fn, msg }) => (fn(value) ? errors.concat(msg) : errors),
    []
  )

  return (collectedErrors.length ? collectedErrors : null) as any
}
