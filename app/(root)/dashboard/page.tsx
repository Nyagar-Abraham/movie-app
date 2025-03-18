import Heading from "@/components/home/heading";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import ShowCard from "@/components/shared/ShowCard";
import { getUserDashboardData } from "@/lib/actions/show.action";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";

export async function generateMetadata({ params }: any) {
  const { userId } = auth();
  const { name } = await getUserById({ userId: userId! });
  return { title: `${name} Profile` };
}

const page = async ({ params }: any) => {
  const { userId } = auth();
  const { user, favorites, saved, searched } = await getUserDashboardData({
    user_id: userId!,
  });

  console.log({ user });
  console.log({ favorites });
  console.log({ saved });
  console.log({ searched });

  return (
    <div className="border-t border-dark-200 mt-[3.9rem] mx-auto bg-dark100-light0 h-[calc(100vh+30rem)] hide-scrollbar">
      <MaxWidthWrapper className="pt-10 mx-auto hide-scrollbar bg-dark90-light10 h-full !px-3 flex flex-col">
        <Heading className="capitalize text-2xl dark:text-white text-black">
          {user.username.split(" ")[0]}
        </Heading>

        <div className="mt-4 grid  md:grid-cols-12 md:auto-rows-min gap-4 h-full hide-scrollbar ">
          {/* Liked Shows - Horizontal Scroll */}
          <div className="md:col-span-9">
            <Heading className="capitalize text-2xl">Liked Shows</Heading>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar flex-nowrap items-center w-full">
              {favorites.length > 0 ? (
                favorites
                  .reverse()
                  .map((favorite) => (
                    <ShowCard
                      showRating={false}
                      className="flex-none min-w-[20rem] shrink-0"
                      dbShow={favorite}
                    />
                  ))
              ) : (
                <div></div>
              )}
            </div>
          </div>

          {/* Search History - Vertical Scroll */}
          <div className="md:col-span-3 md:row-span-2 flex flex-col ">
            <Heading className="capitalize text-2xl">Search History</Heading>
            <div className="flex md:flex-col flex-row  gap-3 overflow-y-auto hide-scrollbar h-full">
              {searched.length > 0 ? (
                searched
                  .reverse()
                  .map((search) => (
                    <ShowCard
                      showRating={false}
                      className="flex-none max-md:min-w-[20rem] !min-h-[15rem] shrink-0"
                      dbShow={search}
                    />
                  ))
              ) : (
                <div></div>
              )}
            </div>
          </div>

          {/* Bookmarked Shows - Scrollable */}
          <div className="md:col-span-9  w-full ">
            <Heading className="capitalize text-2xl">Bookmarked Shows</Heading>
            <div className="grid gap-2  overflow-y-auto hide-scrollbar md:grid-cols-2 lg:grid-cols-3 h-[50rem]">
              {saved.length > 0 ? (
                saved
                  .reverse()
                  .map((save) => (
                    <ShowCard
                      showRating={false}
                      className="md:w-full"
                      dbShow={save}
                    />
                  ))
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default page;
