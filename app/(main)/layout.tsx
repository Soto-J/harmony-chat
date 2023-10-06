import NavigationSidebar from "@/components/navigation/navigation-sidebar";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = async ({ children }: MainLayoutProps) => {
  return (
    <div className="h-full">
      <div
        className="
          hidden
          md:fixed
          md:inset-y-0
          md:z-30
          md:flex
          md:h-full
          md:w-[72px]
          md:flex-col
        "
      >
        <NavigationSidebar />
      </div>

      <main className="h-full md:pl-[72px]">{children}</main>
    </div>
  );
};

export default MainLayout;
