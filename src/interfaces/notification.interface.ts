export interface Notification {
    notification_id: string;
    tender: {
      tender_code: string;
      tender_name: string;
      tender_status: string;
      tender_status_new: string;
    };
    description: string;
    date: string;
    time: string;
    is_read: boolean;
  }