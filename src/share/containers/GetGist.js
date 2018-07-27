import React, { Component } from 'react';
import PropType from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { sentenceCase } from 'change-case';
import * as Yup from 'yup';
import { Button, ControlGroup, Callout } from '@blueprintjs/core';
import Blurground from '../components/Blurground';

class GetGist extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const initialValues = {
      gistId: '',
    };
    const schema = Yup.object().shape({
      gistId: Yup.string()
        .trim()
        .required(),
    });
    return (
      <Blurground>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={(...args) => this.props.handleSubmit(...args)}
          render={({ isSubmitting, errors }) => (
            <Form>
              {errors &&
                !!Object.keys(errors).length && (
                  <Callout title="Errors" intent="danger">
                    {Object.values(errors).map(err => (
                      <span key={err}>
                        {sentenceCase(err)}
                        <br />
                      </span>
                    ))}
                  </Callout>
                )}
              <br />
              <ControlGroup>
                <Field
                  type="text"
                  name="gistId"
                  className="bp3-input"
                  placeholder="77752bd6787c41fa600b5a5a550dfc9e"
                />
                <Button disabled={isSubmitting} type="submit">
                  {isSubmitting ? 'Loading...' : 'Continue'}
                </Button>
              </ControlGroup>
            </Form>
          )}
        />
      </Blurground>
    );
  }
}

GetGist.propTypes = {
  handleSubmit: PropType.func.isRequired,
};

export default GetGist;
