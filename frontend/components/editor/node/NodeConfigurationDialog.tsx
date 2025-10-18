'use client'

import { NodeAction } from '@/types/node.types'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import NodeInputDialog from './NodeInputDialog'
import NodeOutputDialog from './NodeOutputDialog'
import z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/components/ui/field'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import {
  InputGroup,
  InputGroupTextarea,
  InputGroupAddon,
  InputGroupText
} from '@/components/ui/input-group'

const NodeConfigurationDialog = ({
  action,
  isOpen,
  setIsOpen
}: {
  action: NodeAction
  isOpen: boolean
  setIsOpen: React.Dispatch<boolean>
}) => {
  const formSchema = z.object({
    title: z
      .string()
      .min(5, 'Bug title must be at least 5 characters.')
      .max(32, 'Bug title must be at most 32 characters.'),
    description: z
      .string()
      .min(20, 'Description must be at least 20 characters.')
      .max(100, 'Description must be at most 100 characters.')
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: ''
    }
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast('You submitted the following values:', {
      description: (
        <pre className='bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4'>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: 'bottom-right',
      classNames: {
        content: 'flex flex-col gap-2'
      },
      style: {
        '--border-radius': 'calc(var(--radius)  + 4px)'
      } as React.CSSProperties
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTitle>Configuration Form </DialogTitle>
      <DialogContent className='min-w-[90vw] w-full h-[90vh] flex justify-between p-4'>
        <NodeInputDialog />
        <form
          className='config-form flex-1'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <Controller
              name='title'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='title'>Title</FieldLabel>
                  <Input
                    {...field}
                    id='title'
                    aria-invalid={fieldState.invalid}
                    placeholder='Login button not working on mobile'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name='description'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='description'>Description</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id='description'
                      placeholder="I'm having an issue with the login button on mobile."
                      rows={6}
                      className='min-h-24 resize-none'
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align='block-end'>
                      <InputGroupText className='tabular-nums'>
                        {field.value.length}/100 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>
                    Include steps to reproduce, expected behavior, and what
                    actually happened.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <NodeOutputDialog />
      </DialogContent>
    </Dialog>
  )
}

export default NodeConfigurationDialog
