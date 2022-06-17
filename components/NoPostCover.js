import React from "react";
import Link from "next/link";
const NoPostCover = () => {
  return (
    <section className="max-w-lg px-4 py-12 mx-auto">
      <img
        className="mx-auto sm:w-1/4"
        src="https://kutty.netlify.app/empty.png"
      />
      <h2 className="mt-2 text-lg font-medium text-center text-gray-800">
        This is where you’ll manage your Posts
      </h2>
      <p className="mt-1 text-center text-gray-600">
        All the post that you create will apear here and you can edit, delete or
        view them.
      </p>
      <Link href="/create-post">
        <div className="flex flex-col items-center justify-center mt-4 space-y-1 md:flex-row md:space-y-0 md:space-x-1">
          <a href="#" className="w-full md:w-auto btn btn-primary">
            Create Post
          </a>
        </div>
      </Link>
    </section>
  );
};

export default NoPostCover;
