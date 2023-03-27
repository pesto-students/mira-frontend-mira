// Error
export const error = {
  PAGE_NOT_FOUND_ERROR: '404: Page not found',
  INTERNAL_SERVER_ERROR: '500: Internal server error',
  FORBIDDEN_ERROR: '403: Forbidden',
  UNAUTHORIZED_ERROR: '401: Unauthorized',
  VALIDATION_ERROR: 'Invalid input, please correct the fields',
  NETWORK_ERROR: 'Network error, please check your connection',
  TIMEOUT_ERROR: 'Request timed out, please try again',
  CONNECTION_ERROR: 'Connection error, please try again',
  DATABASE_ERROR: 'Error accessing database, please try again later',
  CONFIGURATION_ERROR: 'Error in application configuration',
} as const;

// Success
export const successMessages = {
  BOARD_CREATED: 'Board created successfully!',
  BOARD_UPDATED: 'Board updated successfully!',
  BOARD_DELETED: 'Board deleted successfully!',
  LIST_CREATED: 'List created successfully!',
  LIST_UPDATED: 'List updated successfully!',
  LIST_DELETED: 'List deleted successfully!',
  CARD_CREATED: 'Card created successfully!',
  CARD_UPDATED: 'Card updated successfully!',
  CARD_DELETED: 'Card deleted successfully!',
};
