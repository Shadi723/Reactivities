import { FORM_ERROR } from "final-form";
import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { combineValidators, isRequired } from "revalidate";
import { Button, Form, Header, Label } from "semantic-ui-react";
import ErrorMessage from "../../app/common/form/ErrorMessage";
import TextInput from "../../app/common/form/TextInput";
import { IUserFromValues } from "../../app/models/user";
import { RootStoreContext } from "../../app/stores/rootStore";

const validate = combineValidators({
  email: isRequired("email"),
  password: isRequired("password"),
  userName: isRequired("userName"),
  displayName: isRequired("displayName"),
});
const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;
  return (
    <FinalForm
      validate={validate}
      onSubmit={(values: IUserFromValues) => {
        console.log("hi");
        register(values).catch((error) => ({
          [FORM_ERROR]: error,
        }));
      }}
      render={({
        handleSubmit,
        submitting,
        form,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit,
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header
            as="h2"
            content="Sign up to activities"
            color="teal"
            textAlign="center"
          />
          <Field
            name="username"
            component={TextInput}
            placeholder="User Name"
          />
          <Field
            name="displayName"
            component={TextInput}
            placeholder="Display Name"
          />
          <Field name="email" component={TextInput} placeholder="Email" />
          <Field
            name="password"
            component={TextInput}
            placeholder="Password"
            type="password"
          />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage
              error={submitError}
              text={JSON.stringify(submitError.data.errors)}
            />
          )}
          <Button loading={submitting} color="teal" content="Register" fluid />
        </Form>
      )}
    />
  );
};

export default RegisterForm;
