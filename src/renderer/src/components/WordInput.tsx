import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from './hooks/use-toast'
import { Loader2 } from 'lucide-react'
import { Textarea } from './ui/textarea'

export const WordInput = () => {
  const [inputValue, setInputValue] = useState('')
  const [contextValue, setContextValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      await window.api.addWord(inputValue, contextValue ? contextValue : undefined)
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
              Translation with context
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="w-[500px] space-y-3 mt-5">
            <Input
              type="text"
              placeholder="Enter base word"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-grow"
            />
            <Textarea
              onChange={(e) => setContextValue(e.target.value)}
              placeholder="Enter context (optional)"
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
          </form>
        </div>
      </div>
    </section>
  )
}
