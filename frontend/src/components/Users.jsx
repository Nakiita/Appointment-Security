import React, { useEffect, useState } from "react";
import { getSingleUserApi } from "../apis/Api";
import getUser from "../utils/getUser";

const Users = ({ data, currentUser }) => {
  const [userData, setUserData] = useState(null);
  const senderId = data.members.find((id) => id !== currentUser);

  useEffect(() => {
    const getSenderData = async () => {
      try {
        const response = await getSingleUserApi(senderId);
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getSenderData();
  }, [senderId]);

  console.log(userData);

  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        <img className="w-10 h-10 rounded-full" src={userData?.previewImage} alt="" />
        <div className="font-medium">
          <div>{userData?.UserName}</div>
          <div className="text-sm text-gray-500">Joined in August 2014</div>
        </div>
      </div>
      <hr className="border-gray-300" />
    </>
  );
};

export default Users;
