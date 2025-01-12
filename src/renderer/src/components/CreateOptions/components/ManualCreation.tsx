import { useState } from 'react'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '../../hooks/use-toast'
import { Textarea } from '../../ui/textarea'
import { useForm } from 'react-hook-form'
import { ManualCreationSchema } from './schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form'

const ManualCreation = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof ManualCreationSchema>>({
    resolver: zodResolver(ManualCreationSchema),
    defaultValues: {
      originalWord: '',
      translatedWord: '',
      example: '',
      translatedExample: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof ManualCreationSchema>) => {
    try {
      setIsLoading(true)
      await window.api.createManually(values)
      setIsLoading(false)
      toast({
        title: 'Record was successfully created'
      })
      form.reset()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pb-4">
        <FormField
          control={form.control}
          name="originalWord"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="ml-1">Create record manually</FormLabel>
              <FormControl>
                <Input placeholder="Enter a word" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="translatedWord"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter desired translation" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="example"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Example usage" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="translatedExample"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Translated example" {...field} />
              </FormControl>
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

export { ManualCreation }
