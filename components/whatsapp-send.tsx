'use client'

import * as React from 'react'
import { MessageCircle, Send, Paperclip, Image, FileText, X, Phone } from 'lucide-react'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { Textarea } from '@components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select'
import { Badge } from '@components/ui/badge'
import { toast } from 'sonner'
import { useLang } from '@contexts/lang-context'
import { DEMO_EMPLOYEES } from '@contexts/auth-context'

interface Props {
  open: boolean
  onClose: () => void
  /** Pre-fill recipient phone */
  defaultPhone?: string
  /** Pre-fill recipient name */
  defaultName?: string
}

export function WhatsAppSend({ open, onClose, defaultPhone = '', defaultName = '' }: Props) {
  const { isAr } = useLang()
  const [phone, setPhone] = React.useState(defaultPhone)
  const [message, setMessage] = React.useState('')
  const [recipient, setRecipient] = React.useState(defaultName)

  const handleSend = () => {
    if (!phone) {
      toast.error(isAr ? 'رقم الهاتف مطلوب' : 'Phone number is required')
      return
    }
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
    toast.success(isAr ? 'تم الفتح في واتساب' : 'Opened in WhatsApp')
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <MessageCircle className="h-5 w-5 inline mr-2 text-green-600" />
            {isAr ? 'إرسال رسالة واتساب' : 'Send WhatsApp Message'}
          </DialogTitle>
          <DialogDescription>
            {isAr ? 'اختر موظف أو أدخل الرقم والرسالة' : 'Select employee or enter number and message'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Select Employee */}
          <div className="grid gap-2">
            <Label>{isAr ? 'اختر موظف' : 'Select Employee'}</Label>
            <Select onValueChange={(val) => {
              const emp = DEMO_EMPLOYEES.find((e) => e.id === val)
              if (emp) {
                setPhone(emp.phone)
                setRecipient(emp.name)
              }
            }}>
              <SelectTrigger>
                <SelectValue placeholder={isAr ? 'اختر...' : 'Select...'} />
              </SelectTrigger>
              <SelectContent>
                {DEMO_EMPLOYEES.map((emp) => (
                  <SelectItem key={emp.id} value={emp.id}>
                    {emp.name} - {emp.role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Phone Input */}
          <div className="grid gap-2">
            <Label htmlFor="phone">
              <Phone className="h-4 w-4 inline mr-1" />
              {isAr ? 'رقم الهاتف' : 'Phone Number'}
            </Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+2010..."
            />
          </div>

          {/* Recipient Name */}
          <div className="grid gap-2">
            <Label htmlFor="recipient">
              {isAr ? 'اسم المستلم' : 'Recipient Name'}
            </Label>
            <Input
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder={isAr ? 'الاسم' : 'Name'}
            />
          </div>

          {/* Message */}
          <div className="grid gap-2">
            <Label htmlFor="message">
              <MessageCircle className="h-4 w-4 inline mr-1" />
              {isAr ? 'الرسالة' : 'Message'}
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={isAr ? 'اكتب رسالتك...' : 'Type your message...'}
              rows={4}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            {isAr ? 'إلغاء' : 'Cancel'}
          </Button>
          <Button
            onClick={handleSend}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Send className="h-4 w-4 mr-2" />
            {isAr ? 'إرسال' : 'Send'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
