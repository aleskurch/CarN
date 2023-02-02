import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createServiceFactory, mockProvider, SpectatorService, SpyObject, } from '@ngneat/spectator/jest';

import { QUERY_PARAMS_MOCK, URL_MOCK } from "../mocks/htttp-options-mock";
import { BaseService } from "./base-http.service";

describe('BaseService', () => {
  let spectator: SpectatorService<BaseService>;
  let service: BaseService;
  let httpClientSpy: SpyObject<HttpClient>;

  const createService = createServiceFactory({
    service: BaseService,
    providers: [mockProvider(HttpClient, {
      get: jest.fn(),
      patch: jest.fn(),
      post: jest.fn(),
      delete: jest.fn()
    })],
    imports: [HttpClientTestingModule],
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;

    httpClientSpy = spectator.inject(HttpClient)
  });

  describe('should be initialized', () => {
    it('service should exists', () => {
      expect(service).toBeDefined();
    });
  });

  describe('get', () => {
    it('should exists', () => {
      expect(service.get).toBeDefined();
    });

    it('should call http get method', () => {
      const spy = jest.spyOn(httpClientSpy, 'get');

      service.get(URL_MOCK, QUERY_PARAMS_MOCK)

      expect(spy).toHaveBeenCalled()
    });
  });

  describe('post', () => {
    it('should exists', () => {
      expect(service.post).toBeDefined();
    });

    it('should call http post method', () => {
      const spy = jest.spyOn(httpClientSpy, 'post');

      service.post(URL_MOCK, QUERY_PARAMS_MOCK)

      expect(spy).toHaveBeenCalled()
    });
  });

  describe('patch', () => {
    it('should exists', () => {
      expect(service.patch).toBeDefined();
    });

    it('should call http patch method', () => {
      const spy = jest.spyOn(httpClientSpy, 'patch');

      service.patch(URL_MOCK, QUERY_PARAMS_MOCK)

      expect(spy).toHaveBeenCalled()
    });
  });

  describe('delete', () => {
    it('should exists', () => {
      expect(service.delete).toBeDefined();
    });

    it('should call http delete method', () => {
      const spy = jest.spyOn(httpClientSpy, 'delete');

      service.delete(URL_MOCK, QUERY_PARAMS_MOCK)

      expect(spy).toHaveBeenCalled()
    });
  });
});
