type NotificationsType = 'AUTH' | 'BOARD' | 'COLUMN' | 'CARD' | 'INVITE' | 'COMMON';
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
    REORDER_SUCCESS: 'Changed Column order',
    REORDER_FAIL: 'Failed to reorder columns',
  },
  CARD: {
    CREATE_SUCCESS: 'Card created',
    CREATE_FAIL: 'Failed to create card',
    DELETE_SUCCESS: 'Card deleted',
    DELETE_FAIL: 'Failed to delete card',
    EDIT_SUCCESS: 'Card updated',
    EDIT_FAIL: 'Failed to update card',
  },
  COMMON: {
    MIN_TITLE_LENGTH: 'Title must be at least 3 characters long',
  },
  INVITE: {},
} satisfies Notifications;
