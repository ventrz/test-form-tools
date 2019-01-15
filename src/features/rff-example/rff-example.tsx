import arrayMutators from 'final-form-arrays'
import { identity, memoizeWith } from 'ramda'
import * as React from 'react'
import { Form as ReactFinalForm, FormSpy } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import styled from 'styled-components'

import { combineValidators, maxLength, minLength, regExp } from '../../lib'
import { Button, Centered, JSONRenderer as RawJSONRenderer } from '../../ui'
import { Fields } from './components'

const Form = styled.form`
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

const JSONRenderer = styled(RawJSONRenderer)`
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

const simpleMemoize = (fn: (v: any) => any) => memoizeWith(identity, fn)

const codeValidator = simpleMemoize(
  combineValidators(minLength(1), maxLength(5), regExp(/^\d+$/, 'Only [0-9] characters are allowed'))
)

const nameValidator = simpleMemoize(
  combineValidators(minLength(1), maxLength(5), regExp(/^[a-z]+$/, 'Only [a-z] characters are allowed'))
)

const descriptionValidator = simpleMemoize(combineValidators(minLength(1), maxLength(140)))

export const RFFExample = () => (
  <ReactFinalForm
    initialValues={initialValues}
    onSubmit={() => undefined}
    mutators={{ ...arrayMutators }}
    validateOnBlur
    subscription={{}}
    render={({ handleSubmit }) => (
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <Fields.Select name="select" label="Simple select field" options={options} />
        </FormRow>
        <hr />
        <FieldArray
          name="products"
          subscription={{}}
          render={({ fields, fields: { remove, push } }) => (
            <React.Fragment>
              <ArrayWrapper>
                {fields &&
                  fields.map((name, index) => (
                    <FormRow key={`${name}`}>
                      <h2>Product #{index + 1}</h2>
                      <FieldWrapper>
                        <Fields.Input name={`${name}.code`} label="Code" validate={codeValidator} />
                      </FieldWrapper>
                      <FieldWrapper>
                        <Fields.Input name={`${name}.name`} label="Name" validate={nameValidator} />
                      </FieldWrapper>
                      <FieldWrapper>
                        <Fields.Input
                          name={`${name}.description`}
                          label="Description"
                          validate={descriptionValidator}
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
        <FormSpy subscription={{ values: true, touched: true, errors: true }}>
          {({ values, touched, errors }) => <JSONRenderer src={{ values, errors, touched }} />}
        </FormSpy>
      </Form>
    )}
  />
)
