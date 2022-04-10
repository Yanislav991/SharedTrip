import { TestBed } from '@angular/core/testing';

import { WeatherStatisticsService } from './weather-statistics.service';

describe('WeatherStatisticsService', () => {
  let service: WeatherStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
