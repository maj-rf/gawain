type NotificationsType = 'AUTH' | 'BOARD' | 'COLUMN' | 'TASK' | 'INVITE';
type Notifications = Record<NotificationsType, Record<string, string>>;
export const notifs = {
  AUTH: {
    REQUIRED: 'Authentication required',
  },
  BOARD: {
    CREATE_SUCCESS: 'Board created',
    CREATE_FAIL: 'Failed to create board',
    MIN_TITLE_LENGTH: 'Title must be at least 3 characters long',
  },
  COLUMN: {
    CREATE_SUCCESS: 'Column created',
    CREATE_FAIL: 'Failed to create column',
    MIN_TITLE_LENGTH: 'Title must be at least 3 characters long',
  },
  TASK: {},
  INVITE: {},
} satisfies Notifications;
