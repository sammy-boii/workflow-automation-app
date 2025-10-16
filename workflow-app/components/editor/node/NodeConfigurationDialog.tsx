'use client'

import { NodeAction } from '@/types/node.types'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

const NodeConfigurationDialog = ({
  action,
  isOpen,
  setIsOpen
}: {
  action: NodeAction
  isOpen: boolean
  setIsOpen: React.Dispatch<boolean>
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{action.label}</DialogTitle>
          <DialogDescription>{action.description}</DialogDescription>
        </DialogHeader>

        <div className='mt-4'>
          <p>
            This is where you can configure or confirm the action{' '}
            <strong>{action.label}</strong>.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default NodeConfigurationDialog
