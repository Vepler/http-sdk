import { autocompleteLocation } from './routes/autocomplete-location';
import { autocompleteAddress } from './routes/autocomplete-address';
import { addressLookup } from './routes/address-lookup';

// Re-export types if needed
// export { ... };

export default {
  autocomplete: autocompleteLocation,
  autocompleteAddress: autocompleteAddress,
  lookup: addressLookup,
};
