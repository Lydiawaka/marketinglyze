"use client"

// Simple notification system as alternative to toast
export type NotificationType = "success" | "error" | "info" | "warning"

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message?: string
  duration?: number
}

class SimpleNotificationManager {
  private notifications: Notification[] = []
  private listeners: ((notifications: Notification[]) => void)[] = []

  subscribe(listener: (notifications: Notification[]) => void) {
    this.listeners.push(listener)
    return () => {
      const index = this.listeners.indexOf(listener)
      if (index > -1) {
        this.listeners.splice(index, 1)
      }
    }
  }

  private notify() {
    this.listeners.forEach((listener) => listener([...this.notifications]))
  }

  show(notification: Omit<Notification, "id">) {
    const id = Date.now().toString()
    const newNotification: Notification = {
      id,
      duration: 5000,
      ...notification,
    }

    this.notifications.push(newNotification)
    this.notify()

    // Auto remove after duration
    setTimeout(() => {
      this.remove(id)
    }, newNotification.duration)

    return id
  }

  remove(id: string) {
    this.notifications = this.notifications.filter((n) => n.id !== id)
    this.notify()
  }

  clear() {
    this.notifications = []
    this.notify()
  }

  // Convenience methods
  success(title: string, message?: string) {
    return this.show({ type: "success", title, message })
  }

  error(title: string, message?: string) {
    return this.show({ type: "error", title, message })
  }

  info(title: string, message?: string) {
    return this.show({ type: "info", title, message })
  }

  warning(title: string, message?: string) {
    return this.show({ type: "warning", title, message })
  }
}

export const notificationManager = new SimpleNotificationManager()

// Hook for React components
import { useState, useEffect } from "react"

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    return notificationManager.subscribe(setNotifications)
  }, [])

  return {
    notifications,
    show: notificationManager.show.bind(notificationManager),
    remove: notificationManager.remove.bind(notificationManager),
    clear: notificationManager.clear.bind(notificationManager),
    success: notificationManager.success.bind(notificationManager),
    error: notificationManager.error.bind(notificationManager),
    info: notificationManager.info.bind(notificationManager),
    warning: notificationManager.warning.bind(notificationManager),
  }
}
