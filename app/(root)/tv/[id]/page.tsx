import ImageComponent from "@/components/home/ImageComponent";
import BackButton from "@/components/shared/BackButton";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import ShowsDetailsCard from "@/components/shows/ShowsDetailsCard";
import Videos from "@/components/shows/Videos";
import { getMongoShow } from "@/lib/actions/show.action";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import { getShows } from "@/utils/api";
import { auth } from "@clerk/nextjs/server";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const series = await getShows({ target: "tvDetails", show_id: params.id });
  return { title: `${series.name} ` };
}

const page = async ({ params }: any) => {
  const { userId } = auth();
  const tvId = params.id;

  if (!userId) return null;

  const [user, series, mongoSeries] = await Promise.all([
    getUserByClerkId({ clerkId: userId! }),
    getShows({ target: "tvDetails", show_id: tvId! }),
    getMongoShow({ category: "tv", show_id: tvId.toString() }),
  ]);

  return (
    <section className="min-h-svh relative border border-transparent ">
      <ImageComponent show={series} image="backdrop" />
      <div className="absolute inset-x-0 top-0 h-[5rem] bg-gradient-to-b from-black to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-7/12 bg-gradient-to-l from-black/50 via-black/50  to-transparent pointer-events-none" />

      <MaxWidthWrapper className="relative z-30 p-6  mt-[8rem]  grid md:grid-cols-2 gap-8 ">
        <div className="ml-auto lg:max-w-[30rem] md:max-w-[20rem]">
          <ShowsDetailsCard
            // @ts-ignore
            mongoShow={mongoSeries}
            show={series}
            category="tv"
          />
        </div>
        <div className="flex overflow-hidden  flex-col justify-between items-start">
          <BackButton className="!w-[8rem] mb-2" />
          <Videos videos={series?.videos?.results?.slice(0, 5)} />
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
