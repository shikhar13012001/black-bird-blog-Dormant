import { SpeakerphoneIcon, XIcon } from "@heroicons/react/outline";
import { Typography } from "@mui/material";

export default function Example() {
  return (
    <div className="bg-indigo-600">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center justify-center">
            <span className="flex p-2 rounded-lg bg-indigo-800">
              <SpeakerphoneIcon
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </span>
            <p className="ml-3 font-medium text-white truncate text-center">
              <span className="md:hidden"></span>
              <Typography
                variant="caption"
                fontSize={{
                  lg: "1rem",
                  md: "1rem",
                  sm: "0.875rem",
                  xs: "0.75rem",
                }}
                className="text-white"
              >
                {" "}
                This is a new project to learn Next js and AWS, please judge
                lightly :)
              </Typography>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
