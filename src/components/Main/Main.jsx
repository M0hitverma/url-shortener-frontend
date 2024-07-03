"use client";
import React, { useEffect, useState } from "react";
import { Card } from "../Card/Card";
import "./MainStyle.css";
import NoClick from "../../../public/assets/no-clicks.svg";
import Image from "next/image";
import { MainModal } from "../Modal/MainModal";
import { getSmartLinks } from "@/api/CommanApi";
import Link from "next/link";
import eventEmitter from "@/lib/eventEmitter";
export const Main = () => {
  const [showModal, setShowModal] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [smartLinks, setSmartLinks] = useState([]);
  const [type, setType] = useState();

  const handleCreateSmartLink = () => {
    if (!authorized) {
      setType("LoginModal");
    } else {
      setType("GenerateURL");
    }
    setShowModal(true);
  };
  const fetchSmartLinks = async () => {
    const response = await getSmartLinks();
    if (!response || !response.ok) {
      setAuthorized(false);
      setSmartLinks([]);
      return;
    }
    setAuthorized(true);
    setSmartLinks(response.data);
  };
  useEffect(() => {
    const logoutHandler = () => {
      setAuthorized(false);
      setSmartLinks([]);
    };
    eventEmitter.on("logout", logoutHandler);
    return () => {
      eventEmitter.off("logout", logoutHandler);
    };
  }, []);

  useEffect(() => {
    fetchSmartLinks();
  }, []);

  return (
    <div className="main-container py-8 md:px-0 px-4">
      <div className="create-link  border-b-4 border-blue-300">
        <div className="flex flex-col items-center gap-10 justify-center">
          <div>
            <Image src={NoClick} width={80} height={80} alt="No-Click" />
          </div>
          <button
            className="button flex flex-row gap-1 items-center"
            type="button"
            onClick={handleCreateSmartLink}
          >
            <span className="text-2xl  font-light">+</span>{" "}
            <span>Create Smart Link</span>
          </button>
        </div>
      </div>

      <div className="links-container py-10 md:px-10 px-5 md:w-[80vw] ">
        {!authorized ? (
          <div className="flex flex-col ">
            <h1 className="md:text-2xl text-xl font-semibold mb-5">
              Welcome to Smart Link Service
            </h1>
            <h3 className="text-lg font-semibold ">
              To access the Smart Link Service, please log in to your account.
            </h3>
            <ul className="list-disc  mb-5 ">
              <li>
                Already have an account?{" "}
                <Link href={`/login`} className="text-blue-500 font-normal">
                  Log in
                </Link>{" "}
                using your credentials.
              </li>
              <li>
                New here?{" "}
                <Link href={`/register`} className="text-blue-500 font-normal">
                  Sign up
                </Link>{" "}
                to create an account and get started.
              </li>
            </ul>
            <h3 className="text-lg font-semibold ">Why Log In?</h3>
            <ul className="list-disc ">
              <li>
                Personalized Experience: Access links tailored just for you.
              </li>
              <li>Secure Access: Keep your links safe and private.</li>
              <li>
                Seamless Integration: Connect and manage your smart links
                effortlessly.
              </li>
              <li>
                User Control: Customize and organize your links for efficient
                management and sharing.
              </li>
              <li>
                Analytics Insights: Gain valuable insights into link performance
                and user engagement.
              </li>
            </ul>
            <p className="mt-5 md:text-xl text-lg">
              <Link href={`/login`} className="text-blue-500">
                Log In
              </Link>{" "}
              to continue.
            </p>
          </div>
        ) : smartLinks.length === 0 ? (
          <div className="flex flex-col ">
            <h1 className="md:text-2xl text-xl font-semibold ">
              Welcome to Smart Link Service
            </h1>
            <p className="font-semibold opacity-60 mb-4 ">
              Explore the possibilities with Smart Links!
            </p>
            <h3 className="text-lg font-semibold ">New to Smart Links?</h3>
            <p className="font-semibold  mb-2 opacity-60">
              Create personalized smart links and unlock their potential:
            </p>
            <ul className="list-disc ">
              <li>
                Easy Setup: Start creating your first smart link in just a few
                simple steps.
              </li>
              <li>
                Customized Experience: Tailor links to match your unique
                preferences and branding.
              </li>
              <li>
                Drive Engagement: Increase clicks and interactions with
                optimized smart links.
              </li>
              <li>
                Track Performance: Gain insights into link performance and
                audience engagement.
              </li>
              <li>
                Secure and Private: Protect your links with advanced security
                features.
              </li>
              <li>
                Seamless Sharing: Share your smart links effortlessly across all
                platforms.
              </li>
            </ul>

            <div className="mt-5  ">
              Ready to get started?{" "}
              <button className="text-blue-500 font-semibold">
                Create your first smart link now
              </button>{" "}
              and experience the convenience and power of Smart Links!
            </div>
          </div>
        ) : (
          <>
            <h1 className="w-full  text-xl  font-mono">Smart Links</h1>
            <div className="grid md:grid-flow-row md:grid-cols-2 grid-cols-1  items-center justify-center md:gap-14 gap-5">
              {smartLinks.map((item, index) => (
                <div key={index}>
                  <Card data={item} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {showModal && (
        <MainModal
          closeModal={() => setShowModal(false)}
          type={type}
          setType={setType}
          setSmartLinks={setSmartLinks}
        />
      )}
    </div>
  );
};
