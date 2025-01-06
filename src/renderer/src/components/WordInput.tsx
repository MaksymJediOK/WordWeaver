import { CreateOptions } from './CreateOptions/CreateOptions'

export const WordInput = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-3">
              Translation with context
            </h1>
          </div>
          <CreateOptions />
        </div>
      </div>
    </section>
  )
}
