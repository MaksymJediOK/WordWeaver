import React, { useState } from 'react'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '../../hooks/use-toast'
import { Textarea } from '../../ui/textarea'
import { useForm } from 'react-hook-form'
import { AddSingleWordSchema } from './schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../../ui/form'

const AddWordTo = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof AddSingleWordSchema>>({
    resolver: zodResolver(AddSingleWordSchema),
    defaultValues: {
      wordInput: ''
    }
  })

  const onSubmit = async ({ wordInput, context }: z.infer<typeof AddSingleWordSchema>) => {
    try {
      setIsLoading(true)
      await window.api.addWord(wordInput, context)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
      toast({
        title: 'Word was successfully added'
      })
      form.reset()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pb-4">
        <FormField
          control={form.control}
          name="wordInput"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="ml-1">Word</FormLabel>
              <FormControl>
                <Input placeholder="Enter a word" {...field} />
              </FormControl>
              <FormDescription className="ml-1">Word that will be auto translated.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="context"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Context (optional)" {...field} />
              </FormControl>
              <FormDescription className="ml-1">
                Context is optional, but will help with quality of translation
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
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
    </Form>
  )
}

export { AddWordTo }
