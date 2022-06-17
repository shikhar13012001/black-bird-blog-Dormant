import { Authenticator } from "@aws-amplify/ui-react";
import { Auth, API, Storage } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
//import UUID
import { v4 as uuid } from "uuid";
import { useState, useEffect, useRef } from "react";
import {
  createUserAttributes,
  updateUserAttributes,
} from "../src/graphql/mutations";
import { userDetailById } from "../src/graphql/queries";
import { Container } from "@mui/material";
function Profile() {
  const [image, setImage] = useState(null);
  const [UserId, setUserId] = useState(null);
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const user = await Auth.currentUserInfo();
    console.log("usercuure", user);
    setUserId(user.id);
    const userDetails = await API.graphql({
      query: userDetailById,
      variables: {
        userId: user.id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    console.log(userDetails.data);

    if (userDetails.data.UserDetailById.items.length > 0) {
      console.log("already made");
      const imageKey = await Storage.get(
        userDetails.data.UserDetailById.items[0].profileImage
      );
      setImage(imageKey);
      setUserId(userDetails.data.UserDetailById.items[0].id);
    } else {
      //create userDetails
      console.log("creating");
      const userDetails = await API.graphql({
        query: createUserAttributes,
        variables: {
          input: {
            id: user.id,
            userId: user.id,
            username: user.username,
            profileImage: `https://avatars.dicebear.com/api/initials/${user.username}.svg`,
            follow: [],
          },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      console.log(userDetails);
      setImage(userDetails.data.createUserAttributes.profileImage);
      setUserId(userDetails.data.createUserAttributes.id);
    }
  };
  const hiddenFileInput = useRef(null);
  async function uploadImage() {
    hiddenFileInput.current.click();
  }
  async function handleChange(e) {
    const fileUploaded = e.target.files[0];
    if (!fileUploaded) return;
    setImage(fileUploaded);
    const details = await Auth.currentUserInfo();
    const userId = details.id;
    //upload image to S3
    if (fileUploaded) {
      const fileName = `${fileUploaded.name}_${uuid()}`;
      console.log(fileName, fileUploaded);

      //update userAttributes
      const userDetails = await API.graphql({
        query: updateUserAttributes,
        variables: {
          input: {
            id: UserId,
            userId: userId,
            profileImage: fileName,
            username: details.username,
          },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      const imageStored = await Storage.put(fileName, fileUploaded);
      const useableImage = await Storage.get(imageStored.key);
      setImage(useableImage);
      // retrieve file from S3

      // set image
    }
  }
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Container>
          <input
            type="file"
            ref={hiddenFileInput}
            className="absolute w-0 h-0"
            onChange={handleChange}
          />
          <h1 className="text-3xl font-semibold tracking-wide mt-6">Profile</h1>
          <img
            src={
              image?.name
                ? URL.createObjectURL(image)
                : image ||
                  `https://avatars.dicebear.com/api/initials/${user.username}.svg`
            }
            alt="profile"
            className="w-40 h-40 rounded-full mt-4 mb-3 border-2 border-gray-400"
            style={{ objectFit: "contain" }}
            onError={(e) => {
              e.target.src = `https://avatars.dicebear.com/api/initials/${user.username}.svg`;
            }}
          />
          <button
            className="bg-purple-600 text-white font-semibold px-8 py-2 rounded-lg mr-2"
            onClick={uploadImage}
          >
            Update Profile Image
          </button>
          <h3 className="font-medium text-gray-500 my-2">
            <b>Username:</b> {user.username}
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            <b>Email:</b> {user.attributes.email}
          </p>
          <button
            onClick={signOut}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Out
          </button>
        </Container>
      )}
    </Authenticator>
  );
}

export default Profile;
