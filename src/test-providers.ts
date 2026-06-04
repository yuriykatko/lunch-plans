import { EnvironmentProviders, Provider, provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

const testProviders: (Provider | EnvironmentProviders)[] = [
  provideZonelessChangeDetection(),
  provideHttpClient(withInterceptorsFromDi()),
  provideHttpClientTesting(),
];

export default testProviders;
