import { MovieService } from './movie_service';

// service locator which retrieves a specific movie service component
export class ServiceLocator {
  component!: MovieService;

  subscribe (component: MovieService) {
    this.component = component;
  }

  getService (): MovieService {
    return this.component;
  }
}
