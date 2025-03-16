import ImageComponent from "@/components/home/ImageComponent";
import BackButton from "@/components/shared/BackButton";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import ShowsDetailsCard from "@/components/shows/ShowsDetailsCard";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import { getShows } from "@/utils/api";
import { auth } from "@clerk/nextjs/server";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const series = await getShows({ target: "tvDetails", show_id: params.id });
  return { title: `${series.name} ` };
}

const page = async ({ params }: any) => {
  const { userId } = auth();

  if (!userId) return null;
  const user = await getUserByClerkId({ clerkId: userId! });

  const series = await getShows({ target: "tvDetails", show_id: params.id });

  return (
    <section className="min-h-svh relative border border-transparent ">
      <ImageComponent show={series} image="backdrop" />
      <div className="absolute inset-x-0 top-0 h-[5rem] bg-gradient-to-b from-black to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-7/12 bg-gradient-to-l from-black/50 via-black/50  to-transparent pointer-events-none" />

      <MaxWidthWrapper className="relative z-30 p-6  mt-[8rem] grid md:grid-cols-2 gap-8 ">
        <BackButton className="!w-[8rem]" />
        <div className="ml-auto lg:max-w-[30rem] md:max-w-[20rem]">
          <ShowsDetailsCard show={series} category="tv" />
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
