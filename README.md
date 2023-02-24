![npm](https://img.shields.io/npm/v/axios-time)


# :package: `@achmadk/axios-time`
Axios plugin to measure the actual time it takes for a request to complete. It has TypeScript and a native ES Module support compared to `axios-time`.

## :wrench: Installation
You can install this plugin using **NPM** or any other package manager
```bash
> npm i @achmadk/axios-time
```

## :bike: Basic Usage
The example below will add timing data to the request-response cycle.
```js
import axios from 'axios';
import axiosTime from 'axios-time';

axiosTime(axios);

try {
    const response = await axios.get('/user');
} catch(err) {
}
```

`response.timings` object example:

```json
{
  "timingEnd": 1599035291441,   // Timestamp of the start of the request (in Unix Epoch milliseconds).
  "timingStart": 1599035289182, // Timestamp when the response ended (in Unix Epoch milliseconds).
  "elapsedTime": 2259           // Duration of the entire request/response in milliseconds.
}
```

## License
[MIT](LICENSE)