import { MoveDownLeft, MoveUpRight } from 'lucide-react';

const statsItems = [
  { title: 'Monthly active users', metric: '100000', delta: '10', type: 'unit' },
  { title: 'Daily active users', metric: '10000', delta: '-5', type: 'unit' },
  { title: 'Monthly recurring revenue', metric: '100000', delta: '20', type: 'currency' },
  { title: 'Cost per acquisition', metric: '100', delta: '-10', type: 'currency' },
];

export const Stats = () => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-left font-regular text-xl tracking-tighter md:text-5xl lg:max-w-xl">
              Real Results, Real Impact
            </h2>
            <p className="text-left text-lg text-muted-foreground leading-relaxed tracking-tight lg:max-w-sm">
              Join thousands of businesses that have transformed their operations with our platform.
              Our solutions have helped companies reduce administrative overhead by 60% and increase
              trading efficiency by 45% on average.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="grid w-full grid-cols-1 gap-2 text-left sm:grid-cols-2 lg:grid-cols-2">
            {statsItems.map((item, index) => (
              <div
                className="flex flex-col justify-between gap-0 rounded-md border p-6"
                key={index}
              >
                {Number.parseFloat(item.delta) > 0 ? (
                  <MoveUpRight className="mb-10 h-4 w-4 text-primary" />
                ) : (
                  <MoveDownLeft className="mb-10 h-4 w-4 text-destructive" />
                )}

                <h2 className="flex max-w-xl flex-row items-end gap-4 text-left font-regular text-4xl tracking-tighter">
                  {item.type === 'currency' && '$'}
                  {new Intl.NumberFormat().format(Number.parseFloat(item.metric))}
                  <span className="text-muted-foreground text-sm tracking-normal">
                    {Number.parseFloat(item.delta) > 0 ? '+' : ''}
                    {item.delta}%
                  </span>
                </h2>

                <p className="max-w-xl text-left text-base text-muted-foreground leading-relaxed tracking-tight">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
