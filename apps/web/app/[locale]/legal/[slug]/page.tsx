const LegalPage = () => {
  // const { slug } = await params;

  // return (
  //   <Feed queries={[legal.postQuery(slug)]}>
  //     {/* biome-ignore lint/suspicious/useAwait: "Server Actions must be async" */}
  //     {async ([data]) => {
  //       'use server';

  //       const page = data.legalPages.item;

  //       if (!page) {
  //         notFound();
  //       }

  //       return (
  //         <div className="container max-w-5xl py-16">
  //           <Link
  //             className="mb-4 inline-flex items-center gap-1 text-muted-foreground text-sm focus:underline focus:outline-none"
  //             href="/"
  //           >
  //             <ArrowLeftIcon className="h-4 w-4" />
  //             Back to Home
  //           </Link>
  //           <h1 className="scroll-m-20 text-balance font-extrabold text-4xl tracking-tight lg:text-5xl">
  //             {page._title}
  //           </h1>
  //           <p className="text-balance leading-7 [&:not(:first-child)]:mt-6">
  //             {page.description}
  //           </p>
  //           <div className="mt-16 flex flex-col items-start gap-8 sm:flex-row">
  //             <div className="sm:flex-1">
  //               <div className="prose prose-neutral dark:prose-invert">
  //                 <Body content={page.body.json.content} />
  //               </div>
  //             </div>
  //             <div className="sticky top-24 hidden shrink-0 md:block">
  //               <Sidebar
  //                 toc={<TableOfContents data={page.body.json.toc} />}
  //                 readingTime={`${page.body.readingTime} min read`}
  //                 date={new Date()}
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     }}
  //   </Feed>
  // );

  return null; // Placeholder for the actual implementation
};

export default LegalPage;
