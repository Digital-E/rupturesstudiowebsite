import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

import Button from "./button"


const Container = styled.div`

    padding: 0 25%;

    label {
        display: none;
    }

    form {
        display: flex;
    }

    form > input {
        background-color: white;
        padding: 10px 25px;
        border: 2px solid black;
    }

    form > input::placeholder {
        color: #A6A6A6;
        font-size: 0.8125rem;
    }

    form > input:focus {
        outline: none;
        border: 2px solid black;
    }

    .text-input {
        width: 100%;
    }

    .text-input.error {
        border: 2px solid #FF5B5B;
    }


    .checkbox {
        display: flex;
        // align-items: center;
        margin-bottom: 15px;
        cursor: pointer;
    }

    .checkbox > input {
        height: 15px;
        width: 15px;
        min-height: 15px;
        min-width: 15px;
        border-radius: 999px;
        -webkit-appearance: none;
        border: 1px solid #AC9E95;
        margin-right: 25px;
    }

    .checkbox > input:checked {
        background: #b0b0b0;
    }

    button {
        -webkit-appearance: none;
        border: none;
        background: none;
        margin-left: 40px;
        cursor: pointer;
    }

    .disabled {
        // pointer-events: none;
        // opacity: 0.3;
    }

    @media(max-width: 989px) {
        padding: 0 40px;

        form {
            flex-direction: column;
        }

        .text-input {
            height: 60px;
        }

        button {
            margin-left: 0;
            margin-top: 20px;
        }
    }
`;



const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className={meta.touched && meta.error ? "text-input error caption" : "text-input caption"} {...field} {...props} />
      {/* {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null} */}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <label className="checkbox">
        <input {...field} {...props} type="checkbox" />
        {children}
      </label>
      {/* {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null} */}
    </>
  );
};

const Submit = ({ children, ...props}) => {
    const {isValid, touched } = useFormikContext();
    let isActive = false

    if(isValid === true && Object.entries(touched).length !== 0) {
        isActive = true
    } else {
        isActive = false
    }


    return (<button type="submit" className={isActive ? null : "disabled"}><Button>Subscribe</Button></button>)
}

// Styled components ....
const StyledSelect = styled.select`
  color: var(--blue);
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: var(--red-600);
  width: 400px;
  margin-top: 0.25rem;
  &:before {
    content: "❌ ";
    font-size: 10px;
  }
  @media (prefers-color-scheme: dark) {
    color: var(--red-300);
  }
`;

const StyledLabel = styled.label`
  margin-top: 1rem;
`;

const MySelect = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledSelect {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};

// And now we can use these
const SignupForm = () => {

  return (
    <Container>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email addresss")
            .required("Required")
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await new Promise(r => setTimeout(r, 500));
          setSubmitting(false);
        }}
      >
        <Form>
            <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="Email"
            />       
            <Submit />
        </Form>
      </Formik>
    </Container>
  );
};

export default SignupForm
