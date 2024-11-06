import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from './hooks/use-toast'

export const WordInput = () => {
  const [inputValue, setInputValue] = useState('')
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted:', inputValue)
    try {
      await window.api.addWord(inputValue)
    } catch (err) {
      console.error(err)
    } finally {
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
              <Button type="submit" className="w-full sm:w-auto">
                Add
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
