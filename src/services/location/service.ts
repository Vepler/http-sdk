import { autocompleteLocation } from './routes/autocomplete-location';
import { autocompleteStreet } from './routes/autocomplete-street';

// Re-export types if needed
// export { ... };

export default {
  autocomplete: autocompleteLocation,
  autocompleteStreet: autocompleteStreet,
};
