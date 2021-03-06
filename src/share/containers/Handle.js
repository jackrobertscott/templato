import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { titleCase, sentenceCase } from 'change-case';
import { Formik, Form, Field } from 'formik';
import { Button, Callout, FormGroup } from '@blueprintjs/core';
import Human from '../components/Human';
import Collection from '../components/Collection';
import Pages from '../components/Pages';
import Layout from '../components/Layout';

class Handle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderForm({ errors }) {
    const { loading } = this.state;
    const { tags } = this.props;
    return (
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
        {tags.map(tag => (
          <Fragment key={tag.name}>
            <FormGroup
              label={titleCase(tag.name)}
              labelInfo={`${tag.otag}${tag.name}${tag.ctag}`}
              labelFor={tag.name}
            >
              <Field
                type="text"
                name={tag.name}
                placeholder="..."
                className="bp3-input"
              />
            </FormGroup>
          </Fragment>
        ))}
        <hr />
        <FormGroup
          label="Folder name"
          labelFor="meta.folder"
          helperText="Save these files into a folder by adding a folder name."
        >
          <Field
            type="text"
            name="meta.folder"
            placeholder="..."
            className="bp3-input"
          />
        </FormGroup>
        <br />
        <Layout>
          <Button
            type="submit"
            intent="primary"
            disabled={loading}
            style={{ flexGrow: 1, marginRight: '10px' }}
          >
            {loading ? 'Loading...' : 'Generate Code'}
          </Button>
          <Button onClick={() => this.props.handleTags()}>Clear Inputs</Button>
        </Layout>
      </Form>
    );
  }

  render() {
    const { tags, saved } = this.props;
    const initialValues = tags.reduce(
      (all, next) => ({ ...all, [next.name]: next.value }),
      { meta: { folder: '' } },
    );
    return (
      <Human {...this.props}>
        <Collection
          message={
            tags.length
              ? `Here are all the {{squiggly}} braces we found. Go add some variables in the inputs below and click "Generate Code" to create your files!`
              : `We didn't find any {{squiggly}} braces in your Gist...  🤨were did you put them?`
          }
        >
          <Formik
            initialValues={initialValues}
            onSubmit={(...args) => this.props.handleSubmit(...args)}
            render={(...args) => this.renderForm(...args)}
          />
        </Collection>
        <Pages {...this.props} pages={saved} />
      </Human>
    );
  }
}

Handle.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleTags: PropTypes.func.isRequired,
  saved: PropTypes.array.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Handle;
