"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { LazyLoadImage } from "react-lazy-load-image-component";

// Import Utils
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { getSession, getStrapiData, getStrapiURL } from "@/utils";

import { StrapiSocialIcons } from "@/types/StrapiSocialIcons";
import { useSession } from "next-auth/react";
import { useAuthContext } from "@/components/context/AuthContext";

const StyledDesc = styled("div")`
  p {
    margin-bottom: 1rem;
  }
`;

const Dashboard = () => {
  const route = useRouter();
  const { data: session, update: sessionUpdate } = useSession();
  const { user, isLoading, setUser } = useAuthContext();
  const avataImageRef = useRef<any>(null);
  const brandImageRef = useRef<any>(null);
  const backgroundImageRef = useRef<any>(null);
  const [categories, setCategories] = useState<Array<{
    title: string;
    slug: string;
  }> | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingSocial, setLoadingSocial] = useState<boolean>(false);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string | null>(
    null
  );
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [brandUrl, setBrandUrl] = useState<string | null>(null);
  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [editSocial, setEditSocial] = useState<boolean>(false);
  const [newCategories, setNewCategories] = useState<Array<any>>([]);

  const [userTitle, setUserTitle] = useState<string>("");
  const [userDesc, setUserDesc] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  // const [userRole, setUserRole] = useState<string>("");
  const [userAddress, setUserAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contactInfo, setContactInfo] = useState<
    Array<{ id: number; link: string; title: string }>
  >([]);

  const [socialInfo, setSocialInfo] = useState<StrapiSocialIcons>({
    instagram: {
      image: {
        url: "",
      },
      link: "",
    },
    twitter: {
      image: {
        url: "",
      },
      link: "",
    },
    facebook: {
      image: {
        url: "",
      },
      link: "",
    },
    linkedin: {
      image: {
        url: "",
      },
      link: "",
    },
    youtube: {
      image: {
        url: "",
      },
      link: "",
    },
    tiktok: {
      image: {
        url: "",
      },
      link: "",
    },
  });

  useEffect(() => {
    getUserCategories();

    isAuthenticatedHandler();
  }, []);

  const isAuthenticatedHandler = async () => {
    const data: any = await getSession();

    if (!data.authenticated) {
      route.push("/signin");
    } else {
      setUser({ ...data?.session?.user });
    }
  };

  useEffect(() => {
    if (editProfile) {
      setNewCategories(user?.categories);
    }

    if (editSocial) {
      setSocialInfo({ ...socialInfo, ...user.socialInfo });
    }
  }, [editProfile, editSocial]);

  const getUserCategories = async () => {
    try {
      const categoriesResp = await getStrapiData(
        `categories?populate=*`,
        false
      );
      setCategories(categoriesResp?.data);
    } catch {
      console.error(Error);
    }
  };

  const handleProfileUpdate = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    let data: any = {};

    try {
      if (avatarUrl) {
        const avatar = await handleImageUpload(avataImageRef);
        data = { ...data, avatar: avatar };
      }

      if (brandUrl) {
        const brand = await handleImageUpload(brandImageRef);
        data = { ...data, brand: brand };
      }

      if (backgroundImageUrl) {
        const background = await handleImageUpload(backgroundImageRef);
        data = { ...data, background: background };
      }

      if (userTitle) {
        data = { ...data, title: userTitle };
      }

      if (userDesc) {
        data = { ...data, desc: userDesc };
      }

      if (userName) {
        data = {
          ...data,
          username: userName,
          slug: userName
            .trim()
            .toLocaleLowerCase()
            .replace(/[^\w-.~]/g, "-"),
        };
      }

      if (userAddress) {
        data = { ...data, address: userAddress };
      }

      if (email) {
        data = { ...data, email: email };
      }

      if (contactInfo.length > 0) {
        data = { ...data, contactInfo: contactInfo };
      }

      if (newCategories.length > 0) {
        data = { ...data, categories: newCategories };
      }

      const token: any = session?.user;

      await fetch(getStrapiURL(`/api/users/${user.id}?populate=*`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // set the auth token to the user's jwt
          Authorization: `Bearer ${token?.token}`,
        },
        body: JSON.stringify({
          ...user,
          ...data,
          role: undefined,
          token: undefined,
        }),
      });

      await handleUpdate();
    } catch {
      console.error(Error);
    } finally {
      clearEditProfile();
    }
  };

  const handleUpdate = async () => {
    sessionUpdate();

    await isAuthenticatedHandler();

    setLoading(false);
    setLoadingSocial(false);
  };

  const handleSocialUpdate = async () => {
    setLoadingSocial(true);

    try {
      await handleUpdate();
    } catch {
      console.error(Error);
    } finally {
      clearEditSocialInfo();
    }
  };

  const handleImageUpload = async (elementRef: any) => {
    const formData = new FormData();
    formData.append("files", elementRef?.current.files[0]);

    const uploadResponse: any = await fetch(getStrapiURL("/api/upload/"), {
      method: "POST",
      body: formData,
    });

    const uploadedImage = await uploadResponse.json();

    return uploadedImage;
  };

  const handleUploadBackgroundImage = () => {
    if (
      backgroundImageRef.current.files &&
      backgroundImageRef.current.files[0]
    ) {
      let reader = new FileReader();

      reader.addEventListener(
        "load",
        function () {
          let src: any = reader.result;
          setBackgroundImageUrl(src);
        },
        false
      );

      reader.readAsDataURL(backgroundImageRef.current.files[0]);
    }
  };

  const handleUploadAvatarImage = () => {
    if (avataImageRef.current.files && avataImageRef.current.files[0]) {
      let reader = new FileReader();

      reader.addEventListener(
        "load",
        function () {
          let src: any = reader.result;
          setAvatarUrl(src);
        },
        false
      );

      reader.readAsDataURL(avataImageRef.current.files[0]);
    }
  };

  const handleUploadBrandImage = () => {
    if (brandImageRef.current.files && brandImageRef.current.files[0]) {
      let reader = new FileReader();

      reader.addEventListener(
        "load",
        function () {
          let src: any = reader.result;
          setBrandUrl(src);
        },
        false
      );

      reader.readAsDataURL(brandImageRef.current.files[0]);
    }
  };

  const handleUpdateCategories = (catId: number, cat: any) => {
    if (newCategories.length == 0) {
      if (
        cat?.users_permissions_users?.data?.find(
          (item: any) => item?.attributes?.slug == user?.slug
        )
      ) {
        setNewCategories([
          ...newCategories,
          {
            id: catId,
            ...cat,
            users_permissions_users: cat?.users_permissions_users?.data?.reduce(
              (acc: any, cur: any) => {
                const temp = { id: cur?.id, ...cur.attributes };
                acc.push(temp);
                return acc;
              },
              []
            ),
          },
        ]);
      } else {
        setNewCategories([
          ...newCategories,
          {
            id: catId,
            ...cat,
            users_permissions_users: [
              ...cat?.users_permissions_users?.data?.reduce(
                (acc: any, cur: any) => {
                  const temp = { id: cur?.id, ...cur.attributes };
                  acc.push(temp);
                  return acc;
                },
                []
              ),
              user,
            ],
          },
        ]);
      }
    } else {
      if (newCategories.find((item) => item.slug == cat.slug)) {
        setNewCategories(
          newCategories.filter((item) => item?.slug !== cat.slug)
        );
      } else {
        if (
          newCategories.find((item) =>
            item?.users_permissions_users?.data?.find(
              (p: any) => p?.attributes?.slug == user?.slug
            )
          )
        ) {
          setNewCategories([
            ...newCategories,
            {
              id: catId,
              ...cat,
              users_permissions_users:
                cat?.users_permissions_users?.data?.reduce(
                  (acc: any, cur: any) => {
                    const temp = { id: cur?.id, ...cur.attributes };
                    acc.push(temp);
                    return acc;
                  },
                  []
                ),
            },
          ]);
        } else {
          setNewCategories([
            ...newCategories,
            {
              id: catId,
              ...cat,
              users_permissions_users: [
                ...cat?.users_permissions_users?.data?.reduce(
                  (acc: any, cur: any) => {
                    const temp = { id: cur?.id, ...cur.attributes };
                    acc.push(temp);
                    return acc;
                  },
                  []
                ),
                user,
              ],
            },
          ]);
        }
      }
    }
  };

  const handleUpdateContactInfo = (type: string, value: string) => {
    if (user.contactInfo.find((item: any) => item.title == type)) {
      let temp: any = [];

      temp = (contactInfo.length > 0 ? contactInfo : user?.contactInfo)?.reduce(
        (acc: any, cur: any) => {
          if (cur?.title == type) {
            const temp = { ...cur, link: value };
            acc.push({ ...acc, ...temp });
          } else {
            acc.push({ ...cur });
          }

          return acc;
        },
        []
      );

      setContactInfo(temp);
    }
  };

  const clearEditProfile = () => {
    setEditProfile(false);
    setNewCategories([]);
    setAvatarUrl(null);
    setBrandUrl(null);
    setContactInfo([]);
    setUserTitle("");
    setUserDesc("");
    setUserName("");
    setEmail("");
    setUserAddress("");
  };

  const clearEditSocialInfo = () => {
    setEditSocial(false);
  };

  if (!user) {
    return (
      <div className="text-5xl flex items-center bg-primary text-white justify-center fixed top-0 w-full h-full z-40">
        <div className="preloader">
          <div className="loader">
            <div className="shadow"></div>
            <div className="box"></div>
          </div>
        </div>
      </div>
    );
  }

  console.log(user, "UsersUsers");

  return (
    <>
      <main>
        <section className="relative overflow-y-hidden bg-grey-100 pb-20">
          <div className="relative bg-grey-100 w-full pt-[27%] min-h-[510px] lazy-load">
            <LazyLoadImage
              wrapperClassName="absolute top-0 left-0 z-10 overflow-hidden"
              className="object-cover h-full"
              src={`${
                backgroundImageUrl
                  ? backgroundImageUrl
                  : user?.background
                  ? user?.background?.url
                  : "/assets/images/single-page-header.png"
              }`}
              effect="black-and-white"
              width="100%"
              height="100%"
              alt="home"
            />

            <img
              className="absolute top-6 w-full z-20"
              src="/assets/images/bottom.svg"
              width="100%"
              height="50"
              alt="bottom"
            />

            <div className="bg-overlay bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full z-10"></div>
          </div>

          <div className="relative z-10 -mt-[13rem] w-full left-0 z-20 ml-auto">
            <div className="container">
              {editProfile && (
                <label
                  id="background"
                  className="cursor-pointer inline-block bg-primary text-white px-12 py-3 rounded-[45px] font-bold text-base mb-5"
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleUploadBackgroundImage}
                    ref={backgroundImageRef}
                  />
                  Hintergrundbild ersetzen
                </label>
              )}

              <div className="relative p-10 shadow-2xl bg-white rounded-lg mb-7">
                <form action="#" onSubmit={handleProfileUpdate}>
                  {loading && (
                    <div className="flex items-center justify-center rounded-lg absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 z-20">
                      <div
                        className="animate-spin inline-block w-16 h-16 border-[3px] border-white border-t-transparent text-blue-600 rounded-full"
                        role="status"
                        aria-label="loading"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-flex-row grid-cols-12 sm:gap-x-5 gap-y-5 lg:gap-x-10 lg:gap-y-10 mb-9">
                    <div className="col-span-12 lg:col-span-3">
                      <h4 className="inline-block relative subtitle text-primary text-lg font-bold pb-1">
                        Stammdaten
                        <span className="absolute left-0 md:right-auto mr-auto right-0 top-full divider inline-block h-1 w-[70%] bg-primary rounded-md"></span>
                      </h4>

                      <div className="max-w-[198px] mx-auto rounded-full overflow-hidden mb-4 mt-10">
                        <div className="w-full relative pt-[100%] lazy-load">
                          {user?.avatar?.url || avatarUrl ? (
                            <LazyLoadImage
                              wrapperClassName="absolute top-0 left-0 z-10 rounded-md overflow-hidden"
                              className="object-cover h-full"
                              src={`${
                                avatarUrl ? avatarUrl : user?.avatar?.url
                              }`}
                              effect="black-and-white"
                              width="100%"
                              height="100%"
                              alt="home"
                            />
                          ) : (
                            <div className="bg-overlay absolute bg-grey-100 top-0 left-0 w-full h-full rounded-md"></div>
                          )}
                        </div>
                      </div>

                      {editProfile && (
                        <div className="text-center mb-10">
                          <label
                            id="idlabel"
                            className="inline-block cursor-pointer border border-primary px-12 py-3 rounded-[45px] hover:bg-primary hover:text-white transition-all font-bold text-base"
                          >
                            <input
                              hidden
                              accept="image/*"
                              type="file"
                              onChange={handleUploadAvatarImage}
                              ref={avataImageRef}
                            />
                            Foto ersetzen
                          </label>
                        </div>
                      )}

                      <p>{user?.userRole}</p>

                      <h4 className="inline-block relative subtitle text-3xl font-bold pb-1">
                        {editProfile ? (
                          <input
                            type="text"
                            className="form-control h-[47px] w-full text-xl font-semibold rounded-md border border-grey-200 px-3"
                            value={userName ? userName : user?.username}
                            onChange={(e) => setUserName(e.target.value)}
                          />
                        ) : (
                          <>
                            {user?.username}
                            <span className="absolute left-0 md:right-auto mr-auto right-0 top-full divider inline-block h-1 w-[70%] bg-black rounded-md"></span>
                          </>
                        )}
                      </h4>

                      <div className="my-5">
                        {editProfile ? (
                          <textarea
                            value={userAddress ? userAddress : user?.address}
                            onChange={(e) => setUserAddress(e.target.value)}
                            className="form-control w-full min-h-[150px] rounded-md border border-grey-200 p-3"
                          ></textarea>
                        ) : (
                          <ReactMarkdown>{user?.address}</ReactMarkdown>
                        )}
                      </div>

                      <ul className="pl-0 space-y-2">
                        <li className="flex items-center space-x-3">
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.9977 29.9851C23.2213 29.9851 30 23.1983 30 14.9925C30 6.77643 23.2109 0 14.9874 0C6.77877 0 0 6.77643 0 14.9925C0 23.1983 6.78906 29.9851 14.9977 29.9851ZM14.9977 28.0463C7.76348 28.0463 1.9498 22.2243 1.9498 14.9925C1.9498 7.7608 7.75313 1.93418 14.9874 1.93418C22.2216 1.93418 28.0605 7.7608 28.0605 14.9925C28.0605 22.2243 22.2319 28.0463 14.9977 28.0463ZM12.2151 15.0353L6.96809 9.80603C6.8794 9.95445 6.82526 10.3132 6.82526 10.8271V19.144C6.82526 19.6569 6.88406 20.0352 7.02113 20.2228L12.2151 15.0353ZM15.0209 15.896C15.2844 15.896 15.5859 15.7878 15.8562 15.513L22.4233 8.95274C22.2336 8.78008 21.786 8.63631 21.1394 8.63631H8.88166C8.23045 8.63631 7.79319 8.78008 7.60809 8.95274L14.166 15.513C14.4512 15.7981 14.7528 15.896 15.0209 15.896ZM17.7436 15.0353L22.9422 20.2228C23.0747 20.0352 23.1485 19.6569 23.1485 19.144V10.8271C23.1485 10.3132 23.0794 9.95445 22.9907 9.80603L17.7436 15.0353ZM15.0106 16.8823C14.4907 16.8823 14.0582 16.6926 13.5548 16.225L13.0068 15.7174L7.65654 21.0462C7.84991 21.2292 8.25471 21.3245 8.88166 21.3245H21.1291C21.7618 21.3245 22.1609 21.2292 22.345 21.0462L17.0144 15.7174L16.457 16.225C15.9433 16.6926 15.5257 16.8823 15.0106 16.8823Z"
                              fill="black"
                              fillOpacity="0.85"
                            />
                          </svg>
                          {editProfile ? (
                            <div>
                              <input
                                type="email"
                                className="form-control h-[30px] w-full rounded-md border border-grey-200 px-3"
                                value={email ? email : user?.email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                          ) : (
                            <>
                              <span>{user?.email}</span>
                            </>
                          )}
                        </li>

                        {user?.contactInfo?.map((item: any, index: number) => (
                          <li
                            className="flex items-center space-x-3"
                            key={index}
                          >
                            {item?.title == "phone" && (
                              <svg
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.9977 29.9851C23.2213 29.9851 30 23.1983 30 14.9925C30 6.77643 23.2109 0 14.9874 0C6.77877 0 0 6.77643 0 14.9925C0 23.1983 6.78906 29.9851 14.9977 29.9851ZM14.9977 28.0462C7.76348 28.0462 1.9498 22.2243 1.9498 14.9925C1.9498 7.7608 7.75313 1.93418 14.9874 1.93418C22.2216 1.93418 28.0605 7.7608 28.0605 14.9925C28.0605 22.2243 22.2319 28.0462 14.9977 28.0462ZM11.1729 18.5739C14.6107 22.0208 19.191 24.3212 21.883 21.6404C21.9692 21.5496 22.0208 21.4831 22.0817 21.4016C22.8762 20.5605 23.0232 19.6146 22.2578 18.9558C21.7507 18.5737 21.1617 18.171 19.457 16.9992C18.6778 16.4512 18.0678 16.5219 17.3439 17.2317L16.7226 17.8378C16.5534 18.0069 16.2729 18.0012 16.0693 17.877C15.5448 17.5723 14.6265 16.8836 13.7428 16.0002C12.8693 15.127 12.1552 14.1771 11.87 13.6838C11.7607 13.4962 11.7287 13.2549 11.9092 13.0652L12.5156 12.4049C13.2209 11.6514 13.287 11.0623 12.7285 10.2776L10.8336 7.58857C10.1731 6.65562 9.21455 7.06206 8.31001 7.688C8.23057 7.74776 8.17079 7.81217 8.11095 7.87199C5.41783 10.5539 7.72116 15.1233 11.1729 18.5739Z"
                                  fill="black"
                                  fillOpacity="0.85"
                                />
                              </svg>
                            )}

                            {item?.title == "website" && (
                              <svg
                                className="mx-[2px]"
                                width="25"
                                height="25"
                                viewBox="0 0 25 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12.4981 24.4946C15.8078 24.4946 18.6635 19.5524 18.6635 12.5187C18.6635 5.46303 15.8164 0.520827 12.4981 0.520827C9.1836 0.520827 6.33257 5.46303 6.33257 12.5187C6.33257 19.5524 9.19223 24.4946 12.4981 24.4946ZM12.4981 1.68831C15.0641 1.68831 17.3337 6.59291 17.3337 12.5187C17.3337 18.2753 15.0641 23.3186 12.4981 23.3186C9.9359 23.3186 7.66246 18.2753 7.66246 12.5187C7.66246 6.59291 9.9359 1.68831 12.4981 1.68831ZM11.8581 0.702952V24.2541H13.1506V0.702952H11.8581ZM12.4981 17.4749C8.71795 17.4749 5.41255 18.4454 3.66026 19.9558L4.65231 20.7734C6.33972 19.4886 9.04206 18.7708 12.4981 18.7708C15.9541 18.7708 18.6603 19.4886 20.3438 20.7734L21.3398 19.9558C19.5875 18.4454 16.2821 17.4749 12.4981 17.4749ZM24.081 11.8415H0.919024V13.1374H24.081V11.8415ZM12.4981 7.57098C16.2821 7.57098 19.5875 6.60449 21.3398 5.09405L20.3438 4.27637C18.6603 5.55258 15.9541 6.27896 12.4981 6.27896C9.04206 6.27896 6.33972 5.55258 4.65231 4.27637L3.66026 5.09405C5.41255 6.60449 8.71795 7.57098 12.4981 7.57098ZM12.4981 24.9875C19.3511 24.9875 25 19.3319 25 12.4938C25 5.64702 19.3425 0 12.4895 0C5.64897 0 0 5.64702 0 12.4938C0 19.3319 5.65755 24.9875 12.4981 24.9875ZM12.4981 23.6525C6.37882 23.6525 1.33548 18.6109 1.33548 12.4938C1.33548 6.37662 6.37024 1.33502 12.4895 1.33502C18.6087 1.33502 23.6645 6.37662 23.6645 12.4938C23.6645 18.6109 18.6174 23.6525 12.4981 23.6525Z"
                                  fill="black"
                                  fillOpacity="0.85"
                                />
                              </svg>
                            )}

                            {editProfile ? (
                              <div>
                                <input
                                  type="text"
                                  className="form-control h-[30px] w-full rounded-md border border-grey-200 px-3"
                                  value={
                                    contactInfo.length > 0
                                      ? contactInfo[index].link
                                      : item?.link
                                  }
                                  onChange={(e) =>
                                    handleUpdateContactInfo(
                                      item?.title,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ) : (
                              <>
                                <span>{item?.link}</span>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="col-span-12 lg:col-span-9">
                      <div className="lg:max-w-[325px] w-full relative pt-[150px] lazy-load mb-10">
                        {user?.brand?.url || brandUrl ? (
                          <LazyLoadImage
                            wrapperClassName="absolute top-0 left-0 z-10 rounded-md overflow-hidden"
                            className="object-cover h-full"
                            src={`${brandUrl ? brandUrl : user?.brand?.url}`}
                            effect="black-and-white"
                            width="100%"
                            height="100%"
                            alt="home"
                          />
                        ) : (
                          <div className="bg-overlay absolute bg-grey-100 top-0 left-0 w-full h-full rounded-md"></div>
                        )}
                      </div>

                      {editProfile && (
                        <div className="mb-10 -mt-5">
                          <label
                            id="idlabel"
                            className="inline-block cursor-pointer border border-primary px-12 py-3 rounded-[45px] hover:bg-primary hover:text-white transition-all font-bold text-base"
                          >
                            <input
                              hidden
                              accept="image/*"
                              type="file"
                              onChange={handleUploadBrandImage}
                              ref={brandImageRef}
                            />
                            Logo ersetzen
                          </label>
                        </div>
                      )}

                      <h4
                        className={`relative subtitle text-3xl font-bold pb-1 ${
                          editProfile ? "" : "inline-block"
                        }`}
                      >
                        {editProfile ? (
                          <input
                            type="text"
                            className="form-control h-[47px] w-full max-w-[500px] text-xl font-semibold rounded-md border border-grey-200 px-3"
                            value={userTitle ? userTitle : user?.companyName}
                            onChange={(e) => setUserTitle(e.target.value)}
                          />
                        ) : (
                          <>
                            {user?.companyName}
                            <span className="absolute left-0 md:right-auto mr-auto right-0 top-full divider inline-block h-1 w-16 bg-black rounded-md"></span>
                          </>
                        )}
                      </h4>

                      <StyledDesc className="my-5">
                        {editProfile ? (
                          <textarea
                            value={userDesc ? userDesc : user?.desc}
                            onChange={(e) => setUserDesc(e.target.value)}
                            className="form-control w-full min-h-[400px] rounded-md border border-grey-200 p-3"
                          ></textarea>
                        ) : (
                          <ReactMarkdown>{user?.desc}</ReactMarkdown>
                        )}
                      </StyledDesc>
                    </div>
                  </div>

                  <ul className="flex items-center flex-wrap mb-10 max-w-[700px]">
                    {editProfile
                      ? categories?.map((cat: any, index) => (
                          <li className="mb-2 mr-2" key={index}>
                            <button
                              type="button"
                              onClick={() => {
                                editProfile &&
                                  handleUpdateCategories(
                                    cat?.id,
                                    cat?.attributes
                                  );
                              }}
                              className={`px-5 py-2  hover:bg-grey-200  rounded-2xl transition-all ${
                                editProfile &&
                                newCategories?.find(
                                  (item) => item.title == cat?.attributes?.title
                                )
                                  ? "border border-grey-200 bg-grey-200"
                                  : `${
                                      editProfile
                                        ? "border border-grey-200 hover:text-black"
                                        : "bg-grey-200 text-black"
                                    }`
                              }`}
                            >
                              {editProfile ? cat?.attributes?.title : cat.title}
                            </button>
                          </li>
                        ))
                      : user.categories?.map((cat: any, index: number) => (
                          <li className="mb-2 mr-2" key={index}>
                            <span className="inline-block px-5 py-2 rounded-2xl transition-all bg-grey-200">
                              {editProfile ? cat?.attributes?.title : cat.title}
                            </span>
                          </li>
                        ))}
                  </ul>

                  {editProfile ? (
                    <div className="flex items-center space-x-3">
                      <button
                        type="submit"
                        className="bg-primary text-white px-12 py-3 rounded-[45px] font-bold text-base"
                      >
                        {loading ? "Updating Profile..." : "Speichern"}
                      </button>

                      <button
                        type="button"
                        onClick={() => clearEditProfile()}
                        className="border border-primary px-12 py-3 rounded-[45px] hover:bg-primary hover:text-white transition-all font-bold text-base"
                      >
                        Abbrechen
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setEditProfile(true)}
                      className="bg-primary text-white px-12 py-3 rounded-[45px] font-bold text-base"
                    >
                      Bearbeiten
                    </button>
                  )}
                </form>
              </div>

              <div className="relative p-10 shadow-2xl bg-white rounded-lg">
                <h4 className="inline-block relative subtitle text-lg text-primary font-bold pb-1">
                  Social Media Links
                  <span className="absolute left-0 md:right-auto mr-auto right-0 top-full divider inline-block h-1 w-16 bg-primary rounded-md"></span>
                </h4>

                {loadingSocial && (
                  <div className="flex items-center justify-center rounded-lg absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 z-20">
                    <div
                      className="animate-spin inline-block w-16 h-16 border-[3px] border-white border-t-transparent text-blue-600 rounded-full"
                      role="status"
                      aria-label="loading"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-flex-row grid-cols-12 sm:gap-x-5 gap-y-5 mt-7 mb-9">
                  <div className="col-span-12 md:col-span-6">
                    {editSocial ? (
                      <div className="flex items-center space-x-3">
                        <img
                          src={`${
                            user?.socialInfo?.instagram?.image?.url
                              ? user?.socialInfo?.instagram?.image?.url
                              : "/assets/images/icons/instagram.png"
                          }`}
                          width={30}
                          height={30}
                          alt="instagram"
                        />
                        <div className="w-full">
                          <input
                            type="text"
                            className="form-control h-[47px] w-full rounded-md border border-grey-200 px-3"
                            value={
                              socialInfo?.instagram?.link
                                ? socialInfo?.instagram?.link
                                : user?.socialInfo?.instagram?.link
                            }
                            onChange={(e) =>
                              setSocialInfo({
                                ...socialInfo,
                                instagram: {
                                  ...socialInfo?.instagram,
                                  link: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <a
                        href={user?.socialInfo?.instagram?.link}
                        target="_blank"
                        className={`flex space-x-3 ${
                          user?.socialInfo?.instagram
                            ? "items-center"
                            : "items-end"
                        }`}
                      >
                        <img
                          src={`${
                            user?.socialInfo?.instagram?.image?.url
                              ? user?.socialInfo?.instagram?.image?.url
                              : "/assets/images/icons/instagram.png"
                          }`}
                          width={30}
                          height={30}
                          alt="instagram"
                        />
                        {user?.socialInfo?.instagram ? (
                          <span>{user?.socialInfo?.instagram?.link}</span>
                        ) : (
                          <span className="w-3/4 block border-b border-b-[#ccc]"></span>
                        )}
                      </a>
                    )}
                  </div>

                  <div className="col-span-12 md:col-span-6">
                    {editSocial ? (
                      <div className="flex items-center space-x-3">
                        <img
                          src={`${
                            user?.socialInfo?.facebook?.image?.url
                              ? user?.socialInfo?.facebook?.image?.url
                              : "/assets/images/icons/facebook.png"
                          }`}
                          width={30}
                          height={30}
                          alt="facebook"
                        />
                        <div className="w-full">
                          <input
                            type="text"
                            className="form-control h-[47px] w-full rounded-md border border-grey-200 px-3"
                            value={
                              socialInfo?.facebook?.link
                                ? socialInfo?.facebook?.link
                                : user?.socialInfo?.facebook?.link
                            }
                            onChange={(e) =>
                              setSocialInfo({
                                ...socialInfo,
                                facebook: {
                                  ...socialInfo?.facebook,
                                  link: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <a
                        href={user?.socialInfo?.facebook?.link}
                        target="_blank"
                        className={`flex space-x-3 ${
                          user?.socialInfo?.facebook
                            ? "items-center"
                            : "items-end"
                        }`}
                      >
                        <img
                          src={`${
                            user?.socialInfo?.facebook?.image?.url
                              ? user?.socialInfo?.facebook?.image?.url
                              : "/assets/images/icons/facebook.png"
                          }`}
                          width={30}
                          height={30}
                          alt="facebook"
                        />
                        {user?.socialInfo?.facebook ? (
                          <span>href={user?.socialInfo?.facebook?.link}</span>
                        ) : (
                          <span className="w-3/4 block border-b border-b-[#ccc]"></span>
                        )}
                      </a>
                    )}
                  </div>

                  <div className="col-span-12 md:col-span-6">
                    {editSocial ? (
                      <div className="flex items-center space-x-3">
                        <img
                          src={`${
                            user?.socialInfo?.twitter?.image?.url
                              ? user?.socialInfo?.twitter?.image?.url
                              : "/assets/images/icons/twitter.png"
                          }`}
                          width={30}
                          height={30}
                          alt="twitter"
                        />
                        <div className="w-full">
                          <input
                            type="text"
                            className="form-control h-[47px] w-full rounded-md border border-grey-200 px-3"
                            value={
                              socialInfo?.twitter?.link
                                ? socialInfo?.twitter?.link
                                : user?.socialInfo?.twitter?.link
                            }
                            onChange={(e) =>
                              setSocialInfo({
                                ...socialInfo,
                                twitter: {
                                  ...socialInfo?.twitter,
                                  link: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <a
                        href={user?.socialInfo?.twitter?.link}
                        target="_blank"
                        className={`flex space-x-3 ${
                          user?.socialInfo?.twitter
                            ? "items-center"
                            : "items-end"
                        }`}
                      >
                        <img
                          src={`${
                            user?.socialInfo?.twitter?.image?.url
                              ? user?.socialInfo?.twitter?.image?.url
                              : "/assets/images/icons/twitter.png"
                          }`}
                          width={30}
                          height={30}
                          alt="twitter"
                        />
                        {user?.socialInfo?.twitter ? (
                          <span>{user?.socialInfo?.twitter?.link}</span>
                        ) : (
                          <span className="w-3/4 block border-b border-b-[#ccc]"></span>
                        )}
                      </a>
                    )}
                  </div>

                  <div className="col-span-12 md:col-span-6">
                    {editSocial ? (
                      <div className="flex items-center space-x-3">
                        <img
                          src={`${
                            user?.socialInfo?.linkedin?.image?.url
                              ? user?.socialInfo?.linkedin?.image?.url
                              : "/assets/images/icons/linkedin.png"
                          }`}
                          width={30}
                          height={30}
                          alt="linkedin"
                        />
                        <div className="w-full">
                          <input
                            type="text"
                            className="form-control h-[47px] w-full rounded-md border border-grey-200 px-3"
                            value={
                              socialInfo?.linkedin?.link
                                ? socialInfo?.linkedin?.link
                                : user?.socialInfo?.linkedin?.link
                            }
                            onChange={(e) =>
                              setSocialInfo({
                                ...socialInfo,
                                linkedin: {
                                  ...socialInfo?.linkedin,
                                  link: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <a
                        href={user?.socialInfo?.linkedin?.link}
                        target="_blank"
                        className={`flex space-x-3 ${
                          user?.socialInfo?.linkedin
                            ? "items-center"
                            : "items-end"
                        }`}
                      >
                        <img
                          src={`${
                            user?.socialInfo?.linkedin?.image?.url
                              ? user?.socialInfo?.linkedin?.image?.url
                              : "/assets/images/icons/linkedin.png"
                          }`}
                          width={30}
                          height={30}
                          alt="linkedin"
                        />
                        {user?.socialInfo?.linkedin ? (
                          <span>{user?.socialInfo?.linkedin?.link}</span>
                        ) : (
                          <span className="w-3/4 block border-b border-b-[#ccc]"></span>
                        )}
                      </a>
                    )}
                  </div>

                  <div className="col-span-12 md:col-span-6">
                    {editSocial ? (
                      <div className="flex items-center space-x-3">
                        <img
                          src={`${
                            user?.socialInfo?.youtube?.image?.url
                              ? user?.socialInfo?.youtube?.image?.url
                              : "/assets/images/icons/youtube.png"
                          }`}
                          width={30}
                          height={30}
                          alt="youtube"
                        />
                        <div className="w-full">
                          <input
                            type="text"
                            className="form-control h-[47px] w-full rounded-md border border-grey-200 px-3"
                            value={
                              socialInfo?.youtube?.link
                                ? socialInfo?.youtube?.link
                                : user?.socialInfo?.youtube?.link
                            }
                            onChange={(e) =>
                              setSocialInfo({
                                ...socialInfo,
                                youtube: {
                                  ...socialInfo?.youtube,
                                  link: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <a
                        href={user?.socialInfo?.youtube?.link}
                        target="_blank"
                        className={`flex space-x-3 ${
                          user?.socialInfo?.youtube
                            ? "items-center"
                            : "items-end"
                        }`}
                      >
                        <img
                          src={`${
                            user?.socialInfo?.youtube?.image?.url
                              ? user?.socialInfo?.youtube?.image?.url
                              : "/assets/images/icons/youtube.png"
                          }`}
                          width={30}
                          height={30}
                          alt="youtube"
                        />
                        {user?.socialInfo?.youtube ? (
                          <span>{user?.socialInfo?.youtube?.link}</span>
                        ) : (
                          <span className="w-3/4 block border-b border-b-[#ccc]"></span>
                        )}
                      </a>
                    )}
                  </div>

                  <div className="col-span-12 md:col-span-6">
                    {editSocial ? (
                      <div className="flex items-center space-x-3">
                        <img
                          src={`${
                            user?.socialInfo?.tiktok?.image?.url
                              ? user?.socialInfo?.tiktok?.image?.url
                              : "/assets/images/icons/tiktok.png"
                          }`}
                          width={30}
                          height={30}
                          alt="tiktok"
                        />
                        <div className="w-full">
                          <input
                            type="text"
                            className="form-control h-[47px] w-full rounded-md border border-grey-200 px-3"
                            value={
                              socialInfo?.tiktok?.link
                                ? socialInfo?.tiktok?.link
                                : user?.socialInfo?.tiktok?.link
                            }
                            onChange={(e) =>
                              setSocialInfo({
                                ...socialInfo,
                                youtube: {
                                  ...socialInfo?.linkedin,
                                  link: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <a
                        href={user?.socialInfo?.tiktok?.link}
                        target="_blank"
                        className={`flex space-x-3 ${
                          user?.socialInfo?.tiktok
                            ? "items-center"
                            : "items-end"
                        }`}
                      >
                        <img
                          src={`${
                            user?.socialInfo?.tiktok?.image?.url
                              ? user?.socialInfo?.tiktok?.image?.url
                              : "/assets/images/icons/tiktok.png"
                          }`}
                          width={30}
                          height={30}
                          alt="tiktok"
                        />
                        {user?.socialInfo?.tiktok ? (
                          <span>{user?.socialInfo?.tiktok?.link}</span>
                        ) : (
                          <span className="w-3/4 block border-b border-b-[#ccc]"></span>
                        )}
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-base font-bold mb-5">
                  *Platformen ohne URL werden nicht im Profil angezeigt
                </p>

                {editSocial ? (
                  <div className="flex items-center space-x-3">
                    <button
                      type="submit"
                      onClick={() => handleSocialUpdate()}
                      className="bg-primary text-white px-12 py-3 rounded-[45px] font-bold text-base"
                    >
                      {loadingSocial ? "Updating Socials..." : "Speichern"}
                    </button>

                    <button
                      type="button"
                      onClick={() => clearEditSocialInfo()}
                      className="border border-primary px-12 py-3 rounded-[45px] hover:bg-primary hover:text-white transition-all font-bold text-base"
                    >
                      Abbrechen
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setEditSocial(true)}
                    className="bg-primary text-white px-12 py-3 rounded-[45px] font-bold text-base"
                  >
                    Bearbeiten
                  </button>
                )}
              </div>

              {/* <div className="flex items-center space-x-3 mt-10">
              <button
                type="button"
                className="border border-primary px-12 py-3 rounded-[45px] hover:bg-primary hover:text-white transition-all font-bold text-base"
              >
                Eintrag anzeigen
              </button>

              <button
                type="button"
                className="border border-primary px-12 py-3 rounded-[45px] hover:bg-primary hover:text-white transition-all font-bold text-base"
              >
                Abmelden
              </button>
            </div> */}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
