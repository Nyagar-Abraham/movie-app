import ImageComponent from "@/components/home/ImageComponent";
import BackButton from "@/components/shared/BackButton";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";

import Vote from "@/components/shared/Vote";
import ShowsDetailsCard from "@/components/shows/ShowsDetailsCard";
import { getMovieById } from "@/lib/actions/PreShows.action";
import { getMongoShow } from "@/lib/actions/show.action";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import { formatDate } from "@/lib/utils";
import { getShows } from "@/utils/api";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

export const revalidate = 0;
export async function generateMetadata({ params }: any) {
  const movie =
    (await getShows({ target: "movieDetails", show_id: params.id })) || {};
  return { title: `${movie.title} ` };
}

const page = async ({ params, searchParams }: any) => {
  const { userId } = auth();
  const movieId = params.id;

  if (!userId) return null;

  const [user, movie, mongoMovie] = await Promise.all([
    getUserByClerkId({ clerkId: userId! }),
    getShows({ target: "movieDetails", show_id: movieId }),
    getMongoShow({ category: "movie", show_id: movieId.toString() }),
  ]);

  // console.log({ movie });
  // console.log({ user });

  return (
    <section className="min-h-svh relative border border-transparent ">
      <ImageComponent show={movie} image="backdrop" />
      <div className="absolute inset-x-0 top-0 h-[5rem] bg-gradient-to-b from-black to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-7/12 bg-gradient-to-l from-black/50 via-black/50  to-transparent pointer-events-none" />

      <MaxWidthWrapper className="relative z-30 p-6  mt-[8rem] grid md:grid-cols-2 gap-8 ">
        <BackButton className="!w-[8rem]" />
        <div className="ml-auto lg:max-w-[30rem] md:max-w-[20rem]">
          <ShowsDetailsCard
            mongoShow={mongoMovie}
            show={movie}
            category="movie"
          />
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
