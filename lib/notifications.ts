type NotificationsType = 'AUTH' | 'BOARD' | 'COLUMN' | 'TASK' | 'INVITE';
type Notifications = Record<NotificationsType, Record<string, string>>;
export const notifs = {
  AUTH: {
    REQUIRED: 'Authentication required',
  },
  BOARD: {
    CREATE_SUCCESS: 'Board created',
    CREATE_FAIL: 'Failed to create board',
  },
  COLUMN: {
    CREATE_SUCCESS: 'Column created',
    CREATE_FAIL: 'Failed to create column',
  },
  TASK: {},
  INVITE: {},
} satisfies Notifications;
