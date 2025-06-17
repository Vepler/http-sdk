import { autocompleteLocation } from './routes/autocomplete-location';
import { autocompleteAddress } from './routes/autocomplete-address';

// Re-export types if needed
// export { ... };

export default {
  autocomplete: autocompleteLocation,
  autocompleteAddress: autocompleteAddress,
};
