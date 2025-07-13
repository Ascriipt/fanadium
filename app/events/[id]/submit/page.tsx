'use client'

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Upload, ArrowLeft, CheckCircle } from "lucide-react"
import { 
  getEvents, 
  addSubmission, 
  initializeStorage,
  type Event 
} from "@/lib/storage"
import Link from "next/link"
import Image from "next/image"

export default function SubmitDesignPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = parseInt(params?.id as string)
  
  const [event, setEvent] = useState<Event | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    creator: '',
    title: '',
    description: '',
    image: ''
  })
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [imagePreview, setImagePreview] = useState<string>('')

  // Initialize storage and load event data
  useEffect(() => {
    initializeStorage()
    const events = getEvents()
    const currentEvent = events.find(e => e.id === eventId)
    if (currentEvent) {
      setEvent(currentEvent)
    }
  }, [eventId])

  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  // Handle image file upload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, image: 'Please select a valid image file' }))
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size must be less than 5MB' }))
        return
      }

      // Create preview immediately
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      // Upload file to server
      setIsUploading(true)
      setErrors(prev => ({ ...prev, image: '' }))

      try {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        const result = await response.json()

        if (response.ok) {
          setUploadedImageUrl(result.url)
          setFormData(prev => ({ ...prev, image: result.url }))
        } else {
          setErrors(prev => ({ ...prev, image: result.error || 'Failed to upload image' }))
          setImagePreview('')
        }
      } catch (error) {
        console.error('Upload error:', error)
        setErrors(prev => ({ ...prev, image: 'Failed to upload image. Please try again.' }))
        setImagePreview('')
      } finally {
        setIsUploading(false)
      }
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.creator.trim()) {
      newErrors.creator = 'Creator name is required'
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Design title is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters'
    }

    if (!formData.image || !uploadedImageUrl) {
      newErrors.image = 'Please upload an image'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Add submission to storage
      addSubmission(eventId, {
        creator: formData.creator,
        title: formData.title,
        description: formData.description,
        image: formData.image,
        date: new Date().toISOString().split('T')[0]
      })

      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting design:', error)
      setErrors(prev => ({ ...prev, submit: 'Failed to submit design. Please try again.' }))
    } finally {
      setIsSubmitting(false)
    }
  }

  // Check if event is still accepting submissions
  const isSubmissionOpen = () => {
    if (!event) return false
    
    const eventDate = new Date(`${event.date}T${event.time.replace(' UTC', 'Z')}`)
    const now = new Date()
    return eventDate.getTime() > now.getTime()
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-white">Event not found</h1>
        </div>
      </div>
    )
  }

  if (!isSubmissionOpen()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="bg-black/20 border-red-500/20">
            <CardContent className="p-8 text-center">
              <div className="text-red-400 text-6xl mb-4">⏰</div>
              <h1 className="text-2xl font-bold text-white mb-4">Submissions Closed</h1>
              <p className="text-gray-400 mb-6">
                The submission period for this event has ended. The event has already started or finished.
              </p>
              <Link href={`/events/${eventId}`}>
                <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                  Back to Event
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="bg-black/20 border-green-500/20">
            <CardContent className="p-8 text-center">
              <div className="text-green-400 text-6xl mb-4">✅</div>
              <h1 className="text-2xl font-bold text-white mb-4">Design Submitted Successfully!</h1>
              <p className="text-gray-400 mb-6">
                Your design "{formData.title}" has been submitted for the {event.title} event. 
                It will be available for voting once approved.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href={`/events/${eventId}`}>
                  <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                    Back to Event
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-600/10"
                  onClick={() => {
                    setIsSubmitted(false)
                    setFormData({ creator: '', title: '', description: '', image: '' })
                    setImagePreview('')
                    setUploadedImageUrl('')
                  }}
                >
                  Submit Another Design
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/events/${eventId}`}>
            <Button variant="ghost" className="text-purple-300 hover:text-purple-200 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Event
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Submit Your Design</h1>
          <p className="text-gray-400">Create and submit your NFT design for the {event.title} event</p>
        </div>

        {/* Event Info Card */}
        <Card className="bg-black/20 border-purple-500/20 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Image
                src={event.image}
                alt={event.title}
                width={80}
                height={80}
                className="rounded-lg object-cover"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white mb-2">{event.title}</h2>
                <div className="flex items-center gap-4 text-gray-400 text-sm mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </div>
                </div>
                <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                  {event.sport}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submission Form */}
        <Card className="bg-black/20 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">Design Submission Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Creator Name */}
              <div>
                <Label htmlFor="creator" className="text-white">Creator Name *</Label>
                <Input
                  id="creator"
                  value={formData.creator}
                  onChange={(e) => handleInputChange('creator', e.target.value)}
                  placeholder="Enter your name or artist handle"
                  className="bg-black/40 border-purple-500/30 text-white placeholder:text-gray-500"
                />
                {errors.creator && (
                  <p className="text-red-400 text-sm mt-1">{errors.creator}</p>
                )}
              </div>

              {/* Design Title */}
              <div>
                <Label htmlFor="title" className="text-white">Design Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Give your design a compelling title"
                  className="bg-black/40 border-purple-500/30 text-white placeholder:text-gray-500"
                />
                {errors.title && (
                  <p className="text-red-400 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-white">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your design, inspiration, and what makes it special..."
                  rows={4}
                  className="bg-black/40 border-purple-500/30 text-white placeholder:text-gray-500"
                />
                {errors.description && (
                  <p className="text-red-400 text-sm mt-1">{errors.description}</p>
                )}
                <p className="text-gray-500 text-sm mt-1">
                  Minimum 20 characters. Current: {formData.description.length}
                </p>
              </div>

              {/* Image Upload */}
              <div>
                <Label htmlFor="image" className="text-white">Design Image *</Label>
                <div className="mt-2">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Label
                    htmlFor="image"
                    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-purple-500/30 rounded-lg bg-black/40 text-purple-300 hover:bg-purple-600/10 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    Choose Image
                  </Label>
                  <p className="text-gray-500 text-sm mt-1">
                    Accepted formats: JPG, PNG, GIF. Max size: 5MB
                  </p>
                </div>
                {errors.image && (
                  <p className="text-red-400 text-sm mt-1">{errors.image}</p>
                )}
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div>
                  <Label className="text-white">Preview</Label>
                  <div className="mt-2">
                    {isUploading ? (
                      <div className="flex items-center justify-center w-[300px] h-[200px] bg-black/40 border border-purple-500/30 rounded-lg">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto mb-2"></div>
                          <p className="text-purple-300 text-sm">Uploading...</p>
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={uploadedImageUrl || imagePreview}
                        alt="Design preview"
                        width={300}
                        height={200}
                        className="rounded-lg object-cover border border-purple-500/30"
                      />
                    )}
                  </div>
                  {uploadedImageUrl && (
                    <p className="text-green-400 text-sm mt-1">✓ Image uploaded successfully</p>
                  )}
                </div>
              )}

              {/* Submit Error */}
              {errors.submit && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-400">{errors.submit}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || isUploading}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Uploading Image...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Submit Design
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
