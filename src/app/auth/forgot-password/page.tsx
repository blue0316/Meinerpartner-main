"use client";

import { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ForgotPassword = () => {
  const [alert, setAlert] = useState();

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Insert a valid email").required("Required"),
  });

  const onSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      resetForm();
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      <section className="relative flex items-center overflow-y-hidden z-10 bg-grey-100 pb-20">
        <div className="relative bg-grey-100 w-full pt-[750px] sm:pt-[1000px] lg:pt-[43%] min-h-[761px] lazy-load">
          <LazyLoadImage
            wrapperClassName="absolute top-0 left-0 z-10 rounded-md overflow-hidden"
            className="object-cover h-full"
            src={`/assets/images/banner-bottom.png`}
            effect="black-and-white"
            width="100%"
            height="100%"
            alt="home"
          />
        </div>
      </section>

      <div className="absolute left-0 top-0 w-full z-10 h-full flex items-center justify-center">
        <div className="container">
          <div className="grid grid-flex-row grid-cols-12 sm:gap-x-8 gap-y-8 items-center justify-center">
            <div className="col-span-12 lg:col-span-5">
              <div className="container">
                <h1>Forgot password</h1>
                <hr />
                {alert && (
                  <div
                    style={{
                      backgroundColor:
                        alert[0] === "success" ? "lightgreen" : "lightcoral",
                    }}
                  >
                    <div dangerouslySetInnerHTML={{ __html: alert[1] }} />
                  </div>
                )}
                <br />
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setSubmitting, resetForm }) =>
                    onSubmit(values, { setSubmitting, resetForm })
                  }
                >
                  {({ isSubmitting, isValid }) => (
                    <Form>
                      <div>
                        <div>
                          <label htmlFor="email">Email</label>
                        </div>
                        <Field
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Email"
                        />
                        <div className="error">
                          <ErrorMessage name="email" />
                        </div>
                      </div>

                      <br />

                      <button type="submit" disabled={!isValid}>
                        {!isSubmitting && "Send link"}
                        {isSubmitting && "Loading..."}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7">
              <div className="relative flex justify-center pt-[64%] lazy-load">
                <LazyLoadImage
                  wrapperClassName="absolute top-0 left-0 z-10 rounded-md overflow-hidden"
                  className="object-cover"
                  src={`/assets/images/bg-1.png`}
                  effect="black-and-white"
                  width="100%"
                  height="100%"
                  alt="home"
                />

                <div className="bg-overlay absolute top-0 left-0 w-full h-full rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
