import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isPending } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
// onSubmit(formData) --> formData is an object containing the current values of the form fields
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      },
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isPending}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isPending}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          disabled={isPending}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isPending}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isPending}
          onClick={reset}>
          Cancel
        </Button>
        <Button variation="primary" disabled={isPending}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;

//% useForm hook Refresher :
// 1. useForm() returns an object with the following properties:
//    - register: A function that registers an input field in the form.
//    - handleSubmit: A function that handles form submission.
//    - formState: An object containing the current state of the form.
//    - getValues: A function that returns the current values of the form fields.
//    - reset: A function that resets the form to its initial state.

// 2. The register() function takes two arguments: the name of the input field and an options object.
//    The options object can contain the following properties:
//    - required: A boolean indicating whether the field is required.
//    - minLength: An object with two properties: value and message.
//    - pattern: An object with two properties: value and message.
//    - validate: A function that takes the value of the input field as an argument and returns a boolean.

// 3. The handleSubmit() function takes a callback function as an argument.
//  This function is called when the form is submitted.
//  The callback function (onSubmit) receives an object with the current values of the form fields as an argument.

// 4. The formState object contains the following properties:
//    - isDirty: A boolean indicating whether the form has been modified.
//    - isValid: A boolean indicating whether the form is valid.
//    - isValidating: A boolean indicating whether the form is currently being validated.
//    - isSubmitting: A boolean indicating whether the form is currently being submitted.
//    - errors: An object containing the errors for each field in the form.
//    - touched: An object containing the touched state for each field in the form.
//    - isSubmitSuccessful: A boolean indicating whether the form submission was successful.

// 5. The getValues() function returns an object containing the current values of the form fields.
