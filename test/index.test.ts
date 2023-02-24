import axios, { AxiosError } from 'axios';

import axiosTime, { AxiosTimeResponse } from '../src/index';

axiosTime(axios);

describe('axios time', () => {
  it('should have described timing properties correctly on success', async () => {
    const response = await axios.get<any, AxiosTimeResponse>(
      'https://httpstat.us/200'
    );
    expect(response.timings).toHaveProperty('timingEnd');
    expect(response.timings).toHaveProperty('timingStart');
    expect(response.timings).toHaveProperty('elapsedTime');
  });

  it('should have described timing properties correctly on error', async () => {
    try {
      await axios.get('https://httpstat.us/500');
    } catch (err: any) {
      const castedError = err as AxiosError;
      const castedResponse = castedError.response as AxiosTimeResponse;
      expect(castedResponse.timings).toHaveProperty('timingEnd');
      expect(castedResponse.timings).toHaveProperty('timingStart');
      expect(castedResponse.timings).toHaveProperty('elapsedTime');
    }
  });

  it('should not have response on client error', async () => {
    try {
      await axios.get('http://localhost:1');
    } catch (err: any) {
      const castedError = err as AxiosError;
      expect(castedError.response).toBeUndefined();
      expect(castedError.message).toContain('connect ECONNREFUSED');
    }
  });
});
