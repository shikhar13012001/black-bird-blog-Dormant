import { Avatar, AvatarsGroup } from "@mantine/core";
// get random avatar

const Demo = () => {
  const avatars = [
    "https://avatars.dicebear.com/api/bottts/shikhar.svg",
    "https://avatars.dicebear.com/api/bottts/Sanket.svg",
    "https://avatars.dicebear.com/api/bottts/suyash.svg",
    "https://avatars.dicebear.com/api/bottts/ayush.svg",
    "https://avatars.dicebear.com/api/bottts/sameer.svg",
    "https://avatars.dicebear.com/api/bottts/ketan.svg",
  ];
  return (
    <AvatarsGroup limit={3} sx={{ display: "flex", justifyContent: "center" }}>
      {avatars.map((item, index) => (
        <Avatar src={item} component="a" key={index} />
      ))}
    </AvatarsGroup>
  );
};

export default Demo;
