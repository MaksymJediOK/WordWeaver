import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from './hooks/use-toast'
import { Loader2 } from 'lucide-react'

export const WordInput = () => {
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted:', inputValue)
    try {
      setIsLoading(true)
      await window.api.addWord(inputValue)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
      toast({
        title: 'Word was successfully added'
      })
    }
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-3">
              Stay Updated
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="text"
                placeholder="Enter your email"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading
                  </>
                ) : (
                  'Add'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
