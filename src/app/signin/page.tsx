"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRouter } from "next/navigation";

import { useAuthContext } from "@/components/context/AuthContext";
import ALink from "@/components/common/ALink";
import { toast } from "react-toastify";

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");
  const { user } = useAuthContext();
  const route = useRouter();

  const singinHandler = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        callbackUrl: `${
          process.env.NODE_ENV === "production"
            ? process.env.NEXT_PUBLIC_FRONTEND_URL
            : "http://localhost:3000"
        }`,
        email: email,
        password: password,
      });

      if (result?.url) {
        toast.error("Welcome Back!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        route.push("/dashboard");
      } else {
        toast.error("Invalid Cridential!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
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

        <div className="absolute left-0 top-0 w-full z-10 h-full flex items-center justify-center">
          <div className="container">
            <div className="grid grid-flex-row grid-cols-12 sm:gap-x-8 gap-y-8 items-center justify-center">
              <div className="col-span-12 lg:col-span-5">
                <div className="max-w-[362px] bg-grey-100 p-7 rounded-md shadow-lg">
                  <h4 className="inline-block relative subtitle text-primary text-lg font-bold pb-2">
                    Mitglieder Bereich
                    <span className="absolute left-0 md:right-auto mr-auto right-0 top-full divider inline-block h-1 w-20 bg-primary rounded-md"></span>
                  </h4>

                  <form action="#" onSubmit={singinHandler} className="mt-10">
                    <input
                      type="text"
                      placeholder="Benutzername"
                      className="form-control bg-white h-[48px] rounded-xl mb-4 w-full px-4"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control bg-white h-[48px] rounded-xl mb-4 w-full px-4"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      required
                    />
                    <div className="flex items-center space-x-2 text-primary -mt-3 mb-10">
                      <ALink
                        href="/auth/forgot-password"
                        className="inline-block text-base leading-loose font-bold text-center py-4 after:content-[''] after:block after:w-[70%] after:h-[2px] after:bg-primary"
                      >
                        {" "}
                        Passwort vergessen
                      </ALink>
                      <svg
                        width="25"
                        height="27"
                        viewBox="0 0 25 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.32 22.794C15.1235 22.9945 14.8604 23.1055 14.5873 23.103C14.3142 23.1005 14.0529 22.9847 13.8598 22.7806C13.6666 22.5765 13.5571 22.3004 13.5547 22.0118C13.5523 21.7232 13.6573 21.4451 13.8471 21.2375L20.4023 14.3102L2.08354 14.3102C1.80727 14.3102 1.54232 14.1942 1.34697 13.9878C1.15162 13.7814 1.04187 13.5014 1.04187 13.2094C1.04187 12.9175 1.15162 12.6375 1.34697 12.431C1.54232 12.2246 1.80727 12.1086 2.08354 12.1086L20.4023 12.1086L13.8471 5.18135C13.6573 4.97374 13.5523 4.69568 13.5547 4.40705C13.5571 4.11843 13.6666 3.84234 13.8598 3.63824C14.0529 3.43414 14.3142 3.31838 14.5873 3.31587C14.8604 3.31336 15.1235 3.42431 15.32 3.62483L23.6533 12.4312C23.7498 12.5336 23.8263 12.6552 23.8783 12.7889C23.9313 12.9221 23.9585 13.065 23.9585 13.2094C23.9585 13.3538 23.9313 13.4968 23.8783 13.6299C23.8263 13.7636 23.7498 13.8852 23.6533 13.9877L15.32 22.794Z"
                          fill="#D4BA77"
                        />
                      </svg>
                    </div>

                    <button
                      type="submit"
                      className="bg-primary font-bold text-white text-base px-20 py-3"
                    >
                      {isLoading ? "Sending..." : "Anmelden"}
                    </button>
                  </form>
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
      </section>
    </main>
  );
};

export default Login;
