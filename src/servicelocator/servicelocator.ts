import { MovieService } from './movie_service';

export class ServiceLocator {
  component!: MovieService;

  subscribe (component: MovieService) {
    this.component = component;
  }

  getService (): MovieService {
    return this.component;
  }
}
