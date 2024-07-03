import React, { useState } from "react";
import { ShowUrlModal } from "./ShowUrlModal";
import { SmartLinkModal } from "./SmartLinkModal";
import { createSmartLink } from "@/api/CommanApi";
import { toast } from "react-toastify";
import { LoginModal } from "./LoginModal";
export const MainModal = ({ closeModal, type, setType, setSmartLinks }) => {
  const [userUrl, setUserUrl] = useState("");
  const [urlTitle, setUrlTitle] = useState("");
  const [smartUrl, setSmartUrl] = useState("SmartUrl");
  const [warning, setWarning] = useState({
    title: "",
    url: "",
  });
  const [loading, setLoading] =useState(false);
  const validateForm = () => {
    let flag = true;
    if (userUrl.length === 0) {
      setWarning((prev) => ({ ...prev, url: "required" }));
      flag = false;
    }
    if (urlTitle.length === 0) {
      setWarning((prev) => ({ ...prev, title: "required" }));
      flag = false;
    }
    return flag;
  };
  const handleGenerateLink = async () => {
    setLoading(true);
    if (!validateForm()) {
      setLoading(false);
      return;
    }
    
    const response = await createSmartLink(urlTitle, userUrl);
    setLoading(false);
    if (response?.ok) {
      setSmartUrl(response.shortUrl);
      setType("ShowURL");
      if (response.data) {
        setSmartLinks((prev) => [...prev, response.data]);
      }
      toast.success(response.message, {
        autoClose: 2000,
      });
    } else if (!response?.ok) {
      toast.error(response.message, {
        autoClose: 2000,
      });
    } else {
      toast.error("Something went wrong! Try again later", {
        autoClose: 2000,
      });
    }
  };
  return (
    <>
      {type === "GenerateURL" && (
        <SmartLinkModal
          closeModal={closeModal}
          handleGenerateLink={handleGenerateLink}
          userUrl={userUrl}
          setUserUrl={setUserUrl}
          urlTitle={urlTitle}
          setUrlTitle={setUrlTitle}
          warning={warning}
          setWarning={setWarning}
          loading={loading}
        />
      )}
      {type === "ShowURL" && (
        <ShowUrlModal
          closeModal={closeModal}
          userUrl={userUrl}
          smartUrl={smartUrl}
          urlTitle={urlTitle}
        />
      )}
      {type === "LoginModal" && <LoginModal closeModal={closeModal} />}
    </>
  );
};
