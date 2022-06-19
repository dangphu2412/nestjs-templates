/**
 * TODO: Our first target is building an IoC that solve the relationship of classes
 * We take metadata from rootModule to create a simple controller first
 */
import { RootModule } from './module.client';
import { NormContainer } from './norm-container';

export class NornApplication {
  public static create(rootModule: RootModule): NormContainer {
    const container = new NormContainer();
    return container;
  }
}
