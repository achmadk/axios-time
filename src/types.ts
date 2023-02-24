import {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

export interface DefaultTimingStartConfig {
  timingStart: number;
}

export type AxiosRequestConfigWithTiming<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  D = any,
  TimingStart extends DefaultTimingStartConfig = DefaultTimingStartConfig
> = AxiosRequestConfig<D> & TimingStart;

export interface DefaultTimingResponse extends DefaultTimingStartConfig {
  timingEnd: number;
  elapsedTime?: number;
}

export interface AxiosTimeResponseOnlyTimings<
  TimingResponse extends DefaultTimingResponse = DefaultTimingResponse
> {
  timings: TimingResponse;
}

export interface AxiosTimeResponse<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T = any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  D = any,
  TimingResponse extends DefaultTimingResponse = DefaultTimingResponse
> extends AxiosResponse<T, D>,
    AxiosTimeResponseOnlyTimings<TimingResponse> {}

export interface AxiosTimeError<
  T = any,
  D = any,
  TimingResponse extends DefaultTimingResponse = DefaultTimingResponse
> extends AxiosError<T, D>,
    AxiosTimeResponseOnlyTimings<TimingResponse> {}

export interface AxiosTimeInternalRequestConfig<D = any>
  extends InternalAxiosRequestConfig<D>,
    DefaultTimingStartConfig {}
