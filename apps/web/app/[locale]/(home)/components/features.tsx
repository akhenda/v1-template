import { User } from 'lucide-react';

export const Features = () => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="max-w-xl text-left font-regular text-3xl tracking-tighter md:text-5xl">
              Powerful Tools for Modern Business
            </h2>
            <p className="max-w-xl text-left text-lg text-muted-foreground leading-relaxed tracking-tight lg:max-w-lg">
              Discover how our cutting-edge features can revolutionize your daily operations.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex aspect-square h-full flex-col justify-between rounded-md bg-muted p-6 lg:col-span-2 lg:aspect-auto">
            <User className="h-8 w-8 stroke-1" />
            <div className="flex flex-col">
              <h3 className="text-xl tracking-tight">Streamlined Operations</h3>
              <p className="max-w-xs text-base text-muted-foreground">
                Our platform streamlines operations, reduces complexity, and helps small businesses
                thrive in the modern economy.
              </p>
            </div>
          </div>

          <div className="flex aspect-square flex-col justify-between rounded-md bg-muted p-6">
            <User className="h-8 w-8 stroke-1" />
            <div className="flex flex-col">
              <h3 className="text-xl tracking-tight">Real-Time Analytics</h3>
              <p className="max-w-xs text-base text-muted-foreground">
                Get instant insights into your business performance with comprehensive analytics and
                reporting tools.
              </p>
            </div>
          </div>

          <div className="flex aspect-square flex-col justify-between rounded-md bg-muted p-6">
            <User className="h-8 w-8 stroke-1" />
            <div className="flex flex-col">
              <h3 className="text-xl tracking-tight">Automated Workflows</h3>
              <p className="max-w-xs text-base text-muted-foreground">
                Save time and reduce errors with intelligent automation that handles repetitive
                tasks for you.
              </p>
            </div>
          </div>

          <div className="flex aspect-square h-full flex-col justify-between rounded-md bg-muted p-6 lg:col-span-2 lg:aspect-auto">
            <User className="h-8 w-8 stroke-1" />
            <div className="flex flex-col">
              <h3 className="text-xl tracking-tight">Secure Transactions</h3>
              <p className="max-w-xs text-base text-muted-foreground">
                Rest easy knowing your business operations are protected by enterprise-grade
                security and encryption.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
