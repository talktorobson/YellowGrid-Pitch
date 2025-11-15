/**
 * YellowGrid Shared State Management System
 * Synchronizes state across Operator Cockpit, Crew Mobile App, and Customer Portal
 */

class YellowGridState {
  constructor() {
    this.storageKey = 'yellowgrid_state';
    this.init();
  }

  init() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      this.state = JSON.parse(stored);
    } else {
      this.state = this.getDefaultState();
      this.save();
    }
  }

  getDefaultState() {
    return {
      services: {
        'SX-375742': {
          id: 'SX-375742',
          type: 'Air Conditioning Installation',
          status: 'in_progress',
          customer: {
            name: 'Maria Santos',
            phone: '+351 912 345 678',
            email: 'maria.santos@email.com',
            address: 'Rua das Flores 45, Lisboa'
          },
          technician: {
            id: 'PRO-1547',
            name: 'João Ferreira',
            phone: '+351 918 765 432',
            rating: 4.9
          },
          schedule: {
            date: new Date().toISOString().split('T')[0],
            startTime: '14:00',
            endTime: '17:00',
            estimatedHours: 3
          },
          pricing: {
            amount: 850.00,
            paid: true,
            paymentMethod: 'Visa •••• 4532'
          },
          progress: 60,
          checklist: [
            { id: 1, text: 'Verify customer identity and service order', completed: true },
            { id: 2, text: 'Inspect installation location', completed: true },
            { id: 3, text: 'Take before photos', completed: true },
            { id: 4, text: 'Install mounting bracket', completed: true },
            { id: 5, text: 'Install indoor unit', completed: true },
            { id: 6, text: 'Connect refrigerant lines', completed: false },
            { id: 7, text: 'Test system operation', completed: false },
            { id: 8, text: 'Customer walkthrough and sign-off', completed: false }
          ],
          photos: [
            { id: 1, type: 'before', label: 'Before - Location', url: 'placeholder' },
            { id: 2, type: 'progress', label: 'Bracket Installed', url: 'placeholder' },
            { id: 3, type: 'progress', label: 'Unit Mounted', url: 'placeholder' }
          ],
          notes: [],
          messages: [
            {
              id: 1,
              from: 'João Ferreira',
              fromType: 'technician',
              to: 'Maria Santos',
              toType: 'customer',
              subject: 'Installation Update',
              body: "Hi Maria, I've mounted the unit successfully. Now testing the system. Should be done in 30 minutes.",
              timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
              read: false
            }
          ],
          wcf: null,
          createdAt: new Date(Date.now() - 90 * 60 * 1000).toISOString()
        },
        'PX-377903': {
          id: 'PX-377903',
          type: 'Bathroom Renovation - Tiling',
          status: 'scheduled',
          customer: {
            name: 'Ines Broncano',
            phone: '+351 915 234 567',
            email: 'ines.b@email.com',
            address: 'Av. da República 123, Porto'
          },
          technician: null,
          schedule: {
            date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            startTime: '09:00',
            endTime: '13:00',
            estimatedHours: 4
          },
          pricing: {
            amount: 1200.00,
            paid: false,
            paymentMethod: null
          },
          progress: 0,
          checklist: [],
          photos: [],
          notes: [],
          messages: [],
          wcf: null,
          contractSigned: false,
          createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
        },
        'PX-377905': {
          id: 'PX-377905',
          type: 'Plumbing Repair - Kitchen Sink',
          status: 'scheduled',
          customer: {
            name: 'João Silva',
            phone: '+351 913 456 789',
            email: 'j.silva@email.com',
            address: 'Rua do Comércio 78, Braga'
          },
          technician: null,
          schedule: {
            date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            startTime: '09:00',
            endTime: '11:00',
            estimatedHours: 2
          },
          pricing: {
            amount: 60.00,
            paid: false,
            paymentMethod: null
          },
          progress: 0,
          checklist: [],
          photos: [],
          notes: [],
          messages: [],
          wcf: null,
          contractSigned: true,
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        }
      },
      notifications: [],
      technicians: {
        'PRO-1547': {
          id: 'PRO-1547',
          name: 'João Ferreira',
          phone: '+351 918 765 432',
          rating: 4.9,
          skills: ['AC Installation', 'Electrical', 'Plumbing'],
          activeJobs: ['SX-375742'],
          availability: 'on_duty'
        },
        'PRO-1823': {
          id: 'PRO-1823',
          name: 'Carlos Mendes',
          phone: '+351 917 654 321',
          rating: 4.8,
          skills: ['Bathroom', 'Tiling', 'Plumbing'],
          activeJobs: [],
          availability: 'available'
        },
        'PRO-2156': {
          id: 'PRO-2156',
          name: 'Ana Costa',
          phone: '+351 916 543 210',
          rating: 5.0,
          skills: ['Plumbing', 'Heating', 'General'],
          activeJobs: [],
          availability: 'available'
        }
      },
      currentUser: {
        type: 'operator', // or 'crew' or 'customer'
        id: null
      }
    };
  }

  save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    // Trigger storage event for cross-tab synchronization
    window.dispatchEvent(new Event('yellowgrid-state-changed'));
  }

  // Service Operations
  getService(serviceId) {
    return this.state.services[serviceId];
  }

  getAllServices() {
    return Object.values(this.state.services);
  }

  updateService(serviceId, updates) {
    if (this.state.services[serviceId]) {
      this.state.services[serviceId] = {
        ...this.state.services[serviceId],
        ...updates
      };
      this.save();
      return true;
    }
    return false;
  }

  updateServiceStatus(serviceId, status) {
    return this.updateService(serviceId, { status });
  }

  updateServiceProgress(serviceId, progress) {
    return this.updateService(serviceId, { progress });
  }

  // Technician Assignment
  assignTechnician(serviceId, technicianId) {
    const technician = this.state.technicians[technicianId];
    if (!technician) return false;

    this.updateService(serviceId, { technician });
    technician.activeJobs.push(serviceId);

    this.addNotification({
      type: 'assignment',
      serviceId,
      technicianId,
      message: `${technician.name} assigned to ${serviceId}`
    });

    this.save();
    return true;
  }

  unassignTechnician(serviceId) {
    const service = this.getService(serviceId);
    if (!service || !service.technician) return false;

    const techId = service.technician.id;
    const tech = this.state.technicians[techId];
    if (tech) {
      tech.activeJobs = tech.activeJobs.filter(id => id !== serviceId);
    }

    this.updateService(serviceId, { technician: null });
    return true;
  }

  // Scheduling
  rescheduleService(serviceId, newSchedule) {
    const service = this.getService(serviceId);
    if (!service) return false;

    this.updateService(serviceId, {
      schedule: { ...service.schedule, ...newSchedule }
    });

    this.addNotification({
      type: 'reschedule',
      serviceId,
      message: `Service ${serviceId} rescheduled to ${newSchedule.date} at ${newSchedule.startTime}`
    });

    return true;
  }

  // Checklist Management
  toggleChecklistItem(serviceId, itemId) {
    const service = this.getService(serviceId);
    if (!service) return false;

    const item = service.checklist.find(i => i.id === itemId);
    if (!item) return false;

    item.completed = !item.completed;

    // Update progress based on checklist completion
    const completed = service.checklist.filter(i => i.completed).length;
    const total = service.checklist.length;
    const progress = Math.round((completed / total) * 100);

    this.updateService(serviceId, {
      checklist: service.checklist,
      progress
    });

    return true;
  }

  // Photo Management
  addPhoto(serviceId, photo) {
    const service = this.getService(serviceId);
    if (!service) return false;

    const newPhoto = {
      id: service.photos.length + 1,
      ...photo,
      timestamp: new Date().toISOString()
    };

    service.photos.push(newPhoto);
    this.updateService(serviceId, { photos: service.photos });

    this.addNotification({
      type: 'photo',
      serviceId,
      message: `New photo added to ${serviceId}: ${photo.label}`
    });

    return true;
  }

  // Notes Management
  addNote(serviceId, note) {
    const service = this.getService(serviceId);
    if (!service) return false;

    const newNote = {
      id: service.notes.length + 1,
      text: note,
      timestamp: new Date().toISOString(),
      author: this.state.currentUser
    };

    service.notes.push(newNote);
    this.updateService(serviceId, { notes: service.notes });
    return true;
  }

  // Messages
  addMessage(serviceId, message) {
    const service = this.getService(serviceId);
    if (!service) return false;

    const newMessage = {
      id: service.messages.length + 1,
      ...message,
      timestamp: new Date().toISOString(),
      read: false
    };

    service.messages.push(newMessage);
    this.updateService(serviceId, { messages: service.messages });

    this.addNotification({
      type: 'message',
      serviceId,
      from: message.from,
      message: message.subject
    });

    return true;
  }

  markMessageRead(serviceId, messageId) {
    const service = this.getService(serviceId);
    if (!service) return false;

    const message = service.messages.find(m => m.id === messageId);
    if (message) {
      message.read = true;
      this.save();
      return true;
    }
    return false;
  }

  // Notifications
  addNotification(notification) {
    const newNotification = {
      id: this.state.notifications.length + 1,
      ...notification,
      timestamp: new Date().toISOString(),
      read: false
    };

    this.state.notifications.unshift(newNotification);
    // Keep only last 50 notifications
    if (this.state.notifications.length > 50) {
      this.state.notifications = this.state.notifications.slice(0, 50);
    }
    this.save();
  }

  getUnreadNotifications() {
    return this.state.notifications.filter(n => !n.read);
  }

  markNotificationRead(notificationId) {
    const notification = this.state.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      this.save();
      return true;
    }
    return false;
  }

  // WCF Management
  signWCF(serviceId, signature) {
    const service = this.getService(serviceId);
    if (!service) return false;

    this.updateService(serviceId, {
      wcf: {
        signed: true,
        signature,
        timestamp: new Date().toISOString(),
        quality: signature.quality || 'approved'
      },
      status: 'completed'
    });

    this.addNotification({
      type: 'wcf_signed',
      serviceId,
      message: `WCF signed for ${serviceId}`
    });

    return true;
  }

  // Contract Management
  signContract(serviceId) {
    return this.updateService(serviceId, {
      contractSigned: true,
      contractSignedAt: new Date().toISOString()
    });
  }

  // Payment Management
  processPayment(serviceId, paymentMethod) {
    return this.updateService(serviceId, {
      pricing: {
        ...this.getService(serviceId).pricing,
        paid: true,
        paymentMethod,
        paidAt: new Date().toISOString()
      }
    });
  }

  // Job Actions (Crew)
  acceptJob(serviceId, technicianId) {
    const service = this.getService(serviceId);
    if (!service || service.status !== 'scheduled') return false;

    this.updateService(serviceId, {
      status: 'accepted',
      acceptedAt: new Date().toISOString()
    });

    this.addNotification({
      type: 'job_accepted',
      serviceId,
      technicianId,
      message: `Job ${serviceId} accepted`
    });

    return true;
  }

  rejectJob(serviceId, technicianId, reason) {
    const service = this.getService(serviceId);
    if (!service) return false;

    this.unassignTechnician(serviceId);
    this.updateService(serviceId, {
      status: 'unassigned',
      rejectionReason: reason,
      rejectedAt: new Date().toISOString()
    });

    this.addNotification({
      type: 'job_rejected',
      serviceId,
      technicianId,
      message: `Job ${serviceId} rejected: ${reason}`
    });

    return true;
  }

  checkIn(serviceId) {
    return this.updateService(serviceId, {
      status: 'in_progress',
      checkedInAt: new Date().toISOString()
    });
  }

  checkOut(serviceId) {
    return this.updateService(serviceId, {
      status: 'awaiting_wcf',
      checkedOutAt: new Date().toISOString()
    });
  }

  // Statistics
  getServicesByStatus(status) {
    return Object.values(this.state.services).filter(s => s.status === status);
  }

  getServicesForTechnician(technicianId) {
    return Object.values(this.state.services).filter(
      s => s.technician && s.technician.id === technicianId
    );
  }

  getServicesForCustomer(customerEmail) {
    return Object.values(this.state.services).filter(
      s => s.customer && s.customer.email === customerEmail
    );
  }

  // Available Technicians
  getAvailableTechnicians() {
    return Object.values(this.state.technicians).filter(
      t => t.availability === 'available' || t.activeJobs.length < 3
    );
  }

  // Reset to defaults
  reset() {
    this.state = this.getDefaultState();
    this.save();
  }

  // Export state for debugging
  export() {
    return JSON.stringify(this.state, null, 2);
  }
}

// Initialize global state instance
if (typeof window !== 'undefined') {
  window.YellowGridState = YellowGridState;
  window.ygState = new YellowGridState();

  // Listen for storage changes from other tabs
  window.addEventListener('storage', (e) => {
    if (e.key === 'yellowgrid_state') {
      window.ygState.init();
      window.dispatchEvent(new Event('yellowgrid-state-changed'));
    }
  });
}
