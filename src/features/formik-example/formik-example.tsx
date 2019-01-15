import { FieldArray, Form as RawForm, Formik } from 'formik'
import * as React from 'react'
import styled from 'styled-components'

import { combineValidators, maxLength, minLength, regExp } from '../../lib'
import { Button, Centered, JSONRenderer } from '../../ui'
import { FastFields, Fields } from './components'

const Form = styled(RawForm)`
  position: relative;
  padding: 1rem;
  width: 50%;
`

const ArrayWrapper = styled.div`
  margin-bottom: 1rem;
`

const FormRow = styled.div`
  :not(:last-child) {
    margin-bottom: 1rem;
  }
`

const FieldWrapper = styled.div`
  margin-bottom: 0.3rem;
`

const FieldFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`

const FormSpy = styled(JSONRenderer)`
  position: absolute;
  top: 1rem;
  right: -2rem;
  transform: translateX(100%);
  width: 75%;
`

const AlignRight = styled.div`
  display: flex;
  justify-content: flex-end;
`

const AddButton = styled(Button)`
  margin-right: 1rem;
`

const options = [{ value: 1, label: '1' }]
const initialValues = { select: 1, products: [{ code: '', name: '', description: '' }] }

interface IInputArrayItem {
  code: string
  name: string
  description: string
}

interface IValues {
  select: number
  products: IInputArrayItem[]
}

export const FormikExample = () => (
  <Formik<IValues>
    initialValues={initialValues}
    onSubmit={() => null}
    validateOnChange={false}
    render={({ values, values: { products }, errors, touched }) => (
      <Form>
        <FormRow>
          <Fields.Select name="select" label="I will rerender on each keystroke :(" options={options} />
        </FormRow>
        <hr />
        <FieldArray
          name="products"
          validateOnChange={false}
          render={({ push, remove }) => (
            <React.Fragment>
              <ArrayWrapper>
                {products &&
                  products.map((_, index) => (
                    <FormRow key={`${index}`}>
                      <h2>Product #{index + 1}</h2>
                      <FieldWrapper>
                        <FastFields.Input
                          name={`products.${index}.code`}
                          label="Code"
                          validate={combineValidators(
                            minLength(1),
                            maxLength(5),
                            regExp(/^\d+$/, 'Only [0-9] characters are allowed')
                          )}
                        />
                      </FieldWrapper>
                      <FieldWrapper>
                        <FastFields.Input
                          name={`products.${index}.name`}
                          label="Name"
                          validate={combineValidators(
                            minLength(1),
                            maxLength(5),
                            regExp(/^[a-z]+$/, 'Only [a-z] characters are allowed')
                          )}
                        />
                      </FieldWrapper>
                      <FieldWrapper>
                        <FastFields.Input
                          name={`products.${index}.description`}
                          label="Description"
                          validate={combineValidators(minLength(1), maxLength(140))}
                        />
                      </FieldWrapper>
                      <FieldFooter>
                        <Button onClick={() => remove(index)}>Remove</Button>
                      </FieldFooter>
                      <hr />
                    </FormRow>
                  ))}
              </ArrayWrapper>
              <AlignRight>
                <AddButton onClick={() => push({ code: '', name: '', description: '' })}>Add one more!</AddButton>
                <Button type="submit">Submit</Button>
              </AlignRight>
              <Centered />
            </React.Fragment>
          )}
        />
        <FormSpy src={{ values, errors, touched }} />
      </Form>
    )}
  />
)
