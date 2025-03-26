import Heading from "@/components/home/heading";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import ShowCard from "@/components/shared/ShowCard";
import { getUserDashboardData } from "@/lib/actions/show.action";
import { auth } from "@clerk/nextjs/server";

export const metadata = {
  title: "dashboard",
};

const page = async ({ params }: any) => {
  const { userId } = auth();
  const { user, favorites, saved, searched } = await getUserDashboardData({
    user_id: userId!,
  });

  return (
    <div className=" mt-[3.9rem] mx-auto bg-dark100-light0 h-[calc(100vh+30rem)] hide-scrollbar">
      <MaxWidthWrapper className="pt-10 mx-auto  h-full !px-3 flex flex-col">
        <Heading className="capitalize text-3xl dark:text-white text-black mb-6">
          Welcome {user.username.split(" ")[0]}
        </Heading>

        <div className="mt-4 grid  max-md:max-w-screen  md:grid-cols-12 md:auto-rows-min gap-4 h-full ">
          {/* Liked Shows - Horizontal Scroll */}
          <div className="md:col-span-9">
            <Heading className="capitalize text-2xl mb-2">Liked Shows</Heading>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar flex-nowrap items-center w-full">
              {favorites.length > 0 ? (
                favorites
                  .reverse()
                  .map((favorite) => (
                    <ShowCard
                      showRating={false}
                      className="flex-none min-w-[20rem] shrink-0"
                      dbShow={JSON.stringify(favorite)}
                    />
                  ))
              ) : (
                <div className="flex   h-[24rem] items-center justify-center text-xl w-full font-semibold rounded-md bg-dark90-light10">
                  No Item
                </div>
              )}
            </div>
          </div>

          {/* Search History - Vertical Scroll */}
          <div className="md:col-span-3 md:row-span-2 flex flex-col ">
            <Heading className="capitalize text-2xl mb-2">
              Search History
            </Heading>
            <div className="flex md:flex-col flex-row  gap-3 overflow-y-auto hide-scrollbar h-full">
              {searched.length > 0 ? (
                searched
                  .reverse()
                  .map((search) => (
                    <ShowCard
                      showRating={false}
                      className="flex-none max-md:min-w-[20rem] !min-h-[15rem] shrink-0"
                      dbShow={JSON.stringify(search)}
                    />
                  ))
              ) : (
                <div className="flex flex-col  h-full items-center justify-center text-xl font-semibold rounded-md bg-dark90-light10">
                  No Item
                </div>
              )}
            </div>
          </div>

          {/* Bookmarked Shows - Scrollable */}
          <div className="md:col-span-9  w-full ">
            <Heading className="capitalize text-2xl mb-2">
              Bookmarked Shows
            </Heading>
            {saved.length > 0 ? (
              <div className="grid gap-2  overflow-y-auto hide-scrollbar md:grid-cols-2 lg:grid-cols-3 h-fit">
                {saved.reverse().map((save) => (
                  <ShowCard
                    showRating={false}
                    className="md:w-full"
                    dbShow={JSON.stringify(save)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex   h-[48rem] items-center justify-center text-xl font-semibold rounded-md bg-dark90-light10">
                No Item
              </div>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default page;
