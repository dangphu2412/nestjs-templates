import { Constructor } from '../common/types';

export interface Module {
  imports: Array<Module>;
  controllers: Array<DependencyDeclaration>;
  components: Array<DependencyDeclaration>;
  exports: Array<DependencyDeclaration>;
}

export interface RootModule {
  imports: Array<Module>;
}

export type DependencyDeclaration = Constructor | InjectionDeclaration;

export interface InjectionDeclaration {
  injectionToken: string;
  implementation: Constructor;
}
