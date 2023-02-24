import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import {
  AxiosTimeInternalRequestConfig,
  AxiosTimeResponse,
  DefaultTimingResponse,
} from './types';

export * from './types';

function calcElapsedTime(timingStart: number, timingEnd: number) {
  return Math.round(timingEnd - timingStart);
}

function getResponseTimingData(response: AxiosResponse): DefaultTimingResponse {
  const timingStart = (response as any).config.timingStart as number;
  const timingEnd = Date.now();
  const elapsedTime = calcElapsedTime(timingStart, timingEnd);

  return {
    timingEnd,
    timingStart,
    elapsedTime,
  };
}

/**
 * @description Axios plugin to measure the actual time it
 * takes for a request to complete. It has TypeScript and a
 * native ES Module support compared to `axios-time`.
 * @author Achmad Kurnianto
 * @date 24th February 2023
 * @export
 * @template AxiosInstanceType
 * @template InterceptorRequestType
 * @template InterceptorResponseType
 * @param {AxiosInstanceType} instance
 * @example
 * ```ts
 * import axios from 'axios';
 * import axiosTime from 'axios-time';
 *
 * axiosTime(axios);
 *
 * try {
 *   const response = await axios.get('/user');
 * } catch(err) {
 * }
 * ```
 */
export default function axiosTime<
  AxiosInstanceType extends AxiosInstance = AxiosInstance,
  InterceptorRequestType extends AxiosTimeInternalRequestConfig = AxiosTimeInternalRequestConfig,
  InterceptorResponseType extends AxiosTimeResponse = AxiosTimeResponse
>(instance: AxiosInstanceType) {
  instance.interceptors.request.use((request): InterceptorRequestType => {
    const castedRequest = request as InterceptorRequestType;
    castedRequest.timingStart = Date.now();
    return castedRequest;
  });

  instance.interceptors.response.use(
    (response): InterceptorResponseType => {
      const castedResponse = response as InterceptorResponseType;
      castedResponse.timings = getResponseTimingData(response);
      return castedResponse;
    },
    (error: AxiosError) => {
      if (error?.response) {
        const castedResponse = error.response as InterceptorResponseType;
        castedResponse.timings = getResponseTimingData(error.response);
      }
      return Promise.reject(error);
    }
  );
}
