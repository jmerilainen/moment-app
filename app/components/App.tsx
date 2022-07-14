import type { ReactNode } from "react";

export default function App({ children }: {children: ReactNode}) {
    return (
      <div className="flex min-h-screen dark:bg-slate-800 dark:text-slate-200">
        <div className="flex flex-col w-full">
          <section className="p-8 lg:p-16 grow">
            <div className="container h-full mx-auto">
              {children}
            </div>
          </section>
          <footer className="p-8 text-right">
            Moment
          </footer>
        </div>
      </div>
    );
  }
